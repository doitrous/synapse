import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_e3bcf89c186c44f9b3d0'
const article = 'ART-HU-BMS102-PHA-F263-RECEPTOR-EFFECTIVENESS'
const sourcePath = process.env.HELWAN_F263_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Drug receptor binding.pdf'
const expectedSha = 'e3bcf89c186c44f9b3d0b9b5fbfa9471bf8781f58d2350cd2b2bbd0b7f68d9e2'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCDE'
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family263 source SHA mismatch: ${actualSha}`)
const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 2_000_000 }).replaceAll('\f', '\n')
const effectStart = native.indexOf('1) The phrase')
if (effectStart < 0) throw new Error('Family263 section boundary not found')

const bindingPage = number => Math.floor((number - 1) / 5) + 1
const effectPage = number => {
  const ends = [4, 8, 12, 15, 19, 22, 26, 30, 34, 38, 42, 45, 48, 49]
  return ends.findIndex(end => number <= end) + 7
}
const parseSection = (text, section, pageFor) => {
  const cleaned = text.split('\n').filter(line => {
    const value = line.trim()
    return !['Pharma', 'Pharmacology', 'MCQ', 'MCQs-Drug receptor binding', 'DR ELSAWY', 'DR . El-Sawy'].includes(value)
      && !/^\d+ of 6$/.test(value) && !/^\d+$/.test(value)
  }).join('\n')
  const starts = [...cleaned.matchAll(/(?:^|\n)\s*(\d+)\s*[.)]\s*/g)]
  return starts.map((match, index) => {
    const number = Number(match[1])
    const rawBody = cleaned.slice(match.index + match[0].length, starts[index + 1]?.index ?? cleaned.length)
    const standaloneKeys = rawBody.split('\n').map(line => line.trim()).filter(line => /^[A-E]$/.test(line))
    const key = section === 'E' && number === 13 ? '10 & 100'
      : section === 'E' && number === 22 ? 'C & A'
        : standaloneKeys[0]
    const body = rawBody.split('\n').filter(line => !/^[A-E]$/.test(line.trim())).join('\n')
    const optionStarts = [...body.matchAll(/(?:^|\n)\s*([A-Ea-e])[\).]\s*/g)]
    const stem = body.slice(0, optionStarts[0]?.index ?? body.length).replace(/\s+/g, ' ').trim()
    const options = optionStarts.map((option, optionIndex) => body
      .slice(option.index + option[0].length, optionStarts[optionIndex + 1]?.index ?? body.length)
      .replace(/\s+/g, ' ').trim()).filter(Boolean)
    return { section, number, ref: `${section}Q${String(number).padStart(3, '0')}`, page: pageFor(number), stem, options, key }
  })
}
const parsed = [
  ...parseSection(native.slice(0, effectStart), 'B', bindingPage),
  ...parseSection(native.slice(effectStart), 'E', effectPage),
]
if (parsed.length !== 79 || parsed.filter(question => question.section === 'B').length !== 30 || parsed.filter(question => question.section === 'E').length !== 49) {
  throw new Error(`Family263 prompt boundary mismatch: ${parsed.length}`)
}
const byRef = new Map(parsed.map(question => [question.ref, question]))

const holds = new Map([
  ['EQ013', 'unmarked graph-reading written operation; source answer 10 & 100; no printed marks and no importer-valid objective schema'],
  ['EQ022', 'unmarked graph-reading written operation; source answer C & A; no printed marks and no importer-valid objective schema'],
  ['EQ030', 'impossible printed key E against only four visible options A–D; retained without repair'],
  ['EQ041', 'three-option MCQ; current importer requires four or five options and no option may be invented'],
  ['EQ044', 'graph-dependent MCQ; required graph is not rights-cleared for redistribution or attached import'],
  ['EQ045', 'graph-dependent MCQ; required graph is not rights-cleared for redistribution or attached import'],
])
for (const question of parsed) {
  if (holds.has(question.ref)) continue
  const expectedOptions = question.ref === 'EQ029' ? 5 : 4
  if (question.options.length !== expectedOptions || !question.options[letters.indexOf(question.key)]) {
    throw new Error(`${question.ref}: ${question.options.length} options; key ${question.key}`)
  }
}

const baseData = [
  ['BQ001', 'ionic-bond-opposite-charge-attraction', 'An ionic bond forms through attraction between opposite electrical charges.'],
  ['BQ002', 'ionic-bond-positive-drug-negative-amino-acid', 'An ionic drug-receptor bond can form between a positively charged drug and a negatively charged amino-acid side chain.'],
  ['BQ003', 'covalent-strongest-drug-receptor-bond', 'A covalent bond is the strongest common type of drug-receptor bond.'],
  ['BQ004', 'covalent-superglue-connection', 'The superglue analogy describes covalent drug-receptor binding.'],
  ['BQ005', 'hydrogen-bond-short-distance', 'Hydrogen bonding occurs over a short distance between suitable donor and acceptor groups.'],
  ['BQ006', 'hydrogen-bond-easily-broken-reformed', 'Hydrogen bonds are relatively easy to break and reform.'],
  ['BQ007', 'acetylcholine-anionic-nicotinic-site-ionic-bond', 'Acetylcholine binds the anionic site of the nicotinic receptor through an ionic interaction.'],
  ['BQ008', 'hydrogen-bonds-drug-receptor-selectivity', 'Hydrogen-bond geometry can contribute to drug selectivity for receptors.'],
  ['BQ009', 'covalent-drug-receptor-requires-new-receptor-synthesis', 'Recovery after irreversible covalent receptor binding may require synthesis of new receptors.'],
  ['BQ010', 'organophosphorus-cholinesterase-covalent-bond', 'Organophosphorus compounds form a covalent bond with cholinesterase.'],
  ['BQ011', 'omeprazole-proton-pump-covalent-bond', 'Omeprazole forms a covalent bond with the gastric hydrogen-potassium ATPase proton pump.'],
  ['BQ012', 'ionic-bond-firm-reversible-detachment', 'Ionic binding can hold a drug firmly while still allowing reversible detachment.'],
  ['BQ013', 'full-agonist-maximal-emax-response', 'A full agonist can produce the maximum possible response, or Emax.'],
  ['BQ014', 'full-agonist-high-efficacy', 'A full agonist has high efficacy.'],
  ['BQ015', 'morphine-opioid-full-agonist', 'Morphine acts as a full agonist at opioid receptors in this comparison.'],
  ['BQ016', 'partial-agonist-submaximal-even-full-occupancy', 'A partial agonist produces a submaximal response even when it occupies all available receptors.'],
  ['BQ017', 'partial-agonist-antagonizes-full-agonist', 'A partial agonist can antagonise a full agonist when both compete for the same receptor population.'],
  ['BQ018', 'nalorphine-opioid-partial-agonist', 'Nalorphine is classified as a partial agonist at opioid receptors in this comparison.'],
  ['BQ019', 'partial-agonist-affinity-low-efficacy', 'A partial agonist has receptor affinity but lower efficacy than a full agonist.'],
  ['BQ020', 'superagonist-greater-than-endogenous-response', 'A superagonist produces a greater response than the natural endogenous agonist.'],
  ['BQ021', 'fentanyl-superagonist', 'Fentanyl is classified as a superagonist in this source comparison.'],
  ['BQ022', 'isoprenaline-adrenergic-superagonist', 'Isoprenaline is classified as a superagonist at adrenergic receptors in this source comparison.'],
  ['BQ023', 'carbachol-muscarinic-superagonist', 'Carbachol is classified as a superagonist at muscarinic receptors in this source comparison.'],
  ['BQ024', 'coagonist-two-agonists-same-receptor-system', 'Co-agonism requires two agonists working together within the same receptor system.'],
  ['BQ025', 'nmda-glutamate-glycine-coagonists', 'NMDA receptor activation requires glutamate and glycine acting as co-agonists.'],
  ['BQ026', 'inverse-agonist-opposite-agonist-effect', 'An inverse agonist produces an effect opposite to that of an agonist.'],
  ['BQ027', 'inverse-agonist-reduces-below-baseline', 'An inverse agonist reduces constitutive receptor activity below baseline.'],
  ['BQ028', 'losartan-at1-inverse-agonist', 'Losartan can act as an inverse agonist at AT1 receptors.'],
  ['BQ029', 'angiotensin-ii-vasoconstriction-increased-bp', 'Angiotensin II causes vasoconstriction and increases arterial pressure.'],
  ['BQ030', 'inverse-agonist-blocks-agonist-reduces-baseline', 'An inverse agonist both opposes agonist action and reduces constitutive activity below baseline.'],
  ['EQ001', 'affinity-ability-bind-receptor', 'Affinity is the ability of a drug to bind to its receptor.'],
  ['EQ002', 'maximal-efficacy-largest-response', 'Maximal efficacy describes the largest response a drug can produce regardless of dose.'],
  ['EQ003', 'receptor-complex-number-determined-affinity', 'Receptor affinity helps determine how many drug-receptor complexes form at a given drug concentration.'],
  ['EQ004', 'therapeutic-index-desired-toxic-effect-relation', 'Therapeutic index relates a drug’s desired therapeutic effect to its toxic effect.'],
  ['EQ008', 'potency-lower-dose-same-response', 'When a lower dose produces the same response, that drug is more potent.'],
  ['EQ009', 'pindolol-partial-agonist-context-dependent', 'Pindolol behaves as a partial agonist, stimulating beta receptors alone but opposing stronger beta agonists.'],
  ['EQ012', 'narrow-therapeutic-index-dose-approaches-toxic', 'A narrow therapeutic index means the therapeutic dose approaches the toxic dose.'],
  ['EQ015', 'agonist-mimics-endogenous-and-stimulates-receptor', 'An agonist binds a receptor and produces a response that mimics its endogenous ligand.'],
  ['EQ019', 'competitive-antagonist-increases-ed50', 'A competitive antagonist increases the agonist ED50 without reducing maximal efficacy when sufficient agonist is available.'],
  ['EQ020', 'partial-versus-full-agonist-potency-indeterminate', 'Relative potency cannot be inferred solely from whether drugs are partial or full agonists.'],
  ['EQ021', 'isoproterenol-full-agonist', 'Isoproterenol is classified as a full agonist in the cardiac beta-receptor comparison.'],
  ['EQ023', 'antagonist-affinity-no-efficacy', 'An antagonist has receptor affinity but no efficacy.'],
  ['EQ024', 'noncompetitive-antagonist-decreases-max-response', 'A noncompetitive antagonist decreases the maximum response to an agonist.'],
  ['EQ025', 'terbutaline-leukotriene-physiological-antagonism', 'Terbutaline bronchodilation physiologically antagonises leukotriene-mediated bronchoconstriction.'],
  ['EQ026', 'atracurium-direct-drug-interaction-chemical-antagonism', 'A drug that directly interacts with atracurium and reverses its effect demonstrates chemical antagonism.'],
  ['EQ027', 'reversible-antagonist-overcome-increased-agonist', 'A reversible competitive antagonist can be overcome by increasing the agonist concentration.'],
  ['EQ028', 'adrenaline-histamine-physiological-antagonism', 'Adrenaline bronchodilation physiologically antagonises histamine-mediated bronchoconstriction.'],
  ['EQ029', 'naloxone-competitive-antagonist-morphine', 'Naloxone acts as a competitive antagonist of morphine at opioid receptors.'],
  ['EQ031', 'agonist-affinity-and-efficacy', 'An agonist has both receptor affinity and efficacy.'],
  ['EQ032', 'efficacy-response-after-receptor-binding', 'Efficacy is the ability of a bound drug to produce a response.'],
  ['EQ033', 'therapeutic-index-ld50-ed50-ratio', 'Therapeutic index is expressed as the ratio of a toxic or lethal dose to the effective dose.'],
  ['EQ034', 'therapeutic-index-safety-measure', 'Therapeutic index is a measure of drug safety.'],
  ['EQ035', 'high-therapeutic-index-safer-clinical-use', 'A high therapeutic index generally indicates greater clinical safety.'],
  ['EQ036', 'potency-dose-producing-fifty-percent-max-response', 'Potency can be represented by the dose that produces fifty percent of the maximal response.'],
  ['EQ038', 'direct-agonist-interaction-chemical-antagonist', 'Chemical antagonism occurs when an antagonist interacts directly with the agonist rather than its receptor.'],
  ['EQ039', 'pharmacologic-antagonist-occupies-receptor-without-activation', 'A pharmacological antagonist occupies a receptor without activating it and blocks agonist action.'],
  ['EQ040', 'low-therapeutic-index-toxicity-risk', 'A low therapeutic index indicates a greater risk of toxicity.'],
  ['EQ042', 'physiological-antagonism-independent-receptors-opposite', 'Physiological antagonists act through independent receptors to produce opposite effects in the same tissue or organ.'],
  ['EQ046', 'antagonism-one-drug-abolishes-another', 'Antagonism occurs when one drug abolishes or reduces the effect of another.'],
  ['EQ047', 'competitive-antagonism-same-receptor-site', 'Competitive antagonism occurs when antagonist and agonist bind the same receptor site.'],
  ['EQ048', 'chemical-antagonism-acid-base-precipitation', 'Chemical antagonism can occur when an acidic and a basic drug interact and precipitate each other.'],
  ['EQ049', 'noncompetitive-antagonist-allosteric-site', 'Noncompetitive antagonism can occur when an antagonist binds a different receptor site and prevents agonist action.'],
]
if (baseData.length !== 62) throw new Error(`Family263 base registry mismatch: ${baseData.length}`)
const baseByRef = new Map(baseData.map(([ref, canonical, definition]) => [ref, { ref, canonical, definition, concept: cid(canonical), ...byRef.get(ref) }]))
const replayOf = new Map([
  ['EQ005', 'EQ004'], ['EQ006', 'BQ019'], ['EQ007', 'EQ001'], ['EQ010', 'EQ004'], ['EQ011', 'EQ004'],
  ['EQ014', 'EQ008'], ['EQ016', 'EQ002'], ['EQ017', 'EQ012'], ['EQ018', 'EQ015'], ['EQ037', 'EQ019'], ['EQ043', 'EQ024'],
])
const safeParsed = parsed.filter(question => !holds.has(question.ref))
const questions = safeParsed.map(question => {
  const base = baseByRef.get(replayOf.get(question.ref) ?? question.ref)
  if (!base) throw new Error(`${question.ref}: no concept mapping`)
  const correctIndex = letters.indexOf(question.key)
  return {
    ...question, concept: base.concept, canonical: base.canonical, definition: base.definition,
    explanations: question.options.map((option, index) => index === correctIndex
      ? `${base.definition} This makes option ${question.key} the best answer to the stem as written. The remaining options describe different or incompatible pharmacological relationships.`
      : `This option does not match the pharmacological relationship tested here. ${base.definition}`),
    id: `Q-HU102-PHA-F263-${question.ref}`, claim: `CLM-HU102-F263-${question.ref}-01`,
    qCitation: `CIT-HU102-F263-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F263-${question.ref}-KEY`, span: `SPN-HU102-F263-${question.ref}-01`,
    replayOf: replayOf.get(question.ref),
  }
})
if (questions.length !== 73 || new Set(questions.map(question => question.concept)).size !== 62) throw new Error('Family263 safe-collapse mismatch')

const sourceRow = row([
  ['id', source], ['title', 'MCQs-Drug receptor binding / MCQ: Effectiveness, Safety & Antagonism'],
  ['institution', 'Instructor-attributed local Helwan BMS-102 revision corpus; visible Dr El-Sawy credit'], ['collection_id', 'hu-y1'],
  ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - MCQ Drug receptor binding.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'],
  ['page_count', '20'], ['sha256', expectedSha], ['processing_status', 'pending'], ['rights', 'Local instructor-attributed revision bank held for internal authoring only; graph images are not rights-cleared for redistribution.'],
  ['qualification', 'Tier-9 low-authority auxiliary question evidence visibly credited to Dr El-Sawy. Family263 contains 79 answered prompts: 77 objective MCQs and 2 unmarked graph-written operations. This batch authors 73 importer-valid text MCQs. Holds are the 2 unmarked graph-written operations, 2 graph-dependent MCQs without rights-cleared media, Effectiveness Q30 whose printed key E cannot resolve against visible options A–D, and Effectiveness Q41 whose three printed options do not meet the importer contract. No key or option set is repaired or expanded.'],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'Drug-receptor binding, agonism, effectiveness, safety, and antagonism'], ['arabic_title', ''],
  ['aliases', 'Receptor binding and antagonism\nDrug effectiveness and safety'], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacodynamics'],
  ['microtopic', 'Receptor binding and dose-response'], ['nanotopic', 'Family263 Dr El-Sawy bank'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
  ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '13'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'Drug-receptor responses depend on binding forces, affinity, efficacy, intrinsic activity, and the mechanism by which agonists and antagonists alter signalling.'],
  ['sections', `### Definition\nPharmacodynamics links drug-receptor binding to biological response, therapeutic effectiveness, and toxicity.\n\n### Mechanism\nIonic, hydrogen, and covalent bonds differ in strength and reversibility. Agonists activate receptors, inverse agonists reduce constitutive activity, and antagonists oppose agonist responses through competitive, noncompetitive, physiological, pharmacological, or chemical mechanisms.\n\n### Key determinants\n${baseData.map(([, , definition]) => `- ${definition}`).join('\n')}\n\n### Clinical significance\nAffinity, efficacy, potency, and therapeutic index help interpret dose-response relationships and drug safety.\n\n### Common misconceptions\nDo not confuse affinity with efficacy, potency with maximal response, or competitive antagonism with irreversible reduction of Emax.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', baseData.map(([, , definition]) => definition).join('\n')],
  ['lose_the_mark', 'Calling affinity the same as efficacy.\nUsing potency to describe the largest possible response.\nRepairing an impossible source key rather than holding the record.'],
  ['related_concepts', baseData.map(([ref]) => baseByRef.get(ref).concept).join('\n')], ['related_articles', ''], ['question_ids', questions.map(question => question.id).join('\n')],
  ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pharmacology > Pharmacodynamics > Receptors and antagonism > Family263'],
  ['university_notes', 'hu: Instructor-attributed auxiliary revision bank; no university, year, sitting, marks, candidate, or departmental approval appears on the pages.'],
  ['annotations', baseData.map(([ref, , definition]) => `### definition_of · ${baseByRef.get(ref).concept}\nQuote: ${definition}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', baseData.map(([ref, , definition]) => {
    const concept = baseByRef.get(ref).concept
    const occurrences = questions.filter(question => question.concept === concept)
    return `### ${definition}\nClaims: ${occurrences.map(question => question.claim).join(', ')}\nCitations: ${occurrences.flatMap(question => [question.qCitation, question.kCitation]).join(', ')}\nSpan: ${occurrences.map(question => question.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family263 importer-valid text stems, option sets, and printed answers; held graph/impossible-key operations remain provenance-only.'],
  ['evidence_gaps', 'Independent medical verification, named Helwan faculty review, and rights-cleared graph media remain required.'],
  ['conflicts', 'Effectiveness Q30 prints key E despite only options A–D; held without correction.'], ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 79 raw prompts and 79 supplied answers; 73 safe text MCQs authored; 6 holds = 2 unmarked graph-written, 2 graph-dependent media, 1 impossible key, and 1 three-option importer-schema mismatch; 0 authority exclusions.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared graph media is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const claimsByConcept = new Map()
for (const question of questions) claimsByConcept.set(question.concept, [...(claimsByConcept.get(question.concept) ?? []), question.claim])
const conceptRow = ([ref, canonical, definition]) => {
  const base = baseByRef.get(ref)
  const occurrences = questions.filter(question => question.concept === base.concept)
  const heldConflict = ref === 'EQ042'
  return row([
    ['label', definition], ['id', base.concept], ['canonical_key', canonical], ['aliases', definition], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', definition],
    ['explicit_objective', `Apply this pharmacodynamic relationship: ${definition}`], ['pitfalls', `Selecting a distractor that conflicts with this relationship: ${definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'],
    ['topic', 'General pharmacology'], ['subtopic', 'Pharmacodynamics'], ['microtopic', ref.startsWith('B') ? 'Drug-receptor binding and agonism' : 'Effectiveness, safety and antagonism'],
    ['nanotopic', `Family263 ${ref}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacodynamics > Family263 > ${ref}`],
    ['article_ids', article], ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'],
    ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'], ['clinical_relevance', '0.72'], ['academic_relevance', '0.96'], ['weight_confidence', '0.39'], ['confidence', '0.70'],
    ['exam_signal', `${occurrences.map(question => `${source} | Family263 ${question.ref} | printed answer ${question.key} | instructor-attributed auxiliary source`).join('\n')}${heldConflict ? `\n${source} | Family263 EQ030 | held impossible printed key E against A–D | not authored` : ''}`],
    ['atomic_claim_ids', claimsByConcept.get(base.concept).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', `${occurrences.map(question => `[Family263 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')}${heldConflict ? '\n[Family263 EQ030 held] Two drug may act on same tissue or organ through independent receptors resulting effects in opposite reaction that known as: [printed key E; visible options A–D only]' : ''}`],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', heldConflict ? 'Related source occurrence EQ030 has impossible printed key E against options A–D and is excluded from question authoring.' : '[clear]'],
    ['uncertainty', 'Instructor-attributed auxiliary bank with no visible university, year, sitting, marks, candidate, or department-key approval. Semantic reconciliation reports 33 prior-governed and 34 new scopes; deterministic full records are emitted where no exact same-key authored object exists.'],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source graphs are not rights-cleared.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family263 safe objective records.\nsourceCandidateIds: Four-search reconciliation found no authored same-key rival record.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', question.stem],
  ['format', 'single best answer'], ['derived_from', question.replayOf ? `Q-HU102-PHA-F263-${question.replayOf}` : ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacodynamics'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', question.concept], ['module', 'HU-BMS-102'],
  ['module_subject', `HU-BMS-102 > Pharmacology > Pharmacodynamics > Family263 > ${question.ref}`], ['clinical_relevance', '0.72'], ['academic_relevance', '0.96'], ['cognitive_effort_score', '0.36'],
  ['exam_weight_by_year', 'HU_Y1=0.50'], ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family263 ${question.ref}, PDF p${question.page}: exact text stem, options, and printed answer ${question.key}. Instructor-attributed auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `Literal stem, option order, and printed answer are preserved. ${question.replayOf ? `Same-source semantic replay of ${question.replayOf}; this occurrence reuses its concept ID.` : 'Source-distinct safe text handle.'} Six other source operations remain holds: EQ013/EQ022 unmarked graph-written, EQ044/EQ045 graph-media dependent, EQ030 impossible key E against A–D, and EQ041 with only three printed options. No option is invented and no key repair, official exam, official key, year, sitting, marks, candidate response, or practical authority is inferred.`],
  ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
])

const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', question.definition], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.70'],
  ['freshness', 'source_created_2026-04-24'], ['time_sensitive', 'no'], ['qualifiers', `authority: instructor-attributed auxiliary revision bank, not official key; occurrence: Family263 ${question.ref};${question.replayOf ? ` semantic replay of ${question.replayOf};` : ''}`],
]))
const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family263 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'], ['context_note', 'Instructor-attributed auxiliary revision bank; not an authenticated exam or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', `Printed answer: ${question.key}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family263 ${question.ref}`], ['locator_detail', 'Visibly aligned answer token'], ['context_note', 'Source-supplied instructor-bank answer; not an official department key.'], ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])
const spanRows = questions.map(question => row([['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition], ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`]]))
const relationPairs = [['BQ001', 'BQ003'], ['BQ003', 'BQ009'], ['BQ013', 'BQ016'], ['BQ016', 'BQ017'], ['BQ020', 'BQ021'], ['BQ024', 'BQ025'], ['BQ026', 'BQ027'], ['BQ027', 'BQ028'], ['EQ001', 'EQ003'], ['EQ002', 'EQ008'], ['EQ004', 'EQ012'], ['EQ004', 'EQ034'], ['EQ015', 'EQ023'], ['EQ019', 'EQ024'], ['EQ024', 'EQ042'], ['EQ033', 'EQ035'], ['EQ034', 'EQ040'], ['EQ038', 'EQ048'], ['EQ039', 'EQ047'], ['EQ046', 'EQ049']]
const relationRows = relationPairs.map(([fromRef, toRef]) => {
  const from = baseByRef.get(fromRef)
  const to = baseByRef.get(toRef)
  const fromQuestion = questions.find(question => question.concept === from.concept)
  const toQuestion = questions.find(question => question.concept === to.concept)
  return row([['source', from.concept], ['type', 'related_concepts'], ['target', to.concept], ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`], ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.67'], ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`], ['reviewer', 'Medical team, Admin team']])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family263-sources.md', sourceRow], ['article/HU-BMS-102-pharmacology-family263-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family263-concepts.md', rows(baseData.map(conceptRow))], ['evidence/HU-BMS-102-pharmacology-family263-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family263-citations.md', rows(citationRows)], ['evidence/HU-BMS-102-pharmacology-family263-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family263-relations.md', rows(relationRows)], ['question/HU-BMS-102-pharmacology-family263-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}
console.log(JSON.stringify({
  family: 263, rawPrompts: 79, sourceAnswers: 79, safeRecords: 73, holds: { unmarkedGraphWritten: 2, graphMedia: 2, impossibleKey: 1, importerSchema: 1, total: 6 }, exclusions: 0,
  sourceFormats: { objective: 77, graphWritten: 2 }, authoredFormats: { mcq: 73 }, authoredHandles: 62, sourceAcceptedHandles: 67,
  semanticPriorReuses: 33, semanticConceptDelta: 34, emittedConceptRecords: baseData.length,
  articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length, spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
