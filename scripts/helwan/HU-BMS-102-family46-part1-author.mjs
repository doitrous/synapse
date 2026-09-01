import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_3a7e4b5193cfba3bc75a'
const A1 = 'ART-HU-BMS102-MIC-F46P1-VIRUS-BACTERIA-CAPSID'
const A2 = 'ART-HU-BMS102-MIC-F46P1-VIRAL-ECLIPSE'
const A3 = 'ART-HU-BMS102-MIC-F46P1-FUNGAL-DIFFERENCES-AFLATOXIN'
const allArticles = [A1, A2, A3]
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`
const row = (fields) => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const joinRows = (rows) => rows.join('\n---\n\n')

const concepts = [
  { ref:'Q02', id:'CON-INF-5E1C201794529A', key:'virus-not-binary-fission-versus-bacteria', article:A1, label:'Viruses do not divide by binary fission', aliases:['Virus binary-fission exception','Viral replication versus bacterial division'], type:'comparison', micro:'General viral properties', nano:'Binary-fission contrast', definition:'Viruses replicate by directing synthesis and assembly inside a host cell; they do not reproduce through bacterial binary fission. In the source’s exception question, binary fission is therefore the non-viral property.', objective:'Select binary fission as the property that does not distinguish viruses from bacteria in the stated direction.', pitfalls:'Treating viral replication as cell division or confusing assembly of virions with binary fission.', display:'Viruses do not divide by binary fission.', subjectClaim:'Viruses', predicate:'do not divide by', object:'binary fission', limitation:'The item is a broad virus-versus-bacterium comparison and does not provide a complete replication-cycle description.' },
  { ref:'Q03', id:'CON-INF-E2959CFD4E6AC1', key:'virus-not-grown-artificial-media', article:A1, label:'Viruses cannot be grown on cell-free artificial media', aliases:['Virus artificial-media exception','Obligate intracellular viral cultivation'], type:'comparison', micro:'General viral properties', nano:'Artificial-media contrast', definition:'Viruses require living cells for replication and cannot be propagated on ordinary cell-free artificial bacteriologic media. The printed option is therefore the exception in the source’s virus-versus-bacterium comparison.', objective:'Identify growth on artificial media as the false viral property in the option set.', pitfalls:'Confusing living cell culture systems with cell-free artificial bacteriologic media.', display:'Viruses cannot be grown on cell-free artificial media.', subjectClaim:'Viruses', predicate:'cannot be grown on', object:'cell-free artificial media', limitation:'“Artificial media” is interpreted at the source’s foundational grain as ordinary cell-free bacteriologic media, not living cell-culture systems.' },
  { ref:'Q06', id:'CON-INF-A2E01EFECFD519', key:'viral-capsid-not-lipopolysaccharide', article:A1, label:'A viral capsid is a protein coat, not lipopolysaccharide', aliases:['Capsid protein not LPS','Viral capsid composition exception'], type:'comparison', micro:'Viral structure', nano:'Capsid composition', definition:'The viral capsid is a protein coat built from capsomers. Lipopolysaccharide is a bacterial Gram-negative outer-membrane component, not a capsid constituent.', objective:'Reject lipopolysaccharide as a viral capsid composition or function statement.', pitfalls:'Confusing a viral protein coat with the lipopolysaccharide of a bacterial outer membrane.', display:'A viral capsid is a protein coat, not lipopolysaccharide.', subjectClaim:'A viral capsid', predicate:'is', object:'a protein coat rather than lipopolysaccharide', limitation:'The item tests the composition exception and does not claim every capsid mediates attachment in the same way.' },
  { ref:'Q10', id:'CON-INF-5E8EA87BB06915', key:'viral-eclipse-uncoating-to-assembly-interval', article:A2, label:'The source defines the viral eclipse interval from uncoating to assembly', aliases:['Viral eclipse boundaries','Uncoating-to-assembly interval'], type:'definition', micro:'Viral replication', nano:'Eclipse interval', definition:'In the source framework, the eclipse interval begins after uncoating and extends until assembly produces detectable infectious virions. The printed answer selects the interval between uncoating and assembly.', objective:'Identify uncoating and assembly as the source-defined boundaries of the viral eclipse period.', pitfalls:'Confusing the eclipse interval with the entire infection-to-shedding period or with extracellular release alone.', display:'The source defines the viral eclipse interval from uncoating to assembly.', subjectClaim:'The viral eclipse interval', predicate:'extends from', object:'uncoating to assembly in the source framework', limitation:'The record preserves the source’s simplified phase boundaries and does not replace virus-specific kinetic definitions.' },
  { ref:'Q14', id:'CON-INF-FFCD984EDD1FEC', key:'fungus-bacterium-nutrition-exception', article:A3, label:'The source keys autotrophic-or-heterotrophic nutrition as the exception in its fungus–bacterium comparison', aliases:['Fungal nutrition comparison exception','Fungus bacterium nutrition distinction'], type:'source_assertion', micro:'General mycology', nano:'Fungus–bacterium comparison', definition:'The study bank keys “They may be autotrophic or heterotrophic” as the exception in its list of ways fungi differ from bacteria. Fungi are heterotrophic; the broader autotrophic-or-heterotrophic range belongs to bacterial nutritional classification in this comparison.', objective:'Preserve the printed nutrition exception while retaining the limits of the source’s categorical comparison.', pitfalls:'Calling fungi autotrophic, or universalizing the option set’s separate categorical statement about obligate anaerobic fungi.', display:'The source keys autotrophic-or-heterotrophic nutrition as the exception in its fungus–bacterium comparison.', subjectClaim:'The Family-46 fungus–bacterium comparison', predicate:'keys as its exception', object:'the statement that fungi may be autotrophic or heterotrophic', limitation:'This is a source-bounded comparison. The separate “no obligate anaerobic fungi” option is preserved literally but must not be generalized as exception-free modern taxonomy.' },
  { ref:'Q18', id:'CON-INF-9072CD0317FCFE', key:'aflatoxin-aspergillus-food-liver-cancer-composite', article:A3, label:'The source links aflatoxin to Aspergillus flavus, food exposure, chronic liver damage and cancer', aliases:['Aflatoxin source composite','Aspergillus flavus aflatoxin effects'], type:'source_assertion', micro:'Fungal toxins', nano:'Aflatoxin composite', definition:'The source presents aflatoxin as a mycotoxin that may be produced by Aspergillus flavus, consumed in contaminated food, and associated with chronic liver damage and cancer. Its printed “All of the above” key joins these four statements into one study-bank composite.', objective:'Recognize all four source-listed aflatoxin statements while preserving the composite’s study-bank authority limit.', pitfalls:'Selecting only the organism, exposure route or hepatic consequence when the source asks for the combined best answer.', display:'The source links aflatoxin to Aspergillus flavus, food exposure, chronic liver damage and cancer.', subjectClaim:'The Family-46 aflatoxin composite', predicate:'links aflatoxin to', object:'Aspergillus flavus, contaminated-food exposure, chronic liver damage and cancer', limitation:'The record preserves a tier-6 study-bank composite and does not supply dose, exposure-duration or patient-specific risk guidance.' },
]

for (const c of concepts) if (idFor(c.key) !== c.id) throw new Error(`Deterministic concept ID mismatch for ${c.ref}`)

const questions = [
  { ref:'Q02', page:'1', key:'C', stem:'Viruses differ from bacteria in all the following EXCEPT:', options:['They contain one type of nucleic acid','They can pass through bacterial filters','They divide by binary fission','They are not susceptible to antibiotics','They cannot be grown on artificial media'], reason:'viruses do not divide by binary fission, while the other statements are presented as viral properties in this source comparison' },
  { ref:'Q03', page:'1', key:'D', stem:'Viruses differ from bacteria in all the following EXCEPT:', options:['They have no cell structure','They cannot be seen by light microscope','They are not susceptible to antibiotic','They can be grown on artificial media','They contain either DNA or RNA'], reason:'viruses require living cells and cannot be grown on ordinary cell-free artificial media' },
  { ref:'Q06', page:'1', key:'C', stem:'Viral capsid has the following functions EXCEPT:', options:['It protects the nucleic acid','It mediates attachment to host cells','It is composed of lipopolysaccharide','It is the antigenic part of the virus','It is responsible for the viral morphology'], reason:'a capsid is protein rather than bacterial lipopolysaccharide' },
  { ref:'Q10', page:'2', key:'A', stem:'The eclipse period of viral multiplication is defined as the period of time\nbetween:', options:['the un-coating and assembly of the virus','the start of the infection and the first appearance of extracellular virus','the start of the infection and the first appearance of Intracellular virus','the start of the infection and shedding of the virus'], reason:'the source defines the eclipse interval between uncoating and assembly' },
  { ref:'Q14', page:'2', key:'C', stem:'Fungi differ from bacteria in all the following EXCEPT:', options:['They are larger in size','They have ergosterol in their cytoplasmic membrane','They may be autotrophic or heterotrophic','There is no obligate anaerobic fungi','They have chitin in their cell wall'], reason:'the source keys the autotrophic-or-heterotrophic statement as the exception because fungi are heterotrophic' },
  { ref:'Q18', page:'3', key:'E', stem:'Aflatoxins:', options:['May be produced by Aspergillus flavus','May cause chronic liver damage','May cause cancer','May be consumed in food as a mycotoxin','All of the above'], reason:'the printed answer joins all four source-listed aflatoxin statements' },
]

const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))
const byConcept = Object.fromEntries(concepts.map((c) => [c.id, c]))
for (const c of concepts) byRef[c.ref].concept = c.id
for (const q of questions) {
  q.id = `Q-HU102-MIC-F46-${q.ref}`
  q.claim = `CLM-HU102-F46-${q.ref}-01`
  q.questionCit = `CIT-HU102-F46-${q.ref}-QUESTION`
  q.keyCit = `CIT-HU102-F46-${q.ref}-KEY`
  q.span = `SPN-HU102-F46-${q.ref}-01`
  q.display = byConcept[q.concept].display
}

const sourceRow = row([
  ['id',source],['title','Virology & Mycology — MCQ study bank'],['institution','Unattributed local HU-BMS-102 corpus carrier; PDF metadata author Eman Ibrahem Hefny Ibrahem'],['collection_id','hu-y1'],
  ['source_relative_path','Year 1/BMS 102/Microbiology/Notes and Summaries/Virology & Mycology.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','4'],['sha256','3a7e4b5193cfba3bc75ad66f0241124510fe6f531ab27378e8c4f4e12bd70a74'],['processing_status','pending'],
  ['rights','Local study material held for internal authoring only; no page image is redistributed.'],
  ['qualification','Tier-6 locally compiled MCQ study bank. Pages 1–3 print nineteen MCQs and a red Key Answers register; page 4 is blank. The PDF metadata names an author, but no visible university, faculty, department, examiner, sitting, marks or authenticated official-key provenance appears. Family 46 releases only Q02/Q03/Q06/Q10/Q14/Q18. The thirteen dependency, malformed-option and medical/non-exclusive holds receive no student-facing record.'],['is_assessment','yes'],
])

const articleSpecs = [
  { id:A1, title:'Virus–bacterium distinctions and viral capsid composition', micro:'General viral properties and structure', refs:['Q02','Q03','Q06'], sections:`### Definition
Viruses do not divide by binary fission and cannot be propagated on ordinary cell-free artificial media. Their capsid is a protein coat rather than lipopolysaccharide.

### Mechanism
Virions are assembled from newly synthesized viral components inside living host cells. This differs from bacterial cell division and from cultivation on cell-free bacteriologic media. Capsid proteins protect and shape the viral genome-containing particle.

### Key determinants
Binary fission and artificial-media growth are bacterial comparisons, while lipopolysaccharide belongs to the Gram-negative bacterial outer membrane rather than the viral capsid.

### Clinical significance
These distinctions guide basic viral cultivation and structural reasoning. The answers remain tier-6 study-bank claims requiring independent medical and Helwan faculty review.` },
  { id:A2, title:'The source-defined viral eclipse interval', micro:'Viral replication eclipse', refs:['Q10'], sections:`### Definition
The source defines the viral eclipse interval as the time between uncoating and assembly.

### Mechanism
After uncoating releases the viral genome, synthesis proceeds before newly assembled infectious virions become detectable. The source compresses this into an uncoating-to-assembly interval.

### Key determinants
Do not replace the printed boundaries with infection-to-release, infection-to-intracellular appearance or infection-to-shedding intervals.

### Clinical significance
The eclipse concept organizes viral replication timing, but the exact kinetics vary by virus. This Draft record preserves the source’s simplified boundary without presenting it as a universal kinetic protocol.` },
  { id:A3, title:'Fungus–bacterium comparison and the aflatoxin composite', micro:'General mycology and fungal toxins', refs:['Q14','Q18'], sections:`### Definition
Fungi are heterotrophic eukaryotes with ergosterol-containing membranes and chitin-containing walls. The source separately joins Aspergillus flavus, contaminated-food exposure, chronic liver injury and cancer in its aflatoxin composite.

### Mechanism
Fungal nutritional dependence distinguishes fungi from autotrophic microbial categories. Aflatoxin exposure is presented as a food-borne fungal-toxin pathway with hepatic consequences.

### Key determinants
Q14 preserves the printed nutrition exception and explicitly limits the separate categorical anaerobic-fungus wording. Q18 requires the source’s combined “All of the above” answer rather than one isolated fact.

### Clinical significance
The comparison supports foundational mycology, while the aflatoxin composite signals a clinically important food-associated hazard. Neither Draft item supplies individual exposure or treatment guidance.` },
]

const articleRow = (a) => {
  const qs = a.refs.map((ref) => byRef[ref])
  const ids = qs.map((q) => q.concept)
  return row([
    ['id',a.id],['title',a.title],['arabic_title',''],['aliases',`Family-46 ${a.micro}\nHU-BMS-102 virology and mycology`],['subject','inf'],['topic','Microbiology'],['subtopic','Virology and mycology'],['microtopic',a.micro],['nanotopic','Family-46 safe MCQ slice'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['template_id','TPL-CONCEPT'],['archetype','concept'],['language','en'],['learner_stage','Years 1–3 foundation'],['reading_time','6'],['high_yield','High'],['time_sensitive','stable'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],
    ['summary',`Question-led teaching for ${a.micro.toLowerCase()} with literal Family-46 option structures and source-authority limits.`],['sections',`${a.sections}\n\n### Source-grounded claims\n${qs.map((q) => q.display).join('\n')}`],['published_summary',''],['published_sections',''],['hold_these',qs.map((q) => q.display).join('\n')],['lose_the_mark','Treating the red study-answer register as an official examination key.\nSilently repairing malformed Family-46 Q07 or importing any held dependency.\nUniversalizing the Q14 categorical comparison or using Q18 as patient-specific risk guidance.'],['related_concepts',ids.join('\n')],['related_articles',allArticles.filter((id) => id !== a.id).join('\n')],['question_ids',qs.map((q) => q.id).join('\n')],['resource_ids',source],['universities','hu'],['years','HU_Y1'],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Virology and mycology > ${a.micro} > Family-46`],['university_notes','hu: Tier-6 local study-bank answers only; no visible institutional assessment, sitting, marks or official-key status is inferred.'],['annotations',ids.map((id) => `### definition_of · ${id}\nQuote: ${byConcept[id].display}\nBlock: body`).join('\n\n')],['media',''],['media_recommendations',''],['callout_evidence',qs.map((q) => `### ${q.display}\nClaims: ${q.claim}\nCitations: ${q.questionCit}, ${q.keyCit}\nSpan: ${q.span}`).join('\n\n')],['article_source_ids',source],['claim_ids',qs.map((q) => q.claim).join('\n')],['span_ids',qs.map((q) => q.span).join('\n')],['publication_gate','needs_evidence'],['evidence_basis','Exact tier-6 prompt occurrence and directly aligned red study-answer letter from the same governed carrier; no official-key authority is claimed.'],['evidence_gaps','Independent medical verification and named Helwan microbiology faculty review remain required. Family-46 holds Q01/Q04/Q05/Q07–Q09/Q11–Q13/Q15–Q17/Q19 without student-facing records.'],['conflicts','[clear]'],['last_reviewed',''],['review_due',''],['notes','Family 46 releases only Q02/Q03/Q06/Q10/Q14/Q18. All thirteen other occurrences remain dependency, malformed-option, or medical/non-exclusive holds.'],['field_notes','arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
}

const conceptRow = (c) => {
  const q = byRef[c.ref]
  return row([
    ['label',c.label],['id',c.id],['canonical_key',c.key],['aliases',c.aliases.join('\n')],['arabic_label',''],['arabic_aliases','[clear]'],['definition',c.definition],['explicit_objective',c.objective],['pitfalls',c.pitfalls],['concept_type',c.type],['status','Draft'],['support_mode','direct_statement'],['subject','inf'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Virology and mycology > ${c.micro} > ${c.nano}`],['article_ids',c.article],['related_article_ids',allArticles.filter((id) => id !== c.article).join('\n')],['related_concept_ids','[clear]'],['resource_ids',source],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.55'],['exam_weight_by_year','HU_Y1=0.55'],['clinical_relevance','0.60'],['academic_relevance','0.94'],['weight_confidence','0.42'],['confidence',c.ref === 'Q14' || c.ref === 'Q18' ? '0.72' : '0.84'],['exam_signal',`${source} | tier-6 local MCQ study bank | Family-46 ${c.ref}, printed answer in p3 register | not an official examination key`],['atomic_claim_ids',q.claim],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],['original_wording',`[Family-46 ${c.ref}] ${q.stem} [printed answer ${q.key}]`],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty',c.limitation],['evidence_gaps',`No visible university, official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan faculty review remain required.`],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath the canonical placement.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family-46 prompt and answer pages.\nsourceCandidateIds: Family 46 completed the governed search-before-mint gate.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-scope rival exists.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nreuseGovernance: New Family-46 question-led concept after governed no-same-scope adjudication.'],
  ])
}

const wrongNotes = {
  Q02:['The source presents a single nucleic-acid type as a viral property, not the exception.','Filterability is presented as a viral property in this comparison.','','The source presents lack of antibiotic susceptibility as a viral property.','Dependence on living cells rather than artificial media is presented as a viral property.'],
  Q03:['Acellular organization is presented as a viral distinction.','Routine light microscopy does not resolve most viruses in this introductory comparison.','The source presents lack of antibiotic susceptibility as a viral distinction.','','Either DNA or RNA is presented as a viral distinction.'],
  Q06:['Protection of nucleic acid is a capsid function.','Attachment may be mediated by capsid proteins in non-enveloped viruses and is retained as a source-listed function.','','Capsid proteins are antigenic in the source framework.','Capsid organization determines viral morphology.'],
  Q10:['','This describes a broader infection-to-release interval rather than the printed eclipse boundary.','This option does not match the source’s uncoating-to-assembly definition.','This describes a broader infection-to-shedding interval.'],
  Q14:['The source presents larger size as a fungal difference.','The source presents membrane ergosterol as a fungal difference.','','This categorical source option is not the printed key and must not be universalized as exception-free modern fungal taxonomy.','The source presents chitin-containing cell wall as a fungal difference.'],
  Q18:['This is one source-listed component, but the printed best answer combines all four statements.','This is one source-listed component, but the printed best answer combines all four statements.','This is one source-listed component, but the printed best answer combines all four statements.','This is one source-listed component, but the printed best answer combines all four statements.',''],
}

const answerRows = (q) => q.options.flatMap((option, i) => {
  const letter = 'ABCDE'[i]
  const correct = letter === q.key
  const explanation = correct ? `The option “${option}” is the directly printed study answer because ${q.reason}. The key takeaway is: ${q.display} ${byConcept[q.concept].limitation}` : `${wrongNotes[q.ref][i]} The tested relationship is: ${q.display} Therefore “${option}” is not the printed best answer.`
  return [[`answer_${'abcde'[i]}`,option],[`explanation_${'abcde'[i]}`,explanation]]
})

const questionRow = (q) => {
  const c = byConcept[q.concept]
  return row([
    ['id',q.id],['title',q.stem],['subject','inf'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format','single best answer'],['derived_from',''],['correct_answer',q.key],...answerRows(q),['topic','Virology and mycology'],['subtopic',c.micro],['difficulty','Moderate'],['question_type','Microbiology'],['main_concept',q.concept],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Virology and mycology > Family-46 > ${q.ref}`],['clinical_relevance','0.60'],['academic_relevance','0.94'],['cognitive_effort_score','0.46'],['exam_weight_by_year','HU_Y1=0.55'],['question_only_for','HU_Y1'],['concept_ids',q.concept],['years','HU_Y1'],['universities','hu'],['cognitive_effort','Low'],['setting','Academic'],['reasoning_level','1'],['inferred_difficulty','46'],['exam_relevance','6'],['contextual_concept_ids',''],['library_ids',c.article],['resource_ids',source],['learning_objective',c.objective],['media_recommendations',''],['source_citation',`${source}, PDF p${q.page}, Family-46 ${q.ref}: literal option structure; directly aligned red study answer ${q.key} in the p3 Key Answers register. Tier-6 local study-bank authority only, not an official examination or authenticated official key.`],['attachments',''],['attached_image',''],['author_notes',`Literal source wording, case and option count are preserved without answer repair. ${c.limitation} Holds without student-facing records: Q01/Q04/Q05/Q08/Q09/Q11/Q12/Q13/Q16/Q17/Q19 dependencies; Q07 malformed merged C/D; Q04/Q15 medical or non-exclusive conflicts.`],['estimated_seconds','60'],['randomise_answers','yes'],
  ])
}

const claimRow = (q) => { const c=byConcept[q.concept]; return row([['id',q.claim],['concept_id',q.concept],['subject','inf'],['predicate',c.predicate],['object',c.object],['display_text',q.display],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence',q.ref === 'Q14' || q.ref === 'Q18' ? '0.72' : '0.84'],['freshness','stable_local_study_answer'],['time_sensitive','no'],['qualifiers',`authority: tier-6 local prompt plus printed study-answer register, without official-key status. scope: ${c.limitation}`]]) }
const questionCitation = (q) => row([['id',q.questionCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Options: ${q.options.map((o,i)=>`${'ABCDE'[i]}. ${o}`).join(' | ')}`],['locator_type','page'],['locator_page',q.page],['locator_section',`Family-46 ${q.ref}`],['locator_detail','Exact literal prompt and complete option structure'],['context_note','Tier-6 local study-bank prompt with no visible institution, sitting, marks or official-key provenance.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
const keyCitation = (q) => row([['id',q.keyCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.ref.replace('Q','')}- ${q.key}`],['locator_type','page'],['locator_page','3'],['locator_section','Key Answers'],['locator_detail',`Red answer register directly aligns Family-46 ${q.ref} to ${q.key}`],['context_note','Printed study-answer letter only; not an authenticated official answer key.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
const spanRow = (q) => row([['id',q.span],['article_id',byConcept[q.concept].article],['section_id',`${byConcept[q.concept].article.toLowerCase()}-${q.ref.toLowerCase()}`],['text',q.display],['claim_ids',q.claim],['citation_ids',`${q.questionCit}\n${q.keyCit}`]])

const relationRows = joinRows([
  row([['source','CON-INF-5E1C201794529A'],['type','related_concepts'],['target','CON-INF-E2959CFD4E6AC1'],['evidence_claim_ids','CLM-HU102-F46-Q02-01\nCLM-HU102-F46-Q03-01'],['citation_ids','CIT-HU102-F46-Q02-QUESTION\nCIT-HU102-F46-Q03-QUESTION'],['verification_status','needs_evidence'],['confidence','0.82'],['qualifiers','scope: binary-fission and artificial-media exceptions are distinct but related virus–bacterium comparisons'],['reviewer','Medical team, Helwan Microbiology faculty']]),
  row([['source','CON-INF-A2E01EFECFD519'],['type','associated_with'],['target','CON-INF-42D3CD63BED44A'],['evidence_claim_ids','CLM-HU102-F46-Q06-01\nCLM-HU102-F18P1-Q03-01'],['citation_ids','CIT-HU102-F46-Q06-QUESTION\nCIT-HU102-F18P1-Q03-CURR'],['verification_status','needs_evidence'],['confidence','0.82'],['qualifiers','scope: the capsid protein-versus-LPS distinction complements the existing capsomer-arrangement and viral-symmetry concept'],['reviewer','Medical team, Helwan Microbiology faculty']]),
  row([['source','CON-INF-5E8EA87BB06915'],['type','associated_with'],['target','CON-INF-C72D67C0E285FD'],['evidence_claim_ids','CLM-HU102-F46-Q10-01\nCLM-HU102-F18P1-Q12-01'],['citation_ids','CIT-HU102-F46-Q10-QUESTION\nCIT-HU102-F18P1-Q12-CURR'],['verification_status','needs_evidence'],['confidence','0.82'],['qualifiers','scope: the source-defined uncoating-to-assembly interval complements the existing no-detectable-infectious-virus eclipse property'],['reviewer','Medical team, Helwan Microbiology faculty']]),
  row([['source','CON-INF-FFCD984EDD1FEC'],['type','related_concepts'],['target','CON-INF-9072CD0317FCFE'],['evidence_claim_ids','CLM-HU102-F46-Q14-01\nCLM-HU102-F46-Q18-01'],['citation_ids','CIT-HU102-F46-Q14-QUESTION\nCIT-HU102-F46-Q18-QUESTION'],['verification_status','needs_evidence'],['confidence','0.76'],['qualifiers','scope: the general fungal comparison and the Aspergillus-aflatoxin application are distinct but related mycology scopes'],['reviewer','Medical team, Helwan Microbiology faculty']]),
])

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family46-part1-sources.md',sourceRow],
  ['article/HU-BMS-102-microbiology-family46-part1-articles.md',joinRows(articleSpecs.map(articleRow))],
  ['concept/HU-BMS-102-microbiology-family46-part1-concepts.md',joinRows(concepts.map(conceptRow))],
  ['evidence/HU-BMS-102-microbiology-family46-part1-claims.md',joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family46-part1-citations.md',joinRows([...questions.map(questionCitation), ...questions.map(keyCitation)])],
  ['evidence/HU-BMS-102-microbiology-family46-part1-spans.md',joinRows(questions.map(spanRow))],
  ['relations/HU-BMS-102-microbiology-family46-part1-relations.md',relationRows],
  ['question/HU-BMS-102-microbiology-family46-part1-questions.md',joinRows(questions.map(questionRow))],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family:'46-part1', refs:questions.map((q)=>q.ref), answers:questions.map((q)=>`${q.ref}:${q.key}`), released:{sources:1,articles:3,concepts:6,newConcepts:6,questions:6,claims:6,citations:12,spans:6,relations:4}, holds:{dependencies:['Q01','Q04','Q05','Q08','Q09','Q11','Q12','Q13','Q16','Q17','Q19'], malformedOptions:['Q07'], medicalOrNonExclusive:['Q04','Q15']} },null,2))
