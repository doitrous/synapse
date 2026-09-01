import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = join(process.cwd(), 'docs/Helwan-Source-Imports')
const source = 'src_3dccdd1df7a47ccf25b5'
const article = 'ART-HU-BMS102-PAT-F92-CBL-FATTY-LIVER-MORPHOLOGY'
const concept = 'CON-FND-628E24D7AB0B40'
const relatedConcept = 'CON-FND-4CAD16D517ABF4'
const relatedArticle = 'ART-HU-BMS102-PAT-F10TF2-STEATOSIS-CALCIFICATION-AMYLOID'
const question = 'Q-HU102-PAT-F92-Q01'
const claim = 'CLM-HU102-F92-Q01-01'
const promptCitation = 'CIT-HU102-F92-Q01-PROMPT'
const teachingCitation = 'CIT-HU102-F92-Q01-TEACHING'
const span = 'SPN-HU102-F92-Q01-01'

const canonicalKey = 'diabetes-anemia-hepatomegaly-fatty-liver-signet-ring'
const expectedConcept = `CON-FND-${createHash('sha256').update(canonicalKey).digest('hex').slice(0, 14).toUpperCase()}`
if (expectedConcept !== concept) throw new Error(`Deterministic ID mismatch: ${expectedConcept}`)

const sourceBody = `# Item
## id
${source}
## title
Cell injury 1
## institution
Faculty of Medicine, Helwan University; Enas Megahed Elhosary
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Notes and Summaries/Cell injury lecture 1 1 (1).pdf
## media_type
application/pdf
## languages
en
## page_count
60
## sha256
3dccdd1df7a47ccf25b5c687aa032a7b783c8c6e0a59f33120e234bf9a393bf8
## processing_status
pending
## rights
Local Helwan teaching material held for internal authoring only; no page image is redistributed.
## qualification
Tier-4 direct Helwan pathology lecture. Pages 30–40 teach fatty change and hepatic signet-ring morphology. Page 58 contains a CBL question with a handwritten D/Fatty change reveal; page 59 repeats the item with option A expanded and prints Answer: D Signet ring liver cells. These are local teaching-answer reveals, not an official examination or authenticated official key, and no sitting or marks are claimed.
## is_assessment
yes`

const conceptBody = `# Item
## label
Fatty change can produce signet-ring hepatocytes when a large lipid vacuole displaces the nucleus
## id
${concept}
## canonical_key
${canonicalKey}
## aliases
Signet-ring hepatocytes in fatty liver
Diabetes anemia hepatomegaly fatty-change morphology
## arabic_label

## arabic_aliases
[clear]
## definition
Fatty change, or steatosis, is abnormal triglyceride accumulation within parenchymal cells and commonly affects hepatocytes. Small cytoplasmic lipid globules can coalesce into a large vacuole that displaces the hepatocyte nucleus to one side, creating the signet-ring appearance taught by the source.
## explicit_objective
Link the source vignette of diabetes, anemia and liver enlargement to the biopsy morphology of fatty change with signet-ring hepatocytes.
## pitfalls
Confusing signet-ring fatty-change morphology with apoptosis, hypertrophy or metaplasia; assuming the vignette alone establishes a diagnosis outside the source; or promoting a CBL teaching reveal to an official examination key.
## concept_type
structure_function_relationship
## status
Draft
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Cell injury > Fatty change > Hepatic signet-ring morphology
## article_ids
${article}
## related_article_ids
${relatedArticle}
## related_concept_ids
${relatedConcept}
## resource_ids
${source}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.62
## exam_weight_by_year
HU_Y1=0.62
## clinical_relevance
0.72
## academic_relevance
0.96
## weight_confidence
0.52
## confidence
0.90
## exam_signal
${source} | tier-4 direct Helwan pathology teaching plus local CBL teaching-answer reveals | Family-92 pp58–59 | not an official examination key
## atomic_claim_ids
${claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p32] Fat globules fuse to form a large fat globule which pushes the nucleus to one side: Signet ring appearance.
[CBL p58] Which of the following will be seen in a liver biopsy from a diabetic fatty patient who has anemia and liver enlargement? Handwritten answer D / Fatty change.
[CBL reveal p59] Near-literal repeated item. Answer: D Signet ring liver cells.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
The source establishes a local teaching association and biopsy morphology. It does not establish that the vignette alone is diagnostic in every clinical setting, and the teaching reveals are not an official examination key.
## evidence_gaps
Independent medical verification and named Helwan pathology faculty review remain required before publication. No official examination, authenticated key, sitting, marks or recurrence authority is available.
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
resourceOccurrenceIds: Hand-authored from exact governed pages 30–40 and 58–59.
sourceCandidateIds: Family 92 completed the governed four-query no-same-scope search before minting.
mergeIds: No merge occurred; the existing fatty-liver-predisposition concept tests a different compound risk assertion.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New exact-grain clinical-to-biopsy morphology concept; the neighboring predisposition concept remains linked rather than overwritten.`

const articleBody = `# Item
## id
${article}
## title
Fatty change in liver: from metabolic context to signet-ring morphology
## arabic_title

## aliases
Hepatic steatosis and signet-ring hepatocytes
Family-92 fatty-liver CBL morphology
## subject
fnd
## topic
General pathology
## subtopic
Cell injury
## microtopic
Fatty change
## nanotopic
Hepatic signet-ring morphology
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
6
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
Fatty change is intracellular triglyceride accumulation, especially in hepatocytes. As lipid droplets enlarge and coalesce, a large vacuole may displace the nucleus and give the hepatocyte a signet-ring appearance, the morphology selected by the source’s diabetes–anemia–hepatomegaly CBL.
## sections
### Definition
Fatty change, also called steatosis, is abnormal intracellular triglyceride accumulation in parenchymal cells. The liver is a major site because hepatocytes handle lipid uptake, synthesis, oxidation and export.

### Mechanism
The source frames fatty change as an imbalance between entry or synthesis of fat and its oxidation or release. It lists diabetes among contexts associated with increased fatty-acid delivery and anemia among causes of hypoxia that impair fatty-acid oxidation. These associations support the CBL context but do not make the vignette independently diagnostic.

### Morphology
Affected hepatocytes become swollen and contain cytoplasmic fat globules. Small droplets can merge into a large vacuole that pushes the nucleus to the cell periphery. This displaced-nucleus pattern produces the signet-ring appearance named on the source’s morphology pages.

Fatty change can produce signet-ring hepatocytes when a large lipid vacuole displaces the nucleus

### Key determinants
The defining microscopic clue is a large cytoplasmic lipid vacuole with peripheral displacement of the hepatocyte nucleus. The source calls this a signet-ring appearance and links it to fatty change rather than apoptosis, hypertrophy or metaplasia.

### Differential logic
Apoptosis produces cell shrinkage and apoptotic bodies rather than the large lipid-vacuole pattern. Hypertrophy is enlargement of cells without defining lipid accumulation. Metaplasia is replacement of one differentiated cell type by another and does not describe the vacuolated hepatocyte morphology.

### Exam approach
Map the metabolic and hypoxic context to the tissue named in the vignette, then identify the taught biopsy morphology. In this source, diabetes, anemia and liver enlargement point to fatty change, for which signet-ring liver cells are the revealed best answer.

### Clinical significance
Recognizing steatotic morphology helps connect metabolic or hypoxic stress to reversible hepatocellular injury. The CBL association remains educational and source-bounded; diagnosis in practice requires the full clinical and histologic context.

### Authority limitation
Pages 58 and 59 provide local CBL teaching-answer reveals. They are not an authenticated official examination key, provide no marks or sitting, and remain Draft pending independent medical and Helwan faculty review.
## published_summary

## published_sections

## hold_these
Fatty change can produce signet-ring hepatocytes when a large lipid vacuole displaces the nucleus
Diabetes and anemia are source-taught contexts that can contribute to hepatic fatty change through different mechanisms.
The CBL context does not replace histologic and clinical correlation.
## lose_the_mark
Choosing apoptosis, hypertrophy or metaplasia for the source’s fatty-change biopsy pattern.
Forgetting that signet-ring appearance here describes lipid-vacuole displacement of the hepatocyte nucleus.
Treating the local teaching reveal as an official examination key.
Creating a second record for the near-literal page-59 repeat.
## related_concepts
${concept}
${relatedConcept}
## related_articles
${relatedArticle}
## question_ids
${question}
## resource_ids
${source}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Cell injury > Fatty change > Hepatic signet-ring morphology
## university_notes
hu: Restricted to HU-BMS-102 Year 1. Direct Helwan teaching and CBL answer reveals are preserved as local teaching authority only, not an official exam or authenticated official key.
## annotations
### definition_of · ${concept}
Quote: Fatty change can produce signet-ring hepatocytes when a large lipid vacuole displaces the nucleus
Block: body
## media

## media_recommendations

## callout_evidence
### Fatty change can produce signet-ring hepatocytes when a large lipid vacuole displaces the nucleus
Claims: ${claim}
Citations: ${promptCitation}, ${teachingCitation}
Span: ${span}
## article_source_ids
${source}
## claim_ids
${claim}
## span_ids
${span}
## publication_gate
needs_evidence
## evidence_basis
Direct tier-4 Helwan teaching pages plus exact CBL prompt and teaching-answer reveal occurrences. The answer evidence is local teaching authority only.
## evidence_gaps
Independent medical verification and named Helwan pathology faculty review remain required before publication. No official exam, authenticated official key, marks or sitting is available.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-92 page 59 is a near-literal repeat of page 58; only option A is expanded from “Apoptotic in liver.” to “Apoptotic bodies in liver.” The repeat receives no second student-facing record.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; source pages are cited but not redistributed.
mediaRecommendations: No additional visual is required for this source-tested distinction.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const questionBody = `# Item
## id
${question}
## title
Which of the following will be seen in a liver biopsy from a diabetic fatty patient who has anemia and liver enlargement?
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
Which of the following will be seen in a liver biopsy from a diabetic fatty patient who has anemia and liver enlargement?
## format
single best answer
## derived_from

## correct_answer
D
## answer_a
Apoptotic in liver.
## explanation_a
Apoptosis produces cell shrinkage and apoptotic bodies rather than the source-taught large lipid vacuole that displaces the hepatocyte nucleus. Therefore this is not the revealed best answer.
## answer_b
Liver cell hypertrophy.
## explanation_b
Hypertrophy is increased cell size and does not by itself describe intracellular triglyceride accumulation or the peripheral nuclear displacement taught for fatty change. Therefore this is not the revealed best answer.
## answer_c
Liver cell metaplasia.
## explanation_c
Metaplasia is replacement of one differentiated cell type by another; it does not describe the vacuolated hepatocyte morphology taught by the source. Therefore this is not the revealed best answer.
## answer_d
Signet ring liver cells.
## explanation_d
This is the source-revealed answer. In fatty change, lipid globules may coalesce into a large vacuole that pushes the hepatocyte nucleus to one side and creates a signet-ring appearance. The reveal is local teaching evidence, not an official examination key.
## topic
General pathology
## subtopic
Cell injury
## difficulty
Moderate
## question_type
Pathology
## main_concept
${concept}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Cell injury > Fatty change > Hepatic signet-ring morphology
## clinical_relevance
0.72
## academic_relevance
0.96
## cognitive_effort_score
0.50
## exam_weight_by_year
HU_Y1=0.62
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
Clinical
## reasoning_level
1
## inferred_difficulty
50
## exam_relevance
6
## contextual_concept_ids

## library_ids
${article}
## resource_ids
${source}
## learning_objective
Link the source vignette of diabetes, anemia and liver enlargement to the biopsy morphology of fatty change with signet-ring hepatocytes.
## media_recommendations

## source_citation
${source}, PDF p58: exact CBL stem, four options and handwritten D/Fatty change reveal; p59: near-literal repeat with printed “Answer: D Signet ring liver cells.” Pages 30–40 teach fatty-change mechanisms and morphology. This is tier-4 local teaching-answer authority, not an official examination or authenticated official key, and no sitting or marks are inferred.
## attachments

## attached_image

## author_notes
Literal page-58 wording, grammar, punctuation and option order are preserved. Page 59 expands option A to “Apoptotic bodies in liver.” while leaving the stem and remaining options essentially unchanged; it is excluded as a near-literal repeat rather than released as a second question. The clinical association remains source-bounded and requires histologic and clinical correlation.
## estimated_seconds
70
## randomise_answers
yes`

const claimBody = `# Item
## id
${claim}
## concept_id
${concept}
## subject
fnd
## predicate
can produce
## object
signet-ring hepatocytes when a large lipid vacuole displaces the nucleus
## display_text
Fatty change can produce signet-ring hepatocytes when a large lipid vacuole displaces the nucleus.
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.90
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: direct tier-4 Helwan pathology teaching and local CBL teaching-answer reveals; no official-key authority inferred. limitation: the vignette context does not replace clinical and histologic correlation, and independent medical/faculty review remains required.`

const citationsBody = `# Item
## id
${promptCitation}
## claim_id
${claim}
## resource_id
${source}
## evidence_role
auxiliary_assessment
## support_span
Which of the following will be seen in a liver biopsy from a diabetic fatty patient who has anemia and liver enlargement? Options include Signet ring liver cells; the handwritten reveal marks D and Fatty change.
## locator_type
page
## locator_page
58
## locator_section
CBL — fatty liver biopsy morphology
## locator_detail
Exact first occurrence with literal stem/options and handwritten D/Fatty change reveal
## context_note
Local Helwan CBL teaching-answer occurrence only. It is not an official examination or authenticated official key and provides no sitting or marks.
## confidence
0.92
## counts_as_claim_evidence
no
---

# Item
## id
${teachingCitation}
## claim_id
${claim}
## resource_id
${source}
## evidence_role
local_curriculum
## support_span
Fat globules fuse to form a large fat globule which pushes the nucleus to one side: Signet ring appearance. The near-literal CBL repeat prints Answer: D Signet ring liver cells.
## locator_type
page
## locator_page
32, 39, 59
## locator_section
Fatty change — microscopic appearance and CBL answer reveal
## locator_detail
Direct morphology teaching on p32 and p39; near-literal repeated CBL with printed answer D on p59
## context_note
Tier-4 local curriculum and teaching-answer reveal only. The page-59 repeat is cited for authority but receives no second student-facing record.
## confidence
0.94
## counts_as_claim_evidence
no`

const spanBody = `# Item
## id
${span}
## article_id
${article}
## section_id
art-hu-bms102-pat-f92-cbl-fatty-liver-morphology-morphology
## text
Small droplets can merge into a large vacuole that pushes the nucleus to the cell periphery. This displaced-nucleus pattern produces the signet-ring appearance named on the source’s morphology pages.
## claim_ids
${claim}
## citation_ids
${promptCitation}
${teachingCitation}`

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family92-part1-sources.md', sourceBody],
  ['article/HU-BMS-102-pathology-family92-part1-articles.md', articleBody],
  ['concept/HU-BMS-102-pathology-family92-part1-concepts.md', conceptBody],
  ['evidence/HU-BMS-102-pathology-family92-part1-claims.md', claimBody],
  ['evidence/HU-BMS-102-pathology-family92-part1-citations.md', citationsBody],
  ['evidence/HU-BMS-102-pathology-family92-part1-spans.md', spanBody],
  ['question/HU-BMS-102-pathology-family92-part1-mcq.md', questionBody],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '92-part1', source, retained: ['Q01'], keys: 'D',
  released: { sources: 1, articles: 1, concepts: 1, newConcepts: 1, questions: 1, claims: 1, citations: 2, spans: 1, relations: 0 },
  exclusions: { nearLiteralRepeat: ['Q01b / p59 — option A expanded; cited as teaching-answer reveal'] },
  holds: { unmarkedWritten: [], conflicts: [], dependencies: [] },
}, null, 2))
