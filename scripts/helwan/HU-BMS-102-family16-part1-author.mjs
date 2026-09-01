import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = join(process.cwd(), 'docs/Helwan-Source-Imports')
const screenshot = 'src_370d6e8e26fcff9dec00'
const carrier = 'src_1245d519caac809922c3'
const article = 'ART-HU-BMS102-MIC-F16P1-LYSOGENIC-CELL-PLASMID-GENETICS'
const relatedArticle = 'ART-HU-BMS102-MIC-F11P2-RESISTANCE-ORIGINS-GENETICS'

const concepts = [
  {
    ref: 'Q02', id: 'CON-INF-C4B589DE952DCF', key: 'lysogenic-bacterial-cell-contains-prophage',
    label: 'A lysogenic bacterial cell contains a prophage', aliases: ['Lysogenic cell prophage content', 'Lysogen contains prophage'], type: 'definition',
    definition: 'A lysogenic bacterial cell, or lysogen, contains bacteriophage genetic material maintained as a prophage. The prophage state distinguishes lysogeny from lytic replication and is not a host lysosome, the enzyme lysozyme, or the antibacterial product bacteriocin.',
    objective: 'Identify a prophage as the defining phage-derived content of a lysogenic bacterial cell.',
    pitfalls: 'Confusing prophage with lysozyme, lysosome or bacteriocin, or treating independently corroborating teaching answers as an official examination key.',
    micro: 'Bacteriophage genetics', nano: 'Lysogenic cell content',
    subject: 'A lysogenic bacterial cell', predicate: 'contains', object: 'a prophage',
    display: 'A lysogenic bacterial cell contains a prophage.',
    teaching: 'Lysogeny is established ... The prophage is replicated at each cell division.',
    limitation: 'The answer is independently corroborated by an externally authored teaching carrier; that carrier is not claimed as the screenshot’s physical parent.'
  },
  {
    ref: 'Q03', id: 'CON-INF-D8B84ED2A0A158', key: 'plasmids-carry-dispensable-genes',
    label: 'Plasmids carry optional or dispensable bacterial genes', aliases: ['Plasmid dispensable genes', 'Optional genes on bacterial plasmids'], type: 'structure_function_relationship',
    definition: 'Plasmids are extra-chromosomal genetic elements that typically carry optional or dispensable genes rather than the core genes essential for bacterial growth. They may carry advantageous traits such as antimicrobial resistance, but they are not always linear and are not defined by mandatory insertion into the chromosome.',
    objective: 'Recognize carriage of optional or dispensable genes as the correct plasmid property in the source option set.',
    pitfalls: 'Assigning essential growth genes to plasmids, claiming all plasmids are linear, or saying chromosomal insertion defines every plasmid.',
    micro: 'Bacterial genome elements', nano: 'Plasmid dispensability',
    subject: 'Bacterial plasmids', predicate: 'carry', object: 'optional or dispensable genes',
    display: 'Plasmids carry optional or dispensable bacterial genes.',
    teaching: 'Plasmids are circular double-stranded DNA molecules ... carrying non essential (dispensable) genes.',
    limitation: 'The answer is independently corroborated by an externally authored teaching carrier; that carrier is not claimed as the screenshot’s physical parent.'
  },
]

for (const c of concepts) {
  c.claim = `CLM-HU102-F16P1-${c.ref}-01`
  c.currCit = `CIT-HU102-F16P1-${c.ref}-CURR`
  c.imgCit = `CIT-HU102-F16P1-${c.ref}-IMG`
  c.span = `SPN-HU102-F16P1-${c.ref}-01`
  c.question = `Q-HU102-MIC-F16-${c.ref}`
}
const byRef = Object.fromEntries(concepts.map((c) => [c.ref, c]))

const questions = [
  {
    ref: 'Q02', key: 'D', stem: 'lysogenic bacterial cell is the cell containing:',
    options: ['Lysozyme', 'Lysosome', 'Bacteriocin', 'Prophage'],
    reasons: ['lysozyme is an enzyme and does not define a lysogenic cell', 'a lysosome is a eukaryotic organelle, not the phage-derived element in a lysogen', 'a bacteriocin is a bacterial antimicrobial product, not the defining lysogenic element', 'a prophage is bacteriophage genetic material maintained in a lysogenic bacterial cell']
  },
  {
    ref: 'Q03', key: 'D', stem: 'Plasmids:',
    options: ['Become inserted into chromosome', 'Carry genes essential for growth', 'Are always found in linear form', 'Carry optional genes (dispensable)'],
    reasons: ['chromosomal insertion is not the defining property of every plasmid', 'core genes essential for bacterial growth are assigned to the chromosome in this source distinction', 'many bacterial plasmids are circular, so an always-linear absolute is incorrect', 'plasmids characteristically carry optional or dispensable genes in the source classification']
  },
]

const sources = `# Item
## id
${screenshot}
## title
Lec 5 bacterial genetics interactive-questions screenshot — slide 54 of 57
## institution
Helwan University local corpus
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.57.07.jpg
## media_type
image/jpeg
## languages
en
## page_count
1
## sha256
370d6e8e26fcff9dec004439a7edfd675a2323f49d46d5a354a03591b4fb1ba2
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
Tier-6 auxiliary raster capture of slide 54 from a 57-slide bacterial-genetics deck. Pale-green highlights visibly mark choices D and D, but the screenshot alone is not an official examination or official key and supplies no sitting, marks or recurrence authority.
## is_assessment
yes
---

# Item
## id
${carrier}
## title
Bacterial Genetics (1) — independent teaching-answer carrier
## institution
Capital University; Ehab Mohamed Fahmy
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Microbiology/Theoretical/Lec 5 - Bacterial Genetics 1/BACTERIAL GENETICS [1].pdf
## media_type
application/pdf
## languages
en
## page_count
52
## sha256
1245d519caac809922c3e2db0ae5587e6c5ba2e7bae1518feadaaa8f5b4a1dd9
## processing_status
pending
## rights
Externally authored teaching material stored in the local course corpus; held for internal authoring only and not redistributed.
## qualification
Tier-4 externally authored theoretical teaching deck stored in the Helwan BMS-102 folder. Page 49 prints the same three prompt scopes and page 50 prints answers chromosome, D and D. Its Capital University cover and 52-page boundary mean it is independent corroboration, not a claimed physical parent of the 57-slide screenshot and not an official examination or official key.
## is_assessment
no`

const conceptRow = (c) => `# Item
## label
${c.label}
## id
${c.id}
## canonical_key
${c.key}
## aliases
${c.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${c.definition}
## explicit_objective
${c.objective}
## pitfalls
${c.pitfalls}
## concept_type
${c.type}
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
HU-BMS-102 > Microbiology > Bacterial genetics > ${c.micro} > ${c.nano}
## article_ids
${article}
## related_article_ids
${relatedArticle}
## related_concept_ids
${concepts.filter((x) => x.id !== c.id).map((x) => x.id).join('\n')}
## resource_ids
${screenshot}
${carrier}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.62
## exam_weight_by_year
HU_Y1=0.62
## clinical_relevance
0.58
## academic_relevance
0.94
## weight_confidence
0.52
## confidence
0.86
## exam_signal
${screenshot} | tier-6 auxiliary screenshot | visible highlighted choice only | Family-16 ${c.ref}; ${carrier} | tier-4 external teaching-answer carrier | independent corroboration, not physical-parent or official-key authority
## atomic_claim_ids
${c.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[External teaching] ${c.teaching}
[Independent Questions pp49–50 / screenshot ${c.ref}] ${questions.find((q) => q.ref === c.ref).stem} Answer: ${questions.find((q) => q.ref === c.ref).options[3]}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
${c.limitation}
## evidence_gaps
No official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan microbiology faculty review remain required before publication.
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
resourceOccurrenceIds: Hand-authored from the exact screenshot occurrence and independent carrier pages.
sourceCandidateIds: Family 16 completed the governed search-before-mint gate in the triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: Adjacent lysogenic-conversion and resistance-plasmid records do not match this exact tested grain.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New Family-16 question-led concept after the governed no-same-scope decision.`

const articleBody = `# Item
## id
${article}
## title
Lysogenic cells, prophages and optional plasmid genes
## arabic_title

## aliases
Bacterial prophage and plasmid genetics
Lysogeny versus plasmid dispensability
## subject
inf
## topic
Microbiology
## subtopic
Bacterial genetics
## microtopic
Mobile and extrachromosomal genetic elements
## nanotopic
Prophages and plasmids
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
A lysogenic bacterial cell contains bacteriophage genetic material as a prophage. Plasmids are distinct bacterial genetic elements that commonly carry optional or dispensable genes rather than the core genes required for growth.
## sections
### Definition
A lysogenic bacterial cell contains a prophage. Plasmids carry optional or dispensable bacterial genes. These statements distinguish two different non-core genetic relationships in bacteria.

### Mechanism
During lysogeny, bacteriophage genetic material is maintained within the bacterial lineage as a prophage rather than immediately driving lytic destruction. Plasmids replicate as genetic elements separate from the core bacterial chromosome and may carry advantageous accessory traits.

### Key determinants
The defining element in a lysogenic cell is a prophage, not lysozyme, lysosome or bacteriocin. The defining option for plasmids is carriage of optional genes, not universal chromosomal insertion, essential-growth genes or an always-linear form.

### Clinical significance
Prophages and plasmids can influence bacterial phenotype and dissemination of accessory traits, including virulence or resistance determinants. These foundational distinctions do not replace organism-specific genomic or infection-control interpretation.

### Exam approach
For lysogeny, select the phage-derived genetic state. For plasmids, separate accessory gene carriage from essential chromosomal functions and reject absolute wording such as always linear.

### Authority limitation
The screenshot and the Capital University teaching carrier are independent occurrences with different deck boundaries. The external carrier corroborates the answers but is not claimed as the screenshot’s parent and neither source is an official examination key.
## published_summary

## published_sections

## hold_these
A lysogenic bacterial cell contains a prophage.
Plasmids carry optional or dispensable bacterial genes.
Core genes essential for growth are distinguished from accessory plasmid genes in the source framework.
## lose_the_mark
Choosing lysozyme, lysosome or bacteriocin as the defining lysogenic content.
Assigning essential growth genes to plasmids.
Claiming all plasmids are linear or inserted into the chromosome.
Treating an independent teaching carrier as the physical parent or an official key.
## related_concepts
${concepts.map((c) => c.id).join('\n')}
## related_articles
${relatedArticle}
## question_ids
${concepts.map((c) => c.question).join('\n')}
## resource_ids
${screenshot}
${carrier}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Bacterial genetics > Mobile and extrachromosomal genetic elements > Prophages and plasmids
## university_notes
hu: Restricted to HU-BMS-102 Year 1. The direct local evidence is a tier-6 screenshot occurrence; a tier-4 Capital University carrier stored in the Helwan folder independently corroborates the teaching answers. Their boundaries and provenance remain separate.
## annotations
${concepts.map((c) => `### definition_of · ${c.id}\nQuote: ${c.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${concepts.map((c) => `### ${c.display}\nClaims: ${c.claim}\nCitations: ${c.currCit}, ${c.imgCit}\nSpan: ${c.span}`).join('\n\n')}
## article_source_ids
${screenshot}
${carrier}
## claim_ids
${concepts.map((c) => c.claim).join('\n')}
## span_ids
${concepts.map((c) => c.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Exact tier-6 screenshot occurrences paired with independent tier-4 external teaching and a printed answer register. The carrier is not claimed as the screenshot’s physical parent and neither source is an official examination key.
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication. No official exam, official key, sitting, marks or recurrence evidence is available.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-16 Q01 is a valid answered completion prompt but remains an unmarked-written/schema hold with no student-facing record.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; source images are cited but not redistributed.
mediaRecommendations: No additional visual is required for these tested distinctions.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const explain = (q, i) => {
  const correct = 3
  if (i === correct) {
    const distinction = q.ref === 'Q02'
      ? 'This identifies the phage-derived genetic state of lysogeny rather than a bacterial product, enzyme or eukaryotic organelle.'
      : 'This separates accessory plasmid content from essential chromosomal functions and avoids absolute claims about plasmid form or integration.'
    return `${q.options[i]} is the exact independently printed teaching answer because ${q.reasons[i]}. ${distinction} The screenshot and external carrier remain separate evidence occurrences, and neither supplies official examination-key authority.`
  }
  return `${q.options[i]} is not the best source-framed answer because ${q.reasons[i]}. The governed independent teaching answer is ${q.options[correct]}; the record remains Draft pending medical and faculty review.`
}

const questionRow = (q) => {
  const c = byRef[q.ref]
  return `# Item
## id
${c.question}
## title
${q.stem}
## subject
inf
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${q.stem}
## format
single best answer
## derived_from

## correct_answer
${q.key}
${q.options.map((o, i) => `## answer_${'abcd'[i]}\n${o}\n## explanation_${'abcd'[i]}\n${explain(q, i)}`).join('\n')}
## topic
Bacterial genetics
## subtopic
${c.micro}
## difficulty
Moderate
## question_type
Microbiology
## main_concept
${c.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Bacterial genetics > ${c.micro} > ${c.nano}
## clinical_relevance
0.58
## academic_relevance
0.94
## cognitive_effort_score
0.46
## exam_weight_by_year
HU_Y1=0.62
## question_only_for
HU_Y1
## concept_ids
${c.id}
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
44
## exam_relevance
6
## contextual_concept_ids

## library_ids
${article}
## resource_ids
${screenshot}
${carrier}
## learning_objective
${c.objective}
## media_recommendations

## source_citation
${screenshot}, slide 54 of 57, Family-16 ${q.ref}: exact raster-visible stem, option order and pale-green highlighted choice D preserved as an auxiliary occurrence. ${carrier}, pp49–50: an independently authored 52-page Capital University teaching carrier prints the same prompt scope and answer D. The carrier is not claimed as the screenshot’s physical parent; neither source is an official examination or official key, and no sitting, marks or recurrence are inferred.
## attachments

## attached_image

## author_notes
Exact source wording, capitalization, punctuation, option order and independently printed teaching answer D are preserved. The screenshot and external carrier remain separate evidence occurrences. Family-16 Q01 remains an explicit unmarked completion/written hold and has no student-facing record.
## estimated_seconds
55
## randomise_answers
yes`
}

const claimRow = (c) => `# Item
## id
${c.claim}
## concept_id
${c.id}
## subject
inf
## predicate
${c.predicate}
## object
${c.object}
## display_text
${c.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.86
## freshness
stable_external_teaching_fact
## time_sensitive
no
## qualifiers
authority: exact tier-6 local screenshot occurrence plus an independent tier-4 Capital University teaching-answer carrier; no physical-parent or official-key authority inferred. limitation: ${c.limitation}`

const curriculumCitation = (c) => `# Item
## id
${c.currCit}
## claim_id
${c.claim}
## resource_id
${carrier}
## evidence_role
external_curriculum
## support_span
${c.teaching} Questions p49: ${questions.find((q) => q.ref === c.ref).stem} Answers p50: d.
## locator_type
page
## locator_page
${c.ref === 'Q02' ? '3–19, 49–50' : '31–43, 49–50'}
## locator_section
Bacterial Genetics (1) — ${c.micro}, questions and answers
## locator_detail
Direct external teaching plus exact prompt on p49 and explicit answer D on p50
## context_note
Tier-4 Capital University teaching corroboration stored in the Helwan corpus. Its 52-page boundary differs from the screenshot’s 57-slide deck, so it is not claimed as the physical parent and supplies no official examination-key authority.
## confidence
0.88
## counts_as_claim_evidence
no`

const imageCitation = (c) => `# Item
## id
${c.imgCit}
## claim_id
${c.claim}
## resource_id
${screenshot}
## evidence_role
auxiliary_assessment
## support_span
${questions.find((q) => q.ref === c.ref).stem} Highlighted choice: ${questions.find((q) => q.ref === c.ref).options[3]}.
## locator_type
page
## locator_page
1
## locator_section
Lec 5 bacterial genetics slide 54 of 57 — Family-16 ${c.ref}
## locator_detail
Exact screenshot stem, option order and pale-green highlighted choice D
## context_note
Tier-6 auxiliary screenshot occurrence. Its highlight is not an official key; the separate Capital University carrier independently corroborates the teaching answer without being claimed as this screenshot’s parent.
## confidence
0.90
## counts_as_claim_evidence
no`

const spanRow = (c) => `# Item
## id
${c.span}
## article_id
${article}
## section_id
${article.toLowerCase()}-${c.ref.toLowerCase()}
## text
${c.display}
## claim_ids
${c.claim}
## citation_ids
${c.currCit}
${c.imgCit}`

const relationBody = `# Item
## source
${concepts[0].id}
## type
contrasts_with
## target
${concepts[1].id}
## evidence_claim_ids
${concepts[0].claim}
${concepts[1].claim}
## citation_ids
${concepts[0].currCit}
${concepts[1].currCit}
## verification_status
needs_evidence
## confidence
0.82
## qualifiers
scope: a prophage is phage-derived genetic material defining lysogeny, whereas a plasmid is an accessory bacterial genetic element carrying optional genes
## reviewer
Medical team, Helwan Microbiology faculty`

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family16-part1-sources.md', sources],
  ['article/HU-BMS-102-microbiology-family16-part1-articles.md', articleBody],
  ['concept/HU-BMS-102-microbiology-family16-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family16-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family16-part1-citations.md', [...concepts.map(curriculumCitation), ...concepts.map(imageCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family16-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-microbiology-family16-part1-relations.md', relationBody],
  ['question/HU-BMS-102-microbiology-family16-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '16-part1', refs: questions.map((q) => q.ref), keys: questions.map((q) => q.key).join(''),
  released: { sources: 2, articles: 1, concepts: 2, newConcepts: 2, questions: 2, claims: 2, citations: 4, spans: 2, relations: 1 },
  reused: { articles: [relatedArticle] },
  holds: { unmarkedWritten: ['Q01'] },
}, null, 2))
