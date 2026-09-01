import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_992325268b40230b61a5'
const letters = 'ABCDE'
const hashId = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const A = {
  adrenaline: 'ART-HU-BMS102-PHA-F223P2-ADRENALINE',
  availability: 'ART-HU-BMS102-PHA-F223P2-BIOAVAILABILITY-FIRST-PASS',
  transfer: 'ART-HU-BMS102-PHA-F223P2-MEMBRANE-TRANSFER',
  scope: 'ART-HU-BMS102-PHA-F223P2-PHARMACOKINETICS-SCOPE',
}
const newKeys = {
  hypotension: 'teaching.pharma.adrenaline.hypotension-use',
  synonym: 'teaching.pharma.adrenaline.epinephrine-synonym',
  stomachWeakBase: 'teaching.pharma.absorption.stomach-weak-base-high-pka',
}
const C = {
  hypotension: hashId(newKeys.hypotension),
  synonym: hashId(newKeys.synonym),
  cardiacBeta1: 'CON-REN-E518604E062D82',
  bioavailability: 'CON-FND-CF40F32A8A74A0',
  barrier: 'CON-FND-3CECD012838275',
  diffusion: 'CON-FND-584FCF6897C35E',
  kineticsScope: 'CON-FND-6BB35F11EBD54B',
  stomachWeakBase: hashId(newKeys.stomachWeakBase),
}
if (C.hypotension !== 'CON-FND-F654DC0371712B' || C.synonym !== 'CON-FND-FB30B223B0C1DC' || C.stomachWeakBase !== 'CON-FND-34E605BD473761') throw new Error('deterministic concept id drift')

const conceptInfo = {
  [C.hypotension]: {
    key: newKeys.hypotension,
    label: 'The source marks adrenaline as usable for hypotension, without specifying a clinical setting',
    definition: 'Family223 Q13 presents “Adrenaline can be used to treat hypotension” and prints True. This source-bounded review-bank statement does not define the cause or severity of hypotension and is not a general treatment recommendation.',
    objective: 'Recognise the source-keyed statement while stating that indication, setting, dose and current-guideline authority are absent.',
    pitfalls: 'Turning a broad review-bank statement into an instruction to use adrenaline for every hypotensive patient. The carrier supplies no clinical context or prescribing authority.',
    type: 'source_bounded_assessment', primary: 'DIS-PHA-T03', subtopic: 'Autonomic pharmacology', microtopic: 'Adrenaline', nanotopic: 'Source-bounded hypotension use',
  },
  [C.synonym]: {
    key: newKeys.synonym,
    label: 'Adrenaline and epinephrine are names for the same catecholamine',
    definition: 'Adrenaline is the international nonproprietary name commonly used in many countries, while epinephrine is the United States adopted name for the same drug molecule.',
    objective: 'Identify epinephrine as the synonym of adrenaline without confusing it with norepinephrine, ephedrine or amphetamine.',
    pitfalls: 'Treating norepinephrine as another spelling of adrenaline. Norepinephrine is noradrenaline, a related but distinct catecholamine.',
    type: 'definition', primary: 'DIS-PHA-T03', subtopic: 'Autonomic pharmacology', microtopic: 'Adrenaline', nanotopic: 'Adrenaline–epinephrine synonym',
  },
  [C.cardiacBeta1]: {
    key: 'teaching.pharma.adrenaline.beta1-cardiac-effects',
    label: 'Beta-1 stimulation by adrenaline increases contractility, rate, conduction, and excitability',
    definition: 'Adrenaline stimulates cardiac beta-1 receptors, increasing heart rate, contractile force, conduction and excitability. Family223 Q15 asks only for the primary receptor subtype responsible for its cardiac effects.',
    objective: 'Identify beta-1 as the source-keyed receptor subtype for adrenaline effects on the heart.',
    pitfalls: 'Choosing beta-2 because adrenaline can activate beta receptors broadly. Beta-2 is especially associated with smooth-muscle relaxation, whereas the printed cardiac answer is beta-1.',
    type: 'mechanism', primary: 'DIS-PHA-T03', subtopic: 'Autonomic pharmacology', microtopic: 'Adrenergic receptors', nanotopic: 'Adrenaline cardiac beta-1 effects',
  },
  [C.stomachWeakBase]: {
    key: newKeys.stomachWeakBase,
    label: 'Among the printed choices, amphetamine is least absorbed in the acidic stomach because its high-pKa weak base is predominantly ionised',
    definition: 'In the acidic stomach, a weak base with a high pKa is predominantly protonated and ionised. The printed option set therefore keys amphetamine (pKa 9.9) as the least absorbed there, because the ionised fraction crosses lipid membranes poorly.',
    objective: 'Use acid–base ionisation and the printed pKa values to identify the least stomach-absorbed option.',
    pitfalls: 'Reading the highest pKa as the highest absorption regardless of pH. For a weak base in an acidic compartment, greater protonation means less non-ionised drug available for passive transfer.',
    type: 'application', primary: 'SYS-FND-T04-S01-M01', subtopic: 'Pharmacokinetics', microtopic: 'Absorption', nanotopic: 'Stomach absorption of a high-pKa weak base',
  },
}

const specs = [
  { ref: 'Q13', key: 'A', concept: C.hypotension, article: A.adrenaline, stem: 'Adrenaline can be used to treat hypotension.', options: ['True', 'False'], format: 'true_false', page: '3', paint: true, teaching: 'The review bank prints True for this statement. The carrier does not specify the clinical setting, cause of hypotension, dose, or current guideline. Retain it only as a source-bounded study-bank answer, never as a prescribing recommendation.' },
  { ref: 'Q14', key: 'A', concept: C.synonym, article: A.adrenaline, stem: 'Adrenaline is also known as ……………………………', options: ['Epinephrine', 'Norepinephrine', 'Ephedrine', 'Amphetamine'], page: '3', paint: true, teaching: 'The source keys epinephrine. Adrenaline and epinephrine are names for the same drug molecule. Norepinephrine, ephedrine and amphetamine are distinct compounds. This is a naming distinction, not a claim that the distractors have equivalent actions.' },
  { ref: 'Q15', key: 'C', concept: C.cardiacBeta1, article: A.adrenaline, stem: 'The primary receptor subtype responsible for the effects of adrenaline on\n  the heart is the …………………….. receptor.', options: ['Alpha-1', 'Alpha-2', 'Beta-1', 'Beta-2'], page: '3', paint: true, teaching: 'The source keys Beta-1. Cardiac beta-1 stimulation raises rate and contractile force and supports conduction. Beta-2 is more strongly associated with smooth-muscle relaxation in this introductory distinction.' },
  { ref: 'Q16', key: 'B', concept: C.bioavailability, article: A.availability, stem: 'Bioavailability is the fraction or percentage of administered drug that\n  reaches the systemic circulation via a given route as compared to what\n  route?', options: ['Oral', 'IV (intravenous)', 'SC', 'CSF (cerebrospinal fluid)', 'IM'], page: '3', teaching: 'The source keys IV (intravenous). Intravenous administration is the reference because the administered dose enters systemic circulation directly and has complete bioavailability by definition. Other routes are compared with that reference.' },
  { ref: 'Q17', key: 'D', concept: C.bioavailability, article: A.availability, stem: 'What organ is responsible for metabolism in the “first pass effect”?', options: ['Brain', 'Heart', 'Kidney', 'Liver', 'Spleen'], page: '3', teaching: 'The source keys Liver. The liver is the organ singled out in the printed option set and is a major site of presystemic metabolism. The governed concept also retains gut-wall contribution. Therefore the printed organ answer must not be expanded into an exclusive “liver only” claim.' },
  { ref: 'Q18', key: 'D', concept: C.barrier, article: A.transfer, stem: 'In order for drugs to cross the blood-brain barrier, they must be:', options: ['Ionized', 'Positively charged', 'Water soluble', 'Lipid soluble', 'Negatively charged'], page: '4', teaching: 'The source keys Lipid soluble. Lipid-soluble, non-ionised drug crosses the lipid barrier more readily than charged or strongly water-soluble drug. This is a general permeability principle, not a guarantee that every lipid-soluble drug reaches a therapeutic brain concentration.' },
  { ref: 'Q19', key: 'E', concept: C.diffusion, article: A.transfer, stem: 'Rate of drug absorption would be increased by which of the following?', options: ['Drug ionization', 'Water solubility', 'Positively charged drug', 'Negatively charged drug', 'Lipid solubility'], page: '4', teaching: 'The source keys Lipid solubility. Greater lipid solubility favours passive diffusion through the membrane lipid in this option set. Ionisation and charge reduce the freely diffusible fraction. The comparison is qualitative and source-bounded.' },
  { ref: 'Q20', key: 'C', concept: C.kineticsScope, article: A.scope, stem: 'Pharmacokinetics include:', options: ['Localization of the drug', 'Mechanism of drug action', 'Excretion of substances', 'Interaction of substances', 'The effect of drug on body control system'], page: '4', teaching: 'The source keys Excretion of substances. Excretion is one of absorption, distribution, metabolism and excretion—the ADME processes within pharmacokinetics. Mechanism and effect of a drug on the body belong to pharmacodynamics.' },
  { ref: 'Q22', key: 'E', concept: C.stomachWeakBase, article: A.transfer, stem: 'Which of the following drugs would be absorbed to the least extent in the\n  stomach?', options: ['Ampicillin (pKa = 2.5)', 'Aspirin (pKa = 3.5)', 'Warfarin (pKa = 5)', 'Phenobarbital (pKa = 7.9)', 'Amphetamine (pKa = 9.9)'], page: '4', teaching: 'The source keys Amphetamine (pKa = 9.9). As a weak base in acidic stomach contents, amphetamine is predominantly protonated and ionised, limiting passive membrane transfer. The comparison is bounded to the printed identities and pKa values and is not a dosing or toxicity instruction.' },
  { ref: 'Q24', key: 'A', concept: C.diffusion, article: A.transfer, stem: 'A hydrophilic (water-soluble) medicinal agent has the following property:', options: ['Low ability to penetrate through the cell membrane lipids', 'Penetrates through membranes by means of endocytosis', 'Easy permeation through the BBB', 'High reabsorption in renal tubules'], page: '5', teaching: 'The source keys Low ability to penetrate through the cell membrane lipids. Hydrophilic drug has limited passive passage through the hydrophobic membrane core. Water solubility alone does not imply endocytosis, easy blood-brain-barrier entry, or high tubular reabsorption.' },
]
const row = fields => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const questions = specs.map(spec => ({ ...spec, format: spec.format ?? 'single best answer', id: `Q-HU102-PHA-F223-P2-${spec.ref}`, claim: `CLM-HU102-F223-P2-${spec.ref}-01`, qCitation: `CIT-HU102-F223-P2-${spec.ref}-QUESTION`, kCitation: `CIT-HU102-F223-P2-${spec.ref}-KEY`, span: `SPN-HU102-F223-P2-${spec.ref}-01` }))
const grouped = Object.groupBy(questions, question => question.article)

const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(value => value.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`missing ${id} in ${path}`)
  return block.slice(block.indexOf('# Item')).trim()
}
const get = (block, name) => block.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, name, value) => block.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const setOrInsert = (block, name, value, before = 'field_notes') => block.includes(`## ${name}\n`) ? set(block, name, value) : block.replace(`\n## ${before}\n`, `\n## ${name}\n${value}\n## ${before}\n`)
const append = (block, name, values) => {
  const existing = get(block, name).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!existing.includes(value)) existing.push(value)
  return setOrInsert(block, name, existing.join('\n'))
}

const articleInfo = {
  [A.adrenaline]: { title: 'Adrenaline: name, cardiac receptor and source-bounded use', subtopic: 'Autonomic pharmacology', microtopic: 'Adrenaline', nanotopic: 'Synonym, beta-1 effects and source-bounded indication', primary: 'DIS-PHA-T03', summary: 'A source-faithful review of the adrenaline–epinephrine synonym, cardiac beta-1 receptor and a deliberately limited review-bank statement about hypotension.', sections: `### Definition
Adrenaline and epinephrine are two names for the same catecholamine. Family223 Q14 tests that synonym, while Q15 identifies beta-1 as the primary receptor subtype responsible for its cardiac effects.

### Mechanism
Cardiac beta-1 stimulation increases rate, contractile force, conduction and excitability. The receptor statement explains a cardiac effect but does not itself establish every clinical use of the drug.

### Key determinants
Family223 Q13 separately prints True for “Adrenaline can be used to treat hypotension.” The carrier gives no cause, severity, setting, dose, guideline or official-key authority, so this Draft preserves the answer only as a source-bounded review-bank occurrence.

### Clinical significance
Clinical use depends on the type of shock or hypotension and current protocols. This article deliberately gives no patient-specific recommendation or administration instruction.

### Common misconceptions
Epinephrine is not norepinephrine. A broad source statement about hypotension must not be converted into a universal indication.` },
  [A.availability]: { title: 'Bioavailability reference and the first-pass liver answer', subtopic: 'Pharmacokinetics', microtopic: 'Absorption', nanotopic: 'Intravenous reference and first-pass metabolism', primary: 'SYS-FND-T04-S01-M01', summary: 'A source-bounded explanation of intravenous administration as the bioavailability reference and the liver as the organ printed for first-pass metabolism.', sections: `### Definition
Bioavailability is the fraction of an administered dose that reaches systemic circulation unchanged. Intravenous administration is the comparison reference because its bioavailability is complete by definition.

### Mechanism
Non-intravenous routes can lose drug before systemic entry. After oral absorption, presystemic metabolism may occur in the gut wall and liver; Family223 Q17 nevertheless asks which organ is responsible and keys liver from its printed options.

### Key determinants
Route, absorption and presystemic metabolism are separate determinants. The source pairing does not justify calling the liver the only possible first-pass site.

### Clinical significance
Bioavailability comparisons help describe exposure, but this Draft introduces no dose conversion or prescribing instruction.

### Common misconceptions
Do not equate bioavailability with absorption alone. Do not turn the Q17 organ answer into a claim that gut-wall first-pass metabolism cannot occur.` },
  [A.transfer]: { title: 'Lipid solubility, membrane transfer and acidic-stomach ionisation', subtopic: 'Pharmacokinetics', microtopic: 'Membrane transfer', nanotopic: 'Lipid solubility, BBB and stomach absorption', primary: 'SYS-FND-T04-S01-M01', summary: 'A review of how lipid solubility and ionisation shape passive membrane transfer, blood-brain-barrier penetration and the printed stomach-absorption comparison.', sections: `### Definition
Passive diffusion through membrane lipid favours the lipid-soluble, non-ionised fraction of a drug. A hydrophilic drug therefore has a low ability to penetrate cell-membrane lipid by that route.

### Mechanism
The blood-brain barrier likewise favours lipid-soluble, non-ionised, unbound drug. In acidic stomach contents, a weak base with a high pKa is mostly protonated and ionised, which is why Family223 Q22 keys amphetamine among its printed choices.

### Key determinants
Family223 Q18 keys lipid soluble for blood-brain-barrier passage, Q19 keys lipid solubility as increasing absorption rate, and Q24 keys low membrane-lipid penetration for a hydrophilic agent. These are qualitative comparisons bounded to the source options.

### Clinical significance
Permeability principles describe transfer tendencies, not assured therapeutic concentrations. No formulation, dosing or overdose procedure is introduced.

### Common misconceptions
Water solubility does not automatically mean endocytosis, and a charged drug does not cross membrane lipid more readily merely because it is dissolved.` },
  [A.scope]: { title: 'Pharmacokinetics includes excretion', subtopic: 'General pharmacology', microtopic: 'Pharmacokinetics versus pharmacodynamics', nanotopic: 'Excretion within ADME', primary: 'SYS-FND-T04', summary: 'A concise distinction placing excretion within pharmacokinetics rather than pharmacodynamics.', sections: `### Definition
Pharmacokinetics describes what the body does to a drug through absorption, distribution, metabolism and excretion. Pharmacodynamics describes what the drug does to the body.

### Mechanism
Excretion removes drug or metabolites from the body and is therefore one of the ADME processes. Mechanism of drug action and effects on body control systems sit on the pharmacodynamic side of the distinction.

### Key determinants
Family223 Q20 offers several broad phrases but prints C, “Excretion of substances.” The answer is preserved as an occurrence from an instructor-attributed review bank, not an authenticated departmental key.

### Clinical significance
Correctly classifying excretion prevents confusion between concentration over time and drug effect. This Draft contains no clearance calculation or dosing rule.

### Common misconceptions
Pharmacokinetics is not merely the speed of drug action, and pharmacodynamics is not a synonym for drug interaction.` },
}

const articleRow = id => {
  const qs = grouped[id], info = articleInfo[id], concepts = [...new Set(qs.map(q => q.concept))]
  return row([
    ['id', id], ['title', info.title], ['arabic_title', ''], ['aliases', `Family223 Part2 ${info.subtopic}\nHU-BMS-102 pharmacology review`], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', info.subtopic], ['microtopic', info.microtopic], ['nanotopic', info.nanotopic], ['primary_node_id', info.primary], ['secondary_node_ids', 'DIS-PHA-T01\nDIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '5'], ['high_yield', 'High'], ['time_sensitive', id === A.adrenaline ? 'time_sensitive' : 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pharmacology faculty'], ['final_publisher', 'Admin team'], ['summary', info.summary], ['sections', `${info.sections}\n\n### Source-tested concept lines\n${concepts.map(concept => conceptInfo[concept]?.label ?? getConceptField(concept, 'label')).join('\n')}`], ['published_summary', ''], ['published_sections', ''], ['hold_these', concepts.map(concept => conceptInfo[concept]?.label ?? getConceptField(concept, 'label')).join('\n')], ['lose_the_mark', 'Treating a tier-6 review-bank answer as an official departmental key.\nExtending the source beyond the exact option set or explicit limitation.'], ['related_concepts', concepts.join('\n')], ['related_articles', Object.values(A).filter(article => article !== id).join('\n')], ['question_ids', qs.map(q => q.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part2 > ${info.subtopic}`], ['university_notes', 'hu: Tier-6 instructor-attributed keyed review-bank evidence only; no dated exam, marks or official departmental key.'], ['annotations', concepts.map(concept => `### definition_of · ${concept}\nQuote: ${conceptInfo[concept]?.label ?? getConceptField(concept, 'label')}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''], ['callout_evidence', qs.map(q => `### ${conceptInfo[q.concept]?.label ?? getConceptField(q.concept, 'label')}\nClaims: ${q.claim}\nCitations: ${q.qCitation}, ${q.kCitation}\nSpan: ${q.span}`).join('\n\n')], ['article_source_ids', source], ['claim_ids', qs.map(q => q.claim).join('\n')], ['span_ids', qs.map(q => q.span).join('\n')], ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Family223 PDF physical pages 2-4 preserve exact native stems/options and aligned right-column study-answer letters; Q13-Q15 have an explicit paint-layer limitation.'], ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required before publication.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''], ['notes', 'Question-led Family223 Part2 safe slice only. Q21 and Q23 remain schema holds; no marks, official-key authority, written or practical records inferred.'], ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
}

const basePaths = {
  [C.bioavailability]: join(root, 'concept', 'HU-BMS-102-pharmacology-family223-part1-concepts.md'),
  [C.barrier]: join(repo, 'docs', 'Kasr-Source-Imports', 'concept', '108-INT-concepts-pharmacology.md'),
  [C.diffusion]: join(root, 'concept', 'HU-BMS-102-pharmacology-family223-part1-concepts.md'),
  [C.kineticsScope]: join(repo, 'docs', 'Kasr-Source-Imports', 'concept', '108-INT-concepts-pharmacology.md'),
}
const newConceptBlock = id => {
  const info = conceptInfo[id], qs = questions.filter(q => q.concept === id)
  return row([
    ['label', info.label], ['id', id], ['canonical_key', info.key], ['definition', info.definition], ['explicit_objective', info.objective], ['pitfalls', info.pitfalls], ['concept_type', info.type], ['status', 'under review'], ['support_mode', info.type === 'source_bounded_assessment' ? 'assessment_occurrence' : 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', info.primary], ['secondary_node_ids', 'DIS-PHA-T01\nDIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', info.subtopic], ['microtopic', info.microtopic], ['nanotopic', info.nanotopic], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part2 > ${info.microtopic} > ${info.nanotopic}`], ['universities', 'hu'], ['learner_years', '1'], ['aliases', info.label], ['arabic_label', ''], ['arabic_aliases', ''], ['article_ids', [...new Set(qs.map(q => q.article))].join('\n')], ['related_article_ids', id === C.stomachWeakBase ? A.availability : 'ART-HU-BMS102-PHA-F223P1-AUTONOMIC-TRANSMISSION'], ['related_concept_ids', '[clear]'], ['exam_signal', qs.map(q => `${source} | Family223 Part2 ${q.ref} | PDF source p${q.page} | tier-6 keyed review bank; not official key`).join('\n')], ['blueprint_weight', '0.42'], ['exam_weight_by_year', 'HU_Y1=0.42'], ['clinical_relevance', id === C.hypotension ? '0.72' : '0.58'], ['academic_relevance', '0.88'], ['weight_confidence', '0.38'], ['confidence', id === C.hypotension ? '0.58' : '0.74'], ['original_wording', qs.map(q => `[Family223 Part2 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['atomic_claim_ids', qs.map(q => q.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['uncertainty', id === C.hypotension ? 'The statement is clinically under-specified; no cause, setting or guideline is supplied.' : '[clear]'], ['evidence_gaps', 'Independent medical verification and Helwan pharmacology faculty review are required before publication.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pharmacology faculty'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'authored_needs_independent_evidence'], ['exclusion_reason', ''], ['field_notes', `deterministicId: ${id} is SHA-256(canonical_key), first 14 uppercase hex, with CON-FND prefix.\nmicrotopicId: No dedicated taxonomy microtopic exists for this exact first-year source grain; module_subject carries the reviewed placement.\nnanotopicId: No dedicated taxonomy nanotopic exists for this exact first-year source grain; module_subject carries the reviewed placement.\narabicLabel: Blank pending terminology review.\napprovedFileResourceIds: No source is rights-cleared for redistribution.\napprovedVideoResourceIds: No video is attached.\nresourceOccurrenceIds: No corpus occurrence ID exists for this local review-bank item.\nsourceCandidateIds: No exact governed concept with this semantic grain was found before minting.\nmergeIds: Nothing has been merged.\nrejectedMergeCandidateIds: No same-grain candidate was found.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first review.\nexclusionReason: Not excluded; publication_status carries the evidence gate.`],
  ])
}
const betaBlock = () => {
  const info = conceptInfo[C.cardiacBeta1], qs = questions.filter(q => q.concept === C.cardiacBeta1)
  return row([
    ['label', info.label], ['id', C.cardiacBeta1], ['canonical_key', info.key], ['definition', info.definition], ['explicit_objective', info.objective], ['pitfalls', info.pitfalls], ['concept_type', info.type], ['status', 'under review'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', info.primary], ['secondary_node_ids', 'SYS-NEU-T01-S02\nDIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', info.subtopic], ['microtopic', info.microtopic], ['nanotopic', info.nanotopic], ['modules', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pharmacology > Family223 Part2 > Autonomic pharmacology > Adrenaline cardiac beta-1 effects'], ['universities', 'hu'], ['learner_years', '1'], ['aliases', 'Cardiac beta-1 effects of adrenaline\nEpinephrine beta-1 cardiac effects'], ['arabic_label', ''], ['arabic_aliases', ''], ['article_ids', A.adrenaline], ['related_article_ids', 'ART-HU-BMS102-PHA-F223P1-AUTONOMIC-TRANSMISSION'], ['related_concept_ids', C.synonym], ['exam_signal', `${source} | Family223 Part2 Q15 | PDF source p3 | tier-6 keyed review bank; not official key`], ['blueprint_weight', '0.45'], ['exam_weight_by_year', 'HU_Y1=0.45'], ['clinical_relevance', '0.72'], ['academic_relevance', '0.90'], ['weight_confidence', '0.40'], ['confidence', '0.82'], ['original_wording', `[Family223 Part2 Q15] ${qs[0].stem} [printed answer C]`], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['atomic_claim_ids', qs[0].claim], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['uncertainty', '[clear]'], ['evidence_gaps', 'Independent medical verification and Helwan pharmacology faculty review are required before publication.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pharmacology faculty'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'authored_needs_independent_evidence'], ['exclusion_reason', ''], ['field_notes', 'exactIdReuse: This governed ID already names the exact beta-1/adrenaline cardiac semantic grain; it is completed here as a standalone record rather than referenced as a sparse assumed-live stub.\ncanonicalKey: Added deterministically to the existing governed ID; no other record uses this key.\nmicrotopicId: No dedicated taxonomy microtopic exists for this exact first-year source grain; module_subject carries the reviewed placement.\nnanotopicId: No dedicated taxonomy nanotopic exists for this exact first-year source grain; module_subject carries the reviewed placement.\narabicLabel: Blank pending terminology review.\napprovedFileResourceIds: No source is rights-cleared for redistribution.\napprovedVideoResourceIds: No video is attached.\nresourceOccurrenceIds: No corpus occurrence ID exists.\nsourceCandidateIds: Cleared because this exact governed ID is reused.\nmergeIds: Nothing has been merged.\nrejectedMergeCandidateIds: No same-grain rival exists.\nlastReviewed: New Draft overlay; no faculty review has occurred.\nreviewDue: Set after first review.\nexclusionReason: Not excluded; publication_status carries the evidence gate.'],
  ])
}
const reusedBlock = id => {
  const qs = questions.filter(q => q.concept === id)
  let block = extract(basePaths[id], id)
  block = append(block, 'article_ids', [...new Set(qs.map(q => q.article))])
  block = append(block, 'atomic_claim_ids', qs.map(q => q.claim))
  block = append(block, 'learner_years', ['1'])
  block = append(block, 'exam_signal', qs.map(q => `${source} | Family223 Part2 ${q.ref} | PDF source p${q.page} | tier-6 keyed review bank; not official key`))
  block = append(block, 'original_wording', qs.map(q => `[Family223 Part2 ${q.ref}] ${q.stem} [printed answer ${q.key}]`))
  block = setOrInsert(block, 'resource_ids', source)
  for (const [name, value] of [['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]']]) block = setOrInsert(block, name, value)
  block = setOrInsert(block, 'field_notes', `${get(block, 'field_notes')}\nfamily223Part2Reuse: Exact governed ID, canonical key and teaching semantics are preserved; reciprocal Family223 Part2 article, source, claim and wording links are appended.\nstandaloneLiveCreate: This complete row may create the governed concept if absent live; resource_ids therefore names only the source supplied in this atomic batch.`)
  if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${id} is not needs_evidence`)
  return block
}
const getConceptField = (id, name) => conceptInfo[id]?.[name] ?? get(id === C.cardiacBeta1 ? betaBlock() : reusedBlock(id), name)
const conceptRows = [C.hypotension, C.synonym, C.cardiacBeta1, C.bioavailability, C.barrier, C.diffusion, C.kineticsScope, C.stomachWeakBase].map(id => id === C.cardiacBeta1 ? betaBlock() : basePaths[id] ? reusedBlock(id) : newConceptBlock(id))

const optionExplanation = (q, index) => {
  if (letters[index] === q.key) return q.teaching
  const answer = q.options[letters.indexOf(q.key)]
  return `This is not the printed answer for this occurrence. The review bank prints ${q.key}, “${answer}.” The linked Draft teaching preserves that source answer and its stated evidence limits.`
}
const questionRow = q => row([
  ['id', q.id], ['title', q.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', q.format === 'true_false' ? 'Classify the source statement as True or False.' : ''], ['question', q.stem], ['format', q.format], ['derived_from', ''], ['correct_answer', q.key],
  ...q.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, optionExplanation(q, index)]]),
  ['topic', 'General pharmacology'], ['subtopic', articleInfo[q.article].subtopic], ['difficulty', 'Moderate'], ['question_type', 'Pharmacology'], ['main_concept', q.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part2 > ${q.ref}`], ['clinical_relevance', q.ref === 'Q13' ? '0.72' : '0.64'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.50'], ['exam_weight_by_year', 'HU_Y1=0.58'], ['question_only_for', 'HU_Y1'], ['concept_ids', q.concept], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'], ['reasoning_level', q.ref === 'Q22' ? '2' : '1'], ['inferred_difficulty', q.ref === 'Q22' ? '58' : '47'], ['exam_relevance', '6'], ['contextual_concept_ids', q.ref === 'Q13' ? C.synonym : ''], ['library_ids', q.article], ['resource_ids', source], ['learning_objective', conceptInfo[q.concept]?.objective ?? getConceptField(q.concept, 'explicit_objective')], ['media_recommendations', ''], ['source_citation', `${source}, Family223 Part2 ${q.ref}, PDF physical p${Number(q.page) - 1}/source p${q.page}: ${q.paint ? 'coherent native stem/options and aligned key survive extraction, but the question does not paint visibly in the rendered page; ' : 'literal visible stem/options and aligned right-column key; '}tier-6 review-bank authority only.`], ['attachments', ''], ['attached_image', ''], ['author_notes', `${q.paint ? 'Source rendering limitation: the complete coherent native text/options and aligned right-column key survive both layout and raw extraction, but this question does not paint visibly on the rendered page. ' : ''}Literal wording, line breaks, punctuation, option order and printed answer preserved. No marks, sitting, official-key authority, or clinical recommendation inferred.`], ['estimated_seconds', q.ref === 'Q22' ? '90' : '60'], ['randomise_answers', 'yes'],
])
const claimRow = q => row([['id', q.claim], ['concept_id', q.concept], ['subject', 'pharm'], ['predicate', 'is printed as'], ['object', q.options[letters.indexOf(q.key)]], ['display_text', `${q.ref}: the review bank prints ${q.key}, ${q.options[letters.indexOf(q.key)]}.`], ['risk_class', q.ref === 'Q13' ? 'clinical_non_treatment' : 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', q.paint ? '0.62' : '0.74'], ['freshness', 'source_date_unverified'], ['time_sensitive', 'no'], ['qualifiers', `tier-6 review bank, not official key; Family223 Part2 ${q.ref}${q.paint ? '; native text/key survive but question paint layer is absent' : ''}`]])
const citationRow = (q, key) => row([['id', key ? q.kCitation : q.qCitation], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', key ? `Right-column printed answer: ${q.key}` : `${q.stem} Options: ${q.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`], ['locator_type', 'page'], ['locator_page', q.page], ['locator_section', `Family223 Part2 ${q.ref}`], ['locator_detail', key ? `Aligned right-column letter${q.paint ? '; native extraction survives but glyph is not painted' : ''}` : `Exact ${q.paint ? 'native-extracted' : 'visible'} stem and ${q.options.length} options`], ['context_note', `Instructor-attributed keyed review bank; not an authenticated exam or official key.${q.paint ? ' Q13-Q15 have a paint-layer anomaly explicitly retained.' : ''}`], ['confidence', q.paint ? '0.78' : '0.98'], ['counts_as_claim_evidence', 'no']])
const spanRow = q => row([['id', q.span], ['article_id', q.article], ['section_id', `${q.article.toLowerCase()}-${q.ref.toLowerCase()}`], ['text', conceptInfo[q.concept]?.label ?? getConceptField(q.concept, 'label')], ['claim_ids', q.claim], ['citation_ids', `${q.qCitation}\n${q.kCitation}`]])
const relationRows = [
  [C.synonym, 'related_concepts', C.cardiacBeta1, ['Q14', 'Q15'], 'scope: the source names adrenaline as epinephrine and separately keys beta-1 for its cardiac effects'],
  [C.barrier, 'related_concepts', C.diffusion, ['Q18', 'Q19'], 'scope: the source separately links lipid solubility to BBB passage and increased absorption rate'],
  [C.stomachWeakBase, 'related_concepts', C.diffusion, ['Q22', 'Q24'], 'scope: the source separately tests stomach ionisation and hydrophilic membrane penetration'],
].map(([from, type, to, refs, qualifier]) => {
  const qs = refs.map(ref => questions.find(question => question.ref === ref))
  return row([['source', from], ['type', type], ['target', to], ['evidence_claim_ids', qs.map(q => q.claim).join('\n')], ['citation_ids', qs.map(q => q.qCitation).join('\n')], ['verification_status', 'needs_evidence'], ['confidence', '0.68'], ['qualifiers', qualifier], ['reviewer', 'Medical team, Helwan Pharmacology faculty']])
})
const sourceRow = row([['id', source], ['title', 'Quiz review questions - Dr Omar Sheashaa'], ['institution', 'Helwan BMS-102 local pharmacology collection; no institution is printed in the carrier'], ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Notes and Summaries/4_5837145573588737774 3.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '31'], ['sha256', '992325268b40230b61a593c4d7be80a981e76c0d5a6358f06a0ed00f4d23ca19'], ['processing_status', 'pending'], ['rights', 'Local review-bank carrier held for internal authoring only; no page redistributed.'], ['qualification', 'Tier-6 instructor-attributed keyed review bank. Dr. Omar Sheashaa is printed in the footer; no university, sitting, date, marks or official departmental-key authority is visible. Part2 uses Q13-Q20/Q22/Q24 on source pages 3-5. Q13-Q15 have coherent native text/options/key but do not paint visibly; Q21 and Q23 are held because their non-T/F option counts do not meet the importer contract.'], ['is_assessment', 'yes']])

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family223-part2-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family223-part2-articles.md', rows(Object.values(A).map(articleRow))],
  ['concept/HU-BMS-102-pharmacology-family223-part2-concepts.md', rows(conceptRows)],
  ['evidence/HU-BMS-102-pharmacology-family223-part2-claims.md', rows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-pharmacology-family223-part2-citations.md', rows(questions.flatMap(q => [citationRow(q, false), citationRow(q, true)]))],
  ['evidence/HU-BMS-102-pharmacology-family223-part2-spans.md', rows(questions.map(spanRow))],
  ['relations/HU-BMS-102-pharmacology-family223-part2-relations.md', rows(relationRows)],
  ['question/HU-BMS-102-pharmacology-family223-part2-mcq.md', rows(questions.map(questionRow))],
])
for (const [relativePath, body] of files) {
  const output = join(root, relativePath)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: 223, part: 2, refs: questions.map(q => q.ref), keys: questions.map(q => q.key).join(''), released: { sources: 1, articles: 4, conceptRows: 8, newConcepts: 3, exactIdStandaloneReuses: 5, questions: 10, claims: 10, citations: 20, spans: 10, relations: 3 }, holds: { schema: ['Q21: two-option non-T/F', 'Q23: three-option non-T/F'] }, remaining: { sourceOccurrencesFromQ25: 135, retainedAuthoringBacklogFromQ25: 132, laterLiteralReplayExclusions: 3 } }, null, 2))
