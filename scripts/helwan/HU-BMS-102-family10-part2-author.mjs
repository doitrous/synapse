import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')

const source = {
  assessment: 'src_a2b7d25d987469febab8',
  cellInjury1: 'src_7c79d90e00f17c534be6',
  inflammation2: 'src_949c1820aea58bded856',
  infection: 'src_618d482aa23f51f29cf0',
}

const article = {
  necrosis: 'ART-HU-BMS102-PAT-F10P2-NECROSIS-MORPHOLOGY',
  infection: 'ART-HU-BMS102-PAT-F10P2-GRANULOMATOUS-PYEMIC-INFECTION',
  tuberculosis: 'ART-HU-BMS102-PAT-F10P2-PRIMARY-TB-SPREAD-SITES',
}

const concepts = [
  {
    ref: 'M16', id: 'CON-INF-F8681BEAD8235E', key: 'pathology.actinomycosis.chronic-suppurative-granuloma', reuse: true,
    label: 'Actinomycosis is a chronic suppurative granulomatous infection', aliases: ['Suppurative granuloma of actinomycosis', 'Actinomycotic multiple abscesses', 'Anaerobic gram-positive actinomycosis'],
    definition: 'Actinomycosis is a chronic suppurative granulomatous infection caused by anaerobic gram-positive Actinomyces. Its gross pattern includes multiple abscesses discharging pus with grey-yellow sulphur granules. The Family-10 bank selects blood spread as the exception in its option set, but the governed Helwan lecture does not independently compare lymphatic with blood spread; that source-key gap remains explicit while the item is Draft.',
    objective: 'Recognize the directly taught gram-positive, suppurative and multiple-abscess features of actinomycosis while treating the printed spread exception as unreviewed bank evidence.',
    pitfalls: 'Turning the printed D into a faculty-corrected fact. The lecture verifies the organism class and abscess pattern but does not adjudicate the lymphatic-versus-blood-spread contrast.',
    type: 'classification', micro: 'Infective granulomas', nano: 'Actinomycosis feature set', article: article.infection, primary: 'SYS-INF', secondary: 'DIS-PAT-T03',
    subject: 'Actinomycosis', predicate: 'is', object: 'a chronic suppurative granulomatous infection caused by anaerobic gram-positive bacteria', display: 'Actinomycosis is a chronic suppurative granulomatous infection caused by anaerobic gram-positive bacteria.',
    teaching: [{ source: source.infection, page: 46, text: 'The Helwan lecture defines actinomycosis as a chronic suppurative granuloma caused by anaerobic gram-positive bacteria and describes multiple abscesses with sulphur granules.' }],
    warning: 'Partial-teaching warning: the curriculum carrier verifies options A and B but does not explicitly decide the lymphatic-versus-blood-spread comparison. The source prints D; no correction or official-key claim is inferred.',
  },
  {
    ref: 'M17', id: 'CON-INF-F4F4AF6260F57B', key: 'pathology.inflammation.sarcoidosis-noninfective-unknown-cause-granuloma', reuse: true,
    label: 'Sarcoidosis is a noninfective granulomatous disease of unknown cause', aliases: ['Sarcoid granuloma classification', 'Unknown-cause granuloma', 'Noninfective granuloma'],
    definition: 'Sarcoidosis is classified in the governed Helwan material as a noninfective granulomatous disease of unknown cause. Tuberculosis, schistosomiasis and actinomycosis are infective granulomatous conditions, so sarcoidosis is the exception in the printed comparison.',
    objective: 'Distinguish noninfective sarcoidosis from infective granulomas in the source option set.',
    pitfalls: 'Treating every granulomatous disorder as infective or overlooking that the stem asks for the exception.',
    type: 'comparison', micro: 'Granulomatous inflammation', nano: 'Infective versus noninfective granulomas', article: article.infection, primary: 'SYS-INF', secondary: 'DIS-PAT-T02',
    subject: 'Sarcoidosis', predicate: 'is', object: 'a noninfective granulomatous disease of unknown cause', display: 'Sarcoidosis is a noninfective granulomatous disease of unknown cause.',
    teaching: [{ source: source.inflammation2, page: 40, text: 'The Helwan granuloma classification places sarcoidosis under granulomas of unknown cause rather than among infective granulomas.' }, { source: source.infection, page: 46, text: 'The infection lecture classifies actinomycosis as a chronic suppurative granulomatous bacterial infection.' }],
  },
  {
    ref: 'M18', id: 'CON-INF-45E6A79B0DC0C6', key: 'pathology.pyemia.definition-septic-emboli-multiple-abscesses', reuse: true,
    label: 'Pyaemia is circulation and impaction of septic emboli causing multiple abscesses', aliases: ['Pyemia definition', 'Septic embolic multiple abscesses', 'Pyaemia'],
    definition: 'Pyaemia is circulation of septic emboli in the bloodstream followed by their arrest in capillaries of different organs, where they seed multiple small metastatic abscesses. It is not merely bacteria in blood, toxins in blood, or their combination without septic embolic impaction.',
    objective: 'Define pyaemia by septic embolic circulation, arrest and metastatic abscess formation.',
    pitfalls: 'Confusing pyaemia with bacteraemia, toxaemia or septicaemia; the defining event is the infected embolus lodging in another organ.',
    type: 'definition', micro: 'Bloodstream infection', nano: 'Pyaemia definition', article: article.infection, primary: 'SYS-INF', secondary: 'DIS-PAT-T03',
    subject: 'Pyaemia', predicate: 'is', object: 'septic embolic circulation and impaction causing multiple abscesses', display: 'Pyaemia is septic embolic circulation and impaction causing multiple abscesses.',
    teaching: [{ source: source.infection, page: 14, text: 'Pyaemia is circulation of septic emboli in the bloodstream and their arrest in different organs causing multiple small abscesses.' }],
  },
  {
    ref: 'M21', id: 'CON-FND-5285A9707E61CA', key: 'necrosis.coagulative.ischaemic-protein-denaturation', reuse: true,
    label: 'Coagulative necrosis keeps the cell outline because denaturation outruns autolysis', aliases: ['Coagulative necrosis', 'Ischaemic necrosis', 'Ghost outlines'],
    definition: 'Coagulative necrosis follows ischaemic injury in most solid organs. Protein denaturation predominates over enzymatic digestion, so basic cellular outlines are preserved even though intracellular details are lost. Cerebral infarction is the important exception because ischaemic injury in brain undergoes liquefactive rather than coagulative necrosis.',
    objective: 'Recognize the preserved-outline morphology of coagulative necrosis and exclude brain infarction from its usual organ pattern.',
    pitfalls: 'Assuming every infarct is coagulative. Cerebral infarction is liquefactive despite being ischaemic.',
    type: 'comparison', micro: 'Cell injury', nano: 'Coagulative necrosis', article: article.necrosis, primary: 'SYS-FND-T03-S01-M02', secondary: 'DIS-PAT-T01\nDIS-PAT-T08',
    subject: 'Coagulative necrosis', predicate: 'preserves', object: 'basic cell outlines because protein denaturation predominates over enzymatic digestion', display: 'Coagulative necrosis preserves basic cell outlines because protein denaturation predominates over enzymatic digestion.',
    teaching: [{ source: source.cellInjury1, page: 38, text: 'The Helwan lecture states that protein coagulation predominates over enzymatic digestion, the basic cell outline is preserved, details are lost, and myocardial infarction is an example.' }],
  },
  {
    ref: 'M23', id: 'CON-INF-B099D9DC13E9C4', key: 'pathology.tuberculosis.primary-blood-lymphatic-dissemination', reuse: false,
    label: 'Primary tuberculosis may disseminate through lymphatic and blood routes', aliases: ['Primary TB dissemination', 'Lymphohaematogenous spread of primary tuberculosis', 'Blood and lymphatic spread in primary TB'],
    definition: 'Spread is more common in primary than secondary tuberculosis in the governed comparison. The primary complex contains tuberculous lymphangitis and regional lymphadenitis, while early bacteraemia can seed multiple sites. Together these are the lymphatic and blood routes selected by the Family-10 source as the complication of primary tuberculosis.',
    objective: 'Recognize combined blood and lymphatic dissemination as the printed complication of primary tuberculosis.',
    pitfalls: 'Reducing the answer to local extension, confusing secondary amyloidosis with the primary-disease spread pattern, or describing the printed answer as an authenticated official key.',
    type: 'pathophysiological_mechanism', micro: 'Tuberculosis', nano: 'Primary tuberculosis dissemination', article: article.tuberculosis, primary: 'SYS-INF', secondary: 'DIS-PAT-T03',
    subject: 'Primary tuberculosis', predicate: 'may disseminate through', object: 'lymphatic and blood routes', display: 'Primary tuberculosis may disseminate through lymphatic and blood routes.',
    teaching: [{ source: source.infection, page: 23, text: 'The Helwan infection lecture describes bacteraemic seeding of multiple sites during early tuberculosis infection.' }, { source: source.infection, page: 39, text: 'The primary-versus-secondary tuberculosis comparison states that spread is more common in primary disease.' }, { source: source.infection, page: 40, text: 'The primary complex includes tuberculous lymphangitis and tuberculous lymphadenitis.' }],
  },
  {
    ref: 'M25', id: 'CON-INF-2A296C17AF3E23', key: 'pathology.tuberculosis.primary-portals-sites', reuse: true,
    label: 'Primary tuberculosis may involve lung, tonsil, intestine or skin but kidney is not a primary portal site', aliases: ['Primary TB sites', 'Primary tuberculosis portals of entry', 'Intestinal primary tuberculosis'],
    definition: 'The site of primary tuberculosis follows the portal of entry. Inhalation produces pulmonary disease, ingestion can involve the tonsils or intestine, and inoculation can involve skin. Among the source options, intestine is the listed primary site; brain, spleen and bone marrow are not presented as primary portal sites.',
    objective: 'Identify intestine as a possible site of primary tuberculosis in the printed option set.',
    pitfalls: 'Selecting an organ that tuberculosis may involve after dissemination when the stem asks for a primary portal site.',
    type: 'classification', micro: 'Tuberculosis', nano: 'Primary tuberculosis sites', article: article.tuberculosis, primary: 'SYS-INF', secondary: 'DIS-PAT-T03',
    subject: 'Primary tuberculosis', predicate: 'may begin in', object: 'the intestine after ingestion', display: 'Primary tuberculosis may begin in the intestine after ingestion.',
    teaching: [{ source: source.infection, page: 40, text: 'The Helwan lecture lists inhalation to lung, ingestion to tonsils or intestine, and inoculation to skin as primary tuberculosis portals and sites.' }],
  },
]

for (const concept of concepts) {
  concept.claim = `CLM-HU102-F10P2-${concept.ref}-01`
  concept.currCit = `CIT-HU102-F10P2-${concept.ref}-CURR`
  concept.asmCit = `CIT-HU102-F10P2-${concept.ref}-ASM`
  concept.span = `SPN-HU102-F10P2-${concept.ref}-01`
}
const byRef = Object.fromEntries(concepts.map((concept) => [concept.ref, concept]))

const questions = [
  { ref: 'M16', page: 3, key: 'D', stem: 'Features of actinomycosis include the following except:', options: ['Caused by gram positive bacteria', 'Multiple abscesses', 'Lymphatic spread', 'Blood spread'], clue: 'the local lecture directly supports the gram-positive organism and multiple-abscess pattern but does not independently adjudicate the two spread options', reasons: ['the Helwan lecture describes Actinomyces as anaerobic gram-positive bacteria', 'the Helwan lecture describes multiple abscesses discharging pus', 'the bank does not key this option, but the curriculum source does not independently verify the spread comparison', 'the Family-10 bank visibly selects this as the exception, while curriculum confirmation of the spread contrast remains absent'] },
  { ref: 'M17', page: 3, key: 'C', stem: 'All of the following are infective granuloma except:', options: ['T.B', 'Bilharziasis', 'Sarcoidosis', 'Actinomycosis'], clue: 'sarcoidosis is classified as a noninfective granuloma of unknown cause', reasons: ['tuberculosis produces an infective granulomatous response', 'schistosomiasis is a parasitic infective granulomatous disease', 'sarcoidosis is the noninfective exception', 'actinomycosis is a bacterial chronic suppurative granulomatous infection'] },
  { ref: 'M18', page: 3, key: 'D', stem: 'Pyemia means:', options: ['Presence of bacteria in blood.', 'Presence of toxins in the blood.', 'Presence of bacteria and toxins in blood,', 'Presence of septic emboli in blood with their arrest in different organs.'], clue: 'pyaemia requires septic emboli that travel and lodge in organs', reasons: ['bacteria circulating without septic embolic impaction describes bacteraemia rather than pyaemia', 'toxins in blood describe toxaemia', 'bacteria plus toxins in blood describe septicaemic infection rather than the embolic definition', 'septic emboli circulating and arresting in organs define pyaemia'] },
  { ref: 'M21', page: 4, key: 'D', stem: 'Coagulative necrosis characterized by except', options: ['Protein denaturation predominates enzymatic digestion.', 'Cells basic outline is preserved', 'The details are lost.', 'Occur in brain infarction'], clue: 'brain infarction undergoes liquefactive rather than coagulative necrosis', reasons: ['protein denaturation outlasting enzymatic digestion is central to coagulative necrosis', 'preserved basic cellular outlines are a defining feature', 'loss of intracellular detail occurs despite preservation of the outline', 'cerebral infarction is the organ exception and undergoes liquefactive necrosis'] },
  { ref: 'M23', page: 4, key: 'D', stem: 'Complication of 1ry TB is', options: ['Local spread', 'Amyloidosis', 'Stress ulcer', 'Blood and lymphatic spread'], clue: 'primary tuberculosis may disseminate through its lymphatic complex and by early blood seeding', reasons: ['local extension does not capture the combined dissemination selected by the source', 'secondary amyloidosis is a chronic inflammatory complication and is not the selected primary-disease spread answer', 'stress ulcer is not the tuberculosis dissemination complication in this option set', 'blood and lymphatic dissemination match the primary-complex and early-seeding pathways'] },
  { ref: 'M25', page: 4, key: 'B', stem: 'The site of 1ry TB is:', options: ['Brain', 'Intestine', 'Spleen', 'Bone marrow'], clue: 'ingestion can establish a primary tuberculous focus in the intestine', reasons: ['brain involvement is not listed as a primary portal site', 'intestine is a listed site after ingestion', 'splenic disease usually reflects dissemination rather than the listed primary portal', 'bone marrow involvement is not listed as a primary portal site'] },
]
for (const question of questions) question.id = `Q-HU102-PAT-F10-${question.ref}`
const questionFor = (concept) => questions.find((question) => question.ref === concept.ref)

const sourceRow = ({ id, title, path, pages, sha, qualification, assessment }) => `# Item
## id
${id}
## title
${title}
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
${path}
## media_type
application/pdf
## languages
en
## page_count
${pages}
## sha256
${sha}
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
${qualification}
## is_assessment
${assessment ? 'yes' : 'no'}`

const sourceRows = [
  sourceRow({ id: source.assessment, title: 'General pathology MCQ and true/false bank with printed answers', path: 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - MCQ Pathology.pdf', pages: 6, sha: 'a2b7d25d987469febab87a5a80fd52db5c8d74a1ade0dfabd6482fec9da63475', qualification: 'Tier-3 local pathology study bank visibly attributed to Dr Ahmed Hassan. Pages 1–4 contain 25 MCQs with printed answer occurrences. This closure releases only M16, M17, M18, M21, M23 and M25; it is not an authenticated sitting, official departmental key or mark scheme.', assessment: true }),
  sourceRow({ id: source.cellInjury1, title: 'Cell Injury 1 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 2 - Cell Injury 1/Cell injury lecture 1.pdf', pages: 51, sha: '7c79d90e00f17c534be66ba3cfa964bf2972c7a4767985e9c1a20d05469350f0', qualification: 'Tier-4 Helwan theoretical teaching carrier visibly attributed to Dr Enas Megahed Elhosary. It supplies local coagulative-necrosis teaching, not an official answer key.', assessment: false }),
  sourceRow({ id: source.inflammation2, title: 'Inflammation 2 — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 7 - Inflammation 2/Inflammation lecture 2.pdf', pages: 53, sha: '949c1820aea58bded856011cc31bd8ce958941ce7f17e4c390cb1343b8d1677d', qualification: 'Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary. It supplies the local granuloma classification, not an assessment instrument.', assessment: false }),
  sourceRow({ id: source.infection, title: 'Infection — Helwan BMS-102 pathology lecture', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 9 - Infection/Infection-Lecture.pdf', pages: 48, sha: '618d482aa23f51f29cf0990e8c2882785354c662167ee12f793d05191b3f1e90', qualification: 'Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary. It supplies local pyaemia, tuberculosis and actinomycosis teaching, not an assessment instrument or official answer key.', assessment: false }),
].join('\n---\n\n')

const articleSources = (id) => [...new Set([source.assessment, ...concepts.filter((concept) => concept.article === id).flatMap((concept) => concept.teaching.map((item) => item.source))])]
const otherArticles = (id) => Object.values(article).filter((candidate) => candidate !== id)

const conceptRow = (concept) => {
  const question = questionFor(concept)
  return `# Item
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
Draft
## subject
fnd
## primary_node_id
${concept.primary}
## secondary_node_ids
${concept.secondary}
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${concept.micro} > ${concept.nano}
## article_ids
${concept.article}
## related_article_ids
${otherArticles(concept.article).join('\n')}
## related_concept_ids
${concepts.filter((other) => other.article === concept.article && other.id !== concept.id).map((other) => other.id).join('\n')}
## resource_ids
${[...new Set([source.assessment, ...concept.teaching.map((item) => item.source)])].join('\n')}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.84
## exam_weight_by_year
HU_Y1=0.84
## clinical_relevance
0.82
## academic_relevance
0.98
## weight_confidence
0.64
## support_mode
direct_statement
## confidence
${concept.ref === 'M16' ? '0.78' : '0.92'}
## exam_signal
${source.assessment} | tier-3 local keyed study bank | undated | PDF p${question.page} | Family-10 ${concept.ref}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${concept.teaching.map((item) => `[Teaching p${item.page}] ${item.text}`).join('\n')}
[Assessment p${question.page} ${concept.ref}] ${question.stem} Answer: ${question.options['ABCD'.indexOf(question.key)]}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
${concept.ref === 'M16' ? 'The bank selects Blood spread as the exception, while the governed lecture does not state whether lymphatic or blood spread is characteristic. The printed D is preserved without medical adjudication.' : '[clear]'}
## uncertainty
${concept.ref === 'M16' ? concept.warning : '[clear]'}
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.${concept.ref === 'M16' ? ' The spread-option contrast specifically lacks direct curriculum confirmation.' : ''}
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
microtopicId: No reviewed microtopic ID exists beneath the canonical placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 10 completed the four-query search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New HU overlay; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: ${concept.reuse ? 'Standalone-complete HU overlay preserving the exact governed concept ID, canonical key and meaning.' : 'New question-led concept using the governed Family-10 no-same-scope decision and deterministic key-derived ID.'}`
}

const articleRow = ({ id, title, aliases, refs, summary, mechanism, determinants, significance, loses, basis, gaps }) => {
  const subset = refs.map((ref) => byRef[ref])
  return `# Item
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
${title}
## microtopic
Family-10 exact-key distinctions
## nanotopic
Ordinary MCQ closure
## primary_node_id
SYS-INF
## secondary_node_ids
DIS-PAT
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
### Definition
${subset.map((concept) => concept.display).join(' ')}

### Mechanism
${mechanism}

### Key determinants
${determinants}

### Clinical significance
${significance}
## published_summary

## published_sections

## hold_these
${subset.map((concept) => concept.display).join('\n')}
## lose_the_mark
${loses.join('\n')}
## related_concepts
${subset.map((concept) => concept.id).join('\n')}
## related_articles
${otherArticles(id).join('\n')}
## question_ids
${refs.map((ref) => questionFor(byRef[ref]).id).join('\n')}
## resource_ids
${articleSources(id).join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${title}
## university_notes
hu: Restricted to HU-BMS-102 Year-1. Governed Helwan lectures supply local teaching and Family-10 supplies exact auxiliary printed-answer occurrences without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${concept.currCit}, ${concept.asmCit}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${articleSources(id).join('\n')}
## claim_ids
${subset.map((concept) => concept.claim).join('\n')}
## span_ids
${subset.map((concept) => concept.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
${basis}
## evidence_gaps
${gaps}
## conflicts
${refs.includes('M16') ? byRef.M16.warning : '[clear]'}
## last_reviewed

## review_due

## notes
Exact source wording remains in linked questions. M14/M22, M15, Q2, exact repeats and all true/false prompts remain outside this release.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for these tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`
}

const articles = [
  articleRow({ id: article.necrosis, title: 'Coagulative necrosis morphology and the cerebral exception', aliases: ['Coagulative versus liquefactive infarction', 'Preserved ghost outlines'], refs: ['M21'], summary: 'Coagulative necrosis preserves basic cell outlines because protein denaturation outpaces enzymatic digestion. Brain infarction is the major organ exception and undergoes liquefactive necrosis.', mechanism: 'Acute ischaemia denatures structural proteins and proteolytic enzymes. With autolysis delayed, the architecture persists temporarily as eosinophilic ghost outlines even though nuclei and internal detail disappear. Neural tissue instead softens through enzymatic digestion.', determinants: 'Look for protein denaturation, preserved outlines and lost detail. When the option is cerebral infarction, switch from the usual solid-organ coagulative pattern to liquefactive necrosis.', significance: 'The exception prevents an unsafe shortcut that labels every infarct coagulative. The organ context is decisive.', loses: ['Calling brain infarction coagulative merely because it is ischaemic.', 'Confusing preserved cell outline with preserved cell viability.', 'Reading loss of detail as loss of the whole tissue architecture.'], basis: 'Helwan Cell Injury 1 p38 directly supports the morphology; Family-10 p4 supplies the exact printed-answer occurrence.', gaps: 'Independent medical verification and Helwan faculty review remain required before publication.' }),
  articleRow({ id: article.infection, title: 'Granulomatous infection, actinomycosis and pyaemia', aliases: ['Infective granuloma distinctions', 'Actinomycosis and septic emboli'], refs: ['M16', 'M17', 'M18'], summary: 'Actinomycosis is an anaerobic gram-positive chronic suppurative granulomatous infection with multiple abscesses. Sarcoidosis is noninfective, and pyaemia is septic embolic circulation and arrest producing metastatic abscesses.', mechanism: 'Actinomycotic colonies provoke chronic suppuration and granulomatous inflammation. In pyaemia, infected thromboemboli detach, circulate and lodge in downstream capillary beds, creating multiple abscesses. Sarcoidosis belongs to a different, noninfective granulomatous category.', determinants: 'For an infective-granuloma exception, choose the noninfective disorder. For pyaemia, require septic emboli plus impaction. For M16, use the directly taught organism and abscess facts but retain the unresolved spread-option warning.', significance: 'These distinctions separate tissue-pattern classification from bloodstream dissemination. M16 remains Draft because its printed spread exception lacks direct curriculum adjudication.', loses: ['Calling toxins alone pyaemia.', 'Treating sarcoidosis as infective.', 'Presenting M16 D as a faculty-corrected answer rather than a preserved printed bank key.', 'Claiming that the local lecture resolves lymphatic versus blood spread in actinomycosis.'], basis: 'Helwan Infection pp14,46 and Inflammation 2 p40 provide direct local teaching; Family-10 p3 supplies the three exact printed-answer occurrences.', gaps: 'Independent medical verification and faculty review are required. M16 specifically lacks direct teaching support for the lymphatic-versus-blood-spread contrast, so its printed D remains an explicit partial-teaching warning.' }),
  articleRow({ id: article.tuberculosis, title: 'Primary tuberculosis: portals, lymphatic complex and blood dissemination', aliases: ['Primary TB sites and spread', 'Lymphohaematogenous primary tuberculosis'], refs: ['M23', 'M25'], summary: 'Primary tuberculosis follows the portal of entry and may begin in the intestine after ingestion. Primary spread is more common than secondary spread; lymphangitis and lymphadenitis form part of the primary complex, and early bacteraemia can seed distant sites.', mechanism: 'Ingested bacilli may establish an intestinal primary focus. From a primary focus, lymphatic drainage produces lymphangitis and regional lymphadenitis, while entry into blood can disseminate bacilli to multiple organs.', determinants: 'Separate a primary portal site from an organ affected later by dissemination. Intestine is a listed primary site; combined blood and lymphatic spread is the printed complication.', significance: 'Portal and route determine whether an organ is the primary site or a secondary deposit. The distinction also explains the components of the primary complex.', loses: ['Selecting brain, spleen or bone marrow as the listed primary portal in M25.', 'Reducing primary dissemination to local spread alone.', 'Calling secondary amyloidosis the source-selected complication of primary TB.'], basis: 'Helwan Infection pp23,39–40 supplies portal, lymphatic and blood-spread teaching; Family-10 p4 supplies two exact printed-answer occurrences.', gaps: 'Independent medical verification and Helwan faculty review remain required before publication; the auxiliary bank is not an authenticated official key.' }),
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
${concept.ref === 'M16' ? 'unresolved_source_gap' : 'none'}
## confidence
${concept.ref === 'M16' ? '0.78' : '0.92'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: governed Helwan teaching plus an auxiliary exact printed answer; no official-key authority inferred${concept.ref === 'M16' ? '; spread-option contrast not claimed by this atomic statement' : ''}`

const curriculumCitation = (concept) => `# Item
## id
${concept.currCit}
## claim_id
${concept.claim}
## resource_id
${concept.teaching[0].source}
## evidence_role
local_curriculum
## support_span
${concept.teaching.map((item) => item.text).join(' ')}
## locator_type
page
## locator_page
${concept.teaching[0].page}
## locator_section
${concept.micro}
## locator_detail
${concept.teaching.map((item) => `PDF p${item.page}`).join(', ')}, governed Helwan teaching source
## context_note
Local curriculum support only; independent medical verification remains required.${concept.ref === 'M16' ? ' This citation does not resolve the lymphatic-versus-blood-spread options.' : ''}
## confidence
${concept.ref === 'M16' ? '0.78' : '0.92'}
## counts_as_claim_evidence
no`

const assessmentCitation = (concept) => {
  const question = questionFor(concept)
  return `# Item
## id
${concept.asmCit}
## claim_id
${concept.claim}
## resource_id
${source.assessment}
## evidence_role
auxiliary_assessment
## support_span
${question.stem} Answer: ${question.options['ABCD'.indexOf(question.key)]}.
## locator_type
page
## locator_page
${question.page}
## locator_section
Family 10 ${question.ref}
## locator_detail
PDF p${question.page}, exact prompt and visibly printed answer
## context_note
Tier-3 local keyed study-bank evidence only; not an official exam or authenticated official key.${question.ref === 'M16' ? ' The printed D is preserved despite incomplete curriculum adjudication of the spread options.' : ''}
## confidence
0.94
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
${concept.currCit}
${concept.asmCit}`

const relations = [
  { source: byRef.M17.id, type: 'contrasts_with', target: byRef.M16.id, claims: [byRef.M17.claim, byRef.M16.claim], citations: [byRef.M17.currCit, byRef.M16.currCit], scope: 'sarcoidosis is noninfective whereas actinomycosis is an infective granulomatous disease' },
  { source: byRef.M21.id, type: 'contrasts_with', target: 'CON-FND-88508ABAB84A67', claims: [byRef.M21.claim], citations: [byRef.M21.currCit], scope: 'coagulative necrosis preserves outlines, whereas cerebral infarction follows the liquefactive pattern' },
  { source: byRef.M23.id, type: 'associated_with', target: 'CON-INF-71C639EC8EBFB1', claims: [byRef.M23.claim], citations: [byRef.M23.currCit], scope: 'tuberculous lymphangitis and lymphadenitis are the lymphatic components of the primary complex' },
  { source: byRef.M23.id, type: 'associated_with', target: 'CON-INF-7991BDFFEA3520', claims: [byRef.M23.claim], citations: [byRef.M23.currCit], scope: 'blood dissemination during early tuberculosis can seed multiple sites and produce a miliary pattern' },
  { source: byRef.M25.id, type: 'associated_with', target: 'CON-INF-31175FBD557492', claims: [byRef.M25.claim], citations: [byRef.M25.currCit], scope: 'portal-specific sites belong to the first-infection definition of primary tuberculosis' },
]
const relationRow = (relation) => `# Item
## source
${relation.source}
## type
${relation.type}
## target
${relation.target}
## evidence_claim_ids
${relation.claims.join('\n')}
## citation_ids
${relation.citations.join('\n')}
## verification_status
needs_evidence
## confidence
0.84
## qualifiers
scope: ${relation.scope}
## reviewer
Medical team, Helwan Pathology faculty`

const explanation = (question, index) => {
  const correct = 'ABCD'.indexOf(question.key)
  if (question.ref === 'M16') {
    if (index === correct) return `${question.options[index]} is the visibly printed exception (D) in this Family-10 occurrence. The governed lecture directly verifies the gram-positive organism and multiple-abscess features but does not independently compare lymphatic with blood spread. The printed key is therefore preserved with an explicit partial-teaching warning; it is not presented as a faculty-corrected or official answer.`
    if (index === 2) return `${question.options[index]} is not the visibly printed exception, but the governed lecture does not independently establish this spread route as a characteristic. This Draft explanation records the evidence gap instead of inventing support; the bank prints D and awaits faculty adjudication.`
    return `${question.options[index]} is directly supported by the governed Helwan lecture: ${question.reasons[index]}. It is therefore not the exception selected by the source. The unresolved part of the item is limited to the lymphatic-versus-blood-spread contrast.`
  }
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive distinction is that ${question.clue}. This preserves the visibly printed answer and exact option wording while the record remains Draft.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive distinction is that ${question.clue}, which supports ${question.options[correct]}. The explanation remains tied to governed teaching and the exact assessment occurrence.`
}

const questionRow = (question) => {
  const concept = byRef[question.ref]
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
${question.options.map((option, index) => `## answer_${'abcd'[index]}\n${option}\n## explanation_${'abcd'[index]}\n${explanation(question, index)}`).join('\n')}
## topic
General pathology
## subtopic
${concept.micro}
## difficulty
Easy
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${concept.micro} > ${concept.nano}
## clinical_relevance
0.8
## academic_relevance
0.98
## cognitive_effort_score
0.5
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
Low
## setting
Both
## reasoning_level
1
## inferred_difficulty
46
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${[...new Set([source.assessment, ...concept.teaching.map((item) => item.source)])].join('\n')}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${source.assessment}, PDF p${question.page}, Family-10 ${question.ref}: exact stem, option order and visibly printed answer ${question.options['ABCD'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching context: ${concept.teaching.map((item) => `${item.source}, PDF p${item.page}`).join('; ')}.
## attachments

## attached_image

## author_notes
Exact source wording, capitalization, punctuation, option order and printed answer are preserved. No official sitting, marks, recurrence, candidate response or corrected answer is inferred. M14=D and equivalent-copy M22=C remain held together because their printed keys conflict; neither is selected or repaired. M15=C remains held because the except item has non-exclusive options. M19, M20 and M24 are excluded exact-copy occurrences of released M11, M12 and M13. M02 remains a valid phrase-keyed hold, and all true/false prompts remain outside this slice.${question.ref === 'M16' ? ` ${concept.warning}` : ''}
## estimated_seconds
60
## randomise_answers
yes`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family10-part2-sources.md', sourceRows],
  ['article/HU-BMS-102-pathology-family10-part2-articles.md', articles],
  ['concept/HU-BMS-102-pathology-family10-part2-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-part2-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-part2-citations.md', [...concepts.map(curriculumCitation), ...concepts.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-part2-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family10-part2-relations.md', relations.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family10-part2-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '10-part2', refs: questions.map((question) => `F10-${question.ref}`), keys: questions.map((question) => question.key),
  released: { sources: 4, articles: 3, concepts: 6, newConcepts: 1, standaloneCompleteConceptReuses: 5, questions: 6, claims: 6, citations: 12, spans: 6, relations: 5 },
  holds: { phraseKeyed: ['F10-M02 — Natural history of the disease'], conflicts: ['F10-M14=D', 'F10-M22=C'], nonExclusiveOptions: ['F10-M15=C'], exactCopyExclusions: ['F10-M19→M11', 'F10-M20→M12', 'F10-M24→M13'], trueFalse: 'outside this slice' },
}, null, 2))
