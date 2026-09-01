import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_45d13e02d665b6b7efdb'
const article = 'ART-HU-BMS102-PAT-F104-TB-CASEATION'
const relatedArticle = 'ART-HU-BMS102-PAT-F104-GRANULOMA-DIFFERENTIAL'
const concept = 'CON-FND-5B3B6BA12670C7'
const question = 'Q-HU102-PAT-F104-Q01'
const claim = 'CLM-HU102-F104-Q01-01'
const qCitation = 'CIT-HU102-F104-Q01-QUESTION'
const keyCitation = 'CIT-HU102-F104-Q01-KEY'
const span = 'SPN-HU102-F104-Q01-01'
const differentialSpan = 'SPN-HU102-F104-Q01-02'

const row = (fields) => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const sourcePrompt = 'A65-year-old man complained of dyspnea & cough of 1 year duration, Lung x-ray revealed multiple nodular lesions. Blood tests: ESR (erythrocyte sedimentation rate) was high, CRP (C-reactive protein was elevated). Lung biopsy was done & showed nodular collections of Lymphocytes, macrophages, multinucleated giant cells and caseation necrosis.'
const questionText = 'What is the most probable lung pathology in this case?'
const options = ['Asbestosis.', 'Bilharziasis.', 'Sarcoidosis.', 'Tuberculosis.']

const sourceRow = row([
  ['id', source],
  ['title', 'Inflammation lecture 2.pdf 1'],
  ['institution', 'Faculty of Medicine, Helwan University; Dr Enas Megahed Elhosary'],
  ['collection_id', 'hu-y1'],
  ['source_relative_path', 'Year 1/BMS 102/Pathology/Notes and Summaries/Inflammation lecture 2.pdf 1.pdf'],
  ['media_type', 'application/pdf'],
  ['languages', 'en'],
  ['page_count', '60'],
  ['sha256', '45d13e02d665b6b7efdb0606af0ace9c59c5810dfa5c28026388342f1ad8a860'],
  ['processing_status', 'pending'],
  ['rights', 'Local Helwan teaching deck used for internal authoring; no source page or image is redistributed.'],
  ['qualification', 'Tier-6 Helwan-authored annotated lecture. Family 104 releases one four-option terminal CBL item: the unmarked page-58 occurrence is paired with the literal page-59 repeat that reveals option D in red. The page-59 prompt is excluded as a duplicate record. Page-47 Q1/Q2 and page-5 Why?? are immediately answered instructor callouts and are excluded from assessment totals. No exam sitting, marks, candidate instructions, student response, recurrence or authenticated official-key status is inferred.'],
  ['confidence', '0.88'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article],
  ['title', 'Caseating pulmonary granulomas in the Family-104 CBL'],
  ['arabic_title', ''],
  ['aliases', 'Family-104 tuberculosis CBL\nPulmonary caseation teaching case'],
  ['subject', 'fnd'],
  ['topic', 'General pathology'],
  ['subtopic', 'Chronic granulomatous inflammation'],
  ['microtopic', 'Tuberculosis and caseation'],
  ['nanotopic', 'Family-104 terminal CBL'],
  ['primary_node_id', 'SYS-INF'],
  ['secondary_node_ids', 'DIS-PAT-T01'],
  ['template_id', 'TPL-CONCEPT'],
  ['archetype', 'concept'],
  ['language', 'en'],
  ['learner_stage', 'Years 1–3 foundation'],
  ['reading_time', '4'],
  ['high_yield', 'High'],
  ['time_sensitive', 'stable'],
  ['status', 'Draft'],
  ['owner', 'Helwan Year-1 authoring lane'],
  ['reviewer', 'Medical team, Helwan Pathology faculty'],
  ['final_publisher', 'Admin team'],
  ['summary', 'A source-bounded explanation of why the terminal Family-104 lung case identifies tuberculosis.'],
  ['sections', `### Definition
Caseation necrosis is a form of tissue necrosis strongly associated in the source with tuberculosis and a caseating granulomatous response.

### Mechanism
The source frames the lesion as chronic granulomatous inflammation containing lymphocytes, macrophages, multinucleated giant cells, and central caseation.

### Key determinants
The Family-104 CBL combines chronic dyspnea and cough, multiple pulmonary nodules, raised inflammatory markers, and biopsy findings of lymphocytes, macrophages, multinucleated giant cells, and caseation necrosis. The deck contrasts sarcoidosis as a noncaseating granulomatous condition.

### Clinical significance
The terminal reveal identifies tuberculosis when caseation is present in the pulmonary granulomas. That reveal is a teaching answer in an undated lecture deck, not an authenticated examination key, and remains Draft pending independent review.`],
  ['published_summary', ''],
  ['published_sections', ''],
  ['hold_these', 'Caseation necrosis in a chronic pulmonary granuloma points to tuberculosis in the source case.'],
  ['lose_the_mark', 'Treating every granuloma as tuberculosis without checking for caseation.\nCalling the page-59 teaching reveal an official examination key.\nInferring a sitting, recurrence or marks from the lecture filename.'],
  ['related_concepts', concept],
  ['related_articles', relatedArticle],
  ['question_ids', question],
  ['resource_ids', source],
  ['universities', 'hu'],
  ['years', 'HU_Y1'],
  ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pathology > Chronic granulomatous inflammation > Tuberculosis and caseation > Family-104'],
  ['university_notes', 'hu: Helwan-authored tier-6 lecture CBL with a source-native red reveal; no exam or official-key authority is inferred.'],
  ['annotations', `### definition_of · ${concept}\nQuote: Caseation necrosis is a form of tissue necrosis strongly associated in the source with tuberculosis and a caseating granulomatous response.\nBlock: body`],
  ['media', ''],
  ['media_recommendations', ''],
  ['callout_evidence', `### Caseation necrosis in a chronic pulmonary granuloma points to tuberculosis in the source case.\nClaims: ${claim}\nCitations: ${qCitation}, ${keyCitation}\nSpans: ${span}`],
  ['article_source_ids', source],
  ['claim_ids', claim],
  ['span_ids', span],
  ['publication_gate', 'needs_evidence'],
  ['evidence_basis', 'Exact Family-104 terminal CBL prompt plus a literal repeated occurrence with a red teaching-answer reveal.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pathology faculty review remain required.'],
  ['conflicts', '[clear]'],
  ['last_reviewed', ''],
  ['review_due', ''],
  ['notes', 'Family 104 releases one four-option Draft CBL record. The repeat is evidence only; instructor callouts remain excluded.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: Source images are not redistributed and the text case is sufficient to answer.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const differentialArticleRow = row([
  ['id', relatedArticle], ['title', 'Caseating and noncaseating granulomas in the Family-104 lecture'], ['arabic_title', ''],
  ['aliases', 'Family-104 granuloma comparison\nTuberculosis versus sarcoidosis teaching'], ['subject', 'fnd'], ['topic', 'General pathology'],
  ['subtopic', 'Chronic granulomatous inflammation'], ['microtopic', 'Caseating and noncaseating granulomas'], ['nanotopic', 'Family-104 source differential'],
  ['primary_node_id', 'SYS-INF'], ['secondary_node_ids', 'DIS-PAT-T01'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
  ['language', 'en'], ['learner_stage', 'Years 1–3 foundation'], ['reading_time', '4'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pathology faculty'], ['final_publisher', 'Admin team'],
  ['summary', 'A source-bounded comparison used to interpret the Family-104 terminal lung CBL.'],
  ['sections', `### Definition
Granulomatous inflammation is organised around macrophages and multinucleated giant cells; the source distinguishes caseating from noncaseating patterns.

### Mechanism
The lecture presents tuberculosis with caseating granulomas and sarcoidosis with noncaseating granulomas. The terminal case supplies caseation rather than merely naming granulomatous inflammation.

### Key determinants
Multiple pulmonary nodules and chronic respiratory symptoms are nonspecific. Caseation necrosis within a granuloma is the source feature that selects tuberculosis over sarcoidosis in this option set.

### Clinical significance
The comparison supports interpretation of the exact teaching case. It does not establish an examination key, treatment rule, or general diagnostic protocol.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', 'Caseation distinguishes the source tuberculosis pattern from its noncaseating sarcoidosis comparison.'],
  ['lose_the_mark', 'Selecting sarcoidosis despite explicit caseation necrosis.\nTreating a teaching comparison as a general diagnostic protocol.\nInferring official-key authority from a red lecture reveal.'],
  ['related_concepts', concept], ['related_articles', article], ['question_ids', question], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'],
  ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pathology > Chronic granulomatous inflammation > Granuloma differential > Family-104'],
  ['university_notes', 'hu: Helwan-authored tier-6 lecture comparison and terminal CBL reveal; no exam or official-key authority is inferred.'],
  ['annotations', `### contrasts_with · ${concept}\nQuote: Caseation necrosis within a granuloma is the source feature that selects tuberculosis over sarcoidosis in this option set.\nBlock: body`],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', `### Caseation distinguishes the source tuberculosis pattern from its noncaseating sarcoidosis comparison.\nClaims: ${claim}\nCitations: ${qCitation}, ${keyCitation}\nSpans: ${differentialSpan}`],
  ['article_source_ids', source], ['claim_ids', claim], ['span_ids', differentialSpan], ['publication_gate', 'needs_evidence'],
  ['evidence_basis', 'Family-104 lecture comparison plus the exact terminal CBL prompt and literal red reveal.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pathology faculty review remain required.'], ['conflicts', '[clear]'],
  ['last_reviewed', ''], ['review_due', ''], ['notes', 'Companion teaching article for the one safe Family-104 CBL; no extra question or concept is inferred.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No source image is redistributed.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const conceptPath = join(repo, 'docs', 'Kasr-Source-Imports', 'concept', '108-INT-concepts-pathology.md')
const extracted = readFileSync(conceptPath, 'utf8').split(/\n---\n/).find((item) => item.includes(`## id\n${concept}\n`))?.trim()
if (!extracted) throw new Error(`Cannot find ${concept}`)
const get = (item, key) => (item.match(new RegExp(`^## ${key}\\n([\\s\\S]*?)(?=\\n## |$)`, 'm')) ?? [])[1]?.trimEnd() ?? ''
const set = (item, key, value) => {
  const pattern = new RegExp(`(## ${key}\\n)[\\s\\S]*?(?=\\n## |$)`)
  if (!pattern.test(item)) throw new Error(`Missing ${key}`)
  return item.replace(pattern, `$1${value}`)
}
let conceptRow = extracted
const priorPaths = get(conceptRow, 'module_subject').split('\n').filter(Boolean)
conceptRow = set(conceptRow, 'status', 'Draft')
conceptRow = set(conceptRow, 'publication_status', 'needs_evidence')
conceptRow = set(conceptRow, 'universities', '+hu')
conceptRow = set(conceptRow, 'modules', '+HU-BMS-102')
conceptRow = set(conceptRow, 'module_subject', ['HU-BMS-102 > Pathology > Chronic granulomatous inflammation > Tuberculosis and caseation > Family-104', ...priorPaths].join('\n'))
conceptRow = set(conceptRow, 'article_ids', `+${article}\n+${relatedArticle}`)
conceptRow = set(conceptRow, 'resource_ids', `+${source}`)
conceptRow = set(conceptRow, 'atomic_claim_ids', `+${claim}`)
conceptRow = set(conceptRow, 'exam_weight_by_year', 'HU_Y1=0.62')
conceptRow = set(conceptRow, 'exam_signal', `${get(conceptRow, 'exam_signal')}\n${source} | Helwan tier-6 teaching CBL | Family-104 Q01 | page-59 red reveal, not an official key`)
conceptRow = set(conceptRow, 'original_wording', `${get(conceptRow, 'original_wording')}\n[Family-104 p58–59] ${questionText} [red teaching answer D. Tuberculosis.]`)
conceptRow = set(conceptRow, 'evidence_gaps', `${get(conceptRow, 'evidence_gaps')} Family-104 adds an undated Helwan teaching reveal; named faculty review remains required before publication.`)
conceptRow = set(conceptRow, 'field_notes', `arabicLabel: Existing reviewed terminology is preserved.\narabicAliases: Existing reviewed aliases are preserved.\nmicrotopicId: Existing canonical placement is preserved.\nnanotopicId: Existing canonical placement is preserved.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family-104 prompt and reveal pages.\nsourceCandidateIds: Family 104 completed the governed four-query search and reused this exact ID.\nlastReviewed: New Draft overlay; no Helwan faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nfamily104Reuse: Exact-ID reuse appends HU-BMS-102 Family-104 traceability without changing the concept meaning.\npriorNotes: ${get(conceptRow, 'field_notes').replace(/\n/g, ' ')}`)

const questionRow = row([
  ['id', question],
  ['title', questionText],
  ['subject', 'fnd'],
  ['status', 'Draft'],
  ['owner', 'Helwan Year-1 authoring lane'],
  ['vignette', sourcePrompt],
  ['question', questionText],
  ['format', 'single best answer'],
  ['derived_from', ''],
  ['correct_answer', 'D'],
  ['answer_a', options[0]],
  ['explanation_a', 'Asbestosis is presented as a dust-related chronic lung disease rather than the caseating granulomatous pattern in this biopsy. The source case specifically includes caseation necrosis. Its terminal reveal selects tuberculosis, so Asbestosis. is not the source-marked best answer.'],
  ['answer_b', options[1]],
  ['explanation_b', 'Bilharziasis can produce granulomatous inflammation around parasitic material, but that is not the pattern selected in this pulmonary case. The decisive source clue is caseation necrosis. The terminal reveal selects tuberculosis, so Bilharziasis. is not the source-marked best answer.'],
  ['answer_c', options[2]],
  ['explanation_c', 'Sarcoidosis is contrasted in the lecture with tuberculosis and is presented as a noncaseating granulomatous condition. This biopsy explicitly contains caseation necrosis. The terminal reveal selects tuberculosis, so Sarcoidosis. is not the source-marked best answer.'],
  ['answer_d', options[3]],
  ['explanation_d', 'Tuberculosis produces caseating granulomatous inflammation in the source teaching. The chronic pulmonary nodules and biopsy containing macrophages, multinucleated giant cells, lymphocytes, and caseation match that pattern. The page-59 teaching reveal marks option D.'],
  ['answer_e', ''],
  ['explanation_e', ''],
  ['topic', 'General pathology'],
  ['subtopic', 'Chronic granulomatous inflammation'],
  ['difficulty', 'Moderate'],
  ['question_type', 'Pathology'],
  ['main_concept', concept],
  ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pathology > Chronic granulomatous inflammation > Tuberculosis and caseation > Family-104 > Q01'],
  ['clinical_relevance', '0.78'],
  ['academic_relevance', '0.96'],
  ['cognitive_effort_score', '0.58'],
  ['exam_weight_by_year', 'HU_Y1=0.62'],
  ['question_only_for', 'HU_Y1'],
  ['concept_ids', concept],
  ['years', 'HU_Y1'],
  ['universities', 'hu'],
  ['cognitive_effort', 'Moderate'],
  ['setting', 'Clinical'],
  ['reasoning_level', '2'],
  ['inferred_difficulty', '54'],
  ['exam_relevance', '6'],
  ['contextual_concept_ids', ''],
  ['library_ids', `${article}\n${relatedArticle}`],
  ['resource_ids', source],
  ['learning_objective', 'Recognise tuberculosis from caseating pulmonary granulomas in the exact source case.'],
  ['media_recommendations', ''],
  ['source_citation', `${source}, PDF pp58–59, Family-104 terminal CBL: exact stem and option order on p58; literal repeat on p59 reveals D in red. Teaching authority only, not an examination or authenticated official key.`],
  ['attachments', ''],
  ['attached_image', ''],
  ['author_notes', 'Exact source wording, capitalization, punctuation, and option order are preserved after removing PDF line wraps. Page 59 is excluded as a duplicate question record and retained only as answer evidence. Page-47 instructor callouts and page-5 Why?? remain exclusions.'],
  ['estimated_seconds', '90'],
  ['randomise_answers', 'yes'],
])

const claimRow = row([
  ['id', claim], ['concept_id', concept], ['subject', 'fnd'],
  ['predicate', 'has_source_marked_best_answer'], ['object', options[3]],
  ['display_text', `${questionText} — ${options[3]}`],
  ['risk_class', 'clinical_non_treatment'], ['verification_status', 'needs_evidence'],
  ['conflict_status', 'none'], ['confidence', '0.88'], ['freshness', 'stable_local_teaching_answer'],
  ['time_sensitive', 'no'], ['qualifiers', 'authority: Helwan-authored tier-6 lecture with a red teaching reveal, not an official key. scope: Family-104 terminal CBL; no procedural capability is added.'],
])
const qCitationRow = row([
  ['id', qCitation], ['claim_id', claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
  ['support_span', `${sourcePrompt} ${questionText} Options: A. ${options[0]} | B. ${options[1]} | C. ${options[2]} | D. ${options[3]}`],
  ['locator_type', 'page'], ['locator_page', '58'], ['locator_section', 'Case-Based learning (CBL), Case1'],
  ['locator_detail', 'Exact case, question and complete four-option structure'],
  ['context_note', 'Helwan-authored teaching prompt; no exam sitting, marks or candidate instructions.'],
  ['confidence', '0.99'], ['counts_as_claim_evidence', 'no'],
])
const keyCitationRow = row([
  ['id', keyCitation], ['claim_id', claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
  ['support_span', 'd) Tuberculosis.'], ['locator_type', 'page'], ['locator_page', '59'],
  ['locator_section', 'Case-Based learning (CBL), Case1 repeat'], ['locator_detail', 'Literal repeat displays option d) Tuberculosis. in red'],
  ['context_note', 'Source-native teaching-answer reveal only; not an authenticated official key.'],
  ['confidence', '0.99'], ['counts_as_claim_evidence', 'no'],
])
const spanRow = row([
  ['id', span], ['article_id', article], ['section_id', 'art-hu-bms102-pat-f104-tb-caseation-source-case-pattern'],
  ['text', 'The Family-104 terminal CBL identifies tuberculosis when chronic pulmonary granulomas contain multinucleated giant cells and caseation necrosis.'],
  ['claim_ids', claim], ['citation_ids', `${qCitation}\n${keyCitation}`],
])
const differentialSpanRow = row([
  ['id', differentialSpan], ['article_id', relatedArticle], ['section_id', 'art-hu-bms102-pat-f104-granuloma-differential-key-determinants'],
  ['text', 'Caseation distinguishes the source tuberculosis pattern from its noncaseating sarcoidosis comparison.'],
  ['claim_ids', claim], ['citation_ids', `${qCitation}\n${keyCitation}`],
])

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family104-sources.md', sourceRow],
  ['article/HU-BMS-102-pathology-family104-articles.md', `${articleRow}\n---\n\n${differentialArticleRow}`],
  ['concept/HU-BMS-102-pathology-family104-concepts.md', conceptRow],
  ['question/HU-BMS-102-pathology-family104-questions.md', questionRow],
  ['evidence/HU-BMS-102-pathology-family104-claims.md', claimRow],
  ['evidence/HU-BMS-102-pathology-family104-citations.md', `${qCitationRow}\n---\n\n${keyCitationRow}`],
  ['evidence/HU-BMS-102-pathology-family104-spans.md', `${spanRow}\n---\n\n${differentialSpanRow}`],
])
for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: 104, released: { sources: 1, articles: 2, concepts: 1, reusedConcepts: 1, newConcepts: 0, questions: 1, claims: 1, citations: 2, spans: 2, relations: 0 }, exclusions: { literalRevealRepeat: 1, instructorCallouts: 3 }, statuses: { studentFacing: 'Draft', concepts: 'needs_evidence' } }, null, 2))
