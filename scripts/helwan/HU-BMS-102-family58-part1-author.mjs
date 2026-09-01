import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_8196275856f156e4e7eb'
const A1 = 'ART-HU-BMS102-MIC-F58P1-DIFFERENTIAL-ENRICHED-MEDIA'
const A2 = 'ART-HU-BMS102-MIC-F58P1-ANAEROBIC-CULTURE-MEDIA'
const row = (fields) => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const joinRows = (rows) => rows.join('\n---\n\n')
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    ref: 'Q03', id: 'CON-INF-1DB583D49D1ED2', key: 'macconkey-lactose-fermenters-pink-colonies', article: A1,
    label: 'Lactose-fermenting bacteria form pink colonies on MacConkey medium', aliases: ['Pink lactose-fermenter colonies on MacConkey agar', 'MacConkey lactose-fermentation appearance'],
    type: 'structure_function_relationship', micro: 'Selective and differential media', nano: 'MacConkey lactose differentiation',
    definition: 'MacConkey medium is selective for many Gram-negative enteric bacteria and differential for lactose fermentation. Lactose fermentation acidifies the local medium so the neutral-red indicator produces pink to red colonies, sometimes with surrounding bile precipitation.',
    objective: 'Identify the source-keyed colony appearance of lactose-fermenting bacteria on MacConkey medium.',
    pitfalls: 'Calling MacConkey an enriched medium, naming phenol red as its indicator, or assigning green colonies to non-lactose fermenters.',
    display: 'Lactose-fermenting bacteria form pink colonies on MacConkey medium.',
    subjectClaim: 'Lactose-fermenting bacteria on MacConkey medium', predicate: 'form', object: 'pink colonies',
    limitation: 'Colour intensity and surrounding precipitation vary with organism, inoculum and incubation; the item tests the source’s basic pink-colony distinction.'
  },
  {
    ref: 'Q05', id: 'CON-INF-F2909D37893285', key: 'strict-anaerobe-growth-robertson-cooked-meat-medium', article: A2,
    label: 'Robertson’s cooked meat medium supports growth of strict anaerobes', aliases: ['Cooked-meat medium for anaerobic culture', 'Robertson medium and strict anaerobes'],
    type: 'procedure_principle', micro: 'Anaerobic culture', nano: 'Robertson cooked-meat medium',
    definition: 'Robertson’s cooked meat medium is a reducing enrichment medium used for cultivation and maintenance of anaerobic bacteria. Meat particles and reducing conditions help lower oxidation-reduction potential and protect anaerobes from oxygen exposure.',
    objective: 'Select Robertson’s cooked meat medium as the source-keyed medium used to grow strict anaerobes.',
    pitfalls: 'Selecting media designed for enteric selection, enriched aerobic culture or mycobacteria, or assuming the broth alone validates an anaerobic system.',
    display: 'Robertson’s cooked meat medium supports growth of strict anaerobes.',
    subjectClaim: 'Robertson’s cooked meat medium', predicate: 'supports growth of', object: 'strict anaerobes',
    limitation: 'Successful recovery also depends on validated anaerobic collection, transport, atmosphere, incubation and organism-specific requirements.'
  },
  {
    ref: 'Q07', id: 'CON-INF-5E078BF68543B7', key: 'chocolate-agar-not-differential-indicator-exception', article: A1,
    label: 'Chocolate agar is enriched rather than a differential indicator medium', aliases: ['Chocolate-agar classification exception', 'Chocolate agar enriched-medium classification'],
    type: 'comparison', micro: 'Enriched media', nano: 'Chocolate-agar classification',
    definition: 'Chocolate agar is produced by heating blood so erythrocytes lyse and release growth factors. It is a brown enriched medium used for fastidious organisms; in its basic form it is not classified as a differential indicator medium.',
    objective: 'Identify differential-indicator classification as the exception among the source statements about chocolate agar.',
    pitfalls: 'Rejecting heated blood, fastidious-organism use or brown appearance, or extending the answer to every selective or supplemented chocolate-agar formulation.',
    display: 'Chocolate agar is enriched rather than a differential indicator medium.',
    subjectClaim: 'Basic chocolate agar', predicate: 'is classified as', object: 'an enriched rather than differential indicator medium',
    limitation: 'Commercial selective or supplemented variants differ; the answer concerns the basic medium described by the source.'
  },
]
for (const concept of concepts) if (idFor(concept.key) !== concept.id) throw new Error(`Deterministic ID mismatch: ${concept.ref}`)
const byRef = Object.fromEntries(concepts.map((concept) => [concept.ref, concept]))

const questions = [
  { ref:'Q03', page:'80–81', key:'C', stem:'MacConkey’s medium:', options:['Is an enriched medium.','Contains phenol red as a pH indicator.','Gives pink colonies by lactose fermenting bacteria.','Gives green colonies by lactose non fermenting bacteria.'] },
  { ref:'Q05', page:'82–83', key:'E', stem:'One of the following is used to grow strict anaerobes:', options:['Selenite broth','MacConkey’s medium','Blood agar','Lowenstein-Jensen medium','Robertson’s cooked meat medium'] },
  { ref:'Q07', page:'84–85', key:'A', stem:'All are correct about chocolate agar EXCEPT:', options:['It is a differential indicator medium.','It contains heated blood.','It is used to grow fastidious organisms.','It is brown in colour.'] },
]
for (const question of questions) {
  question.id = `Q-HU102-MIC-F58-${question.ref}`
  question.claim = `CLM-HU102-F58-${question.ref}-01`
  question.questionCit = `CIT-HU102-F58-${question.ref}-QUESTION`
  question.keyCit = `CIT-HU102-F58-${question.ref}-KEY`
  question.span = `SPN-HU102-F58-${question.ref}-01`
}
const qByRef = Object.fromEntries(questions.map((question) => [question.ref, question]))

const sourceRow = row([
  ['id',source],['title','Cultivation and culture media'],['institution','Helwan University Faculty of Medicine'],['collection_id','hu-y1'],
  ['source_relative_path','Year 1/BMS 102/Microbiology/Practical Labs/Pre Lab 2 - Cultivation & Culture media/2- Cultivation & Culture media.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','86'],['sha256','8196275856f156e4e7ebdffa7aaf89f9b16ef905db6e2057cfa71e05065cf8a4'],['processing_status','pending'],
  ['rights','Local Helwan teaching material held for internal authoring only; no page image is redistributed.'],
  ['qualification','Tier-5 Helwan Microbiology & Immunology practical teaching lecture. Family 58 contains two unmarked open-response prompts and three unique complete MCQs, each repeated on its reveal slide. Highlighted teaching answers are preserved as local teaching-answer authority only; no official examination, marks, candidate instructions or authenticated official key is claimed.'],['is_assessment','yes'],
])

const article = ({id,title,arabicTitle,aliases,subtopic,microtopic,summary,refs,sections,lose}) => {
  const qs = refs.map((ref) => qByRef[ref])
  const cs = refs.map((ref) => byRef[ref])
  const other = id === A1 ? A2 : A1
  return row([
    ['id',id],['title',title],['arabic_title',arabicTitle],['aliases',aliases],['subject','inf'],['topic','Microbiology'],['subtopic',subtopic],['microtopic',microtopic],['nanotopic','Family-58 safe objective slice'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['template_id','TPL-CONCEPT'],['archetype','concept'],['language','en'],['learner_stage','Years 1–3 foundation'],['reading_time','5'],['high_yield','High'],['time_sensitive','stable'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['summary',summary],['sections',sections],['published_summary',''],['published_sections',''],['hold_these',cs.map((c)=>c.display).join('\n')],['lose_the_mark',lose],['related_concepts',cs.map((c)=>c.id).join('\n')],['related_articles',other],['question_ids',qs.map((q)=>q.id).join('\n')],['resource_ids',source],['universities','hu'],['years','HU_Y1'],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Cultivation and culture media > ${microtopic} > Family-58`],['university_notes','hu: Tier-5 Helwan teaching-answer highlights only; no official examination, marks or authenticated official-key status is inferred.'],
    ['annotations',cs.map((c)=>`### definition_of · ${c.id}\nQuote: ${c.display}\nBlock: body`).join('\n\n')],['media',''],['media_recommendations',''],['callout_evidence',qs.map((q)=>`### ${byRef[q.ref].display}\nClaims: ${q.claim}\nCitations: ${q.questionCit}, ${q.keyCit}\nSpan: ${q.span}`).join('\n\n')],['article_source_ids',source],['claim_ids',qs.map((q)=>q.claim).join('\n')],['span_ids',qs.map((q)=>q.span).join('\n')],['publication_gate','needs_evidence'],['evidence_basis','Exact Family-58 prompt/option occurrences and immediately following highlighted teaching-answer slides; no official-key authority is claimed.'],['evidence_gaps','Independent medical verification and named Helwan microbiology faculty review remain required. Q01 and Q02 remain unmarked-written holds; Q04, Q06 and Q08 are literal reveal-slide copies and receive no separate records.'],['conflicts','[clear]'],['last_reviewed',''],['review_due',''],['notes','Question-led Family-58 Draft; the bare question-mark residue receives no record.'],['field_notes','arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
}

const articles = joinRows([
  article({id:A1,title:'Differential and enriched culture media: MacConkey and chocolate agar',arabicTitle:'',aliases:'Family-58 culture-media classification\nMacConkey and chocolate agar',subtopic:'Cultivation and culture media',microtopic:'Selective, differential and enriched media',summary:'Question-led comparison of lactose differentiation on MacConkey medium and the enriched classification of basic chocolate agar.',refs:['Q03','Q07'],sections:`### Definition\nCulture media may be classified by the organisms they support and the visible distinctions they create. MacConkey medium is selective and differential, whereas basic chocolate agar is enriched.\n\n### Mechanism\nBile salts and crystal violet inhibit many Gram-positive organisms on MacConkey medium. Lactose fermentation produces acid, and the neutral-red indicator makes lactose-fermenting colonies pink to red. Heating blood for chocolate agar lyses erythrocytes and releases growth factors used by fastidious organisms.\n\n### Key determinants\nLactose-fermenting bacteria form pink colonies on MacConkey medium. Chocolate agar is enriched rather than a differential indicator medium. Chocolate agar contains heated blood, supports fastidious organisms and is brown in colour.\n\n### Clinical significance\nMacConkey colour intensity varies with organism and growth conditions. Selective or supplemented chocolate-agar variants can differ from the basic formulation tested here.`,lose:'Calling MacConkey an enriched medium.\nNaming phenol red instead of neutral red in MacConkey medium.\nCalling basic chocolate agar a differential indicator medium.\nTreating the highlighted teaching answer as an official examination key.'}),
  article({id:A2,title:'Robertson’s cooked meat medium and strict anaerobic culture',arabicTitle:'',aliases:'Family-58 anaerobic culture medium\nCooked-meat medium for anaerobes',subtopic:'Cultivation and culture media',microtopic:'Anaerobic culture',summary:'Question-led account of why Robertson’s cooked meat medium supports strict anaerobes while retaining system-level limitations.',refs:['Q05'],sections:`### Definition\nStrict anaerobes require protection from oxygen during collection, transport and culture. Robertson’s cooked meat medium is a reducing enrichment medium used to cultivate and maintain anaerobic organisms.\n\n### Mechanism\nCooked meat particles and reducing constituents help lower oxidation-reduction potential and provide nutrients. Robertson’s cooked meat medium supports growth of strict anaerobes.\n\n### Key determinants\nAmong the source’s listed media, Robertson’s cooked meat medium is the best answer for strict anaerobes. Selenite broth, MacConkey medium, blood agar and Lowenstein-Jensen medium have different primary culture roles.\n\n### Clinical significance\nA medium does not by itself validate anaerobiosis. Recovery depends on appropriate sampling, rapid anaerobic transport, a validated oxygen-free atmosphere, incubation conditions and organism-specific requirements. The highlighted answer is a local teaching reveal rather than an authenticated official key or a complete laboratory protocol.`,lose:'Selecting Selenite broth, MacConKey medium, blood agar or Lowenstein-Jensen medium for the source’s strict-anaerobe item.\nAssuming cooked-meat broth alone guarantees anaerobiosis.\nTreating the highlighted teaching answer as an official examination key.'}),
])

const conceptRow = (c) => {
  const q = qByRef[c.ref]
  return row([
    ['label',c.label],['id',c.id],['canonical_key',c.key],['aliases',c.aliases.join('\n')],['arabic_label',''],['arabic_aliases','[clear]'],['definition',c.definition],['explicit_objective',c.objective],['pitfalls',c.pitfalls],['concept_type',c.type],['status','Draft'],['support_mode','direct_statement'],['subject','inf'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Cultivation and culture media > ${c.micro} > ${c.nano}`],['article_ids',c.article],['related_article_ids',c.article === A1 ? A2 : A1],['related_concept_ids',c.ref === 'Q03' ? byRef.Q07.id : c.ref === 'Q07' ? byRef.Q03.id : '[clear]'],['resource_ids',source],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.55'],['exam_weight_by_year','HU_Y1=0.55'],['clinical_relevance','0.70'],['academic_relevance','0.94'],['weight_confidence','0.40'],['confidence','0.78'],['exam_signal',`${source} | tier-5 Helwan practical teaching lecture | Family-58 ${c.ref}, highlighted teaching answer | not an official examination key`],['atomic_claim_ids',q.claim],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],['original_wording',`[Family-58 ${c.ref}] ${q.stem} [highlighted answer ${q.key}]`],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty',c.limitation],['evidence_gaps',`The visible highlight is a local teaching answer, not an authenticated official key. ${c.limitation} Independent medical verification and Helwan faculty review remain required.`],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath the canonical placement.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family-58 prompt and teaching-answer occurrences.\nsourceCandidateIds: Family 58 completed the governed search-before-mint gate.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-scope rival exists.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nreuseGovernance: New Family-58 question-led concept after governed no-same-scope adjudication.'],
  ])
}

const wrong = {
  Q03:['MacConkey medium is selective and differential rather than an enriched medium.','MacConkey medium uses neutral red rather than phenol red as its pH indicator.','','Non-lactose fermenters are colourless or pale rather than green on standard MacConkey medium.'],
  Q05:['Selenite broth is used mainly as enrichment for enteric pathogens rather than as the source-keyed strict-anaerobe medium.','MacConkey medium is selective and differential for enteric Gram-negative bacteria, not the source-keyed strict-anaerobe medium.','Blood agar is enriched but does not by itself provide the source-keyed reducing medium for strict anaerobes.','Lowenstein-Jensen medium is used for mycobacterial culture rather than as the source-keyed strict-anaerobe medium.',''],
  Q07:['','Chocolate agar contains heated blood.','Chocolate agar supports fastidious organisms.','Chocolate agar is brown in colour.'],
}
const answerRows = (q) => q.options.flatMap((option, index) => {
  const letter = 'ABCDE'[index]
  const correct = letter === q.key
  const c = byRef[q.ref]
  const explanation = correct
    ? `The option “${option}” is the highlighted teaching answer because ${c.display.toLowerCase()} ${c.limitation}`
    : `${wrong[q.ref][index]} The tested relationship is: ${c.display} Therefore “${option}” is not the highlighted best answer.`
  return [[`answer_${'abcde'[index]}`,option],[`explanation_${'abcde'[index]}`,explanation]]
})
const holdText = 'Q01 and Q02 remain unmarked-written holds. Q04, Q06 and Q08 are literal reveal-slide copies of Q03, Q05 and Q07 respectively. The bare question-mark residue is excluded.'
const questionRow = (q) => {
  const c = byRef[q.ref]
  return row([
    ['id',q.id],['title',q.stem],['subject','inf'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format','single best answer'],['derived_from',''],['correct_answer',q.key],...answerRows(q),['topic','Cultivation and culture media'],['subtopic',c.micro],['difficulty','Moderate'],['question_type','Microbiology'],['main_concept',c.id],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Cultivation and culture media > Family-58 > ${q.ref}`],['clinical_relevance','0.70'],['academic_relevance','0.94'],['cognitive_effort_score','0.48'],['exam_weight_by_year','HU_Y1=0.55'],['question_only_for','HU_Y1'],['concept_ids',c.id],['years','HU_Y1'],['universities','hu'],['cognitive_effort','Low'],['setting','Academic'],['reasoning_level','1'],['inferred_difficulty','48'],['exam_relevance','6'],['contextual_concept_ids',''],['library_ids',c.article],['resource_ids',source],['learning_objective',c.objective],['media_recommendations',''],['source_citation',`${source}, PDF pp${q.page}, Family-58 ${q.ref}: literal stem and complete option structure followed by highlighted answer ${q.key}. Tier-5 local teaching-answer authority only, not an official examination or authenticated official key.`],['attachments',''],['attached_image',''],['author_notes',`Literal wording, punctuation, capitalization and option count are preserved. ${c.limitation} ${holdText}`],['estimated_seconds','60'],['randomise_answers','yes'],
  ])
}

const claimRow = (q) => {
  const c = byRef[q.ref]
  return row([['id',q.claim],['concept_id',c.id],['subject','inf'],['predicate',c.predicate],['object',c.object],['display_text',c.display],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence','0.78'],['freshness','stable_local_teaching_answer'],['time_sensitive','no'],['qualifiers',`authority: tier-5 Helwan practical teaching highlight, without official-key status. scope: ${c.limitation}`]])
}
const questionCitation = (q) => row([['id',q.questionCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Options: ${q.options.map((option,index)=>`${'ABCDE'[index]}. ${option}`).join(' | ')}`],['locator_type','page'],['locator_page',q.page.split('–')[0]],['locator_section',`Family-58 ${q.ref}`],['locator_detail','Exact literal prompt and complete option structure'],['context_note','Tier-5 Helwan practical teaching prompt; no marks or official-examination designation is visible.'],['confidence','0.96'],['counts_as_claim_evidence','no']])
const keyCitation = (q) => row([['id',q.keyCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.key}. ${q.options['ABCDE'.indexOf(q.key)]}`],['locator_type','page'],['locator_page',q.page.split('–')[1]],['locator_section',`Family-58 ${q.ref} teaching reveal`],['locator_detail',`The immediately following slide highlights option ${q.key}`],['context_note','Highlighted local teaching answer only; not an authenticated official answer key.'],['confidence','0.96'],['counts_as_claim_evidence','no']])
const spanRow = (q) => row([['id',q.span],['article_id',byRef[q.ref].article],['section_id',`${byRef[q.ref].article.toLowerCase()}-${q.ref.toLowerCase()}`],['text',byRef[q.ref].display],['claim_ids',q.claim],['citation_ids',`${q.questionCit}\n${q.keyCit}`]])
const relationRow = row([['source',byRef.Q03.id],['type','contrasts_with'],['target',byRef.Q07.id],['evidence_claim_ids',`${qByRef.Q03.claim}\n${qByRef.Q07.claim}`],['citation_ids',`${qByRef.Q03.questionCit}\n${qByRef.Q07.questionCit}`],['verification_status','needs_evidence'],['confidence','0.80'],['qualifiers','scope: MacConkey medium is differential for lactose fermentation, whereas basic chocolate agar is enriched rather than a differential indicator medium'],['reviewer','Medical team, Helwan Microbiology faculty']])

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family58-part1-sources.md',sourceRow],
  ['article/HU-BMS-102-microbiology-family58-part1-articles.md',articles],
  ['concept/HU-BMS-102-microbiology-family58-part1-concepts.md',joinRows(concepts.map(conceptRow))],
  ['evidence/HU-BMS-102-microbiology-family58-part1-claims.md',joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family58-part1-citations.md',joinRows(questions.flatMap((q)=>[questionCitation(q),keyCitation(q)]))],
  ['evidence/HU-BMS-102-microbiology-family58-part1-spans.md',joinRows(questions.map(spanRow))],
  ['relations/HU-BMS-102-microbiology-family58-part1-relations.md',relationRow],
  ['question/HU-BMS-102-microbiology-family58-part1-questions.md',joinRows(questions.map(questionRow))],
])
for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({family:'58-part1',refs:questions.map((q)=>q.ref),keys:questions.map((q)=>q.key).join(''),released:{sources:1,articles:2,concepts:3,questions:3,claims:3,citations:6,spans:3,relations:1},holds:{unmarkedWritten:['Q01','Q02'],duplicateCopies:['Q04','Q06','Q08'],residue:['bare-question-mark']}},null,2))
