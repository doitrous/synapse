import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_e6a1286ae1e208700710'
const article = 'ART-HU-BMS102-PHA-F256-BETA-BLOCKERS'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`
const letters = 'ABCDE'

const specs = [
  {
    ref: 'Q01', page: 1, canonical: 'beta-blocker-beta-receptor-inhibition-primary-mechanism', conceptType: 'mechanism',
    stem: 'What is the primary mechanism of action of beta-blockers?',
    options: ['Alpha-adrenergic stimulation', 'Calcium channel blockade', 'Inhibition of beta-adrenergic receptors', 'Dopamine receptor activation'], key: 'C',
    definition: 'Beta blockers inhibit beta-adrenergic receptors.',
    objective: 'Identify inhibition of beta-adrenergic receptors as the primary mechanism of beta blockers.',
    pitfall: 'Confusing beta-receptor antagonism with alpha stimulation, calcium-channel blockade, or dopamine-receptor activation.',
    explanations: [
      'Alpha-adrenergic stimulation is an agonist action and is not the defining mechanism of beta blockers.',
      'Calcium-channel blockade describes another cardiovascular drug class rather than beta blockers.',
      'Beta blockers act by inhibiting beta-adrenergic receptor signalling, so this is the best answer. Their class identity comes from antagonism at beta receptors rather than stimulation of alpha or dopamine receptors. Calcium-channel blockade is a separate pharmacological mechanism.',
      'Dopamine-receptor activation is not the primary mechanism of beta blockers.',
    ],
  },
  {
    ref: 'Q02', page: 1, canonical: 'beta-blocker-angina-decrease-heart-rate-contractility', conceptType: 'therapeutic_indication',
    stem: 'Beta-blockers are useful in treating angina because they:',
    options: ['Increase myocardial oxygen consumption', 'Cause vasodilation of coronary arteries', 'Decrease heart rate and contractility', 'Stimulate beta-2 receptors in the heart'], key: 'C',
    definition: 'Beta blockers help treat angina by decreasing heart rate and myocardial contractility.',
    objective: 'Explain the antianginal benefit of beta blockers through reduced heart rate and contractility.',
    pitfall: 'Attributing the antianginal effect to coronary vasodilation or beta-2 stimulation rather than reduced cardiac workload.',
    explanations: [
      'Increasing myocardial oxygen consumption would worsen the demand component of angina rather than explain benefit.',
      'Direct coronary vasodilation is not the mechanism selected by this beta-blocker question.',
      'Reducing heart rate and myocardial contractility lowers cardiac workload and oxygen demand, making this the best answer. The benefit is tied to beta-receptor blockade in the heart rather than beta-2 receptor stimulation. It is not framed here as direct coronary-artery vasodilation.',
      'Beta blockers inhibit rather than stimulate beta receptors, and beta-2 stimulation is not the stated antianginal mechanism.',
    ],
  },
  {
    ref: 'Q03', page: 1, canonical: 'nonselective-beta-blocker-asthma-harm', conceptType: 'contraindication',
    stem: 'Which of the following patients is most likely to be harmed by non-selective beta-blockers?',
    options: ['A patient with stable angina', 'A patient with essential hypertension', 'A patient with asthma', 'A patient with migraine headaches'], key: 'C',
    definition: 'Non-selective beta blockers can harm a patient with asthma.',
    objective: 'Recognise asthma as the highest-risk condition in the presented non-selective beta-blocker comparison.',
    pitfall: 'Missing the respiratory risk of non-selective beta blockade when other listed conditions are therapeutic contexts for the class.',
    explanations: [
      'Stable angina is a recognised therapeutic context for beta blockers and is not the highest-risk option presented.',
      'Essential hypertension is a therapeutic context for beta blockers and is not the highest-risk option presented.',
      'Asthma is the best answer because non-selective beta blockade can oppose beta-2-mediated bronchodilation and worsen bronchospasm. The risk follows from blocking pulmonary beta-2 receptors as well as cardiac beta-1 receptors. This distinguishes asthma from the therapeutic contexts listed in the other options.',
      'Migraine prevention can be a therapeutic use of selected beta blockers and is not the highest-risk option presented.',
    ],
  },
  {
    ref: 'Q04', page: 1, canonical: 'atenolol-beta-one-selective', conceptType: 'classification',
    stem: 'Which of the following beta-blockers is beta1-selective?',
    options: ['Propranolol', 'Nadolol', 'Atenolol', 'Timolol'], key: 'C',
    definition: 'Atenolol is a beta-1-selective beta blocker.',
    objective: 'Classify atenolol as beta-1-selective among the listed beta blockers.',
    pitfall: 'Grouping all beta blockers as equally receptor-selective or selecting a non-selective comparator.',
    explanations: [
      'Propranolol is a non-selective beta blocker and is not the beta-1-selective option.',
      'Nadolol is non-selective and is not the beta-1-selective option.',
      'Atenolol has relative selectivity for beta-1 receptors, making it the best answer among these options. This selectivity distinguishes it from propranolol, nadolol, and timolol in the comparison. Selectivity is relative and does not mean absolute receptor exclusivity.',
      'Timolol is a non-selective beta blocker and is not the beta-1-selective option.',
    ],
  },
  {
    ref: 'Q05', page: 2, canonical: 'beta-blocker-hypoglycemia-unawareness', conceptType: 'adverse_effect',
    stem: 'One of the common side effects of beta-blockers is:',
    options: ['Tachycardia', 'Hypoglycemia unawareness', 'Hyperthermia', 'Increased cardiac output'], key: 'B',
    definition: 'Beta blockers can cause hypoglycaemia unawareness.',
    objective: 'Identify hypoglycaemia unawareness as the beta-blocker adverse effect in the presented option set.',
    pitfall: 'Selecting effects that oppose beta blockade, such as tachycardia or increased cardiac output.',
    explanations: [
      'Beta blockade tends to limit adrenergic tachycardia rather than make tachycardia the characteristic answer.',
      'Beta blockers can mask adrenergic warning signs of hypoglycaemia, so hypoglycaemia unawareness is the best answer. Blunting tachycardia can make an episode less readily recognised by the patient. This is especially relevant when interpreting symptoms in someone at risk of low blood glucose.',
      'Hyperthermia is not the characteristic beta-blocker adverse effect in this comparison.',
      'Beta blockade tends to reduce rather than increase cardiac output through lower heart rate and contractility.',
    ],
  },
  {
    ref: 'Q06', page: 2, canonical: 'propranolol-performance-anxiety-cns-use', conceptType: 'therapeutic_indication',
    stem: 'A patient with performance anxiety is prescribed a beta-blocker. Which one is most likely used for its CNS effects?',
    options: ['Atenolol', 'Metoprolol', 'Bisoprolol', 'Propranolol'], key: 'D',
    definition: 'Propranolol is the beta blocker selected for CNS effects in performance anxiety.',
    objective: 'Select propranolol for the performance-anxiety scenario when CNS effects are specified.',
    pitfall: 'Choosing a beta-1-selective comparator when the stem specifically asks about CNS effects.',
    explanations: [
      'Atenolol is not the source-keyed beta blocker for CNS effects in this performance-anxiety scenario.',
      'Metoprolol is not the source-keyed beta blocker for CNS effects in this performance-anxiety scenario.',
      'Bisoprolol is not the source-keyed beta blocker for CNS effects in this performance-anxiety scenario.',
      'Propranolol is the best answer in this comparison because it is used to reduce adrenergic manifestations of performance anxiety and the stem specifies CNS effects. The other options are beta-1-selective comparators rather than the source-keyed choice. This record identifies the drug-class relationship without specifying a dose or patient-specific regimen.',
    ],
  },
  {
    ref: 'Q07', page: 2, canonical: 'beta-blocker-abrupt-withdrawal-myocardial-infarction', conceptType: 'adverse_effect',
    stem: 'Sudden withdrawal of beta-blockers after long-term use may cause:',
    options: ['Bradycardia', 'Myocardial infarction', 'Hypotension', 'Respiratory depression'], key: 'B',
    definition: 'Abrupt withdrawal after long-term beta-blocker use may cause myocardial infarction.',
    objective: 'Recognise myocardial infarction as a possible consequence of abrupt beta-blocker withdrawal after long-term use.',
    pitfall: 'Confusing rebound sympathetic risk with continued beta-blockade effects such as bradycardia or hypotension.',
    explanations: [
      'Bradycardia reflects ongoing beta blockade rather than the rebound risk highlighted by sudden withdrawal.',
      'Myocardial infarction is the best answer because abrupt withdrawal after long-term beta blockade can produce rebound adrenergic effects and myocardial ischaemic risk. The concern is a reversal of beta blockade rather than persistent bradycardia or hypotension. This is a safety recognition point, not a patient-specific discontinuation protocol.',
      'Hypotension reflects continuing haemodynamic blockade more than the rebound effect highlighted by abrupt withdrawal.',
      'Respiratory depression is not the characteristic withdrawal consequence in this comparison.',
    ],
  },
].map(spec => ({
  ...spec,
  concept: cid(spec.canonical),
  id: `Q-HU102-PHA-F256-${spec.ref}`,
  claim: `CLM-HU102-F256-${spec.ref}-01`,
  qCitation: `CIT-HU102-F256-${spec.ref}-QUESTION`,
  kCitation: `CIT-HU102-F256-${spec.ref}-KEY`,
  span: `SPN-HU102-F256-${spec.ref}-01`,
}))

for (const spec of specs) {
  if (spec.concept !== cid(spec.canonical)) throw new Error(`${spec.ref}: non-deterministic concept ID`)
  if (!spec.options[letters.indexOf(spec.key)]) throw new Error(`${spec.ref}: key ${spec.key} does not resolve`)
}
if (specs.length !== 7 || specs.map(spec => spec.key).join('') !== 'CCCCBDB') throw new Error('Family256 safe-record contract mismatch')

const sourceRow = row([
  ['id', source], ['title', 'MCQ Questions on Beta Blockers'],
  ['institution', 'Helwan BMS-102 local question collection; no institution is printed in the carrier'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - Beta_Blockers_MCQs.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '2'],
  ['sha256', 'e6a1286ae1e2087007100dfcd105ee49f9e9a479cd32ccb293ab38ad9f0e3f7e'],
  ['processing_status', 'pending'], ['rights', 'Local anonymous revision sheet held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 anonymous auxiliary revision material. Family256 contains seven explicitly keyed four-option MCQs and authors all seven as Draft. It contains no unkeyed, written, completion, matching, image, drawing, practical, or teaching-only operation. PyFPDF metadata establishes programmatic typesetting but does not establish AI authorship, institutional authority, a Helwan sitting, marks, or an official key.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Beta blockers: receptor inhibition, selected uses, and safety signals'], ['arabic_title', ''],
  ['aliases', 'Beta-blocker pharmacology\nBeta-adrenergic antagonists'], ['subject', 'pharm'], ['topic', 'General pharmacology'],
  ['subtopic', 'Adrenergic pharmacology'], ['microtopic', 'Beta blockers'], ['nanotopic', 'Mechanism, selectivity, uses and safety'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
  ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '5'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Beta blockers inhibit beta-adrenergic receptors; their receptor selectivity and central penetration help explain selected uses and safety risks.'],
  ['sections', `### Definition\nBeta blockers inhibit beta-adrenergic receptor signalling.\n\n### Mechanism\nCardiac beta blockade decreases heart rate and contractility, reducing myocardial oxygen demand in angina. Atenolol is relatively beta-1-selective, whereas propranolol is non-selective and is used when central effects are relevant.\n\n### Key determinants\n${specs.map(spec => `- ${spec.definition}`).join('\n')}\n\n### Clinical significance\nNon-selective beta blockade can worsen asthma by blocking pulmonary beta-2 receptors. Beta blockers can mask adrenergic warning signs of hypoglycaemia, and abrupt withdrawal after long-term use can create rebound ischaemic risk.\n\n### Common misconceptions\nDo not treat beta blockers as coronary vasodilators, describe beta-1 selectivity as absolute, or confuse ongoing blockade effects with rebound withdrawal risk.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', specs.map(spec => spec.definition).join('\n')],
  ['lose_the_mark', 'Calling beta blockers beta-receptor agonists.\nMissing asthma risk from non-selective beta blockade.\nMissing masked hypoglycaemia warning signs or rebound withdrawal risk.'],
  ['related_concepts', specs.map(spec => spec.concept).join('\n')], ['related_articles', ''],
  ['question_ids', specs.map(spec => spec.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pharmacology > Adrenergic pharmacology > Beta blockers > Family256'],
  ['university_notes', 'hu: Anonymous tier-9 auxiliary revision sheet with seven explicit adjacent answer lines; not an authenticated examination or official departmental key.'],
  ['annotations', specs.map(spec => `### definition_of · ${spec.concept}\nQuote: ${spec.definition}\nBlock: body`).join('\n\n')],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', specs.map(spec => `### ${spec.definition}\nClaims: ${spec.claim}\nCitations: ${spec.qCitation}, ${spec.kCitation}\nSpan: ${spec.span}`).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', specs.map(spec => spec.claim).join('\n')], ['span_ids', specs.map(spec => spec.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family256 stems, option sets, and adjacent printed Answer lines for Q1–Q7.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['conflicts', '[clear]'],
  ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 7 raw operations, 7 supplied answers, 7 safe keyed MCQ records, 0 holds, and 0 exclusions.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const conceptRow = spec => row([
  ['label', spec.definition], ['id', spec.concept], ['canonical_key', spec.canonical], ['aliases', spec.definition],
  ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', spec.definition], ['explicit_objective', spec.objective], ['pitfalls', spec.pitfall],
  ['concept_type', spec.conceptType], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', 'Adrenergic pharmacology'],
  ['microtopic', 'Beta blockers'], ['nanotopic', `Family256 ${spec.ref}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Adrenergic pharmacology > Beta blockers > Family256 > ${spec.ref}`], ['article_ids', article],
  ['related_article_ids', '[clear]'], ['related_concept_ids', specs.filter(other => other.ref !== spec.ref).map(other => other.concept).join('\n')], ['resource_ids', source],
  ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'],
  ['clinical_relevance', '0.76'], ['academic_relevance', '0.94'], ['weight_confidence', '0.38'], ['confidence', '0.70'],
  ['exam_signal', `${source} | Family256 ${spec.ref} | adjacent printed answer | anonymous tier-9 auxiliary source, not an official key`],
  ['atomic_claim_ids', spec.claim], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
  ['original_wording', `[Family256 ${spec.ref}] ${spec.stem} [printed answer ${spec.key}) ${spec.options[letters.indexOf(spec.key)]}]`],
  ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
  ['uncertainty', 'Anonymous programmatically typeset tier-9 auxiliary revision material; no visible author, institution, module, sitting, marks, or official-key approval.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'],
  ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''],
  ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
  ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from the exact Family256 objective record.\nsourceCandidateIds: Four-search reconciliation found no authored same-scope concept record; the deterministic canonical ID is established here for later family reuse.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
])

const questionRow = spec => row([
  ['id', spec.id], ['title', spec.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''],
  ['question', spec.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', spec.key],
  ...spec.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, spec.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Adrenergic pharmacology'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'],
  ['main_concept', spec.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Adrenergic pharmacology > Beta blockers > Family256 > ${spec.ref}`],
  ['clinical_relevance', '0.76'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.34'], ['exam_weight_by_year', 'HU_Y1=0.50'],
  ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', spec.objective], ['media_recommendations', ''],
  ['source_citation', `${source}, Family256 ${spec.ref}, PDF p${spec.page}: exact stem, four-option structure, and adjacent printed answer ${spec.key}. Anonymous tier-9 auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', 'Literal wording, capitalization, punctuation, option order, and printed answer are preserved. The source contains seven keyed MCQs and no unkeyed, written, image, practical, or teaching-only remainder. No author, institution, marks, sitting, official-key authority, AI authorship, or patient-specific guidance is inferred.'],
  ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])

const claimRows = specs.map(spec => row([
  ['id', spec.claim], ['concept_id', spec.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'],
  ['object', spec.options[letters.indexOf(spec.key)]], ['display_text', spec.definition], ['risk_class', 'foundational_stable'],
  ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.70'], ['freshness', 'source_created_2025-07-15'],
  ['time_sensitive', 'no'], ['qualifiers', `authority: anonymous tier-9 auxiliary revision material, not official key; occurrence: Family256 ${spec.ref}.`],
]))

const citationRows = specs.flatMap(spec => [
  row([['id', spec.qCitation], ['claim_id', spec.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${spec.stem} ${spec.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(spec.page)], ['locator_section', `Family256 ${spec.ref}`], ['locator_detail', 'Exact prompt and four-option structure'],
    ['context_note', 'Anonymous tier-9 auxiliary revision material; not an authenticated examination or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', spec.kCitation], ['claim_id', spec.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `Answer: ${spec.key}) ${spec.options[letters.indexOf(spec.key)]}`],
    ['locator_type', 'page'], ['locator_page', String(spec.page)], ['locator_section', `Family256 ${spec.ref}`], ['locator_detail', 'Adjacent explicit answer line'],
    ['context_note', 'Anonymous tier-9 auxiliary revision material; not an authenticated examination or official key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])

const spanRows = specs.map(spec => row([
  ['id', spec.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${spec.ref.toLowerCase()}`], ['text', spec.definition],
  ['claim_ids', spec.claim], ['citation_ids', `${spec.qCitation}\n${spec.kCitation}`],
]))

const mechanism = specs[0]
const relationRows = specs.slice(1).map(spec => row([
  ['source', mechanism.concept], ['type', 'related_concepts'], ['target', spec.concept], ['evidence_claim_ids', `${mechanism.claim}\n${spec.claim}`],
  ['citation_ids', `${mechanism.qCitation}\n${spec.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.68'],
  ['qualifiers', `scope: beta-receptor inhibition is related to ${spec.canonical.replaceAll('-', ' ')}`], ['reviewer', 'Medical team, Admin team'],
]))

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family256-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family256-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family256-concepts.md', rows(specs.map(conceptRow))],
  ['evidence/HU-BMS-102-pharmacology-family256-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family256-citations.md', rows(citationRows)],
  ['evidence/HU-BMS-102-pharmacology-family256-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family256-relations.md', rows(relationRows)],
  ['question/HU-BMS-102-pharmacology-family256-mcq.md', rows(specs.map(questionRow))],
])

for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}

console.log(JSON.stringify({
  family: 256, rawPrompts: 7, sourceAnswers: 7, safeRecords: 7, holds: 0, exclusions: 0,
  concepts: specs.length, articles: 1, questions: specs.length, claims: claimRows.length,
  citations: citationRows.length, spans: spanRows.length, relations: relationRows.length,
  conceptIds: Object.fromEntries(specs.map(spec => [spec.canonical, spec.concept])), emitted: [...files.keys()],
}, null, 2))
