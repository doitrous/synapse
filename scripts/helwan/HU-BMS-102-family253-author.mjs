import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_18e0caec9575b1c3571e'
const article = 'ART-HU-BMS102-PHA-F253-ADRENALINE-ACTIONS'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`
const letters = 'ABCDE'

const specs = [
  {
    ref: 'MCQ02', format: 'single best answer', page: 1,
    stem: 'Which of the following is a common side effect of adrenaline administration?',
    options: ['Hypotension', 'Bradycardia', 'Tremors', 'Hyperkalemia'], key: 'C',
    canonical: 'adrenaline-tremor-adverse-effect',
    definition: 'Adrenaline can cause tremor as an adverse effect.',
    objective: 'Identify tremor as a common adverse effect of adrenaline in the presented option set.',
    explanations: [
      'Adrenaline commonly raises rather than lowers arterial pressure through its adrenergic actions.',
      'Beta-1 receptor stimulation tends to increase heart rate rather than cause bradycardia.',
      'Adrenergic stimulation can produce skeletal-muscle tremor, making this the best answer. This reflects beta-receptor effects on skeletal muscle rather than a fall in heart rate or arterial pressure. Hyperkalaemia is not the characteristic comparison.',
      'Adrenaline is not characteristically associated with hyperkalaemia in this adverse-effect comparison.',
    ],
  },
  {
    ref: 'TF01', format: 'true or false', page: 2,
    stem: 'Adrenaline is a selective beta-1 adrenergic receptor agonist.',
    options: ['True', 'False'], key: 'B', canonical: 'adrenaline-all-adrenergic-receptors',
    concept: 'CON-FND-4DBF512C3F3F66',
    definition: 'Adrenaline is a non-selective adrenergic agonist that stimulates alpha and beta receptors.',
    objective: 'Reject selective beta-1 agonism and recognise adrenaline as a non-selective alpha/beta agonist.',
    explanations: [
      'The statement is false because adrenaline activates alpha as well as beta adrenergic receptors.',
      'Adrenaline is a non-selective adrenergic agonist, so False is correct. It stimulates both alpha and beta receptor families rather than beta-1 alone. Beta-1 cardiac stimulation is only one component of its broader pharmacology.',
    ],
  },
  {
    ref: 'TF02', format: 'true or false', page: 2,
    stem: 'Adrenaline can be used to treat hypotension.',
    options: ['True', 'False'], key: 'A', canonical: 'adrenaline-hypotension-use',
    definition: 'Adrenaline can raise arterial pressure and may be used to treat hypotension.',
    objective: 'Recognise adrenaline as a drug that can be used to raise blood pressure in hypotension.',
    explanations: [
      'Adrenaline can increase arterial pressure through cardiac stimulation and vasoconstrictor effects, so True is correct. Its beta-1 action increases cardiac performance, while alpha-receptor activation can increase vascular resistance. This does not imply suitability for every hypotensive patient.',
      'The statement is not false: adrenaline has pressor effects that can be used in hypotension.',
    ],
  },
].map(spec => ({
  ...spec,
  concept: spec.concept ?? cid(spec.canonical),
  id: `Q-HU102-PHA-F253-${spec.ref}`,
  claim: `CLM-HU102-F253-${spec.ref}-01`,
  qCitation: `CIT-HU102-F253-${spec.ref}-QUESTION`,
  kCitation: `CIT-HU102-F253-${spec.ref}-KEY`,
  span: `SPN-HU102-F253-${spec.ref}-01`,
}))

for (const spec of specs) {
  if (spec.concept !== cid(spec.canonical)) throw new Error(`${spec.ref}: concept ID is not deterministic for ${spec.canonical}`)
  if (!spec.options[letters.indexOf(spec.key)]) throw new Error(`${spec.ref}: key ${spec.key} does not resolve`)
}
if (specs.length !== 3 || specs.map(spec => spec.key).join('') !== 'CBA') throw new Error('Family253 safe record contract mismatch')

const sourceRow = row([
  ['id', source], ['title', 'College MCQssympathomimetic questions'],
  ['institution', 'Helwan BMS-102 local question collection; no institution is printed in the carrier'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/College MCQssympathomimetic questions.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '2'],
  ['sha256', '18e0caec9575b1c3571ec49a157fb40f6ca827f8d4dae8835c2bc10c689f0c73'],
  ['processing_status', 'pending'], ['rights', 'Local anonymous revision sheet held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 anonymous auxiliary revision material. Family253 authors only MCQ2 and the two explicitly answered True/False items. MCQ1 is a key-text contradiction hold. Four immediately answered but unmarked written/fill operations and four unkeyed essay/case operations remain written holds. No author, Helwan mark, sitting, official key, candidate response, or practical authority is inferred.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Adrenaline receptor activity, tremor, and blood-pressure effects'], ['arabic_title', ''],
  ['aliases', 'Adrenaline pharmacology\nEpinephrine receptor and adverse effects'], ['subject', 'pharm'], ['topic', 'General pharmacology'],
  ['subtopic', 'Adrenergic pharmacology'], ['microtopic', 'Adrenaline actions and adverse effects'], ['nanotopic', 'Receptor breadth, tremor and hypotension'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
  ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '4'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Adrenaline stimulates alpha and beta adrenergic receptors, can produce tremor, and can raise arterial pressure.'],
  ['sections', `### Definition\nAdrenaline, or epinephrine, is a non-selective adrenergic agonist that acts at alpha and beta receptors.\n\n### Mechanism\nIts beta-1 cardiac actions increase heart rate and contractility, while alpha-receptor vasoconstriction can raise vascular resistance and arterial pressure. Beta-receptor stimulation can also contribute to tremor.\n\n### Key determinants\n${specs.map(spec => `- ${spec.definition}`).join('\n')}\n\n### Clinical significance\nThese relationships explain cardiovascular and adverse-effect patterns without providing a dose, route, or patient-specific treatment protocol.\n\n### Common misconceptions\nDo not describe adrenaline as a selective beta-1 agonist, confuse tremor with bradycardia, or assume its pressor action means it is appropriate for every hypotensive patient.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', specs.map(spec => spec.definition).join('\n')],
  ['lose_the_mark', 'Calling adrenaline a selective beta-1 agonist.\nMissing tremor as an adrenergic adverse effect.\nConfusing a pressor effect with a universal patient-specific treatment rule.'],
  ['related_concepts', specs.map(spec => spec.concept).join('\n')], ['related_articles', 'ART-HU-BMS102-PHA-F252-ADRENERGIC-MATCHING'],
  ['question_ids', specs.map(spec => spec.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pharmacology > Adrenergic pharmacology > Adrenaline actions > Family253'],
  ['university_notes', 'hu: Anonymous tier-9 auxiliary revision sheet with explicit answer lines; not an authenticated examination or official departmental key.'],
  ['annotations', specs.map(spec => `### definition_of · ${spec.concept}\nQuote: ${spec.definition}\nBlock: body`).join('\n\n')],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', specs.map(spec => `### ${spec.definition}\nClaims: ${spec.claim}\nCitations: ${spec.qCitation}, ${spec.kCitation}\nSpan: ${spec.span}`).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', specs.map(spec => spec.claim).join('\n')], ['span_ids', specs.map(spec => spec.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family253 stems, options, and adjacent printed Answer lines for MCQ2 and True/False 1–2.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['conflicts', '[clear]'],
  ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 12 raw operations, 8 supplied answers, 3 safe objective records, 1 contradictory MCQ hold, 4 answered unmarked-written holds, and 4 unkeyed written holds.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const extract = (path, id) => readFileSync(path, 'utf8').split(/\n---\n/).find(block => block.includes(`## id\n${id}\n`))?.trim()
const get = (block, key) => block.match(new RegExp(`## ${key}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, key, value) => block.replace(new RegExp(`(## ${key}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const append = (block, key, values) => {
  const current = get(block, key).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!current.includes(value)) current.push(value)
  return set(block, key, current.join('\n'))
}

const conceptRow = spec => {
  if (spec.ref === 'TF01') {
    const path = join(root, 'concept', 'HU-BMS-102-pharmacology-family252-concepts.md')
    let block = extract(path, spec.concept)
    if (!block) throw new Error(`Cannot reuse ${spec.concept}`)
    for (const [field, values] of [['article_ids', [article]], ['resource_ids', [source]], ['atomic_claim_ids', [spec.claim]]]) block = append(block, field, values)
    block = set(block, 'exam_signal', `${get(block, 'exam_signal')}\n${source} | Family253 ${spec.ref} | explicit false answer and correction | anonymous tier-9 auxiliary source`)
    block = set(block, 'original_wording', `${get(block, 'original_wording')}\n[Family253 ${spec.ref}] ${spec.stem} [False: Adrenaline is a non-selective adrenergic receptor agonist]`)
    block = set(block, 'field_notes', `${get(block, 'field_notes')}\nfamily253Reuse: Complete Family252 record preserved; Family253 article, source, claim, and wording links appended.`)
    if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${spec.concept} is not needs_evidence`)
    return block
  }
  return row([
    ['label', spec.definition], ['id', spec.concept], ['canonical_key', spec.canonical], ['aliases', spec.definition],
    ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', spec.definition], ['explicit_objective', spec.objective],
    ['pitfalls', spec.ref === 'MCQ02' ? 'Confusing adrenergic tremor with hypotension, bradycardia, or hyperkalaemia.' : 'Treating a possible pressor indication as a universal treatment rule without clinical context.'],
    ['concept_type', spec.ref === 'MCQ02' ? 'adverse_effect' : 'therapeutic_indication'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'],
    ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', 'Adrenergic pharmacology'],
    ['microtopic', 'Adrenaline actions and adverse effects'], ['nanotopic', `Family253 ${spec.ref}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'],
    ['module_subject', `HU-BMS-102 > Pharmacology > Adrenergic pharmacology > Family253 > ${spec.ref}`], ['article_ids', article],
    ['related_article_ids', 'ART-HU-BMS102-PHA-F252-ADRENERGIC-MATCHING'], ['related_concept_ids', '[clear]'], ['resource_ids', source],
    ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'],
    ['clinical_relevance', '0.68'], ['academic_relevance', '0.94'], ['weight_confidence', '0.38'], ['confidence', '0.70'],
    ['exam_signal', `${source} | Family253 ${spec.ref} | adjacent printed answer | anonymous tier-9 auxiliary source, not an official key`],
    ['atomic_claim_ids', spec.claim], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', `[Family253 ${spec.ref}] ${spec.stem} [printed answer ${spec.key}]`], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'],
    ['conflicts', '[clear]'], ['uncertainty', 'Anonymous tier-9 auxiliary revision material; no visible institution, module, sitting, marks, or official-key approval.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'],
    ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''],
    ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family253 objective record.\nsourceCandidateIds: Four-search source-first reconciliation found no authored concept record for this scope.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = spec => row([
  ['id', spec.id], ['title', spec.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''],
  ['question', spec.stem], ['format', spec.format], ['derived_from', ''], ['correct_answer', spec.key],
  ...spec.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, spec.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Adrenergic pharmacology'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'],
  ['main_concept', spec.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Adrenergic pharmacology > Family253 > ${spec.ref}`],
  ['clinical_relevance', '0.68'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.34'], ['exam_weight_by_year', 'HU_Y1=0.50'],
  ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', spec.objective], ['media_recommendations', ''],
  ['source_citation', `${source}, Family253 ${spec.ref}, PDF p${spec.page}: exact stem, option structure, and adjacent printed answer ${spec.key}. Anonymous tier-9 auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', 'Literal wording, capitalization, punctuation, and option order are preserved. MCQ1 is held for its letter/text contradiction. Four answered and four unkeyed written/fill operations remain unmarked-written holds. No marks, sitting, official-key authority, or patient-specific guidance is inferred.'],
  ['estimated_seconds', spec.format === 'true or false' ? '45' : '60'], ['randomise_answers', spec.format === 'true or false' ? 'no' : 'yes'],
])

const claimRows = specs.map(spec => row([
  ['id', spec.claim], ['concept_id', spec.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'],
  ['object', spec.options[letters.indexOf(spec.key)]], ['display_text', spec.definition], ['risk_class', 'foundational_stable'],
  ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.70'], ['freshness', 'source_created_2025-02-22'],
  ['time_sensitive', 'no'], ['qualifiers', `authority: anonymous tier-9 auxiliary revision material, not official key; occurrence: Family253 ${spec.ref}.`],
]))

const citationRows = specs.flatMap(spec => [
  row([['id', spec.qCitation], ['claim_id', spec.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${spec.stem} ${spec.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(spec.page)], ['locator_section', `Family253 ${spec.ref}`], ['locator_detail', 'Exact prompt and option structure'],
    ['context_note', 'Anonymous tier-9 auxiliary revision material; not an authenticated examination or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', spec.kCitation], ['claim_id', spec.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', spec.ref === 'TF01' ? 'False: Adrenaline is a non-selective adrenergic receptor agonist' : `Answer: ${spec.key}) ${spec.options[letters.indexOf(spec.key)]}`],
    ['locator_type', 'page'], ['locator_page', String(spec.page)], ['locator_section', `Family253 ${spec.ref}`], ['locator_detail', 'Adjacent explicit answer line'],
    ['context_note', 'Anonymous tier-9 auxiliary revision material; not an authenticated examination or official key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])

const spanRows = specs.map(spec => row([
  ['id', spec.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${spec.ref.toLowerCase()}`], ['text', spec.definition],
  ['claim_ids', spec.claim], ['citation_ids', `${spec.qCitation}\n${spec.kCitation}`],
]))

const relationRows = [
  [specs[1], 'related_concepts', specs[0], 'non-selective adrenergic activity is related to tremor as an adverse effect'],
  [specs[1], 'related_concepts', specs[2], 'alpha and beta receptor activity is related to the pressor effect used in hypotension'],
].map(([from, type, to, scope]) => row([
  ['source', from.concept], ['type', type], ['target', to.concept], ['evidence_claim_ids', `${from.claim}\n${to.claim}`],
  ['citation_ids', `${from.qCitation}\n${to.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.68'],
  ['qualifiers', `scope: ${scope}`], ['reviewer', 'Medical team, Admin team'],
]))

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family253-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family253-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family253-concepts.md', rows(specs.map(conceptRow))],
  ['evidence/HU-BMS-102-pharmacology-family253-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family253-citations.md', rows(citationRows)],
  ['evidence/HU-BMS-102-pharmacology-family253-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family253-relations.md', rows(relationRows)],
  ['question/HU-BMS-102-pharmacology-family253-mcq.md', rows(specs.map(questionRow))],
])

for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}

console.log(JSON.stringify({
  family: 253, rawPrompts: 12, sourceAnswers: 8, safeRecords: 3,
  holds: { contradictoryMcq: 1, answeredUnmarkedWritten: 4, unkeyedWritten: 4, total: 9 },
  concepts: specs.length, articles: 1, questions: specs.length, claims: claimRows.length,
  citations: citationRows.length, spans: spanRows.length, relations: relationRows.length,
  emitted: [...files.keys()],
}, null, 2))
