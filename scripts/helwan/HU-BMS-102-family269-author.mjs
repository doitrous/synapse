import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_016866b6af044415ee1a'
const article = 'ART-HU-BMS102-PHA-F269-POSOLOGY'
const sourcePath = process.env.HELWAN_F269_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Posology.pdf'
const expectedSha = '016866b6af044415ee1a1751fd260aae32cf8bf8c7c2eb789b48f05b25714b10'
const letters = 'ABCD'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family269 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 1_000_000 }).replaceAll('\f', '\n')
const cleaned = native.split('\n').filter(line => {
  const value = line.trim()
  return !['Pharma', 'MCQs', 'DR ELSAWY'].includes(value) && !/^\d+ of 10$/.test(value)
}).join('\n')
const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\.\s*/g)]
const parsed = starts.map((match, index) => {
  const number = Number(match[1])
  const raw = cleaned.slice(match.index + match[0].length, starts[index + 1]?.index ?? cleaned.length)
  const keys = raw.split('\n').map(line => line.trim()).filter(line => /^[A-D]$/.test(line))
  const body = raw.split('\n').filter(line => !/^[A-D]$/.test(line.trim())).join('\n')
  const optionStarts = [...body.matchAll(/(?:^|\n)\s*([A-D])\)\s*/g)]
  const stem = body.slice(0, optionStarts[0]?.index ?? body.length).replace(/\s+/g, ' ').trim()
  const options = optionStarts.map((option, optionIndex) => body
    .slice(option.index + option[0].length, optionStarts[optionIndex + 1]?.index ?? body.length)
    .replace(/\s+/g, ' ').trim())
  return { number, ref: `Q${String(number).padStart(3, '0')}`, page: Math.floor((number - 1) / 5) + 1, stem, options, key: keys[0] }
})
if (parsed.length !== 50 || parsed.some((question, index) => question.number !== index + 1
  || question.options.length !== 4 || !question.options[letters.indexOf(question.key)])) {
  throw new Error(`Family269 parse contract mismatch: ${JSON.stringify(parsed.map(q => [q.ref, q.options.length, q.key]))}`)
}
const expectedKeys = 'CBBCCBCBCBBABCCBBBBBACBBBBBBCABCCBCBABBCCDBBCCBBBB'
if (parsed.map(question => question.key).join('') !== expectedKeys) throw new Error(`Family269 printed-key sequence mismatch: ${parsed.map(question => question.key).join('')}`)
const byRef = new Map(parsed.map(question => [question.ref, question]))

const baseData = [
  ['Q001', 'posology-determines-appropriate-dose', 'Posology deals with determining the appropriate drug dose.'],
  ['Q002', 'posos-means-how-much', 'The Greek word “posos” means “how much.”'],
  ['Q003', 'dose-amount-at-one-time', 'A dose is the specific amount of a drug taken at one time.'],
  ['Q004', 'dosage-regimen-dose-schedule', 'A dosage regimen is the schedule of doses.'],
  ['Q005', 'minimal-effective-dose-lowest-therapeutic', 'The minimal effective dose is the lowest dose required to produce a therapeutic effect.'],
  ['Q006', 'maximal-tolerated-dose-highest-safe', 'The maximal tolerated dose is the greatest dose that can be given without inducing toxic effects.'],
  ['Q007', 'ed50-therapeutic-effect-fifty-percent', 'ED50 is the dose producing a specified therapeutic effect in 50% of a tested population.'],
  ['Q008', 'td50-toxic-effect-fifty-percent', 'TD50 is the dose producing a specified toxic effect in 50% of a tested population.'],
  ['Q009', 'ld50-death-fifty-percent', 'LD50 is the dose causing death in 50% of a tested population.'],
  ['Q010', 'therapeutic-index-td50-over-ed50', 'The source calculates therapeutic index as TD50 divided by ED50.'],
  ['Q011', 'mec-minimum-effective-concentration', 'MEC stands for minimum effective concentration.'],
  ['Q012', 'mtc-minimum-toxic-concentration', 'MTC stands for minimum toxic concentration.'],
  ['Q013', 'therapeutic-window-effective-without-toxic', 'The therapeutic window is the concentration range in which a drug is effective without being toxic.'],
  ['Q014', 'below-therapeutic-window-ineffective', 'A drug concentration below the therapeutic window is ineffective.'],
  ['Q015', 'above-therapeutic-window-toxic', 'A drug concentration above the therapeutic window causes toxic harm.'],
  ['Q016', 'standard-adult-dose-seventy-kg-age-eighteen-sixty-five', 'The source bases its standard adult dose on a 70 kg person aged 18–65 years.'],
  ['Q017', 'neonate-cyp450-underdeveloped', 'Neonatal hepatic CYP450 enzyme systems are underdeveloped.'],
  ['Q018', 'elderly-start-low-go-slow', 'The source recommends a “start low, go slow” dosing approach in older adults.'],
  ['Q019', 'female-sex-hormones-microsomal-enzyme-inhibitors', 'The source classifies female sex hormones as hepatic microsomal enzyme inhibitors.'],
  ['Q020', 'menstruation-avoid-aspirin', 'The source advises avoiding aspirin during menstruation.'],
  ['Q021', 'pregnancy-avoid-teratogenic-aspirin-cortisone', 'The source advises avoiding teratogenic drugs and lists aspirin and cortisone as examples during pregnancy.'],
  ['Q022', 'surface-area-most-accurate-paediatric-dosing', 'The source identifies body-surface-area dosing as the most accurate listed method for children.'],
  ['Q023', 'pharmacogenomics-ultrarapid-poor-metabolizers', 'Pharmacogenomics helps explain ultra-rapid and poor drug-metabolizer phenotypes.'],
  ['Q024', 'renal-dose-reduction-creatinine-clearance', 'Dose reduction for primarily renally excreted drugs can be based on creatinine clearance.'],
  ['Q025', 'gentamicin-adjust-renal-impairment', 'Gentamicin dosing requires adjustment in renal impairment.'],
  ['Q026', 'propranolol-adjust-hepatic-disease', 'The source warns that unadjusted propranolol dosing may cause toxic levels in hepatic disease.'],
  ['Q027', 'statins-night-cholesterol-synthesis', 'The source links nighttime statin dosing to greater cholesterol synthesis at night.'],
  ['Q028', 'most-oral-drugs-before-meals', 'The source generalizes that most orally administered drugs are better given before meals.'],
  ['Q029', 'nsaids-after-meals', 'The source recommends administering NSAIDs after meals.'],
  ['Q030', 'oral-dose-higher-first-pass-effect', 'The source attributes a usually higher oral than parenteral dose to compensation for first-pass effect.'],
  ['Q031', 'subcutaneous-dose-higher-than-im-less-vascularity', 'The source attributes a higher subcutaneous than intramuscular dose to lower vascularity of subcutaneous tissue.'],
  ['Q032', 'oral-magnesium-sulphate-cholagogue-purgative', 'The source describes oral magnesium sulphate as a cholagogue at small dose or purgative at large dose.'],
  ['Q033', 'iv-magnesium-sulphate-anticonvulsant-muscle-relaxant', 'The source describes intravenous magnesium sulphate as an anticonvulsant and skeletal-muscle relaxant.'],
  ['Q034', 'young-rule-age-one-twelve', 'The source applies Young’s rule to children aged 1–12 years.'],
  ['Q035', 'young-rule-age-over-age-plus-twelve', 'Young’s rule calculates child dose as age divided by age plus 12, multiplied by adult dose.'],
  ['Q036', 'dilling-rule-age-four-twenty', 'The source applies Dilling’s rule to ages 4–20 years.'],
  ['Q037', 'dilling-rule-age-over-twenty', 'Dilling’s rule calculates child dose as age in years divided by 20, multiplied by adult dose.'],
  ['Q038', 'clark-rule-body-weight', 'Clark’s rule uses body weight to estimate a child dose.'],
  ['Q039', 'one-year-child-twenty-five-percent-adult-dose', 'The source’s percentage method assigns an approximately 25% adult dose at age 1 year.'],
  ['Q040', 'seven-year-child-fifty-percent-adult-dose', 'The source’s percentage method assigns an approximately 50% adult dose at age 7 years.'],
  ['Q041', 'twelve-year-child-seventy-five-percent-adult-dose', 'The source’s percentage method assigns an approximately 75% adult dose at age 12 years.'],
  ['Q043', 'mosteller-calculates-body-surface-area', 'The Mosteller formula calculates body surface area.'],
  ['Q044', 'elderly-sixty-seventy-two-thirds-adult-dose', 'The source assigns two-thirds of the adult dose to adults aged 60–70 years.'],
  ['Q045', 'elderly-over-seventy-half-adult-dose', 'The source assigns half the adult dose to adults older than 70 years.'],
  ['Q046', 'elderly-dose-reduction-hepatic-and-renal', 'The source attributes reduced older-adult dosing to weaker hepatic microsomal activity and reduced renal excretion.'],
  ['Q047', 'loading-dose-achieves-target-rapidly', 'A loading dose is given to achieve a target concentration rapidly.'],
  ['Q048', 'loading-dose-vd-times-cp-over-f', 'The source expresses loading dose as (Vd × Cp) / F.'],
  ['Q049', 'maintenance-dose-replaces-eliminated-drug', 'A maintenance dose replaces the amount of drug eliminated.'],
  ['Q050', 'maintenance-dose-cl-times-cp-times-t-over-f', 'The source expresses maintenance dose as (CL × Cp × T) / F.'],
]
if (baseData.length !== 49) throw new Error(`Family269 concept registry mismatch: ${baseData.length}`)
const replayOf = new Map([['Q042', 'Q022']])
const baseByRef = new Map(baseData.map(([ref, canonical, definition]) => [ref, { ref, canonical, definition, concept: cid(canonical), ...byRef.get(ref) }]))
const questions = parsed.map(question => {
  const base = baseByRef.get(replayOf.get(question.ref) ?? question.ref)
  const correctIndex = letters.indexOf(question.key)
  return {
    ...question, concept: base.concept, canonical: base.canonical, definition: base.definition,
    explanations: question.options.map((option, index) => index === correctIndex
      ? `${base.definition} For this exact source item, that makes option ${question.key} the printed answer.`
      : `${option} does not match the relationship tested here. ${base.definition} The printed answer is ${question.key}.`),
    id: `Q-HU102-PHA-F269-${question.ref}`, claim: `CLM-HU102-F269-${question.ref}-01`,
    qCitation: `CIT-HU102-F269-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F269-${question.ref}-KEY`, span: `SPN-HU102-F269-${question.ref}-01`,
  }
})
const questionsFor = base => questions.filter(question => question.concept === base.concept)

const sourceRow = row([
  ['id', source], ['title', 'MCQ Posology'], ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible Dr El-Sawy credit'],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Posology.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '10'], ['sha256', expectedSha], ['processing_status', 'pending'],
  ['rights', 'Local instructor-attributed revision bank held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to Dr El-Sawy. Family269 contains 50 keyed four-option text MCQs and authors all 50 as traceable Draft records. Q22 and Q42 are separately preserved question occurrences assigned to one repeated body-surface-area dosing concept. Source wording, formulas, option order, and answer letters are preserved without inferring official Helwan, year, sitting, marks, candidate, or departmental-key authority.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Posology and individualised dose selection'], ['arabic_title', ''],
  ['aliases', 'Dose selection and dosage regimens\nPaediatric, older-adult, loading, and maintenance doses'], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', 'Posology'],
  ['microtopic', 'Dose selection'], ['nanotopic', 'Family269 Dr El-Sawy bank'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
  ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '14'],
  ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Posology covers dose terminology, therapeutic concentration ranges, patient and route adjustments, paediatric rules, and loading and maintenance doses.'],
  ['sections', `### Definition\nPosology is the study of appropriate drug doses and dosage regimens.\n\n### Mechanism\nDose selection integrates drug exposure, therapeutic and toxic concentration limits, route, elimination, patient characteristics, and the intended speed and duration of exposure.\n\n### Key determinants\n${baseData.map(([, , definition]) => `- ${definition}`).join('\n')}\n\n### Clinical significance\nThese relationships reproduce an instructor-attributed auxiliary bank. They require independent medical review, especially broad age-, meal-, menstruation-, pregnancy-, and route-based dosing generalisations; they are not patient-specific prescribing instructions.\n\n### Common misconceptions\nDo not interchange dose with dosage regimen, MEC with MTC, or loading-dose and maintenance-dose equations.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', baseData.map(([, , definition]) => definition).join('\n')],
  ['lose_the_mark', 'Changing the printed answer while transcribing.\nTreating Q22 and Q42 as one question rather than two occurrences.\nPresenting an auxiliary instructor bank as an official clinical dosing authority.'],
  ['related_concepts', baseData.map(([ref]) => baseByRef.get(ref).concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pharmacology > General pharmacology > Posology > Family269'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or departmental approval appears on the pages.'],
  ['annotations', baseData.map(([ref, , definition]) => `### definition_of · ${baseByRef.get(ref).concept}\nQuote: ${definition}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', baseData.map(([ref, , definition]) => {
    const occurrences = questionsFor(baseByRef.get(ref))
    return `### ${definition}\nClaims: ${occurrences.map(item => item.claim).join(', ')}\nCitations: ${occurrences.flatMap(item => [item.qCitation, item.kCitation]).join(', ')}\nSpan: ${occurrences.map(item => item.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family269 stems, four-option sets, mathematical notation, and printed answer letters.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required; broad dosing generalisations must not be used as patient-specific advice.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 50 raw prompts, 50 supplied answers, 50 safe traceable Draft records, 0 holds, 0 exclusions, and 0 detected printed-key conflicts. Q22 and Q42 are two authored question occurrences assigned to one repeated concept, yielding 49 concept records.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const conceptRow = ([ref, canonical, definition]) => {
  const base = baseByRef.get(ref)
  const occurrences = questionsFor(base)
  return row([
    ['label', definition], ['id', base.concept], ['canonical_key', canonical], ['aliases', definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', definition],
    ['explicit_objective', `Apply this posology relationship: ${definition}`], ['pitfalls', `Applying an adjacent dosing rule or formula instead of this relationship: ${definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Posology'], ['microtopic', ref <= 'Q015' ? 'Dose and therapeutic range terminology' : ref <= 'Q033' ? 'Patient, timing, and route factors' : ref <= 'Q046' ? 'Paediatric and older-adult dose rules' : 'Loading and maintenance doses'],
    ['nanotopic', `Family269 ${occurrences.map(item => item.ref).join(' and ')}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Posology > Family269 > ${occurrences.map(item => item.ref).join(' and ')}`],
    ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
    ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['clinical_relevance', '0.74'], ['academic_relevance', '0.97'], ['weight_confidence', '0.38'], ['confidence', '0.68'],
    ['exam_signal', occurrences.map(question => `${source} | Family269 ${question.ref} | printed answer ${question.key} | instructor-attributed auxiliary source`).join('\n')],
    ['atomic_claim_ids', occurrences.map(question => question.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', occurrences.map(question => `[Family269 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
    ['uncertainty', `Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. ${occurrences.length === 2 ? 'Q22 and Q42 are two source occurrences of the same body-surface-area dosing relationship.' : 'The source relationship remains unverified beyond this bank.'}`],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required. Broad clinical dosing statements must be checked against current guidance before publication.'],
    ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''],
    ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family269 keyed text records.\nsourceCandidateIds: Deterministic ID established from this bounded source handle; later exact scopes must reuse it.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No rejected merge candidate is recorded.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Posology'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept], ['module', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Posology > Family269 > ${question.ref}`], ['clinical_relevance', '0.74'], ['academic_relevance', '0.97'], ['cognitive_effort_score', '0.38'],
  ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family269 ${question.ref}, PDF p${question.page}: exact text stem, four options, and printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `${replayOf.has(question.ref) ? 'Repeated semantic handle with Family269 Q022; both source occurrences are retained. ' : ''}Literal stem, option order, formula notation, and printed answer are preserved. No official exam, official key, year, sitting, marks, candidate response, or clinical prescribing authority is inferred.`],
  ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])
const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.68'],
  ['freshness', 'source_created_2026-04-24'], ['time_sensitive', 'no'], ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key or clinical guidance; occurrence: Family269 ${question.ref};`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family269 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'],
    ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam, official key, or clinical dosing authority.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Printed answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family269 ${question.ref}`], ['locator_detail', 'Visibly aligned right-margin answer token'],
    ['context_note', 'Source-supplied instructor-bank answer; not an official department key or patient-specific instruction.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([
  ['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition], ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`],
]))
const relationPairs = [
  ['Q001', 'Q003'], ['Q003', 'Q004'], ['Q005', 'Q006'], ['Q005', 'Q007'], ['Q007', 'Q008'], ['Q007', 'Q009'], ['Q007', 'Q010'], ['Q008', 'Q010'],
  ['Q011', 'Q012'], ['Q011', 'Q013'], ['Q012', 'Q013'], ['Q013', 'Q014'], ['Q013', 'Q015'], ['Q016', 'Q018'], ['Q017', 'Q018'], ['Q018', 'Q044'],
  ['Q018', 'Q045'], ['Q018', 'Q046'], ['Q023', 'Q024'], ['Q024', 'Q025'], ['Q024', 'Q026'], ['Q028', 'Q029'], ['Q030', 'Q031'], ['Q032', 'Q033'],
  ['Q022', 'Q034'], ['Q022', 'Q036'], ['Q022', 'Q038'], ['Q022', 'Q043'], ['Q034', 'Q035'], ['Q036', 'Q037'], ['Q039', 'Q040'], ['Q040', 'Q041'],
  ['Q047', 'Q048'], ['Q047', 'Q049'], ['Q049', 'Q050'],
]
const relationRows = relationPairs.map(([fromRef, toRef]) => {
  const from = baseByRef.get(fromRef)
  const to = baseByRef.get(toRef)
  const fromQuestion = questionsFor(from)[0]
  const toQuestion = questionsFor(to)[0]
  return row([['source', from.concept], ['type', 'related_concepts'], ['target', to.concept], ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`],
    ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.66'],
    ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`], ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family269-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family269-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family269-concepts.md', rows(baseData.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family269-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family269-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family269-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family269-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family269-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 269, rawPrompts: 50, sourceAnswers: 50, safeRecords: 50, holds: 0, exclusions: 0, conflicts: 0,
  sourceFormats: { mcq: 50 }, authoredFormats: { mcq: 50 }, authoredQuestionOccurrences: 50,
  sourceDistinctHandles: 49, repeatedHandleOccurrences: { 'Q022/Q042': 2 }, semanticPriorReuses: 8, semanticConceptDelta: 41,
  emittedConceptRecords: baseData.length, articles: 1, questions: questions.length, claims: claimRows.length,
  citations: citationRows.length, spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
