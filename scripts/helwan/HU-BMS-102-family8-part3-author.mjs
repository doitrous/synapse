import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_6050cec97addd49101a3'
const lecture2 = 'src_949c1820aea58bded856'
const suppurationArticle = 'ART-HU-BMS102-PAT-F8P3-SUPPURATIVE-VARIANTS'
const granulomaArticle = 'ART-HU-BMS102-PAT-F8P3-CHRONIC-GRANULOMATOUS-MORPHOLOGY'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  { handle: 'carbuncle', reuseId: 'CON-INF-5A541895EDFA72', reuseKey: 'pathology.inflammation.carbuncle-acute-suppurative-example', reuseLabel: 'A carbuncle is an example of acute suppurative inflammation', objective: 'Classify a carbuncle as acute suppurative inflammation.', micro: 'Suppurative inflammation', nano: 'Carbuncle classification', article: suppurationArticle, subject: 'A carbuncle', predicate: 'is an example of', object: 'acute suppurative inflammation', display: 'A carbuncle is an example of acute suppurative inflammation.', teachPage: 14, teachText: 'Carbuncles are clusters of deeply connected subcutaneous abscesses that cause deeper suppuration.' },
  { handle: 'staph', reuseId: 'CON-INF-E31DBD021DCD8D', reuseKey: 'pathology.inflammation.staphylococci-suppurative-organism', reuseLabel: 'Staphylococci cause suppurative inflammation', objective: 'Select staphylococci as organisms causing suppurative inflammation.', micro: 'Suppurative inflammation', nano: 'Pyogenic organism', article: suppurationArticle, subject: 'Staphylococci', predicate: 'cause', object: 'suppurative inflammation and abscesses', display: 'Staphylococci cause suppurative inflammation and abscesses.', teachPage: 6, teachText: 'The Helwan abscess slide gives Staphylococci as the cause.' },
  { handle: 'lung-abscess', key: 'pathology.inflammation.purulent-lung-abscess-example', label: 'A lung abscess is an example of purulent inflammation', aliases: ['Purulent lung abscess', 'Lung abscess classification'], definition: 'A lung abscess is a localized collection of pus within lung tissue and is therefore a purulent, suppurative inflammatory lesion.', objective: 'Identify lung abscess as an example of purulent inflammation.', pitfalls: 'Choosing catarrhal rhinitis, fibrinous serosal inflammation, rheumatoid arthritis or serofibrinous inflammation, none of which is a localized pus collection.', type: 'classification', micro: 'Suppurative inflammation', nano: 'Lung abscess example', article: suppurationArticle, subject: 'A lung abscess', predicate: 'is', object: 'an example of purulent inflammation', display: 'A lung abscess is an example of purulent inflammation.', teachPage: 6, teachText: 'An abscess is localized acute suppuration and can occur in any organ, including the lung.' },
  { handle: 'abscess', reuseId: 'CON-INF-4FFD1532040A64', reuseKey: 'pathology.inflammation.abscess-acute-localized-suppurative-definition', reuseLabel: 'An abscess is an acute localized suppurative inflammation', objective: 'Define an abscess as acute localized suppurative inflammation.', micro: 'Suppurative inflammation', nano: 'Abscess definition', article: suppurationArticle, subject: 'An abscess', predicate: 'is', object: 'an acute localized suppurative inflammation', display: 'An abscess is an acute localized suppurative inflammation.', teachPage: 6, teachText: 'Abscess definition: a localized suppurative acute inflammation characterized by pus formation.' },
  { handle: 'chronic-features', key: 'pathology.inflammation.chronic-features-mild-congestion-fibrosis', label: 'Chronic inflammation has long duration, gradual onset and fibrosis with only mild vascular congestion', aliases: ['Chronic inflammation characteristics', 'Chronic inflammation vascular response'], definition: 'Chronic inflammation develops gradually, persists for weeks or months, may follow an acute episode and commonly heals by fibrosis. Its vascular congestion and fluid exudation are mild rather than marked.', objective: 'Recognise vascular congestion as a mild rather than defining marked feature of chronic inflammation.', pitfalls: 'Treating any congestion as impossible in chronic inflammation; the source distinction is that the vascular reaction is mild, while duration, gradual onset and fibrosis are characteristic.', type: 'comparison', micro: 'Chronic inflammation', nano: 'Characteristic features', article: granulomaArticle, subject: 'Chronic inflammation', predicate: 'has', object: 'long duration, gradual onset and fibrosis with mild vascular congestion', display: 'Chronic inflammation has long duration, gradual onset and fibrosis with mild vascular congestion.', teachPage: 34, teachText: 'Chronic inflammation has gradual onset, long duration, mild vascular congestion, scanty exudate and healing by fibrosis.' },
  { handle: 'granuloma-main-cell', key: 'pathology.inflammation.granuloma-main-epithelioid-macrophage', label: 'Epithelioid macrophages are the defining main cells of a granuloma', aliases: ['Granuloma main cell', 'Epithelioid histiocytes in granuloma'], definition: 'A granuloma is organized around focal aggregates of modified macrophages called epithelioid cells or epithelioid histiocytes. Lymphocytes, plasma cells, giant cells and fibroblasts may accompany them.', objective: 'Identify epithelioid cells or histiocytes as the main defining cells in a granuloma.', pitfalls: 'Selecting collagen, endothelial cells, fibroblasts or pigment-laden macrophages as the defining component, or treating accompanying lymphocytes as the main cell.', type: 'morphological_pattern', micro: 'Granulomatous inflammation', nano: 'Main cell', article: granulomaArticle, subject: 'A granuloma', predicate: 'is centered on', object: 'epithelioid macrophages or histiocytes', display: 'A granuloma is centered on epithelioid macrophages or histiocytes.', teachPage: 40, teachText: 'Granuloma is characterized by focal accumulation of many modified macrophages called epithelioid cells.' },
  { handle: 'giant-fusion', key: 'pathology.inflammation.multinucleated-giant-cell-macrophage-fusion', label: 'Multinucleated giant cells form by fusion of macrophages', aliases: ['Giant-cell macrophage origin', 'Macrophage fusion'], definition: 'Persistent inflammatory stimulation can cause activated macrophages to fuse, producing multinucleated giant cells. These cells are commonly seen in granulomas.', objective: 'Identify macrophages as the cells that fuse to form multinucleated giant cells.', pitfalls: 'Choosing lymphocytes, endothelial cells, fibroblasts or eosinophils because they may be present near a granuloma but do not form its giant cells.', type: 'cell_origin', micro: 'Granulomatous inflammation', nano: 'Giant-cell origin', article: granulomaArticle, subject: 'Multinucleated giant cells', predicate: 'form by fusion of', object: 'macrophages', display: 'Multinucleated giant cells form by fusion of macrophages.', teachPage: 37, teachText: 'Macrophages perform phagocytosis and form giant cells; giant cells are most commonly seen in granulomas.' },
  { handle: 'sarcoid', key: 'pathology.inflammation.sarcoidosis-noninfective-unknown-cause-granuloma', label: 'Sarcoidosis is a noninfective granulomatous disease of unknown cause', aliases: ['Sarcoid granuloma classification', 'Unknown-cause granuloma'], definition: 'In the source classification, sarcoidosis is a noninfective granulomatous disease placed under granulomas of unknown cause, in contrast to infective granulomas such as tuberculosis or leprosy.', objective: 'Classify sarcoidosis as a noninfective granuloma of unknown cause.', pitfalls: 'Selecting fungal, viral, parasitic or tuberculous causes, which are infective categories rather than the source classification for sarcoidosis.', type: 'classification', micro: 'Granulomatous inflammation', nano: 'Sarcoidosis classification', article: granulomaArticle, subject: 'Sarcoidosis', predicate: 'is', object: 'a noninfective granulomatous disease of unknown cause', display: 'Sarcoidosis is a noninfective granulomatous disease of unknown cause.', teachPage: 40, teachText: 'The Helwan granuloma classification places sarcoidosis under unknown cause.' },
  { handle: 'granuloma-definition', key: 'pathology.inflammation.granuloma-chronic-specific-inflammation', label: 'A granuloma is a form of chronic specific inflammation', aliases: ['Granuloma definition', 'Chronic specific inflammation'], definition: 'A granuloma is a chronic specific inflammatory pattern formed by a focal tumor-like aggregate of modified macrophages with accompanying lymphocytes, plasma cells, giant cells and fibroblasts.', objective: 'Classify granuloma as chronic specific inflammation.', pitfalls: 'Calling a granuloma a tumor, acute inflammation, chronic nonspecific inflammation or a type of necrosis.', type: 'definition', micro: 'Granulomatous inflammation', nano: 'Granuloma definition', article: granulomaArticle, subject: 'A granuloma', predicate: 'is', object: 'a form of chronic specific inflammation', display: 'A granuloma is a form of chronic specific inflammation.', teachPage: 40, teachText: 'Granuloma definition: it is a chronic specific inflammation.' },
]

for (const concept of concepts) {
  concept.id = concept.reuseId ?? idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F8P3-${token}-01`
  concept.currCit = `CIT-HU102-F8P3-${token}-CURR`
  concept.span = `SPN-HU102-F8P3-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q29', concept: 'carbuncle', page: 6, stem: 'Which one of the followings is acute suppurative inflammation:', key: 'E', options: ['Catarrhal inflammation', 'Membranous inflammation', 'Fibrinous inflammation', 'Necrotizing inflammation', 'Carbuncle'], clue: 'a carbuncle is a cluster of connected pus-forming abscesses', reasons: ['catarrhal inflammation is a superficial mucosal pattern', 'membranous inflammation produces a surface membrane', 'fibrinous inflammation is fibrin-rich rather than purulent', 'necrotizing inflammation is classified by tissue death rather than pus', 'carbuncle is an acute suppurative lesion'] },
  { ref: 'Q30', concept: 'staph', page: 6, stem: 'Which of the following organisms can cause suppurative inflammation:', key: 'E', options: ['Diphtheria', 'Influenza virus', 'Pneumococci', 'Herpes zoster', 'Staphylococci'], clue: 'the Helwan abscess teaching slide names Staphylococci as the characteristic cause', reasons: ['diphtheria is classically toxin-mediated and membranous', 'influenza is viral and not the keyed pyogenic organism', 'pneumococci can cause purulent disease but are not the source-keyed option here', 'herpes zoster is viral and vesicular', 'staphylococci characteristically cause abscess-forming suppuration'] },
  { ref: 'Q31', concept: 'lung-abscess', page: 6, stem: 'Which of the followings is an example of purulent inflammation:', key: 'C', options: ['Catarrhal rhinitis', 'Fibrinous pericarditis', 'Lung abscess', 'Rheumatoid arthritis', 'Sero-fibrinous peritonitis'], clue: 'purulent inflammation is pus-forming and a lung abscess is a localized collection of pus', reasons: ['catarrhal rhinitis is mucus-rich superficial inflammation', 'fibrinous pericarditis is fibrin-rich rather than pus-forming', 'lung abscess is a localized purulent lesion', 'rheumatoid arthritis is chronic immune-mediated inflammation', 'serofibrinous peritonitis contains serous fluid and fibrin'] },
  { ref: 'Q32', concept: 'abscess', page: 7, stem: 'Which of the following describes an abscess:', key: 'D', options: ['Acute diffuse inflammation in soft tissue', 'Chronic inflammation following acute reaction', 'Localized chronic inflammation', 'Acute localized suppurative inflammation', 'Acute non-suppurative inflammation'], clue: 'abscess combines acute, localized and suppurative', reasons: ['acute diffuse soft-tissue suppuration describes cellulitis', 'a chronic sequel is not the definition of an abscess', 'an abscess is acute rather than localized chronic inflammation', 'acute localized suppurative inflammation is the exact definition', 'pus formation makes the lesion suppurative'] },
  { ref: 'Q35', concept: 'lung-abscess', page: 7, stem: 'Which of the followings is an example of purulent inflammation:', key: 'C', options: ['Catarrhal rhinitis', 'Fibrinous pericarditis', 'Lung abscess.', 'Rheumatoid arthritis', 'Sero-fibrinous pleurisy'], clue: 'a lung abscess is a localized pus collection and therefore purulent', reasons: ['catarrhal rhinitis is a superficial mucosal discharge pattern', 'fibrinous pericarditis is dominated by fibrin', 'the source prints Lung abscess. as the purulent example', 'rheumatoid arthritis is chronic immune-mediated inflammation', 'serofibrinous pleurisy is serous and fibrinous rather than purulent'] },
  { ref: 'Q36', concept: 'staph', page: 7, stem: 'Which of the following organisms causes suppurative inflammation:', key: 'D', options: ['Diphtheria', 'E coli', 'Pneumococci', 'Staphylococci', 'Herpes simplex'], clue: 'staphylococci are the characteristic source-keyed abscess-forming organisms', reasons: ['diphtheria is toxin-mediated and membranous', 'E coli can infect tissue but is not the source-keyed characteristic answer', 'pneumococci can cause purulent infection but are not keyed here', 'staphylococci characteristically form abscesses', 'herpes simplex is a viral vesicular infection'] },
  { ref: 'Q37', concept: 'chronic-features', page: 7, stem: 'Chronic inflammation characterized by the following features except:', key: 'B', options: ['Long duration', 'Vascular congestion', 'Could be associated with fibrosis', 'It may follow acute inflammation', 'Gradual onset'], clue: 'the lecture describes only mild vascular congestion, while long duration, gradual onset, fibrosis and following acute inflammation are defining features', reasons: ['long duration is characteristic of chronic inflammation', 'vascular congestion is not a defining marked feature and is the printed exception', 'fibrosis commonly accompanies chronic inflammation', 'chronic inflammation may follow an acute episode', 'gradual onset is characteristic'] },
  { ref: 'Q39', concept: 'granuloma-main-cell', page: 8, stem: 'By definition, granulomas are composed of:', key: 'D', options: ['Cholesterol clefts', 'Collagen', 'Endothelial cells and fibroblasts', 'Epithelioid cells', 'Hemosiderin-laden macrophages'], clue: 'a granuloma is defined by focal aggregates of modified macrophages called epithelioid cells', reasons: ['cholesterol clefts may appear in some lesions but do not define granuloma', 'collagen may accompany healing but is not the defining cell', 'endothelial cells and fibroblasts are supportive rather than defining', 'epithelioid cells are the defining modified macrophages', 'hemosiderin-laden macrophages indicate prior hemorrhage rather than granuloma'] },
  { ref: 'Q40', concept: 'giant-fusion', page: 8, stem: 'Multinucleated giant ceils originate by fusion of which type of cell:', key: 'C', options: ['Lymphocytes', 'Endothelial cells', 'Macrophages', 'Fibroblasts', 'Eosinophils'], clue: 'activated macrophages fuse to form multinucleated giant cells', reasons: ['lymphocytes regulate the response but do not fuse into giant cells', 'endothelial cells line vessels', 'macrophages fuse to produce multinucleated giant cells', 'fibroblasts synthesize matrix', 'eosinophils participate in allergic and parasitic inflammation'] },
  { ref: 'Q41', concept: 'sarcoid', page: 8, stem: 'Non infective granuloma includes:', key: 'B', options: ['Fungal', 'Sarcoidosis', 'Viral', 'Parasitic', 'Tuberculosis'], clue: 'the lecture classifies sarcoidosis as an unknown-cause noninfective granuloma', reasons: ['fungal granulomas are infective', 'sarcoidosis is the noninfective granulomatous disease', 'viral disease is infective', 'parasitic granulomas are infective or foreign-antigen driven', 'tuberculosis is an infective granuloma'] },
  { ref: 'Q43', concept: 'granuloma-definition', page: 8, stem: 'Which of the followings describes granuloma:', key: 'D', options: ['It is a tumor', 'It is a form of acute inflammation', 'It is a chronic nonspecific inflammation', 'It is a chronic specific inflammation', 'It is a type of necrosis'], clue: 'the Helwan lecture defines granuloma as chronic specific inflammation', reasons: ['a granuloma can look tumor-like but is inflammatory, not neoplastic', 'granuloma is chronic rather than acute', 'the source classifies it as specific rather than nonspecific', 'chronic specific inflammation is the exact lecture definition', 'necrosis may occur within a granuloma but is not the lesion itself'] },
  { ref: 'Q45', concept: 'granuloma-main-cell', page: 9, stem: 'The main cell in the granuloma is;', key: 'D', options: ['Plasma cell', 'Fibroblast', "Lymphocytes'", 'Histiocytes', 'Eosinophils'], clue: 'histiocytes are tissue macrophages that become the epithelioid cells defining granuloma', reasons: ['plasma cells may accompany chronic inflammation but are not the main granuloma cell', 'fibroblasts contribute fibrosis around the lesion', 'lymphocytes surround and regulate the granuloma', 'histiocytes are macrophages and the source-keyed main cell', 'eosinophils are prominent in allergic and parasitic inflammation'] },
]

for (const question of questions) {
  question.id = `Q-HU102-PAT-INF-F8-${question.ref}`
  question.asmCit = `CIT-HU102-F8P3-${question.ref}-ASM`
}
const conceptQuestions = (concept) => questions.filter((question) => question.concept === concept.handle)
const questionIds = (concept) => conceptQuestions(concept).map((question) => question.id)
const assessmentCitations = (concept) => conceptQuestions(concept).map((question) => question.asmCit)

const sourceRows = `# Item
## id
${assessment}
## title
Inflammation MCQ — Helwan BMS-102 pathology keyed study bank
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Inflammation MCQ.pdf
## media_type
application/pdf
## languages
en
## page_count
12
## sha256
6050cec97addd49101a398bb34a981f2cee4080dab3cefa3ffee85786d6d9ae9
## processing_status
pending
## rights
Local study material held for internal authoring only; no page image is redistributed.
## qualification
Tier-3 local keyed study bank with inline printed letter keys. It has no authenticated official-exam label, sitting, marks or official-key authority.
## is_assessment
yes

---

# Item
## id
${lecture2}
## title
Inflammation 2 — Helwan BMS-102 pathology lecture
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 7 - Inflammation 2/Inflammation lecture 2.pdf
## media_type
application/pdf
## languages
en
## page_count
53
## sha256
949c1820aea58bded856011cc31bd8ce958941ce7f17e4c390cb1343b8d1677d
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary, Lecturer of Pathology, Faculty of Medicine, Helwan University. It supplies local curriculum teaching, not an assessment sitting or official answer key.
## is_assessment
no`

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
DIS-PAT-T02
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${concept.micro}
## article_ids
${concept.article}
## related_article_ids
${concept.article === suppurationArticle ? granulomaArticle : suppurationArticle}
## related_concept_ids
${concepts.filter((other) => other.handle !== concept.handle && other.article === concept.article).map((other) => other.id).join('\n')}
## resource_ids
${lecture2}
${assessment}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.86
## exam_weight_by_year
HU_Y1=0.86
## clinical_relevance
0.84
## academic_relevance
0.98
## weight_confidence
0.65
## support_mode
direct_statement
## confidence
0.94
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | Family-8 ${conceptQuestions(concept).map((question) => question.ref).join(', ')}
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
microtopicId: No reviewed microtopic ID exists beneath the canonical inflammation placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 8 completed the four-query search-before-mint gate in the governing triage.
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
+${lecture2}
${assessment}`

const explanation = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. This distinguishes the tested lesion, cell or inflammatory pattern without altering the printed key. The record remains Draft pending review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative represents another organism, exudative pattern, chronic-inflammation component or lesion class. Keeping those scopes separate prevents a superficial word match.`
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
${question.options.map((option, index) => `## answer_${'abcde'[index]}\n${option}\n## explanation_${'abcde'[index]}\n${explanation(question, index)}`).join('\n')}
## topic
General pathology
## subtopic
Inflammation
## difficulty
${['Q30', 'Q35', 'Q37', 'Q39', 'Q43', 'Q45'].includes(question.ref) ? 'Moderate' : 'Easy'}
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${concept.micro}
## clinical_relevance
0.84
## academic_relevance
0.98
## cognitive_effort_score
0.6
## exam_weight_by_year
HU_Y1=0.86
## question_only_for
HU_Y1
## concept_ids
${concept.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${['Q30', 'Q35', 'Q37', 'Q39', 'Q43', 'Q45'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q30', 'Q35', 'Q37', 'Q39', 'Q43', 'Q45'].includes(question.ref) ? 60 : 45}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${assessment}
${lecture2}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${question.page}, Family-8 ${question.ref}: exact stem, lettered option order and visibly printed inline answer ${question.options['ABCDE'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching support: ${lecture2}, PDF p${concept.teachPage}.
## attachments

## attached_image

## author_notes
Exact source wording and lettered option order are preserved, including source spelling and punctuation. No official sitting, marks, recurrence or candidate response is inferred.${concept.reuseId ? ' This row reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
75
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, other, summary, sections, loses, basis }) => `# Item
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
Inflammation
## microtopic
${id === suppurationArticle ? 'Suppurative inflammatory variants' : 'Chronic and granulomatous inflammation'}
## nanotopic
Abscess, chronic inflammation and granuloma morphology
## primary_node_id
SYS-INF
## secondary_node_ids
DIS-PAT-T02
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
${subset.flatMap(questionIds).join('\n')}
## resource_ids
${lecture2}
${assessment}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${id === suppurationArticle ? 'Suppurative inflammation' : 'Chronic and granulomatous inflammation'}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; the governed Helwan lecture supplies curriculum support and the Family-8 bank supplies exact auxiliary printed-key evidence without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${[concept.currCit, ...assessmentCitations(concept)].join(', ')}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${lecture2}
${assessment}
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
Exact source wording is retained in the linked questions; article prose standardizes terminology without changing the printed keys.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for the tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const suppurationConcepts = concepts.filter((concept) => concept.article === suppurationArticle)
const granulomaConcepts = concepts.filter((concept) => concept.article === granulomaArticle)
const articles = [
  articleRow({ id: suppurationArticle, title: 'Suppurative variants: carbuncle, abscess and purulent lung inflammation', aliases: ['Purulent inflammation examples', 'Abscess-forming suppuration'], subset: suppurationConcepts, other: granulomaArticle,
    summary: 'Suppurative inflammation is pus-forming acute inflammation. Staphylococci commonly produce localized abscesses, a carbuncle is a connected cluster of abscesses, and an abscess in the lung is a purulent inflammatory lesion.',
    sections: `### Definition\n${byHandle.abscess.display} ${byHandle['lung-abscess'].display}\n\n### Mechanism\n${byHandle.staph.display} Localization produces an abscess rather than diffuse cellulitis.\n\n### Key determinants\n${byHandle.carbuncle.display} The connected abscesses explain why carbuncle belongs to the acute suppurative group.\n\n### Clinical significance\nPurulent means pus-forming. A lung abscess meets that definition, whereas catarrhal, fibrinous and serofibrinous patterns are classified by different exudates.`,
    loses: ['Calling diffuse cellulitis an abscess.', 'Choosing a fibrinous or catarrhal lesion when the prompt asks for purulent inflammation.', 'Missing Staphylococci as the source-keyed characteristic abscess-forming organism.'], basis: 'Helwan Inflammation 2 p6 and p14 supplies local teaching; Family-8 p6–7 supplies exact inline keys.' }),
  articleRow({ id: granulomaArticle, title: 'Chronic and granulomatous inflammation: cells, morphology and classification', aliases: ['Granuloma morphology', 'Chronic specific inflammation'], subset: granulomaConcepts, other: suppurationArticle,
    summary: 'Chronic inflammation is prolonged, gradual and commonly fibrosing. Granulomas are chronic specific inflammatory aggregates centered on epithelioid macrophages; macrophage fusion produces giant cells, and sarcoidosis belongs to the noninfective unknown-cause group.',
    sections: `### Definition\n${byHandle['granuloma-definition'].display} ${byHandle['chronic-features'].display}\n\n### Mechanism\n${byHandle['giant-fusion'].display} Persistent macrophage activation therefore supplies both epithelioid cells and giant cells.\n\n### Key determinants\n${byHandle['granuloma-main-cell'].display} Lymphocytes, plasma cells and fibroblasts are accompanying rather than defining cells.\n\n### Clinical significance\n${byHandle.sarcoid.display} Infective fungal, viral, parasitic and tuberculous lesions belong to different etiologic groups.`,
    loses: ['Calling the tumor-like granuloma a neoplasm.', 'Choosing an accompanying lymphocyte or fibroblast as the defining granuloma cell.', 'Treating sarcoidosis as an infective granuloma.'], basis: 'Helwan Inflammation 2 p34, p37 and p40 supplies local teaching; Family-8 p7–9 supplies exact inline keys.' }),
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
${lecture2}
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
PDF p${concept.teachPage}, governed Helwan inflammation lecture
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
Family 8 ${question.ref}
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
${[concept.currCit, ...assessmentCitations(concept)].join('\n')}`

const relationDefs = [
  ['lung-abscess', 'associated_with', 'abscess', 'a lung abscess is an organ-specific localized pus collection'],
  ['carbuncle', 'associated_with', 'abscess', 'a carbuncle is a cluster of connected abscesses'],
  ['staph', 'associated_with', 'abscess', 'staphylococci characteristically cause abscesses'],
  ['chronic-features', 'contrasts_with', 'abscess', 'chronic gradual fibrosing inflammation differs from an acute localized abscess'],
  ['granuloma-main-cell', 'associated_with', 'giant-fusion', 'epithelioid cells and giant cells share macrophage lineage'],
  ['granuloma-definition', 'associated_with', 'granuloma-main-cell', 'epithelioid macrophage aggregates define chronic specific granulomatous inflammation'],
  ['sarcoid', 'associated_with', 'granuloma-definition', 'sarcoidosis is classified within chronic specific granulomatous inflammation'],
  ['granuloma-main-cell', 'associated_with', 'chronic-features', 'macrophage-predominant granulomas belong to chronic inflammation'],
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
  ['evidence/HU-BMS-102-pathology-family8-part3-sources.md', sourceRows],
  ['article/HU-BMS-102-pathology-family8-part3-articles.md', articles],
  ['concept/HU-BMS-102-pathology-family8-part3-concepts.md', concepts.map((concept) => concept.reuseId ? sparseConcept(concept) : fullConcept(concept)).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part3-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part3-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part3-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family8-part3-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family8-part3-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '8-part3', refs: questions.map((question) => `F8-${question.ref}`), released: { sources: 2, articles: 2, concepts: concepts.length, newConcepts: concepts.filter((concept) => !concept.reuseId).length, conceptReuses: concepts.filter((concept) => concept.reuseId).length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, remainingRoutine: 21, exclusions: { wordingRepeats: ['F8-Q18', 'F8-Q33', 'F8-Q34', 'F8-Q50', 'F8-Q51', 'F8-Q52'] }, holds: { questionableKeys: ['F8-Q17', 'F8-Q49', 'F8-Q56', 'F8-Q60', 'F8-Q68'], family7QuestionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
