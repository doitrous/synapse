import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_6050cec97addd49101a3'
const lecture2 = 'src_949c1820aea58bded856'
const revision = 'src_165dec8b80c5561564ec'
const granulomaArticle = 'ART-HU-BMS102-PAT-F8P4-GRANULOMA-PATHOGENESIS'
const macrophageArticle = 'ART-HU-BMS102-PAT-F8P4-MACROPHAGE-CHRONICITY'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  { handle: 'granuloma-differential', key: 'pathology.inflammation.granulomatous-differential-furunculosis-exception', label: 'Furunculosis is suppurative rather than granulomatous inflammation', aliases: ['Granulomatous inflammation exception', 'Furunculosis classification'], definition: 'Furunculosis consists of recurrent or multiple furuncles, which are staphylococcal localized suppurative lesions. It is therefore the non-granulomatous choice among granulomatous conditions such as sarcoidosis, Crohn disease and selected chronic infections.', objective: 'Exclude furunculosis from a list of granulomatous inflammatory diseases.', pitfalls: 'Choosing a true granulomatous condition because its cause is infective or immune mediated, instead of recognizing the pus-forming furuncle pattern.', type: 'differential', micro: 'Granulomatous inflammation', nano: 'Differential exception', article: granulomaArticle, subject: 'Furunculosis', predicate: 'is', object: 'suppurative rather than granulomatous inflammation', display: 'Furunculosis is suppurative rather than granulomatous inflammation.', teachSource: revision, teachPage: 7, teachText: 'The revision handout classifies furuncle among acute localized suppurative lesions caused by staphylococci.' },
  { handle: 'epithelioid-origin', reuseId: 'CON-INF-85797BAAB95539', reuseKey: 'pathology.granuloma.epithelioid-cell-macrophage-origin', reuseLabel: 'Epithelioid cells in a tuberculous granuloma are transformed macrophages', objective: 'Identify macrophages or histiocytes as the origin of epithelioid cells.', micro: 'Granulomatous inflammation', nano: 'Epithelioid-cell origin', article: granulomaArticle, subject: 'Epithelioid cells', predicate: 'are transformed from', object: 'macrophages', display: 'Epithelioid cells are transformed macrophages.', teachSource: lecture2, teachPage: 40, teachText: 'Granuloma contains focal accumulations of modified macrophages called epithelioid cells.' },
  { handle: 'macrophage-apc', reuseId: 'CON-HEM-681584C9DC1F94', reuseKey: 'macrophage-and-t-helper-start-both-immune-responses', reuseLabel: 'Both immune responses start with a macrophage presenting antigen to a helper T cell', externalFull: true, key: 'macrophage-and-t-helper-start-both-immune-responses', label: 'Both immune responses start with a macrophage presenting antigen to a helper T cell', aliases: ['Macrophage antigen presentation', 'Macrophage-helper T-cell initiation'], definition: 'Cell-mediated and humoral immune responses share an opening step: a macrophage phagocytoses and presents antigen, and a helper T cell recognizes the presented antigen and becomes activated.', pitfalls: 'Choosing the antibody-producing plasma cell or an acute granulocyte as the initiating antigen-presenting cell in this source comparison.', type: 'mechanism', baseSubject: 'haem', basePrimary: 'DIS-HIS-T02', baseSecondary: 'SYS-HEM-T01-S01-M02\nSYS-INF', baseUniversities: 'hu', baseModules: 'HU-BMS-102', baseArticle: 'ART-101-HIS-NON-GRANULAR-LEUKOCYTES', objective: 'Identify macrophage as the source-keyed antigen-presenting cell.', micro: 'Macrophage functions', nano: 'Antigen presentation', article: macrophageArticle, subject: 'Macrophages', predicate: 'perform', object: 'antigen presentation to the immune system', display: 'Macrophages perform antigen presentation to the immune system.', teachSource: revision, teachPage: 8, teachText: 'The revision handout identifies antigen presentation by macrophages.' },
  { handle: 'type-iv', key: 'pathology.inflammation.granuloma-type-four-hypersensitivity', label: 'Granuloma pathogenesis is related to type IV hypersensitivity', aliases: ['Granuloma delayed hypersensitivity', 'Type IV granulomatous response'], definition: 'Immune-mediated granuloma formation is a delayed, type IV hypersensitivity response in which T-cell cytokines activate macrophages and sustain their transformation into epithelioid cells and giant cells.', objective: 'Associate granuloma pathogenesis with type IV hypersensitivity.', pitfalls: 'Selecting immediate type I, antibody-mediated type II or immune-complex type III hypersensitivity.', type: 'mechanism', micro: 'Granulomatous inflammation', nano: 'Type IV mechanism', article: granulomaArticle, subject: 'Granuloma pathogenesis', predicate: 'is related to', object: 'type IV hypersensitivity', display: 'Granuloma pathogenesis is related to type IV hypersensitivity.', teachSource: revision, teachPage: 8, teachText: 'The handout states that granuloma pathogenesis is a delayed type 4 hypersensitivity reaction.' },
  { handle: 'first-step', key: 'pathology.inflammation.granuloma-pathogenesis-antigen-presentation-first-step', label: 'Antigen presentation by macrophages is the first step in granuloma pathogenesis', aliases: ['First step of granuloma formation', 'Granuloma antigen presentation'], definition: 'Granuloma pathogenesis begins when a macrophage processes and presents a persistent antigen to T lymphocytes. Subsequent cytokine signaling activates and aggregates macrophages, followed by epithelioid and giant-cell formation.', objective: 'Identify antigen presentation as the first step in granuloma pathogenesis.', pitfalls: 'Choosing fibrosis, giant-cell formation, mediator release or antibody secretion, all of which occur later or belong to another immune pathway.', type: 'sequence', micro: 'Granulomatous inflammation', nano: 'First pathogenic step', article: granulomaArticle, subject: 'Antigen presentation by macrophages', predicate: 'is', object: 'the first step in granuloma pathogenesis', display: 'Antigen presentation by macrophages is the first step in granuloma pathogenesis.', teachSource: revision, teachPage: 8, teachText: 'Antigen presentation by macrophages is the first step in pathogenesis of granuloma.' },
  { handle: 'macrophage-phagocyte', reuseId: 'CON-HEM-157B01DD5EAEB6', reuseKey: 'reticuloendothelialsystem.function.defence', reuseLabel: "The reticulo-endothelial system is the body's tissue-macrophage network, and its defence is phagocytosis", externalFull: true, key: 'reticuloendothelialsystem.function.defence', label: "The reticulo-endothelial system is the body's tissue-macrophage network, and its defence is phagocytosis", aliases: ['Mononuclear phagocyte system', 'Tissue macrophage network'], definition: 'The reticulo-endothelial or mononuclear phagocyte system is a diffuse tissue-macrophage network. Its defensive role is phagocytosis of particulate matter, spent cells and microorganisms from blood and tissues.', pitfalls: 'Choosing a lymphocyte, plasma cell, basophil or platelet when the question asks for a professional tissue phagocyte.', type: 'definition', baseSubject: 'imm', basePrimary: 'SYS-IMM-T01-S01-M03', baseSecondary: 'SYS-HEM-T01-S01-M02\nSYS-INF', baseUniversities: 'hu', baseModules: 'HU-BMS-102', baseArticle: 'ART-HEM-AU103-LYMPHOID-ORGANS', objective: 'Identify macrophage as a phagocytic cell.', micro: 'Macrophage functions', nano: 'Phagocytosis', article: macrophageArticle, subject: 'Macrophages', predicate: 'act as', object: 'phagocytic cells', display: 'Macrophages act as phagocytic cells.', teachSource: revision, teachPage: 8, teachText: 'The revision handout lists macrophages among phagocytic cells.' },
  { handle: 'fibroblast-chronicity', key: 'pathology.inflammation.fibroblast-proliferation-evidence-chronicity', label: 'Fibroblastic proliferation is reliable evidence of chronic inflammation', aliases: ['Fibroblast chronicity marker', 'Fibrosis and inflammatory chronicity'], definition: 'Fibroblast proliferation reflects the repair and matrix-deposition component of a prolonged inflammatory process. It is more reliable evidence of chronicity than nonspecific vascular dilation, swelling, macrophages or necrosis alone.', objective: 'Identify fibroblastic proliferation as the most reliable evidence of inflammatory chronicity.', pitfalls: 'Choosing a finding that can occur acutely, such as dilated vessels, swelling, macrophages or necrosis.', type: 'diagnostic_principle', micro: 'Chronic inflammation', nano: 'Evidence of chronicity', article: macrophageArticle, subject: 'Fibroblastic proliferation', predicate: 'is', object: 'reliable evidence of inflammatory chronicity', display: 'Fibroblastic proliferation is reliable evidence of inflammatory chronicity.', teachSource: revision, teachPage: 8, teachText: 'The handout links chronic inflammation with repair and fibrosis and calls fibrosis the most reliable evidence of chronicity.' },
  { handle: 'granuloma-main', reuseId: 'CON-INF-8E6B301C3A6AE7', reuseKey: 'pathology.inflammation.granuloma-main-epithelioid-macrophage', reuseLabel: 'Epithelioid macrophages are the defining main cells of a granuloma', objective: 'Identify macrophages and epithelioid cells as the most important cells in a granuloma.', micro: 'Granulomatous inflammation', nano: 'Main cell', article: granulomaArticle, subject: 'Macrophages and epithelioid cells', predicate: 'are', object: 'the most important cells in granuloma', display: 'Macrophages and epithelioid cells are the most important cells in granuloma.', teachSource: lecture2, teachPage: 40, teachText: 'Granuloma is characterized by focal accumulation of many modified macrophages called epithelioid cells.' },
  { handle: 'sarcoid', reuseId: 'CON-INF-F4F4AF6260F57B', reuseKey: 'pathology.inflammation.sarcoidosis-noninfective-unknown-cause-granuloma', reuseLabel: 'Sarcoidosis is a noninfective granulomatous disease of unknown cause', objective: 'Classify sarcoidosis as a granuloma of unknown cause.', micro: 'Granulomatous inflammation', nano: 'Sarcoidosis classification', article: granulomaArticle, subject: 'Sarcoidosis', predicate: 'is', object: 'a granuloma of unknown cause', display: 'Sarcoidosis is a granuloma of unknown cause.', teachSource: lecture2, teachPage: 40, teachText: 'The Helwan lecture places sarcoidosis under granulomas of unknown cause.' },
  { handle: 'macrophage-functions', key: 'pathology.inflammation.macrophage-functions-pus-formation-exception', label: 'Pus formation is not a macrophage function', aliases: ['Macrophage function exception', 'Pus formation and neutrophils'], definition: 'Macrophages phagocytose bacteria, present antigen, release cytokines and can fuse to form giant cells. Pus is produced chiefly by tissue necrosis and abundant neutrophils, so pus formation is not a macrophage function.', objective: 'Exclude pus formation from the functions of macrophages.', pitfalls: 'Rejecting a genuine macrophage function such as phagocytosis, antigen presentation, cytokine release or giant-cell formation.', type: 'comparison', micro: 'Macrophage functions', nano: 'Pus exception', article: macrophageArticle, subject: 'Pus formation', predicate: 'is not', object: 'a macrophage function', display: 'Pus formation is not a macrophage function.', teachSource: revision, teachPage: 8, teachText: 'The handout lists antigen presentation, phagocytosis and giant-cell formation as macrophage activities; its suppurative section assigns pus cells to dead neutrophils.' },
]

for (const concept of concepts) {
  concept.id = concept.reuseId ?? idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F8P4-${token}-01`
  concept.currCit = `CIT-HU102-F8P4-${token}-CURR`
  concept.span = `SPN-HU102-F8P4-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q06', concept: 'granuloma-differential', page: 2, stem: 'All the following are granulomatous inflammation except:', key: 'C', options: ['Actinomycosis', 'Sarcoidosis', 'Furunculosis', 'Crohn’s disease', 'Rheumatic fever'], clue: 'furunculosis is composed of pus-forming furuncles rather than granulomas', reasons: ['actinomycosis may produce suppurative granulomatous inflammation', 'sarcoidosis is a noninfective granulomatous disease', 'furunculosis is acute localized suppuration and is the exception', 'Crohn’s disease is an immune-mediated granulomatous condition', 'the source classifies rheumatic fever within its noninfective granuloma list'] },
  { ref: 'Q07', concept: 'epithelioid-origin', page: 2, stem: 'The histopathologist reported the presence of epitheloid cells in a LN from a patient with TB. Epitheloid cells are transformed from:', key: 'D', options: ['Epithelial cells', 'Eosinophils', 'Lymphocytes', 'Macrophages', 'Neutrophils'], clue: 'epithelioid cells are activated modified macrophages despite their epithelial-like name', reasons: ['epithelial cells are a misleading name match', 'eosinophils participate in allergic and parasitic inflammation', 'lymphocytes regulate granuloma formation but do not transform into epithelioid cells', 'macrophages transform into epithelioid cells', 'neutrophils dominate acute suppuration'] },
  { ref: 'Q38', concept: 'macrophage-apc', page: 8, stem: 'The main cell responsible for antigen presentation to immune system is:', key: 'C', options: ['B lymphocytes', 'Plasma cells', 'Macrophage', 'Eosinophils', 'Neutrophils'], clue: 'the source identifies macrophage as the principal listed antigen-presenting cell', reasons: ['B lymphocytes can present antigen but are not the source-keyed main cell in this comparison', 'plasma cells secrete antibody', 'macrophage is the keyed antigen-presenting cell', 'eosinophils are effector cells in allergic and parasitic inflammation', 'neutrophils are acute phagocytes rather than the keyed antigen-presenting cell'] },
  { ref: 'Q42', concept: 'type-iv', page: 8, stem: 'Which one of the followings describes granuloma:', key: 'D', options: ['Type I Hypersensitivity reaction', 'Type II Hypersensitivity reaction', 'Type III Hypersensitivity reaction', 'Type IV hypersensitivity reaction', 'Not a hypersensitivity reaction'], clue: 'immune-mediated granuloma formation is a delayed type IV hypersensitivity response', reasons: ['type I is immediate IgE-mediated hypersensitivity', 'type II is antibody-mediated injury to cells or matrix', 'type III is immune-complex-mediated injury', 'type IV is T-cell-mediated delayed hypersensitivity and fits granuloma', 'the source explicitly relates granuloma to a hypersensitivity mechanism'] },
  { ref: 'Q44', concept: 'first-step', page: 9, stem: 'What is the first step in the pathogenesis of granuloma:', key: 'A', options: ['Antigen presentation', 'Fibrosis', 'Formation of giant cells', 'Release of chemical mediators', 'Secretion of antibodies'], clue: 'macrophage antigen presentation initiates the T-cell response before later organization and fibrosis', reasons: ['antigen presentation is the initiating step', 'fibrosis is a later repair response', 'giant cells form after macrophage activation and fusion', 'mediator release follows cellular activation', 'antibody secretion belongs to the humoral response and is not the initiating step here'] },
  { ref: 'Q46', concept: 'macrophage-phagocyte', page: 9, stem: 'Which of the following cells can act as a phagocytic cell:', key: 'C', options: ['T lymphocyte', 'Plasma cells', 'Macrophage', 'Basophils', 'Platelets'], clue: 'macrophages are professional tissue phagocytes', reasons: ['T lymphocytes coordinate adaptive immunity but are not professional phagocytes', 'plasma cells produce antibodies', 'macrophages ingest microbes and debris', 'basophils release inflammatory mediators', 'platelets mediate hemostasis'] },
  { ref: 'Q47', concept: 'fibroblast-chronicity', page: 9, stem: 'What is the most reliable evidence of chronicity in an inflammatory process:', key: 'C', options: ['Dilated blood vessels', 'Swelling', 'Fibroblastic proliferation', 'Macrophages', 'Necrosis'], clue: 'fibroblast proliferation reflects sustained repair and matrix deposition', reasons: ['vascular dilation also occurs acutely', 'swelling is common in acute inflammation', 'fibroblastic proliferation provides reliable evidence of chronic repair', 'macrophages may appear early and are less specific alone', 'necrosis can occur in acute or chronic injury'] },
  { ref: 'Q48', concept: 'macrophage-apc', page: 9, stem: 'The main cell responsible for antigen presentation to the immune system is:', key: 'C', options: ['B lymphocytes', 'Eosinophils', 'Macrophages', 'Neutrophils', 'Plasma cells'], clue: 'macrophage is the source-keyed principal antigen-presenting cell among these options', reasons: ['B lymphocytes can present antigen but are not the keyed main cell here', 'eosinophils are granulocyte effectors', 'macrophages are the keyed antigen-presenting cells', 'neutrophils primarily phagocytose during acute inflammation', 'plasma cells secrete immunoglobulin'] },
  { ref: 'Q54', concept: 'granuloma-main', page: 10, stem: 'The most important cell in granuloma is', key: 'B', options: ['Neutrophils', 'Macrophages (and epitheloid cells )', 'Lymphocytes', 'All of the above'], clue: 'granuloma is organized around modified macrophages called epithelioid cells', reasons: ['neutrophils indicate acute suppuration rather than the central granuloma cell', 'macrophages and epithelioid cells are the source-keyed main cells', 'lymphocytes surround and regulate the lesion but are not its defining main cell', 'all of the above is wrong because neutrophils are not the defining granuloma cell'] },
  { ref: 'Q55', concept: 'sarcoid', page: 10, stem: 'Sarcoidosis is an example of:', key: 'D', options: ['Infective granuloma', 'Allergic granuloma', 'Foreign body granuloma', 'Granuloma of unknown cause', 'None of the above'], clue: 'the Helwan classification places sarcoidosis in the unknown-cause granuloma group', reasons: ['sarcoidosis is not classified as infective', 'allergic granuloma is a different source category', 'sarcoidosis is not a foreign-body reaction', 'granuloma of unknown cause is the source classification', 'a listed classification fits, so none of the above is incorrect'] },
  { ref: 'Q57', concept: 'macrophage-functions', page: 11, stem: 'The following are functions of macrophages except:', key: 'C', options: ['Phagocytosis of bacteria', 'Antigen presentation', 'Pus formation', 'Fuse and dorm giant cells', 'Release cytokines'], clue: 'pus is dominated by dead neutrophils, whereas the other choices are macrophage activities', reasons: ['macrophages phagocytose bacteria', 'macrophages present antigen', 'pus formation is not a macrophage function and is the exception', 'the source spelling is preserved; macrophages fuse and form giant cells', 'activated macrophages release cytokines'] },
  { ref: 'Q58', concept: 'type-iv', page: 11, stem: 'The pathogenesis of granuloma is related to:', key: 'D', options: ['Type I hypersensitivity', 'Type II hypersensitivity', 'Type III hypersensitivity', 'Type IV hypersensitivity', 'Any of the above'], clue: 'granuloma formation is linked to delayed T-cell-mediated type IV hypersensitivity', reasons: ['type I is immediate and IgE-mediated', 'type II is antibody-mediated', 'type III is immune-complex-mediated', 'type IV is the granulomatous delayed response', 'the source specifies type IV rather than any type'] },
]

for (const question of questions) {
  question.id = `Q-HU102-PAT-INF-F8-${question.ref}`
  question.asmCit = `CIT-HU102-F8P4-${question.ref}-ASM`
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
no

---

# Item
## id
${revision}
## title
Mid-term Collections — Dr Ahmed Hassan pathology revision handout
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Notes and Summaries/تجميعات حلوان امتحان الميد ترم.pdf
## media_type
application/pdf
## languages
en
## page_count
18
## sha256
165dec8b80c5561564ec084c025bd64532f8a85a355a9b23d20b6ab4eba10c2a
## processing_status
pending
## rights
Local revision material held for internal authoring only; no page image is redistributed.
## qualification
Tier-6 pathology revision handout visibly titled Mid-term Collections and carrying a Dr Ahmed Hassan footer. No university, module, academic year, sitting, marks, candidate direction or official-key marker is printed; folder placement supplies Helwan BMS-102 routing only.
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
${concept.baseSubject ?? 'fnd'}
## primary_node_id
${concept.basePrimary ?? 'SYS-INF'}
## secondary_node_ids
${concept.baseSecondary ?? 'DIS-PAT-T02'}
## learner_years
1
## universities
${concept.baseUniversities ?? 'hu'}
## modules
${concept.baseModules ?? 'HU-BMS-102'}
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${concept.micro}
## article_ids
${concept.baseArticle ? `${concept.baseArticle}\n` : ''}${concept.article}
## related_article_ids
${concept.article === granulomaArticle ? macrophageArticle : granulomaArticle}${concept.baseArticle ? `\n${concept.baseArticle}` : ''}
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
0.93
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
+${concept.teachSource}
${assessment}`

const explanation = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. This preserves the printed key while distinguishing cell lineage, immune mechanism and lesion class. The record remains Draft pending review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative belongs to another inflammatory cell, hypersensitivity mechanism or stage of granuloma formation. Keeping those scopes separate prevents a superficial word match.`
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
${['Q06', 'Q38', 'Q42', 'Q44', 'Q47', 'Q54', 'Q57', 'Q58'].includes(question.ref) ? 'Moderate' : 'Easy'}
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
${['Q06', 'Q38', 'Q42', 'Q44', 'Q47', 'Q54', 'Q57', 'Q58'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q06', 'Q38', 'Q42', 'Q44', 'Q47', 'Q54', 'Q57', 'Q58'].includes(question.ref) ? 60 : 45}
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
Exact source wording and option order are preserved, including spelling. No official sitting, marks, recurrence or candidate response is inferred.${concept.reuseId ? ' This row reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
75
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, other, summary, sections, loses, sources, basis }) => `# Item
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
${id === granulomaArticle ? 'Granuloma pathogenesis and classification' : 'Macrophage functions and chronicity'}
## nanotopic
Macrophages, granulomas and chronic repair
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
${subset.flatMap(questionIds).join('\n')}
## resource_ids
${sources.join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${id === granulomaArticle ? 'Granulomatous inflammation' : 'Macrophages and chronic inflammation'}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; governed Helwan teaching supplies curriculum support and the Family-8 bank supplies exact auxiliary printed-key evidence without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${[concept.currCit, ...assessmentCitations(concept)].join(', ')}\nSpan: ${concept.span}`).join('\n\n')}
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
Independent medical verification and Helwan faculty review remain required before publication. Neither the keyed study bank nor the revision handout authenticates an official sitting or official key.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Exact source wording is retained in the linked questions; article prose standardizes terminology without changing printed keys.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for the tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const granulomaConcepts = concepts.filter((concept) => concept.article === granulomaArticle)
const macrophageConcepts = concepts.filter((concept) => concept.article === macrophageArticle)
const articles = [
  articleRow({ id: granulomaArticle, title: 'Granuloma pathogenesis: antigen presentation, type IV response and macrophage transformation', aliases: ['Granuloma formation and classification', 'Granulomatous inflammation mechanism'], subset: granulomaConcepts, other: macrophageArticle,
    summary: 'Granuloma formation begins with macrophage antigen presentation and proceeds through a type IV T-cell response that activates macrophages. Modified macrophages become epithelioid cells, which are the lesion’s main cells; sarcoidosis is an unknown-cause granuloma, whereas furunculosis is suppurative rather than granulomatous.',
    sections: `### Definition\n${byHandle['granuloma-main'].display} ${byHandle['epithelioid-origin'].display}\n\n### Mechanism\n${byHandle['first-step'].display} ${byHandle['type-iv'].display}\n\n### Key determinants\n${byHandle.sarcoid.display} ${byHandle['granuloma-differential'].display}\n\n### Clinical significance\nRecognizing the macrophage lineage links antigen presentation, epithelioid transformation and granuloma structure while separating chronic granulomas from acute pus-forming lesions.`,
    loses: ['Choosing fibrosis or giant-cell formation as the first pathogenic step.', 'Confusing immediate or antibody-mediated hypersensitivity with the delayed type IV response.', 'Calling furunculosis granulomatous because another infective lesion in the options is granulomatous.'], sources: [lecture2, revision, assessment], basis: 'Helwan Inflammation 2 p40 and the governed revision handout p7–8 supply teaching; Family-8 p2 and p8–11 supplies exact inline keys.' }),
  articleRow({ id: macrophageArticle, title: 'Macrophage functions and evidence of inflammatory chronicity', aliases: ['Macrophage roles in chronic inflammation', 'Phagocytosis, antigen presentation and fibrosis'], subset: macrophageConcepts, other: granulomaArticle,
    summary: 'Macrophages phagocytose, present antigen, release cytokines and can fuse into giant cells. Pus formation belongs to neutrophil-rich suppuration, not to macrophages; fibroblastic proliferation indicates sustained repair and is reliable evidence of inflammatory chronicity.',
    sections: `### Definition\n${byHandle['macrophage-phagocyte'].display} ${byHandle['macrophage-apc'].display}\n\n### Mechanism\nActivated macrophages ingest microbes, present antigen and release cytokines; persistent activation can lead to giant-cell formation.\n\n### Key determinants\n${byHandle['macrophage-functions'].display} Pus cells are predominantly dead neutrophils.\n\n### Clinical significance\n${byHandle['fibroblast-chronicity'].display} Fibroblast proliferation records sustained repair rather than a transient acute vascular response.`,
    loses: ['Calling plasma cells or granulocytes the source-keyed main antigen-presenting cell.', 'Assigning pus formation to macrophages.', 'Using swelling, vessel dilation or necrosis alone as the most reliable chronicity marker.'], sources: [revision, assessment], basis: 'The governed revision handout p7–8 supplies teaching; Family-8 p8–11 supplies exact inline keys.' }),
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
0.92
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: governed Helwan teaching plus auxiliary printed answer`

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
PDF p${concept.teachPage}, governed Helwan teaching source
## context_note
Local curriculum or revision support only; independent medical verification remains required.
## confidence
0.93
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
  ['first-step', 'associated_with', 'macrophage-apc', 'macrophage antigen presentation initiates the granulomatous immune response'],
  ['first-step', 'associated_with', 'type-iv', 'antigen presentation precedes the delayed type IV response'],
  ['type-iv', 'associated_with', 'epithelioid-origin', 'T-cell cytokines activate macrophages that become epithelioid cells'],
  ['epithelioid-origin', 'associated_with', 'granuloma-main', 'macrophage-derived epithelioid cells are the main granuloma cells'],
  ['sarcoid', 'associated_with', 'granuloma-main', 'sarcoidosis is an unknown-cause epithelioid-cell granuloma'],
  ['granuloma-differential', 'contrasts_with', 'granuloma-main', 'furunculosis is suppurative rather than an epithelioid-cell granuloma'],
  ['macrophage-phagocyte', 'associated_with', 'macrophage-apc', 'phagocytosis and antigen presentation are macrophage functions'],
  ['macrophage-functions', 'contrasts_with', 'macrophage-phagocyte', 'pus formation is excluded while phagocytosis is retained'],
  ['fibroblast-chronicity', 'associated_with', 'granuloma-main', 'fibroblasts at the granuloma edge reflect chronic repair'],
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
0.86
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Pathology faculty`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family8-part4-sources.md', sourceRows],
  ['article/HU-BMS-102-pathology-family8-part4-articles.md', articles],
  ['concept/HU-BMS-102-pathology-family8-part4-concepts.md', concepts.map((concept) => concept.externalFull ? fullConcept(concept) : concept.reuseId ? sparseConcept(concept) : fullConcept(concept)).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part4-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part4-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part4-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family8-part4-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family8-part4-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '8-part4', refs: questions.map((question) => `F8-${question.ref}`), released: { sources: 3, articles: 2, concepts: concepts.length, newConcepts: concepts.filter((concept) => !concept.reuseId).length, conceptReuses: concepts.filter((concept) => concept.reuseId).length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, remainingRoutine: 9, exclusions: { wordingRepeats: ['F8-Q18', 'F8-Q33', 'F8-Q34', 'F8-Q50', 'F8-Q51', 'F8-Q52'] }, holds: { questionableKeys: ['F8-Q17', 'F8-Q49', 'F8-Q56', 'F8-Q60', 'F8-Q68'], family7QuestionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
