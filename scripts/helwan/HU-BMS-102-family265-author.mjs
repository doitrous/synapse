import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_bf798364bbdd9f654fc0'
const article = 'ART-HU-BMS102-PHA-F265-METABOLISM'
const sourcePath = process.env.HELWAN_F265_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Metabolism.pdf'
const expectedSha = 'bf798364bbdd9f654fc009a31ac6eccb853192fc7ee9325cd91cee6df16ff0a0'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCD'
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family265 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 1_000_000 }).replaceAll('\f', '\n')
const cleaned = native.split('\n').filter(line => {
  const value = line.trim()
  return !['Pharmacology', 'MCQ', 'DR . El-Sawy'].includes(value) && !/^\d+$/.test(value)
}).join('\n')
const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\s*[.)]\s*/g)]
const pageFor = number => Math.floor((number - 1) / 4) + 1
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
if (parsed.length !== 23 || parsed.some((question, index) => question.number !== index + 1
  || question.options.length !== 4 || !question.options[letters.indexOf(question.key)])) {
  throw new Error(`Family265 parse contract mismatch: ${JSON.stringify(parsed.map(q => [q.ref, q.options.length, q.key]))}`)
}
const byRef = new Map(parsed.map(question => [question.ref, question]))

const baseData = [
  ['Q001', 'microsomal-enzyme-competition-decreases-drug-metabolism', 'Competition between two drugs for the same microsomal metabolising enzyme can decrease the metabolism rate of one drug.'],
  ['Q002', 'hard-drug-not-metabolized-excreted-unchanged', 'The source uses the term hard drug for a drug that is not metabolised and is excreted unchanged in urine.'],
  ['Q003', 'cytochrome-p450-major-phase-one-enzyme', 'Cytochrome P450 is the major enzyme system responsible for most Phase I drug-metabolism reactions.'],
  ['Q004', 'nonmicrosomal-enzymes-not-induced-or-inhibited', 'In this source comparison, non-microsomal enzymes are not induced or inhibited by other drugs.'],
  ['Q005', 'glucuronyl-transferase-coupling-phase-two-reaction', 'Glucuronyl transferase couples a drug to a water-soluble substrate in a Phase II conjugation reaction.'],
  ['Q006', 'adrenal-glands-not-drug-metabolism-site', 'The adrenal glands are not a principal drug-metabolism site in the listed liver, kidney, lung, and adrenal comparison.'],
  ['Q007', 'phase-one-oxidation-reduction-hydrolysis-not-conjugation', 'Phase I metabolism includes oxidation, reduction, and hydrolysis, whereas conjugation is a Phase II process.'],
  ['Q010', 'teaching.pharma.conjugation-couples-a-drug-or-metabolite-with-an-endogenous-substrate', 'Conjugation couples a drug or metabolite with an endogenous substrate.'],
  ['Q012', 'microsomal-enzyme-induction-requires-dose-increase', 'Microsomal enzyme induction can accelerate metabolism and require a dose increase for some drugs.'],
  ['Q013', 'biotransformation-less-lipid-more-water-soluble', 'Biotransformation generally makes metabolites less lipid-soluble and more water-soluble.'],
  ['Q014', 'lipophilic-drug-phase-one-then-phase-two-water-solubilization', 'Lipophilic drugs commonly undergo Phase I oxidation, reduction, or hydrolysis followed by Phase II conjugation to become more water-soluble.'],
  ['Q015', 'prodrug-inactive-transformed-active-metabolite', 'A prodrug is inactive or less active until the body transforms it into an active metabolite.'],
  ['Q016', 'microsomal-enzymes-inducible', 'Microsomal drug-metabolising enzymes are inducible.'],
  ['Q018', 'microsomal-oxidation-increases-ionization-water-solubility', 'Microsomal oxidation can increase drug ionisation and water solubility.'],
  ['Q019', 'oral-route-most-first-pass-metabolism', 'Oral administration is most likely among the listed routes to expose a drug to first-pass metabolism.'],
  ['Q020', 'high-hepatic-first-pass-low-oral-bioavailability', 'A high degree of hepatic first-pass metabolism lowers oral bioavailability.'],
  ['Q021', 'acetylation-phase-two-reaction', 'Acetylation is a Phase II drug-metabolism reaction.'],
  ['Q022', 'phase-two-exception-reduction', 'Reduction is a Phase I reaction and is therefore the exception among listed Phase II biotransformation reactions.'],
  ['Q023', 'biotransformation-faster-urinary-excretion', 'Biotransformation generally increases water solubility and facilitates faster urinary excretion.'],
]
if (baseData.length !== 19) throw new Error(`Family265 base registry mismatch: ${baseData.length}`)
const baseByRef = new Map(baseData.map(([ref, canonical, definition]) => [ref, {
  ref, canonical, definition, concept: cid(canonical), ...byRef.get(ref),
}]))
const replayOf = new Map([['Q008', 'Q003'], ['Q009', 'Q007'], ['Q011', 'Q005'], ['Q017', 'Q013']])
const questions = parsed.map(question => {
  const base = baseByRef.get(replayOf.get(question.ref) ?? question.ref)
  if (!base) throw new Error(`${question.ref}: no concept mapping`)
  const correctIndex = letters.indexOf(question.key)
  return {
    ...question, concept: base.concept, canonical: base.canonical, definition: base.definition,
    explanations: question.options.map((option, index) => index === correctIndex
      ? `${base.definition} Applied to this exact source wording, this makes option ${question.key} the keyed answer. The remaining choices describe a different metabolic phase, enzyme, site, or consequence.`
      : `This choice does not match the metabolic relationship tested by the source item. ${base.definition} The source’s printed key therefore points to option ${question.key}.`),
    id: `Q-HU102-PHA-F265-${question.ref}`, claim: `CLM-HU102-F265-${question.ref}-01`,
    qCitation: `CIT-HU102-F265-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F265-${question.ref}-KEY`,
    span: `SPN-HU102-F265-${question.ref}-01`, replayOf: replayOf.get(question.ref),
  }
})
if (questions.length !== 23 || new Set(questions.map(question => question.concept)).size !== 19) throw new Error('Family265 safe-collapse mismatch')

const sourceRow = row([
  ['id', source], ['title', 'MCQ Metabolism'], ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible Dr El-Sawy credit'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Metabolism.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '6'], ['sha256', expectedSha], ['processing_status', 'pending'],
  ['rights', 'Local instructor-attributed revision bank held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to Dr El-Sawy. Family265 contains 23 keyed four-option text MCQs and authors all 23 as traceable Draft records. Four same-source semantic replays retain separate question occurrences while reusing the earlier concept IDs. No key, option set, source authority, or academic sitting is inferred or repaired.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Drug metabolism, biotransformation, and first-pass effects'], ['arabic_title', ''],
  ['aliases', 'Drug biotransformation\nPhase I and Phase II metabolism'], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'],
  ['microtopic', 'Drug metabolism'], ['nanotopic', 'Family265 Dr El-Sawy bank'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
  ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '8'],
  ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Drug metabolism converts many lipid-soluble compounds into more water-soluble products through Phase I and Phase II reactions, altering activity, bioavailability, and excretion.'],
  ['sections', `### Definition\nBiotransformation is the enzymatic conversion of a drug into metabolites that are commonly more polar and easier to excrete.\n\n### Mechanism\nPhase I oxidation, reduction, or hydrolysis exposes or introduces functional groups. Phase II conjugation couples drug molecules or metabolites to endogenous substrates.\n\n### Key determinants\n${baseData.map(([, , definition]) => `- ${definition}`).join('\n')}\n\n### Clinical significance\nEnzyme competition, induction, prodrug activation, and first-pass metabolism can change exposure, response, and dose requirements.\n\n### Common misconceptions\nDo not confuse Phase I with conjugation, assume every metabolite is inactive, or infer official authority from an instructor-attributed revision bank.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', baseData.map(([, , definition]) => definition).join('\n')],
  ['lose_the_mark', 'Calling conjugation a Phase I reaction.\nAssuming first-pass metabolism increases oral bioavailability.\nChanging source terminology or keys without evidence.'],
  ['related_concepts', baseData.map(([ref]) => baseByRef.get(ref).concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pharmacology > Pharmacokinetics > Drug metabolism > Family265'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or departmental approval appears on the pages.'],
  ['annotations', baseData.map(([ref, , definition]) => `### definition_of · ${baseByRef.get(ref).concept}\nQuote: ${definition}\nBlock: body`).join('\n\n')],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', baseData.map(([ref, , definition]) => {
    const concept = baseByRef.get(ref).concept
    const occurrences = questions.filter(question => question.concept === concept)
    return `### ${definition}\nClaims: ${occurrences.map(question => question.claim).join(', ')}\nCitations: ${occurrences.flatMap(question => [question.qCitation, question.kCitation]).join(', ')}\nSpan: ${occurrences.map(question => question.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family265 text stems, four-option sets, and printed answer letters.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 23 raw prompts, 23 supplied answers, 23 safe traceable Draft records, 0 holds, 0 exclusions, and four same-source replays linked to 19 source-distinct concepts.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const claimsByConcept = new Map()
for (const question of questions) claimsByConcept.set(question.concept, [...(claimsByConcept.get(question.concept) ?? []), question.claim])
const conceptRow = ([ref, canonical, definition]) => {
  const base = baseByRef.get(ref)
  const occurrences = questions.filter(question => question.concept === base.concept)
  const exactReuse = ref === 'Q010'
  return row([
    ['label', definition], ['id', base.concept], ['canonical_key', canonical], ['aliases', definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', definition],
    ['explicit_objective', `Apply this drug-metabolism relationship: ${definition}`], ['pitfalls', `Selecting a distractor that conflicts with this relationship: ${definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', 'Drug metabolism and biotransformation'], ['nanotopic', `Family265 ${ref}`],
    ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family265 > ${ref}`],
    ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
    ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['clinical_relevance', '0.74'], ['academic_relevance', '0.97'], ['weight_confidence', '0.39'], ['confidence', '0.70'],
    ['exam_signal', occurrences.map(question => `${source} | Family265 ${question.ref} | printed answer ${question.key} | instructor-attributed auxiliary source`).join('\n')],
    ['atomic_claim_ids', claimsByConcept.get(base.concept).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', occurrences.map(question => `[Family265 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
    ['uncertainty', exactReuse
      ? 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. This occurrence reuses the already governed exact conjugation concept ID and canonical key.'
      : 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. Semantic reconciliation reports 17 prior-governed and 2 new scopes; this deterministic full record is emitted because no exact same-key authored object exists.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', `arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family265 keyed objective records.\nsourceCandidateIds: ${exactReuse ? 'Exact governed Family223/257 concept ID and key are reused.' : 'Four-search reconciliation found no authored same-key rival record; deterministic IDs are established for later reuse.'}\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.`],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', question.replayOf ? `Q-HU102-PHA-F265-${question.replayOf}` : ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept], ['module', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family265 > ${question.ref}`], ['clinical_relevance', '0.74'], ['academic_relevance', '0.97'], ['cognitive_effort_score', '0.38'],
  ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family265 ${question.ref}, PDF p${question.page}: exact text stem, options, and printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `Literal stem, option order, spelling, and printed answer are preserved. ${question.replayOf ? `Same-source semantic replay of ${question.replayOf}; this occurrence reuses its concept ID.` : 'Source-distinct handle.'} No official exam, official key, year, sitting, marks, candidate response, or practical authority is inferred.`],
  ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])
const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.70'],
  ['freshness', 'source_created_2024-02-17'], ['time_sensitive', 'no'], ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key; occurrence: Family265 ${question.ref};${question.replayOf ? ` semantic replay of ${question.replayOf};` : ''}`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family265 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'],
    ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Printed answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family265 ${question.ref}`], ['locator_detail', 'Visibly aligned answer token'],
    ['context_note', 'Source-supplied instructor-bank answer; not an official department key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([
  ['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition],
  ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`],
]))
const relationPairs = [['Q001', 'Q012'], ['Q001', 'Q016'], ['Q003', 'Q007'], ['Q003', 'Q018'], ['Q004', 'Q016'], ['Q005', 'Q010'], ['Q005', 'Q021'], ['Q006', 'Q019'], ['Q007', 'Q010'], ['Q007', 'Q022'], ['Q010', 'Q014'], ['Q012', 'Q016'], ['Q013', 'Q018'], ['Q013', 'Q023'], ['Q014', 'Q015'], ['Q019', 'Q020'], ['Q020', 'Q023'], ['Q021', 'Q022']]
const relationRows = relationPairs.map(([fromRef, toRef]) => {
  const from = baseByRef.get(fromRef)
  const to = baseByRef.get(toRef)
  const fromQuestion = questions.find(question => question.concept === from.concept)
  const toQuestion = questions.find(question => question.concept === to.concept)
  return row([['source', from.concept], ['type', fromRef === 'Q004' || fromRef === 'Q021' ? 'contrasts_with' : 'related_concepts'], ['target', to.concept],
    ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`], ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`],
    ['verification_status', 'needs_evidence'], ['confidence', '0.67'], ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`], ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family265-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family265-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family265-concepts.md', rows(baseData.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family265-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family265-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family265-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family265-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family265-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 265, rawPrompts: 23, sourceAnswers: 23, safeRecords: 23, holds: 0, exclusions: 0,
  sourceFormats: { mcq: 23 }, authoredFormats: { mcq: 23 }, authoredHandles: 19, semanticReplays: 4,
  semanticPriorReuses: 17, semanticConceptDelta: 2, exactPriorIdReuses: 1, emittedConceptRecords: baseData.length,
  conflicts: 0, articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length,
  spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
