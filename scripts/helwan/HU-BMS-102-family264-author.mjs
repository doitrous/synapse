import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_8da52ffc5f03ad0d951f'
const article = 'ART-HU-BMS102-PHA-F264-EXCRETION-KINETICS'
const sourcePath = process.env.HELWAN_F264_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Excretion.pdf'
const expectedSha = '8da52ffc5f03ad0d951f93af0dec5cfd845ed03e15ee90755c9989e3ea457284'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCD'
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family264 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 1_000_000 }).replaceAll('\f', '\n')
const cleaned = native.split('\n').filter(line => {
  const value = line.trim()
  return !['Pharmacology', 'MCQ', 'DR . El-Sawy'].includes(value) && !/^\d+$/.test(value)
}).join('\n')
const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\s*[.)]\s*/g)]
const expectedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 35, 13, 14, 15, 16, 17, 18]
const pageFor = number => number <= 4 ? 1 : number <= 9 ? 2 : (number <= 12 || number === 35) ? 3 : number <= 16 ? 4 : 5
const parsed = starts.map((match, index) => {
  const number = Number(match[1])
  const rawBody = cleaned.slice(match.index + match[0].length, starts[index + 1]?.index ?? cleaned.length)
  const standaloneKeys = rawBody.split('\n').map(line => line.trim()).filter(line => /^[A-D]$/.test(line))
  const body = rawBody.split('\n').filter(line => !/^[A-D]$/.test(line.trim())).join('\n')
  const optionStarts = [...body.matchAll(/(?:^|\n)\s*([A-Da-d])[.)]\s*/g)]
  const stem = body.slice(0, optionStarts[0]?.index ?? body.length).replace(/\s+/g, ' ').trim()
  const options = optionStarts.map((option, optionIndex) => body
    .slice(option.index + option[0].length, optionStarts[optionIndex + 1]?.index ?? body.length)
    .replace(/\s+/g, ' ').trim())
  return { number, ref: `Q${String(number).padStart(3, '0')}`, page: pageFor(number), stem, options, key: standaloneKeys[0] }
})
if (parsed.length !== 19 || parsed.some((question, index) => question.number !== expectedOrder[index]
  || question.options.length !== 4 || !question.options[letters.indexOf(question.key)])) {
  throw new Error(`Family264 parse contract mismatch: ${JSON.stringify(parsed.map(q => [q.ref, q.options.length, q.key]))}`)
}
const byRef = new Map(parsed.map(question => [question.ref, question]))

const baseData = [
  ['Q001', 'half-life-dose-decay-200-to25-after6h', 'With a two-hour half-life, a 200 mg amount falls to 25 mg after six hours, or three half-lives.'],
  ['Q002', 'infusion-half-life10-steady-state-forty-to-fifty-hours', 'A continuously infused drug with a ten-hour half-life approaches steady state after about forty to fifty hours.'],
  ['Q003', 'repeated-half-life-dose-before-third-75-percent-steady-state', 'When a dose is repeated every half-life, the accumulated amount immediately before the third dose is about seventy-five percent of steady state.'],
  ['Q004', 'half-life-not-dependent-absorption-time', 'Elimination half-life depends on distribution volume and clearance-related elimination, not on the time required for absorption.'],
  ['Q005', 'opioid-32-to2-half-life6-takes24-hours', 'A concentration decline from 32 mg/L to 2 mg/L spans four half-lives, so a six-hour half-life requires twenty-four hours.'],
  ['Q006', 'bile-drug-elimination-liver', 'The liver eliminates drugs and metabolites into bile.'],
  ['Q007', 'tdm-avoids-toxicity-improves-efficacy', 'Therapeutic drug monitoring supports effective exposure while reducing toxicity risk.'],
  ['Q008', 'zero-order-rate-not-proportional-plasma-concentration', 'In zero-order elimination, the elimination rate is not proportional to plasma concentration.'],
  ['Q009', 'loading-dose-reaches-steady-state-quickly', 'A loading dose is used to reach a target or steady-state concentration rapidly.'],
  ['Q010', 'renal-impairment-gentamicin-one-third-dose', 'When gentamicin clearance is one third of normal, reducing a 100 mg maintenance dose to about 33 mg at the same interval preserves proportional exposure.'],
  ['Q011', 'half-life-determines-time-to-steady-state', 'A drug’s elimination half-life helps determine the time required to reach steady state.'],
  ['Q012', 'four-half-lives-94-percent-steady-state', 'After four half-lives of constant input, drug concentration reaches about ninety-four percent of steady state.'],
  ['Q035', 'half-life-determines-interdose-interval', 'A drug’s elimination half-life helps determine a suitable interdose interval.'],
  ['Q014', 'iv-dose-backcalculation-vd10-half-life3-level5-at6h', 'A 5 mg/L level at six hours with a three-hour half-life implies an initial 20 mg/L level; with a 10 L distribution volume, the IV dose was 200 mg.'],
  ['Q015', 'first-order-elimination-rate-proportional-dose-concentration', 'In first-order elimination, the amount eliminated per unit time varies directly with drug amount or concentration.'],
  ['Q016', 'ibuprofen-two-half-lives-25-percent-remains', 'After two half-lives, twenty-five percent of the original ibuprofen amount remains.'],
  ['Q017', 'steady-state-reached-four-to-five-half-lives', 'Repeated dosing at half-life intervals reaches approximate steady state after four to five half-lives.'],
  ['Q018', 'piroxicam-40h-daily-steady-state-eighth-dose', 'With a forty-hour half-life and daily dosing, piroxicam approaches steady state around the eighth daily dose.'],
]
if (baseData.length !== 18) throw new Error(`Family264 base registry mismatch: ${baseData.length}`)
const baseByRef = new Map(baseData.map(([ref, canonical, definition]) => [ref, {
  ref, canonical, definition, concept: cid(canonical), ...byRef.get(ref),
}]))
const replayOf = new Map([['Q013', 'Q002']])
const questions = parsed.map(question => {
  const base = baseByRef.get(replayOf.get(question.ref) ?? question.ref)
  if (!base) throw new Error(`${question.ref}: no concept mapping`)
  const correctIndex = letters.indexOf(question.key)
  const conflict = question.ref === 'Q008'
  const explanations = question.options.map((option, index) => {
    if (conflict && index === correctIndex) return 'The source visibly prints A, so this Draft record preserves A as the traceable source key. Standard pharmacology instead describes zero-order elimination as a constant amount per unit time whose rate is not proportional to concentration, matching option B rather than A. Faculty must resolve this conflict before publication.'
    if (conflict) return `This option is not the source-printed key, although option B states the standard pharmacological relationship. ${base.definition} The item remains Draft until faculty resolves the printed-key conflict.`
    if (index === correctIndex) return `${base.definition} Applied to the values and wording in this source item, this makes option ${question.key} the keyed result. The remaining choices give a different calculation or pharmacokinetic relationship.`
    return `This choice does not match the calculation or relationship tested by the source item. ${base.definition} The source’s printed key therefore points to option ${question.key}.`
  })
  return {
    ...question, concept: base.concept, canonical: base.canonical, definition: base.definition, explanations,
    id: `Q-HU102-PHA-F264-${question.ref}`, claim: `CLM-HU102-F264-${question.ref}-01`,
    qCitation: `CIT-HU102-F264-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F264-${question.ref}-KEY`,
    span: `SPN-HU102-F264-${question.ref}-01`, replayOf: replayOf.get(question.ref), conflict,
  }
})
if (questions.length !== 19 || new Set(questions.map(question => question.concept)).size !== 18) throw new Error('Family264 safe-collapse mismatch')

const sourceRow = row([
  ['id', source], ['title', 'MCQ Excretion'], ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible Dr El-Sawy credit'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Excretion.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '5'], ['sha256', expectedSha], ['processing_status', 'pending'],
  ['rights', 'Local instructor-attributed revision bank held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to Dr El-Sawy. Family264 contains 19 keyed four-option text/calculation MCQs and authors all 19 as traceable Draft records. Q8 preserves printed key A and carries an explicit medical-key conflict requiring faculty resolution. The source-number jump to 35 is retained as a numbering anomaly and does not imply missing questions.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Drug elimination, half-life, steady state, and kinetic calculations'], ['arabic_title', ''],
  ['aliases', 'Drug excretion and kinetics\nHalf-life and steady-state calculations'], ['subject', 'pharm'], ['topic', 'General pharmacology'],
  ['subtopic', 'Pharmacokinetics'], ['microtopic', 'Elimination and steady state'], ['nanotopic', 'Family264 Dr El-Sawy bank'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
  ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '8'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Elimination half-life and clearance determine concentration decline, dosing intervals, accumulation, and the time required to approach steady state.'],
  ['sections', `### Definition\nDrug elimination removes parent drug or metabolites, while elimination half-life describes the time required for an amount or concentration to fall by half.\n\n### Mechanism\nClearance and distribution determine half-life. With repeated dosing or constant infusion, accumulation approaches a plateau over successive half-lives.\n\n### Key determinants\n${baseData.map(([, , definition]) => `- ${definition}`).join('\n')}\n\n### Clinical significance\nHalf-life, clearance, distribution volume, loading dose, and therapeutic monitoring guide safe dosing and interpretation of drug levels.\n\n### Common misconceptions\nDo not infer absent source questions from the jump to Q35, and do not silently repair a printed answer that conflicts with standard pharmacology.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', baseData.map(([, , definition]) => definition).join('\n')],
  ['lose_the_mark', 'Confusing half-life with absorption time.\nTreating a loading dose as a substitute for maintenance adjustment.\nSilently changing Family264 Q8 from printed A to a medically preferred answer.'],
  ['related_concepts', baseData.map(([ref]) => baseByRef.get(ref).concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pharmacology > Pharmacokinetics > Excretion and steady state > Family264'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or departmental approval appears on the pages.'],
  ['annotations', baseData.map(([ref, , definition]) => `### definition_of · ${baseByRef.get(ref).concept}\nQuote: ${definition}\nBlock: body`).join('\n\n')],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', baseData.map(([ref, , definition]) => {
    const concept = baseByRef.get(ref).concept
    const occurrences = questions.filter(question => question.concept === concept)
    return `### ${definition}\nClaims: ${occurrences.map(question => question.claim).join(', ')}\nCitations: ${occurrences.flatMap(question => [question.qCitation, question.kCitation]).join(', ')}\nSpan: ${occurrences.map(question => question.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family264 text/calculation stems, four-option sets, and printed answer letters.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required; Q8 has a printed-key conflict.'],
  ['conflicts', 'Q8 visibly prints key A for proportional elimination rate, while standard zero-order kinetics is not proportional to concentration; retained without correction.'],
  ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 19 raw prompts, 19 supplied answers, 19 safe traceable Draft records, 0 holds, 0 exclusions, and one same-source replay linked to 18 source-distinct concepts. Q8 remains explicitly conflicted.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const claimsByConcept = new Map()
for (const question of questions) claimsByConcept.set(question.concept, [...(claimsByConcept.get(question.concept) ?? []), question.claim])
const conceptRow = ([ref, canonical, definition]) => {
  const base = baseByRef.get(ref)
  const occurrences = questions.filter(question => question.concept === base.concept)
  const conflict = ref === 'Q008'
  return row([
    ['label', definition], ['id', base.concept], ['canonical_key', canonical], ['aliases', definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', definition],
    ['explicit_objective', `Apply this pharmacokinetic relationship: ${definition}`],
    ['pitfalls', conflict ? 'Accepting the printed proportional-rate key as standard zero-order kinetics without faculty resolution.' : `Selecting a distractor that conflicts with this relationship: ${definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', 'Elimination, half-life, and steady state'], ['nanotopic', `Family264 ${ref}`],
    ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family264 > ${ref}`],
    ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
    ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['clinical_relevance', '0.74'], ['academic_relevance', '0.97'], ['weight_confidence', '0.39'], ['confidence', conflict ? '0.35' : '0.70'],
    ['exam_signal', occurrences.map(question => `${source} | Family264 ${question.ref} | printed answer ${question.key} | instructor-attributed auxiliary source`).join('\n')],
    ['atomic_claim_ids', claimsByConcept.get(base.concept).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', occurrences.map(question => `[Family264 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'],
    ['conflicts', conflict ? 'Printed key A selects proportional elimination rate, conflicting with the standard zero-order constant-amount/not-proportional relationship.' : '[clear]'],
    ['uncertainty', 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. Semantic reconciliation reports 12 prior-governed and 6 new scopes; deterministic full records are emitted because no exact same-key authored object exists.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family264 keyed objective records.\nsourceCandidateIds: Four-search reconciliation found no authored same-key rival record; deterministic IDs are established for later reuse.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', question.replayOf ? `Q-HU102-PHA-F264-${question.replayOf}` : ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept], ['module', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family264 > ${question.ref}`], ['clinical_relevance', '0.74'], ['academic_relevance', '0.97'], ['cognitive_effort_score', '0.42'],
  ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Medium'], ['setting', 'Academic'],
  ['reasoning_level', '2'], ['inferred_difficulty', '64'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family264 ${question.ref}, PDF p${question.page}: exact text/calculation stem, options, and printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `Literal stem, option order, and printed answer are preserved. ${question.replayOf ? `Same-source semantic replay of ${question.replayOf}; this occurrence reuses its concept ID.` : 'Source-distinct handle.'}${question.conflict ? ' Medical conflict: printed key A states proportionality for zero-order elimination; keep Draft until faculty resolves it.' : ''} The Q35 numbering jump is retained without inventing missing items. No official exam, official key, year, sitting, marks, candidate response, or practical authority is inferred.`],
  ['estimated_seconds', '75'], ['randomise_answers', 'yes'],
])

const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', question.conflict ? 'possible' : 'none'],
  ['confidence', question.conflict ? '0.30' : '0.70'], ['freshness', 'source_created_2024-02-17'], ['time_sensitive', 'no'],
  ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key; occurrence: Family264 ${question.ref};${question.replayOf ? ` semantic replay of ${question.replayOf};` : ''}${question.conflict ? ' printed-key medical conflict;' : ''}`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family264 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'],
    ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Printed answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family264 ${question.ref}`], ['locator_detail', 'Visibly aligned answer token'],
    ['context_note', question.conflict ? 'The printed key is traceable but medically conflicts with standard zero-order kinetics; faculty resolution is required.' : 'Source-supplied instructor-bank answer; not an official department key.'],
    ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([
  ['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition],
  ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`],
]))
const relationPairs = [['Q001', 'Q005'], ['Q002', 'Q011'], ['Q002', 'Q017'], ['Q003', 'Q017'], ['Q004', 'Q011'], ['Q004', 'Q035'], ['Q007', 'Q009'], ['Q008', 'Q015'], ['Q010', 'Q035'], ['Q011', 'Q012'], ['Q012', 'Q017'], ['Q014', 'Q016'], ['Q017', 'Q018']]
const relationRows = relationPairs.map(([fromRef, toRef]) => {
  const from = baseByRef.get(fromRef)
  const to = baseByRef.get(toRef)
  const fromQuestion = questions.find(question => question.concept === from.concept)
  const toQuestion = questions.find(question => question.concept === to.concept)
  return row([['source', from.concept], ['type', fromRef === 'Q008' ? 'contrasts_with' : 'related_concepts'], ['target', to.concept],
    ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`], ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`],
    ['verification_status', 'needs_evidence'], ['confidence', fromRef === 'Q008' ? '0.35' : '0.67'], ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`],
    ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family264-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family264-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family264-concepts.md', rows(baseData.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family264-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family264-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family264-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family264-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family264-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 264, rawPrompts: 19, sourceAnswers: 19, safeRecords: 19, holds: 0, exclusions: 0,
  sourceFormats: { mcq: 19 }, authoredFormats: { mcq: 19 }, authoredHandles: 18, semanticReplays: 1,
  semanticPriorReuses: 12, semanticConceptDelta: 6, emittedConceptRecords: baseData.length,
  conflicts: { Q008: 'printed A retained; standard relationship points to B; faculty resolution required' },
  articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length,
  spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
