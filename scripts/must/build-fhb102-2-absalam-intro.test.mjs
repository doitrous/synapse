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

test('the approved Absalam introduction and reduced first Arthropoda slices emit twenty clean Draft questions and twenty-five ledger holds', () => {
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

  assert.equal(items(questions).length, 20)
  assert.equal(items(articles).length, 9)
  assert.equal(items(concepts).length, 17)
  assert.equal(items(claims).length, 20)
  assert.equal(items(citations).length, 20)
  assert.equal(items(spans).length, 20)

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
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-PARA-INTRO-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q1', 'Q3', 'Q6', 'Q7', 'Q8', 'Q10', 'Q12', 'Q13', 'Q16', 'Q17', 'Q20', 'Q26', 'Q27', 'Q28', 'Q29', 'Q30', 'Q34', 'Q35', 'Q36', 'Q37', 'Q38', 'Q39', 'Q42', 'Q43', 'Q45']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held`))
    assert.doesNotMatch(questions, new RegExp(`INTRO-${held.padStart(3, '0')}\\b`))
  }

  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 9)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 17)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 17)
  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 20)
  assert.equal((concepts.match(/^## id\nCON-INF-D13F9697E5B95F$/gm) || []).length, 1)
  assert.equal((questions.match(/^## main_concept\nCON-INF-D13F9697E5B95F$/gm) || []).length, 3)
  assert.equal((concepts.match(/^## id\nCON-INF-23265735EECCA1$/gm) || []).length, 0)
  assert.equal((questions.match(/^## main_concept\nCON-INF-23265735EECCA1$/gm) || []).length, 0)
  assert.match(questions, /Q18 preserves the source's singular “an organism” wording although Apicomplexa is a group/)
  assert.match(coverage, /Q17 is held in the Absalam introduction family.*“Flagella” is the locomotor organ[\s\S]*No correction was imported/)
  assert.match(sources, /## id\nsrc_4bd3b78f762673d7eb7f/)
  assert.match(sources, /## id\nsrc_f65b3872022ca0b42a79/)
  assert.match(vectorSources, /## id\nsrc_2c1e04372fbb8b2607f7/)
  assert.match(coverage, /\| Questions \| 28 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 48 \| no student-facing record authored \|/)
  assert.match(coverage, /First 15-prompt Absalam introduction slice: \*\*7 authored \/ 8 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Second 15-prompt Absalam introduction slice: \*\*7 authored \/ 8 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Absalam Parasitology Introduction Q1–Q30: \*\*14 authored \/ 16 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /First 15-prompt Absalam Arthropoda slice: \*\*6 authored \/ 9 held \/ 0 unassessed\*\*/)
  assert.match(coverage, /Q38 is held in the Absalam Arthropoda family as an uncorrected teaching conflict/)
  assert.match(coverage, /direct mechanical transmission/)
  assert.doesNotMatch(cyclopropagativeArticle, /ART-INF-MUST-FHB1022-TRANSOVARIAN-TRANSMISSION/)
  assert.doesNotMatch(cyclopropagativeArticle, /QST-MUST-FHB1022-PARA-INTRO-Q(?:36|42)/)
  assert.match(sarcophagaArticle, /ART-INF-MUST-FHB1022-MUSCID-IDENTIFICATION: Muscidae identification: Stomoxys and Musca/)

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
