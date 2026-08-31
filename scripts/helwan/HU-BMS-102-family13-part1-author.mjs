import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = join(process.cwd(), 'docs/Helwan-Source-Imports')
const image53 = 'src_007c979153847950dca6'
const image54 = 'src_ee460385eb5caf5cdc6a'
const lecture = 'src_fe901dc6baa1f35d5d24'

const A1 = 'ART-HU-BMS102-MIC-F13P1-PROKARYOTIC-CELL-WALL'
const A2 = 'ART-HU-BMS102-MIC-F13P1-MEMBRANE-GRAM-NEGATIVE-WALL'
const A3 = 'ART-HU-BMS102-MIC-F13P1-SPORES-AUTOCLAVE'
const allArticles = [A1, A2, A3]

const concepts = [
  {
    ref: 'Q01', id: 'CON-INF-FECB8B49CCB55A', key: 'prokaryotic-bacterial-cell-defining-features-composite', article: A1,
    image: image53, page: '7–8', micro: 'Bacterial cell foundations', nano: 'Prokaryotic composite', type: 'classification',
    label: 'The source composite describes a prokaryotic bacterial cell by non-nuclear DNA, one chromosome and peptidoglycan',
    aliases: ['Prokaryotic bacterial cell composite', 'Bacterial prokaryote defining features'],
    definition: 'In this introductory Helwan course comparison, the prokaryotic bacterial cell has DNA not enclosed by a nuclear membrane, is described as having one chromosome, and has peptidoglycan in its cell wall. The one-chromosome phrase is retained as the source’s simplified teaching model and must not be universalized beyond that course framing.',
    objective: 'Recognize the source’s three-part introductory description of a prokaryotic bacterial cell while retaining its one-chromosome limitation.',
    pitfalls: 'Treating the source’s simplified one-chromosome wording as an exception-free statement about every bacterial species.',
    subject: 'A prokaryotic bacterial cell in the source comparison', predicate: 'is described by', object: 'DNA outside a nuclear membrane, one chromosome and a peptidoglycan cell wall',
    display: 'The source composite describes a prokaryotic bacterial cell by non-nuclear DNA, one chromosome and peptidoglycan.',
    quote: 'DNA within nuclear membrane: Absent ... Number of chromosomes: One ... Cell wall containing peptidoglycan: Yes.',
    limitation: 'The phrase “only one chromosome” is a simplified course statement, not an exception-free modern rule.'
  },
  {
    ref: 'Q02', id: 'CON-INF-7736308B0E274C', key: 'peptidoglycan-specific-to-bacterial-cell-wall', article: A1,
    image: image53, page: '8, 14', micro: 'Bacterial cell wall', nano: 'Peptidoglycan specificity', type: 'structure_function_relationship',
    label: 'Peptidoglycan is the characteristic main wall component of bacterial cells in the source comparison',
    aliases: ['Peptidoglycan bacterial wall specificity', 'Bacterial cell wall peptidoglycan'],
    definition: 'Peptidoglycan is a characteristic structural polymer of bacterial cell walls. Human and viral cells do not have peptidoglycan walls, and fungal walls use other polymers; this makes the bacterial wall a useful distinguishing structure and antimicrobial target.',
    objective: 'Identify the bacterial cell as the listed cell type whose wall has peptidoglycan as its main component.',
    pitfalls: 'Assigning peptidoglycan to a human, fungal or viral cell wall.',
    subject: 'Peptidoglycan', predicate: 'is the characteristic main wall component of', object: 'bacterial cells',
    display: 'Peptidoglycan is the characteristic main wall component of bacterial cells.',
    quote: 'It is composed of a layer of peptidoglycan to which the cell owes its rigidity.', limitation: 'No limitation beyond Draft faculty review.'
  },
  {
    ref: 'Q03', id: 'CON-INF-5FDB9641FAD906', key: 'flagella-location-outside-bacterial-cell-wall', article: A1,
    image: image53, page: '11–13, 42', micro: 'External bacterial structures', nano: 'Flagellar location', type: 'anatomy',
    label: 'Flagella are bacterial structures located outside the cell wall',
    aliases: ['External bacterial flagella', 'Flagella outside bacterial wall'],
    definition: 'Bacterial flagella are long filamentous appendages external to the cell wall and anchored through a basal body. In the source structure map, plasmids lie inside the cell, the cytoplasmic membrane lies within the wall, and capsid is a viral term.',
    objective: 'Locate flagella outside the bacterial cell wall and distinguish them from internal bacterial structures and a viral capsid.',
    pitfalls: 'Confusing the viral capsid with a bacterial capsule, or placing plasmids outside the bacterial wall.',
    subject: 'Bacterial flagella', predicate: 'are located', object: 'outside the bacterial cell wall',
    display: 'Bacterial flagella are located outside the cell wall.',
    quote: 'Bacterial structure ... Structures outside cell wall: Capsule, Flagella, Pili.', limitation: 'No limitation beyond Draft faculty review.'
  },
  {
    ref: 'Q04', id: 'CON-INF-AC7ACA9832F349', key: 'gram-positive-versus-negative-peptidoglycan-thickness', article: A1,
    image: image53, page: '15, 18–23', micro: 'Bacterial cell wall', nano: 'Peptidoglycan proportions', type: 'comparison',
    label: 'The Helwan lecture prints peptidoglycan as 50% of Gram-positive and 5–10% of Gram-negative wall thickness',
    aliases: ['Gram-positive versus Gram-negative peptidoglycan thickness', 'Source-specific peptidoglycan proportions'],
    definition: 'The Helwan lecture’s own comparison prints peptidoglycan as 50% of wall thickness in Gram-positive bacteria and 5–10% in Gram-negative bacteria. These numerical proportions are retained as source-specific teaching wording; the transferable structural principle is thick Gram-positive versus thin Gram-negative peptidoglycan.',
    objective: 'Select the lecture’s printed 50% versus 5–10% comparison without generalizing the fixed percentages beyond this source.',
    pitfalls: 'Reversing the thick/thin comparison or treating the printed percentages as universal measurements for every bacterial species.',
    subject: 'Peptidoglycan in the Helwan lecture', predicate: 'is printed as', object: '50% of Gram-positive versus 5–10% of Gram-negative wall thickness',
    display: 'The Helwan lecture prints peptidoglycan as 50% of Gram-positive and 5–10% of Gram-negative wall thickness.',
    quote: 'Peptidoglycan layer 50% of thickness in gram positive bacteria, 5-10% of thickness in gram negative bacteria.',
    limitation: 'The fixed percentages are source-specific; only the thick-versus-thin principle should be generalized.'
  },
  {
    ref: 'Q05', id: 'CON-INF-6C6CD04A7E53A9', key: 'bacterial-membrane-maintains-internal-environment', article: A2,
    image: image54, page: '27–29', micro: 'Cytoplasmic membrane', nano: 'Cellular homeostasis', type: 'function',
    label: 'The bacterial cytoplasmic membrane maintains a constant internal environment',
    aliases: ['Bacterial membrane homeostasis', 'Constant inner bacterial environment'],
    definition: 'A main function of the bacterial cytoplasmic membrane is maintaining a stable internal cellular environment. Cell shape, Gram-stain reaction and the major mechanical role in division are assigned chiefly to the wall rather than serving as the best answer to this membrane-function item.',
    objective: 'Identify maintenance of a constant internal environment as the stated bacterial membrane function.',
    pitfalls: 'Assigning the cell wall’s shape, Gram-stain or division roles to the cytoplasmic membrane in this comparison.',
    subject: 'The bacterial cytoplasmic membrane', predicate: 'maintains', object: 'a constant internal cellular environment',
    display: 'The bacterial cytoplasmic membrane maintains a constant internal environment.',
    quote: 'Main function is maintaining constant environment inside the cell by controlling transport mechanisms.', limitation: 'No limitation beyond Draft faculty review.'
  },
  {
    ref: 'Q06', id: 'CON-INF-AD06E8C0E3734F', key: 'bacterial-membrane-transport-homeostasis', article: A2,
    image: image54, page: '27–29', micro: 'Cytoplasmic membrane', nano: 'Transport control', type: 'mechanism',
    label: 'Control of transport mechanisms enables bacterial membrane homeostasis',
    aliases: ['Bacterial membrane transport homeostasis', 'Selective transport maintains internal environment'],
    definition: 'The bacterial cytoplasmic membrane maintains the internal environment by controlling transport across the membrane. Selective movement of solutes and ions separates this mechanism from wall-dependent Gram character, shape and division functions.',
    objective: 'Connect membrane control of transport with maintenance of a constant bacterial internal environment.',
    pitfalls: 'Choosing Gram character, shape or cell division when the stem asks how membrane homeostasis is achieved.',
    subject: 'Controlled membrane transport', predicate: 'maintains', object: 'the bacterial internal environment',
    display: 'Control of transport mechanisms enables bacterial membrane homeostasis.',
    quote: 'Main function is maintaining constant environment inside the cell by controlling transport mechanisms.', limitation: 'No limitation beyond Draft faculty review.'
  },
  {
    ref: 'Q08', id: 'CON-INF-6774122E221941', key: 'gram-negative-wall-lps-lysis-thin-peptidoglycan-composite', article: A2,
    image: image54, page: '20–23', micro: 'Gram-negative cell wall', nano: 'Printed composite', type: 'classification',
    label: 'The source composite links Gram-negative LPS endotoxin, lysis-associated release and a thin peptidoglycan layer',
    aliases: ['Gram-negative wall source composite', 'LPS lysis and thin peptidoglycan composite'],
    definition: 'The Helwan lecture describes the Gram-negative wall as having an outer lipopolysaccharide layer whose lipid A is endotoxin, with a thin peptidoglycan layer inside it. It also prints the absolute phrase that LPS is released “only” when cells are lysed; that wording is retained as a source limitation and must not be broadened into an exception-free modern claim.',
    objective: 'Recognize the lecture’s three-part Gram-negative wall composite while explicitly retaining the limitation of its lysis-only wording.',
    pitfalls: 'Moving LPS to Gram-positive bacteria, reversing the thin peptidoglycan arrangement, or silently presenting the source’s lysis-only absolute as universally current.',
    subject: 'The Gram-negative wall in the source composite', predicate: 'contains', object: 'LPS endotoxin outside thin peptidoglycan with source-stated lysis-associated release',
    display: 'The source composite links Gram-negative LPS endotoxin, lysis-associated release and a thin peptidoglycan layer.',
    quote: 'Lipopolysaccharide (LPS) ... is called the endotoxin. It is released only when the bacterial cells are lysed ... [with] a thin layer of peptidoglycan.',
    limitation: 'The word “only” in the lysis-release statement is preserved from the source and requires medical review before publication.'
  },
  {
    ref: 'Q09', id: 'CON-INF-4B9CAB5EB3121A', key: 'autoclave-121c-spore-sterilization', article: A3,
    image: image54, page: '48–52', micro: 'Bacterial endospores', nano: 'Autoclave condition', type: 'procedure',
    label: 'The Helwan lecture specifies autoclaving at 121°C for 20–30 minutes to free medical items from spores',
    aliases: ['Autoclave 121°C spore sterilization', 'Source-specific autoclave cycle'],
    definition: 'The Helwan lecture specifies autoclaving at 121°C for 20–30 minutes to free medical instruments and products from bacterial spores. This is retained as the printed course cycle; validated sterilization time in practice depends on load, equipment and protocol and must not be inferred from temperature alone.',
    objective: 'Select the source’s autoclave temperature-and-time statement over boiling, dry heat at the same temperature or a brief 100°C cycle.',
    pitfalls: 'Assuming boiling reliably eliminates spores, substituting dry heat for the stated moist-heat cycle, or treating one course cycle as universal for every load.',
    subject: 'The source’s medical spore-sterilization cycle', predicate: 'uses', object: 'autoclaving at 121°C for 20–30 minutes',
    display: 'The Helwan lecture specifies autoclaving at 121°C for 20–30 minutes to free medical items from spores.',
    quote: 'Sterilization by autoclaving at 121°c for 20-30 minutes is needed to free instruments and products from spores for medical use.',
    limitation: 'The exact time is source-specific; operational sterilization requires a validated load- and equipment-specific protocol.'
  },
]

for (const c of concepts) {
  c.claim = `CLM-HU102-F13P1-${c.ref}-01`
  c.currCit = `CIT-HU102-F13P1-${c.ref}-CURR`
  c.asmCit = `CIT-HU102-F13P1-${c.ref}-IMG`
  c.span = `SPN-HU102-F13P1-${c.ref}-01`
}
const byRef = Object.fromEntries(concepts.map((c) => [c.ref, c]))

const questions = [
  { ref: 'Q01', key: 'D', stem: 'Choose the most accurate sentence describing prokaryotic bacterial cell.', options: ['Its DNA isn’t enclosed in nuclear membrane.', 'It has only one chromosome.', 'It has peptidoglycan in its cell wall.', 'All of the above.'], reasons: ['this is true but incomplete in the source composite', 'this is the source’s simplified course statement but does not include the other two listed features', 'this is true but incomplete in the source composite', 'the teaching deck marks all three source-framed statements together'] },
  { ref: 'Q02', key: 'C', stem: 'Peptidoglycan represents the main cell wall component in which of the following cells?', options: ['Human cell.', 'Fungal cell.', 'Bacterial cell.', 'Viral cell.'], reasons: ['human cells do not have peptidoglycan walls', 'fungal walls use other structural polymers', 'peptidoglycan is characteristic of the bacterial wall', 'viruses do not have a peptidoglycan cell wall'] },
  { ref: 'Q03', key: 'D', stem: 'Which of the following bacterial structures is located outside bacterial cell wall?', options: ['Plasmids.', 'Cytoplasmic membrane.', 'Capsid.', 'Flagella.'], reasons: ['plasmids are intracellular genetic elements', 'the cytoplasmic membrane lies inside the cell wall', 'capsid is a viral structure, not the named external bacterial structure', 'flagella are external appendages outside the bacterial wall'] },
  { ref: 'Q04', key: 'A', stem: 'Choose the most accurate sentence describing bacterial cell wall.', options: ['Peptidoglycan represents 50% of thickness in Gram positive cell wall and 5-10% of Gram-negative cell wall.', 'Peptidoglycan represents 5%of thickness in Gram positive cell wall and 5-10% of Gram-negative cell wall.', 'Peptidoglycan represents 50% of thickness in Gram positive cell wall and 60% of Gram-negative cell wall.', 'Peptidoglycan represents 5-10 % of thickness in Gram positive cell wall and 50% of Gram-negative cell wall.'], reasons: ['this exactly preserves the lecture’s source-specific percentage comparison', 'this removes the taught thick Gram-positive distinction', 'this makes Gram-negative peptidoglycan much thicker than the lecture states', 'this reverses the lecture’s thick Gram-positive and thin Gram-negative comparison'] },
  { ref: 'Q05', key: 'D', stem: 'As regarding bacterial cell membrane function.\nWhich of the following is true?', options: ['Determines cell reaction to Gram stain.', 'Plays a role in cell division.', 'Maintains shape and Gram character of bacteria.', 'Maintain a constant inner bacterial environment.'], reasons: ['Gram reaction is assigned to the wall', 'the lecture assigns this role chiefly to the wall in this comparison', 'shape and Gram character are wall properties in the source', 'the membrane’s main stated function is internal homeostasis'] },
  { ref: 'Q06', key: 'A', stem: 'Bacterial cytoplasmic membrane maintains constant inner bacterial environment by which of the following mechanisms?', options: ['Controlling transport mechanisms.', 'Determining Gram character.', 'Maintaining bacterial shape.', 'Participating in cell division.'], reasons: ['selective transport is the stated homeostatic mechanism', 'Gram character is a wall property in this comparison', 'bacterial shape is maintained chiefly by the wall', 'cell-division participation is assigned to the wall in this comparison'] },
  { ref: 'Q08', key: 'D', stem: 'Which of the following best describes Gram negative cell wall?', options: ['Lipopolysaccharide is extremely toxic to the human body and is called the endotoxin.', 'Lipopolysaccharide is released only when the bacterial cells are lysed, and is responsible for the fever, hypotension and shock caused by gram negative organisms.', 'Has a thin layer of peptidoglycan (2 sheets) which forms only 5-10% of the cell wall material is located inside the outer layer of LPS.', 'All of the above.'], reasons: ['this is one source-listed component but not the full composite asked', 'this exactly preserves one source-listed component, including its medically reviewable absolute wording', 'this is one source-listed structural component but not the full composite asked', 'the teaching reveal groups all three printed source statements'] },
  { ref: 'Q09', key: 'C', stem: 'Choose the best sentence about medical importance of spores.', options: ['Sterilization by boiling at 100°c for 20-30 minutes is needed to free instruments and products from spores for medical use.', 'Sterilization by dry heat at 121°c for 20-30 minutes is needed to free instruments and products from all microorganisms except spores for medical use.', 'Sterilization by autoclaving at 121°c for 20-30 minutes is needed to free instruments and products from spores for medical use.', 'Sterilization by autoclaving at 100°c for 5 minutes is needed to free instruments and products from only spores for medical use.'], reasons: ['boiling is not the source’s spore-sterilization method', 'the source specifies moist heat by autoclaving, not this dry-heat statement', 'this exactly preserves the course’s printed autoclave condition', 'this lower-temperature brief cycle is not the source condition'] },
]
for (const q of questions) q.id = `Q-HU102-MIC-F13-${q.ref}`
const qFor = (c) => questions.find((q) => q.ref === c.ref)

const sourceRow = (x) => `# Item
## id
${x.id}
## title
${x.title}
## institution
${x.institution}
## collection_id
hu-y1
## source_relative_path
${x.path}
## media_type
${x.media}
## languages
en
## page_count
${x.pages}
## sha256
${x.sha}
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
${x.qualification}
## is_assessment
${x.assessment ? 'yes' : 'no'}`

const sources = [
  sourceRow({ id: image53, title: 'Lec 1 102 post-test screenshot — slide 53 of 55', institution: 'Helwan University local corpus', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.56.42.jpg', media: 'image/jpeg', pages: 1, sha: '007c979153847950dca6cec44eb92047e6e0a21ec64e55f4afa06de4217c6cd3', qualification: 'Tier-6 auxiliary raster capture of the governed Lec 1 102 post-test slide 53. Green underlines visibly mark choices, but this screenshot alone has no official-key, exam, sitting, mark or recurrence authority.', assessment: true }),
  sourceRow({ id: image54, title: 'Lec 1 102 post-test screenshot — slide 54 of 55', institution: 'Helwan University local corpus', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/2026-07-20 05.56.34.jpg', media: 'image/jpeg', pages: 1, sha: 'ee460385eb5caf5cdc6a07199298bb0765c92f3d53d872859e2299316667d67c', qualification: 'Tier-6 auxiliary raster capture of the governed Lec 1 102 post-test slide 54. Green underlines visibly mark choices, but this screenshot alone has no official-key, exam, sitting, mark or recurrence authority.', assessment: true }),
  sourceRow({ id: lecture, title: 'Introduction to Bacteriology and Bacterial Structure — Lec 1 102', institution: 'Faculty of Medicine, Helwan University; Reem Abdelrahman', path: 'Year 1/BMS 102/Microbiology/Theoretical/Lec 1 - Bacterial Morphology & Structure/Lec 1 102.pdf', media: 'application/pdf', pages: 55, sha: 'fe901dc6baa1f35d5d24c0b5eb1ce5c73dc531b50615342074392ac6850624b6', qualification: 'Tier-4 direct Helwan theoretical teaching carrier. Pages 4–5 contain the unmarked pre-test; pages 53–54 repeat it with embedded green teaching-answer underlines; intervening pages teach the linked scopes. It is not an official examination or official key.', assessment: false }),
].join('\n---\n\n')

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
HU-BMS-102 > Microbiology > Bacterial morphology and structure > ${c.micro} > ${c.nano}
## article_ids
${c.article}
## related_article_ids
${allArticles.filter((id) => id !== c.article).join('\n')}
## related_concept_ids
${concepts.filter((o) => o.article === c.article && o.id !== c.id).map((o) => o.id).join('\n')}
## resource_ids
${lecture}
${c.image}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.70
## exam_weight_by_year
HU_Y1=0.70
## clinical_relevance
0.58
## academic_relevance
0.96
## weight_confidence
0.58
## confidence
0.88
## exam_signal
${c.image} | tier-6 auxiliary post-test screenshot | visible marked choice only | Family-13 ${c.ref}; ${lecture} | tier-4 teaching-answer reveal | not an official key
## atomic_claim_ids
${c.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching pp${c.page}] ${c.quote}
[Screenshot ${c.ref}] ${qFor(c).stem.replaceAll('\n', ' ')} Answer reveal: ${qFor(c).options['ABCD'.indexOf(qFor(c).key)]}
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
${c.limitation}
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication. ${c.limitation}
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
resourceOccurrenceIds: Hand-authored from exact governed pages and screenshots.
sourceCandidateIds: Family 13 completed the governed search-before-mint gate in the triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New Family-13 question-led concept after the governed no-same-scope decision.`

const explain = (q, i) => {
  const correct = 'ABCD'.indexOf(q.key)
  if (i === correct) return `${q.options[i]} is correct within the exact Helwan source framing because ${q.reasons[i]}. The tier-4 lecture embeds this teaching reveal; it is not promoted to an official examination key.`
  return `${q.options[i]} is not the best source-framed answer because ${q.reasons[i]}. The governed teaching instead supports ${q.options[correct]}; the record remains Draft pending faculty review.`
}

const questionRow = (q) => {
  const c = byRef[q.ref]
  return `# Item
## id
${q.id}
## title
${q.stem.replaceAll('\n', ' ')}
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
Bacterial morphology and structure
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
HU-BMS-102 > Microbiology > Bacterial morphology and structure > ${c.micro} > ${c.nano}
## clinical_relevance
0.58
## academic_relevance
0.96
## cognitive_effort_score
0.48
## exam_weight_by_year
HU_Y1=0.70
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
46
## exam_relevance
7
## contextual_concept_ids

## library_ids
${c.article}
## resource_ids
${c.image}
${lecture}
## learning_objective
${c.objective}
## media_recommendations

## source_citation
${c.image}, Family-13 ${q.ref}: exact raster-visible stem, option order and green-underlined choice ${q.options['ABCD'.indexOf(q.key)]} preserved. Screenshot authority: tier-6 auxiliary visible mark only. ${lecture}, PDF pp4–5 and 53–54, proves the same prompt’s unmarked pre-test and embedded teaching-answer reveal; body pp${c.page} supplies direct teaching. Neither source is an official exam or official key.
## attachments

## attached_image

## author_notes
Exact source wording, capitalization, punctuation and option order are preserved. No marks, official sitting, recurrence or official-key status is inferred. ${c.limitation} Family-13 Q07 remains excluded as a cross-university dependency hold and has no student-facing record.
## estimated_seconds
65
## randomise_answers
yes`
}

const articleSpecs = [
  {
    id: A1, title: 'Prokaryotic bacterial cells and their cell wall', aliases: ['Bacterial prokaryote and peptidoglycan', 'Bacterial wall foundations'], refs: ['Q01', 'Q02', 'Q03', 'Q04'],
    summary: 'The introductory Helwan comparison links bacterial prokaryotic organization with non-nuclear DNA and a peptidoglycan wall, locates flagella outside that wall, and contrasts thick Gram-positive with thin Gram-negative peptidoglycan. Fixed chromosome and percentage wording is retained as source-specific teaching rather than universalized.',
    sections: '### Prokaryotic organization\nThe source comparison distinguishes bacterial prokaryotes from human eukaryotic cells by absence of a nuclear membrane and by a peptidoglycan-containing wall. Its one-chromosome wording is an introductory simplification and remains explicitly bounded to the source.\n\n### Peptidoglycan and external structures\nPeptidoglycan provides bacterial-wall rigidity and is absent from human cells. The structure map places the cytoplasmic membrane and plasmids inside the wall and flagella, pili and capsule outside it. A viral capsid is not a bacterial external structure.\n\n### Gram-positive and Gram-negative walls\nThe lecture prints 50% versus 5–10% peptidoglycan thickness. The durable comparison is thick Gram-positive versus thin Gram-negative peptidoglycan; the fixed percentages remain source-specific pending faculty review.',
    loses: ['Universalizing the source’s one-chromosome simplification.', 'Assigning peptidoglycan to human, fungal or viral cells.', 'Confusing a viral capsid with a bacterial capsule.', 'Reversing thick Gram-positive and thin Gram-negative peptidoglycan.']
  },
  {
    id: A2, title: 'Bacterial membrane homeostasis and the Gram-negative wall', aliases: ['Cytoplasmic membrane transport and Gram-negative envelope', 'Bacterial internal environment and LPS wall'], refs: ['Q05', 'Q06', 'Q08'],
    summary: 'The bacterial cytoplasmic membrane maintains the internal environment by controlling transport. The Gram-negative wall has an outer LPS layer and thin peptidoglycan; the lecture’s absolute lysis-only release wording is preserved as a medical-review limitation rather than silently generalized.',
    sections: '### Membrane homeostasis\nThe cytoplasmic membrane controls movement of solutes and ions and thereby stabilizes the internal environment. This transport role is distinct from the wall’s dominant contributions to shape, Gram reaction and division.\n\n### Gram-negative envelope\nThe Gram-negative wall includes a thin peptidoglycan layer inside an outer membrane containing LPS. Lipid A is the toxic endotoxin moiety and is associated with fever, hypotension and shock.\n\n### Source limitation\nThe lecture says LPS is released “only” when bacterial cells are lysed. That absolute is preserved because it is part of the exact option set, but it is not represented as an exception-free modern statement and requires faculty review before publication.',
    loses: ['Using a wall function to answer a membrane-homeostasis question.', 'Reversing active transport control and Gram-stain determination.', 'Placing LPS in the Gram-positive wall.', 'Silently removing or universalizing the source’s lysis-only wording.']
  },
  {
    id: A3, title: 'Bacterial endospores and source-specified autoclave sterilization', aliases: ['Spore resistance and autoclaving', 'Helwan source autoclave cycle'], refs: ['Q09'],
    summary: 'Bacterial endospores are highly resistant resting forms. The Helwan lecture specifies autoclaving at 121°C for 20–30 minutes for medical instruments and products; that exact course cycle is retained while operational sterilization remains dependent on validated equipment and load protocols.',
    sections: '### Endospore resistance\nA thick cortex, tough coat, calcium dipicolinate, dehydration and low metabolic activity make endospores markedly resistant to adverse conditions. Ordinary boiling is not the source’s selected spore-sterilization method.\n\n### Moist heat under pressure\nThe lecture selects autoclaving at 121°C for 20–30 minutes. Autoclaving uses saturated steam under pressure; it is not the same as dry heat at the same nominal temperature.\n\n### Operational limitation\nThe exact source cycle is suitable for this course question, but real sterilization assurance depends on validated load configuration, exposure conditions, equipment performance and protocol. The record therefore remains Draft and is not operational clinical guidance.',
    loses: ['Choosing boiling as reliable spore sterilization.', 'Substituting dry heat for the source’s autoclave cycle.', 'Choosing a brief 100°C autoclave statement.', 'Treating one printed cycle as universal for every load and device.']
  },
]

const articleRow = (s) => {
  const subset = s.refs.map((r) => byRef[r])
  const images = [...new Set(subset.map((c) => c.image))]
  return `# Item
## id
${s.id}
## title
${s.title}
## arabic_title

## aliases
${s.aliases.join('\n')}
## subject
inf
## topic
Microbiology
## subtopic
Bacterial morphology and structure
## microtopic
${subset[0].micro}
## nanotopic
Family-13 Part-1 teaching-reveal concepts
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
Medical team, Helwan Microbiology faculty
## final_publisher
Admin team
## summary
${s.summary}
## sections
### Definition
${subset.map((c) => c.display).join(' ')}

### Mechanism
${s.sections}

### Key determinants
${subset.map((c) => c.objective).join(' ')}

### Clinical significance
These structures and sterilization principles support foundational microbiology reasoning. They are educational source summaries rather than patient-specific or operational guidance, and every linked record remains Draft pending medical and faculty review.

### Exam approach
Identify whether the stem asks about cell type, structural location, membrane function, wall composition or sterilization conditions. Preserve the exact source framing while keeping every stated limitation visible.
## published_summary

## published_sections

## hold_these
${subset.map((c) => c.display).join('\n')}
## lose_the_mark
${s.loses.join('\n')}
## related_concepts
${subset.map((c) => c.id).join('\n')}
## related_articles
${allArticles.filter((id) => id !== s.id).join('\n')}
## question_ids
${subset.map((c) => qFor(c).id).join('\n')}
## resource_ids
${lecture}
${images.join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Bacterial morphology and structure > ${subset[0].micro}
## university_notes
hu: Restricted to HU-BMS-102 Year 1. The tier-4 Helwan lecture supplies direct teaching and embedded teaching-answer reveals; tier-6 screenshots preserve visible occurrences without official-key authority.
## annotations
${subset.map((c) => `### definition_of · ${c.id}\nQuote: ${c.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((c) => `### ${c.display}\nClaims: ${c.claim}\nCitations: ${c.currCit}, ${c.asmCit}\nSpan: ${c.span}`).join('\n\n')}
## article_source_ids
${lecture}
${images.join('\n')}
## claim_ids
${subset.map((c) => c.claim).join('\n')}
## span_ids
${subset.map((c) => c.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Direct tier-4 Helwan curriculum teaching and embedded post-test reveals, paired with exact tier-6 raster occurrences. None is an official examination key.
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication. ${subset.map((c) => c.limitation).join(' ')}
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-13 Q07 is deliberately absent because its exact pending concept belongs to a cross-university dependency chain. No rival concept was minted.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; source images are cited but not redistributed.
mediaRecommendations: No additional visual is required for these tested distinctions.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`
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
0.88
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: direct tier-4 Helwan teaching plus an embedded teaching-answer reveal and a tier-6 screenshot occurrence; no official-key authority inferred. limitation: ${c.limitation}`

const curriculumCitation = (c) => `# Item
## id
${c.currCit}
## claim_id
${c.claim}
## resource_id
${lecture}
## evidence_role
local_curriculum
## support_span
${c.quote}
## locator_type
page
## locator_page
${c.page}
## locator_section
Introduction to Bacteriology and Bacterial Structure — ${c.micro}
## locator_detail
PDF pp${c.page}; direct Helwan teaching. Matching post-test reveal appears on pp53–54.
## context_note
Tier-4 curriculum support only; ${c.limitation}
## confidence
0.90
## counts_as_claim_evidence
no`

const imageCitation = (q) => {
  const c = byRef[q.ref]
  return `# Item
## id
${c.asmCit}
## claim_id
${c.claim}
## resource_id
${c.image}
## evidence_role
auxiliary_assessment
## support_span
${q.stem.replaceAll('\n', ' ')} Answer reveal: ${q.options['ABCD'.indexOf(q.key)]}
## locator_type
page
## locator_page
1
## locator_section
Lec 1 102 post-test slide ${c.image === image53 ? '53' : '54'} of 55 — Family-13 ${q.ref}
## locator_detail
Exact screenshot prompt and green-underlined choice
## context_note
Tier-6 auxiliary screenshot occurrence only. The governed tier-4 original lecture proves the underline is an embedded teaching reveal; neither carrier supplies official exam-key authority. ${c.limitation}
## confidence
0.93
## counts_as_claim_evidence
no`
}

const spanRow = (c) => `# Item
## id
${c.span}
## article_id
${c.article}
## section_id
${c.article.toLowerCase()}-${c.ref.toLowerCase()}
## text
${c.display}
## claim_ids
${c.claim}
## citation_ids
${c.currCit}
${c.asmCit}`

const relationDefs = [
  ['Q01', 'associated_with', 'Q02', 'the bacterial prokaryote composite includes a peptidoglycan-containing wall'],
  ['Q01', 'associated_with', 'Q03', 'the general bacterial structure map separates internal organization from external flagella'],
  ['Q02', 'associated_with', 'Q04', 'peptidoglycan specificity is complemented by the source’s Gram-positive/Gram-negative thickness comparison'],
  ['Q05', 'associated_with', 'Q06', 'membrane homeostasis is achieved through control of transport mechanisms'],
  ['Q04', 'associated_with', 'Q08', 'the thin Gram-negative peptidoglycan side belongs within the broader Gram-negative wall composite'],
]
const relationRow = ([a, type, b, scope]) => `# Item
## source
${byRef[a].id}
## type
${type}
## target
${byRef[b].id}
## evidence_claim_ids
${byRef[a].claim}
${byRef[b].claim}
## citation_ids
${byRef[a].currCit}
${byRef[b].currCit}
## verification_status
needs_evidence
## confidence
0.84
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Microbiology faculty`

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family13-part1-sources.md', sources],
  ['article/HU-BMS-102-microbiology-family13-part1-articles.md', articleSpecs.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-microbiology-family13-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family13-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family13-part1-citations.md', [...concepts.map(curriculumCitation), ...questions.map(imageCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family13-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-microbiology-family13-part1-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-microbiology-family13-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '13-part1', refs: questions.map((q) => q.ref), keys: questions.map((q) => q.key).join(''),
  released: { sources: 3, articles: 3, concepts: 8, newConcepts: 8, questions: 8, claims: 8, citations: 16, spans: 8, relations: 5 },
  holds: { Q07: 'cross-university exact-concept dependency hold; no student-facing record' },
}, null, 2))
