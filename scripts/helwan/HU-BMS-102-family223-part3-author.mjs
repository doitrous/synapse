import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_992325268b40230b61a5'
const letters = 'ABCDE'
const idFor = key => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const A = {
  bioavailability: 'ART-HU-BMS102-PHA-F223P3-BIOAVAILABILITY',
  vd: 'ART-HU-BMS102-PHA-F223P3-VOLUME-DISTRIBUTION',
  binding: 'ART-HU-BMS102-PHA-F223P3-PROTEIN-BINDING',
  ionisation: 'ART-HU-BMS102-PHA-F223P3-PH-IONISATION',
}
const newKeys = {
  hypoalbumin: 'teaching.pharma.protein-binding.hypoalbuminemia-free-drug-response',
  weakAcidAbsorption: 'teaching.pharma.absorption.weak-acid-higher-ph-decreases',
  albuminCompetition: 'teaching.pharma.protein-binding.albumin-site-competition',
}
const C = {
  bioavailability: 'CON-FND-CF40F32A8A74A0',
  vd: 'CON-FND-CBA2A73AE9A6D8',
  hypoalbumin: idFor(newKeys.hypoalbumin),
  ionTrap: 'CON-FND-97E55D75DE9ED1',
  weakAcidAbsorption: idFor(newKeys.weakAcidAbsorption),
  albuminCompetition: idFor(newKeys.albuminCompetition),
  barriers: 'CON-FND-3CECD012838275',
}
if (C.hypoalbumin !== 'CON-FND-1C98B2AB7C580D' || C.weakAcidAbsorption !== 'CON-FND-F93F4CBEFCA3CC' || C.albuminCompetition !== 'CON-FND-747B3D62D50407') throw new Error('deterministic concept id drift')

const conceptInfo = {
  [C.hypoalbumin]: { key: newKeys.hypoalbumin, label: 'Severe hypoalbuminemia can increase the free fraction and response of a highly albumin-bound drug', definition: 'When albumin concentration is severely reduced, a highly albumin-bound drug has fewer binding sites and a larger unbound fraction. Family223 Q28 prints a greater than normal, possibly toxic, response, but the carrier supplies no named patient-management instruction.', objective: 'Explain why severe hypoalbuminemia can increase the free fraction and effect of a highly protein-bound drug.', pitfalls: 'Assuming that less binding always means a longer duration. The source tests increased free drug and response, not a universal change in duration.', type: 'mechanism', primary: 'SYS-FND-T04-S01-M02', micro: 'Distribution', nano: 'Hypoalbuminemia and free drug' },
  [C.weakAcidAbsorption]: { key: newKeys.weakAcidAbsorption, label: 'Increasing pH decreases passive absorption of a weak acid by increasing its ionised fraction', definition: 'A weak acid becomes more ionised as environmental pH rises relative to its pKa. The ionised fraction crosses membrane lipid poorly, so Family223 Q32 prints increased pH for a weak acid as the factor that could decrease absorption.', objective: 'Predict how a pH increase changes weak-acid ionisation and passive absorption.', pitfalls: 'Applying the weak-base rule to a weak acid. A higher pH ionises a weak acid and decreases its lipid-soluble non-ionised fraction.', type: 'mechanism', primary: 'SYS-FND-T04-S01-M01', micro: 'Absorption', nano: 'Weak-acid absorption at higher pH' },
  [C.albuminCompetition]: { key: newKeys.albuminCompetition, label: 'Highly albumin-bound drugs can compete with other drugs for albumin binding sites', definition: 'Albumin has finite drug-binding sites, so two highly bound drugs may compete and alter each other\'s unbound fraction. Family223 Q33 tests the possibility of this competition rather than claiming that displacement always causes toxicity.', objective: 'Recognise competition for albumin binding sites as a property of highly albumin-bound drugs.', pitfalls: 'Treating bound drug as freely filterable or as having a large volume of distribution. Albumin binding usually retains drug in plasma and limits filtration.', type: 'mechanism', primary: 'SYS-FND-T04-S01-M02', micro: 'Distribution', nano: 'Competition for albumin binding sites' },
}

const specs = [
  { ref: 'Q25', key: 'C', concept: C.bioavailability, article: A.bioavailability, page: 5, stem: 'Bioavailability is:', options: ['Plasma protein binding of a substance', 'Permeability through the BBB', 'Fraction of a drug reaching the systemic circulation following any route\n      of administration', 'Amount of a substance in urine relative to initial dose', 'Pre-systemic degradation of a drug'], teaching: 'The source keys the fraction of a drug reaching systemic circulation following any route of administration. Bioavailability describes systemic availability, not plasma binding, blood-brain-barrier permeability, urinary amount, or presystemic degradation alone. The printed answer is retained as review-bank evidence rather than an official key.' },
  { ref: 'Q26', key: 'A', concept: C.vd, article: A.vd, page: 5, stem: 'For calculating the volume of distribution (Vd), one must consider:', options: ['Concentration of a substance in plasma', 'Concentration of a substance in urine', 'Therapeutic width of drug action', 'A daily dose of drug', 'Intrinsic activity of the drug'], teaching: 'The source keys concentration of a substance in plasma. Apparent volume of distribution relates the amount of drug in the body to its measured plasma concentration. Urine concentration, therapeutic width, daily dose, and intrinsic activity are not the denominator in that definition.' },
  { ref: 'Q27', key: 'C', concept: C.vd, article: A.vd, page: 5, stem: 'A 65-year-old woman was given Tobramycin 150 mg IV. After 20 minutes,\n  the plasma concentration was 3 mg/L. Assuming no elimination, what is the\n  apparent volume of distribution?', options: ['3 L/min', '3 L', '50 L', '2 L', '0.1 mg/min'], teaching: 'The source keys 50 L. Under the printed assumption of no elimination, apparent volume of distribution is amount divided by plasma concentration: 150 mg divided by 3 mg/L equals 50 L. The units are volume, not volume per time or mass per time.' },
  { ref: 'Q28', key: 'A', concept: C.hypoalbumin, article: A.binding, page: 6, stem: 'X is a drug that is extensively bound to plasma proteins. If you give\n  therapeutic dose to a person with severe hypoalbuminemia which one of the\n  following effects you except to occur:', options: ['A greater than normal (possibly toxic) response', 'A longer duration of action', 'A slower onset of action', 'No effect of the drug at all', 'A drug effect completely different from what normally occurs'], teaching: 'The source keys a greater than normal, possibly toxic, response. Severe hypoalbuminemia can increase the unbound fraction of an extensively protein-bound drug and thereby increase available drug at its sites of action. The statement is source-bounded and gives no treatment or dose-adjustment instruction.' },
  { ref: 'Q29', key: 'E', concept: C.ionTrap, article: A.ionisation, page: 6, stem: 'Excretion of which of the following drugs is most significantly accelerated by\n  acidification of urine?', options: ['Weak acid with pKa of 5.5', 'Weak acid with pKa of 3.5', 'Weak base with pKa of 7.5', 'Weak base with pKa of 7.1', 'Weak base with pKa of 8.1'], teaching: 'The source keys the weak base with pKa 8.1. Acidic urine protonates a weak base, increasing its ionised fraction and limiting tubular reabsorption; among these printed choices, the higher-pKa weak base is most affected. This is a conceptual source comparison, not a clinical urine-acidification instruction.' },
  { ref: 'Q30', key: 'B', concept: C.ionTrap, article: A.ionisation, page: 6, stem: 'Weak acids are excreted faster in ……….. urine and weak bases in\n  ……….. urine:', options: ['Acidic - alkaline', 'Alkaline - acidic', 'Acidic - neutral', 'Neutral - alkaline', 'Alkaline - neutral'], teaching: 'The source keys Alkaline - acidic. Alkaline urine ionises and traps weak acids, while acidic urine ionises and traps weak bases, reducing passive tubular reabsorption. The direction follows the pH that favours the charged form of each drug class.' },
  { ref: 'Q31', key: 'E', concept: C.bioavailability, article: A.bioavailability, page: 6, stem: 'One of the following bioavailability values is assumed for IV dosage:', options: ['0%', '25%', '50%', '75%', '100%'], teaching: 'The source keys 100%. Intravenous administration places the administered dose directly into systemic circulation and is therefore the reference with complete bioavailability by definition. The answer does not mean every intravenous dose is clinically appropriate or safe.' },
  { ref: 'Q32', key: 'E', concept: C.weakAcidAbsorption, article: A.ionisation, page: 7, stem: 'One of the following could decrease drug absorption:', options: ['Increased surface area dedicated to absorption', 'Increased blood flow to the site of administration', 'Increased bioavailability', 'Increased lipid solubility', 'Increased pH when the drug is a weak acid'], teaching: 'The source keys increased pH when the drug is a weak acid. Raising pH increases the ionised fraction of a weak acid and reduces the non-ionised fraction available for passive lipid diffusion. The other printed factors generally favour absorption or describe systemic availability rather than this pH effect.' },
  { ref: 'Q33', key: 'E', concept: C.albuminCompetition, article: A.binding, page: 7, stem: 'Drugs that are highly bound to albumin:', options: ['Effectively cross BBB', 'Are easily filtered at the glomerulus', 'Have a large Vd', 'Often contain quaternary nitrogen', 'Can undergo competition with other drugs for albumin binding sites'], teaching: 'The source keys competition with other drugs for albumin binding sites. Albumin provides finite binding sites, so highly bound drugs may compete and alter their unbound fractions. High albumin binding does not make a drug freely filtered, readily brain-penetrant, or necessarily high in volume of distribution.' },
  { ref: 'Q34', key: 'C', concept: C.bioavailability, article: A.bioavailability, page: 7, stem: 'The bioavailability of a drug:', options: ['Is defined as the actual blood concentration required to produce a\n      pharmacological effect', 'Will be unaffected by changes in formulation', 'May be affected by liver damage', 'Must be 100% for a drug given by mouth and is completely absorbed', 'Is a term applied only to oral administration'], teaching: 'The source keys may be affected by liver damage. Hepatic function can change presystemic metabolism and therefore alter the fraction reaching systemic circulation unchanged. Bioavailability is not limited to oral administration, is not necessarily 100% after complete absorption, and can vary with formulation.' },
  { ref: 'Q35', key: 'A', concept: C.bioavailability, article: A.bioavailability, page: 7, stem: 'Which of the following is the amount of a drug absorbed to systemic\n  circulation per the amount administered?', options: ['Bioavailability', 'Bioequivalence', 'Drug absorption', 'Dosage', 'Distribution'], teaching: 'The source keys Bioavailability. The printed wording describes the fraction of an administered amount that reaches systemic circulation, which is the source-tested bioavailability definition. Bioequivalence compares products, while dosage and distribution answer different questions.' },
  { ref: 'Q36', key: 'A', concept: C.barriers, article: A.ionisation, page: 8, stem: 'Which of the following drugs, tend to be ionized in breast milk and thus,\n  become trapped inside it?', options: ['Amphetamine (pKa = 9.9)', 'Phenobarbitone (pKa = 7.9)', 'Warfarin (pKa = 5)', 'Aspirin (pKa = 3.5)', 'Ampicillin (pKa = 2.5)'], teaching: 'The source keys Amphetamine (pKa = 9.9). Breast milk is relatively acidic, so a weak base such as amphetamine can become protonated, ionised, and trapped after entering it. This is a source-bounded pharmacokinetic explanation and not a lactation-use recommendation.' },
]

const row = fields => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const rows = values => values.join('\n---\n\n')
const questions = specs.map(q => ({ ...q, id: `Q-HU102-PHA-F223-P3-${q.ref}`, claim: `CLM-HU102-F223-P3-${q.ref}-01`, qCitation: `CIT-HU102-F223-P3-${q.ref}-QUESTION`, kCitation: `CIT-HU102-F223-P3-${q.ref}-KEY`, span: `SPN-HU102-F223-P3-${q.ref}-01` }))
const groups = Object.groupBy(questions, q => q.article)

const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(value => value.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`missing ${id} in ${path}`)
  return block.slice(block.indexOf('# Item')).trim()
}
const get = (block, name) => block.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, name, value) => block.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const setOrInsert = (block, name, value, before = 'field_notes') => block.includes(`## ${name}\n`) ? set(block, name, value) : block.replace(`\n## ${before}\n`, `\n## ${name}\n${value}\n## ${before}\n`)
const append = (block, name, values) => {
  const existing = get(block, name).split(/\n| \| /).map(value => value.replace(/^\+/, '')).filter(value => value && value !== '[clear]')
  for (const value of values) if (!existing.includes(value)) existing.push(value)
  return setOrInsert(block, name, existing.join('\n'))
}

const articleInfo = {
  [A.bioavailability]: { title: 'Bioavailability: definition, IV reference and hepatic influence', micro: 'Absorption', nano: 'Systemic fraction and first-pass influence', summary: 'A source-faithful review of bioavailability across four keyed occurrences.', sections: `### Definition
Bioavailability is the fraction of an administered drug amount that reaches systemic circulation. Family223 Q25 and Q35 test that systemic-fraction definition.

### Mechanism
Intravenous administration is the 100% reference because the dose enters systemic circulation directly. Oral and other routes may lose drug before systemic entry through incomplete absorption or presystemic metabolism.

### Key determinants
Family223 Q34 prints that liver damage may affect bioavailability. Hepatic function and formulation can change systemic availability, so complete gastrointestinal absorption does not by itself guarantee 100% bioavailability.

### Clinical significance
Bioavailability helps compare systemic exposure across routes and products, but this Draft supplies no dose conversion or patient-specific instruction.

### Common misconceptions
Bioavailability is not the concentration required to produce an effect, is not exclusive to oral use, and is not synonymous with presystemic degradation.` },
  [A.vd]: { title: 'Apparent volume of distribution: plasma concentration and calculation', micro: 'Distribution', nano: 'Vd definition and source calculation', summary: 'A compact review of the plasma-concentration denominator and the source calculation of apparent volume of distribution.', sections: `### Definition
Apparent volume of distribution relates the amount of drug in the body to the measured plasma concentration: Vd equals amount divided by plasma concentration.

### Mechanism
Family223 Q26 identifies plasma concentration as required for the calculation. Q27 then supplies 150 mg and 3 mg/L under an explicit no-elimination assumption, yielding 50 L.

### Key determinants
The calculated value is an apparent proportionality volume, not necessarily an anatomical compartment. Correct dimensional analysis cancels mass and leaves litres.

### Clinical significance
Vd helps describe distribution and can inform pharmacokinetic reasoning, but this Draft does not recommend a dose or administration procedure.

### Common misconceptions
Do not use urine concentration, therapeutic width, intrinsic activity, or a daily dose as the defining denominator. Do not report litres per minute for a volume.` },
  [A.binding]: { title: 'Albumin binding: hypoalbuminemia and competition', micro: 'Distribution', nano: 'Free fraction and binding-site competition', summary: 'A source-bounded explanation of increased free drug in severe hypoalbuminemia and competition for albumin binding sites.', sections: `### Definition
Only the unbound fraction of a drug is immediately available to diffuse, be filtered, or interact with a target. Albumin binding retains a fraction in plasma.

### Mechanism
Severe hypoalbuminemia reduces available binding capacity and can increase the free fraction of a highly bound drug. Different highly bound drugs can also compete for finite albumin binding sites.

### Key determinants
Family223 Q28 prints a greater than normal, possibly toxic, response in severe hypoalbuminemia. Q33 separately prints competition for albumin binding sites; neither occurrence proves that every displacement produces clinical toxicity.

### Clinical significance
Protein binding is one determinant of distribution and exposure. No patient-specific adjustment or treatment instruction is inferred from this review bank.

### Common misconceptions
Highly albumin-bound drug is not easily filtered and does not automatically cross the blood-brain barrier or have a large volume of distribution.` },
  [A.ionisation]: { title: 'pH partition, urinary ion trapping and breast-milk trapping', micro: 'Absorption and excretion', nano: 'Weak acids, weak bases and compartment pH', summary: 'A source-faithful synthesis of four pH-dependent absorption, excretion and breast-milk trapping occurrences.', sections: `### Definition
The non-ionised fraction of a weak acid or base crosses membrane lipid more readily. When compartment pH favours ionisation after entry, the charged fraction crosses back poorly and becomes trapped.

### Mechanism
Alkaline urine traps weak acids, while acidic urine traps weak bases. A rise in pH ionises a weak acid and can reduce its passive absorption; relatively acidic breast milk can protonate and trap a weak base.

### Key determinants
Family223 Q29 and Q30 test urinary pH direction, Q32 tests a weak acid at increased pH, and Q36 applies weak-base trapping to amphetamine among the printed pKa choices.

### Clinical significance
These are qualitative source comparisons. This Draft gives no urine-pH manipulation protocol, overdose treatment, formulation direction, or lactation recommendation.

### Common misconceptions
The trapping compartment needs the pH that ionises the drug: alkaline for a weak acid and acidic for a weak base. Matching acid with acidic is the common reversal.` },
}

const labelFor = id => conceptInfo[id]?.label ?? get(conceptBlocksById.get(id), 'label')
const articleRow = id => {
  const qs = groups[id], info = articleInfo[id], concepts = [...new Set(qs.map(q => q.concept))]
  return row([
    ['id', id], ['title', info.title], ['arabic_title', ''], ['aliases', `Family223 Part3 ${info.micro}\nHU-BMS-102 pharmacology review`], ['subject', 'pharm'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', info.micro], ['nanotopic', info.nano], ['primary_node_id', info.micro === 'Distribution' ? 'SYS-FND-T04-S01-M02' : 'SYS-FND-T04-S01-M01'], ['secondary_node_ids', 'DIS-PHA-T01\nDIS-PHA'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Year 1 foundation'], ['reading_time', '5'], ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pharmacology faculty'], ['final_publisher', 'Admin team'], ['summary', info.summary], ['sections', `${info.sections}\n\n### Source-tested concept lines\n${concepts.map(labelFor).join('\n')}`], ['published_summary', ''], ['published_sections', ''], ['hold_these', concepts.map(labelFor).join('\n')], ['lose_the_mark', 'Treating a tier-6 review-bank letter as an official departmental key.\nGeneralising a pH, binding, or bioavailability answer beyond its printed option set.'], ['related_concepts', concepts.join('\n')], ['related_articles', Object.values(A).filter(article => article !== id).join('\n')], ['question_ids', qs.map(q => q.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part3 > ${info.micro}`], ['university_notes', 'hu: Tier-6 instructor-attributed keyed review-bank evidence only; no authenticated exam, marks or official key.'], ['annotations', concepts.map(concept => `### definition_of · ${concept}\nQuote: ${labelFor(concept)}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''], ['callout_evidence', qs.map(q => `### ${labelFor(q.concept)}\nClaims: ${q.claim}\nCitations: ${q.qCitation}, ${q.kCitation}\nSpan: ${q.span}`).join('\n\n')], ['article_source_ids', source], ['claim_ids', qs.map(q => q.claim).join('\n')], ['span_ids', qs.map(q => q.span).join('\n')], ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Family223 PDF physical pages 4-7 visibly preserve the exact stems, option structures, and aligned right-column review-bank letters.'], ['evidence_gaps', 'Independent medical verification and named Helwan pharmacology faculty review remain required before publication.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''], ['notes', 'Question-led Family223 Part3 Q25-Q36 only; no marks, official-key authority, written or practical records inferred.'], ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
}

const newConceptBlock = id => {
  const info = conceptInfo[id], qs = questions.filter(q => q.concept === id), own = [...new Set(qs.map(q => q.article))]
  const relatedArticle = id === C.weakAcidAbsorption ? 'ART-HU-BMS102-PHA-F223P2-MEMBRANE-TRANSFER' : A.vd
  return row([
    ['label', info.label], ['id', id], ['canonical_key', info.key], ['definition', info.definition], ['explicit_objective', info.objective], ['pitfalls', info.pitfalls], ['concept_type', info.type], ['status', 'under review'], ['support_mode', 'direct_statement'], ['subject', 'pharm'], ['primary_node_id', info.primary], ['secondary_node_ids', 'DIS-PHA-T01\nDIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', info.micro], ['nanotopic', info.nano], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part3 > ${info.micro} > ${info.nano}`], ['universities', 'hu'], ['learner_years', '1'], ['aliases', info.label], ['arabic_label', ''], ['arabic_aliases', ''], ['article_ids', own.join('\n')], ['related_article_ids', relatedArticle], ['related_concept_ids', '[clear]'], ['exam_signal', qs.map(q => `${source} | Family223 Part3 ${q.ref} | PDF source p${q.page} | tier-6 keyed review bank; not official key`).join('\n')], ['blueprint_weight', '0.44'], ['exam_weight_by_year', 'HU_Y1=0.44'], ['clinical_relevance', '0.68'], ['academic_relevance', '0.90'], ['weight_confidence', '0.40'], ['confidence', '0.74'], ['original_wording', qs.map(q => `[Family223 Part3 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['atomic_claim_ids', qs.map(q => q.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['uncertainty', '[clear]'], ['evidence_gaps', 'Independent medical verification and Helwan pharmacology faculty review are required before publication.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pharmacology faculty'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'authored_needs_independent_evidence'], ['exclusion_reason', ''], ['field_notes', `deterministicId: ${id} is SHA-256(canonical_key), first 14 uppercase hex, with CON-FND prefix.\nmicrotopicId: No dedicated taxonomy microtopic exists for this exact first-year source grain; module_subject carries the reviewed placement.\nnanotopicId: No dedicated taxonomy nanotopic exists for this exact first-year source grain; module_subject carries the reviewed placement.\narabicLabel: Blank pending terminology review.\napprovedFileResourceIds: No source is rights-cleared for redistribution.\napprovedVideoResourceIds: No video is attached.\nresourceOccurrenceIds: No corpus occurrence ID exists for this local review-bank item.\nsourceCandidateIds: No exact governed concept with this semantic grain was found before minting.\nmergeIds: Nothing has been merged.\nrejectedMergeCandidateIds: No same-grain candidate was found.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first review.\nexclusionReason: Not excluded; publication_status carries the evidence gate.`],
  ])
}

const reusePaths = {
  [C.bioavailability]: join(root, 'concept', 'HU-BMS-102-pharmacology-family223-part2-concepts.md'),
  [C.ionTrap]: join(repo, 'docs', 'Kasr-Source-Imports', 'concept', '108-INT-concepts-pharmacology.md'),
  [C.barriers]: join(root, 'concept', 'HU-BMS-102-pharmacology-family223-part2-concepts.md'),
}
const reuseBlock = id => {
  const qs = questions.filter(q => q.concept === id)
  let block = extract(reusePaths[id], id)
  block = append(block, 'article_ids', [...new Set(qs.map(q => q.article))])
  block = append(block, 'atomic_claim_ids', qs.map(q => q.claim))
  block = append(block, 'learner_years', ['1'])
  block = append(block, 'exam_signal', qs.map(q => `${source} | Family223 Part3 ${q.ref} | PDF source p${q.page} | tier-6 keyed review bank; not official key`))
  block = append(block, 'original_wording', qs.map(q => `[Family223 Part3 ${q.ref}] ${q.stem} [printed answer ${q.key}]`))
  block = setOrInsert(block, 'resource_ids', source)
  for (const [name, value] of [['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]']]) block = setOrInsert(block, name, value)
  block = setOrInsert(block, 'field_notes', `${get(block, 'field_notes')}\nfamily223Part3Reuse: Exact governed ID, canonical key and teaching semantics are preserved; reciprocal Family223 Part3 article, source, claim and wording links are appended.\nstandaloneLiveCreate: This complete row may create the governed concept if absent live; resource_ids therefore names only the source supplied in this atomic batch.`)
  if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${id} is not needs_evidence`)
  return block
}
const vdBlock = () => {
  const qs = questions.filter(q => q.concept === C.vd)
  return row([
    ['label', 'Apparent volume of distribution'], ['id', C.vd], ['canonical_key', 'teaching.pharma.vd.definition'], ['definition', 'Apparent volume of distribution is the hypothetical volume that relates the amount of drug in the body to its plasma concentration: Vd = amount in the body divided by plasma concentration.'], ['explicit_objective', 'Define apparent volume of distribution and calculate it from the amount of drug in the body and measured plasma concentration.'], ['pitfalls', 'Treating Vd as a literal anatomical compartment or using urine concentration, effect, or a rate unit in the calculation.'], ['concept_type', 'directly_taught_pharmacology_concept'], ['status', 'under review'], ['support_mode', 'direct'], ['subject', 'pharm'], ['primary_node_id', 'SYS-FND-T04-S01-M02'], ['secondary_node_ids', 'DIS-PHA-T01\nDIS-PHA'], ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['microtopic', 'Distribution'], ['nanotopic', 'Apparent volume of distribution'], ['modules', '108 INT'], ['module_subject', '108 INT > Pharmacology > Pharmacokinetics > Distribution > Apparent volume of distribution'], ['universities', 'kau'], ['learner_years', '1'], ['aliases', 'Vd\nVolume of distribution'], ['arabic_label', 'حجم التوزيع الظاهري'], ['arabic_aliases', 'حجم التوزيع'], ['article_ids', `ART-108-PHA-PHARMACOKINETICS-ADME\n${A.vd}`], ['related_article_ids', A.binding], ['related_concept_ids', 'CON-FND-040D2633B0A2FE\nCON-FND-53FF18E42BC94B\nCON-FND-955AD7B6FE6F03'], ['exam_signal', qs.map(q => `${source} | Family223 Part3 ${q.ref} | PDF source p${q.page} | tier-6 keyed review bank; not official key`).join('\n')], ['blueprint_weight', '0.85'], ['exam_weight_by_year', 'KAU_Y1=0.85'], ['clinical_relevance', '0.65'], ['academic_relevance', '0.90'], ['weight_confidence', '0.70'], ['confidence', '0.96'], ['original_wording', qs.map(q => `[Family223 Part3 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['atomic_claim_ids', qs.map(q => q.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['uncertainty', '[clear]'], ['evidence_gaps', 'Independent medical verification and Helwan pharmacology faculty review are required before publication.'], ['owner', 'Admin team'], ['reviewer', 'Medical team, Admin team'], ['final_publisher', 'Admin team'], ['last_reviewed', '2026-08-11'], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'editorially_revised_needs_independent_evidence'], ['exclusion_reason', ''], ['field_notes', 'exactIdReuse: Existing governed ID, canonical key, core definition, Kasr placement and ownership are preserved; the Family223 source/article/claims are appended as a complete standalone-safe overlay.\nmicrotopicId: Filled at the canonical Distribution level; no overlay MIC_ id exists.\nnanotopicId: No NAN_ ids exist for first-year general pharmacology.\napprovedFileResourceIds: No source is rights-cleared for redistribution.\napprovedVideoResourceIds: No video is attached.\nresourceOccurrenceIds: Historical occurrences are not required for this standalone Helwan evidence overlay.\nsourceCandidateIds: Cleared because the governed ID is established.\nmergeIds: Historical merge state is not changed by this source overlay.\nrejectedMergeCandidateIds: No new rival was found.\nreviewDue: Set by the record owner after the next independent review.\nexclusionReason: Not excluded; publication_status carries the evidence gate.'],
  ])
}

const conceptOrder = [C.bioavailability, C.vd, C.hypoalbumin, C.ionTrap, C.weakAcidAbsorption, C.albuminCompetition, C.barriers]
const conceptBlocks = conceptOrder.map(id => id === C.vd ? vdBlock() : reusePaths[id] ? reuseBlock(id) : newConceptBlock(id))
const conceptBlocksById = new Map(conceptOrder.map((id, index) => [id, conceptBlocks[index]]))

const distractor = q => `This option is not the printed answer for this occurrence. The review bank prints ${q.key}, “${q.options[letters.indexOf(q.key)]}.” The linked Draft teaching preserves that source answer and its evidence limits.`
const questionRow = q => row([
  ['id', q.id], ['title', q.stem], ['subject', 'pharm'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', q.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', q.key],
  ...q.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, letters[index] === q.key ? q.teaching : distractor(q)]]),
  ['topic', 'General pharmacology'], ['subtopic', 'Pharmacokinetics'], ['difficulty', q.ref === 'Q27' ? 'Moderate' : 'Easy'], ['question_type', 'Pharmacology'], ['main_concept', q.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pharmacology > Family223 Part3 > ${q.ref}`], ['clinical_relevance', ['Q28', 'Q29', 'Q36'].includes(q.ref) ? '0.72' : '0.62'], ['academic_relevance', '0.95'], ['cognitive_effort_score', q.ref === 'Q27' ? '0.62' : '0.50'], ['exam_weight_by_year', 'HU_Y1=0.58'], ['question_only_for', 'HU_Y1'], ['concept_ids', q.concept], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', q.ref === 'Q27' ? 'Moderate' : 'Low'], ['setting', 'Academic'], ['reasoning_level', q.ref === 'Q27' ? '2' : '1'], ['inferred_difficulty', q.ref === 'Q27' ? '58' : '46'], ['exam_relevance', '6'], ['contextual_concept_ids', ''], ['library_ids', q.article], ['resource_ids', source], ['learning_objective', get(conceptBlocksById.get(q.concept), 'explicit_objective')], ['media_recommendations', ''], ['source_citation', `${source}, Family223 Part3 ${q.ref}, PDF physical p${q.page - 1}/source p${q.page}: literal visible stem, option structure and aligned right-column printed ${q.key}; tier-6 review-bank authority only.`], ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal wording, line breaks, punctuation, option order and printed answer preserved, including source grammar and “except” typo in Q28. No marks, sitting, official-key authority, treatment recommendation, written or practical record inferred.'], ['estimated_seconds', q.ref === 'Q27' ? '90' : '60'], ['randomise_answers', 'yes'],
])
const claimRow = q => row([['id', q.claim], ['concept_id', q.concept], ['subject', 'pharm'], ['predicate', 'is printed as'], ['object', q.options[letters.indexOf(q.key)]], ['display_text', `${q.ref}: the review bank prints ${q.key}, ${q.options[letters.indexOf(q.key)]}.`], ['risk_class', ['Q28', 'Q29', 'Q36'].includes(q.ref) ? 'clinical_non_treatment' : 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.76'], ['freshness', 'source_date_unverified'], ['time_sensitive', 'no'], ['qualifiers', `tier-6 review bank, not official key; Family223 Part3 ${q.ref}`]])
const citationRow = (q, key) => row([['id', key ? q.kCitation : q.qCitation], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', key ? `Right-column printed answer: ${q.key}` : `${q.stem} Options: ${q.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`], ['locator_type', 'page'], ['locator_page', String(q.page)], ['locator_section', `Family223 Part3 ${q.ref}`], ['locator_detail', key ? 'Aligned right-column printed letter' : `Exact visible stem and ${q.options.length} options`], ['context_note', 'Instructor-attributed keyed review bank; not an authenticated examination or official key.'], ['confidence', '0.98'], ['counts_as_claim_evidence', 'no']])
const spanRow = q => row([['id', q.span], ['article_id', q.article], ['section_id', `${q.article.toLowerCase()}-${q.ref.toLowerCase()}`], ['text', labelFor(q.concept)], ['claim_ids', q.claim], ['citation_ids', `${q.qCitation}\n${q.kCitation}`]])
const relationRows = [
  [C.hypoalbumin, C.albuminCompetition, ['Q28', 'Q33'], 'scope: the source separately tests reduced albumin capacity and competition for albumin binding sites'],
  [C.weakAcidAbsorption, C.ionTrap, ['Q30', 'Q32'], 'scope: the source applies pH-dependent ionisation to excretion and absorption'],
  [C.barriers, C.ionTrap, ['Q30', 'Q36'], 'scope: the source applies weak-base ion trapping to urine and breast milk'],
].map(([from, to, refs, qualifier]) => {
  const qs = refs.map(ref => questions.find(q => q.ref === ref))
  return row([['source', from], ['type', 'related_concepts'], ['target', to], ['evidence_claim_ids', qs.map(q => q.claim).join('\n')], ['citation_ids', qs.map(q => q.qCitation).join('\n')], ['verification_status', 'needs_evidence'], ['confidence', '0.68'], ['qualifiers', qualifier], ['reviewer', 'Medical team, Helwan Pharmacology faculty']])
})
const sourceRow = row([['id', source], ['title', 'Quiz review questions - Dr Omar Sheashaa'], ['institution', 'Helwan BMS-102 local pharmacology collection; no institution is printed in the carrier'], ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pharmacology/Notes and Summaries/4_5837145573588737774 3.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '31'], ['sha256', '992325268b40230b61a593c4d7be80a981e76c0d5a6358f06a0ed00f4d23ca19'], ['processing_status', 'pending'], ['rights', 'Local review-bank carrier held for internal authoring only; no page redistributed.'], ['qualification', 'Tier-6 instructor-attributed keyed review bank. Dr. Omar Sheashaa is printed in the footer; no university, sitting, date, marks or official departmental-key authority is visible. Part3 uses the 12 visible, importer-valid five-option rows Q25-Q36 on source pages 5-8.'], ['is_assessment', 'yes']])

const files = new Map([
  ['evidence/HU-BMS-102-pharmacology-family223-part3-sources.md', sourceRow],
  ['article/HU-BMS-102-pharmacology-family223-part3-articles.md', rows(Object.values(A).map(articleRow))],
  ['concept/HU-BMS-102-pharmacology-family223-part3-concepts.md', rows(conceptBlocks)],
  ['evidence/HU-BMS-102-pharmacology-family223-part3-claims.md', rows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-pharmacology-family223-part3-citations.md', rows(questions.flatMap(q => [citationRow(q, false), citationRow(q, true)]))],
  ['evidence/HU-BMS-102-pharmacology-family223-part3-spans.md', rows(questions.map(spanRow))],
  ['relations/HU-BMS-102-pharmacology-family223-part3-relations.md', rows(relationRows)],
  ['question/HU-BMS-102-pharmacology-family223-part3-mcq.md', rows(questions.map(questionRow))],
])
for (const [relativePath, body] of files) {
  const output = join(root, relativePath)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: 223, part: 3, refs: questions.map(q => q.ref), keys: questions.map(q => q.key).join(''), released: { sources: 1, articles: 4, conceptRows: 7, newConcepts: 3, exactIdStandaloneReuses: 4, questions: 12, claims: 12, citations: 24, spans: 12, relations: 3 }, holds: 0, remaining: { sourceOccurrencesFromQ37: 123, retainedAuthoringBacklogFromQ37: 120, laterLiteralReplayExclusions: 3, priorSchemaHolds: 2 } }, null, 2))
