import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const lecture = 'src_50d9ef5f2db5dc46e3e3'
const assessment = 'src_ece98ba3324ee657c538'
const edemaArticle = 'ART-HU-BMS102-PAT-OEDEMA-MECHANISMS'
const congestionArticle = 'ART-HU-BMS102-PAT-HYPERAEMIA-CONGESTION'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'SK01', key: 'pathology.edema.generalized-causes-localized-venous-obstruction', label: 'Venous obstruction causes local rather than generalised oedema', aliases: ['Venous obstruction and localised oedema', 'Generalised oedema exception'],
    definition: 'Generalised oedema reflects a systemic disturbance such as heart failure, nephrotic syndrome, cirrhosis or severe malnutrition. Venous obstruction acts within the obstructed drainage territory and therefore produces localised oedema rather than a generalised pattern.', objective: 'Distinguish venous obstruction as a localised cause from systemic causes of generalised oedema.', pitfalls: 'Choosing any cause of oedema without first deciding whether its distribution is localised or generalised.',
    type: 'classification', micro: 'Oedema patterns', nano: 'Generalised versus localised oedema', article: edemaArticle,
    subject: 'Venous obstruction', predicate: 'causes', object: 'localised rather than generalised oedema', display: 'Venous obstruction causes localised rather than generalised oedema.',
    teaching: [{ page: 11, text: 'Causes of localized edema ... Obstructive edema: -venous: edema of lower limb due to pressure of a pregnant uterus on the iliac vein.' }],
    qPage: 1, qPageLabel: 'p1', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 32,
    stem: 'Which of the following is NOT a cause of generalized edema?', keyLetter: 'C', options: ['Right-sided heart failure', 'Nephrotic syndrome', 'Venous obstruction', 'Liver cirrhosis', 'Severe malnutrition'], clue: 'the stem asks for the exception among systemic causes of generalised oedema',
    reasons: ['right-sided heart failure raises systemic venous pressure and can produce generalised oedema', 'nephrotic syndrome lowers plasma oncotic pressure and can produce generalised oedema', 'venous obstruction produces oedema within its local drainage territory', 'liver cirrhosis can cause generalised oedema through hypoalbuminaemia and altered hydrostatic forces', 'severe malnutrition can lower plasma protein concentration and cause generalised oedema'],
  },
  {
    ref: 'SK02', key: 'pathology.edema.inflammatory-increased-vascular-permeability', label: 'Inflammatory oedema is driven primarily by increased vascular permeability', aliases: ['Inflammatory capillary leak', 'Permeability mechanism of inflammatory oedema'],
    definition: 'Inflammatory mediators increase microvascular permeability, allowing protein-rich fluid to escape into the interstitium. The resulting exudate raises interstitial fluid content and produces inflammatory oedema.', objective: 'Identify increased vascular permeability as the primary mechanism of inflammatory oedema.', pitfalls: 'Substituting the low-oncotic-pressure mechanism of nephrotic oedema or the impaired-drainage mechanism of lymphoedema.',
    type: 'pathophysiological_mechanism', micro: 'Oedema mechanisms', nano: 'Inflammatory vascular permeability', article: edemaArticle,
    subject: 'Inflammatory oedema', predicate: 'is driven primarily by', object: 'increased vascular permeability', display: 'Inflammatory oedema is driven primarily by increased vascular permeability.',
    teaching: [{ page: 20, text: 'The edema is most likely the result of: ... Increased vascular permeability.' }],
    qPage: 1, qPageLabel: 'p1', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 35,
    stem: 'Which mechanism plays a primary role in the pathogenesis of inflammatory edema?', keyLetter: 'A', options: ['Increased vascular permeability', 'Decreased plasma oncotic pressure', 'Lymphatic obstruction', 'Increased sodium retention', 'Decreased hydrostatic pressure'], clue: 'the oedema is explicitly inflammatory',
    reasons: ['inflammation opens endothelial gaps and permits protein-rich fluid to enter tissue', 'decreased plasma oncotic pressure characterises protein-loss or reduced-synthesis states', 'lymphatic obstruction impairs interstitial fluid drainage rather than initiating ordinary inflammatory exudation', 'sodium retention expands intravascular volume and favours hydrostatic oedema', 'decreased hydrostatic pressure would reduce rather than promote filtration'],
  },
  {
    ref: 'SK03', key: 'pathology.edema.pitting-congestive-heart-failure', label: 'Congestive heart failure commonly produces pitting oedema', aliases: ['Cardiac pitting oedema', 'Heart-failure dependent oedema'],
    definition: 'Congestive heart failure raises venous and capillary hydrostatic pressure, pushing mobile low-protein fluid into interstitial tissues. Sustained pressure over the affected area displaces that fluid and leaves a temporary pit.', objective: 'Recognise congestive heart failure as a common cause of pitting oedema.', pitfalls: 'Choosing lymphatic obstruction or myxoedema, which characteristically cause non-pitting swelling.',
    type: 'risk_association', micro: 'Oedema patterns', nano: 'Cardiac pitting oedema', article: edemaArticle,
    subject: 'Congestive heart failure', predicate: 'commonly produces', object: 'pitting oedema', display: 'Congestive heart failure commonly produces pitting oedema.',
    teaching: [{ page: 14, text: 'Cardiac, renal, nutritional and edema due to venous obstruction are all pitting edema.' }],
    qPage: 1, qPageLabel: 'p1', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 30,
    stem: 'Pitting edema is commonly associated with which condition?', keyLetter: 'C', options: ['Lymphatic obstruction', 'Myxedema', 'Congestive heart failure', 'Allergic angioedema', 'Local inflammation'], clue: 'the question asks for a classic systemic cause of freely mobile interstitial fluid',
    reasons: ['chronic lymphatic obstruction produces protein-rich swelling that becomes non-pitting with fibrosis', 'myxoedema is characteristically non-pitting because of interstitial mucopolysaccharides', 'congestive heart failure produces hydrostatic, dependent and usually pitting oedema', 'allergic angioedema is an acute permeability-mediated swelling rather than the classic pitting association', 'local inflammation produces a protein-rich exudate and is not the best pitting association'],
  },
  {
    ref: 'SK04', key: 'pathology.edema.filariasis-lymphatic-nonpitting', label: 'Filariasis causes lymphatic obstruction and non-pitting oedema', aliases: ['Filarial lymphoedema', 'Elephantiasis non-pitting oedema'],
    definition: 'Filariasis can obstruct lymphatic vessels and prevent removal of protein-rich interstitial fluid. Persistent protein accumulation promotes inflammation and fibrosis, converting the swelling into characteristic non-pitting lymphoedema.', objective: 'Identify filariasis as the most likely cause of non-pitting oedema among common systemic and local alternatives.', pitfalls: 'Selecting heart failure, nephrotic syndrome, cirrhosis or venous thrombosis, which usually produce mobile pitting fluid.',
    type: 'pathophysiological_mechanism', micro: 'Oedema patterns', nano: 'Filarial non-pitting lymphoedema', article: edemaArticle,
    subject: 'Filariasis', predicate: 'causes', object: 'lymphatic obstruction with non-pitting oedema', display: 'Filariasis causes lymphatic obstruction with non-pitting oedema.',
    teaching: [{ page: 11, text: 'Obstructive edema: ... -lymphatic: Filariasis chronic lymphangitis and lymphadenitis.' }, { page: 15, text: 'Edema due to lymphatic obstruction ... initiates fibrosis.' }],
    qPage: 1, qPageLabel: 'p1', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 34,
    stem: 'Which of the following conditions is MOST LIKELY to cause non-pitting edema?', keyLetter: 'C', options: ['Right-sided heart failure', 'Nephrotic syndrome', 'Filariasis', 'Liver cirrhosis', 'Deep vein thrombosis'], clue: 'the sought condition obstructs lymphatics and promotes fibrotic protein-rich swelling',
    reasons: ['right-sided heart failure produces hydrostatic and usually pitting oedema', 'nephrotic syndrome produces low-oncotic-pressure and usually pitting oedema', 'filariasis obstructs lymphatics and produces chronic non-pitting lymphoedema', 'liver cirrhosis produces ascites and systemic pitting oedema rather than this lymphatic pattern', 'deep vein thrombosis raises local venous pressure and usually causes pitting swelling'],
  },
  {
    ref: 'SK05', key: 'pathology.circulation.hyperaemia-active-congestion-passive', label: 'Hyperaemia is active whereas congestion is passive', aliases: ['Hyperaemia versus congestion', 'Active flow versus passive venous congestion'],
    definition: 'Hyperaemia is an active increase in blood flow caused by arteriolar dilatation and brings oxygenated blood into tissue. Congestion is a passive increase in blood volume caused by impaired venous outflow and accumulates deoxygenated blood.', objective: 'Distinguish hyperaemia from congestion by active inflow versus passive outflow impairment.', pitfalls: 'Reversing the processes or using colour alone without identifying whether inflow increased or outflow failed.',
    type: 'comparison', micro: 'Hyperaemia and congestion', nano: 'Active versus passive blood accumulation', article: congestionArticle,
    subject: 'Hyperaemia and congestion', predicate: 'differ because', object: 'hyperaemia is active whereas congestion is passive', display: 'Hyperaemia is active whereas congestion is passive.',
    teaching: [{ page: 22, text: 'HYPERAEMIA ... an increase in the blood flow to an organ as a result of active dilation of its arterioles.' }, { page: 23, text: 'CONGESTION ... passive process caused by impaired outflow from a tissue.' }],
    qPage: 1, qPageLabel: 'p1', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 30,
    stem: 'What differentiates hyperemia from congestion?', keyLetter: 'A', options: ['Hyperemia is an active process, while congestion is passive', 'Hyperemia leads to cyanosis, whereas congestion causes erythema', 'Hyperemia results from venous obstruction', 'Congestion is only seen in acute conditions', 'Hyperemia is associated with tissue hypoxia'], clue: 'the defining distinction is the direction and activity of blood-flow change',
    reasons: ['arteriolar dilatation actively increases inflow in hyperaemia, while impaired outflow passively produces congestion', 'the colour effects are reversed because hyperaemia is red and congestion can be cyanotic', 'venous obstruction produces congestion rather than hyperaemia', 'congestion can be acute or chronic', 'hyperaemia increases oxygenated inflow, whereas prolonged congestion is the process associated with hypoxia'],
  },
  {
    ref: 'SK06', key: 'pathology.congestion.liver-nutmeg-appearance', label: 'Chronic passive liver congestion produces a nutmeg appearance', aliases: ['Nutmeg liver', 'Congestive hepatopathy morphology'],
    definition: 'Chronic passive congestion dilates and fills central veins and centrilobular sinusoids with blood while midzonal hepatocytes develop fatty change. Alternating dark-red congested and yellow fatty areas create the mottled cut surface called nutmeg liver.', objective: 'Identify nutmeg appearance as the characteristic gross feature of chronic passive liver congestion.', pitfalls: 'Selecting an inflammatory infiltrate or increased arterial flow, neither of which explains the mottled venous-congestion pattern.',
    type: 'morphological_pattern', micro: 'Organ congestion', nano: 'Nutmeg liver', article: congestionArticle,
    subject: 'Chronic passive congestion of the liver', predicate: 'produces', object: 'a nutmeg appearance', display: 'Chronic passive congestion of the liver produces a nutmeg appearance.',
    teaching: [{ page: 26, text: 'Outer and cut section show mottled appearance ... dark red (congested) and yellow (fatty change) colorations. Such mottled appearance is called nut meg liver.' }],
    qPage: 2, qPageLabel: 'pp1–2', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 33,
    stem: 'Which of the following is a characteristic of chronic passive congestion of the liver?', keyLetter: 'B', options: ['Acute inflammatory infiltrates', 'Nutmeg liver appearance', 'Decreased Kupffer cell activity', 'Increased arterial blood flow', 'Absence of hemosiderin-laden macrophages'], clue: 'the question asks for the characteristic morphology of chronic passive hepatic venous congestion',
    reasons: ['acute inflammatory infiltrates describe inflammation rather than chronic passive venous congestion', 'alternating centrilobular congestion and midzonal fatty change create the nutmeg pattern', 'Kupffer-cell activity is not the defining gross feature and Kupffer cells may contain haemosiderin', 'the lesion is caused by impaired venous outflow rather than increased arterial inflow', 'haemosiderin can appear in Kupffer cells, so its absence is not characteristic'],
  },
  {
    ref: 'SK07', key: 'pathology.congestion.pulmonary-heart-failure-cells', label: 'Chronic pulmonary congestion produces haemosiderin-laden heart-failure cells', aliases: ['Pulmonary siderophages', 'Haemosiderin-laden alveolar macrophages'],
    definition: 'Chronic pulmonary venous congestion causes alveolar capillary rupture and leakage of erythrocytes into alveoli. Alveolar macrophages ingest the erythrocytes, degrade haemoglobin and accumulate haemosiderin; these siderophages are called heart-failure cells.', objective: 'Recognise haemosiderin-laden alveolar macrophages as heart-failure cells in chronic pulmonary congestion.', pitfalls: 'Choosing neutrophils, hyaline membranes or necrotising vasculitis when the vignette specifically indicates chronic mitral-stenosis congestion.',
    type: 'morphological_pattern', micro: 'Organ congestion', nano: 'Pulmonary heart-failure cells', article: congestionArticle,
    subject: 'Chronic pulmonary congestion', predicate: 'produces', object: 'haemosiderin-laden alveolar macrophages called heart-failure cells', display: 'Chronic pulmonary congestion produces haemosiderin-laden alveolar macrophages called heart-failure cells.',
    teaching: [{ page: 30, text: 'Long-standing rheumatic heart disease with mitral stenosis ... noted the presence of "heart failure cells." This finding results from ... chronic passive congestion of the lungs.' }],
    qPage: 2, qPageLabel: 'p2', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 50,
    stem: 'A patient with long-standing mitral stenosis develops pulmonary congestion. Which microscopic finding is characteristic?', keyLetter: 'C', options: ['Lipid-laden macrophages', 'Neutrophilic infiltrates', 'Heart failure cells', 'Caseous necrosis', 'Fibrinoid necrosis'], clue: 'long-standing mitral stenosis causes chronic pulmonary venous congestion',
    reasons: ['lipid-laden macrophages are foam cells and do not define chronic pulmonary venous congestion', 'neutrophilic infiltrates suggest acute bacterial inflammation', 'haemosiderin-laden alveolar macrophages are heart-failure cells', 'caseous necrosis is characteristic of tuberculosis rather than congestion', 'fibrinoid necrosis occurs in severe vascular or immune injury rather than uncomplicated chronic venous congestion'],
  },
  {
    ref: 'UC01', key: 'pathology.edema.heart-failure-increased-capillary-hydrostatic-pressure', label: 'Heart-failure oedema results from increased capillary hydrostatic pressure', aliases: ['Hydrostatic cardiac oedema', 'Congestive heart-failure oedema mechanism'],
    definition: 'Congestive heart failure elevates venous pressure and therefore capillary hydrostatic pressure. The increased outward force drives a protein-poor transudate into lung and dependent interstitial tissues, producing crackles and pitting peripheral oedema.', objective: 'Explain pulmonary and dependent oedema in congestive heart failure by increased capillary hydrostatic pressure.', pitfalls: 'Choosing reduced oncotic pressure, lymphatic obstruction or inflammatory permeability when the vignette gives congestive heart failure and dependent pitting oedema.',
    type: 'pathophysiological_mechanism', micro: 'Oedema mechanisms', nano: 'Heart-failure hydrostatic oedema', article: edemaArticle,
    subject: 'Congestive heart-failure oedema', predicate: 'results from', object: 'increased capillary hydrostatic pressure', display: 'Congestive heart-failure oedema results from increased capillary hydrostatic pressure.',
    teaching: [{ page: 12, text: 'Increased hydrostatic pressure due to impaired venous return ... systemic in congestive heart failure.' }],
    qPage: 6, answerPage: 8, qPageLabel: 'pp6, 8', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 58,
    stem: 'A 68-year-old man with a history of congestive heart failure presents with progressive dyspnea and orthopnea. On examination, he has bilateral lung crackles and pitting edema in his lower extremities. What is the most likely underlying cause of his edema?', keyLetter: 'A', options: ['Increased capillary hydrostatic pressure', 'Decreased plasma oncotic pressure', 'Lymphatic obstruction', 'Increased capillary permeability'], clue: 'heart failure, lung crackles and dependent pitting oedema all point to venous-pressure elevation',
    reasons: ['heart failure raises venous and capillary hydrostatic pressure, driving transudation into lungs and dependent tissues', 'reduced oncotic pressure is typical of severe hypoalbuminaemia such as nephrotic syndrome', 'lymphatic obstruction usually produces regional lymphoedema', 'increased permeability produces inflammatory or allergic oedema'],
  },
  {
    ref: 'UC03', reuseRef: 'SK07', article: congestionArticle,
    objective: 'Identify haemosiderin-containing alveolar macrophages as the expected lung finding in chronic mitral-stenosis congestion.',
    qPage: 6, answerPage: 8, qPageLabel: 'pp6, 8', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 60,
    stem: 'A 36-year-old man with a history of long-standing mitral stenosis presents with exertional dyspnea and hemoptysis. Chest X-ray shows pulmonary congestion. What histological finding is most likely in the lungs?', keyLetter: 'A', options: ['Alveolar macrophages with hemosiderin (heart failure cells)', 'Necrotizing vasculitis', 'Thickened alveolar septa with hyaline membranes', 'Pulmonary arterial thrombosis'], clue: 'chronic pulmonary venous congestion has allowed erythrocytes to leak into alveoli and be phagocytosed',
    reasons: ['alveolar macrophages ingest extravasated erythrocytes and retain haemosiderin as heart-failure cells', 'necrotising vasculitis indicates destructive vessel inflammation rather than passive venous congestion', 'hyaline membranes are a feature of diffuse alveolar damage rather than this chronic congestive process', 'pulmonary arterial thrombosis does not explain the characteristic macrophage response to long-standing mitral stenosis'],
  },
  {
    ref: 'UC04', key: 'pathology.edema.nephrotic-reduced-plasma-oncotic-pressure', label: 'Nephrotic oedema results from reduced plasma oncotic pressure', aliases: ['Hypoalbuminaemic nephrotic oedema', 'Nephrotic periorbital oedema mechanism'],
    definition: 'Heavy urinary protein loss in nephrotic syndrome lowers plasma albumin and therefore plasma oncotic pressure. Reduced inward oncotic force favours net movement of fluid into the interstitium and produces prominent generalised or periorbital oedema.', objective: 'Explain severe periorbital oedema in nephrotic syndrome by reduced plasma oncotic pressure.', pitfalls: 'Calling the laboratory finding hyperalbuminaemia or selecting increased hydrostatic pressure when the defining abnormality is urinary protein loss.',
    type: 'pathophysiological_mechanism', micro: 'Oedema mechanisms', nano: 'Nephrotic low-oncotic oedema', article: edemaArticle,
    subject: 'Nephrotic oedema', predicate: 'results from', object: 'reduced plasma oncotic pressure', display: 'Nephrotic oedema results from reduced plasma oncotic pressure.',
    teaching: [{ page: 12, text: 'Reduced plasma osmotic pressure occurs with albumin loss e.g., nephrotic syndrome.' }],
    qPage: 6, answerPage: 8, qPageLabel: 'pp6, 8', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 55,
    stem: 'A 25-year-old woman with nephrotic syndrome presents with severe periorbital edema. Which of the following laboratory findings would you expect?', keyLetter: 'C', options: ['Hyperalbuminemia', 'Increased capillary hydrostatic pressure', 'Decreased plasma oncotic pressure', 'Hypernatremia'], clue: 'nephrotic syndrome causes heavy urinary protein loss',
    reasons: ['albumin is lost in urine, so hyperalbuminaemia is the opposite of the expected abnormality', 'raised hydrostatic pressure is the primary mechanism in venous congestion or heart failure', 'hypoalbuminaemia lowers plasma oncotic pressure and permits fluid to enter tissues', 'hypernatraemia is not the defining laboratory mechanism of nephrotic oedema'],
  },
  {
    ref: 'UC09', key: 'pathology.edema.cirrhotic-ascites-hydrostatic-oncotic-pressure', label: 'Cirrhotic ascites reflects increased hydrostatic and reduced oncotic pressure', aliases: ['Dual-pressure mechanism of cirrhotic ascites', 'Portal-hypertensive hypoalbuminaemic ascites'],
    definition: 'Cirrhosis promotes ascites through two cooperating forces: portal hypertension increases splanchnic capillary hydrostatic pressure, while impaired albumin synthesis reduces plasma oncotic pressure. Both changes favour movement of fluid into the peritoneal cavity.', objective: 'Identify increased hydrostatic pressure plus reduced oncotic pressure as the combined mechanism of cirrhotic ascites.', pitfalls: 'Choosing a single inflammatory or obstructive mechanism and overlooking the simultaneous effects of portal hypertension and hypoalbuminaemia.',
    type: 'pathophysiological_mechanism', micro: 'Oedema mechanisms', nano: 'Cirrhotic ascites', article: edemaArticle,
    subject: 'Cirrhotic ascites', predicate: 'reflects', object: 'increased hydrostatic pressure and reduced oncotic pressure', display: 'Cirrhotic ascites reflects increased hydrostatic pressure and reduced oncotic pressure.',
    teaching: [{ page: 12, text: 'Reduced plasma osmotic pressure occurs with ... reduced albumin synthesis due to liver cirrhosis.' }, { page: 18, text: 'Hydroperitonium (ascitis).' }],
    qPage: 7, answerPage: 8, qPageLabel: 'pp7–8', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 62,
    stem: 'A 55-year-old man with cirrhosis presents with massive ascites. What is the primary mechanism behind his fluid accumulation?', keyLetter: 'B', options: ['Increased capillary permeability', 'Increased hydrostatic pressure and reduced oncotic pressure', 'Lymphatic obstruction', 'Venous thrombosis'], clue: 'cirrhosis combines portal hypertension with impaired albumin synthesis',
    reasons: ['increased permeability is the principal mechanism of inflammatory exudation, not the keyed cirrhotic combination', 'portal hypertension raises hydrostatic pressure while hypoalbuminaemia lowers oncotic pressure', 'lymphatic obstruction is not the primary combined mechanism described in this cirrhosis vignette', 'venous thrombosis can raise local pressure but does not account for the stated cirrhotic mechanism'],
  },
]

for (const row of rows) {
  if (row.reuseRef) continue
  row.id = idFor(row.key)
  row.claim = `CLM-HU102-F6P1-${row.ref}-01`
  row.span = `SPN-HU102-F6P1-${row.ref}-01`
  row.currCits = row.teaching.map((_, i) => `CIT-HU102-F6P1-${row.ref}-CURR${row.teaching.length > 1 ? `-${i + 1}` : ''}`)
}
const byRef = Object.fromEntries(rows.map((row) => [row.ref, row]))
for (const row of rows) {
  if (row.reuseRef) {
    const base = byRef[row.reuseRef]
    row.id = base.id
    row.claim = base.claim
    row.span = base.span
    row.currCits = base.currCits
    row.micro = base.micro
    row.nano = base.nano
  }
  row.asmCit = `CIT-HU102-F6P1-${row.ref}-ASM`
}
const conceptRows = rows.filter((row) => !row.reuseRef)
const qid = (row) => `Q-HU102-PAT-CIRC-F6-${row.ref}`
const articleRows = { [edemaArticle]: conceptRows.filter((row) => row.article === edemaArticle), [congestionArticle]: conceptRows.filter((row) => row.article === congestionArticle) }

const conceptRelated = {
  SK01: ['SK03', 'SK04'], SK02: ['UC01', 'UC04'], SK03: ['UC01'], SK04: ['SK01'],
  SK05: ['SK06', 'SK07'], SK06: ['SK07'], SK07: ['SK06'], UC01: ['SK03', 'UC04'],
  UC04: ['UC01', 'UC09'], UC09: ['UC04'],
}

const concept = (row) => `# Item
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
${row.article === edemaArticle ? congestionArticle : edemaArticle}
## related_concept_ids
${conceptRelated[row.ref].map((ref) => byRef[ref].id).join('\n')}
## resource_ids
${lecture}
${assessment}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.8
## exam_weight_by_year
HU_Y1=0.8
## clinical_relevance
0.82
## academic_relevance
0.97
## weight_confidence
0.58
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF ${row.qPageLabel} ${row.ref} | visibly printed key; not an official exam
## confidence
0.94
## atomic_claim_ids
${row.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${row.teaching.map((item) => `[Teaching p${item.page}] ${item.text}`).join('\n')}
[Solved ${row.qPageLabel} ${row.ref}] ${row.stem} Answer: ${row.keyLetter}) ${row.options['ABCDE'.indexOf(row.keyLetter)]}.
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

const explain = (row, index) => {
  const correct = 'ABCDE'.indexOf(row.keyLetter)
  if (index === correct) return `${row.options[index]} is correct because ${row.reasons[index]}. The decisive clue is that ${row.clue}. This links the observed distribution or morphology to its specific haemodynamic mechanism. Keeping mechanism, distribution and tissue consequence separate makes the answer reproducible in a new vignette.`
  return `${row.options[index]} does not fit because ${row.reasons[index]}. The decisive clue is that ${row.clue}, which supports ${row.options[correct]}. This option belongs to a different pressure, drainage, inflammatory or morphological pattern. Matching the tested process before naming the disease prevents this distractor from replacing the printed answer.`
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
single best answer
## derived_from

## correct_answer
${row.keyLetter}
${row.options.map((option, i) => `## answer_${'abcde'[i]}\n${option}\n## explanation_${'abcde'[i]}\n${explain(row, i)}`).join('\n')}
## topic
General pathology
## subtopic
Haemodynamic disorders
## difficulty
${row.difficulty}
## question_type
Clinical application
## main_concept
${row.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Circulatory disturbances > ${row.micro}
## clinical_relevance
0.82
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
## resource_ids
${lecture}
${assessment}
## learning_objective
${row.objective}
## media_recommendations

## source_citation
${assessment}, PDF ${row.qPageLabel}, Family-6 ${row.ref}: exact stem and options preserved; visibly printed answer ${row.keyLetter}) ${row.options['ABCDE'.indexOf(row.keyLetter)]}${row.answerPage ? ` on p${row.answerPage}` : ''}. Authority: tier-3 solved local study bank, not an official exam or authenticated official key. Teaching support: ${lecture}, PDF ${[...new Set((row.reuseRef ? byRef[row.reuseRef].teaching : row.teaching).map((item) => item.page))].join(', ')}.
## attachments

## attached_image

## author_notes
Stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.${row.reuseRef ? ' This question reuses the SK07 pulmonary-congestion concept rather than creating a rival.' : ''}
## estimated_seconds
75
## randomise_answers
yes
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
${rows.filter((row) => row.article === id).map(qid).join('\n')}
## resource_ids
${lecture}
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
hu: Restricted to HU-BMS-102 Year-1; the current Circulation 1 lecture supplies teaching context and the solved Family-6 study bank supplies assessment signal without official-exam authority.
## annotations
${subset.map((row) => `### definition_of · ${row.id}\nQuote: ${row.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((row) => `### ${row.display}\nClaims: ${row.claim}\nCitations: ${[...row.currCits, row.asmCit, ...(row.ref === 'SK07' ? [byRef.UC03.asmCit] : [])].join(', ')}\nSpan: ${row.span}`).join('\n\n')}
## article_source_ids
${lecture}
${assessment}
## claim_ids
${subset.map((row) => row.claim).join('\n')}
## span_ids
${subset.map((row) => row.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Current dated HU-BMS-102 Circulation 1 teaching lecture, pages 11–30, for the tested oedema and congestion mechanisms.
Tier-3 solved local Family-6 study bank, pages 1–2 and 6–8, with visibly printed keys.
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.
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

const articles = [
  article({ id: edemaArticle, title: 'Oedema mechanisms and diagnostic patterns', aliases: ['Hydrostatic, oncotic, permeability and lymphatic oedema', 'Mechanisms of fluid accumulation'], micro: 'Oedema', nano: 'Mechanism and distribution', subset: articleRows[edemaArticle], other: congestionArticle,
    summary: 'Oedema develops when hydrostatic pressure rises, plasma oncotic pressure falls, vascular permeability increases or lymphatic drainage fails. Distribution and pitting distinguish systemic hydrostatic or oncotic fluid from local venous and chronic lymphatic swelling.',
    sections: `### Definition
Oedema is abnormal fluid accumulation in interstitial tissue or body cavities. A useful answer identifies both where the fluid is and which force or drainage pathway changed.

### Mechanism
${byRef.SK02.display} ${byRef.UC01.display} ${byRef.UC04.display} ${byRef.UC09.display} Hydrostatic pressure pushes fluid out of capillaries, plasma oncotic pressure draws it inward, permeability controls protein escape, and lymphatics return excess interstitial fluid and protein.

### Key determinants
${byRef.SK01.display} ${byRef.SK03.display} ${byRef.SK04.display} Local venous obstruction is not a generalised-oedema cause. Mobile hydrostatic or low-oncotic fluid usually pits, whereas chronic protein-rich lymphatic swelling becomes fibrotic and non-pitting.

### Clinical significance
Heart failure with crackles and dependent pitting oedema signals raised hydrostatic pressure. Nephrotic periorbital oedema signals reduced oncotic pressure. Cirrhotic ascites combines portal-hydrostatic and hypoalbuminaemic forces, so no single-force answer is sufficient for that vignette.`,
    loses: ['Calling every oedema cardiac without checking distribution and pitting.', 'Using reduced oncotic pressure for inflammatory oedema.', 'Calling filarial lymphoedema an ordinary pitting transudate.'], notes: 'This article covers only the seven oedema concepts required by Family6 Part1.' }),
  article({ id: congestionArticle, title: 'Hyperaemia and chronic organ congestion', aliases: ['Active hyperaemia and passive congestion', 'Nutmeg liver and heart-failure cells'], micro: 'Hyperaemia and congestion', nano: 'Active flow and chronic organ morphology', subset: articleRows[congestionArticle], other: edemaArticle,
    summary: 'Hyperaemia is active arteriolar inflow, whereas congestion is passive venous outflow failure. Chronic hepatic congestion produces nutmeg liver, and chronic pulmonary congestion produces haemosiderin-laden heart-failure cells.',
    sections: `### Definition
${byRef.SK05.display} Hyperaemia increases oxygenated inflow after arteriolar dilatation; congestion accumulates deoxygenated blood after venous outflow is impaired.

### Mechanism
Persistent congestion raises venous and capillary pressure, producing hypoxia, erythrocyte leakage, parenchymal injury and eventually fibrosis. The resulting morphology differs by organ but follows the same impaired-outflow principle.

### Key determinants
${byRef.SK06.display} Centrilobular congestion and necrosis alternate with midzonal fatty change to create a dark-red and yellow mottled cut surface. ${byRef.SK07.display} Alveolar macrophages acquire haemosiderin after ingesting extravasated erythrocytes.

### Clinical significance
Mitral stenosis causes chronic pulmonary venous congestion, so the lung finding is a siderophage rather than an acute inflammatory infiltrate. Chronic systemic venous congestion affects the liver and produces the nutmeg pattern before late congestive fibrosis develops.`,
    loses: ['Reversing hyperaemia and congestion.', 'Calling nutmeg liver an arterial-hyperaemia lesion.', 'Calling heart-failure cells lipid-laden macrophages or neutrophils.'], notes: 'SK07 and UC03 share one concept because both test the same chronic pulmonary-congestion morphology.' }),
].join('\n---\n\n')

const sourceRows = `# Item
## id
${lecture}
## title
Main-stream Circulatory 1 — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 4 - Circulation 1/Main-stream-circulatory-1-new.pdf
## media_type
application/pdf
## languages
en
## page_count
50
## sha256
50d9ef5f2db5dc46e3e3b10da4844e90c8c4cee5d94b7a0fc800960d83e939da
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Current dated HU-BMS-102 theoretical teaching lecture, 28 February 2026. It establishes local curriculum content, not independent medical verification and not official assessment authority.
## is_assessment
no

---

# Item
## id
${assessment}
## title
Circulatory 1 continuous-assessment bank — solved copy
## institution
Helwan BMS-102 local corpus; visible institutional attribution absent
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs continous self assessement circulatory 1 answers.pdf
## media_type
application/pdf
## languages
en
## page_count
9
## sha256
ece98ba3324ee657c53854561eb805b59feaf1dcc23eb499382f97adcf144c39
## processing_status
pending
## rights
Local assessment-labelled material held for internal authoring only; no page image is redistributed.
## qualification
Tier-3 solved local study bank with 28 printed-key occurrences across the bounded Circulatory 1 pair. It has no authenticated sitting, marks, candidate field or official-key designation; printed keys remain auxiliary assessment evidence only.
## is_assessment
yes
`

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
0.94
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: current local curriculum plus auxiliary printed key; source wording and scope retained
`

const curriculumCitation = (row, item, i) => `# Item
## id
${row.currCits[i]}
## claim_id
${row.claim}
## resource_id
${lecture}
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
PDF p${item.page}, current Circulation 1 teaching support for Family-6 ${row.ref}
## context_note
Local curriculum support only; independent medical verification remains required.
## confidence
0.94
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
${row.stem} Answer: ${row.keyLetter}) ${row.options['ABCDE'.indexOf(row.keyLetter)]}.
## locator_type
page
## locator_page
${row.answerPage ?? row.qPage}
## locator_section
Family 6 ${row.ref}
## locator_detail
Solved PDF ${row.qPageLabel}, exact stem and ordered options with visibly printed answer${row.answerPage ? ` on p${row.answerPage}` : ''}
## context_note
Tier-3 solved local study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.94
## counts_as_claim_evidence
no
`

const citations = rows.flatMap((row) => {
  if (row.reuseRef) return [assessmentCitation(row)]
  return [...row.teaching.map((item, i) => curriculumCitation(row, item, i)), assessmentCitation(row)]
}).join('\n---\n\n')

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
${[...row.currCits, row.asmCit, ...(row.ref === 'SK07' ? [byRef.UC03.asmCit] : [])].join('\n')}
`

const relationDefs = [
  ['SK01', 'contrasts_with', 'SK04', 'local venous and lymphatic causes are both regional but differ in pitting and drainage mechanism'],
  ['SK02', 'contrasts_with', 'UC04', 'inflammatory permeability oedema differs from nephrotic low-oncotic oedema'],
  ['SK03', 'associated_with', 'UC01', 'heart failure produces pitting oedema through raised capillary hydrostatic pressure'],
  ['SK04', 'contrasts_with', 'SK03', 'chronic lymphatic oedema is non-pitting whereas cardiac oedema is usually pitting'],
  ['SK05', 'associated_with', 'SK06', 'passive venous congestion supplies the mechanism for nutmeg liver'],
  ['SK05', 'associated_with', 'SK07', 'passive venous congestion supplies the mechanism for pulmonary heart-failure cells'],
  ['SK06', 'contrasts_with', 'SK07', 'hepatic and pulmonary congestion share impaired outflow but produce different organ morphology'],
  ['UC01', 'contrasts_with', 'UC04', 'raised hydrostatic and reduced oncotic pressure are distinct Starling-force mechanisms'],
  ['UC04', 'associated_with', 'UC09', 'low plasma oncotic pressure contributes to both nephrotic oedema and cirrhotic ascites'],
  ['UC01', 'associated_with', 'UC09', 'raised hydrostatic pressure contributes to both cardiac oedema and cirrhotic ascites'],
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
0.88
## qualifiers
scope: ${note}
## reviewer
Medical team, Helwan Pathology faculty
`

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family6-part1-sources.md', sourceRows],
  ['concept/HU-BMS-102-pathology-family6-part1-concepts.md', conceptRows.map(concept).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family6-part1-articles.md', articles],
  ['question/HU-BMS-102-pathology-family6-part1-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family6-part1-claims.md', conceptRows.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family6-part1-citations.md', citations],
  ['evidence/HU-BMS-102-pathology-family6-part1-spans.md', conceptRows.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family6-part1-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '6-part1',
  released: {
    sources: 2,
    articles: 2,
    concepts: conceptRows.length,
    questions: rows.length,
    conceptReuses: rows.length - conceptRows.length,
    claims: conceptRows.length,
    citations: rows.reduce((n, row) => n + (row.reuseRef ? 1 : row.teaching.length + 1), 0),
    spans: conceptRows.length,
    relations: relationDefs.length,
  },
  sourceRefs: rows.map((row) => row.ref),
  excluded: 'All prompt-only, unkeyed and questionable Family-6 records remain outside this bounded slice.',
}, null, 2))
