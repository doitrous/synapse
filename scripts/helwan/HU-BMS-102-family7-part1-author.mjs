import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_f4017e73dcc32d5e9934'
const lecture = 'src_618d482aa23f51f29cf0'
const definitionsArticle = 'ART-HU-BMS102-PAT-BLOODSTREAM-INFECTION-DEFINITIONS'
const sepsisArticle = 'ART-HU-BMS102-PAT-SEPTICEMIA-PYEMIA-PATHOLOGY'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    handle: 'pulmonary-pyemia', key: 'pathology.infection.pulmonary-pyemia-systemic-venous-septic-emboli', label: 'Systemic-venous septic emboli lodging in lung capillaries produce pulmonary pyaemia', aliases: ['Pulmonary pyemia', 'Venous septic emboli to lung'],
    definition: 'Pulmonary pyaemia is the pattern produced when septic emboli from organs enter the systemic venous circulation and impact in pulmonary capillaries.', objective: 'Identify pulmonary pyaemia when systemic-venous septic emboli lodge in lung capillaries.', pitfalls: 'Calling this systemic pyaemia even though systemic venous return carries the emboli first to the pulmonary capillary bed.', type: 'classification', micro: 'Pyaemia', nano: 'Pulmonary pyaemia', article: sepsisArticle,
    subject: 'Systemic-venous septic emboli', predicate: 'produce', object: 'pulmonary pyaemia when they lodge in lung capillaries', display: 'Systemic-venous septic emboli lodging in lung capillaries produce pulmonary pyaemia.', teachPage: 15, teachText: 'Septic focus → vein thrombosis (septic thrombophlebitis) → septic emboli → multiple small pyaemic abscesses.',
  },
  {
    handle: 'infection-definition', key: 'pathology.infection.definition-pathogenic-microorganism-invasion', label: 'Infection is invasion of living tissue by pathogenic microorganisms with pathological change', aliases: ['Pathological definition of infection', 'Pathogenic microbial tissue invasion'],
    definition: 'Infection is invasion of living tissue by a pathogenic microorganism with development of pathological changes. Commensal presence alone, mere localisation, or phagocytosis does not satisfy this definition.', objective: 'Select pathogenic microorganism invasion as the defining event in infection.', pitfalls: 'Equating infection with any microorganism in the body, including commensal colonisation without tissue invasion or pathological change.', type: 'definition', micro: 'Infection', nano: 'Definition', article: definitionsArticle,
    subject: 'Infection', predicate: 'is defined as', object: 'invasion of living tissue by pathogenic microorganisms with pathological change', display: 'Infection is invasion of living tissue by pathogenic microorganisms with pathological change.', teachPage: 2, teachText: 'Invasion of the living tissue by pathogenic microorganism and development of pathologic changes.',
  },
  {
    handle: 'toxemia-definition', key: 'pathology.toxemia.definition-bacterial-toxins-blood', label: 'Toxaemia is circulation of bacterial toxins in blood', aliases: ['Toxemia definition', 'Bacterial toxins in blood'],
    definition: 'Toxaemia means bacterial toxins circulate in the blood and cause clinical and pathological manifestations. It is distinguished from bacteraemia, which concerns bacteria in blood, and septicaemia, which includes multiplying virulent bacteria and their toxins.', objective: 'Define toxaemia by the presence and circulation of bacterial toxins in blood.', pitfalls: 'Calling chemical poisoning toxaemia in this pathology classification or adding bacterial multiplication, which instead points to septicaemia.', type: 'definition', micro: 'Toxaemia', nano: 'Definition', article: definitionsArticle,
    subject: 'Toxaemia', predicate: 'means', object: 'circulation of bacterial toxins in blood', display: 'Toxaemia is circulation of bacterial toxins in blood.', teachPage: 8, teachText: 'Circulation of bacterial toxins in the blood causing pathological and clinical manifestation.',
  },
  {
    handle: 'acute-toxemia-effects', key: 'pathology.toxemia.acute-pathological-effects', label: 'Acute toxaemia causes toxic degeneration and necrosis rather than reactive systemic amyloidosis', aliases: ['Acute toxemia pathology', 'Acute bacterial toxin effects'],
    definition: 'Acute circulating bacterial toxins can produce toxic myocarditis, parenchymal fatty change, focal hepatic necrosis, renal tubular injury and other acute toxic manifestations. Reactive systemic amyloidosis is a chronic inflammatory complication rather than an acute toxaemic effect.', objective: 'Distinguish acute toxic organ injury from the chronic complication of reactive systemic amyloidosis.', pitfalls: 'Selecting reactive systemic amyloidosis as an acute effect merely because chronic infection can eventually cause it.', type: 'comparison', micro: 'Toxaemia', nano: 'Acute pathological effects', article: definitionsArticle,
    subject: 'Acute toxaemia', predicate: 'causes', object: 'toxic organ injury rather than reactive systemic amyloidosis', display: 'Acute toxaemia causes toxic organ injury rather than reactive systemic amyloidosis.', teachPage: 9, teachText: 'Pathological and clinical features include inflammation, degeneration, acute adrenal insufficiency and bone marrow depression.',
  },
  {
    handle: 'bacteremia', reuseId: 'CON-INF-58732B86935585', reuseKey: 'teaching.pathobook.bacteremia.definition', reuseLabel: 'Bacteremia as low-dose or low-virulence organisms in blood',
    objective: 'Recognise transient low-number bacterial circulation without significant multiplication or toxic manifestations as bacteraemia.', micro: 'Bacteraemia', nano: 'Definition and dental association', article: definitionsArticle,
    subject: 'Bacteraemia', predicate: 'is', object: 'transient circulation of small numbers of bacteria without significant toxic manifestations', display: 'Bacteraemia is transient circulation of small numbers of bacteria without significant toxic manifestations.', teachPage: 7, teachText: 'Transient presence of small number of bacteria without significant toxic manifestation.',
  },
  {
    handle: 'septicemia-definition', key: 'pathology.septicemia.definition-virulent-bacteria-toxins-multiplication-blood', label: 'Septicaemia is multiplication of virulent bacteria and their toxins in blood', aliases: ['Septicemia definition', 'Virulent bacterial multiplication in bloodstream'],
    definition: 'Septicaemia is a highly dangerous bloodstream state in which large numbers of virulent bacteria circulate and multiply together with their toxins. This differs from transient low-number bacteraemia and from toxin-only toxaemia.', objective: 'Define septicaemia by circulating, multiplying virulent bacteria and their toxins.', pitfalls: 'Using bacteraemia for a toxic state with active bacterial multiplication or using toxaemia when bacteria themselves are also multiplying in blood.', type: 'definition', micro: 'Septicaemia', nano: 'Definition', article: sepsisArticle,
    subject: 'Septicaemia', predicate: 'is', object: 'multiplication of virulent bacteria and their toxins in blood', display: 'Septicaemia is multiplication of virulent bacteria and their toxins in blood.', teachPage: 10, teachText: 'Highly fatal condition characterized by circulation of large number of virulent bacteria and their toxins in the blood stream.',
  },
  {
    handle: 'septicemia-pathology', key: 'pathology.septicemia.pathological-features-acute-spleen', label: 'Acute splenic swelling with dark fluid pulp is a feature of septicaemia', aliases: ['Acute septic spleen', 'Septicemia pathological features'],
    definition: 'Septicaemia produces widespread pathological changes including organ degeneration, capillary destruction with petechiae, serofibrinous or suppurative serositis, acute bacterial endocarditis and acute splenic swelling. The acutely enlarged spleen has soft, dark, fluid pulp.', objective: 'Recognise acute splenic swelling and dark fluid splenic pulp as pathological features of septicaemia.', pitfalls: 'Attributing the acute dark fluid spleen to chronic venous congestion, cirrhosis or leukaemia instead of the acute septic process.', type: 'morphological_pattern', micro: 'Septicaemia', nano: 'Acute septic spleen', article: sepsisArticle,
    subject: 'Septicaemia', predicate: 'can cause', object: 'acute splenic swelling with dark fluid pulp', display: 'Septicaemia can cause acute splenic swelling with dark fluid pulp.', teachPage: 12, teachText: 'Pathological features include acute splenic swelling, petechial hemorrhage and acute bacterial endocarditis.',
  },
  {
    handle: 'pyemia-definition', key: 'pathology.pyemia.definition-septic-emboli-multiple-abscesses', label: 'Pyaemia is circulation and impaction of septic emboli causing multiple abscesses', aliases: ['Pyemia definition', 'Septic embolic multiple abscesses'],
    definition: 'Pyaemia is circulation of septic emboli in blood followed by their arrest in capillaries of different organs, where they cause multiple small metastatic abscesses.', objective: 'Define pyaemia by septic embolic circulation, capillary impaction and multiple abscess formation.', pitfalls: 'Confusing pyaemia with septicaemia, bacteraemia, toxaemia or hyperaemia; the defining event is an infected embolus that seeds abscesses.', type: 'definition', micro: 'Pyaemia', nano: 'Definition', article: sepsisArticle,
    subject: 'Pyaemia', predicate: 'is', object: 'septic embolic circulation and impaction causing multiple abscesses', display: 'Pyaemia is septic embolic circulation and impaction causing multiple abscesses.', teachPage: 14, teachText: 'Circulation of septic emboli in the blood stream and their arrest in different organs causing multiple small abscesses.',
  },
]

for (const concept of concepts) {
  concept.id = concept.reuseId ?? idFor(concept.key)
  concept.claim = `CLM-HU102-F7P1-${concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')}-01`
  concept.currCit = `CIT-HU102-F7P1-${concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')}-CURR`
  concept.span = `SPN-HU102-F7P1-${concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q01', concept: 'pulmonary-pyemia', page: 1, stem: 'Septic emboli coming from different organs and circulate in systemic venous blood to be impacted in lung capillaries is called:', key: 'B', options: ['Systemic pyemia', 'Pulmonary pyemia', 'Portal pyemia', 'Septicemia', 'Paradoxical embolism'], clue: 'the infected emboli travel in systemic venous blood and first impact in lung capillaries', reasons: ['systemic pyaemia concerns septic emboli reaching systemic organs rather than emboli arriving through systemic veins at the lungs', 'systemic venous emboli reach pulmonary capillaries, making the pulmonary subtype the printed answer', 'portal pyaemia follows septic emboli in portal venous drainage and targets the liver', 'septicaemia is multiplying virulent bacteria and toxins in blood, not capillary impaction by septic emboli', 'paradoxical embolism bypasses the pulmonary filter through a right-to-left communication'] },
  { ref: 'Q02', concept: 'infection-definition', page: 1, stem: 'The best definition for infection is:', key: 'A', options: ['Invasion of body by pathogenic microorganism', 'Invasion of body by commensals', 'Spread of microorganism in the body', 'Localization of microorganism', 'Phagocytosis of microorganism'], clue: 'the defining requirement is pathogenic microbial invasion rather than a downstream event or commensal presence', reasons: ['pathogenic microorganism invasion is the source-keyed defining event', 'commensals may colonise without producing infection', 'spread can occur after infection but is not the definition itself', 'localisation describes distribution rather than pathogenic invasion', 'phagocytosis is a host response to microorganisms'] },
  { ref: 'Q03', concept: 'toxemia-definition', page: 1, stem: 'Toxemia means:', key: 'A', options: ['Presence of bacterial toxins in blood', 'Presence of chemical toxins in blood', 'Presence of bacteria and their toxins in blood', 'Presence of bacterial toxins in internal organs'], clue: 'toxaemia names bacterial toxin circulation in the bloodstream', reasons: ['bacterial toxins in blood match the printed definition', 'chemical toxins describe poisoning rather than this bacterial-infection classification', 'bacteria together with toxins and multiplication point toward septicaemia', 'the defining location is blood, not merely internal organs'] },
  { ref: 'Q04', concept: 'acute-toxemia-effects', page: 1, stem: 'All are effects of acute toxemia except: -', key: 'B', options: ['Bilateral tubular necrosis of the kidney', 'Reactive systemic amyloidosis', 'Toxic myocarditis', 'Fatty change of parenchymatous cells', 'Focal necrosis of the liver'], clue: 'the question asks for the chronic complication among otherwise acute toxic organ injuries', reasons: ['acute toxin-mediated injury can damage renal tubules', 'reactive systemic amyloidosis develops with sustained chronic inflammatory stimulation rather than an acute toxin episode', 'toxic myocarditis is an acute toxin-mediated organ effect', 'parenchymal fatty change can accompany acute toxic injury', 'focal hepatic necrosis can accompany acute toxic injury'] },
  { ref: 'Q05', concept: 'bacteremia', page: 1, stem: 'Circulation of relatively small number of bacteria that do not multiply significantly in the blood and without toxic manifestations is called:', key: 'B', options: ['Toxemia', 'Bacteremia', 'Septicemia', 'Pyemia'], clue: 'small numbers circulate transiently without significant multiplication or toxicity', reasons: ['toxaemia refers to bacterial toxins circulating in blood', 'bacteraemia is the low-number nonmultiplying bloodstream state described', 'septicaemia involves virulent bacterial multiplication and toxic manifestations', 'pyaemia involves septic emboli that seed metastatic abscesses'] },
  { ref: 'Q06', concept: 'bacteremia', page: 2, stem: 'Bacteremia may be associated with:', key: 'A', options: ['Tooth extraction', 'Circulation of bacterial toxins in blood', 'Multiplication of bacteria in blood', 'Septic emboli in blood', 'Viral infection'], clue: 'a transient bloodstream entry of small bacterial numbers can follow dental manipulation', reasons: ['tooth extraction can transiently introduce oral bacteria into blood', 'circulating bacterial toxins defines toxaemia', 'active bacterial multiplication in blood points toward septicaemia', 'septic emboli in blood define pyaemia', 'viral infection does not establish bacterial circulation'] },
  { ref: 'Q07', concept: 'septicemia-definition', page: 2, stem: 'Circulation and multiplication of virulent bacteria and its toxins in blood is termed:', key: 'C', options: ['Bacteremia', 'Pyemia', 'Septicemia', 'Toxemia', 'None of the above'], clue: 'both virulent bacteria and their toxins circulate while the bacteria multiply', reasons: ['bacteraemia lacks the defining significant multiplication and toxicity', 'pyaemia requires septic emboli and metastatic abscess formation', 'septicaemia matches multiplying virulent bacteria plus toxins in blood', 'toxaemia refers to bacterial toxins in blood rather than multiplying bacteria and toxins together', 'a listed term exactly matches the description'] },
  { ref: 'Q08', concept: 'septicemia-pathology', page: 2, stem: 'Which of the followings is true for septicemia:', key: 'C', options: ['It’s a common complication of TB due to blood spread', 'It’s a common cause of subacute bacterial endocarditis', 'Acute splenomegaly is a common feature', 'All of the above', 'None of the above'], clue: 'the lecture and printed key identify acute splenic swelling as a characteristic pathological feature', reasons: ['haematogenous tuberculosis produces disseminated TB rather than making septicaemia a common TB complication', 'the source does not define septicaemia as a common cause of subacute bacterial endocarditis', 'acute splenic swelling is explicitly listed among septicaemia pathology', 'the first two propositions do not become correct merely because acute splenomegaly is true', 'one listed statement is true'] },
  { ref: 'Q09', concept: 'septicemia-pathology', page: 2, stem: 'Acutely enlarged spleen with dark fluid pulp is seen with:', key: 'C', options: ['Bilharziasis.', 'Chronic venous congestion.', 'Septicemia.', 'Liver cirrhosis.', 'Leukemia.'], clue: 'an acute soft dark fluid spleen is the septic splenic pattern', reasons: ['bilharziasis produces chronic granulomatous and fibrotic disease rather than this acute septic spleen', 'chronic venous congestion produces a congested firm spleen rather than the acute septic pattern', 'septicaemia causes acute splenic swelling with dark fluid pulp', 'cirrhosis can cause chronic congestive splenomegaly through portal hypertension', 'leukaemia may enlarge the spleen but does not define this acute dark fluid pulp pattern'] },
  { ref: 'Q11', concept: 'pyemia-definition', page: 3, stem: 'Circulation of septic emboli with their impaction in the capillaries of different organs leading to multiple abscesses formation is called:', key: 'E', options: ['Septicemia', 'Toxemia', 'Hyperemia', 'Bacteremia', 'Pyemia'], clue: 'infected emboli impact in organ capillaries and seed multiple abscesses', reasons: ['septicaemia centres on multiplying virulent bacteria and toxins in blood', 'toxaemia centres on bacterial toxins circulating in blood', 'hyperaemia is increased arterial inflow, not infected embolic seeding', 'bacteraemia is low-number bacterial circulation without significant toxic manifestation', 'pyaemia is defined by septic emboli lodging in organs and forming multiple abscesses'] },
]

for (const question of questions) {
  const concept = byHandle[question.concept]
  question.id = `Q-HU102-PAT-INF-F7-${question.ref}`
  question.asmCit = `CIT-HU102-F7P1-${question.ref}-ASM`
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

const fullConcept = (concept) => `# Item
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
${concept.article === definitionsArticle ? sepsisArticle : definitionsArticle}
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
0.82
## exam_weight_by_year
HU_Y1=0.82
## clinical_relevance
0.82
## academic_relevance
0.97
## weight_confidence
0.62
## support_mode
direct_statement
## confidence
0.94
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | PDF p${Math.min(...questions.filter((question) => question.concept === concept.handle).map((question) => question.page))} | Family-7 ${questions.filter((question) => question.concept === concept.handle).map((question) => question.ref).join(', ')}
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

const sparseConcept = (concept) => `# Item
## id
${concept.id}
## label
${concept.reuseLabel}
## canonical_key
${concept.reuseKey}
## article_ids
+${concept.article}
## atomic_claim_ids
+${concept.claim}
## resource_ids
+${lecture}
${assessment}`

const explain = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. This distinguishes the named bloodstream-infection state by what circulates, whether organisms multiply, and whether septic emboli lodge in organs. Applying those three checks makes the printed answer reproducible.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative belongs to a different bloodstream-infection definition, route or pathological consequence. Tracking organism, toxin and embolus separately prevents the terms from being interchanged.`
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
${['Q01', 'Q04', 'Q08'].includes(question.ref) ? 'Moderate' : 'Easy'}
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Infection > ${concept.micro}
## clinical_relevance
0.82
## academic_relevance
0.97
## cognitive_effort_score
0.58
## exam_weight_by_year
HU_Y1=0.82
## question_only_for
HU_Y1
## concept_ids
${concept.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${['Q01', 'Q04', 'Q08'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q01', 'Q04', 'Q08'].includes(question.ref) ? 58 : 44}
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
Exact source wording and lettered option order are preserved. No official sitting, marks, recurrence or candidate response is inferred.${concept.reuseId ? ' This question reuses the governed same-scope bacteraemia concept rather than creating a rival.' : ''}
## estimated_seconds
70
## randomise_answers
yes`
}

const conceptQuestionIds = (concept) => questions.filter((question) => question.concept === concept.handle).map((question) => question.id)
const conceptAsmCitations = (concept) => questions.filter((question) => question.concept === concept.handle).map((question) => question.asmCit)
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
${id === definitionsArticle ? 'Bloodstream infection definitions' : 'Septicaemia and pyaemia'}
## nanotopic
Organisms, toxins and septic emboli
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
HU-BMS-102 > Pathology > Infection > ${id === definitionsArticle ? 'Bloodstream infection definitions' : 'Septicaemia and pyaemia'}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; the Enas Elhosary infection lecture supplies Helwan teaching authority and the Family-7 bank supplies exact auxiliary printed-key evidence without official-exam authority.
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
Helwan University infection teaching lecture, pages 2–15, for local definitions and pathology.
Tier-3 Family-7 pathology infection bank, pages 1–3, with exact inline printed answers.
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
mediaRecommendations: No visual is required for the tested definitions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const definitionConcepts = concepts.filter((concept) => concept.article === definitionsArticle)
const sepsisConcepts = concepts.filter((concept) => concept.article === sepsisArticle)
const articles = [
  articleRow({ id: definitionsArticle, title: 'Bacteraemia, toxaemia and infection: definitions that must not be interchanged', aliases: ['Bloodstream infection terminology', 'Bacteria versus toxins in blood'], subset: definitionConcepts, other: sepsisArticle,
    summary: 'Bloodstream-infection terminology depends on what is present in blood and what it does. Infection requires pathogenic tissue invasion, bacteraemia is transient low-number bacterial circulation without major toxicity, and toxaemia is circulating bacterial toxin; acute toxin injury must also be separated from chronic reactive amyloidosis.',
    sections: `### Definition\n${byHandle['infection-definition'].display} This identifies pathogenic invasion rather than colonisation, localisation or phagocytosis.\n\n### Mechanism\n${byHandle.bacteremia.display} The bacteria are few and do not multiply significantly; a transient episode can follow tooth extraction. ${byHandle['toxemia-definition'].display} Toxaemia concerns the toxin, not significant bacterial multiplication.\n\n### Key determinants\nAsk three questions: are bacteria present, are they multiplying, and are toxins or infected emboli the dominant event? Low-number nonmultiplying bacteria indicate bacteraemia; toxin circulation indicates toxaemia.\n\n### Clinical significance\n${byHandle['acute-toxemia-effects'].display} Acute toxic injury can affect kidney, myocardium, liver and parenchymal cells, whereas reactive systemic amyloidosis belongs to prolonged inflammatory stimulation.`,
    loses: ['Calling commensal colonisation infection without pathogenic tissue invasion.', 'Using toxaemia when bacteria themselves are multiplying in blood.', 'Treating reactive systemic amyloidosis as an acute toxin effect.'], notes: 'The live bacteraemia concept is reused by exact ID and receives only reciprocal article, claim and source links.' }),
  articleRow({ id: sepsisArticle, title: 'Septicaemia and pyaemia: bloodstream multiplication, septic emboli and organ pathology', aliases: ['Septicemia versus pyemia', 'Septic emboli and metastatic abscesses'], subset: sepsisConcepts, other: definitionsArticle,
    summary: 'Septicaemia is a toxic bloodstream infection with multiplying virulent bacteria, whereas pyaemia is an embolic process that seeds multiple abscesses. The route of septic emboli determines the target capillary bed, and acute splenic swelling is a characteristic pathological feature of septicaemia.',
    sections: `### Definition\n${byHandle['septicemia-definition'].display} ${byHandle['pyemia-definition'].display}\n\n### Mechanism\nA septic focus can cause septic thrombophlebitis, releasing infected emboli. Their capillary impaction seeds pyaemic abscesses. ${byHandle['pulmonary-pyemia'].display}\n\n### Key determinants\nSepticaemia is recognised by virulent bacterial multiplication plus toxins. Pyaemia is recognised by septic emboli plus metastatic abscesses. Pulmonary pyaemia follows systemic-venous emboli to lung capillaries; the route is therefore part of the name.\n\n### Clinical significance\n${byHandle['septicemia-pathology'].display} Other listed changes include degeneration, petechial haemorrhage, serosal inflammation and acute bacterial endocarditis. The acutely enlarged dark fluid spleen should not be confused with chronic congestive splenomegaly.`,
    loses: ['Calling multiplying virulent bacteria without embolic abscesses pyaemia.', 'Calling septic embolic multiple abscesses septicaemia.', 'Ignoring venous route when classifying pulmonary pyaemia.'], notes: 'Family-7 Q10 is intentionally absent because its printed key is questionable; it remains a dedicated conflict hold.' }),
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
  ['infection-definition', 'associated_with', 'bacteremia', 'pathogenic invasion can provide a source for bacterial entry into blood'],
  ['bacteremia', 'contrasts_with', 'toxemia-definition', 'bacteraemia concerns bacteria while toxaemia concerns bacterial toxins'],
  ['bacteremia', 'contrasts_with', 'septicemia-definition', 'bacteraemia is low-number and nonmultiplying while septicaemia is virulent and multiplying'],
  ['toxemia-definition', 'associated_with', 'acute-toxemia-effects', 'circulating bacterial toxins produce acute toxic organ injury'],
  ['septicemia-definition', 'associated_with', 'septicemia-pathology', 'the septic bloodstream state produces the acute splenic and capillary pathology'],
  ['septicemia-definition', 'contrasts_with', 'pyemia-definition', 'septicaemia is bloodstream multiplication while pyaemia is septic embolic seeding'],
  ['pyemia-definition', 'associated_with', 'pulmonary-pyemia', 'systemic-venous route directs septic emboli to pulmonary capillaries'],
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
  ['evidence/HU-BMS-102-pathology-family7-part1-sources.md', sourceRows],
  ['concept/HU-BMS-102-pathology-family7-part1-concepts.md', concepts.map((concept) => concept.reuseId ? sparseConcept(concept) : fullConcept(concept)).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family7-part1-articles.md', articles],
  ['question/HU-BMS-102-pathology-family7-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part1-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family7-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family7-part1-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '7-part1', refs: questions.map((question) => `F7-${question.ref}`), released: { sources: 2, articles: 2, concepts: concepts.length, newConcepts: concepts.filter((concept) => !concept.reuseId).length, conceptReuses: concepts.filter((concept) => concept.reuseId).length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, holds: { questionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
