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

test('the approved Absalam introduction and two Arthropoda slices emit thirty clean Draft questions and thirty ledger holds', () => {
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

  assert.equal(items(questions).length, 30)
  assert.equal(items(articles).length, 13)
  assert.equal(items(concepts).length, 27)
  assert.equal(items(claims).length, 30)
  assert.equal(items(citations).length, 30)
  assert.equal(items(spans).length, 30)

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

  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 13)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 27)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 27)
  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 30)
  assert.equal((concepts.match(/^## id\nCON-INF-D13F9697E5B95F$/gm) || []).length, 1)
  assert.equal((questions.match(/^## main_concept\nCON-INF-D13F9697E5B95F$/gm) || []).length, 3)
  assert.equal((concepts.match(/^## id\nCON-INF-23265735EECCA1$/gm) || []).length, 0)
  assert.equal((questions.match(/^## main_concept\nCON-INF-23265735EECCA1$/gm) || []).length, 0)
  assert.match(questions, /Q18 preserves the source's singular “an organism” wording although Apicomplexa is a group/)
  assert.match(questions, /Q53 preserves the source's “species” wording although Lucilia and Sarcophaga are genus names/)
  assert.match(questions, /Q54 preserves the source's literal “Diabetes foot ulcers” wording although the governed teaching says diabetic foot/)
  assert.match(coverage, /Q17 is held in the Absalam introduction family.*“Flagella” is the locomotor organ[\s\S]*No correction was imported/)
  assert.match(sources, /## id\nsrc_4bd3b78f762673d7eb7f/)
  assert.match(sources, /## id\nsrc_f65b3872022ca0b42a79/)
  assert.match(vectorSources, /## id\nsrc_2c1e04372fbb8b2607f7/)
  assert.match(coverage, /\| Questions \| 76 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 105 \| no student-facing record authored \|/)
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

  assert.equal(items(questions).length, 38)
  assert.equal(items(articles).length, 6)
  assert.equal(items(concepts).length, 34)
  assert.equal(items(claims).length, 38)
  assert.equal(items(citations).length, 38)
  assert.equal(items(spans).length, 38)

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

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 38)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 6)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 34)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 34)
  assert.equal((questions.match(/^## main_concept\nCON-INF-98A3DF2E20880C$/gm) || []).length, 2)

  assert.match(articles, /## id\nART-INF-MUST-FHB1022-MICROBIOLOGY-FOUNDATIONS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-MICROBIAL-CELL-ORGANISATION:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-MICROBIAL-CELL-ORGANISATION[\s\S]*## related_articles\nART-INF-MUST-FHB1022-MICROBIOLOGY-FOUNDATIONS:/)
  assert.match(assessmentSource, /Pages 19–22 and 27 were rendered and visually read for global Q61–Q75/)
  assert.match(teachingSource, /Pages 1, 9–15, 28, 30, 32, 34 and 37–38 were rendered and visually read for global Q61–Q75/)

  assert.match(coverage, /First Absalam Microbiology Ch1-3 slice, global Q61–Q75: \*\*6 authored \/ 9 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q75: \*\*36 authored \/ 39 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /\| Claims \| 76 \|/)
  assert.match(coverage, /\| Citations \| 81 \|/)
  assert.match(coverage, /\| Article spans \| 76 \|/)
  assert.match(coverage, /\| Concepts \| 69 \|/)
  assert.match(coverage, /\| Articles \| 27 \|/)
  assert.match(coverage, /\| Questions \| 76 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 105 \| no student-facing record authored \|/)
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

  assert.equal(items(questions).length, 38)
  assert.equal(items(articles).length, 6)
  assert.equal(items(concepts).length, 34)
  assert.equal(items(claims).length, 38)
  assert.equal(items(citations).length, 38)
  assert.equal(items(spans).length, 38)

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

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 38)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 6)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 34)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 34)
  assert.match(assessmentSource, /Pages 23–27 were rendered and visually read for global Q76–Q90/)
  assert.match(teachingSource, /Pages 24, 28, 30, 32–36 and 38 were rendered and visually read for global Q76–Q90/)

  assert.match(coverage, /Second Absalam Microbiology Ch1-3 slice, global Q76–Q90: \*\*3 authored \/ 12 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q90: \*\*39 authored \/ 51 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /\| Claims \| 76 \|/)
  assert.match(coverage, /\| Citations \| 81 \|/)
  assert.match(coverage, /\| Article spans \| 76 \|/)
  assert.match(coverage, /\| Concepts \| 69 \|/)
  assert.match(coverage, /\| Articles \| 27 \|/)
  assert.match(coverage, /\| Questions \| 76 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 105 \| no student-facing record authored \|/)
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

  assert.equal(items(questions).length, 38)
  assert.equal(items(articles).length, 6)
  assert.equal(items(concepts).length, 34)
  assert.equal(items(claims).length, 38)
  assert.equal(items(citations).length, 38)
  assert.equal(items(spans).length, 38)

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

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 38)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 6)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 34)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 34)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-COLONIZATION-CARRIAGE[\s\S]*## related_articles\nART-INF-MUST-FHB1022-VIRULENCE-EVASION:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-VIRULENCE-EVASION[\s\S]*## related_articles\nART-INF-MUST-FHB1022-COLONIZATION-CARRIAGE:/)
  assert.match(sources, /## id\nsrc_e4b2f7ce3e55fad37c9a/)
  assert.equal(sourceIndex.count, 24)
  assert.equal(sourceIndex.sources.src_e4b2f7ce3e55fad37c9a.sha256, 'e4b2f7ce3e55fad37c9a588f1b1c0f015b1d261369ed59d45a3715c9ffe02f2d')
  assert.match(coverage, /Absalam Microbiology Chapter 6, global Q91–Q120: \*\*10 authored \/ 20 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q120: \*\*49 authored \/ 71 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q100 is held in the Absalam Microbiology Chapter 6 family as an uncorrected teaching conflict/)
  assert.match(coverage, /Q111 is held in the Absalam Microbiology Chapter 6 family as an authority\/wording conflict/)
  assert.match(coverage, /\| Claims \| 76 \|/)
  assert.match(coverage, /\| Citations \| 81 \|/)
  assert.match(coverage, /\| Article spans \| 76 \|/)
  assert.match(coverage, /\| Concepts \| 69 \|/)
  assert.match(coverage, /\| Articles \| 27 \|/)
  assert.match(coverage, /\| Questions \| 76 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 105 \| no student-facing record authored \|/)
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

  assert.equal(items(questions).length, 38)
  assert.equal(items(articles).length, 6)
  assert.equal(items(concepts).length, 34)
  assert.equal(items(claims).length, 38)
  assert.equal(items(citations).length, 38)
  assert.equal(items(spans).length, 38)

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

  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 38)
  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 6)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 34)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 34)
  assert.equal((questions.match(/^## main_concept\nCON-INF-AF1A323DC43B0A$/gm) || []).length, 2)
  assert.equal((questions.match(/^## main_concept\nCON-INF-D09939F6D566ED$/gm) || []).length, 3)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-CELL-WALL-ANTIBIOTICS[\s\S]*## related_articles\nART-INF-MUST-FHB1022-PENICILLIN-CLASSES-USE-SAFETY:/)
  assert.match(articles, /## id\nART-INF-MUST-FHB1022-PENICILLIN-CLASSES-USE-SAFETY[\s\S]*## related_articles\nART-INF-MUST-FHB1022-CELL-WALL-ANTIBIOTICS:/)
  assert.match(assessmentSource, /Pages 37–44 and answer page 45 were rendered and visually read for global Q121–Q150/)
  assert.match(teachingSources, /## id\nsrc_ee1fb7a716a473eb2d98/)
  assert.equal(sourceIndex.count, 24)
  assert.equal(sourceIndex.sources.src_ee1fb7a716a473eb2d98.sha256, 'ee1fb7a716a473eb2d983d7f25ad342f2320dc40d55d3c8d32b777ae69fb46a3')
  assert.match(coverage, /Absalam Pharmacology, global Q121–Q150: \*\*19 authored \/ 11 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam source global Q1–Q150: \*\*68 authored \/ 82 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q145 is held in the Absalam Pharmacology family as an uncorrected teaching conflict/)
  assert.match(coverage, /\| Evidence resources \| 24 \|/)
  assert.match(coverage, /\| Claims \| 76 \|/)
  assert.match(coverage, /\| Citations \| 81 \|/)
  assert.match(coverage, /\| Article spans \| 76 \|/)
  assert.match(coverage, /\| Concepts \| 69 \|/)
  assert.match(coverage, /\| Articles \| 27 \|/)
  assert.match(coverage, /\| Questions \| 76 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 105 \| no student-facing record authored \|/)
})
