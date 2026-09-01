import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_6ad47652df65f020cf06'
const article = 'ART-HU-BMS102-PHA-F268-RECEPTOR-SIGNALLING'
const sourcePath = process.env.HELWAN_F268_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Pharmacodynamics.pdf'
const expectedSha = '6ad47652df65f020cf0608c011deb5b629d6b516aad25626458cc855894a2fb1'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCD'
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family268 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 1_000_000 }).replaceAll('\f', '\n')
const cleaned = native.split('\n').filter(line => {
  const value = line.trim()
  return !['Pharma', 'MCQs Pharmacodynamics', 'DR ELSAWY'].includes(value) && !/^\d+ of 6$/.test(value)
}).join('\n')
const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\s*[.)]\s*/g)]
const pageFor = number => Math.floor((number - 1) / 5) + 1
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
if (parsed.length !== 29 || parsed.some((question, index) => question.number !== index + 1
  || question.options.length !== 4 || !question.options[letters.indexOf(question.key)])) {
  throw new Error(`Family268 parse contract mismatch: ${JSON.stringify(parsed.map(q => [q.ref, q.options.length, q.key]))}`)
}
const byRef = new Map(parsed.map(question => [question.ref, question]))

const baseData = [
  ['Q001', 'ion-channel-receptors-five-transmembrane-subunits', 'The source describes ion channel-linked receptors as typically containing five transmembrane subunits.'],
  ['Q002', 'ion-channel-receptor-agonist-opens-channel', 'Agonist binding to an ion channel-linked receptor opens the ion channel.'],
  ['Q003', 'ion-channel-receptor-fast-short-response', 'Ion channel-linked receptors produce a fast, short response.'],
  ['Q004', 'nicotinic-motor-endplate-opens-sodium-channel', 'Nicotinic acetylcholine receptors at the motor end plate open sodium-permeable channels.'],
  ['Q005', 'gaba-receptor-opens-chloride-channel', 'The source keys brain GABA receptors to opening chloride channels.'],
  ['Q006', 'ion-channel-receptor-fastest-response', 'Ion channel-linked receptors produce the fastest response among the listed receptor classes.'],
  ['Q007', 'g-protein-receptor-seven-transmembrane-subunits', 'G-protein-coupled receptors have seven transmembrane segments.'],
  ['Q008', 'g-protein-receptor-slower-longer-than-ion-channel', 'G-protein-coupled receptors respond more slowly and for longer than ion channel-linked receptors.'],
  ['Q009', 'gs-increases-adenylyl-cyclase-camp', 'Stimulatory G protein increases adenylyl cyclase activity and intracellular cAMP.'],
  ['Q010', 'camp-activates-protein-kinases', 'Increased cAMP activates cAMP-dependent protein kinases.'],
  ['Q011', 'alpha-two-adrenergic-receptor-gi-coupled', 'Alpha-2 adrenergic receptors are coupled to inhibitory Gi protein.'],
  ['Q012', 'm-two-muscarinic-receptor-gi-coupled', 'M2 muscarinic receptors are coupled to inhibitory Gi protein.'],
  ['Q013', 'gq-increases-ip3-dag', 'Gq activation increases the second messengers IP3 and DAG.'],
  ['Q014', 'ip3-increases-intracellular-calcium', 'IP3 increases intracellular calcium.'],
  ['Q015', 'alpha-one-adrenergic-receptor-gq-coupled', 'Alpha-1 adrenergic receptors are coupled to Gq protein.'],
  ['Q016', 'm-one-m-three-muscarinic-receptors-gq-coupled', 'M1 and M3 muscarinic receptors are coupled to Gq protein.'],
  ['Q017', 'tyrosine-kinase-receptor-intracellular-tk-enzyme', 'A tyrosine kinase-linked receptor has an intracellular domain that functions as a tyrosine kinase enzyme.'],
  ['Q018', 'tyrosine-kinase-receptor-extracellular-hormone-intracellular-tk-domains', 'Tyrosine kinase-linked receptors combine an extracellular hormone-binding domain with an intracellular tyrosine-kinase domain.'],
  ['Q019', 'insulin-receptor-tyrosine-kinase-linked', 'The insulin receptor is a tyrosine kinase-linked receptor.'],
  ['Q020', 'tyrosine-kinase-receptor-activates-signaling-proteins', 'Activation of tyrosine kinase-linked receptors activates intracellular signalling proteins.'],
  ['Q021', 'intracellular-receptor-cytoplasm-or-dna-location', 'Intracellular receptors may be located in the cytoplasm or associated directly with DNA in the nucleus.'],
  ['Q022', 'intracellular-receptor-regulates-gene-transcription', 'Intracellular receptors regulate gene transcription.'],
  ['Q023', 'intracellular-receptor-agonist-enters-cell', 'An agonist must enter the cell to act on an intracellular receptor.'],
  ['Q024', 'intracellular-receptor-slow-not-fast-protein-synthesis', 'Intracellular receptors produce slow responses that require time for new protein synthesis rather than fast responses.'],
  ['Q025', 'corticosteroids-intracellular-receptor-agonists', 'Corticosteroids act as agonists at intracellular receptors.'],
  ['Q026', 'thyroxin-acts-on-intracellular-receptor', 'The source keys Thyroxin to action at an intracellular receptor.'],
  ['Q027', 'sex-hormone-receptors-inside-cell', 'Sex hormone receptors are located inside the cell.'],
  ['Q028', 'intracellular-receptor-effects-persist-after-agonist-removal', 'Intracellular receptor effects can persist long after the agonist is removed.'],
  ['Q029', 'ion-channel-receptors-faster-than-intracellular-receptors', 'Ion channel-linked receptors act faster than intracellular receptors.'],
]
if (baseData.length !== 29) throw new Error(`Family268 base registry mismatch: ${baseData.length}`)
const baseByRef = new Map(baseData.map(([ref, canonical, definition]) => [ref, { ref, canonical, definition, concept: cid(canonical), ...byRef.get(ref) }]))
const questions = parsed.map(question => {
  const base = baseByRef.get(question.ref)
  const correctIndex = letters.indexOf(question.key)
  return {
    ...question, concept: base.concept, canonical: base.canonical, definition: base.definition,
    explanations: question.options.map((option, index) => index === correctIndex
      ? `${base.definition} Applied to this exact receptor-signalling stem, this makes option ${question.key} the keyed answer. The remaining choices describe another receptor class, messenger pathway, location, or response speed.`
      : `This choice does not match the receptor or signalling relationship tested by the source item. ${base.definition} The source’s printed key therefore points to option ${question.key}.`),
    id: `Q-HU102-PHA-F268-${question.ref}`, claim: `CLM-HU102-F268-${question.ref}-01`,
    qCitation: `CIT-HU102-F268-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F268-${question.ref}-KEY`, span: `SPN-HU102-F268-${question.ref}-01`,
  }
})

const sourceRow = row([
  ['id', source], ['title', 'MCQs Pharmacodynamics'], ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible Dr El-Sawy credit'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Pharmacodynamics.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '6'], ['sha256', expectedSha], ['processing_status', 'pending'],
  ['rights', 'Local instructor-attributed revision bank held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to Dr El-Sawy. Family268 contains 29 keyed four-option text MCQs and authors all 29 as traceable Draft records. Source spellings, ion symbols, option order, and answer letters are preserved without inferring official Helwan, year, sitting, marks, candidate, or departmental-key authority.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Receptor families and intracellular signal transduction'], ['arabic_title', ''],
  ['aliases', 'Pharmacodynamic receptor signalling\nIon-channel, GPCR, tyrosine-kinase, and intracellular receptors'], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacodynamics'],
  ['microtopic', 'Receptor signalling'], ['nanotopic', 'Family268 Dr El-Sawy bank'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
  ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '9'],
  ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Major receptor families differ in membrane topology, intracellular messenger pathways, response speed, duration, and representative agonists.'],
  ['sections', `### Definition\nA receptor converts ligand binding into a cellular response through an ion channel, G protein, enzyme-linked domain, or intracellular transcriptional mechanism.\n\n### Mechanism\nIon channels alter ion flux directly. G proteins regulate second messengers, tyrosine kinases phosphorylate signalling proteins, and intracellular receptors alter gene transcription.\n\n### Key determinants\n${baseData.map(([, , definition]) => `- ${definition}`).join('\n')}\n\n### Clinical significance\nReceptor class helps predict onset, duration, messenger pathway, and the effects of agonists and antagonists.\n\n### Common misconceptions\nDo not confuse Gs, Gi, and Gq pathways; membrane receptors with intracellular receptors; or rapid ion flux with slow transcriptional responses.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', baseData.map(([, , definition]) => definition).join('\n')],
  ['lose_the_mark', 'Assigning alpha-2 or M2 receptors to Gq.\nCalling intracellular-receptor responses fast.\nChanging source spellings or printed keys without evidence.'],
  ['related_concepts', baseData.map(([ref]) => baseByRef.get(ref).concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pharmacology > Pharmacodynamics > Receptor signalling > Family268'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or departmental approval appears on the pages.'],
  ['annotations', baseData.map(([ref, , definition]) => `### definition_of · ${baseByRef.get(ref).concept}\nQuote: ${definition}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', baseData.map(([ref, , definition]) => {
    const base = baseByRef.get(ref)
    const question = questions.find(item => item.concept === base.concept)
    return `### ${definition}\nClaims: ${question.claim}\nCitations: ${question.qCitation}, ${question.kCitation}\nSpan: ${question.span}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family268 stems, four-option sets, ion notation, and printed answer letters.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 29 raw prompts, 29 supplied answers, 29 safe traceable Draft records, 0 holds, 0 exclusions, 0 conflicts, and 29 source-distinct concepts.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const conceptRow = ([ref, canonical, definition]) => {
  const base = baseByRef.get(ref)
  const question = questions.find(item => item.concept === base.concept)
  return row([
    ['label', definition], ['id', base.concept], ['canonical_key', canonical], ['aliases', definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', definition],
    ['explicit_objective', `Apply this receptor-signalling relationship: ${definition}`], ['pitfalls', `Selecting a distractor that conflicts with this relationship: ${definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Pharmacodynamics'], ['microtopic', ref <= 'Q006' ? 'Ion channel-linked receptors' : ref <= 'Q016' ? 'G-protein-coupled receptors' : ref <= 'Q020' ? 'Tyrosine kinase-linked receptors' : 'Intracellular receptors'],
    ['nanotopic', `Family268 ${ref}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacodynamics > Family268 > ${ref}`],
    ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
    ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['clinical_relevance', '0.72'], ['academic_relevance', '0.97'], ['weight_confidence', '0.39'], ['confidence', '0.70'],
    ['exam_signal', `${source} | Family268 ${ref} | printed answer ${question.key} | instructor-attributed auxiliary source`], ['atomic_claim_ids', question.claim],
    ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['original_wording', `[Family268 ${ref}] ${question.stem} [printed key ${question.key}]`],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
    ['uncertainty', 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. Triage reports three prior semantic assessment scopes but no authored exact-key concept objects; deterministic IDs are established for all 29 handles.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family268 keyed text records.\nsourceCandidateIds: Four-search reconciliation found no authored same-key rival record; deterministic IDs are established for later reuse.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacodynamics'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept], ['module', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacodynamics > Family268 > ${question.ref}`], ['clinical_relevance', '0.72'], ['academic_relevance', '0.97'], ['cognitive_effort_score', '0.36'],
  ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family268 ${question.ref}, PDF p${question.page}: exact text stem, four options, and printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal stem, option order, spelling, ion notation, and printed answer are preserved. Source-distinct safe text handle. No official exam, official key, year, sitting, marks, candidate response, or practical authority is inferred.'],
  ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])
const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.70'],
  ['freshness', 'source_created_2026-04-24'], ['time_sensitive', 'no'], ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key; occurrence: Family268 ${question.ref};`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family268 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'],
    ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Printed answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family268 ${question.ref}`], ['locator_detail', 'Visibly aligned answer token'],
    ['context_note', 'Source-supplied instructor-bank answer; not an official department key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([
  ['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition], ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`],
]))
const relationPairs = [
  ['Q001', 'Q002'], ['Q002', 'Q003'], ['Q003', 'Q006'], ['Q004', 'Q005'], ['Q006', 'Q008'], ['Q007', 'Q008'], ['Q009', 'Q010'], ['Q011', 'Q012'],
  ['Q013', 'Q014'], ['Q013', 'Q015'], ['Q013', 'Q016'], ['Q015', 'Q016'], ['Q017', 'Q018'], ['Q017', 'Q019'], ['Q017', 'Q020'], ['Q021', 'Q022'],
  ['Q021', 'Q023'], ['Q022', 'Q024'], ['Q023', 'Q025'], ['Q023', 'Q026'], ['Q023', 'Q027'], ['Q024', 'Q028'], ['Q006', 'Q029'], ['Q028', 'Q029'],
]
const relationRows = relationPairs.map(([fromRef, toRef]) => {
  const from = baseByRef.get(fromRef)
  const to = baseByRef.get(toRef)
  const fromQuestion = questions.find(question => question.concept === from.concept)
  const toQuestion = questions.find(question => question.concept === to.concept)
  return row([['source', from.concept], ['type', 'related_concepts'], ['target', to.concept], ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`],
    ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.67'],
    ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`], ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family268-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family268-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family268-concepts.md', rows(baseData.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family268-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family268-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family268-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family268-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family268-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 268, rawPrompts: 29, sourceAnswers: 29, safeRecords: 29, holds: 0, exclusions: 0, conflicts: 0,
  sourceFormats: { mcq: 29 }, authoredFormats: { mcq: 29 }, authoredHandles: 29,
  semanticPriorReuses: 3, semanticConceptDelta: 26, emittedConceptRecords: baseData.length,
  articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length,
  spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
