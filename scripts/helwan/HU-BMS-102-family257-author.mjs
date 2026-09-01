import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_0041c6ef962476e3f9e0'
const article = 'ART-HU-BMS102-PHA-F257-GENERAL-PHARMACOLOGY'
const sourcePath = process.env.HELWAN_F257_SOURCE_PDF
  ?? '/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - College MCQs Pharmacology Question Bank-1 (1).pdf'
const expectedSha = '0041c6ef962476e3f9e081d7148d8068eeaffda20b7b49dad1b663dcf57c7dd9'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const letters = 'ABCDE'
const slug = value => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const cid = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const actualSha = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
if (actualSha !== expectedSha) throw new Error(`Family257 source SHA mismatch: ${actualSha}`)

const native = execFileSync('pdftotext', [sourcePath, '-'], { encoding: 'utf8', maxBuffer: 2_000_000 })
const questionBoundary = native.indexOf('\nAnswers')
if (questionBoundary < 0) throw new Error('Family257 answer boundary not found')
const cleaned = native.slice(0, questionBoundary).replaceAll('\f', '\n').split('\n')
  .filter(line => line.trim() !== 'Pharmacology BMS2' && !/^(?:\d+\s*)+$/.test(line.trim()))
  .join('\n')
const starts = [...cleaned.matchAll(/(?:^|\n)\s*\??\s*Q(\d+)\s*[.:]/g)]

const keys = `
B B D C D D A D C C C B B A D C B B C B A C D A B
D D A C A B A C A C B B A B D B A B C B D B D A D
B C C B D C B D D C B B C B C A B A D A C D A D C
D D A B B C A B A A D C A D B D A A B B B B
`.trim().split(/\s+/)

const pageFor = q => {
  const ends = [6, 11, 17, 24, 30, 36, 42, 47, 52, 57, 62, 68, 75, 81, 87, 92, 97]
  return ends.findIndex(end => q <= end) + 1
}

const parsed = starts.map((match, index) => {
  const number = Number(match[1])
  const body = cleaned.slice(match.index + match[0].length, starts[index + 1]?.index ?? cleaned.length)
  const optionStarts = [...body.matchAll(/(?:^|\n)\s*([A-Ea-e])[\).]\s*/g)]
  const stem = body.slice(0, optionStarts[0]?.index ?? body.length).replace(/\s+/g, ' ').trim()
  const options = optionStarts.map((option, optionIndex) => body
    .slice(option.index + option[0].length, optionStarts[optionIndex + 1]?.index ?? body.length)
    .replace(/\s+/g, ' ').trim()).filter(Boolean)
  return { number, ref: `Q${String(number).padStart(3, '0')}`, page: pageFor(number), stem, options, key: keys[number - 1] }
})

const tfNumbers = new Set([18, 20, 25, 36, 66, 70])
if (parsed.length !== 97 || keys.length !== 97 || parsed.some((question, index) => question.number !== index + 1)) {
  throw new Error(`Family257 question/key boundary mismatch: ${parsed.length}/${keys.length}`)
}
for (const question of parsed) {
  const expectedOptions = tfNumbers.has(question.number) ? 2 : question.number === 88 ? 5 : 4
  if (question.options.length !== expectedOptions) throw new Error(`${question.ref}: parsed ${question.options.length} options, expected ${expectedOptions}`)
  if (!question.options[letters.indexOf(question.key)]) throw new Error(`${question.ref}: key ${question.key} does not resolve`)
}

const definitions = [
  /* Q01 */ "Pharmacokinetics studies drug absorption, distribution, metabolism, and excretion.",
  /* Q02 */ "Drug biotransformation is part of pharmacokinetics.",
  /* Q03 */ "Drug distribution in the body is part of pharmacokinetics.",
  /* Q04 */ "Drug excretion is part of pharmacokinetics.",
  /* Q05 */ "Passive lipid diffusion is the main mechanism of gastrointestinal absorption for most drugs.",
  /* Q06 */ "Hydrophilic substances do not readily cross lipid membranes by passive diffusion.",
  /* Q07 */ "Hydrophilic drugs have low ability to penetrate cell-membrane lipids.",
  /* Q08 */ "Active transport can move a drug against its concentration gradient.",
  /* Q09 */ "Bioavailability is the fraction of an administered dose that reaches the systemic circulation.",
  /* Q10 */ "The extent of absorption and the hepatic first-pass effect determine bioavailability.",
  /* Q11 */ "Rectal administration can reduce hepatic first-pass exposure compared with oral administration.",
  /* Q12 */ "Oral administration is the listed route most likely to produce a first-pass effect.",
  /* Q13 */ "Oral drug absorption depends on gastrointestinal secretion and motor function.",
  /* Q14 */ "Sublingual administration can produce relatively rapid absorption.",
  /* Q15 */ "Inhalation delivers a drug without gastrointestinal absorption.",
  /* Q16 */ "Parenteral administration usually produces a more rapid response than oral administration.",
  /* Q17 */ "Oily drug solutions may be administered by the intramuscular route.",
  /* Q18 */ "Oily solutions are not suitable for intravenous injection.",
  /* Q19 */ "Inhalation can provide rapid rather than slow access to the general circulation.",
  /* Q20 */ "Most drugs are not distributed homogeneously throughout the body.",
  /* Q21 */ "Cell membranes, capillary walls, and the placenta are biological barriers to drug distribution.",
  /* Q22 */ "The absence of pores in brain capillary endothelium restricts drug penetration across the blood-brain barrier.",
  /* Q23 */ "Apparent volume of distribution relates the amount of drug in the body to its plasma concentration.",
  /* Q24 */ "Plasma drug concentration is required to calculate apparent volume of distribution.",
  /* Q25 */ "Lipid-soluble drugs that penetrate barriers and distribute widely tend to have a large, not small, apparent volume of distribution.",
  /* Q26 */ "Drug biotransformation is the physicochemical and biochemical alteration of a drug in the body.",
  /* Q27 */ "Biotransformation generally makes drugs less lipid soluble.",
  /* Q28 */ "Microsomal oxidation is especially prominent for lipid-soluble drugs.",
  /* Q29 */ "Microsomal oxidation commonly increases drug ionisation and water solubility.",
  /* Q30 */ "Induction of hepatic microsomal enzymes may require an increased dose of some affected drugs.",
  /* Q31 */ "Phase I metabolic transformation includes oxidation, reduction, and hydrolysis.",
  /* Q32 */ "Biotransformation commonly facilitates faster urinary drug excretion.",
  /* Q33 */ "Conjugation couples a drug or metabolite with an endogenous substrate.",
  /* Q34 */ "Acetylation is a phase II biotransformation reaction.",
  /* Q35 */ "Hydrolysis is a phase I reaction rather than a conjugation reaction.",
  /* Q36 */ "Metabolic transformation and conjugation usually reduce rather than increase biological activity.",
  /* Q37 */ "Reduced microsomal enzyme activity in liver disease can prolong the action of some drugs.",
  /* Q38 */ "Elimination half-life is the time required for the plasma amount or concentration of a drug to fall by half.",
  /* Q39 */ "Elimination half-life does not depend on the time required for drug absorption.",
  /* Q40 */ "The elimination rate constant is mathematically related to elimination half-life.",
  /* Q41 */ "Pharmacodynamics studies drug effects and mechanisms, not absorption and distribution.",
  /* Q42 */ "Mechanisms of drug action are part of pharmacodynamics.",
  /* Q43 */ "Unwanted drug effects are studied within pharmacodynamics.",
  /* Q44 */ "A receptor is a cellular macromolecule to which a drug binds to elicit a specific effect.",
  /* Q45 */ "Affinity measures how tightly a drug binds to a receptor.",
  /* Q46 */ "Drug targets can include receptors, ion channels, and carrier proteins.",
  /* Q47 */ "An agonist binds a receptor and initiates a change in cell function.",
  /* Q48 */ "A full agonist can produce the maximal response and has high efficacy.",
  /* Q49 */ "A partial agonist produces a submaximal response and has lower efficacy than a full agonist.",
  /* Q50 */ "An antagonist binds a receptor without directly activating its function.",
  /* Q51 */ "A competitive antagonist binds the agonist receptor site and progressively inhibits the agonist response.",
  /* Q52 */ "An agonist-antagonist acts as an agonist at one receptor subtype and an antagonist at another.",
  /* Q53 */ "Irreversible receptor antagonism commonly results from covalent bonding.",
  /* Q54 */ "Gene replacement is not a mechanism of receptor-mediated transmembrane signalling.",
  /* Q55 */ "Cyclic AMP is an intracellular second messenger generated downstream of some G-protein-coupled receptors.",
  /* Q56 */ "A G protein changes effector activity but is not itself a second messenger.",
  /* Q57 */ "Increased second-messenger concentrations can activate protein kinases and increase protein phosphorylation.",
  /* Q58 */ "Sodium-channel blockers, calcium-channel blockers, and potassium-channel activators all act through ion-channel interactions.",
  /* Q59 */ "ED50 is a measure of potency rather than maximal efficacy.",
  /* Q60 */ "A therapeutic dose produces the required effect in most patients.",
  /* Q61 */ "A toxic dose produces effects that are hazardous to the organism.",
  /* Q62 */ "Drug accumulation during repeated administration can lead to toxic reactions.",
  /* Q63 */ "Tolerance is a gradual decrease in responsiveness that develops over days or weeks.",
  /* Q64 */ "Drug hypersensitivity is an unwanted reaction that is not predictably related to dose or ordinary pharmacodynamic action.",
  /* Q65 */ "An idiosyncratic drug reaction is an unpredictable, inherent, qualitatively abnormal response.",
  /* Q66 */ "Drug resistance describes loss of effectiveness of antimicrobial or antitumour drugs.",
  /* Q67 */ "Increased metabolic degradation can contribute to tolerance and drug resistance.",
  /* Q68 */ "Receptor change or loss and mediator exhaustion can contribute to tolerance and drug resistance.",
  /* Q69 */ "Tolerance is not adequately explained by diminished absorption or rapid excretion alone in this comparison.",
  /* Q70 */ "Drug dependence may include tolerance, physical withdrawal, and psychological craving.",
  /* Q71 */ "An abstinence syndrome occurs when stopping a drug produces serious psychological and somatic disturbances.",
  /* Q72 */ "A pharmacokinetic drug interaction alters absorption, distribution, metabolism, or excretion.",
  /* Q73 */ "A pharmacodynamic drug interaction occurs at receptor, cell, enzyme, or organ level.",
  /* Q74 */ "Combining drugs can produce synergism.",
  /* Q75 */ "An additive drug effect equals the sum of the effects produced by the drugs separately.",
  /* Q76 */ "Potentiation is an intensified drug effect produced by a drug combination.",
  /* Q77 */ "Competitive antagonism is a type of drug antagonism.",
  /* Q78 */ "Chemical antagonism occurs when two substances combine to form an inactive compound.",
  /* Q79 */ "A teratogenic effect harms the fetus and can cause fetal malformation.",
  /* Q80 */ "An amount of 2.0 g at a plasma concentration of 25 micrograms per millilitre corresponds to an apparent volume of distribution of 80 litres.",
  /* Q81 */ "High plasma-protein binding tends to reduce apparent volume of distribution.",
  /* Q82 */ "In first-order elimination, clearance remains constant and a constant fraction is eliminated per unit time.",
  /* Q83 */ "Repeated dosing at half-life intervals generally reaches steady state after about four to five half-lives.",
  /* Q84 */ "Muscarinic cholinergic receptors are G-protein-coupled receptors.",
  /* Q85 */ "Continuous agonist exposure can cause receptor down-regulation.",
  /* Q86 */ "Adrenaline and histamine show physiological antagonism because they produce opposite physiological effects.",
  /* Q87 */ "A noncompetitive antagonist reduces the slope of the log dose-response curve and suppresses the maximal response.",
  /* Q88 */ "Urinary alkalinisation reduces renal tubular reabsorption of the weak acid phenobarbital.",
  /* Q89 */ "A drug with a ten-hour half-life reaches near steady state during continuous infusion after about fifty hours.",
]

if (definitions.length !== 89) throw new Error(`Family257 definition count mismatch: ${definitions.length}`)
const replayOf = new Map([[90, 1], [91, 23], [92, 24], [93, 38], [94, 41], [95, 45], [96, 47], [97, 51]])
const conceptSpecs = parsed.slice(0, 89).map((question, index) => {
  const definition = definitions[index]
  const canonical = `teaching.pharma.${slug(definition)}`
  return { ...question, definition, canonical, concept: cid(canonical) }
})
if (new Set(conceptSpecs.map(spec => spec.canonical)).size !== 89) throw new Error('Family257 canonical keys are not unique')
const conceptByNumber = new Map(conceptSpecs.map(spec => [spec.number, spec]))

const questions = parsed.map(question => {
  const base = conceptByNumber.get(replayOf.get(question.number) ?? question.number)
  const correctIndex = letters.indexOf(question.key)
  const anomaly = question.number === 82
  const explanations = question.options.map((option, index) => {
    if (index !== correctIndex) return `This option does not match the pharmacological relationship tested here. ${base.definition}`
    if (anomaly) return 'First-order elimination is ordinarily characterised by a constant fraction eliminated per unit time and constant clearance. The printed key selects a constant amount per unit time, which instead describes zero-order elimination. This Draft item must remain unpublished until faculty resolves the key conflict.'
    return `${base.definition} This makes option ${question.key} the best answer to the stem as written. The remaining options describe different or incompatible pharmacological relationships.`
  })
  return {
    ...question, format: tfNumbers.has(question.number) ? 'true or false' : 'single best answer',
    concept: base.concept, definition: base.definition, canonical: base.canonical, explanations,
    id: `Q-HU102-PHA-F257-${question.ref}`, claim: `CLM-HU102-F257-${question.ref}-01`,
    qCitation: `CIT-HU102-F257-${question.ref}-QUESTION`, kCitation: `CIT-HU102-F257-${question.ref}-KEY`,
    span: `SPN-HU102-F257-${question.ref}-01`, replayOf: replayOf.get(question.number),
  }
})

const sourceRow = row([
  ['id', source], ['title', 'Pharmacology BMS2 question bank'],
  ['institution', "Helwan Medical Students' Union; student-produced pharmacology revision bank"],
  ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Questions/MCQs/MCQs - College MCQs Pharmacology Question Bank-1 (1).pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '18'], ['sha256', expectedSha],
  ['processing_status', 'pending'], ['rights', 'Local student-union revision bank held for internal authoring only; no source page is redistributed.'],
  ['qualification', "Tier-9 Helwan Medical Students' Union auxiliary assessment evidence. Family257 authors all 97 explicitly keyed objective records: 91 MCQ-form operations and 6 true/false operations. Eight terminal semantic replays remain separate source occurrences but reuse the earlier concept IDs. The student-bank answer table is traceable source truth, not an official department key; Q82 carries an explicit medical-key conflict warning and remains Draft."],
  ['is_assessment', 'yes'],
])

const articleRow = row([
  ['id', article], ['title', 'General pharmacology: pharmacokinetics, pharmacodynamics, and drug response'], ['arabic_title', ''],
  ['aliases', 'General pharmacology foundations\nPharmacology BMS2 revision'], ['subject', 'pharm'], ['topic', 'General pharmacology'],
  ['subtopic', 'General pharmacology principles'], ['microtopic', 'Pharmacokinetics and pharmacodynamics'], ['nanotopic', 'Family257 student-union bank'],
  ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'],
  ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '14'], ['high_yield', 'High'], ['time_sensitive', 'stable'],
  ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'],
  ['summary', 'General pharmacology connects drug movement through the body with receptor action, dose-response relationships, repeated exposure, interactions, and safety.'],
  ['sections', `### Definition\nPharmacokinetics describes what the body does to a drug, while pharmacodynamics describes what the drug does to the body.\n\n### Mechanism\nAbsorption, distribution, metabolism, and excretion determine exposure. Receptors, ion channels, carrier proteins, second messengers, and dose-response relationships determine drug effects.\n\n### Key determinants\n${conceptSpecs.map(spec => `- ${spec.definition}`).join('\n')}\n\n### Clinical significance\nRoute, biological barriers, metabolism, elimination, receptor behaviour, repeated exposure, and drug interactions all influence therapeutic and toxic responses.\n\n### Common misconceptions\nDo not confuse pharmacokinetics with pharmacodynamics, potency with efficacy, tolerance with dependence, or first-order with zero-order elimination.`],
  ['published_summary', ''], ['published_sections', ''], ['hold_these', conceptSpecs.map(spec => spec.definition).join('\n')],
  ['lose_the_mark', 'Confusing absorption with receptor action.\nCalling ED50 a measure of efficacy.\nTreating a constant amount eliminated per time as first-order kinetics.'],
  ['related_concepts', conceptSpecs.map(spec => spec.concept).join('\n')], ['related_articles', ''],
  ['question_ids', questions.map(question => question.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'],
  ['module_subject', 'HU-BMS-102 > Pharmacology > General pharmacology > Family257'],
  ['university_notes', "hu: Helwan Medical Students' Union student-produced BMS2 question bank; not an authenticated department exam, dated sitting, or official key."],
  ['annotations', conceptSpecs.map(spec => `### definition_of · ${spec.concept}\nQuote: ${spec.definition}\nBlock: body`).join('\n\n')],
  ['media', ''], ['media_recommendations', ''],
  ['callout_evidence', conceptSpecs.map(spec => {
    const occurrences = questions.filter(question => question.concept === spec.concept)
    return `### ${spec.definition}\nClaims: ${occurrences.map(question => question.claim).join(', ')}\nCitations: ${occurrences.flatMap(question => [question.qCitation, question.kCitation]).join(', ')}\nSpan: ${occurrences.map(question => question.span).join(', ')}`
  }).join('\n\n')],
  ['article_source_ids', source], ['claim_ids', questions.map(question => question.claim).join('\n')], ['span_ids', questions.map(question => question.span).join('\n')],
  ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact Family257 Q1–Q97 stems, option sets, and terminal answer-table cells.'],
  ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required; Q82 has a printed-key conflict requiring resolution.'],
  ['conflicts', 'Q82: the printed key selects constant amount eliminated per unit time for first-order kinetics; standard pharmacology describes a constant fraction with constant clearance.'],
  ['last_reviewed', ''], ['review_due', ''],
  ['notes', 'Complete disposition: 97 raw operations, 97 supplied answers, 97 safe traceable Draft records, 0 unkeyed holds, 0 authority exclusions, and 8 same-source semantic replays linked to 89 source-distinct concepts.'],
  ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No media is required.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
])

const claimsByConcept = new Map()
for (const question of questions) claimsByConcept.set(question.concept, [...(claimsByConcept.get(question.concept) ?? []), question.claim])

const conceptRow = spec => {
  const occurrences = questions.filter(question => question.concept === spec.concept)
  return row([
    ['label', spec.definition], ['id', spec.concept], ['canonical_key', spec.canonical], ['aliases', spec.definition],
    ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', spec.definition],
    ['explicit_objective', `Apply this general-pharmacology relationship: ${spec.definition}`],
    ['pitfalls', spec.number === 82 ? 'Accepting the printed constant-amount key as ordinary first-order kinetics without faculty resolution.' : `Selecting a distractor that conflicts with this relationship: ${spec.definition}`],
    ['concept_type', 'core_knowledge'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'pharm'],
    ['primary_node_id', 'SYS-NEU-T01-S02'], ['secondary_node_ids', 'DIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', 'General pharmacology principles'],
    ['microtopic', spec.number <= 40 ? 'Pharmacokinetics' : 'Pharmacodynamics and drug response'], ['nanotopic', `Family257 ${spec.ref}`],
    ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'],
    ['module_subject', `HU-BMS-102 > Pharmacology > General pharmacology > Family257 > ${spec.ref}`], ['article_ids', article],
    ['related_article_ids', '[clear]'], ['related_concept_ids', '[clear]'], ['resource_ids', source],
    ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.50'],
    ['clinical_relevance', '0.70'], ['academic_relevance', '0.95'], ['weight_confidence', '0.38'], ['confidence', spec.number === 82 ? '0.35' : '0.70'],
    ['exam_signal', occurrences.map(question => `${source} | Family257 ${question.ref} | terminal answer-table cell ${question.key} | Helwan student-union auxiliary source, not an official key`).join('\n')],
    ['atomic_claim_ids', claimsByConcept.get(spec.concept).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', occurrences.map(question => `[Family257 ${question.ref}] ${question.stem} [printed key ${question.key}]`).join('\n')],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'],
    ['conflicts', spec.number === 82 ? 'Printed key A conflicts with the standard distinction between first-order constant-fraction and zero-order constant-amount elimination.' : '[clear]'],
    ['uncertainty', "Student-produced auxiliary answer table; no authenticated department-key approval. Eight terminal replays reuse earlier concept IDs. The source-distinct semantic ledger reports 57 prior-governed scopes and 32 new scopes; this batch emits deterministic full records because most earlier triage scopes had no authored import object."],
    ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'],
    ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''],
    ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family257 objective records.\nsourceCandidateIds: Four-search reconciliation found no authored same-key rival record; deterministic IDs are established for later reuse.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-key rival ID was found.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''],
  ['question', question.stem], ['format', question.format], ['derived_from', question.replayOf ? `Q-HU102-PHA-F257-Q${String(question.replayOf).padStart(3, '0')}` : ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, question.explanations[index]]]),
  ['topic', 'General pharmacology'], ['subtopic', 'General pharmacology principles'], ['difficulty', 'Easy'], ['question_type', 'Pharmacology'],
  ['main_concept', question.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > General pharmacology > Family257 > ${question.ref}`],
  ['clinical_relevance', '0.70'], ['academic_relevance', '0.95'], ['cognitive_effort_score', '0.36'], ['exam_weight_by_year', 'HU_Y1=0.50'],
  ['question_only_for', 'HU_Y1'], ['concept_ids', '[clear]'], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
  ['reasoning_level', '1'], ['inferred_difficulty', '68'], ['exam_relevance', '5'], ['contextual_concept_ids', '[clear]'], ['library_ids', article], ['resource_ids', source],
  ['learning_objective', `Apply this relationship: ${question.definition}`], ['media_recommendations', ''],
  ['source_citation', `${source}, Family257 ${question.ref}, PDF p${question.page} with terminal answer-table cell ${question.key} on p18. Student-union auxiliary authority only.`],
  ['attachments', ''], ['attached_image', ''],
  ['author_notes', `Literal stem, option order, and terminal answer-table letter are preserved from the native PDF. ${question.replayOf ? `Same-source semantic replay of Q${question.replayOf}; the occurrence remains distinct and reuses its concept ID.` : 'Source-distinct handle.'}${question.number === 82 ? ' Medical conflict: printed key A states constant amount for first-order kinetics; keep Draft until faculty resolves it.' : ''} No official exam, official key, dated sitting, practical authority, or patient-specific guidance is inferred.`],
  ['estimated_seconds', question.format === 'true or false' ? '45' : '60'], ['randomise_answers', question.format === 'true or false' ? 'no' : 'yes'],
])

const claimRows = questions.map(question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'pharm'], ['predicate', 'is source-keyed as'],
  ['object', question.options[letters.indexOf(question.key)]], ['display_text', question.definition], ['risk_class', 'foundational_stable'],
  ['verification_status', 'needs_evidence'], ['conflict_status', question.number === 82 ? 'possible' : 'none'], ['confidence', question.number === 82 ? '0.30' : '0.70'],
  ['freshness', 'source_created_2020-02-09'], ['time_sensitive', 'no'],
  ['qualifiers', `authority: Helwan student-union auxiliary assessment, not official key; occurrence: Family257 ${question.ref};${question.replayOf ? ` semantic replay of Q${question.replayOf};` : ''}${question.number === 82 ? ' printed-key medical conflict;' : ''}`],
]))

const citationRows = questions.flatMap(question => [
  row([['id', question.qCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.stem} ${question.options.map((option, index) => `${letters[index]}) ${option}`).join(' | ')}`],
    ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family257 ${question.ref}`], ['locator_detail', 'Exact native-text prompt and option structure'],
    ['context_note', "Helwan Medical Students' Union auxiliary revision bank; not an authenticated department exam or official key."], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']]),
  row([['id', question.kCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
    ['support_span', `${question.number} ${question.key}`], ['locator_type', 'page'], ['locator_page', '18'], ['locator_section', 'Answers'], ['locator_detail', `Terminal answer-table cell for ${question.ref}`],
    ['context_note', question.number === 82 ? 'The student-bank key is traceable but medically conflicts with standard first-order kinetics; faculty resolution is required.' : 'Student-bank supplied answer; not an official department key.'],
    ['confidence', '0.99'], ['counts_as_claim_evidence', 'no']]),
])

const spanRows = questions.map(question => row([
  ['id', question.span], ['article_id', article], ['section_id', `${article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', question.definition],
  ['claim_ids', question.claim], ['citation_ids', `${question.qCitation}\n${question.kCitation}`],
]))

const relationPairs = [[1, 5], [1, 9], [1, 23], [1, 26], [1, 41], [41, 44], [41, 47], [41, 50], [41, 59], [41, 72], [60, 61], [60, 62], [63, 66], [63, 70], [74, 75], [74, 76], [74, 77], [9, 12], [23, 25], [47, 48]]
const relationRows = relationPairs.map(([fromNumber, toNumber]) => {
  const from = conceptByNumber.get(fromNumber)
  const to = conceptByNumber.get(toNumber)
  const fromQuestion = questions[fromNumber - 1]
  const toQuestion = questions[toNumber - 1]
  return row([
    ['source', from.concept], ['type', 'related_concepts'], ['target', to.concept], ['evidence_claim_ids', `${fromQuestion.claim}\n${toQuestion.claim}`],
    ['citation_ids', `${fromQuestion.qCitation}\n${toQuestion.qCitation}`], ['verification_status', 'needs_evidence'], ['confidence', '0.66'],
    ['qualifiers', `scope: ${from.canonical} is related to ${to.canonical}`], ['reviewer', 'Medical team, Admin team'],
  ])
})

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family257-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family257-articles.md', articleRow],
  ['concept/HU-BMS-102-pharmacology-family257-concepts.md', rows(conceptSpecs.map(conceptRow))],
  ['evidence/HU-BMS-102-pharmacology-family257-claims.md', rows(claimRows)],
  ['evidence/HU-BMS-102-pharmacology-family257-citations.md', rows(citationRows)],
  ['evidence/HU-BMS-102-pharmacology-family257-spans.md', rows(spanRows)],
  ['relations/HU-BMS-102-pharmacology-family257-relations.md', rows(relationRows)],
  ['question/HU-BMS-102-pharmacology-family257-mcq.md', rows(questions.map(questionRow))],
])

for (const [relative, contents] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${contents.trim()}\n`)
}

console.log(JSON.stringify({
  family: 257, rawPrompts: 97, sourceAnswers: 97, safeRecords: 97, holds: 0, exclusions: 0,
  formats: { mcq: 91, trueFalse: 6 }, acceptedHandles: 89, semanticReplays: 8,
  semanticPriorReuses: 57, semanticConceptDelta: 32, emittedConceptRecords: conceptSpecs.length,
  articles: 1, questions: questions.length, claims: claimRows.length, citations: citationRows.length,
  spans: spanRows.length, relations: relationRows.length, emitted: [...files.keys()],
}, null, 2))
