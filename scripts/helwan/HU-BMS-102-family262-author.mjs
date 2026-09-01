import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_4cd7ec4ece48e56b712e'
const article = 'ART-HU-BMS102-PHA-F262-ABSORPTION-FIRST-PASS'
const sourcePath = process.env.HELWAN_F262_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Absorption.pdf'
const expectedSha = '4cd7ec4ece48e56b712e80a774254fe8c9cb28b9bb4ea5cd7b633747379bd30d'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCDE'
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family262 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 1_000_000 }).replaceAll('\f', '\n')
const keys = native.split('\n').map(line => line.trim()).filter(line => /^[A-D]$/.test(line))
const cleaned = native.split('\n').filter(line => {
  const value = line.trim()
  return value !== 'Questions' && value !== 'DR . El-Sawy' && !/^\d+$/.test(value) && !/^[A-D]$/.test(value)
}).join('\n')
const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\s*\./g)]
const pageFor = number => number <= 4 ? 1 : Math.floor((number - 5) / 5) + 2
const parsed = starts.map((match, index) => {
  const number = Number(match[1])
  const body = cleaned.slice(match.index + match[0].length, starts[index + 1]?.index ?? cleaned.length)
  const optionStarts = [...body.matchAll(/(?:^|\n)\s*([A-Da-d])[\).]\s*/g)]
  const stem = body.slice(0, optionStarts[0]?.index ?? body.length).replace(/\s+/g, ' ').trim()
  const options = optionStarts.map((option, optionIndex) => body
    .slice(option.index + option[0].length, optionStarts[optionIndex + 1]?.index ?? body.length)
    .replace(/\s+/g, ' ').trim())
  return { number, ref: `Q${String(number).padStart(3, '0')}`, page: pageFor(number), stem, options, key: keys[number - 1] }
})
if (parsed.length !== 49 || keys.length !== 49 || parsed.some((question, index) => question.number !== index + 1 || question.options.length !== 4 || !question.options[letters.indexOf(question.key)])) {
  throw new Error(`Family262 parse contract mismatch: ${parsed.length} questions/${keys.length} keys`)
}

const canonicals = [
  'drug-definition-chemical-molecule-interacts-body-systems',
  'pharmacodynamics-drug-effect-on-body',
  'receptor-protein-macromolecule-binds-drug',
  'ligand-molecule-combines-receptor',
  'agonist-ligand-activates-receptor',
  'antagonist-ligand-blocks-receptor',
  'affinity-receptor-ligand-relation',
  'affinity-determines-receptor-occupancy',
  'absorption-rate-order-iv-inhalation-im-sc',
  'intravenous-immediate-systemic-and-100-percent',
  'inhalation-rapid-alveolar-surface-rich-blood',
  'intramuscular-rapid-high-vascularity',
  'subcutaneous-slower-than-im-low-vascularity',
  'sublingual-nitroglycerin-avoids-git-liver-first-pass',
  'small-intestine-main-oral-absorption-site',
  'intravenous-most-rapid-route',
  'intact-skin-slowest-listed-route',
  'agonist-binds-activates-with-affinity',
  'affinity-receptor-ligand-relation',
  'richer-absorbing-surface-blood-supply-increases-absorption',
  'git-malabsorption-greatly-decreases-oral-absorption',
  'metoclopramide-prokinetic-accelerates-gastric-emptying',
  'metoclopramide-increases-paracetamol-absorption',
  'metoclopramide-decreases-digoxin-absorption',
  'atropine-inhibits-gut-motility-slows-emptying',
  'acidic-aspirin-better-absorbed-acidic-medium',
  'basic-ephedrine-amphetamine-better-absorbed-alkaline-medium',
  'empty-stomach-avoids-food-dilution',
  'shock-reduces-sc-perfusion-by-sympathetic-vasoconstriction',
  'morphine-iv-in-shock-because-sc-absorption-unreliable',
  'intrinsic-factor-required-vitamin-b12-absorption',
  'first-pass-effect-pre-systemic-metabolism-synonym',
  'benzyl-penicillin-iv-avoids-gastric-acid-destruction',
  'oral-insulin-destroyed-digestive-enzymes',
  'chlorpromazine-gut-mucosal-metabolism',
  'hepatic-first-pass-generally-more-important-than-gut',
  'propranolol-large-hepatic-first-pass',
  'lidocaine-near-complete-hepatic-metabolism',
  'atenolol-nadolol-hydrophilic-minimal-hepatic-metabolism',
  'first-pass-avoidance-increase-dose-or-change-route',
  'propranolol-nitroglycerin-higher-oral-dose-overcomes-first-pass',
  'benzyl-penicillin-iv-avoids-gastric-acid-destruction',
  'sublingual-nitroglycerin-avoids-git-liver-first-pass',
  'high-fat-meal-not-first-pass-avoidance',
  'empty-stomach-avoids-food-dilution',
  'slowed-gut-motility-decreases-rapid-drug-absorption',
  'acidic-aspirin-better-absorbed-acidic-medium',
  'intrinsic-factor-required-vitamin-b12-absorption',
  'lipophilic-extensive-liver-metabolism-is-hepatic-first-pass',
]

const definitions = [
  'A drug is a chemical molecule that can interact with body systems and produce an effect.',
  'Pharmacodynamics describes the effects of a drug on the body.',
  'A receptor is a protein macromolecule that can bind a drug.',
  'A ligand is a molecule that can combine with a receptor.',
  'A ligand that activates a receptor is an agonist.',
  'A ligand that blocks receptor activation is an antagonist.',
  'Affinity describes the attraction or binding relationship between a receptor and a ligand.',
  'Affinity influences the proportion of receptors occupied by a drug at a given concentration.',
  'Among the listed routes, the absorption-speed order is intravenous, inhalational, intramuscular, then subcutaneous.',
  'Intravenous administration provides immediate systemic delivery and complete bioavailability.',
  'Inhaled lipid-soluble drugs can be absorbed rapidly because alveoli provide a large surface area and rich blood supply.',
  'Intramuscular absorption is rapid when skeletal muscle has high vascularity.',
  'Subcutaneous absorption is generally slower than intramuscular absorption because subcutaneous tissue is less vascular.',
  'Sublingual nitroglycerin reaches systemic circulation rapidly while avoiding gastrointestinal and hepatic first-pass exposure.',
  'The small intestine is the principal absorption site for most orally administered drugs.',
  'Intravenous administration is the most rapid listed route of drug delivery.',
  'Absorption through intact skin is slower than the other listed routes.',
  'An agonist has affinity for a receptor and activates it.',
  'Affinity describes the relationship between a receptor and its ligand.',
  'A richer blood supply to an absorbing surface generally increases drug absorption.',
  'Gastrointestinal malabsorption can greatly decrease oral drug absorption.',
  'Metoclopramide is a prokinetic drug that accelerates gastric emptying by increasing gut motility.',
  'Metoclopramide can increase absorption of a rapidly disintegrating drug such as paracetamol.',
  'Metoclopramide can decrease absorption of a slowly disintegrating drug such as digoxin.',
  'Atropine inhibits gut motility and slows gastric emptying.',
  'An acidic drug such as aspirin is better absorbed in an acidic medium than in an alkaline medium.',
  'Basic drugs such as ephedrine and amphetamine are better absorbed in an alkaline medium.',
  'Giving a drug on an empty stomach can reduce dilution by food.',
  'Shock can reduce subcutaneous perfusion through diminished tissue flow and sympathetic vasoconstriction.',
  'Intravenous morphine avoids unreliable subcutaneous absorption during shock.',
  'Intrinsic factor from gastric parietal cells is required for vitamin B12 absorption.',
  'The first-pass effect is also called first-pass metabolism or presystemic metabolism.',
  'Benzyl penicillin is given parenterally to avoid destruction by gastric acid.',
  'Oral insulin is ineffective because digestive enzymes degrade the peptide.',
  'Chlorpromazine can undergo metabolism in the gut mucosa.',
  'Hepatic first-pass metabolism is generally more important than gut-wall first-pass metabolism.',
  'Propranolol undergoes substantial hepatic first-pass metabolism.',
  'Lidocaine undergoes near-complete hepatic metabolism and therefore is not used orally for systemic effect.',
  'Atenolol and nadolol are relatively hydrophilic and undergo little hepatic metabolism.',
  'First-pass exposure can be reduced by changing route or sometimes overcome by increasing the administered dose.',
  'Higher oral doses may compensate for first-pass loss of propranolol or oral nitroglycerin formulations.',
  'Benzyl penicillin is administered intravenously to avoid gastric-acid destruction.',
  'Sublingual nitroglycerin bypasses first-pass metabolism.',
  'A high-fat meal is not a route-based method for avoiding first-pass metabolism.',
  'Administering a drug on an empty stomach can avoid dilution by food.',
  'Slowing gut motility and gastric emptying can decrease the absorption rate of a rapidly absorbed drug.',
  'Acidic drugs are preferentially absorbed in an acidic medium when other determinants are comparable.',
  'Vitamin B12 absorption is a specific-factor example because it requires intrinsic factor.',
  'Extensive hepatic metabolism of a lipophilic drug before systemic entry is a hepatic first-pass effect.',
]
if (canonicals.length !== 49 || definitions.length !== 49) throw new Error('Family262 semantic registry length mismatch')
const replayOf = new Map([[19, 7], [43, 14], [47, 26], [45, 28], [48, 31], [42, 33]])
const uniqueNumbers = parsed.filter(question => !replayOf.has(question.number)).map(question => question.number)
const conceptSpecs = uniqueNumbers.map(number => {
  const question = parsed[number - 1]
  return { ...question, canonical: canonicals[number - 1], definition: definitions[number - 1], concept: cid(canonicals[number - 1]) }
})
if (conceptSpecs.length !== 43 || new Set(conceptSpecs.map(spec => spec.canonical)).size !== 43) throw new Error('Family262 handle collapse mismatch')
const conceptByNumber = new Map(conceptSpecs.map(spec => [spec.number, spec]))
const questions = parsed.map(question => {
  const baseNumber = replayOf.get(question.number) ?? question.number
  const base = conceptByNumber.get(baseNumber)
  const correctIndex = letters.indexOf(question.key)
  return {
    ...question, concept: base.concept, canonical: base.canonical, definition: base.definition,
    explanations: question.options.map((option, index) => index === correctIndex
      ? `${base.definition} This makes option ${question.key} the best answer to the stem as written. The other options describe different or incompatible pharmacological relationships.`
      : `This option does not match the pharmacological relationship tested here. ${base.definition}`),
    id: `Q-HU102-PHA-F262-${question.ref}`, claim: `CLM-HU102-F262-${question.ref}-01`,
    qCitation: `CIT-HU102-F262-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F262-${question.ref}-KEY`, span: `SPN-HU102-F262-${question.ref}-01`,
    replayOf: replayOf.get(question.number),
  }
})

const sourceRow = row([
  ['id', source], ['title', 'MCQ Absorption'], ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible credit DR . El-Sawy'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Absorption.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '10'], ['sha256', expectedSha], ['processing_status', 'pending'],
  ['rights', 'Local instructor-attributed revision bank held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to DR . El-Sawy. Family262 authors all 49 four-option MCQs with their aligned printed answer letters. Six semantic replays remain distinct source occurrences but reuse earlier concept IDs. No official Helwan exam, department key, authenticated sitting, candidate response, practical authority, or academic-year inference is made. Metadata author Hossam mohammed conflicts with the visible credit and is not treated as content authority.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Drug absorption, administration routes, and first-pass metabolism'], ['arabic_title', ''],
  ['aliases', 'Absorption and first-pass pharmacology\nRoute-dependent drug absorption'], ['subject', 'pharm'], ['topic', 'General pharmacology'],
  ['subtopic', 'Pharmacokinetics'], ['microtopic', 'Absorption and first-pass metabolism'], ['nanotopic', 'Family262 Dr El-Sawy revision'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
  ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '10'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Drug absorption depends on route, surface area, perfusion, gastrointestinal conditions, physicochemical properties, and presystemic metabolism.'],
  ['sections', `### Definition\nAbsorption is the movement of a drug from its administration site into the systemic circulation.\n\n### Mechanism\nRoute, membrane permeability, surface area, blood supply, gastrointestinal motility, pH, food, and specific transport requirements influence absorption. Gut-wall and hepatic metabolism before systemic entry produce first-pass loss.\n\n### Key determinants\n${conceptSpecs.map(spec => `- ${spec.definition}`).join('\n')}\n\n### Clinical significance\nChanging route, formulation, timing, or dose can alter systemic exposure, while shock and gastrointestinal disease can make absorption unreliable.\n\n### Common misconceptions\nDo not confuse affinity with efficacy, assume all routes undergo first-pass metabolism, or ignore perfusion and gastric-emptying effects on absorption.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', conceptSpecs.map(spec => spec.definition).join('\n')],
  ['lose_the_mark', 'Confusing the drug-on-body definition of pharmacodynamics.\nMissing the small intestine as the principal oral absorption site.\nCalling a high-fat meal a route for avoiding first-pass metabolism.'],
  ['related_concepts', conceptSpecs.map(spec => spec.concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pharmacology > Pharmacokinetics > Absorption and first pass > Family262'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or department approval appears on the pages.'],
  ['annotations', conceptSpecs.map(spec => `### definition_of · ${spec.concept}\nQuote: ${spec.definition}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', conceptSpecs.map(spec => {
    const occurrences = questions.filter(question => question.concept === spec.concept)
    return `### ${spec.definition}\nClaims: ${occurrences.map(question => question.claim).join(', ')}\nCitations: ${occurrences.flatMap(question => [question.qCitation, question.kCitation]).join(', ')}\nSpan: ${occurrences.map(question => question.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family262 Q1–Q49 stems, option sets, and visibly aligned answer letters.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 49 raw prompts, 49 supplied answer letters, 49 safe traceable Draft records, 0 holds, 0 exclusions, and 6 semantic replays linked to 43 source-distinct concepts.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const claimsByConcept = new Map()
for (const question of questions) claimsByConcept.set(question.concept, [...(claimsByConcept.get(question.concept) ?? []), question.claim])
const conceptRow = spec => {
  const occurrences = questions.filter(question => question.concept === spec.concept)
  return row([
    ['label', spec.definition], ['id', spec.concept], ['canonical_key', spec.canonical], ['aliases', spec.definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'],
    ['definition', spec.definition], ['explicit_objective', `Apply this pharmacology relationship: ${spec.definition}`], ['pitfalls', `Selecting a distractor that conflicts with this relationship: ${spec.definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', spec.number <= 19 ? 'Foundations and administration routes' : 'Absorption and first-pass metabolism'],
    ['nanotopic', `Family262 ${spec.ref}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'],
    ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family262 > ${spec.ref}`], ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'],
    ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'],
    ['clinical_relevance', '0.73'], ['academic_relevance', '0.95'], ['weight_confidence', '0.40'], ['confidence', '0.72'],
    ['exam_signal', occurrences.map(question => `${source} | Family262 ${question.ref} | aligned printed answer ${question.key} | instructor-attributed auxiliary source, not an official key`).join('\n')],
    ['atomic_claim_ids', claimsByConcept.get(spec.concept).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', occurrences.map(question => `[Family262 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'],
    ['conflicts', '[clear]'], ['uncertainty', 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. Semantic reconciliation reports 15 prior-governed scopes and 28 new scopes; deterministic full records are emitted because no exact same-key authored object was found.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family262 objective records.\nsourceCandidateIds: Four-search reconciliation found no authored same-key rival record; deterministic IDs are established for later reuse.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', question.replayOf ? `Q-HU102-PHA-F262-Q${String(question.replayOf).padStart(3, '0')}` : ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept],
  ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family262 > ${question.ref}`], ['clinical_relevance', '0.73'], ['academic_relevance', '0.95'],
  ['cognitive_effort_score', '0.36'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'],
  ['cognitive_effort', 'Low'], ['setting', 'Academic'], ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'],
  ['library_ids', article], ['resource_ids', source], ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family262 ${question.ref}, PDF p${question.page}: exact stem, four options, and aligned printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `Literal stem, option order, and aligned printed answer are preserved from the native PDF. ${question.replayOf ? `Same-source semantic replay of Q${question.replayOf}; the occurrence remains distinct and reuses its concept ID.` : 'Source-distinct handle.'} No official exam, official key, year, sitting, marks, candidate response, practical authority, or patient-specific guidance is inferred.`],
  ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])

const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.72'],
  ['freshness', 'source_created_2026-03-05'], ['time_sensitive', 'no'], ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key; occurrence: Family262 ${question.ref};${question.replayOf ? ` semantic replay of Q${question.replayOf};` : ''}`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family262 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'], ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Aligned answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family262 ${question.ref}`], ['locator_detail', 'Visibly aligned right-margin answer letter'], ['context_note', 'Source-supplied instructor-bank answer; not an official department key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition], ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`]]))
const relationPairs = [[1, 2], [3, 4], [3, 5], [3, 6], [7, 8], [9, 10], [9, 11], [9, 12], [9, 13], [14, 40], [15, 21], [20, 29], [22, 23], [22, 24], [32, 36], [36, 37], [36, 38], [36, 39]]
const relationRows = relationPairs.map(([fromNumber, toNumber]) => {
  const from = conceptByNumber.get(fromNumber)
  const to = conceptByNumber.get(toNumber)
  const fromQuestion = questions[fromNumber - 1]
  const toQuestion = questions[toNumber - 1]
  return row([['source', from.concept], ['type', 'related_concepts'], ['target', to.concept], ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`], ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.68'], ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`], ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family262-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family262-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family262-concepts.md', rows(conceptSpecs.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family262-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family262-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family262-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family262-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family262-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 262, rawPrompts: 49, sourceAnswers: 49, safeRecords: 49, holds: 0, exclusions: 0, formats: { mcq: 49 }, acceptedHandles: 43,
  semanticReplays: 6, semanticPriorReuses: 15, semanticConceptDelta: 28, emittedConceptRecords: conceptSpecs.length,
  articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length, spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
