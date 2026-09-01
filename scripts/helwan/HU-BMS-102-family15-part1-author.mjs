import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = join(process.cwd(), 'docs/Helwan-Source-Imports')
const screenshot = 'src_26552d7fe7222dafad6c'
const carrier = 'src_bd6d792541ed79e0e692'
const article = 'ART-HU-BMS102-MIC-F15P1-ACTION-VS-MODIFIED-TARGET-RESISTANCE'
const concept = 'CON-INF-8C64A634B71682'
const targetConcept = 'CON-INF-570A1012DB9324'
const question = 'Q-HU102-MIC-F15-Q03'
const claim = 'CLM-HU102-F15P1-Q03-01'
const targetClaim = 'CLM-HU102-F11P2-Q18-01'
const curriculumCitation = 'CIT-HU102-F15P1-Q03-CURR'
const screenshotCitation = 'CIT-HU102-F15P1-Q03-IMG'
const targetCitation = 'CIT-HU102-F11P2-Q18-CURR'
const span = 'SPN-HU102-F15P1-Q03-01'
const actionArticle = 'ART-HU-BMS102-MIC-F11P1-CELL-WALL-MECHANISMS'
const proteinArticle = 'ART-HU-BMS102-MIC-F11P1-RIBOSOME-FOLATE-MECHANISMS'
const resistanceArticle = 'ART-HU-BMS102-MIC-F11P2-RESISTANCE-MECHANISMS'

const sources = `# Item
## id
${screenshot}
## title
Antimicrobial chemotherapy interactive-questions screenshot — slide 42 of 45
## institution
Helwan University local corpus
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.57.04.jpg
## media_type
image/jpeg
## languages
en
## page_count
1
## sha256
26552d7fe7222dafad6c6b4a585606447f67cb57ce09d171fc9d5cdba0e87463
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
Tier-6 auxiliary raster capture of slide 42 from the governed antimicrobial-chemotherapy deck. An orange arrow visibly points to option D, but the screenshot alone is not an official examination or official key and supplies no sitting, marks or recurrence authority. The exact tier-4 carrier independently prints the answer on its following page.
## is_assessment
yes`

const conceptBody = `# Item
## label
Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action
## id
${concept}
## canonical_key
antimicrobial-action-mechanism-exception-modified-target
## aliases
Modified target as antimicrobial-action exception
Antimicrobial action versus target-modification resistance
## arabic_label

## arabic_aliases
[clear]
## definition
The Helwan lecture classifies inhibition of bacterial cell-wall, protein and nucleic-acid synthesis as direct mechanisms of antimicrobial action. Synthesis or alteration of a modified drug target instead changes the bacterial target and is classified under antimicrobial resistance, so it is the exception in the source option set.
## explicit_objective
Distinguish direct inhibition of bacterial biosynthetic processes from modified-target resistance and identify synthesis of a modified target as the source-framed exception.
## pitfalls
Treating every phrase involving an antimicrobial target as a mechanism of drug action, overlooking the EXCEPT wording, or promoting a printed teaching answer to an official examination key.
## concept_type
classification
## status
Draft
## support_mode
direct_statement
## subject
pharm
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-MIC
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Mechanisms of action and resistance > Modified-target exception
## article_ids
${article}
## related_article_ids
${actionArticle}
${proteinArticle}
${resistanceArticle}
## related_concept_ids
${targetConcept}
## resource_ids
${carrier}
${screenshot}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.68
## exam_weight_by_year
HU_Y1=0.68
## clinical_relevance
0.70
## academic_relevance
0.96
## weight_confidence
0.58
## confidence
0.91
## exam_signal
${carrier} | tier-4 direct Helwan teaching plus printed teaching-answer page | Family-15 Q03 / carrier pp43–44 | not an official key; ${screenshot} | tier-6 auxiliary occurrence | exact visible stem, options and arrow to D
## atomic_claim_ids
${claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching pp12–22] Inhibition of bacterial cell wall synthesis, inhibition of bacterial protein synthesis, and inhibition of bacterial nucleic acid synthesis are mechanisms of action; modified targets are taught under mechanisms of resistance.
[Interactive question pp43–44 / screenshot Q03] All of the following are mechanisms of action of antimicrobial agents EXCEPT: ... d. Synthesis of modified target. Printed answer: d.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
The source answer is internally coherent with its action-versus-resistance classification, but it has teaching-answer authority only.
## evidence_gaps
No official examination, official answer key, sitting, marks or recurrence evidence is available. Independent medical verification and Helwan microbiology faculty review remain required before publication.
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Microbiology faculty
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
resourceOccurrenceIds: Hand-authored from exact governed page and screenshot occurrences.
sourceCandidateIds: Family 15 completed the governed search-before-mint gate in the triage.
mergeIds: No merge occurred; the Family-12 action-mechanism umbrella is broader, while this concept captures the exact action-versus-resistance exception.
rejectedMergeCandidateIds: Existing altered-PBP resistance is a narrower example and remains linked rather than merged.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New exact-grain Family-15 concept linked to, but not rivaling, the existing altered-PBP resistance example.`

const articleBody = `# Item
## id
${article}
## title
Direct antimicrobial action versus modified-target resistance
## arabic_title

## aliases
Antimicrobial mechanism-of-action exception
Modified target as resistance rather than drug action
## subject
pharm
## topic
Microbiology
## subtopic
Antimicrobial chemotherapy
## microtopic
Mechanisms of action and resistance
## nanotopic
Modified-target exception
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-MIC
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
5
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Microbiology faculty
## final_publisher
Admin team
## summary
Direct mechanisms of antimicrobial action inhibit bacterial structures or biosynthetic processes. A bacterium that synthesizes or alters a modified target changes drug susceptibility and therefore demonstrates resistance, making modified-target synthesis the exception in the governed option set.
## sections
### Definition
Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action. The distinction is defined by whether the drug acts on the organism or the organism changes the target on which the drug would act.

### Mechanism
Inhibitors of cell-wall synthesis interfere with peptidoglycan construction; protein-synthesis inhibitors act on bacterial ribosomes; and nucleic-acid synthesis inhibitors affect bacterial DNA or RNA processes. These are direct drug actions on microbial targets.

### Key determinants
Modified-target resistance arises when the bacterium changes the binding target, reducing the drug’s effective interaction. The existing altered-PBP concept is one specific example, whereas this record tests the broader classification boundary.

### Clinical significance
Separating drug action from bacterial resistance prevents misclassification of treatment targets and resistance mechanisms. The record is foundational educational content rather than organism-specific prescribing guidance.

### Exam approach
Read the EXCEPT instruction first. Cell-wall, protein and nucleic-acid synthesis inhibition are action mechanisms in the printed options; synthesis of a modified target belongs to resistance and is therefore the exception.

### Authority limitation
The full lecture prints answer D on a separate answer page and the screenshot preserves the visible occurrence. This is a teaching answer, not an official examination key, and no sitting, marks or recurrence are inferred.
## published_summary

## published_sections

## hold_these
Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action
Cell-wall, protein and nucleic-acid synthesis inhibition are direct antimicrobial actions in the source classification.
Modified penicillin-binding proteins are a specific example of altered-target resistance.
## lose_the_mark
Ignoring the EXCEPT instruction.
Classifying modified-target synthesis as direct drug action.
Confusing target modification with enzymatic drug inactivation.
Calling the printed teaching answer an official exam key.
## related_concepts
${concept}
${targetConcept}
## related_articles
${actionArticle}
${proteinArticle}
${resistanceArticle}
## question_ids
${question}
## resource_ids
${carrier}
${screenshot}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Mechanisms of action and resistance > Modified-target exception
## university_notes
hu: Restricted to HU-BMS-102 Year 1. The tier-4 Helwan lecture supplies direct teaching and a printed answer page; the tier-6 screenshot preserves the exact occurrence. Neither is an official exam key.
## annotations
### definition_of · ${concept}
Quote: Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action.
Block: body
## media

## media_recommendations

## callout_evidence
### Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action
Claims: ${claim}
Citations: ${curriculumCitation}, ${screenshotCitation}
Span: ${span}
## article_source_ids
${carrier}
${screenshot}
## claim_ids
${claim}
## span_ids
${span}
## publication_gate
needs_evidence
## evidence_basis
Direct tier-4 Helwan teaching and an explicit printed teaching-answer page, paired with the exact tier-6 raster occurrence. Neither source is an official examination or official key.
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication. No official exam, official key, sitting, marks or recurrence evidence is available.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-15 Q01 and Q02 are valid answered completion prompts but remain unmarked-written/schema holds; neither receives a student-facing record. The linked altered-PBP concept is a narrower resistance example, not a duplicate of this classification exception.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; source images are cited but not redistributed.
mediaRecommendations: No additional visual is required for this tested classification.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const questionBody = `# Item
## id
${question}
## title
All of the following are mechanisms of action of antimicrobial agents EXCEPT:
## subject
pharm
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
All of the following are mechanisms of action of antimicrobial agents EXCEPT:
## format
single best answer
## derived_from

## correct_answer
D
## answer_a
Inhibition of bacterial cell wall synthesis
## explanation_a
This is a direct mechanism of antimicrobial action because the drug interferes with bacterial cell-wall construction. It is therefore not the exception requested by the stem.
## answer_b
Inhibition of bacterial protein synthesis
## explanation_b
This is a direct antimicrobial mechanism mediated by inhibition of bacterial ribosomal function. It belongs to the source’s action-mechanism list and is not the exception.
## answer_c
Inhibition of bacterial nucleic acid synthesis
## explanation_c
This is a direct mechanism of antimicrobial action through interference with bacterial DNA or RNA processes. It therefore remains within the action-mechanism classification.
## answer_d
Synthesis of modified target
## explanation_d
This is the exact source-printed answer. Synthesis or alteration of a modified target is classified as a bacterial resistance mechanism rather than a direct mechanism by which an antimicrobial agent acts. The answer has teaching authority only and is not promoted to an official examination key.
## topic
Antimicrobial chemotherapy
## subtopic
Mechanisms of action and resistance
## difficulty
Moderate
## question_type
Pharmacology
## main_concept
${concept}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Mechanisms of action and resistance > Modified-target exception
## clinical_relevance
0.70
## academic_relevance
0.96
## cognitive_effort_score
0.52
## exam_weight_by_year
HU_Y1=0.68
## question_only_for
HU_Y1
## concept_ids
${concept}
## years
HU_Y1
## universities
hu
## cognitive_effort
Low
## setting
Academic
## reasoning_level
1
## inferred_difficulty
48
## exam_relevance
6
## contextual_concept_ids
${targetConcept}
## library_ids
${article}
## resource_ids
${screenshot}
${carrier}
## learning_objective
Distinguish direct inhibition of bacterial biosynthetic processes from modified-target resistance and identify synthesis of a modified target as the source-framed exception.
## media_recommendations

## source_citation
${screenshot}, slide 42 of 45, Family-15 Q03: exact raster-visible stem, option order and arrow to option D preserved. ${carrier}, pp43–44: the exact interactive question and separately printed answer D, with pp12–22 teaching the action-versus-resistance distinction. These are tier-6 auxiliary and tier-4 teaching sources respectively; neither is an official examination or official key, and no sitting, marks or recurrence are inferred.
## attachments

## attached_image

## author_notes
Exact source wording, capitalization, punctuation, option order and printed teaching answer D are preserved. The question and linked teaching remain Draft/needs_evidence pending independent medical and Helwan microbiology faculty review. Family-15 Q01 and Q02 remain explicit unmarked completion/written holds and have no student-facing records.
## estimated_seconds
60
## randomise_answers
yes`

const claimBody = `# Item
## id
${claim}
## concept_id
${concept}
## subject
pharm
## predicate
is classified as
## object
a resistance mechanism rather than a direct mechanism of antimicrobial action
## display_text
Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.91
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: direct tier-4 Helwan teaching plus a separately printed teaching answer and a tier-6 screenshot occurrence; no official-key authority inferred. scope: the source option set contrasts direct inhibition of bacterial synthesis with bacterial modification of a drug target.`

const citationsBody = `# Item
## id
${curriculumCitation}
## claim_id
${claim}
## resource_id
${carrier}
## evidence_role
local_curriculum
## support_span
All of the following are mechanisms of action of antimicrobial agents EXCEPT: ... d. Synthesis of modified target. Answers: II) d.
## locator_type
page
## locator_page
12–22, 43–44
## locator_section
Antimicrobial mechanisms of action, resistance mechanisms, interactive questions and answers
## locator_detail
PDF pp12–20 direct action teaching; pp21–22 resistance teaching; p43 exact MCQ; p44 printed answer D
## context_note
Tier-4 local curriculum and printed teaching answer only. The action-versus-resistance distinction is internally coherent, but this is not an official examination or official key and supplies no sitting, marks or recurrence authority.
## confidence
0.95
## counts_as_claim_evidence
no
---

# Item
## id
${screenshotCitation}
## claim_id
${claim}
## resource_id
${screenshot}
## evidence_role
auxiliary_assessment
## support_span
All of the following are mechanisms of action of antimicrobial agents EXCEPT: ... d. Synthesis of modified target.
## locator_type
page
## locator_page
1
## locator_section
Antimicrobial chemotherapy slide 42 of 45 — Family-15 Q03
## locator_detail
Exact screenshot stem, option order and orange arrow to option D
## context_note
Tier-6 auxiliary screenshot occurrence. The governed tier-4 full carrier supplies the explicit answer page absent from this raster; neither source supplies official exam-key authority.
## confidence
0.92
## counts_as_claim_evidence
no`

const spanBody = `# Item
## id
${span}
## article_id
${article}
## section_id
art-hu-bms102-mic-f15p1-action-vs-modified-target-resistance-definition
## text
Synthesis of a modified target is a resistance mechanism rather than a direct mechanism of antimicrobial action.
## claim_ids
${claim}
## citation_ids
${curriculumCitation}
${screenshotCitation}`

const relationBody = `# Item
## source
${concept}
## type
associated_with
## target
${targetConcept}
## evidence_claim_ids
${claim}
${targetClaim}
## citation_ids
${curriculumCitation}
${targetCitation}
## verification_status
needs_evidence
## confidence
0.88
## qualifiers
scope: the broad classification exception is instantiated by alteration of penicillin-binding proteins as a specific modified-target resistance mechanism
## reviewer
Medical team, Helwan Microbiology faculty`

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family15-part1-sources.md', sources],
  ['article/HU-BMS-102-microbiology-family15-part1-articles.md', articleBody],
  ['concept/HU-BMS-102-microbiology-family15-part1-concepts.md', conceptBody],
  ['evidence/HU-BMS-102-microbiology-family15-part1-claims.md', claimBody],
  ['evidence/HU-BMS-102-microbiology-family15-part1-citations.md', citationsBody],
  ['evidence/HU-BMS-102-microbiology-family15-part1-spans.md', spanBody],
  ['relations/HU-BMS-102-microbiology-family15-part1-relations.md', relationBody],
  ['question/HU-BMS-102-microbiology-family15-part1-mcq.md', questionBody],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '15-part1', refs: ['Q03'], keys: 'D',
  released: { sources: 1, articles: 1, concepts: 1, newConcepts: 1, questions: 1, claims: 1, citations: 2, spans: 1, relations: 1 },
  reused: { sources: [carrier], concepts: [targetConcept], articles: [actionArticle, proteinArticle, resistanceArticle] },
  holds: { unmarkedWritten: ['Q01', 'Q02'] },
}, null, 2))
