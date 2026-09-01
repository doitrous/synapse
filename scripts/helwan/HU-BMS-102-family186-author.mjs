import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'

const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const pdf='/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pathology/Questions/Questions on introductio & cell injury.pdf'
const source='src_ec88cdf3bd17b9c05985'
const A1='ART-HU-BMS102-PAT-F186-ADAPTATION-INJURY'
const A2='ART-HU-BMS102-PAT-F186-DEATH-NECROSIS'
const A3='ART-HU-BMS102-PAT-F186-ACCUMULATIONS-AMYLOID'
const normal=x=>x.replace(/\s+/g,' ').trim()
const slug=x=>normal(x).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,92)
const pageText=p=>execFileSync('pdftotext',['-layout','-f',String(p),'-l',String(p),pdf,'-'],{encoding:'utf8'}).split('\f')[0]

function cleanLine(raw){
  const key=raw.match(/\s{5,}([A-E])\s*$/)?.[1]
  const line=(key?raw.replace(/\s{5,}[A-E]\s*$/,'').trim():raw.trim()).replace(/^а\)/,'a)')
  return {line,key}
}
function addOptions(q,line){
  const re=/(?:^|\s+)(?:\(([a-eA-E])\)|([a-eA-E])[.)])\s*/g
  const ms=[...line.matchAll(re)]
  if(!ms.length)return false
  for(let i=0;i<ms.length;i++){
    const letter=(ms[i][1]??ms[i][2]).toUpperCase()
    const start=ms[i].index+ms[i][0].length,end=i+1<ms.length?ms[i+1].index:line.length
    q.opt.set(letter,normal(line.slice(start,end)));q.last=letter
  }
  return true
}
function parseNumbered(pages,expected){
  const out=[];let current=null,inOptions=false
  for(const page of pages)for(const raw of pageText(page).split(/\r?\n/)){
    const {line,key}=cleanLine(raw);if(key&&current)current.key=key
    if(!line||/^PATHOLOGY\b/.test(line)||/^MCQ$/.test(line)||/^DR \. AHMED HASSAN/.test(line))continue
    const qm=line.match(/^(\d+)[.)]\s*(.*)$/)
    if(qm){current={n:Number(qm[1]),page,stem:qm[2],opt:new Map(),key};out.push(current);inOptions=false;continue}
    if(!current)continue
    if(addOptions(current,line)){inOptions=true;continue}
    if(inOptions&&current.last)current.opt.set(current.last,normal(`${current.opt.get(current.last)} ${line}`))
    else current.stem=normal(`${current.stem} ${line}`)
  }
  if(out.length!==expected)throw new Error(`expected ${expected} numbered questions, parsed ${out.length}`)
  return out
}

const first=parseNumbered([1,2,3,4,5,6,7,8,9],39).map(q=>({...q,block:'B1'}))
const second=parseNumbered([14,15,16,17,18,19],26).map(q=>({...q,block:'B2'}))
const fourth=parseNumbered([26,27],8).map(q=>({...q,block:'B4'}))

const finalFirst=[
  {page:33,stem:'the following are features of apoptosis except :',options:['Commonly caused by bacterial infections','characterized by Fragmentation of nuclear DNA','Characterized by Formation of Cell membrane blebs','may occur in malignant tumors'],key:'A'},
  {page:33,stem:'Caseous necrosis characterized by all of the following features except',options:['cheese the material','Commonly seen in tuberculous lesions','structural outlines of necrotic cells are Preserved','it represents partially liquified coagulative necrosis'],key:'C'},
  {page:33,stem:'which of the following Conditions is Characterized by liquefactive necrosis',options:['Lung infarction','Cerebral infarction','Pulmonary tuberculosis','Rheumatoid arthritis'],key:'B'},
  {page:33,stem:'fat necrosis of breast is due to.',options:['Ischemia','Trauma','autoimmune','metabolic disorder'],key:'B'},
  {page:34,stem:"68 Year-old woman suddenly lost consciousness a on wakening Ihr later She Couldn't speak or on move her Rt arm, 2 month later, CT showed alarge Cystic area in the It Parietal lobe Which of the following Pathologic PROCESSE has most likely occurred in her brain?",options:['apoptosis','coagulative necrosis','fat necrosis','Karyolysis','liquefactive necrosis'],key:'E'},
  {page:34,stem:'which of the following processes most likely occurs in or endometrial Cells to initiate the onset of menstrual bleaching?',options:['apoptosis','atrophy','Caseous necrosis','liquefactive necrosis'],key:'A'},
  {page:34,stem:'which of the flowing considered a reversible Cell injury',options:['Necrosis','hyalinosis','Cloudy swelling','apoptosis'],key:'C'},
  {page:34,stem:'all of the following Conditions associated with Cell Swelling except',options:['apoptosis','Cloudy Swelling','hydropic degeneration','Necrosis'],key:'A'}
].map((q,i)=>({...q,n:i+1,block:'BF',opt:new Map(q.options.map((x,j)=>['ABCDE'[j],x]))}))

function parseFinalTail(){
  const out=[];let current=null,inOptions=false
  const start=(page,n,stem)=>{current={n,page,stem,opt:new Map()};out.push(current);inOptions=false}
  for(const page of [35,36,37,38,39])for(const raw of pageText(page).split(/\r?\n/)){
    const {line,key}=cleanLine(raw);if(key&&current)current.key=key
    if(!line||/^PATHOLOGY\b/.test(line)||/^DR \. AHMED HASSAN/.test(line))continue
    const qm=line.match(/^(\d+)\.\s*(.*)$/)
    if(qm){start(page,qm[1],qm[2]);continue}
    if(page===35&&!current&&/^which of the following types of necrosis IS associated/.test(line)){start(page,'U35',line);continue}
    if(page===37&&/^Sago spleen means:/.test(line)){start(page,'SAGO',line);continue}
    if(!current)continue
    if(addOptions(current,line)){inOptions=true;continue}
    if(inOptions&&current.last)current.opt.set(current.last,normal(`${current.opt.get(current.last)} ${line}`))
    else current.stem=normal(`${current.stem} ${line}`)
  }
  if(out.length!==23)throw new Error(`expected 23 final-tail questions, parsed ${out.length}`)
  return out.map((q,i)=>({...q,n:i+9,block:'BF'}))
}
const final=[...finalFirst,...parseFinalTail()]
if(final.length!==31)throw new Error(`expected 31 final keyed rows, got ${final.length}`)

const candidates=[...first,...second,...fourth,...final]
if(candidates.length!==104)throw new Error(`expected 104 keyed MCQ candidates, got ${candidates.length}`)
const schemaHolds=[]
for(const q of candidates){
  q.options=[...q.opt.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([,v])=>normal(v))
  q.stem=normal(q.stem)
  if(!q.key)throw new Error(`${q.block} ${q.n}: missing source key`)
  if(q.options.length<4||q.options.length>5){
    if(q.options.length===3){schemaHolds.push(q);continue}
    throw new Error(`${q.block} ${q.n}: parsed ${q.options.length} options ${JSON.stringify(q)}`)
  }
  if(q.options[q.key.charCodeAt(0)-65]===undefined)throw new Error(`${q.block} ${q.n}: key ${q.key} does not resolve`)
}
if(schemaHolds.length!==4||schemaHolds.some(q=>q.block!=='BF'||q.n<25||q.n>28))throw new Error(`unexpected schema holds: ${schemaHolds.map(q=>`${q.block}-${q.n}`).join(', ')}`)
const safe=candidates.filter(q=>!schemaHolds.includes(q))
if(safe.length!==100)throw new Error(`expected 100 importer-valid keyed MCQs, got ${safe.length}`)
const sharedCanonical=new Map([
  ['B4-Q08','family186-b1-brown-atrophy-includes-all-of-the-following-except-source-key-b'],
  ['BF-Q03','family186-b1-which-of-the-following-conditions-is-characterized-by-liquefactive-necrosis-source-key-b']
])

const specs=safe.map(q=>{
  const ref=`${q.block}-Q${String(q.n).padStart(2,'0')}`,answer=q.options[q.key.charCodeAt(0)-65]
  const necrosis=/necros|apopt|cell death|gangrene/i.test(q.stem)
  const accumulation=/amyloid|calcif|melanin|hyalin|pigment|fatty|brown atrophy/i.test(q.stem)
  const article=accumulation?A3:necrosis?A2:A1
  return {ref,key:q.key,canonical:sharedCanonical.get(ref)??`family186-${q.block.toLowerCase()}-${slug(q.stem)}-source-key-${q.key.toLowerCase()}`,label:`${q.stem} — source-selected ${answer}`,article,qp:q.page,kp:q.page,stem:q.stem,options:q.options,correct:`The right-margin source annotation identifies ${q.key}) ${answer} as the answer to this exact source question.`,authorNotes:'Literal stem and option wording preserved after joining native PDF line wraps; malformed source numbering remains represented by the stable Family186 block/row reference.'}
})

const relations=[
  {sourceRef:'B1-Q01',targetRef:'B1-Q02',type:'related_concepts',scope:'the source relates cellular adaptation categories to mitochondrial aerobic-respiration injury'},
  {sourceRef:'B1-Q03',targetRef:'B1-Q04',type:'related_concepts',scope:'the source tests reperfusion free-radical formation and mechanisms of free-radical damage'},
  {sourceRef:'B1-Q05',targetRef:'BF-Q05',type:'related_concepts',scope:'the source contains two keyed cerebral-infarction liquefaction vignettes'},
  {sourceRef:'B1-Q07',targetRef:'BF-Q02',type:'related_concepts',scope:'the source revisits caseous-necrosis morphology in two keyed blocks'},
  {sourceRef:'B1-Q08',targetRef:'BF-Q03',type:'related_concepts',scope:'the source revisits cerebral infarction as liquefactive necrosis'},
  {sourceRef:'B2-Q01',targetRef:'B2-Q02',type:'contrasts_with',scope:'the source contrasts programmed apoptosis with necrosis'},
  {sourceRef:'B2-Q03',targetRef:'B2-Q04',type:'related_concepts',scope:'the source tests necrotic morphology and the CNS exception to coagulative necrosis'},
  {sourceRef:'B2-Q05',targetRef:'B2-Q06',type:'contrasts_with',scope:'the source contrasts liquefactive and fat-necrosis settings'},
  {sourceRef:'B4-Q03',targetRef:'B4-Q04',type:'related_concepts',scope:'the source relates hepatic amyloid location to secondary amyloidosis'},
  {sourceRef:'B4-Q05',targetRef:'B4-Q06',type:'contrasts_with',scope:'the source contrasts dystrophic and metastatic calcification sites'},
  {sourceRef:'BF-Q12',targetRef:'BF-Q06',type:'related_concepts',scope:'the source relates apoptosis to caspase activation and endometrial cell loss'},
  {sourceRef:'BF-Q14',targetRef:'BF-Q15',type:'contrasts_with',scope:'the source contrasts dystrophic with metastatic calcification'},
  {sourceRef:'BF-Q16',targetRef:'BF-Q17',type:'related_concepts',scope:'the source tests systemic amyloidosis causes and severe renal effects'},
  {sourceRef:'BF-Q19',targetRef:'BF-Q20',type:'related_concepts',scope:'the source tests abnormal melanin and cellular/extracellular hyalinosis'},
  {sourceRef:'BF-Q21',targetRef:'BF-Q22',type:'related_concepts',scope:'the source tests pancreatic amyloid and secondary amyloidosis'},
  {sourceRef:'BF-Q24',targetRef:'BF-Q31',type:'related_concepts',scope:'the source tests secondary-amyloid causes and biopsy-site ranking'}
].filter(r=>{
  const s=specs.find(q=>q.ref===r.sourceRef),t=specs.find(q=>q.ref===r.targetRef)
  return s&&t&&s.canonical!==t.canonical
})

const out=authorFamily(repo,{family:186,source,subtopic:'Introduction and cell injury keyed teaching bank',sourceMeta:{title:'Questions on introductio & cell injury',institution:'Helwan BMS-102 repository context (not visibly named in carrier)',path:'Year 1/BMS 102/Pathology/Questions/Questions on introductio & cell injury.pdf',pages:39,sha:'ec88cdf3bd17b9c059852e35f379a9fb588c0c3557509af65022cafedcf3937c',rights:'Local instructor-attributed teaching bank held for internal authoring only; no source page is redistributed.',qualification:'Tier-9 instructor-attributed auxiliary teaching-bank evidence. It is not an authenticated Helwan exam, official departmental key, candidate response, or practical station record.'},authorityNote:'The carrier repeatedly attributes the material to Dr Ahmed Hassan but visibly names no university, module, sitting, marks, or official key. Right-margin letters are treated only as source-supplied auxiliary answers.',evidenceBasis:'Exact native-text stems, option sets, and same-page right-margin answer letters on PDF pages 1–9, 14–19, 26–27 and 33–39.',notes:'Complete disposition: 181 raw operations comprise 125 MCQs and 56 written operations. One hundred four MCQs have importer-valid option sets and same-page right-margin source answers and are authored here. Twenty-one MCQs are unkeyed holds. Twenty immediately answered written rows are explicit unmarked-written holds; the remaining 36 written operations are unkeyed holds. No options, marks, answers, numbering, or authority are inferred.',uncertainty:'Tier-9 auxiliary teaching-bank evidence only; no visible university, module, academic year, sitting, marks, candidate ownership, official-key approval, or practical-station authority is established.',freshness:'source_created_2025-03-23',keyDetail:'Same-page right-margin answer letter beside the exact MCQ',articles:[{id:A1,title:'Adaptation and cell injury in Family186',micro:'Adaptation and cell injury mechanisms',summary:'The instructor-attributed bank tests source-bounded adaptation, injury-mechanism and reversible-injury propositions.'},{id:A2,title:'Cell death and necrosis in Family186',micro:'Apoptosis and necrosis',summary:'The instructor-attributed bank tests source-bounded apoptosis and necrosis mechanisms, morphology and clinicopathological settings.'},{id:A3,title:'Accumulations and amyloid in Family186',micro:'Accumulations, calcification and amyloid',summary:'The instructor-attributed bank tests source-bounded intracellular accumulations, calcification, hyalinosis and amyloid propositions.'}],specs,relations})
console.log(JSON.stringify({...out,rawPrompts:181,rawMcq:125,rawWritten:56,sourceAnswers:124,keyedMcqCandidates:104,safeKeyedMcq:100,threeOptionSchemaHolds:4,unkeyedMcqHolds:21,unmarkedWrittenHolds:20,unkeyedWrittenHolds:36,totalHolds:81},null,2))
