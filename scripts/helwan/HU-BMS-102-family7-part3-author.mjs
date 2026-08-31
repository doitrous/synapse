import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_f4017e73dcc32d5e9934'
const infectionLecture = 'src_618d482aa23f51f29cf0'
const neoplasiaLecture = 'src_a9ccc0b353dbbd7670cb'
const granulomaArticle = 'ART-HU-BMS102-PAT-ACTINOMYCOSIS-SCHISTOSOMIASIS'
const tbArticle = 'ART-HU-BMS102-PAT-PRIMARY-SECONDARY-MILIARY-TB'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    handle: 'bilharzial-bladder-carcinoma', key: 'pathology.schistosomiasis.bladder-carcinoma-association', label: 'Bilharziasis is associated with carcinoma of the urinary bladder', aliases: ['Bilharzial bladder carcinoma', 'Schistosomiasis and urinary bladder cancer'],
    definition: 'Chronic urinary schistosomiasis is a parasitic carcinogenic setting associated with carcinoma of the urinary bladder. In the keyed question, the bladder is the precancerous target rather than intestine, liver, spleen or lung.', objective: 'Identify the urinary bladder as the site where bilharziasis is precancerous.', pitfalls: 'Selecting liver or intestine because schistosomiasis affects those organs, without matching the specific bladder-carcinoma association.', type: 'clinical_association', micro: 'Schistosomiasis', nano: 'Bladder carcinoma association', article: granulomaArticle,
    subject: 'Bilharziasis', predicate: 'is associated with', object: 'carcinoma of the urinary bladder', display: 'Bilharziasis is associated with carcinoma of the urinary bladder.', teachSource: neoplasiaLecture, teachPage: 48, teachText: 'Parasitic carcinogens e.g. bilharzial carcinoma of the urinary bladder.', resources: [infectionLecture, neoplasiaLecture, assessment],
  },
  {
    handle: 'actinomycosis-suppurative-granuloma', key: 'pathology.actinomycosis.chronic-suppurative-granuloma', label: 'Actinomycosis is a chronic suppurative granulomatous infection', aliases: ['Suppurative granuloma of actinomycosis', 'Chronic actinomycotic granuloma'],
    definition: 'Actinomycosis is a chronic suppurative granulomatous bacterial infection. Multiple abscesses and granulation tissue coexist around bacterial colonies, distinguishing it from purely caseating or non-suppurative granulomas.', objective: 'Identify actinomycosis as the suppurative granulomatous infectious disease.', pitfalls: 'Choosing tuberculosis, brucellosis, schistosomiasis or CMV without recognising the combined suppurative and granulomatous pattern.', type: 'definition', micro: 'Actinomycosis', nano: 'Suppurative granulomatous pattern', article: granulomaArticle,
    subject: 'Actinomycosis', predicate: 'is', object: 'a chronic suppurative granulomatous infection', display: 'Actinomycosis is a chronic suppurative granulomatous infection.', teachSource: infectionLecture, teachPage: 46, teachText: 'Actinomycosis: chronic suppurative granuloma caused by anaerobic gram-positive bacteria.', resources: [infectionLecture, assessment],
  },
  {
    handle: 'actinomycosis-cervicofacial', key: 'pathology.actinomycosis.most-common-cervicofacial-site', label: 'The cervicofacial region is the most common site of actinomycosis', aliases: ['Cervicofacial actinomycosis', 'Most common actinomycosis site'],
    definition: 'The cervicofacial region is the most common site of actinomycosis in the keyed local bank. Skin, abdominal disease after appendiceal rupture or bowel perforation, and pulmonary disease are alternatives but are not the most common site.', objective: 'Select the cervicofacial region as the most common site of actinomycosis.', pitfalls: 'Selecting a recognised abdominal or pulmonary presentation when the question asks specifically for the most common site.', type: 'classification', micro: 'Actinomycosis', nano: 'Common site', article: granulomaArticle,
    subject: 'Actinomycosis', predicate: 'most commonly affects', object: 'the cervicofacial region', display: 'Actinomycosis most commonly affects the cervicofacial region.', teachSource: infectionLecture, teachPage: 46, teachText: 'Actinomycosis is a chronic suppurative granuloma caused by Actinomyces israelii.', resources: [infectionLecture, assessment],
  },
  {
    handle: 'actinomycosis-sulphur-granules', key: 'pathology.actinomycosis.sulphur-granules', label: 'Sulphur granules are bacterial colonies in actinomycosis', aliases: ['Actinomycotic sulphur granules', 'Sulfur granules in actinomycosis'],
    definition: 'Actinomycotic pus contains small grey-yellow bacterial colonies called sulphur granules. They occur within a chronic suppurative granuloma and are a high-yield gross clue to actinomycosis.', objective: 'Associate sulphur granules with actinomycosis.', pitfalls: 'Associating the granules with tuberculosis, brucellosis, schistosomiasis or CMV because those diseases can also be chronic infections.', type: 'morphological_pattern', micro: 'Actinomycosis', nano: 'Sulphur granules', article: granulomaArticle,
    subject: 'Sulphur granules', predicate: 'occur in', object: 'actinomycosis', display: 'Sulphur granules occur in actinomycosis.', teachSource: infectionLecture, teachPage: 46, teachText: 'Pus contains bacterial colonies which appear as small grayish yellow granules (Sulphur granules).', resources: [infectionLecture, assessment],
  },
  {
    handle: 'primary-pulmonary-complex', key: 'pathology.tuberculosis.primary-pulmonary-complex-components-childhood', label: 'Childhood primary pulmonary tuberculosis is represented by a primary complex without an apical cavity', aliases: ['Primary pulmonary TB complex', 'Ghon complex in childhood TB'],
    definition: 'Primary pulmonary tuberculosis in childhood is represented by the primary complex: a Ghon focus, tuberculous lymphangitis and regional lymphadenitis. An apical pulmonary cavity is a feature of secondary rather than primary pulmonary TB, and bacteraemia is not a component of the complex.', objective: 'Recognise the components and childhood identity of primary pulmonary TB and exclude apical cavity and bacteraemia.', pitfalls: 'Adding bacteraemia to the three structural components or assigning the apical cavitary pattern of secondary TB to childhood primary disease.', type: 'classification', micro: 'Primary tuberculosis', nano: 'Primary pulmonary complex', article: tbArticle,
    subject: 'Childhood primary pulmonary tuberculosis', predicate: 'is represented by', object: 'Ghon focus, lymphangitis and lymphadenitis without an apical cavity', display: 'Childhood primary pulmonary tuberculosis is represented by a Ghon focus, lymphangitis and lymphadenitis without an apical cavity.', teachSource: infectionLecture, teachPage: 41, teachText: 'Primary pulmonary T.B primary complex: Ghon’s focus, lymphangitis, lymphadenitis.', resources: [infectionLecture, assessment],
  },
  {
    handle: 'secondary-tb-hypersensitivity', key: 'pathology.tuberculosis.secondary-hypersensitivity-tissue-destruction', label: 'Secondary tuberculosis produces extensive tissue destruction through an accelerated hypersensitivity response', aliases: ['Secondary TB hypersensitivity', 'Tissue destruction in secondary tuberculosis'],
    definition: 'Secondary tuberculosis occurs after reinfection or reactivation in a previously sensitised host. Acquired immunity limits lymph-node involvement, while an accelerated hypersensitivity response produces more marked local tissue destruction.', objective: 'Explain extensive tissue destruction with little lymph-node affection in secondary TB by the strong hypersensitivity response.', pitfalls: 'Choosing acid-fastness, reactivation alone, HIV association or granuloma formation when the question asks for the mechanism of the tissue-destruction pattern.', type: 'mechanism', micro: 'Secondary tuberculosis', nano: 'Hypersensitivity and tissue destruction', article: tbArticle,
    subject: 'Secondary tuberculosis', predicate: 'causes', object: 'extensive tissue destruction through an accelerated hypersensitivity response', display: 'Secondary tuberculosis causes extensive tissue destruction through an accelerated hypersensitivity response.', teachSource: infectionLecture, teachPage: 39, teachText: 'Secondary TB: acquired immunity, more marked tissue destruction and accelerated tissue reaction.', resources: [infectionLecture, assessment],
  },
  {
    handle: 'miliary-tb-blood-spread', key: 'pathology.tuberculosis.miliary-hematogenous-spread', label: 'Miliary tuberculosis results from haematogenous spread', aliases: ['Blood spread in miliary TB', 'Hematogenous dissemination of tuberculosis'],
    definition: 'Miliary tuberculosis results when tubercle bacilli disseminate through the bloodstream and seed many sites. Local, lymphatic or bronchial extension does not define the miliary pattern.', objective: 'Identify blood spread as the route producing miliary tuberculosis.', pitfalls: 'Selecting lymphatic or bronchial spread because both participate in tuberculosis dissemination but do not define the miliary pattern.', type: 'mechanism', micro: 'Disseminated tuberculosis', nano: 'Miliary spread', article: tbArticle,
    subject: 'Miliary tuberculosis', predicate: 'results from', object: 'haematogenous spread', display: 'Miliary tuberculosis results from haematogenous spread.', teachSource: infectionLecture, teachPage: 23, teachText: 'Bacteraemia leads to seeding of multiple sites during early tuberculosis infection.', resources: [infectionLecture, assessment],
  },
]

for (const concept of concepts) {
  concept.id = idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F7P3-${token}-01`
  concept.currCit = `CIT-HU102-F7P3-${token}-CURR`
  concept.span = `SPN-HU102-F7P3-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q16', concept: 'bilharzial-bladder-carcinoma', page: 4, stem: 'Bilharziasis is precancerous in:', key: 'D', options: ['Intestine', 'Liver', 'Spleen', 'Bladder', 'Lung'], clue: 'the governed neoplasia lecture names bilharzial carcinoma of the urinary bladder', reasons: ['intestinal schistosomiasis causes chronic inflammation but is not the printed precancerous site', 'hepatic disease reflects portal and granulomatous complications rather than the keyed carcinoma association', 'splenic enlargement may accompany portal disease but is not the cancer site', 'the urinary bladder is the printed and lecture-supported site', 'lung is not the keyed precancerous target'] },
  { ref: 'Q17', concept: 'actinomycosis-suppurative-granuloma', page: 4, stem: 'The term suppurative granulomatous infectious disease refer to infection by:', key: 'C', options: ['Tuberculosis.', 'Brucellosis.', 'Actinomycosis.', 'Bilharziasis.', 'CMV viral infection.'], clue: 'actinomycosis combines multiple abscesses with a chronic granulomatous response', reasons: ['tuberculosis produces a caseating granuloma rather than the source-defined suppurative granuloma', 'brucellosis is not the keyed suppurative granulomatous disease', 'actinomycosis is explicitly described as a chronic suppurative granuloma', 'bilharziasis forms parasitic granulomas around ova rather than this bacterial suppurative pattern', 'CMV is viral and does not produce the source-defined lesion'] },
  { ref: 'Q18', concept: 'actinomycosis-cervicofacial', page: 4, stem: 'The most common site for actinomycosis is:', key: 'A', options: ['Cervicofacial.', 'Skin.', 'Post ruptured appendix.', 'After bowel perforation.', 'Lungs.'], clue: 'the question asks for the most common site, not merely any recognised site', reasons: ['cervicofacial disease is the source-keyed most common site', 'skin can be involved but is not the most common site', 'abdominal actinomycosis can follow appendiceal rupture but is less common', 'bowel perforation can precede abdominal disease but does not make it the most common presentation', 'thoracic actinomycosis occurs but is not the most common site'] },
  { ref: 'Q19', concept: 'actinomycosis-sulphur-granules', page: 4, stem: 'Sulphur granules occur in which granuloma:', key: 'C', options: ['Tuberculosis.', 'Brucellosis.', 'Actinomycosis.', 'Bilharziasis.', 'CMV viral infection.'], clue: 'grey-yellow bacterial colonies in pus are the sulphur granules of actinomycosis', reasons: ['tuberculosis produces caseating tubercles rather than sulphur granules', 'brucellosis does not characteristically contain sulphur granules', 'actinomycosis contains grey-yellow bacterial colonies called sulphur granules', 'bilharzial granulomas centre on ova, not sulphur granules', 'CMV infection does not form bacterial sulphur granules'] },
  { ref: 'Q27', concept: 'primary-pulmonary-complex', page: 6, stem: 'Primary pulmonary TB is associated with all of the followings except:', key: 'D', options: ['Hilar LN caseous necrosis', 'Lymphangitis', 'Subpleural caseating granuloma', 'Pulmonary apical cavity', 'Childhood infection'], clue: 'an apical cavity belongs to secondary pulmonary TB rather than the childhood primary complex', reasons: ['regional hilar lymph-node caseation belongs to the primary complex', 'tuberculous lymphangitis connects the primary focus to regional nodes', 'the Ghon focus is a subpleural caseating lesion', 'a pulmonary apical cavity is characteristic of secondary rather than primary TB', 'primary pulmonary TB is the childhood pattern in the source comparison'] },
  { ref: 'Q30', concept: 'secondary-tb-hypersensitivity', page: 6, stem: 'Secondary tuberculous reaction is associated with extensive tissue destruction and little lymph node affection because:', key: 'C', options: ['It is caused by acid fast bacilli', 'It results from reactivation of dormant focus', 'It is associated with extensive hypersensitivity reaction', 'It is usually associated with HIV infection', 'It is a granulomatous infection'], clue: 'the previously sensitised host mounts an accelerated hypersensitivity response that destroys tissue while acquired immunity limits spread', reasons: ['acid-fastness identifies the organism but does not explain this reaction pattern', 'reactivation describes an origin of secondary TB but not the mechanism of extensive destruction', 'extensive hypersensitivity explains the marked tissue injury in secondary disease', 'HIV weakens immunity and is not the general explanation for the stated pattern', 'granuloma formation occurs in TB but does not specifically explain the contrast'] },
  { ref: 'Q31', concept: 'miliary-tb-blood-spread', page: 7, stem: 'Miliary TB occurs due to:', key: 'C', options: ['Local spread', 'Lymphatic spread', 'Blood spread', 'Bronchial spread', 'None of the above'], clue: 'miliary dissemination means widespread haematogenous seeding', reasons: ['local extension remains near the original focus and does not create a miliary distribution', 'lymphatic spread reaches regional nodes but is not the defining route of miliary seeding', 'blood spread distributes bacilli widely and produces miliary TB', 'bronchial spread distributes disease through airways but does not define miliary dissemination', 'one listed route directly accounts for the pattern'] },
  { ref: 'Q32', concept: 'primary-pulmonary-complex', page: 7, stem: 'The following are components of primary complex except:', key: 'A', options: ['Bacteremia', 'Ghon’s focus', 'Lymphangitis', 'Lymphadenitis'], clue: 'the primary complex consists structurally of focus, draining lymphatics and regional lymph nodes', reasons: ['bacteraemia may disseminate bacilli but is not one of the three components of the primary complex', 'Ghon’s focus is the primary pulmonary lesion', 'tuberculous lymphangitis is the connecting component', 'regional lymphadenitis completes the primary complex'] },
  { ref: 'Q34', concept: 'primary-pulmonary-complex', page: 7, stem: 'Which of the followings is true about childhood type of pulmonary TB:', key: 'E', options: ['A form of secondary pulmonary tuberculosis', 'Characterized by cavitary lesion, mostly apical', 'Complicated by secondary intestinal tuberculosis', 'Associated with reactive systemic amyloidosis', 'Is represented by primary complex'], clue: 'childhood pulmonary TB is the primary form represented by the primary complex', reasons: ['childhood type is primary rather than secondary pulmonary tuberculosis', 'apical cavitation is a secondary pulmonary pattern', 'secondary intestinal TB is not the defining statement for childhood pulmonary disease', 'reactive systemic amyloidosis is a possible chronic complication, not the defining identity', 'the primary complex represents childhood pulmonary TB'] },
]

for (const question of questions) {
  const concept = byHandle[question.concept]
  question.id = `Q-HU102-PAT-INF-F7-${question.ref}`
  question.asmCit = `CIT-HU102-F7P3-${question.ref}-ASM`
  question.conceptId = concept.id
  question.article = concept.article
}

const sourceRows = `# Item
## id
${infectionLecture}
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
${neoplasiaLecture}
## title
SMP Neoplasia 3 — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 12 - Neoplasia 3/SMP neoplasia 3.pdf
## media_type
application/pdf
## languages
en
## page_count
60
## sha256
a9ccc0b353dbbd7670cba31bd0156f9cf2490911d5567594809c65f3017a8514
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
HU-BMS-102 Neoplasia 3 theoretical teaching lecture dated 17 February 2025. It establishes local curriculum wording, not independent medical verification.
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

const conceptQuestions = (concept) => questions.filter((question) => question.concept === concept.handle)
const conceptQuestionIds = (concept) => conceptQuestions(concept).map((question) => question.id)
const conceptAsmCitations = (concept) => conceptQuestions(concept).map((question) => question.asmCit)

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
${concept.article === granulomaArticle ? tbArticle : granulomaArticle}
## related_concept_ids
${concepts.filter((other) => other.handle !== concept.handle && other.article === concept.article).map((other) => other.id).join('\n')}
## resource_ids
${concept.resources.join('\n')}
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
0.64
## support_mode
direct_statement
## confidence
0.94
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | Family-7 ${conceptQuestions(concept).map((question) => question.ref).join(', ')}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${concept.teachPage}] ${concept.teachText}
${conceptQuestions(concept).map((question) => `[Assessment p${question.page} ${question.ref}] ${question.stem} Answer: ${question.options['ABCDE'.indexOf(question.key)]}.`).join('\n')}
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
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. Matching the named organism, gross clue, route of spread or primary-versus-secondary pattern makes the printed key reproducible. This record remains Draft pending review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative belongs to a different granuloma, anatomical pattern, dissemination route or phase of tuberculosis. Tracking that discriminator prevents a superficial word match.`
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
${['Q16', 'Q18', 'Q27', 'Q30', 'Q32', 'Q34'].includes(question.ref) ? 'Moderate' : 'Easy'}
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
${['Q16', 'Q18', 'Q27', 'Q30', 'Q32', 'Q34'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q16', 'Q18', 'Q27', 'Q30', 'Q32', 'Q34'].includes(question.ref) ? 59 : 45}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${assessment}
${concept.resources.filter((id) => id !== assessment).join('\n')}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${question.page}, Family-7 ${question.ref}: exact stem, lettered option order and visibly printed inline answer ${question.options['ABCDE'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching support: ${concept.teachSource}, PDF p${concept.teachPage}.
## attachments

## attached_image

## author_notes
Exact source wording and lettered option order are preserved. No official sitting, marks, recurrence or candidate response is inferred.
## estimated_seconds
75
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, other, summary, sections, loses, notes, sources, basis }) => `# Item
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
${id === granulomaArticle ? 'Actinomycosis and schistosomiasis' : 'Primary, secondary and miliary tuberculosis'}
## nanotopic
Granuloma clues, primary complex and dissemination
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
${sources.join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Infection > ${id === granulomaArticle ? 'Specific infectious granulomas' : 'Tuberculosis spread patterns'}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; governed Helwan lectures supply curriculum support and the Family-7 bank supplies exact auxiliary printed-key evidence without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${[concept.currCit, ...conceptAsmCitations(concept)].join(', ')}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${sources.join('\n')}
## claim_ids
${subset.map((concept) => concept.claim).join('\n')}
## span_ids
${subset.map((concept) => concept.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
${basis}
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

const granulomaConcepts = concepts.filter((concept) => concept.article === granulomaArticle)
const tbConcepts = concepts.filter((concept) => concept.article === tbArticle)
const articles = [
  articleRow({ id: granulomaArticle, title: 'Actinomycosis and schistosomiasis: granuloma clues and cancer association', aliases: ['Specific infectious granulomas', 'Sulphur granules and bilharzial bladder carcinoma'], subset: granulomaConcepts, other: tbArticle,
    summary: 'Actinomycosis is a chronic suppurative granulomatous infection, most often cervicofacial, with grey-yellow sulphur granules in pus. Schistosomiasis forms parasitic granulomas and chronic urinary disease is associated with carcinoma of the bladder.',
    sections: `### Definition\n${byHandle['actinomycosis-suppurative-granuloma'].display} ${byHandle['bilharzial-bladder-carcinoma'].display}\n\n### Mechanism\nActinomycotic bacterial colonies sit within abscesses and a surrounding chronic granulomatous response. Schistosomal ova provoke hypersensitivity-driven granulomas; prolonged urinary injury supplies a carcinogenic setting.\n\n### Key determinants\n${byHandle['actinomycosis-sulphur-granules'].display} ${byHandle['actinomycosis-cervicofacial'].display}\n\n### Clinical significance\nCervicofacial location plus draining suppuration and sulphur granules point toward actinomycosis. Bilharzial disease must be linked specifically to the urinary bladder when the question asks for the precancerous site.`,
    loses: ['Calling a caseating tubercle a suppurative actinomycotic granuloma.', 'Choosing an abdominal or pulmonary actinomycosis site when asked for the most common site.', 'Selecting liver or intestine instead of urinary bladder for the bilharzial carcinoma association.'], notes: 'Q16 receives direct support from the governed Neoplasia 3 lecture p48 in addition to the exact printed assessment key.', sources: [infectionLecture, neoplasiaLecture, assessment], basis: 'Helwan Infection lecture p46–47 and Neoplasia 3 lecture p48 provide local teaching; Family-7 p4 supplies exact inline printed keys.' }),
  articleRow({ id: tbArticle, title: 'Primary, secondary and miliary tuberculosis: complex, hypersensitivity and spread', aliases: ['Tuberculosis pattern comparison', 'Primary complex and miliary dissemination'], subset: tbConcepts, other: granulomaArticle,
    summary: 'Primary childhood pulmonary TB is represented by the Ghon complex, secondary TB causes marked local destruction through an accelerated hypersensitivity response, and miliary TB follows haematogenous dissemination.',
    sections: `### Definition\n${byHandle['primary-pulmonary-complex'].display}\n\n### Mechanism\n${byHandle['secondary-tb-hypersensitivity'].display} Prior sensitisation accelerates the tissue reaction while acquired immunity limits lymph-node involvement.\n\n### Key determinants\nThe primary complex contains Ghon focus, lymphangitis and lymphadenitis; bacteraemia is not a structural component, and an apical cavity indicates secondary disease. ${byHandle['miliary-tb-blood-spread'].display}\n\n### Clinical significance\nClassify the phase before interpreting morphology: childhood primary disease forms a complex, secondary disease is locally destructive and often apical, and bloodstream seeding produces the miliary pattern.`,
    loses: ['Adding bacteraemia as a structural component of the primary complex.', 'Assigning an apical cavitary lesion to primary childhood TB.', 'Calling lymphatic or bronchial spread the defining route of miliary TB.'], notes: 'Family-7 Q33 remains excluded because its printed key is questionable; no Ghon-focus claim is inferred from it.', sources: [infectionLecture, assessment], basis: 'Helwan Infection lecture p23 and p39–43 supplies local teaching; Family-7 p6–7 supplies exact inline printed keys.' }),
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
${concept.teachSource}
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
PDF p${concept.teachPage}, governed Helwan pathology lecture
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
  ['actinomycosis-suppurative-granuloma', 'associated_with', 'actinomycosis-cervicofacial', 'the defining infection most commonly presents in the cervicofacial region'],
  ['actinomycosis-suppurative-granuloma', 'associated_with', 'actinomycosis-sulphur-granules', 'the suppurative granuloma contains bacterial sulphur granules'],
  ['bilharzial-bladder-carcinoma', 'contrasts_with', 'actinomycosis-suppurative-granuloma', 'schistosomiasis is an ovum-centred parasitic granuloma while actinomycosis is suppurative bacterial disease'],
  ['primary-pulmonary-complex', 'contrasts_with', 'secondary-tb-hypersensitivity', 'primary childhood complex differs from destructive sensitised secondary disease'],
  ['primary-pulmonary-complex', 'associated_with', 'miliary-tb-blood-spread', 'bloodstream escape from primary infection can seed a miliary pattern'],
  ['secondary-tb-hypersensitivity', 'associated_with', 'miliary-tb-blood-spread', 'secondary disease may disseminate haematogenously when control fails'],
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
  ['evidence/HU-BMS-102-pathology-family7-part3-sources.md', sourceRows],
  ['concept/HU-BMS-102-pathology-family7-part3-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family7-part3-articles.md', articles],
  ['question/HU-BMS-102-pathology-family7-part3-mcq.md', questions.map(questionRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part3-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part3-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part3-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family7-part3-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '7-part3', refs: questions.map((question) => `F7-${question.ref}`), released: { sources: 3, articles: 2, concepts: concepts.length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, remainingRoutine: [], holds: { questionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
