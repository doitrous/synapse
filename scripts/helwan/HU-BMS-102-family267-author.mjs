import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_c0a94a4717d5f478b235'
const article = 'ART-HU-BMS102-PHA-F267-PKA-DISTRIBUTION'
const sourcePath = process.env.HELWAN_F267_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ PKa & Distribution.pdf'
const expectedSha = 'c0a94a4717d5f478b23567e51883c12d1f6394ffafeb6f02cbc2404dc80788e3'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCD'
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family267 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 1_000_000 }).replaceAll('\f', '\n')
const secondStart = native.indexOf('1) What organ')
if (secondStart < 0) throw new Error('Family267 section boundary not found')
const aPage = number => number <= 4 ? 1 : number <= 9 ? 2 : number <= 14 ? 3 : number <= 18 ? 4 : 5
const bPage = number => number <= 4 ? 6 : number <= 8 ? 7 : number <= 12 ? 8 : number <= 17 ? 9 : number <= 21 ? 10 : 11
const parseSection = (text, section, pageFor) => {
  const cleaned = text.split('\n').filter(line => {
    const value = line.trim()
    return !['Pharmacology', 'MCQ', 'DR . El-Sawy'].includes(value) && !/^\d+$/.test(value)
  }).join('\n')
  const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\s*[.)]\s*/g)]
  return starts.map((match, index) => {
    const number = Number(match[1])
    const rawBody = cleaned.slice(match.index + match[0].length, starts[index + 1]?.index ?? cleaned.length)
    const standaloneKeys = rawBody.split('\n').map(line => line.trim()).filter(line => /^[A-D]$/.test(line))
    const body = rawBody.split('\n').filter(line => !/^[A-D]$/.test(line.trim())).join('\n')
    const optionStarts = [...body.matchAll(/(?:^|\n)\s*([A-Da-d])[.)]\s*/g)]
    const stem = body.slice(0, optionStarts[0]?.index ?? body.length).replace(/\s+/g, ' ').trim()
    const options = optionStarts.map((option, optionIndex) => body
      .slice(option.index + option[0].length, optionStarts[optionIndex + 1]?.index ?? body.length)
      .replace(/\s+/g, ' ').trim())
    return { section, number, ref: `${section}Q${String(number).padStart(3, '0')}`, page: pageFor(number), stem, options, key: standaloneKeys[0] }
  })
}
const parsed = [...parseSection(native.slice(0, secondStart), 'A', aPage), ...parseSection(native.slice(secondStart), 'B', bPage)]
if (parsed.length !== 45 || parsed.filter(q => q.section === 'A').length !== 22 || parsed.filter(q => q.section === 'B').length !== 23) {
  throw new Error(`Family267 prompt boundary mismatch: ${parsed.length}`)
}
const byRef = new Map(parsed.map(question => [question.ref, question]))
const holds = new Map([
  ['AQ001', 'three-option MCQ; current importer requires four or five options and no option may be invented'],
  ['BQ003', 'graph-dependent oral-versus-IV AUC MCQ; required graph is not rights-cleared for redistribution or attached import'],
])
for (const question of parsed) {
  if (holds.has(question.ref)) continue
  if (question.options.length !== 4 || !question.options[letters.indexOf(question.key)]) {
    throw new Error(`${question.ref}: ${question.options.length} options; key ${question.key}`)
  }
}

const baseData = [
  ['AQ002', 'acidic-drug-toxicity-treat-with-base', 'The source keys treatment of acidic-drug toxicity to administration of a basic substance.'],
  ['AQ003', 'high-pka-weak-base-least-stomach-absorption', 'Among the listed compounds, a high-pKa weak base is least absorbed from the acidic stomach.'],
  ['AQ004', 'acidic-overdose-gastric-lavage-sodium-bicarbonate', 'The source keys sodium bicarbonate as the gastric-lavage fluid for an acidic-drug overdose.'],
  ['AQ005', 'ionized-lipid-insoluble-cannot-cross-cell-membrane', 'Ionised or lipid-insoluble drugs have poor passage across cell membranes.'],
  ['AQ006', 'pka-determines-ionization-and-absorption', 'Drug pKa influences ionisation and therefore affects absorption.'],
  ['AQ007', 'weak-acid-less-ionized-acidic-medium', 'A weak acid is less ionised in an acidic medium.'],
  ['AQ008', 'weak-base-less-ionized-basic-medium', 'A weak base is less ionised in a basic medium.'],
  ['AQ009', 'bbb-crossing-requires-lipid-solubility', 'Passage across the blood-brain barrier generally requires sufficient lipid solubility.'],
  ['AQ010', 'lipid-solubility-increases-drug-absorption', 'Greater lipid solubility generally increases passive drug absorption.'],
  ['AQ011', 'aspirin-nonionized-in-stomach', 'Aspirin is predominantly non-ionised in the acidic stomach.'],
  ['AQ013', 'lower-urine-ph-increases-weak-base-excretion', 'Lower urinary pH increases ion trapping and urinary excretion of a weak base.'],
  ['AQ014', 'hydrophilic-drug-low-membrane-penetration', 'A hydrophilic drug has a low ability to penetrate cell-membrane lipids.'],
  ['AQ015', 'urine-acidification-high-pka-weak-base-excretion', 'Urine acidification most strongly accelerates excretion of a weak base with a relatively high pKa.'],
  ['AQ016', 'weak-acid-alkaline-weak-base-acidic-urine-excretion', 'Weak acids are excreted faster in alkaline urine, whereas weak bases are excreted faster in acidic urine.'],
  ['AQ017', 'higher-ph-decreases-weak-acid-absorption', 'Increasing pH increases ionisation of a weak acid and can decrease its absorption.'],
  ['AQ018', 'amphetamine-ion-trapping-in-breast-milk', 'The weak base amphetamine can become ionised and trapped in relatively acidic breast milk.'],
  ['AQ019', 'bicarbonate-alkalinization-increases-weak-acid-excretion', 'Sodium bicarbonate alkalinises urine and increases urinary excretion of weak acidic drugs such as aspirin and barbiturates.'],
  ['AQ022', 'intravenous-bioavailability-100-percent', 'Intravenous administration provides one-hundred-percent bioavailability.'],
  ['BQ001', 'liver-first-pass-organ', 'The liver is the principal organ responsible for the hepatic first-pass effect.'],
  ['BQ002', 'oral-route-most-first-pass', 'Oral administration is the listed route most likely to subject a drug to first-pass metabolism.'],
  ['BQ004', 'volume-distribution-requires-plasma-concentration', 'Calculating apparent volume of distribution requires the drug concentration in plasma.'],
  ['BQ005', 'loading-dose-achieves-steady-state-quickly', 'A loading dose is used to achieve the target or steady-state concentration rapidly.'],
  ['BQ006', 'loading-dose-governed-by-volume-distribution', 'Loading dose is governed principally by apparent volume of distribution for a specified target concentration and bioavailability.'],
  ['BQ007', 'total-body-water-loading-dose-calculation', 'For a 70 kg patient with distribution through total body water, a 5 mg/L initial level requires a source-keyed dose of 210 mg.'],
  ['BQ008', 'volume-distribution-dose-over-plasma-concentration', 'Apparent volume of distribution is calculated as drug amount in the body divided by plasma concentration.'],
  ['BQ009', 'hypoalbuminemia-increases-free-drug-toxicity', 'Severe hypoalbuminaemia can increase the free fraction and toxic response to an extensively protein-bound drug.'],
  ['BQ010', 'teaching.pharma.protein-binding.albumin-site-competition', 'Highly albumin-bound drugs can compete with other drugs for albumin-binding sites.'],
  ['BQ011', 'warfarin-aspirin-displacement-increases-toxicity', 'Aspirin can displace highly protein-bound warfarin and increase the risk of an excessive or toxic response.'],
  ['BQ012', 'local-anesthetic-blocks-voltage-sodium-channels', 'Local anaesthetics block voltage-dependent sodium channels in nerve fibres.'],
  ['BQ013', 'volume-of-distribution-apparent-volume-definition', 'Apparent volume of distribution is the hypothetical volume into which a drug appears to distribute at equilibrium.'],
  ['BQ014', 'albumin-main-plasma-drug-binding-protein', 'Albumin is the most important plasma protein for binding many drugs.'],
  ['BQ015', 'teaching.pharma.bioavailability-is-the-fraction-of-an-administered-dose-that-reaches-the-systemic-circulation', 'Bioavailability is the fraction of an administered dose that reaches the systemic circulation.'],
  ['BQ016', 'bioavailability-reference-route-intravenous', 'Bioavailability by a given route is assessed relative to intravenous administration.'],
  ['BQ022', 'liver-damage-affects-bioavailability', 'Liver damage may alter a drug’s bioavailability, particularly when hepatic first-pass metabolism is important.'],
]
if (baseData.length !== 34) throw new Error(`Family267 base registry mismatch: ${baseData.length}`)
const baseByRef = new Map(baseData.map(([ref, canonical, definition]) => [ref, { ref, canonical, definition, concept: cid(canonical), ...byRef.get(ref) }]))
const replayOf = new Map([
  ['AQ012', 'AQ003'], ['AQ020', 'AQ013'], ['AQ021', 'AQ015'], ['BQ020', 'AQ022'],
  ['BQ017', 'BQ004'], ['BQ018', 'BQ008'], ['BQ019', 'BQ009'], ['BQ021', 'BQ010'], ['BQ023', 'BQ015'],
])
const safeParsed = parsed.filter(question => !holds.has(question.ref))
const questions = safeParsed.map(question => {
  const base = baseByRef.get(replayOf.get(question.ref) ?? question.ref)
  if (!base) throw new Error(`${question.ref}: no concept mapping`)
  const correctIndex = letters.indexOf(question.key)
  const importOptions = question.options.map((option, index) => question.ref === 'AQ009' && index === 1 ? 'Positive (+ve) charged.' : option)
  return {
    ...question, sourceOptions: question.options, options: importOptions, concept: base.concept, canonical: base.canonical, definition: base.definition,
    explanations: question.options.map((option, index) => index === correctIndex
      ? `${base.definition} Applied to this exact source wording and any stated values, this makes option ${question.key} the keyed answer. The remaining choices describe a different ionisation, distribution, binding, or bioavailability relationship.`
      : `This choice does not match the pharmacokinetic relationship tested by the source item. ${base.definition} The source’s printed key therefore points to option ${question.key}.`),
    id: `Q-HU102-PHA-F267-${question.ref}`, claim: `CLM-HU102-F267-${question.ref}-01`,
    qCitation: `CIT-HU102-F267-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F267-${question.ref}-KEY`,
    span: `SPN-HU102-F267-${question.ref}-01`, replayOf: replayOf.get(question.ref),
  }
})
if (questions.length !== 43 || new Set(questions.map(question => question.concept)).size !== 34) throw new Error('Family267 safe-collapse mismatch')

const sourceRow = row([
  ['id', source], ['title', 'MCQ on pKa and distribution'], ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible Dr El-Sawy credit'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ PKa & Distribution.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '11'], ['sha256', expectedSha], ['processing_status', 'pending'],
  ['rights', 'Local instructor-attributed revision bank held for internal authoring only; the embedded oral-versus-IV graph is not rights-cleared for redistribution.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to Dr El-Sawy. Family267 contains 45 keyed objective occurrences across two numbering sequences. This batch authors 43 importer-valid text MCQs. A-Q1 is held because it has only three printed options, and B-Q3 is held because its oral-versus-IV AUC operation depends on a graph that is not rights-cleared. No option, media authority, key, year, or sitting is invented.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Drug ionisation, distribution, protein binding, and bioavailability'], ['arabic_title', ''],
  ['aliases', 'pKa and drug distribution\nBioavailability and plasma-protein binding'], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'],
  ['microtopic', 'Ionisation and distribution'], ['nanotopic', 'Family267 Dr El-Sawy bank'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
  ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '11'],
  ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Drug pKa and environmental pH influence ionisation, membrane passage, absorption, tissue distribution, renal ion trapping, protein binding, and systemic bioavailability.'],
  ['sections', `### Definition\nIonisation describes the charged fraction of a drug at a given pH, while distribution describes reversible drug movement between plasma and tissues.\n\n### Mechanism\nThe relation between pKa and pH affects lipid-membrane passage and ion trapping. Protein binding, apparent distribution volume, first-pass metabolism, and route determine systemic exposure.\n\n### Key determinants\n${baseData.map(([, , definition]) => `- ${definition}`).join('\n')}\n\n### Clinical significance\nUrine pH, plasma albumin, loading dose, and route can materially change drug concentration, toxicity, and bioavailability.\n\n### Common misconceptions\nDo not invent a missing fourth choice, detach a graph-dependent operation from its graph, or infer official authority from an instructor-attributed bank.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', baseData.map(([, , definition]) => definition).join('\n')],
  ['lose_the_mark', 'Confusing ionised with lipid-soluble drug.\nTreating apparent volume of distribution as a real anatomical volume.\nAuthoring held A-Q1 or B-Q3 without a valid option/media contract.'],
  ['related_concepts', baseData.map(([ref]) => baseByRef.get(ref).concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pharmacology > Pharmacokinetics > Ionisation and distribution > Family267'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or departmental approval appears on the pages.'],
  ['annotations', baseData.map(([ref, , definition]) => `### definition_of · ${baseByRef.get(ref).concept}\nQuote: ${definition}\nBlock: body`).join('\n\n')],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', baseData.map(([ref, , definition]) => {
    const concept = baseByRef.get(ref).concept
    const occurrences = questions.filter(question => question.concept === concept)
    return `### ${definition}\nClaims: ${occurrences.map(question => question.claim).join(', ')}\nCitations: ${occurrences.flatMap(question => [question.qCitation, question.kCitation]).join(', ')}\nSpan: ${occurrences.map(question => question.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family267 importer-valid text stems, four-option sets, and printed answer letters; held schema/media operations remain provenance-only.'],
  ['evidence_gaps', 'Independent medical verification, named Helwan pharmacology faculty review, and rights-cleared graph media remain required.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 45 raw prompts, 45 supplied answers, 43 safe traceable Draft records, 2 holds, 0 authority exclusions, and nine safe same-source replays linked to 34 authored concepts. Holds: A-Q1 three-option schema and B-Q3 graph dependency.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared graph is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const claimsByConcept = new Map()
for (const question of questions) claimsByConcept.set(question.concept, [...(claimsByConcept.get(question.concept) ?? []), question.claim])
const conceptRow = ([ref, canonical, definition]) => {
  const base = baseByRef.get(ref)
  const occurrences = questions.filter(question => question.concept === base.concept)
  const heldReplay = ref === 'AQ019'
  const exactReuse = ref === 'BQ010' || ref === 'BQ015'
  return row([
    ['label', definition], ['id', base.concept], ['canonical_key', canonical], ['aliases', definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', definition],
    ['explicit_objective', `Apply this pharmacokinetic relationship: ${definition}`], ['pitfalls', `Selecting a distractor that conflicts with this relationship: ${definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', ref.startsWith('A') ? 'pKa, ionisation, and membrane passage' : 'Distribution, binding, and bioavailability'], ['nanotopic', `Family267 ${ref}`],
    ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family267 > ${ref}`],
    ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
    ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['clinical_relevance', '0.76'], ['academic_relevance', '0.97'], ['weight_confidence', '0.39'], ['confidence', '0.70'],
    ['exam_signal', `${occurrences.map(question => `${source} | Family267 ${question.ref} | printed answer ${question.key} | instructor-attributed auxiliary source`).join('\n')}${heldReplay ? `\n${source} | Family267 AQ001 | held three-option occurrence | printed answer A | not authored` : ''}`],
    ['atomic_claim_ids', claimsByConcept.get(base.concept).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', `${occurrences.map(question => `[Family267 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')}${heldReplay ? '\n[Family267 AQ001 held] The rate of urinary excretion of acidic drug such as aspirin and barbiturates is increased by: [three options; printed key A]' : ''}`],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
    ['uncertainty', exactReuse
      ? 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. This occurrence reuses an already governed exact Family223/257 concept ID and canonical key.'
      : 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. Semantic reconciliation reports 33 prior-governed safe scopes and one new safe scope; this deterministic full record is emitted because no exact same-key authored object exists.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', `arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Embedded source graph is not rights-cleared.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family267 keyed text records.\nsourceCandidateIds: ${exactReuse ? 'Exact governed Family223/257 concept ID and key are reused.' : 'Four-search reconciliation found no authored same-key rival record; deterministic IDs are established for later reuse.'}\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.`],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', question.replayOf ? `Q-HU102-PHA-F267-${question.replayOf}` : ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept], ['module', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacokinetics > Family267 > ${question.ref}`], ['clinical_relevance', '0.76'], ['academic_relevance', '0.97'], ['cognitive_effort_score', '0.40'],
  ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Medium'], ['setting', 'Academic'],
  ['reasoning_level', '2'], ['inferred_difficulty', '66'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family267 ${question.ref}, PDF p${question.page}: exact text stem, options, and printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `Literal stem, option order, spelling, and printed answer are preserved.${question.ref === 'AQ009' ? ' Source distractor “+ve charged.” is rendered as “Positive (+ve) charged.” solely because a leading plus is an importer append directive; the exact source text remains in the linked citation.' : ''} ${question.replayOf ? `Same-source semantic replay of ${question.replayOf}; this occurrence reuses its concept ID.` : 'Source-distinct safe text handle.'} Two other operations remain held: AQ001 has only three printed options and BQ003 depends on an uncleared AUC graph. No option, graph, official exam, official key, year, sitting, marks, candidate response, or practical authority is inferred.`],
  ['estimated_seconds', '70'], ['randomise_answers', 'yes'],
])
const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.70'],
  ['freshness', 'source_created_2026-04-20'], ['time_sensitive', 'no'], ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key; occurrence: Family267 ${question.ref};${question.replayOf ? ` semantic replay of ${question.replayOf};` : ''}`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.stem} ${question.sourceOptions.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family267 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'],
    ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Printed answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family267 ${question.ref}`], ['locator_detail', 'Visibly aligned answer token'],
    ['context_note', 'Source-supplied instructor-bank answer; not an official department key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([
  ['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition], ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`],
]))
const relationPairs = [
  ['AQ002', 'AQ004'], ['AQ003', 'AQ007'], ['AQ003', 'AQ008'], ['AQ005', 'AQ009'], ['AQ005', 'AQ014'], ['AQ006', 'AQ007'], ['AQ006', 'AQ008'], ['AQ007', 'AQ011'],
  ['AQ013', 'AQ015'], ['AQ013', 'AQ016'], ['AQ015', 'AQ018'], ['AQ016', 'AQ019'], ['AQ022', 'BQ016'], ['BQ001', 'BQ002'], ['BQ001', 'BQ022'], ['BQ004', 'BQ008'],
  ['BQ004', 'BQ013'], ['BQ005', 'BQ006'], ['BQ006', 'BQ008'], ['BQ009', 'BQ010'], ['BQ009', 'BQ011'], ['BQ010', 'BQ014'], ['BQ015', 'BQ016'], ['BQ015', 'BQ022'],
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
  ['evidence/HU-BMS-102-pharmacology-family267-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family267-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family267-concepts.md', rows(baseData.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family267-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family267-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family267-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family267-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family267-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 267, rawPrompts: 45, sourceAnswers: 45, safeRecords: 43,
  holds: { importerSchema: 1, graphMedia: 1, total: 2 }, exclusions: 0,
  sourceFormats: { mcq: 45 }, authoredFormats: { mcq: 43 }, sourceAcceptedHandles: 35, authoredHandles: 34, semanticReplays: 9,
  semanticPriorReuses: 33, semanticConceptDelta: 1, exactPriorIdReuses: 2, emittedConceptRecords: baseData.length, conflicts: 0,
  articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length,
  spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
