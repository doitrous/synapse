import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_6050cec97addd49101a3'
const lecture1 = 'src_eaea111707b57559a904'
const lecture2 = 'src_949c1820aea58bded856'
const sequenceArticle = 'ART-HU-BMS102-PAT-ACUTE-INFLAMMATION-SEQUENCE-CELLS'
const mediatorArticle = 'ART-HU-BMS102-PAT-INFLAMMATION-MEDIATORS-PATTERNS'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  { handle: 'vascular-sequence', key: 'pathology.inflammation.acute-vascular-event-sequence-emigration-fourth', label: 'Leukocyte emigration follows vascular permeability, exudation and slowing in the acute-inflammatory sequence', aliases: ['Acute inflammation vascular sequence', 'Fourth vascular event leukocyte emigration'], definition: 'After transient vasoconstriction, acute inflammation proceeds through vasodilatation, increased vascular permeability, protein-rich fluid exudation and haemoconcentration with slowing; leukocyte margination and emigration then follow. In the tested lists, emigration is the fourth event.', objective: 'Order vascular permeability, exudate formation, slowing and leukocyte emigration in acute inflammation.', pitfalls: 'Counting phagocytosis as a vascular event or placing leukocyte emigration before permeability and fluid escape.', type: 'sequence', micro: 'Acute inflammation', nano: 'Vascular event sequence', article: sequenceArticle, subject: 'Leukocyte emigration', predicate: 'follows', object: 'vascular permeability, exudation and slowing in acute inflammation', display: 'Leukocyte emigration follows vascular permeability, exudation and slowing in acute inflammation.', teachSource: lecture1, teachPage: 36, teachText: 'Sequence: vasodilatation, increased vascular permeability, leakage of exudate, margination, rolling, adhesion and transmigration.' },
  { handle: 'carbuncle', key: 'pathology.inflammation.carbuncle-diabetic-multiloculated-neck', label: 'A hot red multiloculated pus-filled neck lesion in a diabetic patient is a carbuncle', aliases: ['Carbuncle clinical pattern', 'Clustered neck abscesses in diabetes'], definition: 'A carbuncle is a cluster of deeply connected cutaneous abscesses that opens through multiple sinuses. A hot red multiloculated swelling on the back of the neck in a diabetic patient is the source-keyed clinical pattern.', objective: 'Diagnose a carbuncle from a diabetic patient with a hot red multiloculated pus-filled neck swelling.', pitfalls: 'Choosing a solitary furuncle or abscess despite the multiple connected loculi, or actinomycosis without sulphur granules and chronic sinuses.', type: 'clinical_pattern', micro: 'Suppurative inflammation', nano: 'Carbuncle', article: mediatorArticle, subject: 'A carbuncle', predicate: 'is', object: 'a cluster of deeply connected cutaneous abscesses', display: 'A carbuncle is a cluster of deeply connected cutaneous abscesses.', teachSource: lecture2, teachPage: 14, teachText: 'Carbuncles are clusters of abscesses connected deeply subcutaneous, causing deeper suppuration.' },
  { handle: 'c5a-ltb4', key: 'pathology.inflammation.mediators-c5a-ltb4-chemotaxis', label: 'Complement C5a and leukotriene B4 are leukocyte chemotactic mediators', aliases: ['C5a and LTB4 chemotaxis', 'Inflammatory chemotactic mediators'], definition: 'Complement fragment C5a and leukotriene B4 act as chemotactic mediators that direct leukocytes toward an inflammatory stimulus. They are not principally paired with fever, phagocytosis or vasodilatation in the tested options.', objective: 'Recognise C5a and leukotriene B4 as a correctly paired set of leukocyte chemotactic mediators.', pitfalls: 'Assigning histamine to phagocytosis, opsonin to fever, or direct endothelial injury to vasodilatation.', type: 'mechanism', micro: 'Inflammatory mediators', nano: 'Chemotactic mediators', article: mediatorArticle, subject: 'Complement C5a and leukotriene B4', predicate: 'promote', object: 'leukocyte chemotaxis', display: 'Complement C5a and leukotriene B4 promote leukocyte chemotaxis.', teachSource: lecture1, teachPage: 33, teachText: 'Inflammatory mediators regulate emigration of leukocytes and chemotaxis.' },
  { handle: 'serofibrinous-exception', key: 'pathology.inflammation.serofibrinous-serosal-not-mucosal', label: 'Serofibrinous inflammation affects serous membranes rather than mucous membranes', aliases: ['Serofibrinous inflammation site', 'Mucosal acute-inflammation exception'], definition: 'Serofibrinous inflammation produces excess fluid exudate rich in fibrin on serous membranes. It therefore differs from catarrhal, membranous, necrotising and allergic patterns that may affect mucosal surfaces.', objective: 'Select serofibrinous inflammation as the acute inflammatory pattern that does not affect mucous membranes.', pitfalls: 'Confusing serofibrinous inflammation of pleura or pericardium with catarrhal or membranous mucosal inflammation.', type: 'classification', micro: 'Morphologic patterns', nano: 'Serofibrinous site', article: mediatorArticle, subject: 'Serofibrinous inflammation', predicate: 'affects', object: 'serous membranes rather than mucous membranes', display: 'Serofibrinous inflammation affects serous membranes rather than mucous membranes.', teachSource: lecture2, teachPage: 21, teachText: 'Sero-fibrinous inflammation: excess fluid exudate rich in fibrin; site: serous membrane.' },
  { handle: 'bradykinin-formation', key: 'pathology.inflammation.bradykinin-kininogen-kallikrein-formation', label: 'Kallikrein forms bradykinin from a plasma precursor', aliases: ['Bradykinin formation by kallikrein', 'Kinin precursor pathway'], definition: 'Bradykinin is generated in plasma from a precursor through the action of kallikrein. It is not stored in mast cells, is not factor XII itself and does not decrease vascular permeability.', objective: 'Identify kallikrein-mediated cleavage of a precursor as the formation mechanism for bradykinin.', pitfalls: 'Confusing bradykinin with stored histamine, factor XII, or a mediator that decreases permeability.', type: 'mechanism', micro: 'Inflammatory mediators', nano: 'Bradykinin formation', article: mediatorArticle, subject: 'Kallikrein', predicate: 'forms', object: 'bradykinin from a plasma precursor', display: 'Kallikrein forms bradykinin from a plasma precursor.', teachSource: lecture1, teachPage: 16, teachText: 'Histamine and bradykinin mediate endothelial contraction with increased inter-endothelial space.' },
  { handle: 'angiogenesis', key: 'pathology.repair.angiogenesis-new-blood-vessels-definition', label: 'Angiogenesis is the formation of new blood vessels', aliases: ['Angiogenesis definition', 'New vessel formation'], definition: 'Angiogenesis means formation of new blood vessels. It is a component of repair and chronic inflammatory healing, distinct from collagen formation, exudate formation or tumour formation itself.', objective: 'Define angiogenesis as formation of new blood vessels.', pitfalls: 'Equating angiogenesis with collagen deposition or tumour formation because both may occur in the same repair or neoplastic setting.', type: 'definition', micro: 'Inflammation and repair', nano: 'Angiogenesis', article: mediatorArticle, subject: 'Angiogenesis', predicate: 'is', object: 'formation of new blood vessels', display: 'Angiogenesis is the formation of new blood vessels.', teachSource: lecture2, teachPage: 36, teachText: 'Attempts at healing include proliferation of small blood vessels (angiogenesis) and fibrosis.' },
  { handle: 'acute-characteristics', key: 'pathology.inflammation.acute-rapid-short-exudative-no-fibrosis', label: 'Acute inflammation has rapid onset, short duration and exudation rather than fibrosis', aliases: ['Acute inflammation characteristics', 'Exudative acute inflammatory response'], definition: 'Acute inflammation is a rapid, short-duration response characterised by vascular reaction and exudation. Fibrosis is a repair or chronic-inflammatory feature rather than a defining acute characteristic.', objective: 'Distinguish rapid exudative acute inflammation from delayed fibrosing chronic inflammation.', pitfalls: 'Calling fibrosis a defining acute feature or selecting delayed onset, weak irritants and lymphocyte predominance.', type: 'comparison', micro: 'Acute inflammation', nano: 'Core characteristics', article: sequenceArticle, subject: 'Acute inflammation', predicate: 'is characterised by', object: 'rapid onset, short duration and exudation rather than fibrosis', display: 'Acute inflammation is characterised by rapid onset, short duration and exudation rather than fibrosis.', teachSource: lecture1, teachPage: 12, teachText: 'Acute inflammation is a rapid host response that delivers leukocytes and plasma proteins to injury.' },
  { handle: 'bradykinin-pain', key: 'pathology.inflammation.bradykinin-pain-mediator', label: 'Bradykinin mediates pain in acute inflammation', aliases: ['Inflammatory pain mediator bradykinin', 'Bradykinin and pain'], definition: 'Bradykinin is a major chemical mediator of pain in acute inflammation. Histamine, C3a, leukotrienes and oxygen radicals have other inflammatory roles in the tested comparison.', objective: 'Select bradykinin as the pain mediator in acute inflammation.', pitfalls: 'Selecting histamine because it increases permeability or C3a because it is an anaphylatoxin.', type: 'mechanism', micro: 'Inflammatory mediators', nano: 'Pain mediation', article: mediatorArticle, subject: 'Bradykinin', predicate: 'mediates', object: 'pain in acute inflammation', display: 'Bradykinin mediates pain in acute inflammation.', teachSource: lecture1, teachPage: 16, teachText: 'Bradykinin is listed among mediators acting during increased vascular permeability.' },
  { handle: 'neutrophil-first48', key: 'pathology.inflammation.acute-neutrophil-first-48-hours', label: 'Neutrophils predominate during the first 48 hours of acute inflammation', aliases: ['Early acute inflammation neutrophils', 'First 48-hour inflammatory cell'], definition: 'Neutrophils are the predominant inflammatory cells during the first 48 hours of acute inflammation. Macrophages and lymphocytes become more prominent later or in chronic inflammation.', objective: 'Identify neutrophils as the predominant cells in the first 48 hours of acute inflammation.', pitfalls: 'Selecting macrophages or lymphocytes because they are important later, or red cells because vascular permeability may permit haemorrhage.', type: 'time_course', micro: 'Acute inflammation', nano: 'Early cellular response', article: sequenceArticle, subject: 'Neutrophils', predicate: 'predominate during', object: 'the first 48 hours of acute inflammation', display: 'Neutrophils predominate during the first 48 hours of acute inflammation.', teachSource: lecture1, teachPage: 23, teachText: 'Inflammatory exudate contains numerous neutrophils, unlike scant-cell transudate.' },
  { handle: 'phagocytosis-definition', key: 'pathology.inflammation.phagocytosis-engulfment-particulate-material', label: 'Phagocytosis is cellular engulfment of particulate material', aliases: ['Phagocytosis definition', 'Engulfment of particles by a cell'], definition: 'Phagocytosis is ingestion and destruction of bacteria, necrotic debris and other particulate material by phagocytic inflammatory cells. A phagosome is the intracellular compartment formed during the process, not the process itself.', objective: 'Define phagocytosis as cellular engulfment of particulate material and distinguish it from migration, chemotaxis and diapedesis.', pitfalls: 'Choosing phagosome, which is a structure, or choosing chemotaxis, migration or diapedesis, which describe cell movement.', type: 'definition', micro: 'Leukocyte response', nano: 'Phagocytosis', article: sequenceArticle, subject: 'Phagocytosis', predicate: 'is', object: 'cellular engulfment of particulate material', display: 'Phagocytosis is cellular engulfment of particulate material.', teachSource: lecture1, teachPage: 31, teachText: 'Phagocytosis is ingestion and destruction of bacteria, necrotic debris and foreign particles by phagocytic inflammatory cells.' },
]

for (const concept of concepts) {
  concept.id = idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F8P1-${token}-01`
  concept.currCit = `CIT-HU102-F8P1-${token}-CURR`
  concept.span = `SPN-HU102-F8P1-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q01', concept: 'vascular-sequence', page: 1, stem: 'If the following events of the vascular phenomena of acute inflammation are placed in their correct order of occurrence which will come fourth:', key: 'B', options: ['Slowing of the stream', 'Emigration of leukocytes', 'Vascular permeability', 'Phagocytosis', 'Fluid exudate'], clue: 'vascular permeability and fluid escape precede slowing, after which leukocytes emigrate', reasons: ['slowing occurs before the emigration step in the listed sequence', 'emigration is the fourth event after permeability, exudation and slowing', 'increased permeability is an earlier vascular change', 'phagocytosis occurs after extravascular migration and is not the fourth vascular event', 'fluid exudation follows permeability and precedes slowing'] },
  { ref: 'Q02', concept: 'carbuncle', page: 1, stem: 'A diabetic patient had a swelling on the back of the neck which is red and hot. Surgical exploration of the swelling showed multiple loculi filled with pus. This lesion is called:', key: 'B', options: ['Actinomycosis', 'Carbuncle', 'Furuncle', 'Abscess', 'Granuloma'], clue: 'multiple deeply connected pus-filled loculi in a diabetic neck lesion define a carbuncle', reasons: ['actinomycosis is a chronic suppurative granuloma and is not defined simply by this multiloculated acute lesion', 'a carbuncle is a cluster of connected abscesses and matches the entire vignette', 'a furuncle is a more limited hair-follicle abscess rather than multiple connected loculi', 'abscess is the generic localized pus collection, while the clustered pattern has a more specific name', 'a granuloma is a macrophage-rich chronic inflammatory structure rather than multiple pus loculi'] },
  { ref: 'Q03', concept: 'c5a-ltb4', page: 1, stem: 'Regarding inflammatory mediators, which of following pairs is correlated:', key: 'B', options: ['IL1& TNF - increased vascular permeability', 'C 5a & leukotriene B 4 - chemotaxis to leukocytes', 'Histamine - phagocytosis', 'Direct endothelial injury - vasodilatation', 'Opsonin - fever & leukocytosis'], clue: 'C5a and leukotriene B4 both direct leukocyte chemotaxis', reasons: ['IL-1 and TNF primarily drive endothelial activation and systemic effects rather than this keyed permeability pairing', 'C5a and leukotriene B4 are correctly paired with leukocyte chemotaxis', 'histamine promotes vasodilatation and permeability rather than phagocytosis', 'direct endothelial injury increases leakage rather than serving as a mediator of vasodilatation', 'opsonins enhance recognition and phagocytosis rather than fever and leukocytosis'] },
  { ref: 'Q04', concept: 'serofibrinous-exception', page: 1, stem: "Which one of the following types of acute inflammation doesn't affect the mucous membranes:", key: 'C', options: ['Catarrhal inflammation', 'Membranous inflammation', 'Serofibrinous inflammation', 'Necrotizing inflammation', 'Allergic inflammation'], clue: 'serofibrinous exudate is described on serous rather than mucous membranes', reasons: ['catarrhal inflammation is a superficial mucosal pattern', 'membranous inflammation occurs on mucosal surfaces', 'serofibrinous inflammation affects serous membranes and is the exception', 'necrotizing inflammation can affect mucosal surfaces', 'allergic inflammation may involve mucous membranes'] },
  { ref: 'Q05', concept: 'vascular-sequence', page: 1, stem: 'If the following events are put in correct order which will come fourth:', key: 'A', options: ['Slowing of blond stream', 'Emigration of leukocytes', 'Increased vascular permeability', 'Hemoconcentration', 'Formation of fluid exudate'], clue: 'permeability causes exudation and haemoconcentration, producing slowing before leukocyte emigration', reasons: ['slowing of the blood stream is the fourth listed event after permeability, fluid exudate and haemoconcentration', 'emigration follows the slowing and margination stage', 'increased vascular permeability is the first event among these options', 'haemoconcentration develops after fluid escape and before slowing', 'fluid exudate forms after permeability and before haemoconcentration'] },
  { ref: 'Q08', concept: 'bradykinin-formation', page: 2, stem: 'Bradykinin:', key: 'D', options: ['Is stored in mast cells', 'Directly initiate fibrinolysis', 'Causes decreased vascular permeability', 'Is formed from a precursor hv the action of kallikrien', 'Is also known as factor XII'], clue: 'kallikrein generates bradykinin from a plasma precursor', reasons: ['histamine rather than bradykinin is stored in mast-cell granules', 'bradykinin does not directly initiate fibrinolysis', 'bradykinin increases rather than decreases vascular permeability', 'the printed option states the kallikrein-dependent precursor mechanism', 'factor XII activates the kinin pathway but is not another name for bradykinin'] },
  { ref: 'Q10', concept: 'angiogenesis', page: 2, stem: 'Angiogenesis means:', key: 'A', options: ['Formation of new blood vessels', 'Formation of collagen', 'Formation of inflammatory exudate', 'Formation of tumor'], clue: 'the term specifically names new vessel formation', reasons: ['formation of new blood vessels is the definition of angiogenesis', 'collagen formation is fibrosis, not angiogenesis', 'inflammatory exudate forms through vascular leakage rather than new-vessel growth', 'tumours may induce angiogenesis but tumour formation is not the definition'] },
  { ref: 'Q11', concept: 'acute-characteristics', page: 2, stem: 'Acute inflammation is characterized by except :', key: 'D', options: ['Rapid onset', 'Short duration', 'Exudative', 'Fibrosis'], clue: 'fibrosis belongs to healing and chronic inflammation rather than the defining acute pattern', reasons: ['rapid onset is characteristic of acute inflammation', 'short duration is characteristic of acute inflammation', 'exudation is a defining acute vascular response', 'fibrosis is the exception because it reflects repair or chronic inflammation'] },
  { ref: 'Q12', concept: 'bradykinin-pain', page: 3, stem: 'Pain in acute inflammation is mediated by:', key: 'A', options: ['Bradykinin', 'Histamine', 'C3a', 'Leukotrienes', 'Oxygen radicals'], clue: 'bradykinin is the source-keyed mediator of inflammatory pain', reasons: ['bradykinin stimulates pain during acute inflammation', 'histamine mainly promotes vasodilatation and increased permeability', 'C3a is an anaphylatoxin rather than the main pain mediator here', 'leukotrienes regulate permeability, bronchospasm or chemotaxis depending on subtype', 'oxygen radicals contribute to killing and tissue injury rather than serving as the keyed pain mediator'] },
  { ref: 'Q14', concept: 'acute-characteristics', page: 3, stem: 'As regards acute inflammation which of the followings is correct:', key: 'C', options: ['Delayed onset', 'Associated with repair', 'Exudative', 'Caused by weak irritant', 'Predominant cells are lymphocytes'], clue: 'the acute inflammatory reaction is rapid and exudative', reasons: ['delayed onset describes a slower chronic pattern', 'repair may follow inflammation but is not the defining acute characteristic in this option set', 'exudative is the correct acute characteristic', 'weak persistent irritants more often sustain chronic inflammation', 'lymphocytes predominate in many chronic rather than early acute reactions'] },
  { ref: 'Q15', concept: 'neutrophil-first48', page: 3, stem: 'Which of the following are predominant in the 1st 48 hours in acute inflammation:', key: 'A', options: ['Neutrophils', 'Macrophages', 'Lymphocytes', 'Plasma cells', 'RBCs'], clue: 'neutrophils dominate the early acute cellular exudate', reasons: ['neutrophils are the predominant cells during the first 48 hours', 'macrophages become prominent later and in chronic inflammation', 'lymphocytes are more characteristic of chronic or immune responses', 'plasma cells are antibody-producing chronic inflammatory cells', 'red blood cells may escape damaged vessels but are not the predominant inflammatory cell'] },
  { ref: 'Q16', concept: 'phagocytosis-definition', page: 3, stem: 'The process of engulfment of particulate material by the cell is called:', key: 'C', options: ['Diapedesis', 'Phagosome', 'Phagocytosis', 'Chemotaxis', 'Migration'], clue: 'the named process is cellular ingestion of particulate matter', reasons: ['diapedesis is passage of leukocytes through a vessel wall', 'a phagosome is the intracellular vesicle formed after engulfment', 'phagocytosis is the process of engulfing particulate material', 'chemotaxis is directed cell movement along a chemical gradient', 'migration is general movement and does not name particle engulfment'] },
]

for (const question of questions) {
  const concept = byHandle[question.concept]
  question.id = `Q-HU102-PAT-INF-F8-${question.ref}`
  question.asmCit = `CIT-HU102-F8P1-${question.ref}-ASM`
  question.article = concept.article
}

const sourceRows = `# Item
## id
${assessment}
## title
Inflammation pathology MCQ bank with inline printed keys
## institution
Helwan BMS-102 local corpus; visible institutional attribution absent
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
Local assessment-labelled material held for internal authoring only; no page image is redistributed.
## qualification
Tier-3 local pathology study bank with 68 numbered MCQs and 68 visibly printed inline single-letter keys. It has no authenticated sitting, marks, candidate field or official-key designation; printed keys remain auxiliary assessment evidence only.
## is_assessment
yes

---

# Item
## id
${lecture1}
## title
Inflammation 1 — Helwan BMS-102 pathology lecture
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 5 - Inflammation 1/Inflammation-lecture-1.pdf
## media_type
application/pdf
## languages
en
## page_count
37
## sha256
eaea111707b57559a9042fc7c7fcd737cfbf326a5bf28fba026252566575fdc7
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary, Lecturer of Pathology, Faculty of Medicine, Helwan University. It supplies local curriculum teaching, not an assessment sitting or official answer key.
## is_assessment
no

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
${concept.article === sequenceArticle ? mediatorArticle : sequenceArticle}
## related_concept_ids
${concepts.filter((other) => other.handle !== concept.handle && other.article === concept.article).map((other) => other.id).join('\n')}
## resource_ids
${concept.teachSource}
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

const explain = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. Matching the event sequence, mediator action, morphologic site or cell behaviour makes the printed key reproducible. This record remains Draft pending review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative represents a different step, mediator function, inflammatory pattern or cell process. Keeping those discriminators separate prevents a superficial word match.`
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
Inflammation
## difficulty
${['Q01', 'Q02', 'Q03', 'Q04', 'Q05', 'Q08', 'Q14'].includes(question.ref) ? 'Moderate' : 'Easy'}
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
0.61
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
${['Q01', 'Q02', 'Q03', 'Q04', 'Q05', 'Q08', 'Q14'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q01', 'Q02', 'Q03', 'Q04', 'Q05', 'Q08', 'Q14'].includes(question.ref) ? 60 : 45}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${assessment}
${concept.teachSource}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${question.page}, Family-8 ${question.ref}: exact stem, lettered option order and visibly printed inline answer ${question.options['ABCDE'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching support: ${concept.teachSource}, PDF p${concept.teachPage}.
## attachments

## attached_image

## author_notes
Exact source wording and lettered option order are preserved, including source spelling. No official sitting, marks, recurrence or candidate response is inferred.
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
Inflammation
## microtopic
${id === sequenceArticle ? 'Acute-inflammatory sequence and cells' : 'Inflammatory mediators and patterns'}
## nanotopic
Vascular events, mediators, exudate and phagocytosis
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
10
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
HU-BMS-102 > Pathology > Inflammation > ${id === sequenceArticle ? 'Acute sequence and cellular response' : 'Mediators and morphologic patterns'}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; governed Helwan lectures supply curriculum support and the Family-8 bank supplies exact auxiliary printed-key evidence without official-exam authority.
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

const sequenceConcepts = concepts.filter((concept) => concept.article === sequenceArticle)
const mediatorConcepts = concepts.filter((concept) => concept.article === mediatorArticle)
const articles = [
  articleRow({ id: sequenceArticle, title: 'Acute inflammation: vascular sequence, exudation and early leukocyte response', aliases: ['Acute inflammatory sequence', 'Early inflammatory cells and phagocytosis'], subset: sequenceConcepts, other: mediatorArticle,
    summary: 'Acute inflammation is a rapid exudative response. Permeability and fluid escape produce haemoconcentration and slowing before leukocyte emigration; neutrophils dominate the first 48 hours and then engulf particles by phagocytosis.',
    sections: `### Definition\n${byHandle['acute-characteristics'].display}\n\n### Mechanism\n${byHandle['vascular-sequence'].display} Fluid loss from vessels concentrates blood cells, encourages slowing and margination, and prepares leukocytes to cross the wall.\n\n### Key determinants\n${byHandle['neutrophil-first48'].display} ${byHandle['phagocytosis-definition'].display}\n\n### Clinical significance\nSequence questions should be solved by separating vascular events from later cellular events. Emigration precedes tissue chemotaxis and phagocytosis, while fibrosis signals repair or chronicity rather than the defining acute phase.`,
    loses: ['Putting phagocytosis inside the vascular-event sequence.', 'Calling fibrosis a defining feature of acute inflammation.', 'Selecting macrophages or lymphocytes for the first 48-hour predominance.'], notes: 'Family-8 Q17 and Q60 are excluded from this slice because their printed keys or scope labels are explicitly held as questionable.', sources: [lecture1, assessment], basis: 'Helwan Inflammation 1 lecture p12, p16, p23, p31 and p36 supplies local teaching; Family-8 p1–3 supplies exact inline keys.' }),
  articleRow({ id: mediatorArticle, title: 'Inflammatory mediators and patterns: chemotaxis, bradykinin, serofibrinous exudate and carbuncle', aliases: ['Acute inflammation mediators', 'Morphologic inflammation patterns'], subset: mediatorConcepts, other: sequenceArticle,
    summary: 'Mediator questions become manageable when each chemical is tied to one dominant action. C5a and LTB4 drive chemotaxis, kallikrein generates bradykinin and bradykinin mediates pain; morphology then distinguishes serofibrinous serosal inflammation and the clustered abscesses of a carbuncle.',
    sections: `### Definition\n${byHandle.angiogenesis.display} ${byHandle.carbuncle.display}\n\n### Mechanism\n${byHandle['c5a-ltb4'].display} ${byHandle['bradykinin-formation'].display} ${byHandle['bradykinin-pain'].display}\n\n### Key determinants\n${byHandle['serofibrinous-exception'].display} The anatomic surface distinguishes it from catarrhal and membranous mucosal patterns.\n\n### Clinical significance\nA multiloculated hot red neck lesion in diabetes points to a carbuncle. In mediator matching, identify the action first: chemotaxis selects C5a/LTB4, pain selects bradykinin, and the kinin pathway selects kallikrein.`,
    loses: ['Pairing histamine with phagocytosis or opsonin with fever.', 'Calling serofibrinous inflammation a mucosal pattern.', 'Using angiogenesis as a synonym for collagen or tumour formation.'], notes: 'Assessment wording is preserved exactly, including the source spellings hv and kallikrien; explanations use standard spellings without altering the prompt.', sources: [lecture1, lecture2, assessment], basis: 'Helwan Inflammation 1 p16 and p33 plus Inflammation 2 p14, p21 and p36 supplies local teaching; Family-8 p1–3 supplies exact inline keys.' }),
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
${[concept.currCit, ...conceptAsmCitations(concept)].join('\n')}`

const relationDefs = [
  ['acute-characteristics', 'associated_with', 'vascular-sequence', 'the rapid exudative response unfolds through the ordered vascular sequence'],
  ['vascular-sequence', 'associated_with', 'neutrophil-first48', 'vascular events permit the early neutrophil-rich cellular exudate'],
  ['neutrophil-first48', 'associated_with', 'phagocytosis-definition', 'early neutrophils ingest microbes and debris'],
  ['c5a-ltb4', 'associated_with', 'vascular-sequence', 'chemotaxis follows leukocyte emigration from the vascular compartment'],
  ['bradykinin-formation', 'associated_with', 'bradykinin-pain', 'kallikrein-generated bradykinin produces inflammatory pain'],
  ['serofibrinous-exception', 'contrasts_with', 'acute-characteristics', 'serofibrinous is a specific serosal morphologic pattern within acute inflammation'],
  ['carbuncle', 'associated_with', 'acute-characteristics', 'a carbuncle is an acute suppurative inflammatory lesion'],
  ['angiogenesis', 'contrasts_with', 'acute-characteristics', 'angiogenesis belongs to healing and chronic repair rather than the defining acute response'],
  ['carbuncle', 'contrasts_with', 'serofibrinous-exception', 'carbuncle is purulent and localized while serofibrinous inflammation is a fibrin-rich serosal pattern'],
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
  ['evidence/HU-BMS-102-pathology-family8-part1-sources.md', sourceRows],
  ['concept/HU-BMS-102-pathology-family8-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family8-part1-articles.md', articles],
  ['question/HU-BMS-102-pathology-family8-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part1-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family8-part1-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '8-part1', refs: questions.map((question) => `F8-${question.ref}`), released: { sources: 3, articles: 2, concepts: concepts.length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, remainingRetained: 50, remainingRoutine: 45, exclusions: { wordingRepeats: ['F8-Q18', 'F8-Q33', 'F8-Q34', 'F8-Q50', 'F8-Q51', 'F8-Q52'] }, holds: { questionableKeys: ['F8-Q17', 'F8-Q49', 'F8-Q56', 'F8-Q60', 'F8-Q68'], family7QuestionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
