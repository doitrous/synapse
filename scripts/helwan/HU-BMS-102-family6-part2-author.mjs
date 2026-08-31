import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const lecture1 = 'src_50d9ef5f2db5dc46e3e3'
const lecture2 = 'src_11e4f2b9f8bdbdb51806'
const assessment = 'src_ece98ba3324ee657c538'
const thromboembolismArticle = 'ART-HU-BMS102-PAT-VASCULAR-THROMBOEMBOLISM'
const shockCongestionArticle = 'ART-HU-BMS102-PAT-SHOCK-SIDED-CONGESTION'
const priorCongestionArticle = 'ART-HU-BMS102-PAT-HYPERAEMIA-CONGESTION'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'UC02', key: 'pathology.thrombosis.postoperative-dvt-diagnosis', label: 'Painful unilateral leg swelling after major orthopaedic surgery suggests deep-vein thrombosis', aliases: ['Postoperative DVT diagnosis', 'Knee-replacement venous thrombosis'],
    definition: 'Major orthopaedic surgery promotes venous stasis, tissue injury and hypercoagulability. Sudden painful unilateral leg swelling in that setting therefore indicates deep-vein thrombosis until excluded.', objective: 'Diagnose deep-vein thrombosis from painful unilateral leg swelling after knee-replacement surgery.', pitfalls: 'Calling postoperative unilateral swelling lymphoedema or cellulitis without recognising the thrombotic risk pattern.',
    type: 'diagnostic_pattern', micro: 'Venous thrombosis', nano: 'Postoperative DVT', article: thromboembolismArticle,
    subject: 'Painful unilateral leg swelling after knee-replacement surgery', predicate: 'suggests', object: 'deep-vein thrombosis', display: 'Painful unilateral leg swelling after knee-replacement surgery suggests deep-vein thrombosis.',
    teaching: [{ source: lecture2, page: 21, text: 'Risk factors: prolonged bed rest, immobilization, tissue damage e.g., trauma, fracture, surgery.' }],
    qPage: 6, answerPage: 8, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 58,
    stem: 'A 45-year-old woman develops sudden-onset unilateral leg swelling and pain. She recently underwent knee replacement surgery. What is the most likely diagnosis?', keyLetter: 'B', options: ['Cellulitis', 'Deep vein thrombosis (DVT)', 'Lymphedema', 'Arterial occlusion'], clue: 'major orthopaedic surgery is followed by sudden painful unilateral venous-pattern swelling',
    reasons: ['cellulitis can cause a painful swollen limb but does not best integrate the strong postoperative thrombotic risk', 'recent major surgery, immobility and unilateral painful swelling form the classic DVT pattern', 'lymphoedema is usually chronic and often non-pitting rather than sudden and painful after knee surgery', 'arterial occlusion produces a pale, cold and pulseless limb rather than this swollen venous presentation'],
  },
  {
    ref: 'UC05', key: 'pathology.thromboembolism.dvt-pulmonary-embolism-clinical-pathway', label: 'A deep-vein thrombus can embolise to the pulmonary circulation', aliases: ['DVT-to-PE pathway', 'Pulmonary thromboembolism from leg veins'],
    definition: 'A thrombus arising in a systemic deep vein can detach, pass through the right side of the heart and lodge in pulmonary arteries. A swollen calf followed by acute hypoxia, haemoptysis and chest pain is therefore a pulmonary embolism pattern.', objective: 'Link a swollen calf with acute hypoxia, haemoptysis and chest pain to pulmonary embolism from DVT.', pitfalls: 'Focusing on chest pain alone and overlooking the preceding clinical evidence of a lower-limb venous thrombus.',
    type: 'clinical_pathway', micro: 'Venous thromboembolism', nano: 'DVT to pulmonary embolism', article: thromboembolismArticle,
    subject: 'A systemic deep-vein thrombus', predicate: 'can embolise to', object: 'the pulmonary circulation', display: 'A systemic deep-vein thrombus can embolise to the pulmonary circulation.',
    teaching: [{ source: lecture2, page: 37, text: 'Thromboembolism ... systemic veins reaches the right side of heart, then lungs leading to pulmonary embolism.' }],
    qPage: 6, answerPage: 8, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 64,
    stem: 'A 60-year-old smoker presents with sudden-onset chest pain and hemoptysis. His oxygen saturation is 88%, and he has a swollen left calf. What is the most likely cause of his symptoms?', keyLetter: 'B', options: ['Acute myocardial infarction', 'Pulmonary embolism', 'Pneumonia', 'Aortic dissection'], clue: 'acute respiratory symptoms coexist with a swollen calf that suggests the embolic source',
    reasons: ['myocardial infarction does not explain the swollen calf as an embolic source or the haemoptysis-hypoxia pattern', 'a calf DVT can embolise to the lungs and cause acute hypoxia, chest pain and haemoptysis', 'pneumonia can cause hypoxia and haemoptysis but does not integrate the acute swollen-calf clue', 'aortic dissection causes abrupt severe pain but not a DVT-to-lung clinical pathway'],
  },
  {
    ref: 'UC06', key: 'pathology.thromboembolism.atherosclerotic-ischemic-stroke', label: 'Thromboembolism can cause ischaemic stroke in a patient with atherosclerosis', aliases: ['Atherosclerotic thromboembolic stroke', 'Cerebral arterial embolic occlusion'],
    definition: 'A thrombus forming on an atherosclerotic arterial plaque or within the heart can detach and enter the systemic arterial circulation. Lodgement in a cerebral artery abruptly interrupts blood flow and produces an ischaemic stroke.', objective: 'Identify thromboembolism as the vascular event producing sudden focal deficits and imaging-confirmed ischaemic stroke in a patient with atherosclerosis.', pitfalls: 'Choosing haemorrhage after the vignette explicitly identifies ischaemic stroke, or choosing venous thrombosis for an arterial cerebral event.',
    type: 'pathophysiological_mechanism', micro: 'Arterial thromboembolism', nano: 'Thromboembolic ischaemic stroke', article: thromboembolismArticle,
    subject: 'Arterial thromboembolism', predicate: 'can cause', object: 'ischaemic stroke', display: 'Arterial thromboembolism can cause ischaemic stroke.',
    teaching: [{ source: lecture2, page: 38, text: 'Cardiac thrombi ... are carried by the systemic arterial circulation to impact in any organ.' }],
    qPage: 6, answerPage: 8, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 62,
    stem: 'A 75-year-old hypertensive male with atherosclerosis experiences sudden left-sided weakness and slurred speech. Brain imaging confirms an ischemic stroke. Which vascular event most likely caused this?', keyLetter: 'A', options: ['Thromboembolism', 'Hypertensive encephalopathy', 'Hemorrhagic stroke', 'Cerebral venous sinus thrombosis'], clue: 'the deficit is sudden, focal and confirmed to be ischaemic in an atherosclerotic patient',
    reasons: ['arterial thrombus formation and embolisation can abruptly occlude a cerebral artery', 'hypertensive encephalopathy produces diffuse cerebral dysfunction rather than this focal ischaemic infarct pattern', 'haemorrhagic stroke conflicts with imaging that confirms an ischaemic stroke', 'cerebral venous sinus thrombosis is a venous disorder and is not the most likely event in this atherosclerotic arterial vignette'],
  },
  {
    ref: 'UC08', key: 'pathology.shock.hypovolemic-trauma-blood-loss', label: 'Severe traumatic blood loss produces hypovolaemic shock', aliases: ['Traumatic haemorrhagic shock', 'Cold clammy hypovolaemic shock'],
    definition: 'Haemorrhage reduces circulating blood volume, venous return and cardiac output. The resulting hypotension triggers tachycardia and peripheral vasoconstriction, producing cold clammy skin in hypovolaemic shock.', objective: 'Diagnose hypovolaemic shock from severe trauma, profound hypotension, tachycardia and cold clammy skin.', pitfalls: 'Choosing neurogenic or early septic shock, which more often produces warm skin because peripheral vascular tone is reduced.',
    type: 'diagnostic_pattern', micro: 'Shock', nano: 'Traumatic hypovolaemic shock', article: shockCongestionArticle,
    subject: 'Severe traumatic blood loss', predicate: 'produces', object: 'hypovolaemic shock', display: 'Severe traumatic blood loss produces hypovolaemic shock.',
    teaching: [{ source: lecture1, page: 42, text: 'Hypovolemic shock ... due to hemorrhage or plasma loss as in burns, trauma.' }],
    qPage: 7, answerPage: 8, difficulty: 'Easy', effort: 'Low', reasoning: 2, inferred: 52,
    stem: 'A 29-year-old man was found unconscious after a severe car accident. His blood pressure is 70/40 mmHg, heart rate is 130 bpm, and his skin is cold and clammy. What type of shock is most likely?', keyLetter: 'C', options: ['Cardiogenic', 'Neurogenic', 'Hypovolemic', 'Septic'], clue: 'severe trauma is accompanied by profound hypotension, compensatory tachycardia and peripheral vasoconstriction',
    reasons: ['cardiogenic shock requires primary pump failure rather than the trauma-and-volume-loss pattern presented', 'neurogenic shock commonly follows spinal injury with loss of vascular tone and relative bradycardia or warm skin', 'traumatic haemorrhage reduces circulating volume and produces tachycardic cold clammy hypovolaemic shock', 'early septic shock is distributive and often warm rather than cold and clammy'],
  },
  {
    ref: 'UC11', reuseId: 'CON-CVS-B5692258332FC3', reuseKey: 'paradoxical-embolism', reuseLabel: 'An atrial septal defect allows a venous clot to reach the systemic circulation',
    objective: 'Explain why DVT can produce paradoxical systemic embolism when a patent foramen ovale permits transient right-to-left passage.', micro: 'Venous thromboembolism', nano: 'Paradoxical embolism', article: thromboembolismArticle,
    subject: 'A venous thrombus in a patient with a patent foramen ovale', predicate: 'can enter', object: 'the systemic arterial circulation as a paradoxical embolus', display: 'A venous thrombus can enter the systemic arterial circulation through a patent foramen ovale.',
    teaching: [{ source: lecture2, page: 38, text: 'From systemic veins ... in cases of ventricular septal defect ... systemic embolism.' }],
    qPage: 7, answerPage: 9, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 64,
    stem: 'Patients with deep vein thrombosis (DVT) are at risk of developing a paradoxical embolism if they have a patent foramen ovale. (True/False)', keyLetter: 'A', options: ['True', 'False'], clue: 'a right-to-left passage can allow a venous thrombus to bypass the pulmonary filter',
    reasons: ['a patent foramen ovale can transiently permit right-to-left passage of a venous embolus into systemic arteries', 'without an intracardiac route a venous embolus normally lodges in the pulmonary circulation, but the stated PFO creates the exception'],
  },
  {
    ref: 'UC12', key: 'pathology.congestion.right-systemic-left-pulmonary', label: 'Right heart failure causes systemic congestion whereas left heart failure causes pulmonary congestion', aliases: ['Sided heart-failure congestion pattern', 'Right systemic and left pulmonary congestion'],
    definition: 'Right ventricular failure raises systemic venous pressure and produces systemic congestion, while left ventricular failure raises pulmonary venous pressure and produces pulmonary congestion. Reversing these distributions confuses the venous circuit upstream of each failing ventricle.', objective: 'Correctly assign systemic venous congestion to right-sided failure and pulmonary congestion to left-sided failure.', pitfalls: 'Following the direction of arterial ejection rather than tracing the venous circulation that backs up behind the failing ventricle.',
    type: 'comparison', micro: 'Organ congestion', nano: 'Sided heart-failure distribution', article: shockCongestionArticle,
    subject: 'Right- and left-sided heart failure', predicate: 'differ because', object: 'right failure causes systemic and left failure pulmonary congestion', display: 'Right heart failure causes systemic congestion whereas left heart failure causes pulmonary congestion.',
    teaching: [],
    qPage: 7, answerPage: 9, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 60,
    stem: 'Right-sided heart failure primarily leads to pulmonary congestion, while left-sided heart failure results in systemic venous congestion. (True/False)', keyLetter: 'B', options: ['True', 'False'], clue: 'the statement reverses the venous territory that backs up behind each side of the heart',
    reasons: ['the statement reverses the distributions of right- and left-sided failure', 'right failure backs up the systemic veins, whereas left failure backs up the pulmonary veins'],
  },
  {
    ref: 'UC13', reuseId: 'CON-FND-7D406E91EA3BF2', reuseKey: 'mast-cell-granule-contents-and-the-anaphylactic-reaction', reuseLabel: "The mast cell stores heparin and histamine and releases them when allergen binds its IgE — which is what an anaphylactic reaction is",
    objective: 'Recognise IgE-mediated systemic vasodilatation and increased vascular permeability as the mechanism of anaphylactic shock.', micro: 'Shock', nano: 'IgE-mediated anaphylactic shock', article: shockCongestionArticle,
    subject: 'IgE-mediated anaphylaxis', predicate: 'causes', object: 'systemic vasodilatation and increased vascular permeability', display: 'IgE-mediated anaphylaxis causes systemic vasodilatation and increased vascular permeability.',
    teaching: [{ source: lecture1, page: 44, text: 'Anaphylactic shock ... IgE mediated ... release of histamine ... peripheral vasodilatation and increased vascular permeability.' }],
    qPage: 7, answerPage: 9, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 42,
    stem: 'Anaphylactic shock is caused by IgE-mediated hypersensitivity leading to systemic vasodilation and increased vascular permeability. (True/False)', keyLetter: 'A', options: ['True', 'False'], clue: 'the statement gives the defining immune trigger and vascular effects of anaphylaxis',
    reasons: ['IgE-triggered mast-cell mediator release produces systemic vasodilatation and capillary leak', 'the stated IgE, vasodilatation and permeability sequence is the recognised mechanism rather than a false reversal'],
  },
  {
    ref: 'UC14', reuseId: 'CON-FND-D35F7F5AFB4F18', reuseKey: 'pathology.congestion.liver-nutmeg-appearance', reuseLabel: 'Chronic passive liver congestion produces a nutmeg appearance', reuseClaim: 'CLM-HU102-F6P1-SK06-01', reuseCurrCits: ['CIT-HU102-F6P1-SK06-CURR'],
    objective: 'Confirm nutmeg liver as the characteristic appearance of chronic hepatic venous congestion.', micro: 'Organ congestion', nano: 'Nutmeg liver', article: shockCongestionArticle,
    subject: 'Chronic hepatic venous congestion', predicate: 'produces', object: 'a nutmeg liver appearance', display: 'Chronic hepatic venous congestion produces a nutmeg liver appearance.',
    teaching: [],
    qPage: 7, answerPage: 9, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 35,
    stem: 'Chronic venous congestion in the liver leads to a characteristic "nutmeg liver" appearance. (True/False)', keyLetter: 'A', options: ['True', 'False'], clue: 'centrilobular congestion and surrounding fatty change produce the mottled nutmeg pattern',
    reasons: ['chronic venous congestion creates the characteristic mottled red-and-yellow nutmeg appearance', 'the nutmeg pattern is a classic consequence of chronic passive hepatic congestion, so denying the association is incorrect'],
  },
]

for (const row of rows) {
  row.id = row.reuseId ?? idFor(row.key)
  row.claim = row.reuseClaim ?? `CLM-HU102-F6P2-${row.ref}-01`
  row.asmCit = `CIT-HU102-F6P2-${row.ref}-ASM`
  row.currCits = row.reuseCurrCits ?? row.teaching.map((_, i) => `CIT-HU102-F6P2-${row.ref}-CURR${row.teaching.length > 1 ? `-${i + 1}` : ''}`)
  row.span = `SPN-HU102-F6P2-${row.ref}-01`
}
const newRows = rows.filter((row) => !row.reuseId)
const newClaimRows = rows.filter((row) => !row.reuseClaim)
const byRef = Object.fromEntries(rows.map((row) => [row.ref, row]))
const qid = (row) => `Q-HU102-PAT-CIRC-F6-${row.ref}`
const conceptRelated = { UC02: ['UC05'], UC05: ['UC02', 'UC11'], UC06: ['UC11'], UC08: ['UC13'], UC12: ['UC14'] }

const fullConcept = (row) => `# Item
## label
${row.label}
## id
${row.id}
## canonical_key
${row.key}
## aliases
${row.aliases.join('\n')}
## arabic_label

## arabic_aliases

## definition
${row.definition}
## explicit_objective
${row.objective}
## pitfalls
${row.pitfalls}
## concept_type
${row.type}
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT-T03
SYS-CVS
## topic
General pathology
## subtopic
Haemodynamic disorders
## microtopic
${row.micro}
## nanotopic
${row.nano}
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Circulatory disturbances > ${row.micro}
## universities
hu
## learner_years
1
## article_ids
${row.article}
## related_article_ids
${row.article === thromboembolismArticle ? shockCongestionArticle : thromboembolismArticle}
## related_concept_ids
${(conceptRelated[row.ref] ?? []).map((ref) => byRef[ref].id).join('\n')}
## resource_ids
${[...new Set([assessment, ...row.teaching.map((item) => item.source)])].join('\n')}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.8
## exam_weight_by_year
HU_Y1=0.8
## clinical_relevance
0.84
## academic_relevance
0.97
## weight_confidence
0.58
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF pp${row.qPage}, ${row.answerPage} ${row.ref} | visibly printed answer; not an official exam
## confidence
0.93
## atomic_claim_ids
${row.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${row.teaching.map((item) => `[Teaching p${item.page}] ${item.text}`).join('\n')}
[Solved pp${row.qPage}, ${row.answerPage} ${row.ref}] ${row.stem} Answer: ${row.options['ABCD'.indexOf(row.keyLetter)] ?? row.options[0]}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
drafted_not_reviewed
## exclusion_reason

## field_notes
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: Blank pending independently verified Arabic terminology review.
microtopicId: No reviewed microtopic ID exists beneath SYS-FND-T03 for this overlay.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 6 completed the search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
`

const sparseConcept = (row) => `# Item
## id
${row.id}
## label
${row.reuseLabel}
## canonical_key
${row.reuseKey}
## article_ids
+${row.article}
## atomic_claim_ids
${row.reuseClaim ? `+${row.reuseClaim}` : `+${row.claim}`}
`

const reuseSourceFiles = {
  UC11: join(repo, 'docs', 'import-ready', 'concept', 'SYS-CVS-CONCEPT-T08.md'),
  UC13: join(repo, 'docs', 'import-ready', 'concept', '101-ISK-mcq-concepts.md'),
}

const fullReuseConcept = (row) => {
  const sourceFile = reuseSourceFiles[row.ref]
  if (!sourceFile) return sparseConcept(row)
  const block = readFileSync(sourceFile, 'utf8')
    .split(/^\s*---\s*$/m)
    .find((part) => part.includes(`## id\n${row.id}`))
  if (!block) throw new Error(`Could not find governed concept ${row.id} for ${row.ref}`)

  const sections = [...block.matchAll(/^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm)]
    .map((match) => ({ heading: match[1].trim(), key: match[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''), body: match[2].trim() }))
  const set = (key, heading, body) => {
    const existing = sections.find((section) => section.key === key)
    if (existing) existing.body = body
    else sections.push({ key, heading, body })
  }

  set('article_ids', 'article_ids', `+${row.article}`)
  set('atomic_claim_ids', 'atomic_claim_ids', `+${row.claim}`)
  set('resource_ids', 'resource_ids', `+${[assessment, ...row.teaching.map((item) => item.source)].join('\n')}`)
  set('original_wording', 'original_wording', `+[Solved pp${row.qPage}, ${row.answerPage} ${row.ref}] ${row.stem} Answer: ${row.options['ABCD'.indexOf(row.keyLetter)]}.`)

  return `# Item\n${sections.map((section) => `## ${section.heading}\n${section.body}`).join('\n')}`
}

const explain = (row, index) => {
  const correct = 'ABCD'.indexOf(row.keyLetter)
  if (index === correct) return `${row.options[index]} is correct because ${row.reasons[index]}. The decisive clue is that ${row.clue}. This links the clinical pattern or statement to the specific vascular mechanism being tested. Following the vessel, pressure change or shock physiology makes the conclusion reproducible.`
  return `${row.options[index]} does not fit because ${row.reasons[index]}. The decisive clue is that ${row.clue}, which supports ${row.options[correct]}. This alternative represents a different vascular territory, mechanism or haemodynamic state. Tracing the event from source to consequence prevents it from replacing the printed answer.`
}

const question = (row) => `# Item
## id
${qid(row)}
## title
${row.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${row.stem}
## format
${row.options.length === 2 ? 'true or false' : 'single best answer'}
## derived_from

## correct_answer
${row.keyLetter}
${row.options.map((option, i) => `## answer_${'abcd'[i]}\n${option}\n## explanation_${'abcd'[i]}\n${explain(row, i)}`).join('\n')}
## topic
General pathology
## subtopic
Haemodynamic disorders
## difficulty
${row.difficulty}
## question_type
${row.options.length === 2 ? 'True/False' : 'Clinical application'}
## main_concept
${row.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Circulatory disturbances > ${row.micro}
## clinical_relevance
0.84
## academic_relevance
0.97
## cognitive_effort_score
0.62
## exam_weight_by_year
HU_Y1=0.8
## question_only_for
HU_Y1
## concept_ids
${row.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${row.effort}
## setting
Both
## reasoning_level
${row.reasoning}
## inferred_difficulty
${row.inferred}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${row.article}
${row.ref === 'UC14' ? priorCongestionArticle : ''}
## resource_ids
${[...new Set([assessment, ...row.teaching.map((item) => item.source)])].join('\n')}
## learning_objective
${row.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${row.qPage} prompt and p${row.answerPage} answer, Family-6 ${row.ref}: exact wording preserved; visibly printed answer ${row.options['ABCD'.indexOf(row.keyLetter)]}. Authority: tier-3 solved local study bank, not an official exam or authenticated official key.${row.teaching.length ? ` Teaching support: ${row.teaching.map((item) => `${item.source}, PDF p${item.page}`).join('; ')}.` : ''}
## attachments

## attached_image

## author_notes
Stem, option order where printed, and printed answer are preserved exactly. True/False prompts retain their source wording and are represented only by the two choices the source explicitly provides. No official sitting, marks or recurrence claim is inferred.${row.reuseId ? ' This question reuses an already governed same-scope concept rather than creating a rival.' : ''}
## estimated_seconds
75
## randomise_answers
${row.options.length === 2 ? 'no' : 'yes'}
`

const article = ({ id, title, aliases, micro, nano, subset, other, summary, sections, loses, notes }) => `# Item
## id
${id}
## title
${title}
## arabic_title

## aliases
${aliases.join('\n')}
## subject
fnd
## topic
General pathology
## subtopic
Haemodynamic disorders
## microtopic
${micro}
## nanotopic
${nano}
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT-T03
SYS-CVS
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## summary
${summary}
## sections
${sections}
## published_summary

## published_sections

## hold_these
${subset.map((row) => row.display).join('\n')}
## lose_the_mark
${loses.join('\n')}
## related_concepts
${subset.map((row) => row.id).join('\n')}
## related_articles
${other}
## question_ids
${subset.map(qid).join('\n')}
## resource_ids
${lecture1}
${lecture2}
${assessment}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Circulatory disturbances > ${micro}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; current Circulation 1/2 teaching supplies local context and the solved Family-6 study bank supplies assessment signal without official-exam authority.
## annotations
${subset.map((row) => `### definition_of · ${row.id}\nQuote: ${row.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((row) => `### ${row.display}\nClaims: ${row.claim}\nCitations: ${[...row.currCits, row.asmCit].join(', ')}\nSpan: ${row.span}`).join('\n\n')}
## article_source_ids
${lecture1}
${lecture2}
${assessment}
## claim_ids
${[...new Set(subset.map((row) => row.claim))].join('\n')}
## span_ids
${subset.map((row) => row.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Current dated HU-BMS-102 Circulation 1 and Circulation 2 lectures for locally taught shock, thrombosis, embolism and congestion mechanisms.
Tier-3 solved local Family-6 study bank, pages 6–9, with visibly printed answers.
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication. UC12 has exact assessment support but no separate same-wording local teaching-page statement in the governed lecture pair.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
${notes}
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for the tested relationships.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.
`

const thromboRows = rows.filter((row) => row.article === thromboembolismArticle)
const shockRows = rows.filter((row) => row.article === shockCongestionArticle)
const articles = [
  article({ id: thromboembolismArticle, title: 'Venous and arterial thromboembolism patterns', aliases: ['DVT, pulmonary embolism and arterial embolism', 'Clinical routes of thromboembolism'], micro: 'Thromboembolism', nano: 'Source, route and target organ', subset: thromboRows, other: shockCongestionArticle,
    summary: 'Thromboembolic questions are solved by tracing the clot from its source through the circulation to its target. Postoperative leg swelling indicates DVT, a systemic venous thrombus can reach the lungs, and an arterial embolus can cause ischaemic stroke; an intracardiac communication creates the paradoxical exception.',
    sections: `### Definition
Thromboembolism occurs when part of a thrombus detaches, travels in blood and lodges downstream. ${byRef.UC02.display}

### Mechanism
${byRef.UC05.display} Systemic venous emboli normally cross the right heart and enter pulmonary arteries. ${byRef.UC11.display} A right-to-left intracardiac passage bypasses the pulmonary filter and creates paradoxical systemic embolism.

### Key determinants
${byRef.UC06.display} The vascular side matters: venous emboli usually reach lungs, while left-heart or arterial emboli enter systemic organs. Sudden focal neurological deficit with confirmed ischaemia therefore indicates arterial occlusion rather than a venous-sinus event.

### Clinical significance
Recent orthopaedic surgery supplies stasis, injury and hypercoagulability. A swollen calf plus acute hypoxia, haemoptysis and chest pain connects the leg-vein source to pulmonary embolism; atherosclerosis plus sudden focal deficit connects arterial thromboembolism to ischaemic stroke.`,
    loses: ['Ignoring a swollen calf when evaluating acute chest symptoms.', 'Sending an ordinary venous embolus into systemic arteries without a right-to-left route.', 'Calling imaging-confirmed ischaemic stroke haemorrhagic.'], notes: 'The paradoxical-embolism concept is reused by exact ID and receives only a sparse article/claim link.' }),
  article({ id: shockCongestionArticle, title: 'Shock mechanisms and sided venous congestion', aliases: ['Hypovolaemia, anaphylaxis and heart-failure congestion', 'Systemic versus pulmonary congestion'], micro: 'Shock and congestion', nano: 'Volume loss, vascular tone and venous backup', subset: shockRows, other: thromboembolismArticle,
    summary: 'Shock reflects inadequate tissue perfusion but its mechanism determines the physical pattern. Traumatic blood loss produces cold tachycardic hypovolaemic shock, IgE-mediated anaphylaxis produces systemic vasodilatation and permeability, and heart failure causes venous congestion upstream of the failing side.',
    sections: `### Definition
Shock is systemic hypoperfusion with cellular hypoxia. ${byRef.UC08.display} Reduced circulating volume lowers venous return and cardiac output, while compensatory vasoconstriction makes the skin cold and clammy.

### Mechanism
${byRef.UC13.display} Anaphylaxis instead loses effective vascular resistance and intravascular fluid through widespread vasodilatation and capillary leak. The different vascular response explains why the mechanism, not hypotension alone, identifies the shock type.

### Key determinants
${byRef.UC12.display} Venous blood accumulates upstream of a failing ventricle: right-sided failure backs up systemic veins and left-sided failure backs up pulmonary veins. ${byRef.UC14.display}

### Clinical significance
Trauma with severe hypotension, tachycardia and cold clammy skin indicates volume loss. An IgE-mediated statement that includes vasodilatation and increased permeability is true. A statement assigning pulmonary congestion to right failure and systemic congestion to left failure is false because it reverses the circuits.`,
    loses: ['Calling cold tachycardic traumatic shock neurogenic.', 'Reversing right-sided systemic and left-sided pulmonary congestion.', 'Separating IgE from the vasodilatation and permeability of anaphylaxis.'], notes: 'The anaphylaxis and nutmeg-liver concepts are reused by exact IDs rather than reminted.' }),
].join('\n---\n\n')

const claim = (row) => `# Item
## id
${row.claim}
## concept_id
${row.id}
## subject
${row.subject}
## predicate
${row.predicate}
## object
${row.object}
## display_text
${row.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
${row.teaching.length ? '0.92' : '0.84'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: ${row.teaching.length ? 'current local curriculum plus auxiliary printed answer' : 'auxiliary printed answer only for the exact sided-congestion statement'}
`

const curriculumCitation = (row, item, i) => `# Item
## id
${row.currCits[i]}
## claim_id
${row.claim}
## resource_id
${item.source}
## evidence_role
local_curriculum
## support_span
${item.text}
## locator_type
page
## locator_page
${item.page}
## locator_section
${row.micro}
## locator_detail
PDF p${item.page}, current HU-BMS-102 circulatory teaching support for Family-6 ${row.ref}
## context_note
Local curriculum support only; independent medical verification remains required.
## confidence
0.92
## counts_as_claim_evidence
no
`

const assessmentCitation = (row) => `# Item
## id
${row.asmCit}
## claim_id
${row.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${row.stem} Answer: ${row.options['ABCD'.indexOf(row.keyLetter)]}.
## locator_type
page
## locator_page
${row.answerPage}
## locator_section
Family 6 ${row.ref}
## locator_detail
Solved PDF p${row.qPage} prompt and p${row.answerPage} visibly printed answer
## context_note
Tier-3 solved local study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.94
## counts_as_claim_evidence
no
`

const citations = rows.flatMap((row) => [...row.teaching.map((item, i) => curriculumCitation(row, item, i)), assessmentCitation(row)]).join('\n---\n\n')
const span = (row) => `# Item
## id
${row.span}
## article_id
${row.article}
## section_id
${row.article.toLowerCase()}-${row.nano.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${row.display}
## claim_ids
${row.claim}
## citation_ids
${[...row.currCits, row.asmCit].join('\n')}
`

const relationDefs = [
  ['UC02', 'associated_with', 'UC05', 'a postoperative lower-limb DVT can become the source of pulmonary embolism'],
  ['UC05', 'contrasts_with', 'UC11', 'ordinary venous emboli reach lungs whereas paradoxical emboli bypass the pulmonary filter'],
  ['UC06', 'associated_with', 'UC11', 'both can end in systemic arterial cerebral occlusion through different embolic sources'],
  ['UC08', 'contrasts_with', 'UC13', 'hypovolaemic shock loses circulating volume whereas anaphylactic shock loses vascular tone and permeability control'],
  ['UC12', 'associated_with', 'UC14', 'right-sided systemic venous congestion can produce chronic hepatic nutmeg morphology'],
  ['UC05', 'contrasts_with', 'UC06', 'venous thromboembolism targets pulmonary arteries while systemic arterial thromboembolism targets organs'],
]
const relation = ([a, type, b, note]) => `# Item
## source
${byRef[a].id}
## type
${type}
## target
${byRef[b].id}
## evidence_claim_ids
${byRef[a].claim}
${byRef[b].claim}
## citation_ids
${[...byRef[a].currCits, byRef[a].asmCit, ...byRef[b].currCits, byRef[b].asmCit].join('\n')}
## verification_status
needs_evidence
## confidence
0.86
## qualifiers
scope: ${note}
## reviewer
Medical team, Helwan Pathology faculty
`

const conceptRecords = rows.map((row) => row.reuseId ? fullReuseConcept(row) : fullConcept(row)).join('\n---\n\n')
const files = new Map([
  ['concept/HU-BMS-102-pathology-family6-part2-concepts.md', conceptRecords],
  ['article/HU-BMS-102-pathology-family6-part2-articles.md', articles],
  ['question/HU-BMS-102-pathology-family6-part2-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family6-part2-claims.md', newClaimRows.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family6-part2-citations.md', citations],
  ['evidence/HU-BMS-102-pathology-family6-part2-spans.md', rows.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family6-part2-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])
for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '6-part2', released: { articles: 2, conceptRows: rows.length, newConcepts: newRows.length, conceptReuses: rows.length - newRows.length, questions: rows.length, claims: newClaimRows.length, citations: rows.reduce((n, row) => n + row.teaching.length + 1, 0), spans: rows.length, relations: relationDefs.length }, remaining: { routineUnmarkedWrittenCases: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'], specialSource: ['SC07', 'UC10', 'UC15'], family5KeyConflicts: ['A01', 'A16'] }, sourceRefs: rows.map((row) => row.ref) }, null, 2))
