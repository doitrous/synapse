import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_992325268b40230b61a5'
const letters = 'ABCD'

const A = {
  metabolism: 'ART-HU-BMS102-PHA-F223P1-DRUG-METABOLISM',
  kinetics: 'ART-HU-BMS102-PHA-F223P1-PHARMACOKINETIC-PARAMETERS',
  autonomic: 'ART-HU-BMS102-PHA-F223P1-AUTONOMIC-TRANSMISSION',
}
const C = {
  metabolismSites: 'CON-FND-C3B843D7032C7F',
  simpleDiffusion: 'CON-FND-584FCF6897C35E',
  volumeDistribution: 'CON-FND-63AB77D08CEA93',
  bioavailability: 'CON-FND-CF40F32A8A74A0',
  cyp450: 'CON-FND-C89BD22BC20E25',
  autonomicTransmitters: 'CON-NEU-1DB903AAE3D02A',
}

const conceptInfo = {
  [C.metabolismSites]: ['The liver is the primary site of drug metabolism in the source option set', 'Identify the liver as the source-keyed primary site of drug metabolism while retaining extrahepatic metabolism in the linked teaching.'],
  [C.simpleDiffusion]: ['Simple diffusion is passive and does not require energy', 'Distinguish simple diffusion from active transport, facilitated diffusion and endocytosis using the exact source wording.'],
  [C.volumeDistribution]: ['Volume of distribution reflects the extent of drug distribution in the body', 'Identify volume of distribution as the parameter that reflects distribution extent.'],
  [C.bioavailability]: ['Bioavailability represents the extent of absorption in the source option set', 'Select extent of absorption as the source-keyed representation of bioavailability while retaining the fuller systemic-availability definition.'],
  [C.cyp450]: ['Cytochrome P450 is the source-keyed enzyme family involved in Phase I metabolism', 'Identify cytochrome P450 as the enzyme family associated with Phase I metabolism.'],
  [C.autonomicTransmitters]: ['Preganglionic sympathetic neurons release acetylcholine', 'Name acetylcholine as the transmitter released by preganglionic sympathetic neurons.'],
}

const specs = [
  ['Q01', 'B', C.metabolismSites, A.metabolism, 'What is the primary site for drug metabolism?', ['Kidney', 'Liver', 'Lung', 'Intestine'], 'The source keys liver. The linked teaching retains that the liver is the main site rather than the only site of drug metabolism.'],
  ['Q02', 'C', C.simpleDiffusion, A.kinetics, 'Which process is passive and does not require energy?', ['Active transport', 'Facilitated diffusion', 'Simple diffusion', 'Endocytosis'], 'The source keys simple diffusion as the passive, energy-independent process in this option set.'],
  ['Q03', 'C', C.volumeDistribution, A.kinetics, 'Which parameter reflects the extent of drug distribution in the body?', ['Bioavailability', 'Half-life', 'Volume of distribution', 'Clearance'], 'The source keys volume of distribution as the parameter reflecting distribution extent.'],
  ['Q04', 'B', C.bioavailability, A.kinetics, 'What does bioavailability represent?', ['Rate of excretion', 'Extent of absorption', 'Plasma binding', 'Liver metabolism'], 'The source keys extent of absorption. The fuller linked definition distinguishes absorption from the fraction reaching systemic circulation unchanged.'],
  ['Q05', 'C', C.cyp450, A.metabolism, 'Which enzyme family is involved in Phase I metabolism?', ['UDP-glucuronosyltransferase', 'Monoamine oxidase', 'Cytochrome P450', 'Acetyltransferase'], 'The source keys cytochrome P450 as the Phase I enzyme family.'],
  ['Q06', 'B', C.autonomicTransmitters, A.autonomic, 'Which neurotransmitter is released by preganglionic sympathetic neurons?', ['Dopamine', 'Acetylcholine', 'Norepinephrine', 'Serotonin'], 'The source keys acetylcholine, consistent with all preganglionic autonomic fibres being cholinergic.'],
]

const row = fields => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const questions = specs.map(([ref, key, concept, article, stem, options, teaching]) => ({
  ref, key, concept, article, stem, options, teaching,
  id: `Q-HU102-PHA-F223-P1-${ref}`,
  claim: `CLM-HU102-F223-P1-${ref}-01`,
  questionCitation: `CIT-HU102-F223-P1-${ref}-QUESTION`,
  keyCitation: `CIT-HU102-F223-P1-${ref}-KEY`,
  span: `SPN-HU102-F223-P1-${ref}-01`,
}))

const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(value => value.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`missing ${id} in ${path}`)
  return block.trim()
}
const get = (block, name) => block.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, name, value) => block.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const setOrInsert = (block, name, value, before = 'field_notes') => block.includes(`## ${name}\n`)
  ? set(block, name, value)
  : block.replace(`\n## ${before}\n`, `\n## ${name}\n${value}\n## ${before}\n`)
const append = (block, name, values) => {
  const existing = get(block, name).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!existing.includes(value)) existing.push(value)
  return setOrInsert(block, name, existing.join('\n'))
}

const articleInfo = {
  [A.metabolism]: {
    title: 'Drug metabolism: sites and Phase I enzymes', subtopic: 'Drug metabolism', microtopic: 'Sites and Phase I metabolism', nanotopic: 'Liver and cytochrome P450',
    summary: 'A source-bounded review of the liver as the main drug-metabolism site and cytochrome P450 as a major Phase I enzyme family.',
    sections: `### Definition
Drug metabolism, or biotransformation, changes drug molecules into metabolites. The liver is the principal site for many drugs, but it is not the only possible site; the gut wall, plasma, lungs and kidneys can also contribute. Family223 Q01 therefore tests the primary site rather than an exclusive site.

### Mechanism
Phase I reactions modify or expose a functional group through processes such as oxidation, reduction or hydrolysis. Cytochrome P450 enzymes mediate many Phase I oxidations, which is the relationship tested by Family223 Q05.

### Key determinants
The source supplies two distinct facts: liver is the primary site in Q01, while cytochrome P450 is the keyed enzyme family in Q05. The right-column letters are study-bank answers and do not authenticate either statement as an official Helwan key.

### Clinical significance
The organ site and enzyme family help explain first-pass handling and drug interactions, but this Draft article gives no treatment recommendation or dose instruction.

### Common misconceptions
Do not equate “primary site” with “only site,” and do not treat every Phase I reaction as exclusively hepatic or exclusively cytochrome-P450 mediated.`,
  },
  [A.kinetics]: {
    title: 'Membrane transfer and pharmacokinetic parameters', subtopic: 'Pharmacokinetics', microtopic: 'Absorption and distribution', nanotopic: 'Diffusion, bioavailability and volume of distribution',
    summary: 'A compact guide to the three source-tested distinctions among simple diffusion, bioavailability and volume of distribution.',
    sections: `### Definition
Simple diffusion is passive movement down a concentration gradient without energy or a carrier. Bioavailability describes the fraction of an administered dose that reaches systemic circulation unchanged, while volume of distribution is an apparent parameter describing how extensively drug leaves plasma for tissues.

### Mechanism
Family223 Q02 contrasts simple diffusion with active transport, facilitated diffusion and endocytosis. Q03 asks for the parameter reflecting distribution extent. Q04 uses “extent of absorption” as its source-keyed option, while the governed concept retains the more precise systemic-availability definition.

### Key determinants
Membrane permeability, ionisation and lipid solubility influence passive transfer. Distribution is additionally shaped by perfusion and plasma or tissue binding. Bioavailability can be reduced by incomplete absorption or presystemic metabolism.

### Clinical significance
These parameters describe different stages of drug handling and should not be substituted for one another. No numerical calculation or dosing recommendation is introduced in this slice.

### Common misconceptions
Facilitated diffusion is also passive, so Q02 is bounded to its printed option/key pairing. Bioavailability is not simply a synonym for absorption, and volume of distribution is not a literal anatomical volume.`,
  },
  [A.autonomic]: {
    title: 'Autonomic preganglionic neurotransmission', subtopic: 'Autonomic pharmacology', microtopic: 'Cholinergic transmission', nanotopic: 'Preganglionic sympathetic acetylcholine',
    summary: 'A source-bounded explanation of why preganglionic sympathetic neurons release acetylcholine.',
    sections: `### Definition
Autonomic fibres are classified by the transmitter they release. All preganglionic autonomic fibres, sympathetic and parasympathetic, are cholinergic and release acetylcholine at the autonomic ganglion.

### Mechanism
The preganglionic fibre releases acetylcholine onto nicotinic receptors on the postganglionic neuron. The transmitter used later by the postganglionic fibre depends on the pathway and must not be substituted for the preganglionic answer.

### Key determinants
Family223 Q06 asks specifically about a preganglionic sympathetic neuron. Its printed B points to acetylcholine; norepinephrine is the common postganglionic sympathetic association and is therefore the tempting distractor.

### Clinical significance
This distinction supports later autonomic pharmacology without adding drug-selection or procedural guidance.

### Common misconceptions
“Sympathetic” does not mean every fibre releases norepinephrine. The location of the synapse and whether the fibre is preganglionic or postganglionic determine the transmitter.`,
  },
}

const groups = Object.groupBy(questions, question => question.article)
const articleRow = id => {
  const qs = groups[id]
  const concepts = [...new Set(qs.map(question => question.concept))]
  const info = articleInfo[id]
  return row([
    ['id', id], ['title', info.title], ['arabic_title', ''], ['aliases', `Family223 Part1 ${info.subtopic}\nHU-BMS-102 pharmacology review`], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', info.subtopic], ['microtopic', info.microtopic], ['nanotopic', info.nanotopic], ['primary_node_id', id === A.autonomic ? 'DIS-PHA-T04' : 'SYS-FND-T04-S01'], ['secondary_node_ids', id === A.autonomic ? 'DIS-PHY-T07\nSYS-NEU-T01-S02' : 'DIS-PHA-T01\nDIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', id === A.autonomic ? '4' : '6'], ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pharmacology faculty'], ['final_publisher', 'Admin team'], ['summary', info.summary], ['sections', `${info.sections}\n\n### Source-tested distinctions\n${concepts.map(concept => conceptInfo[concept][0]).join('\n')}`], ['published_summary', ''], ['published_sections', ''], ['hold_these', concepts.map(concept => conceptInfo[concept][0]).join('\n')], ['lose_the_mark', 'Treating a tier-6 review-bank letter as an official departmental key.\nGeneralising the source wording beyond its exact option set.'], ['related_concepts', concepts.join('\n')], ['related_articles', Object.values(A).filter(article => article !== id).join('\n')], ['question_ids', qs.map(q => q.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part1 > ${info.subtopic}`], ['university_notes', 'hu: Tier-6 instructor-attributed keyed review-bank evidence only; not a dated examination or official departmental key.'], ['annotations', concepts.map(concept => `### definition_of · ${concept}\nQuote: ${conceptInfo[concept][0]}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''], ['callout_evidence', qs.map(q => `### ${conceptInfo[q.concept][0]}\nClaims: ${q.claim}\nCitations: ${q.questionCitation}, ${q.keyCitation}\nSpan: ${q.span}`).join('\n\n')], ['article_source_ids', source], ['claim_ids', qs.map(q => q.claim).join('\n')], ['span_ids', qs.map(q => q.span).join('\n')], ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Family223 PDF page 1 preserves exact visible stems/options and isolated right-column study-answer letters.'], ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required before publication.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''], ['notes', 'Question-led Family223 Part1 Q01-Q06 only; no marks, official-key authority, written or practical records inferred.'], ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
}

const conceptSource = id => {
  if ([C.metabolismSites, C.simpleDiffusion, C.bioavailability].includes(id)) return join(repo, 'docs', 'Kasr-Source-Imports', 'concept', '108-INT-concepts-pharmacology.md')
  if ([C.volumeDistribution, C.cyp450].includes(id)) return join(repo, 'docs', 'medical-library-program', 'batches', 'SYS-FND-CONCEPT-009.md')
  return join(repo, 'docs', 'Kasr-Source-Imports', 'concept', '102-INT-mcq-concepts.md')
}
const conceptPlacement = {
  [C.volumeDistribution]: ['General pharmacology', 'Pharmacokinetics', 'Distribution', 'Volume of distribution', 'HU-BMS-102 > Pharmacology > Pharmacokinetics > Distribution > Volume of distribution'],
  [C.cyp450]: ['General pharmacology', 'Pharmacokinetics', 'Metabolism', 'Cytochrome P450 in Phase I metabolism', 'HU-BMS-102 > Pharmacology > Pharmacokinetics > Metabolism > Cytochrome P450'],
}
const conceptRow = id => {
  const qs = questions.filter(question => question.concept === id)
  let block = extract(conceptSource(id), id)
  for (const [name, values] of [
    ['article_ids', [...new Set(qs.map(q => q.article))]], ['atomic_claim_ids', qs.map(q => q.claim)],
    ['learner_years', ['1']],
  ]) block = append(block, name, values)
  block = setOrInsert(block, 'resource_ids', source)
  if (conceptPlacement[id]) {
    const [topic, subtopic, microtopic, nanotopic, moduleSubject] = conceptPlacement[id]
    for (const [name, value] of [['topic', topic], ['subtopic', subtopic], ['microtopic', microtopic], ['nanotopic', nanotopic], ['module_subject', moduleSubject], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['resource_occurrence_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['exclusion_reason', '']]) block = setOrInsert(block, name, value)
    block = setOrInsert(block, 'source_candidate_ids', '[clear]')
  }
  block = append(block, 'exam_signal', qs.map(q => `${source} | Family223 Part1 ${q.ref} | PDF p1 | tier-6 keyed review bank; not official key`))
  block = append(block, 'original_wording', qs.map(q => `[Family223 Part1 ${q.ref}] ${q.stem} [printed answer ${q.key}]`))
  block = setOrInsert(block, 'field_notes', `${get(block, 'field_notes')}\nfamily223Part1Reuse: Exact governed ID, canonical key and teaching semantics are preserved; reciprocal Helwan article, source, claim and wording links are supplied.\nstandaloneLiveCreate: The baseline graph lacks this governed concept and its historical resources; resource_ids therefore names only the Family223 source included in this atomic batch.${conceptPlacement[id] ? '\nsourceCandidateIds: Historical core candidate pointers are not resolvable in the Helwan validation root; they are cleared while governed source/evidence links remain preserved.' : ''}`)
  if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${id} is not needs_evidence`)
  return block
}

const questionRow = q => row([
  ['id', q.id], ['title', q.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', q.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', q.key],
  ...q.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, letters[index] === q.key ? `${q.teaching} This is a source-supplied review-bank answer, not an authenticated Helwan examination key.` : `This option is not the printed letter. The governed teaching point is: ${conceptInfo[q.concept][0]}.`]]),
  ['topic', 'General pharmacology'], ['subtopic', articleInfo[q.article].subtopic], ['difficulty', 'Moderate'], ['question_type', 'Pharmacology'], ['main_concept', q.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part1 > ${q.ref}`], ['clinical_relevance', '0.68'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.48'], ['exam_weight_by_year', 'HU_Y1=0.58'], ['question_only_for', 'HU_Y1'], ['concept_ids', q.concept], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'], ['reasoning_level', '1'], ['inferred_difficulty', '46'], ['exam_relevance', '6'], ['contextual_concept_ids', ''], ['library_ids', q.article], ['resource_ids', source], ['learning_objective', conceptInfo[q.concept][1]], ['media_recommendations', ''], ['source_citation', `${source}, Family223 Part1 ${q.ref}, PDF physical p1/source p1: literal visible stem, options and isolated right-column printed ${q.key}. Tier-6 review-bank authority only.`], ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal wording, capitalization, punctuation, option order and printed answer preserved. No marks, sitting, official-key authority, or clinical recommendation inferred.'], ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])
const claimRow = q => row([['id', q.claim], ['concept_id', q.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', q.options[letters.indexOf(q.key)]], ['display_text', conceptInfo[q.concept][0]], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.72'], ['freshness', 'source_date_unverified'], ['time_sensitive', 'no'], ['qualifiers', `tier-6 review bank, not official key; Family223 Part1 ${q.ref}`]])
const citationRow = (q, key) => row([['id', key ? q.keyCitation : q.questionCitation], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', key ? `Right-column printed answer: ${q.key}` : `${q.stem} Options: ${q.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`], ['locator_type', 'page'], ['locator_page', '1'], ['locator_section', `Family223 Part1 ${q.ref}`], ['locator_detail', key ? 'Isolated right-column printed letter' : 'Exact visible stem and four options'], ['context_note', 'Instructor-attributed keyed review bank; not an authenticated examination or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']])
const spanRow = q => row([['id', q.span], ['article_id', q.article], ['section_id', `${q.article.toLowerCase()}-${q.ref.toLowerCase()}`], ['text', conceptInfo[q.concept][0]], ['claim_ids', q.claim], ['citation_ids', `${q.questionCitation}\n${q.keyCitation}`]])
const relationRow = row([['source', C.metabolismSites], ['type', 'related_concepts'], ['target', C.cyp450], ['evidence_claim_ids', `${questions[0].claim}\n${questions[4].claim}`], ['citation_ids', `${questions[0].questionCitation}\n${questions[4].questionCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.70'], ['qualifiers', 'scope: Family223 separately tests the principal metabolism site and a Phase I enzyme family'], ['reviewer', 'Medical team, Helwan Pharmacology faculty']])
const sourceRow = row([['id', source], ['title', 'Quiz review questions - Dr Omar Sheashaa'], ['institution', 'Helwan BMS-102 local pharmacology collection; no institution is printed in the carrier'], ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Notes and Summaries/4_5837145573588737774 3.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '31'], ['sha256', '992325268b40230b61a593c4d7be80a981e76c0d5a6358f06a0ed00f4d23ca19'], ['processing_status', 'pending'], ['rights', 'Local review-bank carrier held for internal authoring only; no page redistributed.'], ['qualification', 'Tier-6 instructor-attributed keyed review bank. Dr. Omar Sheashaa is printed in the footer; no university, sitting, date, marks or official departmental-key authority is visible. Family223 Part1 uses only visibly rendered Q01-Q06 on physical page 1.'], ['is_assessment', 'yes']])

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family223-part1-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family223-part1-articles.md', rows(Object.values(A).map(articleRow))],
  ['concept/HU-BMS-102-pharmacology-family223-part1-concepts.md', rows(Object.values(C).map(conceptRow))],
  ['evidence/HU-BMS-102-pharmacology-family223-part1-claims.md', rows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-pharmacology-family223-part1-citations.md', rows(questions.flatMap(q => [citationRow(q, false), citationRow(q, true)]))],
  ['evidence/HU-BMS-102-pharmacology-family223-part1-spans.md', rows(questions.map(spanRow))],
  ['relations/HU-BMS-102-pharmacology-family223-part1-relations.md', relationRow],
  ['question/HU-BMS-102-pharmacology-family223-part1-mcq.md', rows(questions.map(questionRow))],
])
for (const [relativePath, body] of files) {
  const output = join(root, relativePath)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: 223, part: 1, refs: questions.map(q => q.ref), keys: questions.map(q => q.key).join(''), released: { sources: 1, articles: 3, conceptRows: 6, newConcepts: 0, exactIdReuseUpdates: 6, questions: 6, claims: 6, citations: 12, spans: 6, relations: 1 }, priorZeroAuthorClosures: { families: '200-222', unkeyedHolds: { 200: 11, 202: 50 }, teachingOnlyNoAssessment: 21 }, remaining: { sourceOccurrences: 147, retainedAuthoringRecords: 144, laterLiteralReplayExclusions: 3 } }, null, 2))
