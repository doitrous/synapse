import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_fe2395858a742cfa5fc9'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const conceptId = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const articles = {
  adr: {
    id: 'ART-HU-BMS102-PHA-F252-ADRENERGIC-MATCHING',
    title: 'Adrenergic drug mechanisms',
    subtopic: 'Adrenergic pharmacology',
    microtopic: 'Agonists, central sympatholytics and mixed blockade',
    summary: 'A focused review of five adrenergic drugs and their receptor or transmitter mechanisms.',
  },
  chol: {
    id: 'ART-HU-BMS102-PHA-F252-CHOLINOMIMETIC-MATCHING',
    title: 'Cholinomimetic drug indications',
    subtopic: 'Cholinergic pharmacology',
    microtopic: 'Direct agonists and anticholinesterase uses',
    summary: 'A focused review of four cholinomimetic drugs and their characteristic indications.',
  },
}

const specs = [
  { ref: 'Q1-P1', block: 'Q1', article: 'adr', prompt: 'Adrenaline', key: 'D', answer: 'stimulate all adrenargic receptors', canonical: 'adrenaline-all-adrenergic-receptors', definition: 'Adrenaline stimulates alpha and beta adrenergic receptors.' },
  { ref: 'Q1-P2', block: 'Q1', article: 'adr', prompt: 'a- methyl dopa', key: 'F', answer: 'Neuronal adrenergic blocker that inhibit synthesis of transmitter', canonical: 'alpha-methyldopa-transmitter-synthesis-inhibitor', definition: 'Alpha-methyldopa reduces adrenergic transmitter synthesis through its central sympatholytic pathway.' },
  { ref: 'Q1-P3', block: 'Q1', article: 'adr', prompt: 'Isoprenaline', key: 'C', answer: 'Stimulate beta only', canonical: 'isoprenaline-beta-receptor-agonist', definition: 'Isoprenaline stimulates beta adrenergic receptors rather than alpha receptors.' },
  { ref: 'Q1-P4', block: 'Q1', article: 'adr', prompt: 'Clonidine', key: 'E', answer: 'alpha 2 agonist', canonical: 'clonidine-alpha2-agonist', definition: 'Clonidine is an alpha-2 adrenergic receptor agonist.' },
  { ref: 'Q1-P5', block: 'Q1', article: 'adr', prompt: 'Labetolol', key: 'A', answer: 'alpha and beta blocker', canonical: 'labetalol-alpha-beta-blocker', definition: 'Labetalol blocks both alpha and beta adrenergic receptors.' },
  { ref: 'Q5-P1', block: 'Q5', article: 'chol', prompt: 'Pilocarpine', key: 'B', answer: 'Glaucoma/miotic/hair tonic/xerostomia', canonical: 'pilocarpine-indications-glaucoma-miotic-xerostomia', definition: 'Pilocarpine is a muscarinic agonist used as a miotic and for glaucoma or xerostomia.' },
  { ref: 'Q5-P2', block: 'Q5', article: 'chol', prompt: 'Bethanechol', key: 'D', answer: 'Megacolon', canonical: 'bethanechol-megacolon-use', definition: 'Bethanechol is used to stimulate gastrointestinal smooth muscle in megacolon.' },
  { ref: 'Q5-P3', block: 'Q5', article: 'chol', prompt: 'Neostigmine', key: 'E', answer: 'Antidote for curare/myasthenia gravis', canonical: 'neostigmine-curare-antidote-myasthenia-gravis', definition: 'Neostigmine reverses curare-type neuromuscular blockade and is used in myasthenia gravis.' },
  { ref: 'Q5-P4', block: 'Q5', article: 'chol', prompt: 'Physostigmine', key: 'C', answer: 'Atropine Toxicity', canonical: 'physostigmine-atropine-toxicity', definition: 'Physostigmine can reverse central and peripheral manifestations of atropine toxicity.' },
].map(spec => ({
  ...spec,
  concept: conceptId(spec.canonical),
  claim: `CLM-HU102-F252-${spec.ref}-01`,
  promptCitation: `CIT-HU102-F252-${spec.ref}-PROMPT`,
  keyCitation: `CIT-HU102-F252-${spec.ref}-KEY`,
  span: `SPN-HU102-F252-${spec.ref}-01`,
}))

const blocks = {
  Q1: {
    id: 'Q-HU102-PHA-F252-Q01',
    article: articles.adr.id,
    title: 'Match each adrenergic drug to its mechanism of action',
    question: 'Match each drug to its mechanism of action.',
    options: [
      ['A', 'alpha and beta blocker'],
      ['B', 'Short acting p2 agonist used in asthma'],
      ['C', 'Stimulate beta only'],
      ['D', 'stimulate all adrenargic receptors'],
      ['E', 'alpha 2 agonist'],
      ['F', 'Neuronal adrenergic blocker that inhibit synthesis of transmitter'],
    ],
    note: 'All six printed mechanisms are preserved, including unused distractor B. The source spellings “Labetolol”, “adrenargic”, and “p2” are retained in the matching fields.',
  },
  Q5: {
    id: 'Q-HU102-PHA-F252-Q05',
    article: articles.chol.id,
    title: 'Match each cholinomimetic drug to its suitable indication',
    question: 'Match each cholinomimetic drug to its suitable indication.',
    options: [
      ['A', 'Alzheimer dementia'],
      ['B', 'Glaucoma/miotic/hair tonic/xerostomia'],
      ['C', 'Atropine Toxicity'],
      ['D', 'Megacolon'],
      ['E', 'Antidote for curare/myasthenia gravis'],
    ],
    note: 'All five printed indications are preserved, including unused distractor A. The source wording and slash-separated indication bank remain intact.',
  },
}

for (const spec of specs) {
  if (spec.concept !== conceptId(spec.canonical)) throw new Error(`unstable concept ID for ${spec.ref}`)
  if (!blocks[spec.block].options.some(([letter, text]) => letter === spec.key && text === spec.answer)) throw new Error(`key does not resolve for ${spec.ref}`)
}
if (specs.length !== 9 || specs.filter(spec => spec.block === 'Q1').length !== 5 || specs.filter(spec => spec.block === 'Q5').length !== 4) throw new Error('Family252 safe relation count mismatch')

const sourceRow = row([
  ['id', source], ['title', 'College MCQsquestions_autonomic'],
  ['institution', 'Helwan BMS-102 local question collection; no institution is printed in the carrier'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/College MCQsquestions_autonomic.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '2'],
  ['sha256', 'fe2395858a742cfa5fc9fb5f2074be62bbfa42f42f7275d0ccd78f00de71f5b7'],
  ['processing_status', 'pending'], ['rights', 'Local anonymous question sheet held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 anonymous auxiliary question material. Family252 authors only the two visibly keyed matching blocks. Holds are four unkeyed Q2 matches, one immediately answered but unmarked Q3 written operation, three unkeyed Q3 written operations, and five unkeyed Q6 written operations. No author, Helwan mark, sitting, official key, candidate response, or practical authority is inferred.'],
  ['is_assessment', 'yes'],
])

const questionRows = Object.entries(blocks).map(([block, q]) => {
  const members = specs.filter(spec => spec.block === block)
  return row([
    ['id', q.id], ['title', q.title], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'],
    ['vignette', 'Choose the best relation for each drug from the shared option bank. One option is unused.'], ['question', q.question], ['format', 'matching'],
    ['matching_options', q.options.map(([letter, text]) => `${letter} | ${text}`).join('\n')],
    ['matching_prompts', members.map(spec => `${spec.prompt} = ${spec.key}`).join('\n')], ['derived_from', ''],
    ['topic', 'General pharmacology'], ['subtopic', articles[members[0].article].subtopic], ['difficulty', 'Moderate'],
    ['explanation', members.map(spec => `${spec.prompt}: ${spec.definition}`).join('\n')],
    ['question_type', 'Pharmacology'], ['main_concept', members.map(spec => spec.concept).join(' | ')], ['module', 'HU-BMS-102'],
    ['module_subject', `HU-BMS-102 > Pharmacology > ${articles[members[0].article].subtopic} > Family252 > ${block}`],
    ['clinical_relevance', '0.66'], ['academic_relevance', '0.95'], ['cognitive_effort_score', '0.52'],
    ['exam_weight_by_year', 'HU_Y1=0.52'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'],
    ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Medium'], ['setting', 'Academic'],
    ['reasoning_level', '1'], ['inferred_difficulty', '52'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'],
    ['library_ids', q.article], ['resource_ids', source],
    ['learning_objective', `Discriminate ${members.length} drug-to-${block === 'Q1' ? 'mechanism' : 'indication'} relations within a shared option bank.`],
    ['media_recommendations', ''],
    ['source_citation', `${source}, Family252 ${block}, PDF p${block === 'Q1' ? '1' : '2'}: exact printed matching prompts, complete option bank, and inline answer letters. Anonymous tier-9 auxiliary authority only.`],
    ['attachments', ''], ['attached_image', ''],
    ['author_notes', `${q.note} Holds are four unkeyed Q2 matches, one immediately answered but unmarked Q3 written operation, three unkeyed Q3 written operations, and five unkeyed Q6 written operations. No missing answers, marks, options, or authority are inferred.`],
    ['estimated_seconds', block === 'Q1' ? '150' : '120'], ['randomise_answers', 'yes'],
  ])
})

const conceptRows = specs.map(spec => row([
  ['label', spec.definition], ['id', spec.concept], ['canonical_key', spec.canonical], ['aliases', `${spec.prompt} — ${spec.answer}`],
  ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', spec.definition],
  ['explicit_objective', `Match ${spec.prompt} to its receptor action, transmitter effect, or characteristic indication.`],
  ['pitfalls', `Confusing ${spec.prompt} with a pharmacologically adjacent drug that has a different receptor action or indication.`],
  ['concept_type', 'drug_mechanism_or_indication'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['topic', 'General pharmacology'],
  ['subtopic', articles[spec.article].subtopic], ['microtopic', articles[spec.article].microtopic], ['nanotopic', `Family252 ${spec.ref}`],
  ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > ${articles[spec.article].subtopic} > Family252 > ${spec.ref}`],
  ['article_ids', articles[spec.article].id], ['related_article_ids', Object.values(articles).filter(a => a.id !== articles[spec.article].id).map(a => a.id).join('\n')],
  ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
  ['blueprint_weight', '0.52'], ['exam_weight_by_year', 'HU_Y1=0.52'], ['clinical_relevance', '0.66'], ['academic_relevance', '0.95'],
  ['weight_confidence', '0.38'], ['confidence', '0.70'],
  ['exam_signal', `${source} | Family252 ${spec.ref} | inline matching letter | anonymous tier-9 auxiliary source, not an official key`],
  ['atomic_claim_ids', spec.claim], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
  ['original_wording', `[Family252 ${spec.ref}] ${spec.prompt} ${spec.key}; ${spec.key}. ${spec.answer}`],
  ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
  ['uncertainty', 'Anonymous tier-9 auxiliary question material; no visible institution, module, sitting, marks, or official-key approval.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'],
  ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
  ['field_notes', `arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family252 matching relation.\nsourceCandidateIds: Four-search source-first reconciliation found no authored concept record for this scope.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.`],
]))

const articleRows = Object.values(articles).map(article => {
  const members = specs.filter(spec => articles[spec.article].id === article.id)
  const question = blocks[members[0].block]
  return row([
    ['id', article.id], ['title', article.title], ['arabic_title', ''], ['aliases', `${article.subtopic}\nAutonomic pharmacology matching`],
    ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', article.subtopic], ['microtopic', article.microtopic], ['nanotopic', 'Family252 keyed matching block'],
    ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
    ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '5'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
    ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['summary', article.summary],
    ['sections', `### Definition\n${article.summary}\n\n### Mechanism\nReceptor selectivity, effects on adrenergic transmitter synthesis, and cholinesterase inhibition distinguish these drugs. Therapeutic indications follow from those pharmacological actions.\n\n### Core relations\n${members.map(spec => `- ${spec.definition}`).join('\n')}\n\n### Key determinants\nDistinguish broad adrenergic agonism from beta-only agonism, alpha-2 agonism from mixed alpha/beta blockade, and direct muscarinic agonists from anticholinesterases.\n\n### Clinical significance\nThese relations support foundational autonomic pharmacology. They do not provide prescribing, dosing, or patient-management instructions.\n\n### Common misconceptions\nDo not confuse isoprenaline with an alpha agonist, clonidine with an adrenergic blocker, or physostigmine with a peripheral-only anticholinesterase.`],
    ['published_summary', ''], ['published_sections', ''], ['hold_these', members.map(spec => spec.definition).join('\n')],
    ['lose_the_mark', 'Confusing beta-only agonism with broad alpha/beta agonism.\nConfusing alpha-2 agonism with mixed alpha/beta blockade.\nInterchanging direct muscarinic agonists and anticholinesterases.'],
    ['related_concepts', members.map(spec => spec.concept).join('\n')], ['related_articles', Object.values(articles).filter(a => a.id !== article.id).map(a => a.id).join('\n')],
    ['question_ids', question.id], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'],
    ['module_subject', `HU-BMS-102 > Pharmacology > ${article.subtopic} > Family252`],
    ['university_notes', 'hu: Anonymous tier-9 auxiliary question sheet with inline matching letters; not an authenticated examination or official departmental key.'],
    ['annotations', members.map(spec => `### definition_of · ${spec.concept}\nQuote: ${spec.definition}\nBlock: body`).join('\n\n')],
    ['media', ''], ['media_recommendations', ''],
    ['callout_evidence', members.map(spec => `### ${spec.definition}\nClaims: ${spec.claim}\nCitations: ${spec.promptCitation}, ${spec.keyCitation}\nSpan: ${spec.span}`).join('\n\n')],
    ['article_source_ids', source], ['claim_ids', members.map(spec => spec.claim).join('\n')], ['span_ids', members.map(spec => spec.span).join('\n')],
    ['publication_gate', 'needs_evidence'], ['evidence_basis', `Family252 ${members[0].block} preserves the exact matching prompts, complete option bank, and inline answer letters.`],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['conflicts', '[clear]'],
    ['last_reviewed', ''], ['review_due', ''],
    ['notes', 'Only visibly keyed matching relations are authored. Holds are four unkeyed Q2 matches, one immediately answered but unmarked Q3 written operation, three unkeyed Q3 written operations, and five unkeyed Q6 written operations.'],
    ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
})

const claimRows = specs.map(spec => row([
  ['id', spec.claim], ['concept_id', spec.concept], ['subject', 'pharm'], ['predicate', 'is matched in the source to'], ['object', spec.answer],
  ['display_text', spec.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'],
  ['confidence', '0.70'], ['freshness', 'source_modified_2025-04-30'], ['time_sensitive', 'no'],
  ['qualifiers', `authority: anonymous tier-9 auxiliary question material, not official key; occurrence: Family252 ${spec.ref}.`],
]))

const citationRows = specs.flatMap(spec => [
  row([['id', spec.promptCitation], ['claim_id', spec.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${spec.prompt} appears as a numbered prompt in the complete ${spec.block} matching block.`], ['locator_type', 'page'],
    ['locator_page', spec.block === 'Q1' ? '1' : '2'], ['locator_section', `Family252 ${spec.ref}`], ['locator_detail', 'Exact printed drug prompt within the matching block'],
    ['context_note', 'Anonymous tier-9 auxiliary question material; not an authenticated examination or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', spec.keyCitation], ['claim_id', spec.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `Inline source mapping: ${spec.prompt} ${spec.key}; option ${spec.key}: ${spec.answer}`], ['locator_type', 'page'],
    ['locator_page', spec.block === 'Q1' ? '1' : '2'], ['locator_section', `Family252 ${spec.ref}`], ['locator_detail', 'Inline printed answer letter and corresponding option-bank text'],
    ['context_note', 'Anonymous tier-9 auxiliary question material; not an authenticated examination or official key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])

const spanRows = specs.map(spec => row([
  ['id', spec.span], ['article_id', articles[spec.article].id], ['section_id', `${articles[spec.article].id.toLowerCase()}-${spec.ref.toLowerCase()}`],
  ['text', spec.definition], ['claim_ids', spec.claim], ['citation_ids', `${spec.promptCitation}\n${spec.keyCitation}`],
]))

const relationRows = [
  ['Q1-P1', 'related_concepts', 'Q1-P3', 'the block contrasts broad alpha/beta agonism with beta-only agonism'],
  ['Q1-P2', 'related_concepts', 'Q1-P4', 'the block relates two central sympatholytic mechanisms'],
  ['Q1-P4', 'contrasts_with', 'Q1-P5', 'the block contrasts alpha-2 agonism with mixed alpha/beta blockade'],
  ['Q5-P1', 'related_concepts', 'Q5-P2', 'the block contrasts direct muscarinic agonists by indication'],
  ['Q5-P3', 'related_concepts', 'Q5-P4', 'the block contrasts peripheral and centrally active anticholinesterase uses'],
].map(([from, type, to, scope]) => {
  const a = specs.find(spec => spec.ref === from), b = specs.find(spec => spec.ref === to)
  return row([['source', a.concept], ['type', type], ['target', b.concept], ['evidence_claim_ids', `${a.claim}\n${b.claim}`],
    ['citation_ids', `${a.promptCitation}\n${b.promptCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.68'],
    ['qualifiers', `scope: ${scope}`], ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family252-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family252-articles.md', rows(articleRows)],
  ['concept/HU-BMS-102-pharmacology-family252-concepts.md', rows(conceptRows)],
  ['evidence/HU-BMS-102-pharmacology-family252-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family252-citations.md', rows(citationRows)],
  ['evidence/HU-BMS-102-pharmacology-family252-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family252-relations.md', rows(relationRows)],
  ['question/HU-BMS-102-pharmacology-family252-matching.md', rows(questionRows)],
])

for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}

console.log(JSON.stringify({
  family: 252,
  rawPromptOperations: 22,
  sourceAnswers: 10,
  safeMatchingBlocks: 2,
  safeKeyedRelations: 9,
  holds: { unkeyedMatching: 4, answeredUnmarkedWritten: 1, unkeyedWritten: 8, total: 13 },
  concepts: specs.length,
  articles: articleRows.length,
  questions: questionRows.length,
  claims: claimRows.length,
  citations: citationRows.length,
  spans: spanRows.length,
  relations: relationRows.length,
  emitted: [...files.keys()],
}, null, 2))
