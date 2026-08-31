import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_f4017e73dcc32d5e9934'
const lecture = 'src_618d482aa23f51f29cf0'
const primaryArticle = 'ART-HU-BMS102-PAT-TB-CLINICAL-PRIMARY-INFECTION'
const morphologyArticle = 'ART-HU-BMS102-PAT-TUBERCLE-MORPHOLOGY-CASEATION'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    handle: 'pulmonary-tb-clinical', key: 'pathology.tuberculosis.pulmonary-clinical-features-caseous-sputum', label: 'Pulmonary tuberculosis can cause fever, night sweats and blood-stained caseous sputum', aliases: ['Pulmonary TB clinical presentation', 'Blood-stained caseous expectoration in TB'],
    definition: 'Pulmonary tuberculosis may present with constitutional symptoms such as low-grade fever and night sweating together with productive cough; expectoration of blood-stained caseous material strongly supports pulmonary TB in the tested setting.', objective: 'Recognise pulmonary tuberculosis from constitutional symptoms, cough and blood-stained caseous expectoration.', pitfalls: 'Choosing lung abscess, congestion or oedema while ignoring the chronic constitutional pattern and caseous material.', type: 'clinical_pattern', micro: 'Tuberculosis', nano: 'Pulmonary clinical presentation', article: primaryArticle,
    subject: 'Pulmonary tuberculosis', predicate: 'can present with', object: 'low-grade fever, night sweats, cough and blood-stained caseous expectoration', display: 'Pulmonary tuberculosis can present with low-grade fever, night sweats, cough and blood-stained caseous expectoration.', teachPage: 35, teachText: 'Clinical picture and diagnosis of tuberculosis: malaise, anorexia, weight loss, night sweating and productive cough.',
  },
  {
    handle: 'epithelioid-origin', key: 'pathology.granuloma.epithelioid-cell-macrophage-origin', label: 'Epithelioid cells in a tuberculous granuloma are transformed macrophages', aliases: ['Epithelioid histiocyte origin', 'Macrophage transformation in tubercle'],
    definition: 'Epithelioid cells are activated, transformed tissue macrophages (histiocytes). Their cohesive aggregates are a defining cellular component of the tuberculous granuloma.', objective: 'Identify macrophages or histiocytes as the cells that transform into epithelioid cells.', pitfalls: 'Being misled by the name epithelioid into selecting epithelial cells, or selecting lymphocytes, plasma cells or eosinophils.', type: 'cell_origin', micro: 'Tuberculous granuloma', nano: 'Epithelioid-cell origin', article: morphologyArticle,
    subject: 'Epithelioid cells in tuberculous granulomas', predicate: 'are derived from', object: 'transformed macrophages or histiocytes', display: 'Epithelioid cells in tuberculous granulomas are transformed macrophages or histiocytes.', teachPage: 38, teachText: 'Cellular tissue reaction: granuloma with numerous epithelioid cells and giant cells.',
  },
  {
    handle: 'primary-tb-definition', key: 'pathology.tuberculosis.primary-definition-first-infection', label: 'Primary tuberculosis is infection in a previously uninfected host', aliases: ['First infection with tuberculosis', 'Primary TB definition'],
    definition: 'Primary tuberculosis is tuberculosis occurring when the host is infected for the first time. It is contrasted with secondary disease caused by reinfection or reactivation.', objective: 'Define primary tuberculosis as first infection in a previously uninfected patient.', pitfalls: 'Defining primary disease by an unknown site, absence of immunity, or absence of hypersensitivity rather than by first infection.', type: 'definition', micro: 'Primary tuberculosis', nano: 'Definition', article: primaryArticle,
    subject: 'Primary tuberculosis', predicate: 'is', object: 'tuberculosis infection occurring for the first time in a previously uninfected host', display: 'Primary tuberculosis is infection occurring for the first time in a previously uninfected host.', teachPage: 39, teachText: 'Primary TB: infection for the first time; secondary TB: re-infection or re-activation.',
  },
  {
    handle: 'primary-tb-sites', key: 'pathology.tuberculosis.primary-portals-sites', label: 'Primary tuberculosis may involve lung, tonsil, intestine or skin but kidney is not a primary portal site', aliases: ['Primary TB sites', 'Primary tuberculosis portals of entry'],
    definition: 'The primary focus follows the portal of entry: inhalation produces pulmonary disease, ingestion can involve tonsils or intestine, and inoculation can involve skin. Kidney is not listed as a primary portal site in this classification.', objective: 'Identify intestine as a possible primary TB site and kidney as the exception among primary sites.', pitfalls: 'Selecting kidney because tuberculosis can affect it during disseminated or secondary disease, despite it not being a listed primary portal site.', type: 'classification', micro: 'Primary tuberculosis', nano: 'Portals and sites', article: primaryArticle,
    subject: 'Primary tuberculosis', predicate: 'may begin in', object: 'lung, tonsil, intestine or skin according to the portal of entry, but not kidney as a primary portal', display: 'Primary tuberculosis may begin in lung, tonsil, intestine or skin according to the portal of entry; kidney is not a primary portal site.', teachPage: 40, teachText: 'Primary TB: inhalation—pulmonary; ingestion—tonsils or intestine; inoculation—skin.',
  },
  {
    handle: 'caseating-granuloma', key: 'pathology.tuberculosis.caseating-granuloma-characteristic', label: 'A caseating granuloma is characteristic of tuberculosis', aliases: ['Caseating tuberculous granuloma', 'Tuberculosis granuloma with caseation'],
    definition: 'A granuloma containing central caseous necrosis is the characteristic tissue reaction of tuberculosis in this source set. The pattern must be distinguished from noncaseating sarcoidosis and suppurative actinomycosis.', objective: 'Associate a caseating granuloma with tuberculosis.', pitfalls: 'Selecting sarcoidosis, actinomycosis, leprosy or viral infection without matching the caseating pattern.', type: 'morphological_pattern', micro: 'Tuberculous granuloma', nano: 'Caseating pattern', article: morphologyArticle,
    subject: 'A caseating granuloma', predicate: 'is characteristic of', object: 'tuberculosis', display: 'A caseating granuloma is characteristic of tuberculosis.', teachPage: 30, teachText: 'Caseation necrosis is displayed as the central necrotic pattern of the tubercle.',
  },
  {
    handle: 'tubercle-composition', key: 'pathology.tuberculosis.tubercle-cellular-components-exclusions', label: 'A tubercle contains epithelioid cells, Langhans giant cells, histiocytes and lymphocytes rather than eosinophils or Mikulicz cells', aliases: ['Tubercle cellular composition', 'Cells of tuberculous granuloma'],
    definition: 'The cellular tubercle is built from epithelioid macrophages, Langhans-type giant cells and peripheral lymphocytes, with histiocytes represented in the macrophage lineage. Eosinophils and Mikulicz cells are not standard components of the tubercle.', objective: 'Distinguish the standard cells of a tubercle from eosinophils and Mikulicz cells.', pitfalls: 'Treating any inflammatory cell as a tubercle component or confusing Mikulicz cells from rhinoscleroma with tuberculous histology.', type: 'morphological_pattern', micro: 'Tuberculous granuloma', nano: 'Cellular composition', article: morphologyArticle,
    subject: 'The tubercle', predicate: 'contains', object: 'epithelioid cells, Langhans giant cells, histiocytes and lymphocytes rather than eosinophils or Mikulicz cells', display: 'The tubercle contains epithelioid cells, Langhans giant cells, histiocytes and lymphocytes rather than eosinophils or Mikulicz cells.', teachPage: 38, teachText: 'Cellular tissue reaction: granuloma with numerous epithelioid cells and giant cells and fewer lymphocytes.',
  },
  {
    handle: 'tb-caseation-hypersensitivity', key: 'pathology.tuberculosis.caseous-necrosis-hypersensitivity', label: 'Tuberculosis is characterised by caseous necrosis produced through hypersensitivity-mediated tissue injury', aliases: ['TB caseation mechanism', 'Hypersensitivity and caseous necrosis'],
    definition: 'Caseous necrosis is the characteristic necrotic pattern of tuberculosis. In the tested pathology framework, it results from the host hypersensitivity response rather than anoxia, toxaemia or malnutrition.', objective: 'Identify caseous necrosis as the characteristic TB pattern and hypersensitivity as its tested cause.', pitfalls: 'Selecting liquefactive or coagulative necrosis by general pattern recognition, or attributing caseation to anoxia or bacterial toxin.', type: 'mechanism', micro: 'Tuberculous granuloma', nano: 'Caseation mechanism', article: morphologyArticle,
    subject: 'Tuberculosis', predicate: 'produces', object: 'caseous necrosis through hypersensitivity-mediated tissue injury', display: 'Tuberculosis produces characteristic caseous necrosis through hypersensitivity-mediated tissue injury.', teachPage: 30, teachText: 'Caseation necrosis follows the tuberculous tissue reaction and hypersensitivity sequence.',
  },
]

for (const concept of concepts) {
  concept.id = idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F7P2-${token}-01`
  concept.currCit = `CIT-HU102-F7P2-${token}-CURR`
  concept.span = `SPN-HU102-F7P2-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q12', concept: 'pulmonary-tb-clinical', page: 3, stem: 'An HIV infected patient has recently developed low grade fever, night sweats and coughs with expectoration of blood stained caseous material. The most probable diagnosis of the case is:', key: 'B', options: ['Lung abscess', 'Pulmonary TB', 'Metastatic tumor in the lung', 'Pulmonary congestion', 'Lung edema'], clue: 'the chronic constitutional symptoms and blood-stained caseous material point to pulmonary tuberculosis', reasons: ['a lung abscess can cause purulent sputum but does not best explain the caseous material and classic constitutional TB symptoms', 'pulmonary TB matches both the constitutional symptoms and blood-stained caseous expectoration', 'a metastatic tumour does not characteristically produce expectorated caseous material', 'pulmonary congestion produces haemoptysis or frothy sputum but not caseous material', 'lung oedema produces watery or frothy fluid rather than caseous expectoration'] },
  { ref: 'Q14', concept: 'epithelioid-origin', page: 3, stem: 'Epitheloid cell is a transformed:', key: 'C', options: ['Lymphocyte', 'Neutrophil', 'Histiocyte', 'Plasma cell', 'Eosinophils'], clue: 'an epithelioid cell is an activated macrophage-lineage histiocyte', reasons: ['lymphocytes surround and regulate granulomas but do not transform into epithelioid cells', 'neutrophils are acute inflammatory cells, not the macrophage-derived epithelioid population', 'a histiocyte is the tissue macrophage that transforms into an epithelioid cell', 'plasma cells produce antibody and do not become epithelioid cells', 'eosinophils are granulocytes and do not transform into epithelioid macrophages'] },
  { ref: 'Q15', concept: 'epithelioid-origin', page: 3, stem: 'The histopathologist reported the presence of epitheloid cells in a LN from a patient with TB. Epitheloid cells are transformed from:', key: 'D', options: ['Epithelial cells', 'Eosinophils', 'Lymphocytes', 'Macrophages'], clue: 'the name describes morphology, while the lineage is macrophage', reasons: ['epithelial cells resemble epithelioid cells in shape but are not their source', 'eosinophils do not become epithelioid cells', 'lymphocytes activate macrophages but do not transform into the epithelioid population', 'macrophages transform into epithelioid cells in the tuberculous granuloma'] },
  { ref: 'Q20', concept: 'primary-tb-definition', page: 4, stem: 'Primary TB means:', key: 'B', options: ['The host produces no immune reaction against TB bacilli', 'The patient is not previously infected by TB', 'The site of TB infection is not known', 'The TB bacilli produce no hypersensitivity reaction', 'None of the above'], clue: 'primary disease is defined by first infection in a previously uninfected host', reasons: ['primary TB still elicits immune and hypersensitivity responses', 'absence of previous TB infection is the defining condition for primary TB', 'the portal and primary focus may be identified, so an unknown site is not the definition', 'hypersensitivity develops during the response and its absence does not define primary TB', 'one listed statement directly defines primary TB'] },
  { ref: 'Q21', concept: 'primary-tb-sites', page: 5, stem: 'Primary tuberculosis affects:', key: 'D', options: ['Supra-renal gland', 'Epididymis', 'Bone', 'Intestine', 'Brain'], clue: 'ingestion can establish a primary tuberculous focus in the intestine', reasons: ['adrenal tuberculosis usually reflects spread rather than a listed primary portal', 'epididymal tuberculosis is not a listed primary portal site', 'bone disease usually follows spread rather than primary entry', 'the intestine can be a primary site after ingestion', 'brain tuberculosis usually follows dissemination rather than primary entry'] },
  { ref: 'Q22', concept: 'primary-tb-sites', page: 5, stem: 'Sites of primary TB include all except:', key: 'D', options: ['Tonsil', 'Lung', 'Intestine', 'Kidney', 'Skin'], clue: 'the listed primary portals produce tonsillar, pulmonary, intestinal or cutaneous foci, not a renal primary focus', reasons: ['tonsil can be involved after ingestion', 'lung is the common primary site after inhalation', 'intestine can be involved after ingestion', 'kidney is not listed as a primary portal site in the source classification', 'skin can be a primary site after inoculation'] },
  { ref: 'Q24', concept: 'caseating-granuloma', page: 5, stem: 'The finding of caseating granuloma in a tissue section is characteristic of:', key: 'D', options: ['Actinomycosis', 'Leprosy', 'Sarcoidosis', 'Tuberculosis', 'Viral infection'], clue: 'central caseation is the characteristic granulomatous pattern of tuberculosis', reasons: ['actinomycosis is a suppurative granulomatous infection with sulphur granules', 'leprosy can be granulomatous but is not the source-keyed caseating pattern', 'sarcoidosis classically produces noncaseating granulomas', 'tuberculosis characteristically forms caseating granulomas', 'viral infection does not characteristically produce a caseating granuloma'] },
  { ref: 'Q25', concept: 'tubercle-composition', page: 5, stem: 'TB granuloma shows all of the followings except:', key: 'E', options: ['Peripheral fibrosis', 'Caseous necrosis', 'Epitheloid cell aggregates', 'Lymphocytes', 'Mickulicz cells'], clue: 'Mikulicz cells are not a component of the tuberculous granuloma', reasons: ['fibrosis may develop at the periphery as a tubercle localises or heals', 'caseous necrosis is characteristic of the tuberculous granuloma', 'aggregates of epithelioid macrophages are a core component', 'lymphocytes form part of the host cellular response around the granuloma', 'Mikulicz cells belong to another chronic infection pattern and are not tubercle components'] },
  { ref: 'Q26', concept: 'tubercle-composition', page: 6, stem: 'The followings are components of a tubercle except:', key: 'C', options: ['Lymphocytes', 'Epitheloid cells', 'Eosinophils', 'Langhan’s giant cells', 'Histiocytes'], clue: 'the standard tubercle is a macrophage, epithelioid, giant-cell and lymphocyte structure rather than an eosinophil-rich lesion', reasons: ['lymphocytes participate in the cellular immune rim', 'epithelioid cells are activated macrophages forming the granuloma', 'eosinophils are not a standard component of the tubercle', 'Langhans-type giant cells are characteristic multinucleated cells in tubercles', 'histiocytes are tissue macrophages and belong to the granulomatous lineage'] },
  { ref: 'Q28', concept: 'tb-caseation-hypersensitivity', page: 6, stem: 'TB is characterized by:', key: 'D', options: ['Fat necrosis', 'Coagulative necrosis', 'Liquefactive necrosis', 'Caseation necrosis', 'Suppuration'], clue: 'the characteristic necrotic appearance in tuberculosis is caseation', reasons: ['fat necrosis is associated with enzymatic fat injury or trauma rather than TB', 'coagulative necrosis is typical of ischaemic injury in solid organs', 'liquefactive necrosis is typical of abscesses and cerebral infarction', 'caseation necrosis is the characteristic TB pattern', 'suppuration is neutrophil-rich pus formation and is not the defining tuberculous pattern'] },
  { ref: 'Q29', concept: 'tb-caseation-hypersensitivity', page: 6, stem: 'Caseous necrosis of TB is caused by:', key: 'B', options: ['Anoxia', 'Hypersensitivity', 'Toxemia', 'Malnutrition', 'None of the above'], clue: 'the tested mechanism is hypersensitivity-mediated tissue injury', reasons: ['anoxia produces ischaemic necrosis rather than the source-keyed TB caseation mechanism', 'hypersensitivity-mediated host injury produces the caseous necrosis in this pathology framework', 'toxaemia describes circulating bacterial toxin and is not the caseation mechanism', 'malnutrition predisposes to TB but does not directly produce caseous necrosis', 'a listed mechanism matches the source key'] },
]

for (const question of questions) {
  const concept = byHandle[question.concept]
  question.id = `Q-HU102-PAT-INF-F7-${question.ref}`
  question.asmCit = `CIT-HU102-F7P2-${question.ref}-ASM`
  question.conceptId = concept.id
  question.article = concept.article
}

const sourceRows = `# Item
## id
${lecture}
## title
Infection — Helwan BMS-102 pathology lecture
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 9 - Infection/Infection-Lecture.pdf
## media_type
application/pdf
## languages
en
## page_count
48
## sha256
618d482aa23f51f29cf0990e8c2882785354c662167ee12f793d05191b3f1e90
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary, Lecturer of Pathology, Faculty of Medicine, Helwan University. It supplies local curriculum teaching, not an assessment sitting or official answer key.
## is_assessment
no

---

# Item
## id
${assessment}
## title
Infection pathology MCQ bank with inline printed keys
## institution
Helwan BMS-102 local corpus; visible institutional attribution absent
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - INFECTION MCQs.pdf
## media_type
application/pdf
## languages
en
## page_count
7
## sha256
f4017e73dcc32d5e993414b160127e0bcd8bd569f3f7005c0dd835f630fa07ac
## processing_status
pending
## rights
Local assessment-labelled material held for internal authoring only; no page image is redistributed.
## qualification
Tier-3 local pathology study bank with 34 numbered MCQs and 34 visibly printed inline single-letter keys. It has no authenticated sitting, marks, candidate field or official-key designation; printed keys remain auxiliary assessment evidence only.
## is_assessment
yes`

const conceptQuestionIds = (concept) => questions.filter((question) => question.concept === concept.handle).map((question) => question.id)
const conceptAsmCitations = (concept) => questions.filter((question) => question.concept === concept.handle).map((question) => question.asmCit)

const conceptRow = (concept) => `# Item
## label
${concept.label}
## id
${concept.id}
## canonical_key
${concept.key}
## aliases
${concept.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${concept.definition}
## explicit_objective
${concept.objective}
## pitfalls
${concept.pitfalls}
## concept_type
${concept.type}
## status
under review
## subject
fnd
## primary_node_id
SYS-INF
## secondary_node_ids
DIS-PAT-T03
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Infection > ${concept.micro}
## article_ids
${concept.article}
## related_article_ids
${concept.article === primaryArticle ? morphologyArticle : primaryArticle}
## related_concept_ids
${concepts.filter((other) => other.handle !== concept.handle && other.article === concept.article).map((other) => other.id).join('\n')}
## resource_ids
${lecture}
${assessment}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.84
## exam_weight_by_year
HU_Y1=0.84
## clinical_relevance
0.84
## academic_relevance
0.97
## weight_confidence
0.63
## support_mode
direct_statement
## confidence
0.94
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | Family-7 ${questions.filter((question) => question.concept === concept.handle).map((question) => question.ref).join(', ')}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${concept.teachPage}] ${concept.teachText}
${questions.filter((question) => question.concept === concept.handle).map((question) => `[Assessment p${question.page} ${question.ref}] ${question.stem} Answer: ${question.options['ABCDE'.indexOf(question.key)]}.`).join('\n')}
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
arabicAliases: No distinct source-supported Arabic alias has been reviewed.
microtopicId: No reviewed microtopic ID exists beneath the canonical infection-system placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 7 completed the search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.`

const explain = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. Matching the clinical setting, portal, cell lineage or granuloma pattern makes the printed key reproducible. This record remains Draft pending medical and faculty review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative belongs to a different disease, route, cell lineage or necrotic pattern. Keeping those discriminators separate prevents a superficial word match.`
}

const questionRow = (question) => {
  const concept = byHandle[question.concept]
  return `# Item
## id
${question.id}
## title
${question.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${question.stem}
## format
single best answer
## derived_from

## correct_answer
${question.key}
${question.options.map((option, index) => `## answer_${'abcde'[index]}\n${option}\n## explanation_${'abcde'[index]}\n${explain(question, index)}`).join('\n')}
## topic
General pathology
## subtopic
Infection
## difficulty
${['Q12', 'Q21', 'Q22', 'Q25', 'Q26', 'Q29'].includes(question.ref) ? 'Moderate' : 'Easy'}
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Infection > ${concept.micro}
## clinical_relevance
0.84
## academic_relevance
0.97
## cognitive_effort_score
0.60
## exam_weight_by_year
HU_Y1=0.84
## question_only_for
HU_Y1
## concept_ids
${concept.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${['Q12', 'Q21', 'Q22', 'Q25', 'Q26', 'Q29'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q12', 'Q21', 'Q22', 'Q25', 'Q26', 'Q29'].includes(question.ref) ? 59 : 45}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${assessment}
${lecture}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${question.page}, Family-7 ${question.ref}: exact stem, lettered option order and visibly printed inline answer ${question.options['ABCDE'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching support: ${lecture}, PDF p${concept.teachPage}.
## attachments

## attached_image

## author_notes
Exact source wording and lettered option order are preserved. No official sitting, marks, recurrence or candidate response is inferred.
## estimated_seconds
75
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, other, summary, sections, loses, notes }) => `# Item
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
Infection
## microtopic
${id === primaryArticle ? 'Tuberculosis clinical pattern and primary infection' : 'Tuberculous granuloma morphology'}
## nanotopic
Primary sites, epithelioid cells and caseation
## primary_node_id
SYS-INF
## secondary_node_ids
DIS-PAT-T03
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
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
${subset.map((concept) => concept.display).join('\n')}
## lose_the_mark
${loses.join('\n')}
## related_concepts
${subset.map((concept) => concept.id).join('\n')}
## related_articles
${other}
## question_ids
${subset.flatMap(conceptQuestionIds).join('\n')}
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
HU-BMS-102 > Pathology > Infection > ${id === primaryArticle ? 'Tuberculosis and primary infection' : 'Tuberculous granuloma'}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; the Enas Elhosary lecture supplies Helwan teaching authority and the Family-7 bank supplies exact auxiliary printed-key evidence without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${[concept.currCit, ...conceptAsmCitations(concept)].join(', ')}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${lecture}
${assessment}
## claim_ids
${subset.map((concept) => concept.claim).join('\n')}
## span_ids
${subset.map((concept) => concept.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Helwan University infection teaching lecture, pages 17–41, for tuberculosis teaching.
Tier-3 Family-7 pathology infection bank, pages 3–6, with exact inline printed answers.
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication. The assessment carrier has no authenticated sitting, marks, candidate field or official-key label.
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
mediaRecommendations: No visual is required for the tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const primaryConcepts = concepts.filter((concept) => concept.article === primaryArticle)
const morphologyConcepts = concepts.filter((concept) => concept.article === morphologyArticle)
const articles = [
  articleRow({ id: primaryArticle, title: 'Tuberculosis presentation and primary infection: first exposure, portals and sites', aliases: ['Primary tuberculosis fundamentals', 'Pulmonary TB presentation and primary sites'], subset: primaryConcepts, other: morphologyArticle,
    summary: 'Primary tuberculosis means first infection in a previously uninfected host. Its site follows the portal of entry, while pulmonary disease is recognised clinically by chronic constitutional symptoms and productive cough, particularly when caseous material is present.',
    sections: `### Definition\n${byHandle['primary-tb-definition'].display}\n\n### Mechanism\n${byHandle['primary-tb-sites'].display} Inhalation produces a pulmonary focus, ingestion can involve tonsil or intestine, and inoculation can involve skin.\n\n### Key determinants\nThe word primary refers to first infection, not to an unknown site or absent immune response. Kidney, bone, adrenal and brain disease can occur through spread but are not the listed primary portals in this source.\n\n### Clinical significance\n${byHandle['pulmonary-tb-clinical'].display} The combination separates pulmonary TB from congestion, oedema, metastatic tumour and a routine pyogenic abscess in the keyed vignette.`,
    loses: ['Defining primary TB as absence of any immune or hypersensitivity response.', 'Selecting kidney as a listed primary portal merely because renal TB can occur after spread.', 'Ignoring blood-stained caseous material in a chronic pulmonary presentation.'], notes: 'Questionable Family-7 pathogenicity keys Q13 and Q23 remain excluded from this article and batch.' }),
  articleRow({ id: morphologyArticle, title: 'The tubercle: epithelioid macrophages, cellular composition and caseation', aliases: ['Tuberculous granuloma morphology', 'Caseous necrosis and tubercle cells'], subset: morphologyConcepts, other: primaryArticle,
    summary: 'The tubercle is a granulomatous macrophage response containing epithelioid cells, Langhans giant cells and lymphocytes. Central caseous necrosis is the characteristic tuberculosis pattern and is linked in this curriculum to hypersensitivity-mediated tissue injury.',
    sections: `### Definition\n${byHandle['caseating-granuloma'].display} ${byHandle['epithelioid-origin'].display}\n\n### Mechanism\nMacrophage activation produces epithelioid cells and multinucleated Langhans-type giant cells. ${byHandle['tb-caseation-hypersensitivity'].display}\n\n### Key determinants\n${byHandle['tubercle-composition'].display} Eosinophils and Mikulicz cells are distractors from other inflammatory patterns.\n\n### Clinical significance\nCaseation distinguishes the source-keyed TB granuloma from noncaseating sarcoidosis and suppurative actinomycosis. Necrosis type and cellular lineage should be identified independently before choosing an answer.`,
    loses: ['Choosing epithelial cells because epithelioid describes cell shape.', 'Calling eosinophils or Mikulicz cells standard tubercle components.', 'Choosing liquefactive or coagulative necrosis instead of caseation.'], notes: 'All morphology questions preserve their printed spelling, including Epitheloid and Langhan’s.' }),
].join('\n---\n\n')

const claimRow = (concept) => `# Item
## id
${concept.claim}
## concept_id
${concept.id}
## subject
${concept.subject}
## predicate
${concept.predicate}
## object
${concept.object}
## display_text
${concept.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.93
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: current Helwan curriculum plus auxiliary printed answer`

const curriculumCitation = (concept) => `# Item
## id
${concept.currCit}
## claim_id
${concept.claim}
## resource_id
${lecture}
## evidence_role
local_curriculum
## support_span
${concept.teachText}
## locator_type
page
## locator_page
${concept.teachPage}
## locator_section
${concept.micro}
## locator_detail
PDF p${concept.teachPage}, Helwan infection lecture
## context_note
Local Helwan curriculum support only; independent medical verification remains required.
## confidence
0.94
## counts_as_claim_evidence
no`

const assessmentCitation = (question) => {
  const concept = byHandle[question.concept]
  return `# Item
## id
${question.asmCit}
## claim_id
${concept.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${question.stem} Answer: ${question.options['ABCDE'.indexOf(question.key)]}.
## locator_type
page
## locator_page
${question.page}
## locator_section
Family 7 ${question.ref}
## locator_detail
PDF p${question.page}, exact prompt and inline visibly printed key
## context_note
Tier-3 local keyed study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.95
## counts_as_claim_evidence
no`
}

const spanRow = (concept) => `# Item
## id
${concept.span}
## article_id
${concept.article}
## section_id
${concept.article.toLowerCase()}-${concept.nano.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${concept.display}
## claim_ids
${concept.claim}
## citation_ids
${[concept.currCit, ...conceptAsmCitations(concept)].join('\n')}`

const relationDefs = [
  ['pulmonary-tb-clinical', 'associated_with', 'primary-tb-definition', 'pulmonary presentation can occur during first infection'],
  ['primary-tb-definition', 'associated_with', 'primary-tb-sites', 'first infection establishes a focus at the portal of entry'],
  ['epithelioid-origin', 'associated_with', 'tubercle-composition', 'macrophage transformation supplies the epithelioid component of the tubercle'],
  ['caseating-granuloma', 'associated_with', 'tubercle-composition', 'caseation and the cellular mantle define the tuberculous granuloma'],
  ['caseating-granuloma', 'associated_with', 'tb-caseation-hypersensitivity', 'the characteristic caseating pattern reflects hypersensitivity-mediated injury'],
  ['primary-tb-definition', 'associated_with', 'caseating-granuloma', 'primary infection can form a caseating primary focus'],
]
const relationRow = ([source, type, target, scope]) => {
  const a = byHandle[source]
  const b = byHandle[target]
  return `# Item
## source
${a.id}
## type
${type}
## target
${b.id}
## evidence_claim_ids
${a.claim}
${b.claim}
## citation_ids
${a.currCit}
${b.currCit}
## verification_status
needs_evidence
## confidence
0.87
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Pathology faculty`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family7-part2-sources.md', sourceRows],
  ['concept/HU-BMS-102-pathology-family7-part2-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family7-part2-articles.md', articles],
  ['question/HU-BMS-102-pathology-family7-part2-mcq.md', questions.map(questionRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part2-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part2-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part2-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family7-part2-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '7-part2', refs: questions.map((question) => `F7-${question.ref}`), released: { sources: 2, articles: 2, concepts: concepts.length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, remainingRoutine: ['F7-Q16', 'F7-Q17', 'F7-Q18', 'F7-Q19', 'F7-Q27', 'F7-Q30', 'F7-Q31', 'F7-Q32', 'F7-Q34'], holds: { questionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
