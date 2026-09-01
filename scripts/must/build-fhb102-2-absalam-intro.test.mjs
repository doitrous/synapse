#!/usr/bin/env node

import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '../..')
const generator = resolve(root, 'scripts/must/build-fhb102-2-authoring-slice.mjs')

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

function items(markdown) {
  return markdown.split(/^# Item$/m).slice(1)
}

test('the approved Absalam introduction, Arthropoda, Mosquitoes and Sandfly slices preserve their exact Draft and hold boundaries', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const vectorSources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const cyclopropagativeArticle = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-cyclopropagative-articles.md')
  const sarcophagaArticle = read('docs/MUST-Source-Imports/article/FHB-102-2-sarcophaga-myiasis-articles.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.equal(items(questions).length, 123)
  assert.equal(items(articles).length, 19)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)

  const expectedQuestions = [
    ['Q02', 'A parasite is an organism that:', 'B', 'Benefits the host', 'A living organism that lives in or on another organism and harms it', 'A free-living organism', 'Can only survive outside a host'],
    ['Q04', 'A facultative parasite:', 'B', 'Is always dependent on a host', 'Can live both as a parasite and free-living', 'Is always an endoparasite', 'Requires multiple hosts for survival'],
    ['Q05', 'An opportunistic parasite:', 'C', 'Causes disease in healthy individuals', 'Only infects plants', 'Causes severe disease in immunocompromised hosts', 'Can live independently without a host'],
    ['Q09', 'What is the habitat of malaria parasites in humans?', 'D', 'Intestine', 'Muscles', 'Skin', 'Blood'],
    ['Q11', 'Which of the following is is a classification of parasites?', 'D', 'Based on their taxonomy', 'Based on their habitat in the human body', 'Based on their color', 'A & B'],
    ['Q14', 'What is the shape of trematodes?', 'B', 'Tape-like and segmented', 'Leaf-like and unsegmented', 'Cylindrical and unsegmented', 'Spherical'],
    ['Q15', 'The group of parasitic flatworms includes:', 'C', 'Trematodes and Nematodes', 'Nematodes and Cestodes', 'Cestodes and Trematodes', 'Cestodes and Protozoa'],
    ['Q18', 'Which of the following is an organism that moves by gliding?', 'B', 'Entamoeba histolytica', 'Apicomplexa', 'Amoeba', 'Ciliates'],
    ['Q19', 'A vector is an organism that:', 'B', 'Provides nutrition to parasites', 'Transmits parasites from one host to another', 'Serves as a reservoir host', 'Is always infected by the parasite'],
    ['Q21', 'What is the purpose of classifying parasites based on habitat?', 'C', 'For laboratory identification', 'For taxonomic studies', 'For clinical diagnosis', 'For vector control'],
    ['Q22', 'Zoonotic diseases are:', 'B', 'Only found in humans', 'Parasitic diseases that originate from animals', 'Transmitted only through vectors', 'Always caused by protozoa'],
    ['Q23', 'What is the purpose of classifying parasites based on their taxonomy?', 'A', 'For laboratory identification', 'For killing the parasite', 'For clinical diagnosis', 'For vector control'],
    ['Q24', 'Which of the following is(are) routes of entry of parasites?', 'D', 'Ingestion', 'Skin penetration', 'Vectors', 'All of the above'],
    ['Q25', 'An obligatory parasite:', 'A', 'Is always dependent on a host', 'Can live both as a parasite and free-living', 'Is always an endoparasite', 'Requires multiple hosts for survival'],
    ['Q31', 'How many pairs of legs do insects typically have?', 'C', '1', '2', '3', '4'],
    ['Q32', 'How many pairs of legs do arachnids have?', 'C', '2', '3', '4', '5'],
    ['Q33', 'What type of metamorphosis is called complete metamorphosis?', 'A', 'Holometabolous', 'Hemimetabolous', 'Both of them', 'None of the above'],
    ['Q40', 'What is the term for arthropods transmitting pathogens to offspring?', 'C', 'Propagative', 'Cyclo-propagative', 'Transovarian', 'Cyclo-developmental'],
    ['Q41', 'What is the distinguishing feature of Stomoxys calcitrans (Stable fly)?', 'A', 'Piercing and sucking proboscis', 'Biting without sucking blood', 'Proboscis adapted for nectar feeding', 'Absence of wings'],
    ['Q44', 'What is the shape of Musca domestica larva’s posterior spiracle?', 'B', 'Triangular with complete peritreme, 3 long. slits', 'D-shape, medial button 3 M-shaped sinuous slits', 'Rounded with incomplete peritreme, 3 long. slits', 'None of them'],
    ['Q47', 'Which of the following causes cutaneous myiasis:', 'D', 'Cordylobia', 'Dermatobia', 'Hypoderma', 'All of the above'],
    ['Q48', 'Which method is used by Dermatobia hominis (human botfly) for transmission?', 'B', 'Direct deposition of eggs on the skin', 'It uses another insect to carry eggs', 'Ingestion of larvae', 'Deposition in water sources'],
    ['Q49', 'Which fly family is responsible for wound myiasis?', 'D', 'Sarcophagidae', 'Calliphoridae', 'Glossinidae', 'A & B'],
    ['Q51', 'Which of the following causes Urogenital myiasis?', 'B', 'Sarcophaga', 'Fannia', 'Musca domestica', 'Cordylobia'],
    ['Q52', 'Aural myiasis commonly occurs due to:', 'A', 'Sarcophaga', 'Anopheles', 'Calliphora', 'Stomoxys'],
    ['Q53', 'Which fly species is commonly involved in forensic parasitology?', 'D', 'Glossina', 'Lucilia', 'Sarcophaga', 'B & C'],
    ['Q54', 'Which condition is treated using Maggot Debridement Therapy (MDT)?', 'B', 'Tuberculosis', 'Diabetes foot ulcers', 'Malaria', 'Pneumonia'],
    ['Q56', 'What is the shape of Calliphoridae larva’s posterior spiracle?', 'A', 'Triangular with complete peritreme, 3 long. slits', 'D-shape, medial button 3 M-shaped sinuous slits', 'Rounded with incomplete peritreme, 3 long. slits', 'None of them'],
    ['Q57', 'What is a common preventive measure for myiasis?', 'A', 'Proper wound hygiene', 'Keeping flies as pets', 'Increasing humidity in homes', 'Avoiding antibiotics'],
    ['Q58', 'How can forensic entomology assist in criminal investigations?', 'B', 'Identifying toxic substances in blood', 'Determining time of death (Post-mortem Interval)', 'Diagnosing malaria', 'Detecting bacteria in wounds'],
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-PARA-INTRO-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q1', 'Q3', 'Q6', 'Q7', 'Q8', 'Q10', 'Q12', 'Q13', 'Q16', 'Q17', 'Q20', 'Q26', 'Q27', 'Q28', 'Q29', 'Q30', 'Q34', 'Q35', 'Q36', 'Q37', 'Q38', 'Q39', 'Q42', 'Q43', 'Q45', 'Q46', 'Q50', 'Q55', 'Q59', 'Q60']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held`))
    assert.doesNotMatch(questions, new RegExp(`INTRO-${held.padStart(3, '0')}\\b`))
  }

  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 19)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 82)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 82)
  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 123)
  assert.equal((concepts.match(/^## id\nCON-INF-D13F9697E5B95F$/gm) || []).length, 1)
  assert.equal((questions.match(/^## main_concept\nCON-INF-D13F9697E5B95F$/gm) || []).length, 4)
  assert.equal((concepts.match(/^## id\nCON-INF-23265735EECCA1$/gm) || []).length, 0)
  assert.equal((questions.match(/^## main_concept\nCON-INF-23265735EECCA1$/gm) || []).length, 0)
  assert.match(questions, /Q18 preserves the source's singular “an organism” wording although Apicomplexa is a group/)
  assert.match(questions, /Q53 preserves the source's “species” wording although Lucilia and Sarcophaga are genus names/)
  assert.match(questions, /Q54 preserves the source's literal “Diabetes foot ulcers” wording although the governed teaching says diabetic foot/)
  assert.match(coverage, /Q17 is held in the Absalam introduction family.*“Flagella” is the locomotor organ[\s\S]*No correction was imported/)
  assert.match(sources, /## id\nsrc_4bd3b78f762673d7eb7f/)
  assert.match(sources, /## id\nsrc_f65b3872022ca0b42a79/)
  assert.match(vectorSources, /## id\nsrc_2c1e04372fbb8b2607f7/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /First 15-prompt Absalam introduction slice: \*\*7 authored \/ 8 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Second 15-prompt Absalam introduction slice: \*\*7 authored \/ 8 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam Parasitology Introduction Q1–Q30: \*\*14 authored \/ 16 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /First 15-prompt Absalam Arthropoda slice: \*\*6 authored \/ 9 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Second 15-prompt Absalam Arthropoda slice: \*\*10 authored \/ 5 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q60: \*\*30 authored \/ 30 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /global Q1–Q150 are fully dispositioned/)
  assert.match(coverage, /Q46 is held in the Absalam Arthropoda family.*concept_1ffd40812a4df1ef0eb6ca09/s)
  assert.match(coverage, /Q50 is held in the Absalam Arthropoda family.*Eristalis.*“most common”/s)
  assert.match(coverage, /Q55 is held in the Absalam Arthropoda family.*concept_0d6ad71378af78716219e769/s)
  assert.match(coverage, /Q59 is held in the Absalam Arthropoda family.*does not state that Calliphora lays eggs in wounds/s)
  assert.match(coverage, /Q60 is held in the Absalam Arthropoda family.*“commonly” or “severe”/s)
  assert.match(coverage, /Q38 is held in the Absalam Arthropoda family as an uncorrected teaching conflict/)
  assert.match(coverage, /direct mechanical transmission/)
  assert.doesNotMatch(cyclopropagativeArticle, /ART-INF-MUST-FHB1022-TRANSOVARIAN-TRANSMISSION/)
  assert.doesNotMatch(cyclopropagativeArticle, /QST-MUST-FHB1022-PARA-INTRO-Q(?:36|42)/)
  assert.match(sarcophagaArticle, /ART-INF-MUST-FHB1022-MUSCID-IDENTIFICATION: Muscidae identification: Stomoxys and Musca/)
  assert.match(sarcophagaArticle, /ART-INF-MUST-FHB1022-CLINICAL-SITE-MYIASIS: Clinical-site patterns of myiasis/)
  assert.match(sarcophagaArticle, /ART-INF-MUST-FHB1022-FORENSIC-MYIASIS: Forensic use of myiasis-associated flies/)
  assert.match(sarcophagaArticle, /QST-MUST-FHB1022-PARA-VECT-Q12/)
  assert.match(sarcophagaArticle, /QST-MUST-FHB1022-PARA-INTRO-Q49/)
  assert.match(sarcophagaArticle, /QST-MUST-FHB1022-PARA-INTRO-Q56/)
  assert.match(sarcophagaArticle, /CON-INF-7400B05B6501D2/)
  for (const articleId of [
    'ART-INF-MUST-FHB1022-CUTANEOUS-MYIASIS-PHORESIS',
    'ART-INF-MUST-FHB1022-CLINICAL-SITE-MYIASIS',
    'ART-INF-MUST-FHB1022-FORENSIC-MYIASIS',
    'ART-INF-MUST-FHB1022-MYIASIS-THERAPY-PREVENTION',
  ]) assert.match(articles, new RegExp(`## id\\n${articleId}`))

  const articleIds = [...articles.matchAll(/^## id\n(ART-[^\n]+)$/gm)].map((match) => match[1])
  for (const item of items(articles)) {
    const ownId = item.match(/^\n\n## id\n([^\n]+)/)?.[1]
    const related = item.match(/## related_articles\n([\s\S]*?)\n\n## question_ids/)?.[1] ?? ''
    assert.ok(related.trim().length > 0, `${ownId} must retain at least one related article`)
    for (const sibling of related.split('\n').map((line) => line.split(':')[0]).filter(Boolean)) {
      const siblingItem = items(articles).find((candidate) => candidate.includes(`## id\n${sibling}\n`))
        ?? items(cyclopropagativeArticle).find((candidate) => candidate.includes(`## id\n${sibling}\n`))
        ?? items(sarcophagaArticle).find((candidate) => candidate.includes(`## id\n${sibling}\n`))
      assert.ok(siblingItem, `${ownId} must link only to a complete article in the import batch`)
      const siblingRelated = siblingItem.match(/## related_articles\n([\s\S]*?)\n\n## question_ids/)?.[1] ?? ''
      assert.ok(siblingRelated.includes(ownId), `${ownId} and ${sibling} must be reciprocal`)
    }
  }
})

test('global Q61-Q75 emits only the six approved microbiology Draft questions and preserves all nine holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const assessmentSource = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const teachingSource = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.equal(items(questions).length, 94)
  assert.equal(items(articles).length, 17)
  assert.equal(items(concepts).length, 70)
  assert.equal(items(claims).length, 94)
  assert.equal(items(citations).length, 94)
  assert.equal(items(spans).length, 94)

  const expectedQuestions = [
    ['Q62', 'Which of the following is NOT considered a microorganism?', 'D', 'Bacteria', 'Viruses', 'Protozoa', 'Plants'],
    ['Q63', 'What is the main function of saprophytes?', 'B', 'Cause diseases in humans', 'Decompose dead organic matter', 'Reproduce inside living cells', 'Produce antibiotics'],
    ['Q64', 'In the scientific nomenclature, which part of the name is capitalized?', 'B', 'Species', 'Genus', 'Family', 'Class'],
    ['Q65', 'Viruses are classified as:', 'C', 'Prokaryotic cells', 'Eukaryotic cells', 'Acellular agents', 'Multicellular organisms'],
    ['Q66', 'Which of the following is a prokaryotic microorganism?', 'B', 'Fungi', 'Bacteria', 'Protozoa', 'Algae'],
    ['Q67', 'The main structural difference between prokaryotic and eukaryotic cells is:', 'A', 'Presence of a nucleus', 'Presence of a cell wall', 'Ability to reproduce', 'None of the above'],
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-MICRO-INTRO-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q61', 'Q68', 'Q69', 'Q70', 'Q71', 'Q72', 'Q73', 'Q74', 'Q75']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held in the Absalam Microbiology Ch1-3 family`))
    assert.doesNotMatch(questions, new RegExp(`MICRO-INTRO-${held}\\b`))
  }

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 94)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 17)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 70)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 70)
  assert.equal((questions.match(/^## main_concept\nCON-INF-98A3DF2E20880C$/gm) || []).length, 2)

  assert.match(articles, /## id\nART-INF-MUST-FHB1022-MICROBIOLOGY-FOUNDATIONS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-MICROBIAL-CELL-ORGANISATION:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-MICROBIAL-CELL-ORGANISATION[\s\S]*## related_articles\nART-INF-MUST-FHB1022-MICROBIOLOGY-FOUNDATIONS:/)
  assert.match(assessmentSource, /Pages 19–22 and 27 were rendered and visually read for global Q61–Q75/)
  assert.match(teachingSource, /Pages 1, 9–15, 28, 30, 32, 34 and 37–38 were rendered and visually read for global Q61–Q75/)

  assert.match(coverage, /First Absalam Microbiology Ch1-3 slice, global Q61–Q75: \*\*6 authored \/ 9 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q75: \*\*36 authored \/ 39 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Q61 is held in the Absalam Microbiology Ch1-3 family.*does not state the keyed option's added “and their effects” wording/s)
  assert.match(coverage, /Q75 is held in the Absalam Microbiology Ch1-3 family.*does not mention radiation/s)
})

test('global Q76-Q90 emits only Q85, Q88 and Q90 and preserves all twelve holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const assessmentSource = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const teachingSource = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.equal(items(questions).length, 94)
  assert.equal(items(articles).length, 17)
  assert.equal(items(concepts).length, 70)
  assert.equal(items(claims).length, 94)
  assert.equal(items(citations).length, 94)
  assert.equal(items(spans).length, 94)

  const expectedQuestions = [
    ['Q85', 'The Gram stain differentiates bacteria based on:', 'B', 'Capsule composition', 'Cell wall structure', 'Nucleoid shape', 'Growth pattern'],
    ['Q88', 'The new system of classification is based on:', 'A', 'Molecular biology and genetics composition', 'Nature of the cell wall', 'Staining characteristics', 'Ability to form spores:'],
    ['Q90', 'Which of the following is the primary target of antibiotics like penicillin?', 'B', 'Ribosomes', 'Peptidoglycan layer', 'Plasmids', 'Cytoplasmic membrane'],
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-MICRO-INTRO-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q76', 'Q77', 'Q78', 'Q79', 'Q80', 'Q81', 'Q82', 'Q83', 'Q84', 'Q86', 'Q87', 'Q89']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held in the Absalam Microbiology Ch1-3 family`))
    assert.doesNotMatch(questions, new RegExp(`MICRO-INTRO-${held}\\b`))
  }

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 94)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 17)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 70)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 70)
  assert.match(assessmentSource, /Pages 23–27 were rendered and visually read for global Q76–Q90/)
  assert.match(teachingSource, /Pages 24, 28, 30, 32–36 and 38 were rendered and visually read for global Q76–Q90/)

  assert.match(coverage, /Second Absalam Microbiology Ch1-3 slice, global Q76–Q90: \*\*3 authored \/ 12 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q90: \*\*39 authored \/ 51 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Q78 is held in the Absalam Microbiology Ch1-3 family.*both peptidoglycan and hydrolytic enzymes/s)
  assert.match(coverage, /Q84 is held in the Absalam Microbiology Ch1-3 family.*both adherence and nutrient storage/s)
  assert.match(coverage, /global Q1–Q150 are fully dispositioned/)
})

test('global Q91-Q120 emits only the ten approved Chapter 6 Draft questions and preserves all twenty holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.equal(items(questions).length, 94)
  assert.equal(items(articles).length, 17)
  assert.equal(items(concepts).length, 70)
  assert.equal(items(claims).length, 94)
  assert.equal(items(citations).length, 94)
  assert.equal(items(spans).length, 94)

  const expectedQuestions = [
    ['Q94', 'What is the term for a microorganism that normally does not cause disease but can do so under certain conditions?', 'A', 'Opportunistic pathogen', 'Obligate pathogen', 'Commensal microbe', 'Parasitic microbe'],
    ['Q95', 'Which factor can lead to harmful effects of normal flora?', 'D', 'Change in natural habitat', 'Use of broad-spectrum antibiotics', 'Weak immune system', 'All of the above'],
    ['Q99', 'What is the term for the presence of microbes on a host without causing disease?', 'B', 'Infection', 'Colonization', 'Pathogenesis', 'Invasion'],
    ['Q102', 'The carrier state refers to:', 'A', 'A state where the individual has no symptoms but still sheds pathogens', 'An infection that rapidly progresses to disease', 'The complete elimination of microbes from the body', 'The host resisting infection successfully'],
    ['Q104', 'Virulence is:', 'A', 'The degree of pathogenicity', 'The ability of bacteria to live inside a host', 'A type of mutualistic relationship', 'The inability of bacteria to cause disease'],
    ['Q105', 'Which of the following is NOT a bacterial virulence factor?', 'C', 'Ability to adhere to host cells', 'Ability to resist host immune defenses', 'Inability to survive in the environment', 'Ability to produce toxins'],
    ['Q110', 'Which of the following is an example of antigenic variation?', 'A', 'Bacteria changing their surface proteins to evade the immune system', 'Bacteria producing enzymes to break down host tissue', 'Bacteria forming spores to survive harsh conditions', 'Bacteria developing resistance to antibiotics'],
    ['Q115', 'Which of the following virulence factors helps bacteria escape phagocytosis?', 'D', 'Coagulase', 'Leukocidin', 'Protein A', 'All of the above'],
    ['Q116', 'Bacteria obtain iron in the host using:', 'B', 'Pili', 'Siderophores', 'Exotoxins', 'Capsule'],
    ['Q117', 'Which bacterial enzyme converts fibrinogen into fibrin to protect bacteria from phagocytosis?', 'B', 'Hyaluronidase', 'Coagulase', 'Collagenase', 'Lecithinase'],
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-MICRO-INTRO-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q91', 'Q92', 'Q93', 'Q96', 'Q97', 'Q98', 'Q100', 'Q101', 'Q103', 'Q106', 'Q107', 'Q108', 'Q109', 'Q111', 'Q112', 'Q113', 'Q114', 'Q118', 'Q119', 'Q120']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held in the Absalam Microbiology Chapter 6 family`))
    assert.doesNotMatch(questions, new RegExp(`MICRO-INTRO-${held}\\b`))
  }

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 94)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 17)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 70)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 70)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-COLONIZATION-CARRIAGE[\s\S]*## related_articles\nART-INF-MUST-FHB1022-VIRULENCE-EVASION:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-VIRULENCE-EVASION[\s\S]*## related_articles\nART-INF-MUST-FHB1022-COLONIZATION-CARRIAGE:/)
  assert.match(sources, /## id\nsrc_e4b2f7ce3e55fad37c9a/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_e4b2f7ce3e55fad37c9a.sha256, 'e4b2f7ce3e55fad37c9a588f1b1c0f015b1d261369ed59d45a3715c9ffe02f2d')
  assert.match(coverage, /Absalam Microbiology Chapter 6, global Q91–Q120: \*\*10 authored \/ 20 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q120: \*\*49 authored \/ 71 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q100 is held in the Absalam Microbiology Chapter 6 family as an uncorrected teaching conflict/)
  assert.match(coverage, /Q111 is held in the Absalam Microbiology Chapter 6 family as an authority\/wording conflict/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
})

test('global Q121-Q150 emits exactly nineteen approved Pharmacology Draft questions and preserves eleven holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const assessmentSource = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const teachingSources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.equal(items(questions).length, 94)
  assert.equal(items(articles).length, 17)
  assert.equal(items(concepts).length, 70)
  assert.equal(items(claims).length, 94)
  assert.equal(items(citations).length, 94)
  assert.equal(items(spans).length, 94)

  const expectedQuestions = [
    ['Q126', 'Beta-lactam antibiotics work by inhibiting:', 'D', 'DNA replication', 'RNA synthesis', 'Protein synthesis', 'Cell wall synthesis'],
    ['Q127', 'What is the function of Penicillin-Binding Proteins (PBPs)?', 'B', 'Inhibit bacterial ribosomes', 'Catalyze transpeptidation for cell wall synthesis', 'Destroy bacterial DNA', 'Promote antibiotic resistance'],
    ['Q128', 'Which of the following drugs is NOT a beta-lactam?', 'C', 'Penicillin', 'Cephalosporin', 'Vancomycin', 'Carbapenem'],
    ['Q129', 'Why are beta-lactamase inhibitors combined with some penicillins?', 'B', 'To increase bacterial resistance', 'To block beta-lactamase enzymes that degrade antibiotics', 'To reduce adverse effects', 'To inhibit bacterial DNA replication'],
    ['Q130', 'Which of the following is a natural penicillin?', 'C', 'Nafcillin', 'Amoxicillin', 'Penicillin G', 'Piperacillin'],
    ['Q131', 'What is the main use of benzathine penicillin?', 'C', 'Treating viral infections', 'Treating fungal infections', 'Prophylaxis for rheumatic fever', 'Treating tuberculosis'],
    ['Q132', 'Which of these penicillins is resistant to beta-lactamase?', 'B', 'Amoxicillin', 'Dicloxacillin', 'Penicillin G', 'Ampicillin'],
    ['Q133', 'Amoxicillin belongs to which group of penicillins?', 'B', 'Natural penicillins', 'Aminopenicillins', 'Carboxypenicillins', 'Ureidopenicillins'],
    ['Q134', 'Piperacillin belongs to which category of penicillins?', 'A', 'Extended-spectrum penicillins', 'Natural penicillins', 'Penicillinase-resistant penicillins', 'Carboxypenicillins'],
    ['Q135', 'Which beta-lactamase inhibitor is commonly combined with amoxicillin?', 'A', 'Clavulanate', 'Vancomycin', 'Teicoplanin', 'Nafcillin'],
    ['Q136', 'Unasyn is a combination of:', 'C', 'Amoxicillin + clavulanate', 'Piperacillin + tazobactam', 'Ampicillin + sulbactam', 'Nafcillin + dicloxacillin'],
    ['Q137', 'Which antibiotic binds to the D-alanyl-D-alanyl portion of peptidoglycan precursors?', 'B', 'Bacitracin', 'Vancomycin', 'Amoxicillin', 'Ceftriaxone'],
    ['Q138', 'Bacitracin works by:', 'C', 'Inhibiting protein synthesis', 'Inhibiting bacterial DNA gyrase', 'Blocking transport of cell wall precursors', 'Binding to ribosomes'],
    ['Q139', 'A major adverse effect of penicillins is:', 'C', 'Hepatotoxicity', 'Nephrotoxicity', 'Hypersensitivity reactions', 'Seizures'],
    ['Q142', 'Which penicillin formulation is given orally?', 'D', 'Penicillin G', 'Cloxacillin', 'Dicloxacillin', 'B & C'],
    ['Q146', 'Which penicillin is used primarily for Staphylococcus aureus infections?', 'B', 'Amoxicillin', 'Dicloxacillin', 'Benzathine penicillin', 'Ampicillin'],
    ['Q147', 'Which penicillin is the most effective against Pseudomonas aeruginosa?', 'C', 'Penicillin G', 'Amoxicillin', 'Piperacillin', 'Nafcillin'],
    ['Q149', 'Which of the following statements is true about cephalosporins and penicillins?', 'C', 'They have completely different mechanisms of action', 'Cross-reactivity between them is rare', 'Both inhibit bacterial cell wall synthesis', 'Cephalosporins are bacteriostatic'],
    ['Q150', 'Which of the following is a time-dependent killer?', 'A', 'Beta-lactams', 'Aminoglycosides', 'Fluoroquinolones', 'Tetracyclines'],
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-PHARM-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q121', 'Q122', 'Q123', 'Q124', 'Q125', 'Q140', 'Q141', 'Q143', 'Q144', 'Q145', 'Q148']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held in the Absalam Pharmacology family`))
    assert.doesNotMatch(questions, new RegExp(`PHARM-${held}\\b`))
  }

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 94)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 17)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 70)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 70)
  assert.equal((questions.match(/^## main_concept\nCON-INF-AF1A323DC43B0A$/gm) || []).length, 3)
  assert.equal((questions.match(/^## main_concept\nCON-INF-D09939F6D566ED$/gm) || []).length, 3)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-CELL-WALL-ANTIBIOTICS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-PENICILLIN-CLASSES-USE-SAFETY:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-PENICILLIN-CLASSES-USE-SAFETY[\s\S]*## related_articles\nART-INF-MUST-FHB1022-CELL-WALL-ANTIBIOTICS:/)
  assert.match(assessmentSource, /Pages 37–44 and answer page 45 were rendered and visually read for global Q121–Q150/)
  assert.match(teachingSources, /## id\nsrc_ee1fb7a716a473eb2d98/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_ee1fb7a716a473eb2d98.sha256, 'ee1fb7a716a473eb2d983d7f25ad342f2320dc40d55d3c8d32b777ae69fb46a3')
  assert.match(coverage, /Absalam Pharmacology, global Q121–Q150: \*\*19 authored \/ 11 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q150: \*\*68 authored \/ 82 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q145 is held in the Absalam Pharmacology family as an uncorrected teaching conflict/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
})

test('Absalam Part 2 Mosquitoes Q1-Q30 emits only the approved twenty-two Draft questions and eight holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const paratransQuestions = read('docs/MUST-Source-Imports/question/FHB-102-2-paratransgenesis-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const paratransArticle = read('docs/MUST-Source-Imports/article/FHB-102-2-paratransgenesis-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const paratransClaims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-paratransgenesis-claims.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approvedKeys = new Map([
    [1, 'B'], [2, 'C'], [3, 'B'], [4, 'D'], [6, 'C'], [7, 'A'], [8, 'B'], [9, 'B'], [10, 'C'],
    [15, 'B'], [17, 'B'], [18, 'C'], [19, 'D'], [21, 'A'], [22, 'A'], [23, 'B'], [24, 'B'],
    [26, 'B'], [27, 'B'], [28, 'C'], [29, 'A'], [30, 'A'],
  ])
  for (const [q, key] of approvedKeys) {
    const id = `QST-MUST-FHB1022-PARA-MOSQ2-Q${String(q).padStart(2, '0')}`
    const corpus = q === 29 ? paratransQuestions : questions
    const item = items(corpus).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Mosquitoes Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
  }

  for (const q of [5, 11, 12, 13, 14, 16, 20, 25]) {
    assert.match(coverage, new RegExp(`\\*\\*Mosquitoes Q${q} is held`))
    assert.doesNotMatch(`${questions}\n${paratransQuestions}`, new RegExp(`MOSQ2-Q${String(q).padStart(2, '0')}\\b`))
  }

  assert.equal(items(questions).filter((item) => /PARA-MOSQ2-Q/.test(item)).length, 21)
  assert.equal(items(paratransQuestions).filter((item) => /PARA-MOSQ2-Q29/.test(item)).length, 1)
  const mosquitoArticleIds = [
    'ART-INF-MUST-FHB1022-MOSQUITO-BIOLOGY',
    'ART-INF-MUST-FHB1022-MOSQUITO-DISEASES',
    'ART-INF-MUST-FHB1022-MOSQUITO-CONTROL',
  ]
  assert.equal(items(concepts).filter((item) => mosquitoArticleIds.some((id) => item.includes(`## article_ids\n${id}\n`))).length, 29)
  assert.equal(items(claims).filter((item) => /MOSQ2-Q/.test(item)).length, 21)
  assert.equal(items(paratransClaims).filter((item) => /MOSQ2-Q29/.test(item)).length, 1)
  for (const articleId of mosquitoArticleIds) assert.match(articles, new RegExp(`## id\\n${articleId}`))
  assert.match(paratransArticle, /QST-MUST-FHB1022-PARA-MOSQ2-Q29/)
  assert.match(sources, /## id\nsrc_8bd3b772b3b32db59726/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_8bd3b772b3b32db59726.sha256, '8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c')
  assert.match(coverage, /Absalam Part 2 Mosquitoes Q1–Q30: \*\*22 authored \/ 8 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /next source boundary is Sandfly Q1–Q30 on assessment pages 10–18/)
})

test('Absalam Part 2 Sandfly Q1-Q30 emits only nineteen safe Draft questions and eleven exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approvedKeys = new Map([
    [1, 'B'], [2, 'C'], [3, 'B'], [4, 'B'], [5, 'B'], [6, 'B'], [7, 'D'], [8, 'B'], [9, 'C'], [10, 'C'],
    [11, 'C'], [13, 'C'], [14, 'B'], [21, 'B'], [23, 'B'], [24, 'B'], [26, 'A'], [27, 'D'], [30, 'B'],
  ])
  for (const [q, key] of approvedKeys) {
    const id = `QST-MUST-FHB1022-PARA-SAND2-Q${String(q).padStart(2, '0')}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Sandfly Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /Absalam101 Part 2/)
    assert.match(item, /src_a82c32271ee38d0b2cad/)
  }

  for (const q of [12, 15, 16, 17, 18, 19, 20, 22, 25, 28, 29]) {
    assert.match(coverage, new RegExp(`\\*\\*Sandfly Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`SAND2-Q${String(q).padStart(2, '0')}\\b`))
  }

  const sandflyArticleIds = [
    'ART-INF-MUST-FHB1022-SANDFLY-BIOLOGY',
    'ART-INF-MUST-FHB1022-SANDFLY-DISEASES',
    'ART-INF-MUST-FHB1022-SANDFLY-CONTROL',
  ]
  assert.equal(items(questions).filter((item) => /PARA-SAND2-Q/.test(item)).length, 19)
  assert.equal(items(concepts).filter((item) => sandflyArticleIds.some((id) => item.includes(`## article_ids\n${id}\n`))).length, 22)
  assert.equal(items(claims).filter((item) => /SAND2-Q/.test(item)).length, 19)
  assert.equal(items(citations).filter((item) => /SAND2-Q/.test(item)).length, 19)
  assert.equal(items(spans).filter((item) => /SAND2-Q/.test(item)).length, 19)
  for (const articleId of sandflyArticleIds) assert.match(articles, new RegExp(`## id\\n${articleId}`))
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-SANDFLY-BIOLOGY[\s\S]*## related_articles\nART-INF-MUST-FHB1022-SANDFLY-DISEASES:[\s\S]*ART-INF-MUST-FHB1022-SANDFLY-CONTROL:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-SANDFLY-DISEASES[\s\S]*## related_articles\nART-INF-MUST-FHB1022-SANDFLY-BIOLOGY:[\s\S]*ART-INF-MUST-FHB1022-SANDFLY-CONTROL:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-SANDFLY-CONTROL[\s\S]*## related_articles\nART-INF-MUST-FHB1022-SANDFLY-BIOLOGY:[\s\S]*ART-INF-MUST-FHB1022-SANDFLY-DISEASES:/)
  assert.match(questions, /The assessment spelling “papatasi” is retained exactly/)
  assert.match(questions, /The assessment wording “highly exophilic but can adapt to indoor environments” is retained/)
  assert.match(coverage, /Sandfly Q29 is held as an uncorrected direct key conflict[\s\S]*bank prints D[\s\S]*official teaching page 32 directly lists DDT, option B/)
  assert.match(coverage, /Absalam Part 2 Sandfly Q1–Q30: \*\*19 authored \/ 11 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next Part 2 boundary is Virology Q1–Q30 on assessment pages 30–38/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Absalam Part 2 Mycology Q1-Q30 emits only twelve safe Draft questions and eighteen exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approvedKeys = new Map([
    [1, 'C'], [7, 'D'], [8, 'B'], [12, 'C'], [16, 'B'], [19, 'B'],
    [20, 'B'], [21, 'C'], [22, 'A'], [25, 'B'], [26, 'A'], [27, 'A'],
  ])
  for (const [q, key] of approvedKeys) {
    const id = `QST-MUST-FHB1022-MYCO2-Q${q}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Mycology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /Absalam101 Part 2/)
    assert.match(item, /src_72a4c07c4877d4b58c3f/)
  }

  for (const q of [2, 3, 4, 5, 6, 9, 10, 11, 13, 14, 15, 17, 18, 23, 24, 28, 29, 30]) {
    assert.match(coverage, new RegExp(`\\*\\*Mycology Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`MYCO2-Q${q}\\b`))
  }

  const mycologyArticleIds = [
    'ART-INF-MUST-FHB1022-MYCOLOGY-FOUNDATIONS',
    'ART-INF-MUST-FHB1022-MYCOLOGY-DISEASE-SPORES',
    'ART-INF-MUST-FHB1022-MYCOLOGY-DIAGNOSIS',
  ]
  assert.equal(items(questions).filter((item) => /MYCO2-Q/.test(item)).length, 12)
  assert.equal(items(concepts).filter((item) => mycologyArticleIds.some((id) => item.includes(`## article_ids\n${id}\n`))).length, 10)
  assert.equal(items(claims).filter((item) => /MYCO2-Q/.test(item)).length, 12)
  assert.equal(items(citations).filter((item) => /MYCO2-Q/.test(item)).length, 12)
  assert.equal(items(spans).filter((item) => /MYCO2-Q/.test(item)).length, 12)
  for (const articleId of mycologyArticleIds) assert.match(articles, new RegExp(`## id\\n${articleId}`))
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-MYCOLOGY-FOUNDATIONS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-MYCOLOGY-DISEASE-SPORES:[\s\S]*ART-INF-MUST-FHB1022-MYCOLOGY-DIAGNOSIS:/)
  assert.match(questions, /Which of the following is a causes of respiratory illness like sinusitis and bronchial asthma\?/)
  assert.match(questions, /Which of the following fungi is an example of a opportunistic organism\?/)
  assert.match(sources, /## id\nsrc_72a4c07c4877d4b58c3f[\s\S]*fully_governed_visually_read_all_pages_native_text/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_72a4c07c4877d4b58c3f.processingStatus, 'fully_governed')
  assert.match(coverage, /Mycology Q30 is held as an uncorrected authority\/key conflict/)
  assert.match(coverage, /Absalam Part 2 Mycology Q1–Q30: \*\*12 authored \/ 18 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next Part 2 boundary is Virology Q1–Q30 on assessment pages 30–38/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
})

test('Absalam Part 2 Virology Q1-Q30 emits only three safe Draft questions and twenty-seven exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approvedKeys = new Map([[2, 'B'], [5, 'C'], [26, 'C']])
  for (const [q, key] of approvedKeys) {
    const id = `QST-MUST-FHB1022-VIRO2-Q${q}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Virology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /Absalam101 Part 2/)
    assert.match(item, /src_09b0450fc24387f25049/)
  }

  for (const q of [1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30]) {
    assert.match(coverage, new RegExp(`\\*\\*Virology Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`VIRO2-Q${q}\\b`))
  }

  const virologyArticleIds = [
    'ART-INF-MUST-FHB1022-VIRUS-SUSCEPTIBILITY-COMPONENTS',
    'ART-INF-MUST-FHB1022-VIRAL-CARRIER-INFECTION',
  ]
  assert.equal(items(questions).filter((item) => /VIRO2-Q/.test(item)).length, 3)
  assert.equal(items(concepts).filter((item) => virologyArticleIds.some((id) => item.includes(`## article_ids\n${id}\n`))).length, 3)
  assert.equal(items(claims).filter((item) => /VIRO2-Q/.test(item)).length, 3)
  assert.equal(items(citations).filter((item) => /VIRO2-Q/.test(item)).length, 3)
  assert.equal(items(spans).filter((item) => /VIRO2-Q/.test(item)).length, 3)
  for (const articleId of virologyArticleIds) assert.match(articles, new RegExp(`## id\\n${articleId}`))
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-VIRUS-SUSCEPTIBILITY-COMPONENTS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-VIRAL-CARRIER-INFECTION:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-VIRAL-CARRIER-INFECTION[\s\S]*## related_articles\nART-INF-MUST-FHB1022-VIRUS-SUSCEPTIBILITY-COMPONENTS:/)
  assert.match(sources, /## id\nsrc_09b0450fc24387f25049[\s\S]*fully_governed_visually_read_all_pages_native_text/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_09b0450fc24387f25049.processingStatus, 'fully_governed')
  assert.match(coverage, /Virology Q14 is held as a non-unique key-form conflict/)
  assert.match(coverage, /Virology Q25 is held as an unsupported comparative-authority hold/)
  assert.match(coverage, /Absalam Part 2 Virology Q1–Q30: \*\*3 authored \/ 27 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Part 2 Pharmacology Q1–Q30 on pages 48–56/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*/)
})

test('Absalam Part 2 Microbiology Chapter 10 Q1-Q30 emits nineteen safe Draft questions and eleven exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approvedKeys = new Map([
    [1, 'C'], [2, 'D'], [3, 'A'], [6, 'C'], [7, 'B'], [9, 'B'], [10, 'B'], [11, 'C'], [13, 'A'], [14, 'B'],
    [15, 'C'], [16, 'B'], [17, 'C'], [18, 'C'], [19, 'A'], [26, 'B'], [27, 'B'], [28, 'B'], [29, 'B'],
  ])
  for (const [q, key] of approvedKeys) {
    const id = `QST-MUST-FHB1022-CH10-Q${q}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Chapter 10 Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /Absalam101 Part 2/)
    assert.match(item, /src_e2832d7aebaad9c7b1fe/)
  }

  for (const q of [4, 5, 8, 12, 20, 21, 22, 23, 24, 25, 30]) {
    assert.match(coverage, new RegExp(`\\*\\*Chapter 10 Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`CH10-Q${q}\\b`))
  }

  const articleIds = [
    'ART-INF-MUST-FHB1022-STAPHYLOCOCCI-IDENTIFICATION',
    'ART-INF-MUST-FHB1022-STREPTOCOCCI-CLASSIFICATION',
    'ART-INF-MUST-FHB1022-BRANCHING-GRAM-POSITIVE-BACTERIA',
  ]
  assert.equal(items(questions).filter((item) => /CH10-Q/.test(item)).length, 19)
  assert.equal(items(concepts).filter((item) => articleIds.some((id) => item.includes(id))).length, 13)
  assert.equal(items(claims).filter((item) => /CH10-Q/.test(item)).length, 19)
  assert.equal(items(citations).filter((item) => /CH10-Q/.test(item)).length, 19)
  assert.equal(items(spans).filter((item) => /CH10-Q/.test(item)).length, 19)
  for (const articleId of articleIds) assert.match(articles, new RegExp(`## id\\n${articleId}`))
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-STAPHYLOCOCCI-IDENTIFICATION[\s\S]*## related_articles\nART-INF-MUST-FHB1022-STREPTOCOCCI-CLASSIFICATION:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-BRANCHING-GRAM-POSITIVE-BACTERIA[\s\S]*## related_articles\nART-INF-MUST-FHB1022-STREPTOCOCCI-CLASSIFICATION:/)
  assert.match(sources, /## id\nsrc_e2832d7aebaad9c7b1fe[\s\S]*fully_governed_visually_read_all_pages_native_text/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_e2832d7aebaad9c7b1fe.processingStatus, 'fully_governed')
  assert.match(coverage, /Chapter 10 Q25 is held as an uncorrected key conflict/)
  assert.match(coverage, /Absalam Part 2 Microbiology Chapter 10 Q1–Q30: \*\*19 authored \/ 11 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Part 2 Pharmacology Q1–Q30 on pages 48–56/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*/)
})

test('Absalam Part 2 Pharmacology Q1-Q30 emits twenty-two safe Draft questions and eight exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-microbiology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-microbiology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-microbiology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-vector-transmission-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approvedKeys = new Map([
    [1, 'B'], [3, 'A'], [5, 'C'], [6, 'C'], [8, 'B'], [9, 'C'], [10, 'B'], [11, 'C'], [12, 'C'],
    [13, 'A'], [14, 'C'], [15, 'B'], [16, 'C'], [17, 'B'], [19, 'C'], [20, 'B'], [21, 'B'],
    [23, 'B'], [24, 'C'], [25, 'B'], [27, 'B'], [30, 'B'],
  ])
  for (const [q, key] of approvedKeys) {
    const id = `QST-MUST-FHB1022-PHARM2-Q${q}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Pharmacology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /Absalam101 Part 2/)
    assert.match(item, /src_060e284322ddf8fdf92c/)
  }

  for (const q of [2, 4, 7, 18, 22, 26, 28, 29]) {
    assert.match(coverage, new RegExp(`\\*\\*Pharmacology Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`PHARM2-Q${q}\\b`))
  }

  const articleIds = [
    'ART-INF-MUST-FHB1022-CEPHALOSPORIN-GENERATIONS',
    'ART-INF-MUST-FHB1022-CARBAPENEM-MONOBACTAM',
    'ART-INF-MUST-FHB1022-VANCOMYCIN-CLINICAL-PROFILE',
  ]
  assert.equal(items(questions).filter((item) => /PHARM2-Q/.test(item)).length, 22)
  assert.equal(items(concepts).filter((item) => articleIds.some((id) => item.includes(id))).length, 10)
  assert.equal(items(claims).filter((item) => /PHARM2-Q/.test(item)).length, 22)
  assert.equal(items(citations).filter((item) => /PHARM2-Q/.test(item)).length, 22)
  assert.equal(items(spans).filter((item) => /PHARM2-Q/.test(item)).length, 22)
  for (const articleId of articleIds) assert.match(articles, new RegExp(`## id\\n${articleId}`))
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-CEPHALOSPORIN-GENERATIONS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-CARBAPENEM-MONOBACTAM:[\s\S]*ART-INF-MUST-FHB1022-VANCOMYCIN-CLINICAL-PROFILE:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-CARBAPENEM-MONOBACTAM[\s\S]*## related_articles\nART-INF-MUST-FHB1022-CEPHALOSPORIN-GENERATIONS:[\s\S]*ART-INF-MUST-FHB1022-VANCOMYCIN-CLINICAL-PROFILE:/)
  assert.match(sources, /## id\nsrc_060e284322ddf8fdf92c[\s\S]*fully_governed_visually_read_all_pages_native_text/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_060e284322ddf8fdf92c.processingStatus, 'fully_governed')
  assert.match(coverage, /Pharmacology Q26 is held as an uncorrected generation\/spectrum conflict or ambiguity/)
  assert.match(coverage, /Pharmacology Q28 is held as a non-unique\/absolute-form hold/)
  assert.match(coverage, /Absalam Part 2 Pharmacology Q1–Q30: \*\*22 authored \/ 8 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*/)
})

test('Mucize Parasitology core Q1-Q30 emits eight exact-key Draft questions, twenty-one holds and one source-absent prompt', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const sourceIndex = JSON.parse(read('docs/MUST-Source-Imports/evidence/corpus-source-index.json'))
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approved = new Map([[3, 'B'], [5, 'C'], [8, 'A'], [9, 'C'], [11, 'C'], [15, 'A'], [28, 'D'], [29, 'B']])
  for (const [q, key] of approved) {
    const id = `QST-MUST-FHB1022-PARA-MUCIZE-Q${String(q).padStart(2, '0')}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Mucize Parasitology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /src_352f47c6e866e76a9d8b/)
  }

  for (const q of [1, 2, 4, 6, 7, 10, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 30]) {
    assert.match(coverage, new RegExp(`\\*\\*Mucize Parasitology Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`MUCIZE-Q${String(q).padStart(2, '0')}\\b`))
  }
  assert.doesNotMatch(questions, /MUCIZE-Q25\b/)

  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(sources, /## id\nsrc_352f47c6e866e76a9d8b[\s\S]*fully_governed_visually_read_all_pages_native_text/)
  assert.equal(sourceIndex.count, 29)
  assert.equal(sourceIndex.sources.src_352f47c6e866e76a9d8b.sha256, '352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f')
  assert.match(coverage, /Mucize Parasitology core Q1–Q30: \*\*8 authored \/ 21 held \/ 1 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q25 has a complete prompt, but its same-page answer row skips Q25 and visibly prints “35\.B”/)
  assert.match(coverage, /exact next boundary is Mucize Parasitology Q31/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /\| Source-absent prompt dispositions \| 2 \|/)
})

test('Mucize Parasitology core Q31-Q60 emits sixteen governed Draft questions and fourteen exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approved = new Map([
    [31, 'A'], [38, 'B'], [41, 'C'], [42, 'C'], [43, 'C'], [44, 'A'], [45, 'A'], [46, 'B'],
    [47, 'C'], [48, 'C'], [49, 'B'], [54, 'A'], [57, 'C'], [58, 'B'], [59, 'C'], [60, 'B'],
  ])
  for (const [q, key] of approved) {
    const id = `QST-MUST-FHB1022-PARA-MUCIZE-Q${String(q).padStart(2, '0')}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Mucize Parasitology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /src_352f47c6e866e76a9d8b/)
  }

  for (const q of [32, 33, 34, 35, 36, 37, 39, 40, 50, 51, 52, 53, 55, 56]) {
    assert.match(coverage, new RegExp(`\\*\\*Mucize Parasitology Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`MUCIZE-Q${String(q).padStart(2, '0')}\\b`))
  }

  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(coverage, /Mucize Parasitology core Q31–Q60: \*\*16 authored \/ 14 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Mucize Parasitology core Q1–Q60 cumulative: \*\*24 authored \/ 35 held \/ 1 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Parasitology Q61/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
})

test('Mucize Parasitology core Q61-Q90 emits eighteen governed Draft questions and twelve exact holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approved = new Map([
    [62, 'C'], [67, 'A'], [68, 'D'], [69, 'A'], [70, 'B'], [71, 'C'], [72, 'A'], [74, 'C'], [75, 'C'],
    [76, 'B'], [80, 'B'], [82, 'B'], [83, 'C'], [84, 'C'], [85, 'A'], [87, 'B'], [88, 'A'], [89, 'A'],
  ])
  for (const [q, key] of approved) {
    const id = `QST-MUST-FHB1022-PARA-MUCIZE-Q${String(q).padStart(2, '0')}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Mucize Parasitology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /src_352f47c6e866e76a9d8b/)
  }

  for (const q of [61, 63, 64, 65, 66, 73, 77, 78, 79, 81, 86, 90]) {
    assert.match(coverage, new RegExp(`\\*\\*Mucize Parasitology Q${q} is held`))
    assert.doesNotMatch(questions, new RegExp(`MUCIZE-Q${String(q).padStart(2, '0')}\\b`))
  }

  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(coverage, /Mucize Parasitology core Q61–Q90: \*\*18 authored \/ 12 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Mucize Parasitology core Q1–Q90 cumulative: \*\*42 authored \/ 47 held \/ 1 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Parasitology Q91/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
})

test('Mucize Parasitology core Q91-Q95 emits four governed Draft questions and one exact hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const approved = new Map([[91, 'B'], [92, 'B'], [93, 'B'], [94, 'C']])
  for (const [q, key] of approved) {
    const id = `QST-MUST-FHB1022-PARA-MUCIZE-Q${String(q).padStart(2, '0')}`
    const item = items(questions).find((candidate) => candidate.includes(`## id\n${id}\n`))
    assert.ok(item, `Mucize Parasitology Q${q} must be authored exactly once`)
    assert.match(item, new RegExp(`## correct_answer\\n${key}\\n`))
    assert.match(item, /## status\nDraft\n/)
    assert.match(item, /src_352f47c6e866e76a9d8b/)
  }

  assert.match(coverage, /\*\*Mucize Parasitology Q95 is held as an established leishmaniasis dependency-chain hold/)
  assert.doesNotMatch(questions, /MUCIZE-Q95\b/)
  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(coverage, /Mucize Parasitology core Q91–Q95: \*\*4 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Mucize Parasitology core Q1–Q95 cumulative: \*\*46 authored \/ 48 held \/ 1 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Mucize Parasitology core Q1–Q95 cumulative: [^\n]*The exact next boundary is Mucize case-based learning Case 1 on physical page 20/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
})

test('Mucize case-based learning Case 1 preserves both printed keys as explicit holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZE-CASE1-Q[12]\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 1 Q1 is held as an existing-identity hold/)
  assert.match(coverage, /Printed A, Anopheles mosquito/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 1 Q2 is held as an established cyclopropagative dependency-chain hold/)
  assert.match(coverage, /Printed B, Cyclo-propagative transmission/)
  assert.match(coverage, /Mucize case-based learning Case 1: \*\*0 authored \/ 2 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 2 on physical page 20/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 2 records all three repeated identities as explicit holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZE-CASE2-Q[123]\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 2 Q1 is held as an exact same-source identity duplicate/)
  assert.match(coverage, /Printed B, Elephantiasis/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 2 Q2 is held as an exact same-source identity duplicate/)
  assert.match(coverage, /Printed B, Culex mosquito/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 2 Q3 is held as an existing governed-question identity hold/)
  assert.match(coverage, /Printed C, Cyclo-developmental transmission/)
  assert.match(coverage, /Mucize case-based learning Case 2: \*\*0 authored \/ 3 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 3 on physical page 21/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 3 preserves both Aedes-yellow-fever occurrences as raw-identity holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZE-CASE3-Q[12]\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 3 Q1 is held as a raw-identity hold/)
  assert.match(coverage, /Printed B, Aedes mosquito/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 3 Q2 is held as a raw-identity hold/)
  assert.match(coverage, /Printed B, Yellow fever/)
  assert.match(coverage, /concept_67e667ad81d088a8265cb35b/)
  assert.match(coverage, /Mucize case-based learning Case 3: \*\*0 authored \/ 2 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 4 on physical page 21/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(claims).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(citations).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(spans).filter((item) => /MUCIZE-Q/.test(item)).length, 46)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 4 authors only the clean Aedes-Zika vector item and holds three conflicts', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const question = items(questions).find((item) => item.includes('## id\nQST-MUST-FHB1022-PARA-MUCIZECASE4-Q02\n'))
  assert.ok(question)
  assert.match(question, /## correct_answer\nB\n/)
  assert.match(question, /## status\nDraft\n/)
  assert.match(question, /## main_concept\nCON-INF-326CB7EB4934C6\n/)
  assert.match(question, /src_352f47c6e866e76a9d8b/)
  assert.match(question, /src_b75f65f2298d0fcbc5f3/)
  assert.doesNotMatch(questions, /MUCIZECASE4-Q0[134]\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 4 Q1 is held as an exact same-source identity duplicate/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 4 Q3 is held as an existing governed-question identity hold/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 4 Q4 is held as a non-unique teaching-form conflict/)
  assert.match(coverage, /Propagative\/Transoverian\?\?/)
  assert.match(coverage, /Mucize case-based learning Case 4: \*\*1 authored \/ 3 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 5 on physical page 22/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).filter((item) => /MUCIZECASE4-Q/.test(item)).length, 1)
  assert.equal(items(claims).filter((item) => /MUCIZECASE4-Q/.test(item)).length, 1)
  assert.equal(items(citations).filter((item) => /MUCIZECASE4-Q/.test(item)).length, 1)
  assert.equal(items(spans).filter((item) => /MUCIZECASE4-Q/.test(item)).length, 1)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-MOSQUITO-DISEASES[\s\S]*QST-MUST-FHB1022-PARA-MUCIZECASE4-Q02/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 5 preserves its supported malaria transmission key as a dependency-chain hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZECASE5-Q01\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 5 Q1 is held as an established cyclopropagative dependency-chain hold/)
  assert.match(coverage, /Printed C, Cyclo-propagative/)
  assert.match(coverage, /CON-INF-23265735EECCA1/)
  assert.match(coverage, /ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE/)
  assert.match(coverage, /Mucize case-based learning Case 5: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 6 on physical page 22/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).filter((item) => /MUCIZECASE5-Q/.test(item)).length, 0)
  assert.equal(items(claims).filter((item) => /MUCIZECASE5-Q/.test(item)).length, 0)
  assert.equal(items(citations).filter((item) => /MUCIZECASE5-Q/.test(item)).length, 0)
  assert.equal(items(spans).filter((item) => /MUCIZECASE5-Q/.test(item)).length, 0)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 6 authors only the vector item and holds two same-source identities', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const question = items(questions).find((item) => item.includes('## id\nQST-MUST-FHB1022-PARA-MUCIZECASE6-Q01\n'))
  assert.ok(question)
  assert.match(question, /## question\nWhat is the vector\?\n/)
  assert.match(question, /## correct_answer\nA\n/)
  assert.match(question, /## answer_a\nSandfly\n/)
  assert.match(question, /## status\nDraft\n/)
  assert.match(question, /## main_concept\nCON-INF-F538E763E1260E\n/)
  assert.match(question, /src_352f47c6e866e76a9d8b/)
  assert.match(question, /src_a82c32271ee38d0b2cad/)
  assert.doesNotMatch(questions, /MUCIZECASE6-Q0[23]\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 6 Q2 is held as an exact same-source identity duplicate/)
  assert.match(coverage, /Printed A, Sandfly fever virus/)
  assert.match(coverage, /Mucize core Q82 already authors/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 6 Q3 is held as an exact same-source identity duplicate/)
  assert.match(coverage, /Printed B, Propagative/)
  assert.match(coverage, /Mucize core Q83 already authors/)
  assert.match(coverage, /Mucize case-based learning Case 6: \*\*1 authored \/ 2 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 7 on physical page 22/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).filter((item) => /MUCIZECASE6-Q/.test(item)).length, 1)
  assert.equal(items(claims).filter((item) => /MUCIZECASE6-Q/.test(item)).length, 1)
  assert.equal(items(citations).filter((item) => /MUCIZECASE6-Q/.test(item)).length, 1)
  assert.equal(items(spans).filter((item) => /MUCIZECASE6-Q/.test(item)).length, 1)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-SANDFLY-DISEASES[\s\S]*QST-MUST-FHB1022-PARA-MUCIZECASE6-Q01/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 7 authors only the Lutzomyia vector item and holds two same-source identities', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  const question = items(questions).find((item) => item.includes('## id\nQST-MUST-FHB1022-PARA-MUCIZECASE7-Q02\n'))
  assert.ok(question)
  assert.match(question, /## question\nWhat is the vector\?\n/)
  assert.match(question, /## correct_answer\nA\n/)
  assert.match(question, /## answer_a\nSandfly \(Lutzomyia\)\n/)
  assert.match(question, /## status\nDraft\n/)
  assert.match(question, /## main_concept\nCON-INF-482144C092C2DD\n/)
  assert.match(question, /src_352f47c6e866e76a9d8b/)
  assert.match(question, /src_a82c32271ee38d0b2cad/)
  assert.doesNotMatch(questions, /MUCIZECASE7-Q0[13]\b/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 7 Q1 is held as an exact same-source identity duplicate with a disclosed source artifact/)
  assert.match(coverage, /Option A visibly ends with an extra “B”/)
  assert.match(coverage, /Mucize core Q84 already authors/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 7 Q3 is held as an exact same-source identity duplicate/)
  assert.match(coverage, /Printed B, Propagative/)
  assert.match(coverage, /Mucize core Q85 already authors/)
  assert.match(coverage, /Mucize case-based learning Case 7: \*\*1 authored \/ 2 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize case-based learning Case 8 on physical page 23/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).filter((item) => /MUCIZECASE7-Q/.test(item)).length, 1)
  assert.equal(items(claims).filter((item) => /MUCIZECASE7-Q/.test(item)).length, 1)
  assert.equal(items(citations).filter((item) => /MUCIZECASE7-Q/.test(item)).length, 1)
  assert.equal(items(spans).filter((item) => /MUCIZECASE7-Q/.test(item)).length, 1)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-SANDFLY-DISEASES[\s\S]*QST-MUST-FHB1022-PARA-MUCIZECASE7-Q02/)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize case-based learning Case 8 remains a four-item dependency-chain hold with literal keys preserved', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZECASE8-Q0[1-4]\b/)
  assert.doesNotMatch(claims, /MUCIZECASE8-Q0[1-4]\b/)
  assert.doesNotMatch(citations, /MUCIZECASE8-Q0[1-4]\b/)
  assert.doesNotMatch(spans, /MUCIZECASE8-Q0[1-4]\b/)
  assert.match(coverage, /Mucize case-based learning Case 8: \*\*0 authored \/ 4 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q1 A, Cutaneous leishmaniasis \(Oriental sore\); Q2 A, Sandfly; Q3 C, Cyclo-propagative; Q4 A, Promastigote/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 8 Q1 is held as an established cutaneous-leishmaniasis dependency-chain hold/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 8 Q2 is held as an established cutaneous-leishmaniasis dependency-chain hold/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 8 Q3 is held as an established cyclopropagative dependency-chain hold/)
  assert.match(coverage, /\*\*Mucize case-based learning Case 8 Q4 is held as an established cutaneous-leishmaniasis dependency-chain hold/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQs Q1 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q1 remains an exact raw-identity and same-source duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?1\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?1\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?1\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?1\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q1: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q1 A, The host that harbors the sexual stage of the parasite/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q1 is held as an exact raw-identity and same-source duplicate hold/)
  assert.match(coverage, /concept_4cf60f293dd2603501b07838/)
  assert.match(coverage, /Mucize core Q4 is the earlier held occurrence from the same assessment source/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q2 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q2 remains an exact raw-identity and prior-family duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?2\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?2\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?2\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?2\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q2: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q2 B, The host where the parasite undergoes asexual reproduction or larval development/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q2 is held as an exact raw-identity and prior-family duplicate hold/)
  assert.match(coverage, /concept_379bf3d8ea267775959b6004/)
  assert.match(coverage, /Absalam Introduction Q7 is the earlier held occurrence/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q3 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q3 remains an exact raw-identity and prior-family duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?3\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?3\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?3\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?3\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q3: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q3 B, It maintains the parasite in nature and serves as a source of infection for humans/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q3 is held as an exact raw-identity and prior-family duplicate hold/)
  assert.match(coverage, /concept_49b33fb2fff7f5b6f66ebc34/)
  assert.match(coverage, /Absalam Introduction Q8 is the earlier held occurrence/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q4 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q4 remains an exact raw-identity and prior-family overlap hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?4\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?4\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?4\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?4\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q4: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q4 B, It transmits the parasite after the parasite undergoes development or multiplication within the vector/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q4 is held as an exact raw-identity and prior-family overlap hold/)
  assert.match(coverage, /concept_43f3ea4937e6ad886a73ed80/)
  assert.match(coverage, /Absalam Introduction Q29 and Arthropoda Q36/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q5 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q5 remains an existing local dependency and same-source scope-overlap hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?5\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?5\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?5\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?5\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q5: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q5 C, Fecal-oral route/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q5 is held as an existing local dependency and same-source scope-overlap hold/)
  assert.match(coverage, /CON-INF-A5D19C7E204BF3/)
  assert.match(coverage, /Mucize core Q24/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q6 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q6 remains an exact-identity and unsupported species-precision hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?6\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?6\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?6\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?6\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q6: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q6 B, Housefly carrying Entamoeba histolytica cysts on its legs/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q6 is held as an exact-identity and unsupported species-precision hold/)
  assert.match(coverage, /concept_012efb068aac441646ea164f/)
  assert.match(coverage, /concept_ed540a67619ad2d979d7558f/)
  assert.match(coverage, /Mucize core Q27/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q7 on physical page 24/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q7 remains a compound existing-identity hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?7\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?7\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?7\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?7\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q7: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q7 C, An obligate parasite cannot survive without a host, while a facultative parasite can live both freely and parasitically/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q7 is held as a compound existing-identity hold/)
  assert.match(coverage, /CON-INF-F82C6307A7B7E3/)
  assert.match(coverage, /CON-INF-6E41B8C3F902AD/)
  assert.match(coverage, /Absalam Introduction Q4 and Q25/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q8 on physical page 25/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q8 remains an exact governed-identity duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?8\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?8\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?8\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?8\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q8: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q8 B, A disease that is transmitted from animals to humans/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q8 is held as an exact governed-identity and prior-family duplicate hold/)
  assert.match(coverage, /CON-INF-93B7D64C0E2A15/)
  assert.match(coverage, /Absalam Introduction Q22/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q9 on physical page 25/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q9 remains an exact same-source and prior-family duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q0?9\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q0?9\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q0?9\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q0?9\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q9: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q9 C, The bloodstream/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q9 is held as an exact same-source and prior-family duplicate hold/)
  assert.match(coverage, /CON-INF-829EB6EC11CC8F/)
  assert.match(coverage, /Absalam Introduction Q9 and Mucize core Q5/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q10 on physical page 25/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q10 remains an uncorrected authority and superlative-form hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q10\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q10\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q10\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q10\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q10: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q10 C, Vaccinating the reservoir host/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q10 is held as an uncorrected authority and superlative-form hold/)
  assert.match(coverage, /integrated anti-mosquito control/)
  assert.match(coverage, /does not identify reservoir-host vaccination/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q11 on physical page 25/)
  assert.match(sources, /Physical pages 6–27 and 28 were rendered and visually re-read/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q11 authors the clean pupal-stage distinction against the existing concept', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.match(questions, /QST-MUST-FHB1022-PARA-MUCIZEADV-Q11/)
  assert.match(questions, /What is the key difference between complete and incomplete metamorphosis in arthropods\?/)
  assert.match(questions, /Complete metamorphosis involves a pupal stage, while incomplete metamorphosis does not/)
  assert.match(questions, /Complete metamorphosis involves only nymph stages, while incomplete metamorphosis involve larvae/)
  assert.match(questions, /## correct_answer\nA/)
  assert.match(questions, /## main_concept\nCON-INF-1E7B4A9D306FC2/)
  assert.match(claims, /CLM-INF-MUST-FHB1022-MUCIZEADV-Q11-01/)
  assert.match(citations, /CIT-INF-MUST-FHB1022-MUCIZEADV-Q11-01/)
  assert.match(spans, /SPN-INF-MUST-FHB1022-MUCIZEADV-Q11-01/)
  assert.match(coverage, /Mucize Advanced MCQ Q11: \*\*1 authored \/ 0 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q11 A, Complete metamorphosis involves a pupal stage, while incomplete metamorphosis does not/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q12 on physical page 25/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q12 remains an established cyclopropagative dependency-chain hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q12\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q12\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q12\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q12\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q12: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q12 C, Cyclo-propagative transmission/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q12 is held as an established cyclopropagative dependency-chain hold/)
  assert.match(coverage, /CON-INF-23265735EECCA1/)
  assert.match(coverage, /ART-INF-MUST-FHB1022-CYCLOPROPAGATIVE/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q13 on physical page 25/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q13 authors the clean cutaneous-myiasis skin-lesion feature', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.match(questions, /QST-MUST-FHB1022-PARA-MUCIZEADV-Q13/)
  assert.match(questions, /Which of the following is a key feature of cutaneous myiasis\?/)
  assert.match(questions, /The larvae cause lesions or nodules in the skin/)
  assert.match(questions, /## correct_answer\nB/)
  assert.match(questions, /## main_concept\nCON-INF-6D13C7A920B4EF/)
  assert.match(concepts, /CON-INF-6D13C7A920B4EF/)
  assert.match(concepts, /Cutaneous myiasis produces lesions or nodules in the skin/)
  assert.match(articles, /ART-INF-MUST-FHB1022-CUTANEOUS-MYIASIS-PHORESIS/)
  assert.match(articles, /cutaneous myiasis produces skin lesions or nodules/i)
  assert.match(claims, /CLM-INF-MUST-FHB1022-MUCIZEADV-Q13-01/)
  assert.match(citations, /CIT-INF-MUST-FHB1022-MUCIZEADV-Q13-01/)
  assert.match(spans, /SPN-INF-MUST-FHB1022-MUCIZEADV-Q13-01/)
  assert.match(coverage, /Mucize Advanced MCQ Q13: \*\*1 authored \/ 0 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q13 B, The larvae cause lesions or nodules in the skin/)
  assert.match(coverage, /concept_3965ff3ac0ffc63c51c97f38/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q14 on physical page 25/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q14 remains an exact governed-identity and prior-family duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q14\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q14\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q14\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q14\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q14: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q14 A, The pathogen is transmitted to the offspring of the vector/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q14 is held as an exact governed-identity and prior-family duplicate hold/)
  assert.match(coverage, /CON-INF-7C2E91B4F805AD/)
  assert.match(coverage, /QST-MUST-FHB1022-PARA-INTRO-Q40/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q15 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q15 remains an authority-form and raw-identity hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q15\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q15\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q15\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q15\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q15: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q15 B, Gastric myiasis/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q15 is held as an authority-form and raw-identity hold/)
  assert.match(coverage, /concept_81f780bbf4afc4cb9d4c9a30/)
  assert.match(coverage, /concept_8f98d380a95e2bd806b1f319/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q16 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q16 remains an exact governed-identity and same-source duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q16\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q16\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q16\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q16\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q16: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q16 B, Larvae cause lesions or nodules in the skin/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q16 is held as an exact governed-identity and same-source duplicate hold/)
  assert.match(coverage, /CON-INF-6D13C7A920B4EF/)
  assert.match(coverage, /QST-MUST-FHB1022-PARA-MUCIZEADV-Q13/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q17 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q17 authors the urogenital-latrine myiasis completion', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.match(questions, /QST-MUST-FHB1022-PARA-MUCIZEADV-Q17/)
  assert.match(questions, /Which type of myiasis is most likely to occur in individuals who frequently use public toilets or latrines\?/)
  assert.match(questions, /Urogenital myiasis/)
  assert.match(questions, /## correct_answer\nB/)
  assert.match(questions, /## main_concept\nCON-INF-A17B2E4C9D6F81/)
  assert.match(concepts, /CON-INF-A17B2E4C9D6F81/)
  assert.match(concepts, /Urogenital myiasis follows public-toilet or latrine exposure/)
  assert.match(articles, /ART-INF-MUST-FHB1022-CLINICAL-SITE-MYIASIS/)
  assert.match(claims, /CLM-INF-MUST-FHB1022-MUCIZEADV-Q17-01/)
  assert.match(citations, /CIT-INF-MUST-FHB1022-MUCIZEADV-Q17-01/)
  assert.match(spans, /SPN-INF-MUST-FHB1022-MUCIZEADV-Q17-01/)
  assert.match(coverage, /Mucize Advanced MCQ Q17: \*\*1 authored \/ 0 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Advanced Q1–Q17 cumulative: \*\*3 authored \/ 14 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /concept_25a7c6c1a0f6c476622cf674/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q18 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q18 remains a same-source raw-identity dependency hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q18\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q18\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q18\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q18\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q18: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q18 C, Larvae invade the ear canal, potentially reaching the middle or inner ear/)
  assert.match(coverage, /\*\*Mucize Advanced MCQ Q18 is held as a same-source raw-identity dependency hold/)
  assert.match(coverage, /concept_25690ce10dd47faf309ae1f3/)
  assert.match(coverage, /Advanced Q1–Q18 cumulative: \*\*3 authored \/ 15 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q19 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q19 authors the nasopharyngeal myiasis identity', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.match(questions, /QST-MUST-FHB1022-PARA-MUCIZEADV-Q19/)
  assert.match(questions, /Which type of myiasis is characterized by the invasion of the nasal passages or sinuses by fly larvae\?/)
  assert.match(questions, /## correct_answer\nC/)
  assert.match(questions, /## main_concept\nCON-INF-F42C8B916A3D75/)
  assert.match(concepts, /CON-INF-F42C8B916A3D75/)
  assert.match(concepts, /Nasopharyngeal myiasis invades the nasal passages and sinuses/)
  assert.match(claims, /CLM-INF-MUST-FHB1022-MUCIZEADV-Q19-01/)
  assert.match(citations, /CIT-INF-MUST-FHB1022-MUCIZEADV-Q19-01/)
  assert.match(spans, /SPN-INF-MUST-FHB1022-MUCIZEADV-Q19-01/)
  assert.match(coverage, /Mucize Advanced MCQ Q19: \*\*1 authored \/ 0 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Advanced Q1–Q19 cumulative: \*\*4 authored \/ 15 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q20 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q20 remains an exact governed-identity and same-source duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q20\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q20\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q20\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q20\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q20: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q20 B, They require a blood meal for egg production and can transmit pathogens during feeding/)
  assert.match(coverage, /CON-INF-D40D6E6C25F7C4/)
  assert.match(coverage, /Advanced Q1–Q20 cumulative: \*\*4 authored \/ 16 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q21 on physical page 26/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q21 remains an exact governed-identity and prior-family duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q21\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q21\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q21\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q21\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q21: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q21 B, Anopheles rests at a 45-degree angle, while Culex\/Aedes rest parallel to the surface/)
  assert.match(coverage, /CON-INF-449076BA8EA921/)
  assert.match(coverage, /Advanced Q1–Q21 cumulative: \*\*4 authored \/ 17 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q22 on physical page 27/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})

test('Mucize Advanced MCQ Q22 remains an exact governed-identity and same-source duplicate hold', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.doesNotMatch(questions, /MUCIZEADV(?:ANCED)?-Q22\b/)
  assert.doesNotMatch(claims, /MUCIZEADV(?:ANCED)?-Q22\b/)
  assert.doesNotMatch(citations, /MUCIZEADV(?:ANCED)?-Q22\b/)
  assert.doesNotMatch(spans, /MUCIZEADV(?:ANCED)?-Q22\b/)
  assert.match(coverage, /Mucize Advanced MCQ Q22: \*\*0 authored \/ 1 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q22 B, Stagnant water/)
  assert.match(coverage, /CON-INF-EBC6A5A33FF6AA/)
  assert.match(coverage, /Advanced Q1–Q22 cumulative: \*\*4 authored \/ 18 held \/ 0 source-absent \/ 0 unassessed\*\*/)
  assert.match(coverage, /exact next boundary is Mucize Advanced MCQ Q23 on physical page 27/)
  assert.match(sources, /case-based learning Cases 1–8 and Advanced MCQs Q1–Q22 authoring audit/)
  assert.equal(items(questions).length, 123)
  assert.equal(items(claims).length, 123)
  assert.equal(items(citations).length, 123)
  assert.equal(items(spans).length, 123)
  assert.equal(items(concepts).length, 82)
  assert.equal(items(articles).length, 19)
  assert.match(coverage, /\| Evidence resources \| 29 \|/)
  assert.match(coverage, /\| Claims \| 226 \|/)
  assert.match(coverage, /\| Citations \| 231 \|/)
  assert.match(coverage, /\| Article spans \| 226 \|/)
  assert.match(coverage, /\| Concepts \| 160 \|/)
  assert.match(coverage, /\| Articles \| 44 \|/)
  assert.match(coverage, /\| Questions \| 226 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 273 \| no student-facing record authored \|/)
  assert.match(coverage, /Governed prompt observations: 5,444 total; 226 authored; \*\*5,218 raw prompt observations remain\*\*, including 273 explicit holds and two source-absent prompts/)
  assert.match(coverage, /Governed answer observations: 5,211 total; 226 clean source-keyed prompts authored; \*\*4,985 raw answer observations remain\*\*, including the 273 held printed-key observations/)
})
