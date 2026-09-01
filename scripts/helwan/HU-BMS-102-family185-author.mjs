import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'

const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const pdf='/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pathology/Questions/Questions circulatory disturbance (1).pdf'
const source='src_78d43325a1bdcfbceab8'
const A1='ART-HU-BMS102-PAT-F185-CIRCULATORY-PRINCIPLES'
const A2='ART-HU-BMS102-PAT-F185-CIRCULATORY-CASES'
const normal=x=>x.replace(/\s+/g,' ').trim()
const pageText=p=>execFileSync('pdftotext',['-layout','-f',String(p),'-l',String(p),pdf,'-'],{encoding:'utf8'}).split('\f')[0]
const slug=x=>normal(x).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,92)

function cleanLine(raw){
  let line=raw.trim()
  const km=raw.match(/\s{5,}([A-E])\s*$/)
  return {line:km?raw.replace(/\s{5,}[A-E]\s*$/,'').trim():line,key:km?.[1]}
}

function addOptions(q,line,style){
  const re=style===1?/(?:^|\s{2,})(?:\()?([a-eA-E])(?:\)|\.)\s*/g:/(?:^|\s{2,})(?:•\s*([A-E])\s*|([A-E])(?:\.|\s)\s*)/g
  const ms=[...line.matchAll(re)]
  if(!ms.length)return false
  for(let i=0;i<ms.length;i++){
    const start=ms[i].index+ms[i][0].length
    const end=i+1<ms.length?ms[i+1].index:line.length
    q.options.push(normal(line.slice(start,end)))
  }
  return true
}

function parsePages(pages,style){
  const out=[]
  let current=null, inOptions=false
  for(const page of pages){
    for(const raw of pageText(page).split(/\r?\n/)){
      const {line,key}=cleanLine(raw)
      if(key&&current)current.key=key
      if(!line||/^PATHOLOGY\b/.test(line)||/^MCQ on Circulatory/.test(line)||/^DR \. AHMED HASSAN/.test(line))continue
      const qm=line.match(/^(\d+)\.\s*(.*)$/)
      if(qm){
        const n=Number(qm[1])
        if(style===1&&n===13&&current?.n===12){current.stem=normal(`${current.stem} ${qm[2]}`);if(key)current.key=key;continue}
        current={n,page,stem:qm[2],options:[],key};out.push(current);inOptions=false;continue
      }
      if(!current)continue
      if(addOptions(current,line,style)){inOptions=true;continue}
      if(inOptions&&current.options.length)current.options[current.options.length-1]=normal(`${current.options.at(-1)} ${line}`)
      else current.stem=normal(`${current.stem} ${line}`)
    }
  }
  return out
}

const first=parsePages([1,2,3,4,5,6,7],1)
const second=parsePages([10,11,12,13,14,15],2)
if(first.length!==32)throw new Error(`expected 32 first-block MCQs, parsed ${first.length}`)
if(second.length!==18)throw new Error(`expected 18 second-block MCQs, parsed ${second.length}`)
for(const [block,qs] of [['B1',first],['B2',second]])for(const q of qs){
  if(!q.key)throw new Error(`${block} Q${q.n}: missing source answer`)
  if(q.options.length<4||q.options.length>5)throw new Error(`${block} Q${q.n}: parsed ${q.options.length} options ${JSON.stringify(q)}`)
  if(q.options[q.key.charCodeAt(0)-65]===undefined)throw new Error(`${block} Q${q.n}: key ${q.key} does not resolve`)
}

const safe=[...first.map(q=>({...q,block:'B1'})),...second.map(q=>({...q,block:'B2'}))]
const reuseCanonical=new Map([
  ['B1-Q18','virchow-triad'],
  ['B1-Q20','necrosis.coagulative.ischaemic-protein-denaturation'],
  ['B1-Q21','embolism'],
  ['B1-Q27','pathology.infarction.anemic-renal-artery-thrombosis'],
  ['B1-Q28','paradoxical-embolism'],
  ['B1-Q30','pathology.gangrene.dry-limb-gradual-arterial-obstruction'],
  ['B1-Q33','pathology.thrombus.red-venous-location'],
  ['B2-Q01','pathology.thrombus.versus-postmortem-clot'],
  ['B2-Q02','pathology.thrombus.lines-of-zahn'],
  ['B2-Q03','pathology.thromboembolism.dvt-pulmonary-embolism-clinical-pathway'],
  ['B2-Q11','pathology.ischemia.diabetic-mesenteric-atherosclerosis-abdominal-angina'],
  ['B2-Q12','pathology.thrombosis.cold-water-fish-oil-ischemic-risk-reduction'],
  ['B2-Q13','pathology.infarction.atrial-fibrillation-renal-coagulative-necrosis'],
  ['B2-Q14','pathology.thromboembolism.dvt-pulmonary-embolism-clinical-pathway'],
  ['B2-Q15','pathology.thrombosis.adenocarcinoma-trousseau-venous-thromboembolism'],
  ['B2-Q16','pathology.thrombosis.organization-one-month'],
  ['B2-Q17','pathology.coagulation.gram-negative-sepsis-dic-endothelial-injury'],
  ['B2-Q18','pathology.thrombosis.adenocarcinoma-trousseau-venous-thromboembolism']
])
const reuseConceptId=new Map([
  ['B1-Q18','CON-CVS-1DBCD5D81337B5'],
  ['B1-Q28','CON-CVS-B5692258332FC3']
])
const specs=safe.map(q=>{
  const ref=`${q.block}-Q${String(q.n).padStart(2,'0')}`
  const answer=q.options[q.key.charCodeAt(0)-65]
  return {ref,key:q.key,canonical:reuseCanonical.get(ref)??`family185-${q.block.toLowerCase()}-${slug(q.stem)}-source-key-${q.key.toLowerCase()}`,concept:reuseConceptId.get(ref),label:`${q.stem} — source-selected ${answer}`,article:q.block==='B1'?A1:A2,qp:q.page,kp:q.page,stem:q.stem,options:q.options,correct:`The right-margin source annotation identifies ${q.key}) ${answer} as the answer to this exact source question.`,authorNotes:'Literal stem and option wording preserved after joining native PDF line wraps; the right-margin answer letter remains an auxiliary source annotation.'}
})
if(specs.length!==50)throw new Error(`expected 50 safe keyed MCQs, got ${specs.length}`)
if(reuseCanonical.size!==18||new Set(reuseCanonical.values()).size!==16)throw new Error('prior-concept reuse checksum failed')
if(reuseConceptId.size!==2)throw new Error('cross-subject concept-id reuse checksum failed')

const relations=[
  {sourceRef:'B1-Q01',targetRef:'B1-Q02',type:'related_concepts',scope:'the source jointly tests lymphatic obstruction and hypoproteinaemia as oedema mechanisms'},
  {sourceRef:'B1-Q06',targetRef:'B1-Q09',type:'related_concepts',scope:'the source relates thrombin activity to disseminated intravascular coagulation'},
  {sourceRef:'B1-Q10',targetRef:'B1-Q20',type:'related_concepts',scope:'the source tests infarction causation and its common necrosis pattern'},
  {sourceRef:'B1-Q11',targetRef:'B1-Q25',type:'related_concepts',scope:'the source tests pulmonary embolic consequences and the destination of venous emboli'},
  {sourceRef:'B1-Q29',targetRef:'B1-Q30',type:'contrasts_with',scope:'the source contrasts wet-gangrene features with dry gangrene caused by poor arterial circulation'},
  {sourceRef:'B2-Q01',targetRef:'B2-Q02',type:'related_concepts',scope:'the source relates thrombus-versus-clot distinctions to Lines of Zahn'},
  {sourceRef:'B2-Q03',targetRef:'B2-Q04',type:'related_concepts',scope:'the source relates venous thromboembolus destination to determinants of its effect'},
  {sourceRef:'B2-Q10',targetRef:'B2-Q18',type:'related_concepts',scope:'the source tests immobilisation and adenocarcinoma as deep-venous-thrombosis risks'},
  {sourceRef:'B2-Q11',targetRef:'B2-Q13',type:'related_concepts',scope:'the source tests arterial occlusion and coagulative necrosis in organ ischaemia'},
  {sourceRef:'B2-Q14',targetRef:'B2-Q15',type:'related_concepts',scope:'the source relates pulmonary thromboembolism triggers to recurrent events associated with malignancy'}
]

const out=authorFamily(repo,{family:185,source,subtopic:'Circulatory disturbance keyed teaching bank',sourceMeta:{title:'Questions circulatory disturbance (1)',institution:'Helwan BMS-102 repository context (not visibly named in carrier)',path:'Year 1/BMS 102/Pathology/Questions/Questions circulatory disturbance (1).pdf',pages:37,sha:'78d43325a1bdcfbceab83304fe44f961e47c6bc6156d99d9e46729115773a668',rights:'Local instructor-attributed teaching bank held for internal authoring only; no source page is redistributed.',qualification:'Tier-9 instructor-attributed auxiliary teaching-bank evidence. It is not an authenticated Helwan exam, official departmental key, candidate response, or practical station record.'},authorityNote:'The carrier repeatedly attributes the material to Dr Ahmed Hassan but visibly names no university, module, sitting, marks, or official key. Right-margin letters are treated only as source-supplied auxiliary answers.',evidenceBasis:'Exact native-text stems, option sets, and same-page right-margin answer letters on PDF pages 1–7 and 10–15.',notes:'Complete disposition: 168 raw operations comprise 61 MCQs and 107 written prompts. Fifty MCQs have importer-valid option sets and same-page right-margin source answers and are authored here. Eleven MCQs are unkeyed holds. Seven immediately answered written rows are explicit unmarked-written holds, including the visibly partial gangrene row. The remaining 100 written prompts are unkeyed holds. No options, marks, answers, or authority are inferred.',uncertainty:'Tier-9 auxiliary teaching-bank evidence only; no visible university, module, academic year, sitting, marks, candidate ownership, official-key approval, or practical-station authority is established.',freshness:'source_created_2025-03-25',keyDetail:'Same-page right-margin answer letter beside the exact MCQ',articles:[{id:A1,title:'Circulatory disturbance principles in Family185',micro:'Oedema, thrombosis, embolism and infarction',summary:'The instructor-attributed bank tests source-bounded principles of oedema, thrombosis, embolism, infarction, shock and gangrene.'},{id:A2,title:'Circulatory disturbance cases in Family185',micro:'Circulatory clinicopathological cases',summary:'The instructor-attributed bank applies source-bounded circulatory pathology principles to keyed text vignettes.'}],specs,relations})
console.log(JSON.stringify({...out,rawPrompts:168,rawMcq:61,rawWritten:107,sourceAnswers:57,safeKeyedMcq:50,acceptedHandles:48,priorConceptReuseOccurrences:18,priorConceptReuses:16,newConcepts:32,unkeyedMcqHolds:11,unmarkedWrittenHolds:7,unkeyedWrittenHolds:100,totalHolds:118},null,2))
