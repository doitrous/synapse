import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_932f5302a132003041e5'
const A_THROMBI = 'ART-HU-BMS102-PAT-THROMBI'
const A_EMBOLI = 'ART-HU-BMS102-PAT-EMBOLI'
const C_RISK = 'CON-CVS-1DBCD5D81337B5'
const C_CLOT = 'CON-FND-EBFB010E0D4121'
const C_ZAHN = 'CON-FND-7E61964BE1D637'
const C_DVT = 'CON-FND-A2AEC2D4E9A458'
const C_EMB = 'CON-FND-B5E4F3F73B582D'
const row = (fields) => `# Item\n${fields.map(([k,v]) => `## ${k}\n${v ?? ''}`).join('\n')}`
const rows = (items) => items.join('\n---\n\n')
const extract = (path,id) => {
  const item = readFileSync(path,'utf8').split(/\n---\n/).find((x)=>x.includes(`## id\n${id}\n`))
  if (!item) throw new Error(`missing ${id} in ${path}`)
  return item.trim()
}
const field = (item,name) => {
  const m=item.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))
  if(!m) throw new Error(`missing field ${name}`)
  return m[1].trimEnd()
}
const setField=(item,name,value)=>item.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`),`$1${value}`)
const ensureField=(item,name,value='')=>item.includes(`## ${name}\n`) ? item : `${item}\n## ${name}\n${value}`
const appendLines=(item,name,values)=>{
  item=ensureField(item,name,'[clear]')
  const current=field(item,name).split(/\n| \| /).filter((x)=>x && x!=='[clear]')
  for(const value of values) if(!current.includes(value)) current.push(value)
  return setField(item,name,current.join('\n') || '[clear]')
}
const appendText=(item,name,value)=>{
  item=ensureField(item,name,'')
  const current=field(item,name)
  return setField(item,name,current.includes(value) ? current : `${current}\n${value}`.trim())
}

const questions = [
 {ref:'Q01',page:'2',key:'B',concept:C_RISK,article:A_THROMBI,stem:'Thrombosis is caused by one of the following:',options:['Decreased blood viscosity','Blood stasis','Decreased number of platelets','Roughening of tunica adventitia','Vasodilatation'],correct:'Blood stasis is one arm of Virchow’s triad and is the printed answer.',wrong:['Decreased viscosity is not the keyed prothrombotic factor.','','A decreased platelet count is not the keyed Virchow-triad factor.','The source specifies adventitial rather than endothelial roughening, so this is not the keyed factor.','Vasodilatation alone is not the keyed cause.']},
 {ref:'Q02',page:'2',key:'C',concept:C_CLOT,article:A_THROMBI,stem:'During a routine autopsy study of A 55-year-old dead body, the heart ventricles contain soft jelly-like mass not attached to the cardiac wall. The mass has a red lower part with a yellow upper part. This mass is called:',options:['Thrombus','Granuloma','Post mortem clot','Hematoma','Ecchymosis'],correct:'The soft, non-adherent, gravity-separated mass after death is a post mortem clot.',wrong:['A thrombus forms during life and is adherent, firm and rough.','A granuloma is an organized inflammatory aggregate, not this intravascular mass.','','A hematoma is an extravascular collection of blood.','Ecchymosis is a larger cutaneous/subcutaneous hemorrhage.']},
 {ref:'Q03',page:'2',key:'D',concept:C_RISK,article:A_THROMBI,stem:'One of the following isn’t a part of Virchow’s triad:',options:['Endothelial injury','Hypercoagulability of blood','Stasis or turbulent blood flow','Thrombocytopenia'],correct:'Thrombocytopenia is not one of the three components of Virchow’s triad.',wrong:['Endothelial injury is a component of the triad.','Hypercoagulability is a component of the triad.','Abnormal flow, including stasis or turbulence, is a component of the triad.','']},
 {ref:'Q04',page:'2',key:'D',concept:C_RISK,article:A_THROMBI,stem:'Which one of the following events usually occurs first during thrombosis:',options:['Platelet aggregation','Precipitation of fibrin','Vasodilatation','Damage to the endothelium','Leukocytosis'],correct:'Endothelial damage precedes platelet adhesion/aggregation and fibrin deposition in the source sequence.',wrong:['Platelet aggregation follows the initiating endothelial injury.','Fibrin deposition follows initiation and platelet activation.','Vasodilatation is not the initiating event keyed here.','','Leukocytosis is not the initiating event in thrombus formation.']},
 {ref:'Q05',page:'2',key:'C',concept:C_ZAHN,article:A_THROMBI,stem:'Which of the following is true about lines of Zahn?',options:['They’re important lines that delay direct spread of tumors','They consist of a network of fibrin and are seen in blood clots','They’re apparent laminations in thrombi','They’re basement membrane components that affect healing','They’re hyperemic skin marks seen in allergic inflammation'],correct:'Lines of Zahn are visible laminations in an antemortem thrombus.',wrong:['They are unrelated to barriers to tumour spread.','Fibrin alone does not capture their alternating laminated structure.','','They are not basement-membrane components.','They are not cutaneous marks of allergic inflammation.']},
 {ref:'Q06',page:'3',key:'D',concept:C_RISK,article:A_THROMBI,stem:'Thrombosis is caused by:',options:['Anemia','Hypocoagulability','Neutropenia','Roughness of intima','Thrombocytopenia'],correct:'Intimal roughness represents endothelial injury, a Virchow-triad mechanism.',wrong:['Anemia is not the keyed mechanism.','Hypocoagulability opposes rather than promotes thrombosis.','Neutropenia is not a Virchow-triad component.','','Thrombocytopenia is not the keyed cause.']},
 {ref:'Q07',page:'3',key:'C',concept:C_RISK,article:A_THROMBI,stem:'Three major factors that predispose to thrombosis are:',options:['Decreased blood viscosity, accelerated blood flow and endothelial damage','Increased blood viscosity, accelerated blood flow and endothelial damage','Endothelial damage, increased blood viscosity and diminished blood flow','Fibrinolysis, fibrinoid necrosis of vessel wall and atherosclerosis','Disintegration of WBCs lysosomes, thrombocytopenia and bacteremia'],correct:'This option maps to endothelial injury, hypercoagulability/increased viscosity and stasis/diminished flow.',wrong:['Accelerated flow and decreased viscosity do not express the full triad.','Accelerated flow is not the stasis component.','','This list does not state the three Virchow-triad mechanisms.','This list does not state the three Virchow-triad mechanisms.']},
 {ref:'Q08',page:'3',key:'D',concept:C_RISK,article:A_THROMBI,stem:'Which of the following isn’t associated with thrombosis?',options:['Activation of thrombosis mechanism','Endothelial damage','Formation of platelets aggregates','Thrombocytopenia','Vascular stasis'],correct:'Thrombocytopenia is the printed exception among the listed thrombosis associations.',wrong:['Activation of coagulation/thrombosis mechanisms is associated with thrombus formation.','Endothelial damage promotes thrombosis.','Platelet aggregation contributes to thrombus formation.','','Vascular stasis promotes thrombosis.']},
 {ref:'Q09',page:'3',key:'B',concept:C_DVT,article:A_THROMBI,stem:'Three days after a labor a 20-year-old lady presented with swollen tender leg. The possible diagnosis is:',options:['Blood clot','Deep venous thrombosis of the leg','Hyperemia of the leg','Septic shock','Venous embolization of the leg'],correct:'A tender swollen leg in the early postpartum period is keyed as deep venous thrombosis of the leg.',wrong:['“Blood clot” is nonspecific and does not give the source’s clinical diagnosis.','','Hyperemia does not explain the source-keyed postpartum presentation.','Septic shock is a systemic syndrome and is not the keyed diagnosis.','An embolus travels from its source; the leg presentation is keyed as thrombosis.']},
 {ref:'Q10',page:'3',key:'C',concept:C_RISK,article:A_THROMBI,stem:'The factors predisposing to thrombosis include:',options:['Smooth intima','Rapid flow','Slowing of blood flow','Anemia','thrombocytopenia'],correct:'Slowing of blood flow is stasis, one component of Virchow’s triad.',wrong:['A smooth intact intima is not the keyed predisposing factor.','Rapid flow is not the stasis mechanism.','','Anemia is not the keyed factor.','Thrombocytopenia is not the keyed factor.']},
 {ref:'Q11',page:'4',key:'A',concept:C_EMB,article:A_EMBOLI,stem:'Embolism means:',options:['Circulation of intravascular solid, liquid or gaseous mass that is carried by the blood to a site distant from its point of origin','Circulation of intravascular solid mass only that is carried by the blood to a site distant from its point of origin','Circulation of only intravascular insoluble liquid that is carried by the blood to a site distant from its point of origin','Circulation of only intravascular gas that is carried by the blood to a site distant from its point of origin'],correct:'An embolus may be solid, liquid or gaseous and travels to a distant site.',wrong:['','Emboli are not limited to solid material.','Emboli are not limited to insoluble liquid.','Emboli are not limited to gas.']},
 {ref:'Q12',page:'4',key:'E',concept:C_RISK,article:A_THROMBI,stem:'Which of the followings has no relation to thrombus formation?',options:['Increased platelet number','Polycythemia','Aneurysmal sacs and varicose veins','Atheroma','Normal leucocytic count'],correct:'A normal leucocytic count has no source-stated relationship to thrombus formation.',wrong:['An increased platelet number can contribute to a hypercoagulable tendency.','Polycythemia increases viscosity and can promote thrombosis.','Aneurysmal sacs and varicose veins promote abnormal flow/stasis.','Atheroma can injure or disrupt endothelium.','']},
]
for(const q of questions){q.id=`Q-HU102-PAT-F118-${q.ref}`;q.claim=`CLM-HU102-F118-${q.ref}-01`;q.qcit=`CIT-HU102-F118-${q.ref}-QUESTION`;q.kcit=`CIT-HU102-F118-${q.ref}-KEY`;q.span=`SPN-HU102-F118-${q.ref}-01`}
const byConcept = Object.groupBy(questions,(q)=>q.concept)

const sourceRow=row([
 ['id',source],['title','Thrombus & Embolism — MCQ Lecture 13'],['institution','Instructor-attributed Level 1 pathology lecture bank'],['collection_id','hu-y1'],['source_relative_path','Year 1/BMS 102/Pathology/Notes and Summaries/Thrombus & Embolism.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','9'],['sha256','932f5302a132003041e5b106968be782a6eea3dbf91d537ff61295e6e9b8a55d'],['processing_status','pending'],['rights','Local instructor-attributed study material held for internal authoring only; no source page is redistributed.'],['qualification','Tier-3 Dr Ahmed Hassan Lecture 13 keyed MCQ bank. Thirty-nine questions each carry one printed right-margin answer letter. The byte-identical L13 MCQ.pdf carrier adds no occurrence. Family118 Part1 releases Q01–Q12; Q13–Q39 remain valid keyed backlog. No institution, module code, academic year, assessment date, marks, sitting or authenticated official-key statement is printed.'],['is_assessment','yes'],
])

const articlePath=join(root,'article','HU-BMS-102-pathology-articles.md')
const upsertArticle=(id,qs,other)=>{
 let item=extract(articlePath,id)
 const concepts=[...new Set(qs.map((q)=>q.concept))]
 for(const [name,values] of [['hold_these',concepts.map((id)=>conceptDisplay[id])],['related_concepts',concepts],['related_articles',[other]],['question_ids',qs.map((q)=>q.id)],['resource_ids',[source]],['article_source_ids',[source]],['claim_ids',qs.map((q)=>q.claim)],['span_ids',qs.map((q)=>q.span)]]) item=appendLines(item,name,values)
 item=appendText(item,'sections',`### Family 118 Part 1 source-grounded extensions\n${concepts.map((id)=>conceptDisplay[id]).join('\n')}`)
 item=appendText(item,'annotations',concepts.map((id)=>`### definition_of · ${id}\nQuote: ${conceptDisplay[id]}\nBlock: body`).join('\n\n'))
 item=appendText(item,'callout_evidence',qs.map((q)=>`### ${conceptDisplay[q.concept]}\nClaims: ${q.claim}\nCitations: ${q.qcit}, ${q.kcit}\nSpan: ${q.span}`).join('\n\n'))
 item=appendText(item,'evidence_basis','Family118 Part1 adds literal tier-3 prompts and directly aligned printed right-margin answer letters; these are instructor-bank keys, not an official institutional answer register.')
 item=appendText(item,'evidence_gaps','Independent medical verification and named Helwan pathology faculty review remain required. Family118 Q13–Q39 remain valid keyed backlog.')
 item=appendText(item,'notes',`Family118 Part1 exact-ID article reuse preserves the earlier article and appends reciprocity for ${qs.map((q)=>q.ref).join(', ')}.`)
 return item
}

const conceptDisplay={
 [C_RISK]:'Thrombosis is promoted by endothelial injury, abnormal blood flow and hypercoagulability; stasis and intimal injury are keyed examples, while thrombocytopenia and a normal leucocytic count are exceptions in their printed option sets.',
 [C_CLOT]:'A soft, smooth, non-adherent red-and-yellow intravascular mass found after death is a post-mortem clot rather than an antemortem thrombus.',
 [C_ZAHN]:'Lines of Zahn are apparent alternating laminations in an antemortem thrombus.',
 [C_DVT]:'A swollen tender leg three days after labor is source-keyed as deep venous thrombosis of the leg.',
 [C_EMB]:'Embolism is circulation of an intravascular solid, liquid or gaseous mass to a site distant from its origin.',
}
const objective={
 [C_RISK]:'Recognise Virchow-triad mechanisms and distinguish them from option-set exceptions.',
 [C_CLOT]:'Distinguish a post-mortem clot from a thrombus using attachment, texture and dependent colour separation.',
 [C_ZAHN]:'Recognise Lines of Zahn as thrombus laminations.',
 [C_DVT]:'Identify deep venous thrombosis in the source-bounded postpartum presentation.',
 [C_EMB]:'Define embolism without restricting embolic material to one physical state.',
}

const conceptSources={
 [C_RISK]:join(repo,'docs','import-ready','concept','SYS-CVS-CONCEPT-T07.md'),
 [C_CLOT]:join(root,'concept','HU-BMS-102-pathology-concepts.md'),
 [C_ZAHN]:join(root,'concept','HU-BMS-102-pathology-concepts.md'),
 [C_EMB]:join(repo,'docs','medical-library-program','batches','SYS-FND-CONCEPT-008.md'),
}
const upsertConcept=(id)=>{
 const qs=byConcept[id]
 let item=extract(conceptSources[id],id)
 const embolic=id===C_EMB
 const defaults={topic:'General pathology',subtopic:'Circulatory disturbances',microtopic:embolic?'Embolism':'Thrombosis',nanotopic:`Family118 ${qs.map((q)=>q.ref).join('/')}`,modules:'HU-BMS-102',module_subject:`HU-BMS-102 > Pathology > Circulatory disturbances > ${embolic?'Embolism':'Thrombosis'}`,approved_file_resource_ids:'[clear]',approved_video_resource_ids:'[clear]',blueprint_weight:'0.65',exam_weight_by_year:'HU_Y1=0.65',clinical_relevance:'0.75',academic_relevance:'0.94',weight_confidence:'0.45',confidence:'0.78',resource_occurrence_ids:'[clear]',source_candidate_ids:'[clear]',merge_ids:'[clear]',rejected_merge_candidate_ids:'[clear]',conflicts:'[clear]',uncertainty:'Family118 supplies instructor-bank prompt/key evidence only; no official institutional key is claimed.',exclusion_reason:''}
 for(const [name,value] of Object.entries(defaults)) item=ensureField(item,name,value)
 if(id===C_EMB){
   item=setField(item,'source_candidate_ids','[clear]')
   item=appendText(item,'field_notes','sourceCandidateIds: Family118 source-first adjudication completed; the import field is intentionally blank because no unresolved corpus candidate remains.\nfamily118CandidatePreservation: Earlier candidate identifiers concept_168d395f2aa926ad84b4d3e8 and concept_e5272cc86d6f9a207ff7caed are preserved here as historical candidate provenance.')
 }
 item=appendLines(item,'universities',['hu'])
 item=appendLines(item,'learner_years',['1'])
 item=appendLines(item,'article_ids',[...new Set(qs.map((q)=>q.article))])
 item=appendLines(item,'related_article_ids',[embolic?A_THROMBI:A_EMBOLI])
 item=appendLines(item,'resource_ids',[source])
 item=appendLines(item,'atomic_claim_ids',qs.map((q)=>q.claim))
 item=appendText(item,'exam_signal',`${source} | tier-3 instructor-attributed Lecture 13 bank | Family118 Part1 ${qs.map((q)=>q.ref).join('/')} | printed right-margin study keys, not an official institutional key`)
 item=appendText(item,'original_wording',qs.map((q)=>`[Family118 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n'))
 item=appendText(item,'evidence_gaps','Family118 supplies instructor-bank prompt/key occurrences only. Independent medical verification and Helwan faculty review remain required before publication.')
 item=appendText(item,'field_notes',`family118Part1Reuse: Exact-ID reuse preserves the prior record and appends only Family118 source, claims, article reciprocity and authority limits for ${qs.map((q)=>q.ref).join('/')}.`)
 return item
}
const newConcept=row([
 ['label','A swollen tender leg shortly after labor suggests deep venous thrombosis'],['id',C_DVT],['canonical_key','pathology.thrombosis.postpartum-dvt-clinical-diagnosis'],['aliases','Postpartum deep venous thrombosis\nPuerperal swollen tender leg'],['arabic_label',''],['arabic_aliases','[clear]'],['definition','The source presents a 20-year-old woman with a swollen tender leg three days after labor and keys deep venous thrombosis of the leg. The postpartum setting supplies a transient prothrombotic context, while the unilateral tenderness and swelling localise the clinical problem to the leg veins.'],['explicit_objective',objective[C_DVT]],['pitfalls','Selecting the nonspecific phrase “blood clot,” hyperemia, septic shock, or “venous embolization of the leg.” The source asks for the local diagnosis and does not establish severity, imaging findings or treatment.'],['concept_type','clinical_diagnostic_reasoning'],['status','Draft'],['support_mode','direct_statement'],['subject','fnd'],['primary_node_id','SYS-FND-T03'],['secondary_node_ids','DIS-PAT-T03\nSYS-CVS'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],['module_subject','HU-BMS-102 > Pathology > Circulatory disturbances > Thrombosis > Postpartum DVT'],['article_ids',A_THROMBI],['related_article_ids',A_EMBOLI],['related_concept_ids','[clear]'],['resource_ids',source],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.65'],['exam_weight_by_year','HU_Y1=0.65'],['clinical_relevance','0.86'],['academic_relevance','0.92'],['weight_confidence','0.45'],['confidence','0.78'],['exam_signal',`${source} | tier-3 instructor-attributed Lecture 13 bank | Family118 Q09 | printed right-margin B; not an official institutional key`],['atomic_claim_ids','CLM-HU102-F118-Q09-01'],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],['original_wording','[Family118 Q09] Three days after a labor a 20-year-old lady presented with swollen tender leg. The possible diagnosis is: [printed answer B]'],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty','The diagnosis is preserved as a source-keyed study-bank answer; the carrier supplies no examination or official-key authority.'],['evidence_gaps','No examination sitting, marks or authenticated official answer register is visible. Independent medical verification and Helwan pathology faculty review remain required.'],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Pathology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath SYS-FND-T03.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Local source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family118 Q09 and printed key.\nsourceCandidateIds: Family118 source-first gate found no same-scope external record.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: The existing postoperative DVT concept is a different clinical context.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.'],
])
const expected=`CON-FND-${createHash('sha256').update('pathology.thrombosis.postpartum-dvt-clinical-diagnosis').digest('hex').slice(0,14).toUpperCase()}`
if(expected!==C_DVT) throw new Error(`deterministic ID mismatch ${expected}`)

const letters='ABCDE'
const questionRow=(q)=>row([
 ['id',q.id],['title',q.stem],['subject','fnd'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format','single best answer'],['derived_from',''],['correct_answer',q.key],
 ...q.options.flatMap((option,i)=>[[`answer_${letters[i].toLowerCase()}`,option],[`explanation_${letters[i].toLowerCase()}`,letters[i]===q.key?`${q.correct} ${conceptDisplay[q.concept]} The printed right-margin key is preserved as tier-3 instructor-bank evidence only.`:`${q.wrong[i]} The tested relationship is: ${conceptDisplay[q.concept]}`]]),
 ['topic','Circulatory disturbances'],['subtopic',q.article===A_EMBOLI?'Embolism':'Thrombosis'],['difficulty','Moderate'],['question_type','Pathology'],['main_concept',q.concept],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Pathology > Circulatory disturbances > Family118 > ${q.ref}`],['clinical_relevance',q.ref==='Q09'?'0.86':'0.72'],['academic_relevance','0.95'],['cognitive_effort_score',q.ref==='Q02'||q.ref==='Q09'?'0.58':'0.46'],['exam_weight_by_year','HU_Y1=0.65'],['question_only_for','HU_Y1'],['concept_ids',q.concept],['years','HU_Y1'],['universities','hu'],['cognitive_effort',q.ref==='Q02'||q.ref==='Q09'?'Moderate':'Low'],['setting','Academic'],['reasoning_level',q.ref==='Q02'||q.ref==='Q09'?'2':'1'],['inferred_difficulty',q.ref==='Q02'||q.ref==='Q09'?'58':'46'],['exam_relevance','7'],['contextual_concept_ids',''],['library_ids',q.article],['resource_ids',source],['learning_objective',objective[q.concept]],['media_recommendations',''],['source_citation',`${source}, PDF p${q.page}, Family118 ${q.ref}: literal stem, complete option structure and printed right-margin key ${q.key}. Tier-3 instructor-attributed lecture-bank authority only; not a verified examination or official institutional key.`],['attachments',''],['attached_image',''],['author_notes','Literal wording, capitalization, punctuation and grammar are preserved. The byte-identical L13 MCQ.pdf carrier creates no additional occurrence. Q13–Q39 remain valid keyed backlog, not holds.'],['estimated_seconds',q.ref==='Q02'||q.ref==='Q09'?'75':'60'],['randomise_answers','yes'],
])
const claimParts={
 [C_RISK]:['Virchow-triad thrombosis mechanisms','include','endothelial injury, abnormal blood flow and hypercoagulability, with option-set exceptions preserved'],
 [C_CLOT]:['A soft non-adherent red-and-yellow mass after death','is','a post-mortem clot'],
 [C_ZAHN]:['Lines of Zahn','are','apparent laminations in an antemortem thrombus'],
 [C_DVT]:['A swollen tender leg three days after labor','is source-keyed as','deep venous thrombosis of the leg'],
 [C_EMB]:['Embolism','is','circulation of solid, liquid or gaseous intravascular material to a distant site'],
}
const claimRow=(q)=>{const [s,p,o]=claimParts[q.concept];return row([['id',q.claim],['concept_id',q.concept],['subject','fnd'],['predicate',p],['object',o],['display_text',conceptDisplay[q.concept]],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence','0.78'],['freshness','stable_local_study_answer'],['time_sensitive','no'],['qualifiers',`authority: tier-3 instructor-attributed bank prompt and printed right-margin answer only; no official-key status. occurrence: Family118 ${q.ref}. subject: ${s}.`]])}
const qCitation=(q)=>row([['id',q.qcit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Options: ${q.options.map((x,i)=>`${letters[i]}. ${x}`).join(' | ')}`],['locator_type','page'],['locator_page',q.page],['locator_section',`Family118 ${q.ref}`],['locator_detail','Exact literal prompt and complete printed option structure'],['context_note','Instructor-attributed Lecture 13 bank; no institution, sitting, marks or official-key statement is visible.'],['confidence','0.96'],['counts_as_claim_evidence','no']])
const kCitation=(q)=>row([['id',q.kcit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',q.key],['locator_type','page'],['locator_page',q.page],['locator_section',`Family118 ${q.ref} right-margin key cell`],['locator_detail',`Large printed letter ${q.key} aligned to the item`],['context_note','Directly printed instructor-bank answer letter only; not an authenticated official institutional key.'],['confidence','0.96'],['counts_as_claim_evidence','no']])
const spanRow=(q)=>row([['id',q.span],['article_id',q.article],['section_id',`${q.article.toLowerCase()}-family118-${q.ref.toLowerCase()}`],['text',conceptDisplay[q.concept]],['claim_ids',q.claim],['citation_ids',`${q.qcit}\n${q.kcit}`]])
const rel=(s,t,refs,type,scope)=>row([['source',s],['type',type],['target',t],['evidence_claim_ids',refs.map((r)=>questions.find((q)=>q.ref===r).claim).join('\n')],['citation_ids',refs.map((r)=>questions.find((q)=>q.ref===r).qcit).join('\n')],['verification_status','needs_evidence'],['confidence','0.80'],['qualifiers',`scope: ${scope}`],['reviewer','Medical team, Helwan Pathology faculty']])
const relations=rows([
 rel(C_CLOT,C_ZAHN,['Q02','Q05'],'contrasts_with','gravity-dependent post-mortem separation is distinct from organised antemortem thrombus lamination'),
 rel(C_DVT,C_RISK,['Q09','Q10'],'related_concepts','the postpartum DVT presentation applies thrombosis-risk and stasis teaching without inferring management'),
 rel(C_RISK,C_EMB,['Q07','Q11'],'related_concepts','thrombus formation and embolic transport are related but distinct processes'),
])

const thrombiQs=questions.filter((q)=>q.article===A_THROMBI)
const emboliQs=questions.filter((q)=>q.article===A_EMBOLI)
const conceptRows=[upsertConcept(C_RISK),upsertConcept(C_CLOT),upsertConcept(C_ZAHN),newConcept,upsertConcept(C_EMB)]
const files=new Map([
 ['evidence/HU-BMS-102-pathology-family118-part1-sources.md',sourceRow],
 ['article/HU-BMS-102-pathology-family118-part1-articles.md',rows([upsertArticle(A_THROMBI,thrombiQs,A_EMBOLI),upsertArticle(A_EMBOLI,emboliQs,A_THROMBI)])],
 ['concept/HU-BMS-102-pathology-family118-part1-concepts.md',rows(conceptRows)],
 ['evidence/HU-BMS-102-pathology-family118-part1-claims.md',rows(questions.map(claimRow))],
 ['evidence/HU-BMS-102-pathology-family118-part1-citations.md',rows(questions.flatMap((q)=>[qCitation(q),kCitation(q)]))],
 ['evidence/HU-BMS-102-pathology-family118-part1-spans.md',rows(questions.map(spanRow))],
 ['relations/HU-BMS-102-pathology-family118-part1-relations.md',relations],
 ['question/HU-BMS-102-pathology-family118-part1-mcq.md',rows(questions.map(questionRow))],
])
for(const [relative,body] of files){const path=join(root,relative);mkdirSync(dirname(path),{recursive:true});writeFileSync(path,`${body.trim()}\n`)}
console.log(JSON.stringify({family:'118-part1',refs:questions.map((q)=>q.ref),keys:questions.map((q)=>q.key).join(''),released:{sources:1,articles:2,updatedArticles:2,concepts:5,newConcepts:1,updatedConcepts:4,questions:12,claims:12,citations:24,spans:12,relations:3},backlog:{validKeyed:['Q13–Q39'],count:27},holds:0,duplicateCarrierOccurrences:0},null,2))
