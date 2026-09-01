import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = join(process.cwd(), 'docs/Helwan-Source-Imports')
const screenshot = 'src_8748f9e48befcfdfb730'
const lecture = 'src_77aa66ea23a10b6015fd'
const article = 'ART-HU-BMS102-MIC-F14P1-AEROTOLERANT-OXYGEN-TOLERANCE'
const relatedFoundationArticle = 'ART-HU-BMS102-MIC-F13P1-PROKARYOTIC-CELL-WALL'
const concept = 'CON-INF-66B9112A9C5017'
const question = 'Q-HU102-MIC-F14-Q09'
const claim = 'CLM-HU102-F14P1-Q09-01'
const curriculumCitation = 'CIT-HU102-F14P1-Q09-CURR'
const screenshotCitation = 'CIT-HU102-F14P1-Q09-IMG'
const span = 'SPN-HU102-F14P1-Q09-01'

const sources = `# Item
## id
${screenshot}
## title
Lec 2 bacterial physiology and metabolism screenshot — slide 23 of 28
## institution
Helwan University local corpus
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.56.58.jpg
## media_type
image/jpeg
## languages
en
## page_count
1
## sha256
8748f9e48befcfdfb73092e90fa846ed79e156a6645560d7ae0bd8cc8a501166
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
Tier-6 auxiliary raster capture of slide 23 from the governed bacterial-physiology deck. A straight red underline visibly reveals the selected teaching answer, but the screenshot is not an official examination or official key and supplies no sitting, marks or recurrence authority.
## is_assessment
yes
---

# Item
## id
${lecture}
## title
Bacterial physiology and metabolism — Lec 2
## institution
Faculty of Medicine, Helwan University; Reem Abdelrahman
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Microbiology/Theoretical/Lec 2 - Bacterial Physiology & Metabolism/lec2 bacterial physiology and metabolism.pdf
## media_type
application/pdf
## languages
en
## page_count
28
## sha256
77aa66ea23a10b6015fdd0fdc7f575139851821dc0042e9db1f7e87c8af717f4
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
Tier-4 direct Helwan theoretical teaching carrier dated 2021. Page 20 teaches the oxygen-response classes and page 23 embeds four red teaching-answer reveals. It is not an official examination or official key and supplies no sitting, marks or recurrence authority.
## is_assessment
no`

const conceptBody = `# Item
## label
Aerotolerant bacteria use fermentative metabolism but tolerate oxygen because they possess superoxide dismutase
## id
${concept}
## canonical_key
aerotolerant-fermentation-oxygen-tolerance-sod
## aliases
Aerotolerant bacterial oxygen tolerance
Aerotolerant fermentation and superoxide dismutase
## arabic_label

## arabic_aliases
[clear]
## definition
Aerotolerant bacteria retain a fermentative, anaerobic pattern of energy metabolism but can survive exposure to oxygen. In the Helwan lecture, this tolerance is attributed to possession of superoxide dismutase, which helps remove toxic superoxide radicals; oxygen tolerance does not mean that oxygen is used for aerobic respiration.
## explicit_objective
Identify the fermentative metabolism plus superoxide-dismutase-mediated oxygen tolerance that distinguishes aerotolerant bacteria in the source classification.
## pitfalls
Equating oxygen tolerance with oxygen-dependent respiration, confusing aerotolerant bacteria with microaerophiles, or treating a tier-4 teaching reveal as an official examination key.
## concept_type
classification
## status
Draft
## support_mode
direct_statement
## subject
inf
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
HU-BMS-102 > Microbiology > Bacterial physiology and metabolism > Gaseous requirements > Aerotolerant bacteria
## article_ids
${article}
## related_article_ids
${relatedFoundationArticle}
## related_concept_ids

## resource_ids
${lecture}
${screenshot}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.55
## exam_weight_by_year
HU_Y1=0.55
## clinical_relevance
0.52
## academic_relevance
0.92
## weight_confidence
0.50
## confidence
0.88
## exam_signal
${lecture} | tier-4 direct Helwan teaching plus printed teaching-answer reveal | Family-14 Q09 / lecture p23 | not an official key; ${screenshot} | tier-6 auxiliary occurrence | exact visible stem, options and red-underlined answer D
## atomic_claim_ids
${claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p20] Aerotolerant anaerobes have a fermentative (anaerobic) pattern of metabolism but can tolerate the presence of oxygen because they possess superoxide dismutase.
[Teaching reveal p23 / screenshot Q09] Which of the following statements best describes aerotolerant bacteria? Answer reveal: Have a fermentative (anaerobic) pattern of metabolism but can tolerate the presence of oxygen because they possess superoxide dismutase.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
The source establishes a local teaching reveal, not an official examination key. Independent medical verification and Helwan microbiology faculty review remain required before publication.
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
sourceCandidateIds: Family 14 completed the governed search-before-mint gate in the triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New Family-14 question-led concept after the governed no-same-scope decision.`

const questionBody = `# Item
## id
${question}
## title
Which of the following statements best describes aerotolerant bacteria?
## subject
inf
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
Which of the following statements best describes aerotolerant bacteria?
## format
single best answer
## derived_from

## correct_answer
D
## answer_a
Some bacteria will only grow in the presence of oxygen.
## explanation_a
This describes obligate aerobic growth, not aerotolerant metabolism. Aerotolerant bacteria do not require oxygen for energy generation; the Helwan teaching identifies a fermentative pattern with oxygen tolerance.
## answer_b
These require for growth a low oxygen tension; lower than that present in the atmosphere.
## explanation_b
This describes microaerophilic growth at oxygen tension below the atmosphere. The tested aerotolerant group remains fermentative and tolerates oxygen through superoxide dismutase.
## answer_c
These bacteria grow only in the complete absence of 02 and die in its presence.
## explanation_c
This describes obligate anaerobes, for which oxygen is toxic. Aerotolerant bacteria instead tolerate oxygen despite retaining fermentative metabolism.
## answer_d
Have a fermentative (anaerobic) pattern of metabolism but can tolerate the presence of oxygen because they possess superoxide dismutase.
## explanation_d
This is the exact source-revealed answer. The lecture teaches that aerotolerant bacteria use fermentative metabolism yet tolerate oxygen because they possess superoxide dismutase. The reveal is teaching evidence, not an official examination key.
## topic
Bacterial physiology and metabolism
## subtopic
Gaseous requirements
## difficulty
Moderate
## question_type
Microbiology
## main_concept
${concept}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Bacterial physiology and metabolism > Gaseous requirements > Aerotolerant bacteria
## clinical_relevance
0.52
## academic_relevance
0.92
## cognitive_effort_score
0.44
## exam_weight_by_year
HU_Y1=0.55
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
42
## exam_relevance
5
## contextual_concept_ids

## library_ids
${article}
## resource_ids
${screenshot}
${lecture}
## learning_objective
Identify the fermentative metabolism plus superoxide-dismutase-mediated oxygen tolerance that distinguishes aerotolerant bacteria in the source classification.
## media_recommendations

## source_citation
${screenshot}, slide 23 of 28, Family-14 Q09: exact raster-visible stem, option order and red-underlined option D preserved. ${lecture}, pp20 and 23: direct teaching plus the same embedded teaching-answer reveal. These are tier-6 auxiliary and tier-4 teaching sources respectively; neither is an official examination or official key, and no sitting, marks or recurrence are inferred.
## attachments

## attached_image

## author_notes
Exact source wording, capitalization, punctuation, option order and printed teaching answer D are preserved, including the source’s 02 typography in option C. The question and linked teaching remain Draft/needs_evidence pending independent medical and Helwan microbiology faculty review. Family-14 Q01–Q06 and Q11–Q13 remain unkeyed backlog; Q07, Q08 and Q10 remain cross-university dependency holds. None has a student-facing record in this slice.
## estimated_seconds
55
## randomise_answers
yes`

const articleBody = `# Item
## id
${article}
## title
Aerotolerant bacterial metabolism and oxygen tolerance
## arabic_title

## aliases
Aerotolerant fermentation and superoxide dismutase
Aerotolerant bacterial oxygen response
## subject
inf
## topic
Microbiology
## subtopic
Bacterial physiology and metabolism
## microtopic
Gaseous requirements
## nanotopic
Aerotolerant bacteria
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
Medium
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
Aerotolerant bacteria use fermentative metabolism rather than oxygen-dependent respiration, yet tolerate oxygen because superoxide dismutase helps neutralize toxic superoxide radicals. Oxygen tolerance therefore does not mean oxygen requirement.
## sections
### Definition
Aerotolerant bacteria use fermentative metabolism but tolerate oxygen because they possess superoxide dismutase. In the governed Helwan lecture, this tolerance is attributed to superoxide dismutase.

### Mechanism
Fermentation supplies energy without using oxygen as the terminal electron acceptor. Aerotolerant organisms therefore do not gain their defining energy pathway from oxygen even when oxygen is present.

### Key determinants
Exposure to oxygen can generate reactive oxygen species such as superoxide. Superoxide dismutase converts superoxide into less reactive products and is the enzyme explicitly named by the source to explain aerotolerance.

### Distinguishing nearby classes
Obligate aerobes require oxygen, obligate anaerobes cannot grow in its presence, and microaerophiles require oxygen below atmospheric tension. Aerotolerant bacteria are distinguished by tolerance without aerobic dependence.

### Clinical significance
Oxygen-response classification helps explain cultivation requirements and laboratory recovery patterns. This local source record is educational and does not replace organism-specific laboratory guidance.

### Authority limitation
The lecture and screenshot preserve a teaching-answer reveal, not an official examination key. The record has no sitting, marks, recurrence or official-key authority and remains Draft pending medical and faculty review.
## published_summary

## published_sections

## hold_these
Aerotolerant bacteria ferment but tolerate oxygen through superoxide dismutase
They can tolerate oxygen because the source states that they possess superoxide dismutase.
Oxygen tolerance is not the same as an oxygen requirement for energy generation.
## lose_the_mark
Calling aerotolerant bacteria obligate aerobes.
Confusing aerotolerant bacteria with microaerophiles.
Saying that aerotolerant bacteria die whenever oxygen is present.
Promoting a teaching reveal to an official examination key.
## related_concepts
${concept}
## related_articles
${relatedFoundationArticle}
## question_ids
${question}
## resource_ids
${lecture}
${screenshot}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Bacterial physiology and metabolism > Gaseous requirements > Aerotolerant bacteria
## university_notes
hu: Restricted to HU-BMS-102 Year 1. The tier-4 Helwan lecture supplies direct teaching and a printed teaching reveal; the tier-6 screenshot preserves the exact visible occurrence. Neither is an official exam key.
## annotations
### definition_of · ${concept}
Quote: Aerotolerant bacteria use fermentative metabolism but tolerate oxygen because they possess superoxide dismutase.
Block: body
## media

## media_recommendations

## callout_evidence
### Aerotolerant bacteria ferment but tolerate oxygen through superoxide dismutase
Claims: ${claim}
Citations: ${curriculumCitation}, ${screenshotCitation}
Span: ${span}
## article_source_ids
${lecture}
${screenshot}
## claim_ids
${claim}
## span_ids
${span}
## publication_gate
needs_evidence
## evidence_basis
Direct tier-4 Helwan teaching and an embedded teaching-answer reveal, paired with the exact tier-6 raster occurrence. Neither source is an official examination or official key.
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication. No official exam, official key, sitting, marks or recurrence evidence is available.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-14 Q01–Q06 and Q11–Q13 remain valid unkeyed backlog. Q07, Q08 and Q10 remain cross-university exact-concept dependency holds. No rival concept or student-facing record was created for any held item.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; source images are cited but not redistributed.
mediaRecommendations: No additional visual is required for this tested distinction.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const claimBody = `# Item
## id
${claim}
## concept_id
${concept}
## subject
inf
## predicate
uses and tolerates
## object
fermentative metabolism and oxygen through possession of superoxide dismutase
## display_text
Aerotolerant bacteria use fermentative metabolism but tolerate oxygen because they possess superoxide dismutase.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.88
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: direct tier-4 Helwan teaching plus a printed teaching-answer reveal and a tier-6 screenshot occurrence; no official-key authority inferred. limitation: independent medical verification and Helwan microbiology faculty review remain required before publication.`

const citationsBody = `# Item
## id
${curriculumCitation}
## claim_id
${claim}
## resource_id
${lecture}
## evidence_role
local_curriculum
## support_span
Aerotolerant anaerobes have a fermentative (anaerobic) pattern of metabolism but can tolerate the presence of oxygen because they possess superoxide dismutase.
## locator_type
page
## locator_page
20, 23
## locator_section
Bacterial Gaseous Requirement — Oxygen
## locator_detail
PDF p20 direct teaching; p23 exact MCQ and source-native red teaching-answer reveal
## context_note
Tier-4 local curriculum and printed teaching reveal only. This is not an official examination or official key and supplies no sitting, marks or recurrence authority.
## confidence
0.93
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
Which of the following statements best describes aerotolerant bacteria? Answer reveal: Have a fermentative (anaerobic) pattern of metabolism but can tolerate the presence of oxygen because they possess superoxide dismutase.
## locator_type
page
## locator_page
1
## locator_section
Lec 2 bacterial physiology and metabolism slide 23 of 28 — Family-14 Q09
## locator_detail
Exact screenshot stem, option order and straight red-underlined option D
## context_note
Tier-6 auxiliary screenshot occurrence. The governed tier-4 full carrier proves that the underline is embedded in the lecture, but neither source supplies official exam-key authority.
## confidence
0.93
## counts_as_claim_evidence
no`

const spanBody = `# Item
## id
${span}
## article_id
${article}
## section_id
art-hu-bms102-mic-f14p1-aerotolerant-oxygen-tolerance-definition
## text
Aerotolerant bacteria use fermentative metabolism but tolerate oxygen because they possess superoxide dismutase.
## claim_ids
${claim}
## citation_ids
${curriculumCitation}
${screenshotCitation}`

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family14-part1-sources.md', sources],
  ['article/HU-BMS-102-microbiology-family14-part1-articles.md', articleBody],
  ['concept/HU-BMS-102-microbiology-family14-part1-concepts.md', conceptBody],
  ['evidence/HU-BMS-102-microbiology-family14-part1-claims.md', claimBody],
  ['evidence/HU-BMS-102-microbiology-family14-part1-citations.md', citationsBody],
  ['evidence/HU-BMS-102-microbiology-family14-part1-spans.md', spanBody],
  ['question/HU-BMS-102-microbiology-family14-part1-mcq.md', questionBody],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '14-part1', refs: ['Q09'], keys: 'D',
  released: { sources: 2, articles: 1, concepts: 1, newConcepts: 1, questions: 1, claims: 1, citations: 2, spans: 1, relations: 0 },
  holds: {
    unkeyed: ['Q01', 'Q02', 'Q03', 'Q04', 'Q05', 'Q06', 'Q11', 'Q12', 'Q13'],
    crossUniversityDependency: ['Q07', 'Q08', 'Q10'],
  },
}, null, 2))
