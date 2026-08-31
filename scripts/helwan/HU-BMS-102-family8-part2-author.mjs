import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_6050cec97addd49101a3'
const lecture1 = 'src_eaea111707b57559a904'
const lecture2 = 'src_949c1820aea58bded856'
const outcomesArticle = 'ART-HU-BMS102-PAT-ACUTE-INFLAMMATION-OUTCOMES'
const suppurationArticle = 'ART-HU-BMS102-PAT-SUPPURATIVE-CATARRHAL-INFLAMMATION'
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  { handle: 'abscess-progression', key: 'pathology.inflammation.abscess-progression-chronic-amyloidosis', label: 'Incomplete evacuation can convert an acute abscess into a chronic abscess that may lead to secondary amyloidosis', aliases: ['Abscess progression sequence', 'Chronic abscess and secondary amyloidosis'], definition: 'Pyogenic infection can form an acute abscess. If evacuation is incomplete, chronic abscess formation may follow; prolonged suppuration can then contribute to reactive secondary amyloidosis.', objective: 'Order pyogenic infection, acute abscess, incomplete evacuation, chronic abscess and secondary amyloidosis.', pitfalls: 'Placing chronic abscess before incomplete evacuation or treating secondary amyloidosis as an immediate acute complication.', type: 'sequence', micro: 'Suppurative inflammation', nano: 'Abscess progression', article: outcomesArticle, subject: 'Incomplete evacuation of an acute abscess', predicate: 'can lead to', object: 'chronic abscess formation and secondary amyloidosis', display: 'Incomplete evacuation of an acute abscess can lead to chronic abscess formation and secondary amyloidosis.', teachSource: lecture2, teachPage: 42, teachText: 'Persistent chronic inflammation may result in secondary amyloidosis.' },
  { handle: 'abscess-definition', key: 'pathology.inflammation.abscess-acute-localized-suppurative-definition', label: 'An abscess is an acute localized suppurative inflammation', aliases: ['Abscess definition', 'Localized acute suppuration'], definition: 'An abscess is a localized acute suppurative inflammation characterised by pus formation and liquefactive necrosis. It differs from diffuse cellulitis and from localized chronic inflammation.', objective: 'Define an abscess as acute localized suppurative inflammation.', pitfalls: 'Calling an abscess diffuse, chronic or non-suppurative because pus and localization are the defining pair.', type: 'definition', micro: 'Suppurative inflammation', nano: 'Abscess definition', article: suppurationArticle, subject: 'An abscess', predicate: 'is', object: 'an acute localized suppurative inflammation', display: 'An abscess is an acute localized suppurative inflammation.', teachSource: lecture2, teachPage: 6, teachText: 'Abscess definition: a localized suppurative acute inflammation characterized by pus formation.' },
  { handle: 'il1-fever', key: 'pathology.inflammation.interleukin1-hypothalamic-fever', label: 'Interleukin-1 acts on the hypothalamus to induce fever in acute inflammation', aliases: ['IL-1 endogenous pyrogen', 'Hypothalamic fever mediator'], definition: 'Interleukin-1 is an endogenous pyrogen that acts on the hypothalamus to raise the thermoregulatory set point and produce fever during acute inflammation.', objective: 'Identify interleukin-1 as the mediator acting on the hypothalamus to induce fever.', pitfalls: 'Selecting bradykinin, serotonin, histamine or C5a because they are inflammatory mediators with different principal actions.', type: 'mechanism', micro: 'Systemic effects', nano: 'Fever mediator', article: outcomesArticle, subject: 'Interleukin-1', predicate: 'induces', object: 'fever by acting on the hypothalamus', display: 'Interleukin-1 induces fever by acting on the hypothalamus.', teachSource: lecture1, teachPage: 34, teachText: 'Cytokines IL-1 and TNF are macrophage-derived inflammatory mediators responsible for general manifestations.' },
  { handle: 'vascular-sequence', reuseId: 'CON-INF-2CC70E34F68F03', reuseKey: 'pathology.inflammation.acute-vascular-event-sequence-emigration-fourth', reuseLabel: 'Leukocyte emigration follows vascular permeability, exudation and slowing in the acute-inflammatory sequence', objective: 'Order arteriolar change, increased permeability, protein-rich fluid escape and leukocyte emigration.', micro: 'Acute inflammation', nano: 'Vascular event sequence', article: outcomesArticle, subject: 'Protein-rich fluid escape', predicate: 'precedes', object: 'leukocyte emigration in acute inflammation', display: 'Protein-rich fluid escape precedes leukocyte emigration in acute inflammation.', teachSource: lecture1, teachPage: 36, teachText: 'Sequence: vasodilatation, increased vascular permeability, leakage of exudate, then margination and transmigration.' },
  { handle: 'harmful-swelling', key: 'pathology.inflammation.acute-harmful-tissue-swelling', label: 'Tissue swelling is a potentially harmful effect of acute inflammation', aliases: ['Harmful acute inflammatory swelling', 'Bad effect of acute inflammation'], definition: 'Acute inflammation has protective effects including toxin dilution, fibrin formation, phagocytosis and immune stimulation. Tissue swelling can be harmful because accumulated exudate raises tissue pressure and impairs function.', objective: 'Distinguish tissue swelling as a potentially harmful effect from the protective effects of acute inflammation.', pitfalls: 'Choosing toxin dilution, fibrin, phagocytosis or immune stimulation despite their protective roles.', type: 'clinical_significance', micro: 'Acute inflammation', nano: 'Harmful swelling', article: outcomesArticle, subject: 'Tissue swelling', predicate: 'can be', object: 'a harmful effect of acute inflammation', display: 'Tissue swelling can be a harmful effect of acute inflammation.', teachSource: lecture1, teachPage: 7, teachText: 'Swelling is due to interstitial fluid accumulation and can cause loss of function by pressure.' },
  { handle: 'chemotaxis-definition', key: 'pathology.inflammation.chemotaxis-directional-leukocyte-movement', label: 'Chemotaxis is directional leukocyte movement toward an inflammatory irritant', aliases: ['Chemotaxis definition', 'Directed leukocyte migration'], definition: 'Chemotaxis is directed movement of neutrophils and macrophages through extravascular tissue toward an irritant along a chemical gradient.', objective: 'Define chemotaxis as directional leukocyte movement toward the irritant.', pitfalls: 'Choosing migration, margination, pavementation or phagocytosis, which name broader movement, vascular positioning or ingestion.', type: 'definition', micro: 'Leukocyte response', nano: 'Chemotaxis', article: outcomesArticle, subject: 'Chemotaxis', predicate: 'is', object: 'directional leukocyte movement toward an inflammatory irritant', display: 'Chemotaxis is directional leukocyte movement toward an inflammatory irritant.', teachSource: lecture1, teachPage: 30, teachText: 'Chemotaxis is the directed movement of neutrophils and macrophages toward the irritant.' },
  { handle: 'staph-suppuration', key: 'pathology.inflammation.staphylococci-suppurative-organism', label: 'Staphylococci cause suppurative inflammation', aliases: ['Staphylococcal suppuration', 'Pyogenic staphylococci'], definition: 'Staphylococci are pyogenic organisms that characteristically cause localized suppurative inflammation and abscess formation. Their coagulase supports localization.', objective: 'Select staphylococci as organisms causing suppurative inflammation.', pitfalls: 'Choosing diphtheria, herpes or influenza, or using E. coli or pneumococci when the source asks for the characteristic listed pyogenic organism.', type: 'clinical_association', micro: 'Suppurative inflammation', nano: 'Causative organism', article: suppurationArticle, subject: 'Staphylococci', predicate: 'cause', object: 'suppurative inflammation', display: 'Staphylococci cause suppurative inflammation.', teachSource: lecture2, teachPage: 6, teachText: 'Abscess cause: Staphylococci.' },
  { handle: 'carbuncle-suppurative', key: 'pathology.inflammation.carbuncle-acute-suppurative-example', label: 'A carbuncle is an example of acute suppurative inflammation', aliases: ['Carbuncle classification', 'Acute suppurative carbuncle'], definition: 'A carbuncle is a cluster of interconnected cutaneous abscesses and therefore an example of acute localized suppurative inflammation.', objective: 'Classify a carbuncle as acute suppurative inflammation.', pitfalls: 'Selecting fibrinous, membranous, necrotizing or catarrhal patterns despite the pus-filled connected abscesses.', type: 'classification', micro: 'Suppurative inflammation', nano: 'Carbuncle example', article: suppurationArticle, subject: 'A carbuncle', predicate: 'is an example of', object: 'acute suppurative inflammation', display: 'A carbuncle is an example of acute suppurative inflammation.', teachSource: lecture2, teachPage: 14, teachText: 'Carbuncles are clusters of abscesses connected deeply subcutaneous, causing deeper suppuration.' },
  { handle: 'suppurative-features', key: 'pathology.inflammation.suppurative-abscess-cellulitis-neutrophils', label: 'Suppurative inflammation includes abscess and cellulitis and requires necrosis with abundant neutrophils', aliases: ['Suppurative inflammation features', 'Abscess versus cellulitis'], definition: 'Localized suppuration is an abscess, while spreading suppuration is cellulitis. Pus formation requires necrosis and abundant neutrophil infiltration; tuberculosis is granulomatous rather than a localized suppurative pattern.', objective: 'Recognise the defining features of suppurative inflammation and reject tuberculosis as a localized suppurative type.', pitfalls: 'Treating tuberculosis as localized suppuration or forgetting that necrosis and numerous neutrophils are necessary for pus.', type: 'comparison', micro: 'Suppurative inflammation', nano: 'Core features', article: suppurationArticle, subject: 'Suppurative inflammation', predicate: 'includes', object: 'abscess and cellulitis with necrosis and abundant neutrophils', display: 'Suppurative inflammation includes abscess and cellulitis with necrosis and abundant neutrophils.', teachSource: lecture2, teachPage: 5, teachText: 'Suppurative inflammation may be localized as abscess, furuncle or carbuncle, or diffuse as cellulitis.' },
  { handle: 'catarrhal', key: 'pathology.inflammation.catarrhal-superficial-mucosal-discharge', label: 'Catarrhal inflammation produces discharge from superficial mucosal surfaces', aliases: ['Catarrhal inflammation definition', 'Superficial mucosal discharge'], definition: 'Catarrhal inflammation is a mild inflammatory pattern affecting mucous membranes and producing increased superficial mucosal discharge, as in rhinitis or bronchitis.', objective: 'Identify discharge from superficial mucosal surfaces as the characteristic of catarrhal inflammation.', pitfalls: 'Choosing deep ulceration, abscess, cellulitis or granulomatous reaction, which represent other morphologic patterns.', type: 'morphological_pattern', micro: 'Non-suppurative inflammation', nano: 'Catarrhal pattern', article: suppurationArticle, subject: 'Catarrhal inflammation', predicate: 'produces', object: 'discharge from superficial mucosal surfaces', display: 'Catarrhal inflammation produces discharge from superficial mucosal surfaces.', teachSource: lecture2, teachPage: 22, teachText: 'Catarrhal inflammation is mild inflammation of a mucous membrane, with rhinitis and bronchitis as examples.' },
]

for (const concept of concepts) {
  concept.id = concept.reuseId ?? idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F8P2-${token}-01`
  concept.currCit = `CIT-HU102-F8P2-${token}-CURR`
  concept.span = `SPN-HU102-F8P2-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q09', concept: 'abscess-progression', page: 2, stem: 'If following events are put in their correct order, which will come fourth:', key: 'C', options: ['Secondary amyloidosis', 'Infection by pyogenic bacteria', 'Chronic abscess formation', 'Acute abscess formation', 'Incomplete evacuation of acute abscess'], clue: 'pyogenic infection produces an acute abscess, incomplete evacuation follows, and chronic abscess is fourth before amyloidosis', reasons: ['secondary amyloidosis is the later chronic complication', 'pyogenic infection begins the sequence', 'chronic abscess formation is fourth in the ordered list', 'acute abscess formation follows infection and precedes incomplete evacuation', 'incomplete evacuation precedes conversion to chronic abscess'] },
  { ref: 'Q13', concept: 'abscess-definition', page: 3, stem: 'An abscess means:', key: 'D', options: ['Acute diffuse inflammation in soft tissue', 'Chronic inflammation following acute reaction', 'Localized chronic inflammation', 'Acute localized suppurative inflammation', 'Acute non-suppurative inflammation'], clue: 'abscess combines acute, localized and suppurative', reasons: ['acute diffuse soft-tissue suppuration is cellulitis', 'chronic inflammation following an acute reaction is not the definition of abscess', 'an abscess is acute rather than localized chronic inflammation', 'acute localized suppurative inflammation is the exact definition', 'pus formation makes the process suppurative'] },
  { ref: 'Q19', concept: 'il1-fever', page: 4, stem: 'The chemical substance-acting on Hypothalamus and induces fever in acute inflammation is:', key: 'E', options: ['Bradykinin', 'Serotonin', 'Histamine', 'Complement 5 a', 'Interleukin-1'], clue: 'IL-1 is the endogenous pyrogen acting on the hypothalamus', reasons: ['bradykinin primarily mediates pain and permeability', 'serotonin has vasoactive effects but is not the keyed hypothalamic pyrogen', 'histamine mediates vasodilatation and permeability', 'C5a is an anaphylatoxin and chemotactic factor', 'interleukin-1 acts on the hypothalamus to induce fever'] },
  { ref: 'Q20', concept: 'vascular-sequence', page: 4, stem: 'If the following events of acute inflammation are out in their correct order which would come fourth:', key: 'E', options: ['Arteriolar contraction', 'Increased vascular permeability', 'Dilatation of arterioles', 'Emigration of leukocytes from blood vessels', 'Protein rich fluid escapes from blood vessels'], clue: 'after initial contraction, arteriolar dilation and increased permeability, protein-rich exudate escapes before leukocyte emigration', reasons: ['transient arteriolar contraction is first in this option set', 'increased permeability precedes the escape of protein-rich fluid', 'arteriolar dilatation follows transient contraction and precedes permeability', 'leukocyte emigration follows protein-rich fluid escape', 'protein-rich fluid escape is fourth in the printed sequence'] },
  { ref: 'Q21', concept: 'harmful-swelling', page: 4, stem: 'Which of the followings is not a useful effect of acute inflammation;', key: 'E', options: ['Dilution of toxin', 'Formation of fibrin', 'Phagocytosis', 'Stimulation of the immune system', 'Swelling of tissues'], clue: 'swelling can raise tissue pressure and impair function, whereas the other options are protective', reasons: ['toxin dilution reduces local concentration', 'fibrin helps limit spread and supports repair', 'phagocytosis removes microbes and debris', 'immune stimulation strengthens host defence', 'tissue swelling is the non-useful potentially harmful effect'] },
  { ref: 'Q22', concept: 'il1-fever', page: 5, stem: 'Fever in acute inflammation is due to chemical substance acting on Hypothalamus. This substance is:', key: 'E', options: ['Bradykinin', 'Serotonin', 'Histamine', 'Complement 5 a', 'lnterleukin-1'], clue: 'the hypothalamic endogenous pyrogen is interleukin-1', reasons: ['bradykinin mediates pain', 'serotonin is vasoactive but not the principal endogenous pyrogen here', 'histamine increases vascular permeability', 'C5a is chemotactic and anaphylatoxic', 'the printed lnterleukin-1 option is the hypothalamic fever mediator'] },
  { ref: 'Q23', concept: 'harmful-swelling', page: 5, stem: 'Which one of the followings is a bad effect of acute inflammation:', key: 'E', options: ['Dilution of toxin', 'Formation of fibrin', 'Phagocytosis', 'Stimulation of the immune system', 'Swelling of tissue'], clue: 'tissue swelling may compress structures and impair function', reasons: ['dilution of toxin is protective', 'fibrin can limit spread', 'phagocytosis clears injurious material', 'immune stimulation is a useful defensive effect', 'swelling of tissue is the harmful effect in the source comparison'] },
  { ref: 'Q24', concept: 'chemotaxis-definition', page: 5, stem: 'Which term describes directional movement of leucocytes towards the irritant in the area of inflammation:', key: 'A', options: ['Chemotaxis', 'Migration', 'Margination', 'Phagocytosis', 'Pavementation'], clue: 'directed movement along the inflammatory chemical gradient is chemotaxis', reasons: ['chemotaxis is the specific term for directional movement toward the irritant', 'migration is broader and does not specify direction toward a chemical stimulus', 'margination is peripheral positioning of leukocytes within vessels', 'phagocytosis is ingestion of particulate material', 'pavementation is leukocyte lining and adhesion along endothelium'] },
  { ref: 'Q25', concept: 'staph-suppuration', page: 5, stem: 'Which of the following organisms cause suppurative inflammation:', key: 'D', options: ['Diphtheria', 'E-coli', 'Pneumococci', 'Staphylococci', 'Herpes simplex'], clue: 'staphylococci are the characteristic listed pyogenic abscess-forming organisms', reasons: ['diphtheria produces toxin-mediated membranous inflammation', 'E. coli can cause infection but is not the source-keyed characteristic option', 'pneumococci can produce purulent disease but are not the printed answer here', 'staphylococci characteristically cause suppurative inflammation and abscesses', 'herpes simplex is viral and commonly produces vesicular or serous lesions'] },
  { ref: 'Q26', concept: 'carbuncle-suppurative', page: 5, stem: 'Which of the following is acute suppurative inflammation:', key: 'E', options: ['Fibrinous inflammation', 'Membranous inflammation', 'Necrotizing inflammation', 'Catarrhal inflammation', 'Carbuncle'], clue: 'a carbuncle is a cluster of pus-forming abscesses', reasons: ['fibrinous inflammation is non-suppurative and fibrin-rich', 'membranous inflammation produces a surface membrane', 'necrotizing inflammation is defined by tissue necrosis rather than pus', 'catarrhal inflammation is a superficial mucosal discharge pattern', 'carbuncle is an acute suppurative lesion'] },
  { ref: 'Q27', concept: 'suppurative-features', page: 6, stem: 'Concerning suppurative inflammation all of following are correct except:', key: 'D', options: ['Localized collection of pus is called abscess', 'Carbuncle is an example of suppurative inflammation', 'Spreading suppurative inflammation is called cellulitis', 'Tuberculosis is a type of localized inflammation', 'For suppuration to occur necrosis and excess neutrophils infiltration are necessity'], clue: 'tuberculosis is granulomatous, while the other statements describe suppuration', reasons: ['an abscess is localized pus and is correct', 'a carbuncle is a suppurative example', 'cellulitis is spreading diffuse suppuration', 'tuberculosis is not a localized suppurative inflammation and is the exception', 'necrosis plus abundant neutrophils are required for pus formation'] },
  { ref: 'Q28', concept: 'catarrhal', page: 6, stem: 'Catarrhal inflammation is characterized by:', key: 'B', options: ['Deep ulceration', 'Discharge from superficial mucosal surfaces', 'Abscess formation', 'Cellulitis', 'Granulomatous reaction'], clue: 'catarrhal inflammation is a mild superficial mucosal discharge pattern', reasons: ['deep ulceration is not the defining catarrhal pattern', 'superficial mucosal discharge is characteristic of catarrhal inflammation', 'abscess formation is localized suppuration', 'cellulitis is diffuse suppuration', 'granulomatous reaction is chronic specific inflammation'] },
]

for (const question of questions) {
  const concept = byHandle[question.concept]
  question.id = `Q-HU102-PAT-INF-F8-${question.ref}`
  question.asmCit = `CIT-HU102-F8P2-${question.ref}-ASM`
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
${concept.article === outcomesArticle ? suppurationArticle : outcomesArticle}
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
0.85
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
+${lecture1}
${assessment}`

const explain = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive source clue is that ${question.clue}. Matching the sequence, systemic mediator, lesion definition or morphologic pattern makes the printed key reproducible. This record remains Draft pending review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive source clue is that ${question.clue}, which supports ${question.options[correct]}. The alternative belongs to a different stage, mediator action or inflammatory pattern. Keeping those discriminators separate prevents a superficial word match.`
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
${['Q09', 'Q20', 'Q21', 'Q23', 'Q25', 'Q27'].includes(question.ref) ? 'Moderate' : 'Easy'}
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Inflammation > ${concept.micro}
## clinical_relevance
0.85
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
${['Q09', 'Q20', 'Q21', 'Q23', 'Q25', 'Q27'].includes(question.ref) ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${['Q09', 'Q20', 'Q21', 'Q23', 'Q25', 'Q27'].includes(question.ref) ? 60 : 45}
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
Exact source wording and lettered option order are preserved, including source spelling. No official sitting, marks, recurrence or candidate response is inferred.${concept.reuseId ? ' This row reuses the governed Family-8 Part-1 vascular-sequence concept by exact ID.' : ''}
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
${id === outcomesArticle ? 'Acute-inflammatory outcomes and effects' : 'Suppurative and catarrhal inflammation'}
## nanotopic
Abscess, fever, swelling, chemotaxis and pus
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
HU-BMS-102 > Pathology > Inflammation > ${id === outcomesArticle ? 'Outcomes and systemic effects' : 'Suppurative and catarrhal patterns'}
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

const outcomeConcepts = concepts.filter((concept) => concept.article === outcomesArticle)
const suppurationConcepts = concepts.filter((concept) => concept.article === suppurationArticle)
const articles = [
  articleRow({ id: outcomesArticle, title: 'Acute inflammation outcomes: fever, swelling, chemotaxis and abscess chronicity', aliases: ['Systemic and local effects of acute inflammation', 'Inflammatory outcomes and leukocyte direction'], subset: outcomeConcepts, other: suppurationArticle,
    summary: 'Acute inflammation combines protective local events with systemic effects and possible harm. IL-1 drives hypothalamic fever, chemotaxis directs leukocytes, swelling can impair function, and incompletely evacuated suppuration can become chronic and eventually contribute to amyloidosis.',
    sections: `### Definition\n${byHandle['chemotaxis-definition'].display} ${byHandle['il1-fever'].display}\n\n### Mechanism\n${byHandle['vascular-sequence'].display} Fluid escape and emigration prepare leukocytes to follow chemotactic gradients into tissue.\n\n### Key determinants\n${byHandle['harmful-swelling'].display} Protective effects include dilution, fibrin, phagocytosis and immune stimulation.\n\n### Clinical significance\n${byHandle['abscess-progression'].display} Chronicity, not the initial acute abscess, creates the prolonged inflammatory setting for secondary amyloidosis.`,
    loses: ['Selecting swelling as a useful effect when tissue pressure impairs function.', 'Choosing a vasoactive mediator instead of IL-1 for hypothalamic fever.', 'Placing chronic abscess before incomplete evacuation in the sequence.'], notes: 'The vascular-sequence concept is reused from Part 1 by exact ID, with reciprocal article and evidence links added.', sources: [lecture1, lecture2, assessment], basis: 'Helwan Inflammation 1 p7, p30, p34 and p36 plus Inflammation 2 p42 supplies local teaching; Family-8 p2–5 supplies exact inline keys.' }),
  articleRow({ id: suppurationArticle, title: 'Suppurative and catarrhal inflammation: abscess, cellulitis, carbuncle and mucosal discharge', aliases: ['Patterns of acute inflammation', 'Abscess and catarrhal inflammation'], subset: suppurationConcepts, other: outcomesArticle,
    summary: 'Suppurative inflammation produces pus through necrosis and abundant neutrophils. Localized pus forms an abscess, diffuse spread forms cellulitis, staphylococci favour abscesses, and a carbuncle is a clustered suppurative lesion; catarrhal inflammation instead produces superficial mucosal discharge.',
    sections: `### Definition\n${byHandle['abscess-definition'].display} ${byHandle['catarrhal'].display}\n\n### Mechanism\n${byHandle['staph-suppuration'].display} Coagulase helps localize the process, while necrosis and abundant neutrophils generate pus.\n\n### Key determinants\n${byHandle['suppurative-features'].display} ${byHandle['carbuncle-suppurative'].display}\n\n### Clinical significance\nAn abscess is localized, cellulitis is diffuse, and a carbuncle is a connected cluster of cutaneous abscesses. A superficial mucosal discharge points away from pus-forming lesions and toward catarrhal inflammation.`,
    loses: ['Calling cellulitis a localized pus collection.', 'Classifying tuberculosis as localized suppuration.', 'Calling catarrhal discharge an abscess or granulomatous reaction.'], notes: 'Exact source wording is retained in the questions; the teaching text uses standardized terminology.', sources: [lecture2, assessment], basis: 'Helwan Inflammation 2 p5–6, p14 and p22 supplies local teaching; Family-8 p3, p5–6 supplies exact inline keys.' }),
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
  ['abscess-definition', 'associated_with', 'abscess-progression', 'an incompletely evacuated acute abscess can become chronic'],
  ['il1-fever', 'associated_with', 'harmful-swelling', 'fever and swelling are systemic and local consequences of acute inflammation'],
  ['vascular-sequence', 'associated_with', 'chemotaxis-definition', 'emigration precedes directed tissue movement'],
  ['staph-suppuration', 'associated_with', 'abscess-definition', 'staphylococci characteristically form localized abscesses'],
  ['abscess-definition', 'associated_with', 'suppurative-features', 'the abscess is the localized form of suppurative inflammation'],
  ['carbuncle-suppurative', 'associated_with', 'abscess-definition', 'a carbuncle is a cluster of connected abscesses'],
  ['catarrhal', 'contrasts_with', 'suppurative-features', 'catarrhal mucosal discharge differs from pus-forming abscess and cellulitis'],
  ['harmful-swelling', 'associated_with', 'vascular-sequence', 'vascular leakage produces interstitial swelling'],
  ['carbuncle-suppurative', 'associated_with', 'staph-suppuration', 'staphylococcal suppuration forms clustered abscesses'],
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
  ['evidence/HU-BMS-102-pathology-family8-part2-sources.md', sourceRows],
  ['concept/HU-BMS-102-pathology-family8-part2-concepts.md', concepts.map((concept) => concept.reuseId ? sparseConcept(concept) : fullConcept(concept)).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family8-part2-articles.md', articles],
  ['question/HU-BMS-102-pathology-family8-part2-mcq.md', questions.map(questionRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part2-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part2-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family8-part2-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family8-part2-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '8-part2', refs: questions.map((question) => `F8-${question.ref}`), released: { sources: 3, articles: 2, concepts: concepts.length, newConcepts: concepts.filter((concept) => !concept.reuseId).length, conceptReuses: concepts.filter((concept) => concept.reuseId).length, questions: questions.length, claims: concepts.length, citations: concepts.length + questions.length, spans: concepts.length, relations: relationDefs.length }, remainingRoutine: 33, exclusions: { wordingRepeats: ['F8-Q18', 'F8-Q33', 'F8-Q34', 'F8-Q50', 'F8-Q51', 'F8-Q52'] }, holds: { questionableKeys: ['F8-Q17', 'F8-Q49', 'F8-Q56', 'F8-Q60', 'F8-Q68'], family7QuestionableKeys: ['F7-Q10', 'F7-Q13', 'F7-Q23', 'F7-Q33'], priorFamily5KeyConflicts: ['A01', 'A16'], family6SpecialSource: ['SC07', 'UC10', 'UC15'], family6UnmarkedWritten: ['UC16', 'UC17', 'UC18', 'UC19', 'UC20'] } }, null, 2))
