import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'

const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const pdf='/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs PATHO Q-BANK.pdf'
const TF='true or false'
const chapters=[
  {name:'Cell',title:'Cell injury and adaptation',qStart:5,qEnd:12,keyStart:13,keyEnd:13,total:56,article:'ART-HU-BMS102-PAT-F159-CELL'},
  {name:'Circulatory',title:'Circulatory disturbances',qStart:15,qEnd:24,keyStart:25,keyEnd:25,total:40,article:'ART-HU-BMS102-PAT-F159-CIRCULATORY'},
  {name:'Inflammation',title:'Inflammation',qStart:27,qEnd:45,keyStart:46,keyEnd:47,total:129,article:'ART-HU-BMS102-PAT-F159-INFLAMMATION'},
  {name:'Infection',title:'Infection and granulomatous inflammation',qStart:49,qEnd:50,keyStart:51,keyEnd:51,total:14,article:'ART-HU-BMS102-PAT-F159-INFECTION'},
  {name:'Repair',title:'Repair and regeneration',qStart:53,qEnd:54,keyStart:55,keyEnd:55,total:12,article:'ART-HU-BMS102-PAT-F159-REPAIR'},
  {name:'Mixed',title:'Mixed general pathology',qStart:57,qEnd:71,keyStart:72,keyEnd:72,total:62,article:'ART-HU-BMS102-PAT-F159-MIXED'}
]

const extract=(start,end)=>execFileSync('pdftotext',['-layout','-f',String(start),'-l',String(end),pdf,'-'],{encoding:'utf8'})
const normal=x=>x.replace(/\s+/g,' ').trim()

function parseQuestions(chapter){
  const questions=[]
  let current=null, option=null, next=1
  const pages=extract(chapter.qStart,chapter.qEnd).split('\f')
  for(let pageOffset=0;pageOffset<pages.length;pageOffset++){
    const page=chapter.qStart+pageOffset
    for(const raw of pages[pageOffset].split(/\r?\n/)){
      const line=raw.trim()
      if(!line)continue
      const question=line.match(/^(\d{1,3})\.\s*(.*)$/)
      if(question&&Number(question[1])===next){
        current={chapter:chapter.name,n:next,page,stem:question[2],options:[]}
        questions.push(current);next++;option=null;continue
      }
      if(!current)continue
      const answer=line.match(/^(?:•\s*)?([A-E])\.\s*(.*)$/)
      if(answer){current.options.push(answer[2]);option=current.options.length-1;continue}
      if(option===null)current.stem=normal(`${current.stem} ${line}`)
      else current.options[option]=normal(`${current.options[option]} ${line}`)
    }
  }
  // Cell Q56 prints all four choices on one line. Preserve those choices rather
  // than inventing structure or dropping the inline B-D markers.
  const inline=questions.find(q=>q.n===56&&q.options.length===1&&q.options[0].includes(' B. '))
  if(inline)inline.options=inline.options[0].split(/\s+[B-D]\.\s+/).map(normal)
  if(questions.length!==chapter.total||questions.at(-1)?.n!==chapter.total)throw new Error(`${chapter.name}: expected ${chapter.total} questions, parsed ${questions.length}`)
  for(const q of questions){q.stem=normal(q.stem);q.options=q.options.map(normal)}
  return questions
}

function parseKeys(chapter){
  const keys=new Map()
  for(const match of extract(chapter.keyStart,chapter.keyEnd).matchAll(/\b(\d{1,3})\.\s*(True|False|[A-E])\b/g))keys.set(Number(match[1]),match[2])
  if(keys.size!==chapter.total)throw new Error(`${chapter.name}: expected ${chapter.total} keys, parsed ${keys.size}`)
  for(let n=1;n<=chapter.total;n++)if(!keys.has(n))throw new Error(`${chapter.name}: missing key ${n}`)
  return keys
}

const exclusions=new Set([
  'Cell:30','Cell:33','Cell:35','Cell:41','Cell:48','Cell:54','Cell:38','Cell:46','Cell:55','Cell:53',
  'Circulatory:20','Circulatory:23','Circulatory:26',
  'Inflammation:72','Inflammation:88','Inflammation:97','Inflammation:98','Inflammation:102','Inflammation:104','Inflammation:105','Inflammation:107','Inflammation:108','Inflammation:110','Inflammation:111','Inflammation:114','Inflammation:120','Inflammation:125','Inflammation:126','Inflammation:127','Inflammation:129','Inflammation:117','Inflammation:121','Inflammation:124','Inflammation:116','Inflammation:115','Inflammation:113',
  'Infection:8','Infection:13','Infection:14',
  'Repair:5',
  'Mixed:15','Mixed:18','Mixed:27','Mixed:29','Mixed:33','Mixed:43','Mixed:44','Mixed:45','Mixed:57','Mixed:60','Mixed:62','Mixed:23','Mixed:39','Mixed:4'
])
if(exclusions.size!==54)throw new Error(`expected 54 copy exclusions, got ${exclusions.size}`)

const slug=x=>normal(x).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').split('-').slice(0,10).join('-')||'source-item'
const baseKey=q=>`pathology.f159.${q.chapter.toLowerCase()}.q${String(q.n).padStart(3,'0')}.${slug(q.stem)}`
const semanticTargets=new Map([
  ['Circulatory:39','Circulatory:9'],
  ['Circulatory:19','Circulatory:11'],
  ['Circulatory:27','Circulatory:12'],
  ['Inflammation:103','Inflammation:80']
])

const retained=[]
const all=new Map()
for(const chapter of chapters){
  const keys=parseKeys(chapter)
  for(const q of parseQuestions(chapter)){
    const locator=`${chapter.name}:${q.n}`
    q.sourceKey=keys.get(q.n)
    q.key=q.sourceKey==='True'?'A':q.sourceKey==='False'?'B':q.sourceKey
    q.article=chapter.article
    q.ref=`${chapter.name.toUpperCase()}-Q${String(q.n).padStart(3,'0')}`
    q.kp=chapter.name==='Inflammation'&&q.n>=80?47:chapter.keyStart
    q.format=q.sourceKey==='True'||q.sourceKey==='False'?TF:'single best answer'
    q.canonical=baseKey(q)
    all.set(locator,q)
    if(!exclusions.has(locator))retained.push(q)
  }
}
for(const [from,to] of semanticTargets){
  const q=all.get(from),target=all.get(to)
  if(!q||!target||exclusions.has(from)||exclusions.has(to))throw new Error(`invalid semantic collapse ${from} -> ${to}`)
  q.canonical=target.canonical
}
if(retained.length!==259)throw new Error(`expected 259 retained questions, got ${retained.length}`)
const handleCount=new Set(retained.map(q=>q.canonical)).size
if(handleCount!==255)throw new Error(`expected 255 handles, got ${handleCount}`)
for(const q of retained){
  const allowed=q.format===TF?q.options.length===2:q.options.length>=4&&q.options.length<=5
  if(!allowed)throw new Error(`${q.ref}: importer-incompatible ${q.options.length}-option ${q.format}`)
  const answer=q.options[q.key.charCodeAt(0)-65]
  if(answer===undefined)throw new Error(`${q.ref}: key ${q.key} does not resolve`)
  q.label=`${q.stem} — source-selected ${answer}`
  q.correct=q.format===TF
    ?`The terminal source key prints ${q.sourceKey}; this corresponds to ${q.key}) ${answer} in the exact two-option source item.`
    :`The terminal source key identifies ${q.key}) ${answer} as the answer to this exact source question.`
  q.authorNotes=q.format===TF?'Literal stem and True/False option wording preserved after joining PDF line wraps; the terminal word key is mapped to its printed option letter.':'Literal stem and option wording preserved after joining PDF line wraps.'
}

const articleByName=new Map(chapters.map(c=>[c.article,c]))
const articles=chapters.map(c=>({id:c.article,title:`${c.title} in Family159`,micro:c.title,summary:`The compiled keyed study bank tests source-bounded ${c.title.toLowerCase()} propositions.`}))
const specs=retained.map(q=>({ref:q.ref,key:q.key,canonical:q.canonical,label:q.label,article:q.article,qp:q.page,kp:q.kp,stem:q.stem,options:q.options,format:q.format,correct:q.correct,authorNotes:q.authorNotes}))
const relations=[
  {sourceRef:'CELL-Q001',targetRef:'CELL-Q010',type:'contrasts_with',scope:'the source tests metaplasia and hypertrophy as distinct adaptive responses'},
  {sourceRef:'CELL-Q015',targetRef:'CELL-Q024',type:'contrasts_with',scope:'the source contrasts myocardial coagulative necrosis with cerebral liquefactive necrosis'},
  {sourceRef:'CIRCULATORY-Q001',targetRef:'CIRCULATORY-Q003',type:'related_concepts',scope:'the source links platelet adhesion with aspirin-sensitive thromboxane formation'},
  {sourceRef:'CIRCULATORY-Q010',targetRef:'CIRCULATORY-Q015',type:'contrasts_with',scope:'the source tests renal infarction morphology and post-fracture fat embolism'},
  {sourceRef:'INFLAMMATION-Q001',targetRef:'INFLAMMATION-Q002',type:'contrasts_with',scope:'the source contrasts serous and fibrinous inflammatory examples'},
  {sourceRef:'INFLAMMATION-Q004',targetRef:'INFLAMMATION-Q009',type:'related_concepts',scope:'the source tests phagocytosis and complement-mediated chemotaxis'},
  {sourceRef:'INFECTION-Q001',targetRef:'INFECTION-Q006',type:'contrasts_with',scope:'the source contrasts tuberculous Langhans giant cells with noncaseating sarcoidosis'},
  {sourceRef:'REPAIR-Q001',targetRef:'REPAIR-Q003',type:'related_concepts',scope:'the source links extensive skin loss repair with granulation tissue composition'},
  {sourceRef:'MIXED-Q001',targetRef:'MIXED-Q002',type:'related_concepts',scope:'the source tests two consecutive source propositions about neutrophil recognition and killing'},
  {sourceRef:'MIXED-Q005',targetRef:'MIXED-Q022',type:'related_concepts',scope:'the source tests complement activation and opsonization'},
  {sourceRef:'MIXED-Q031',targetRef:'MIXED-Q056',type:'related_concepts',scope:'the source tests protein-energy malnutrition in two source-bounded presentations'}
]
for(const relation of relations){if(!specs.some(q=>q.ref===relation.sourceRef)||!specs.some(q=>q.ref===relation.targetRef))throw new Error(`relation references excluded item: ${relation.sourceRef} -> ${relation.targetRef}`)}
void articleByName

const out=authorFamily(repo,{family:159,source:'src_9bca614057658d04392e',subtopic:'Compiled general pathology Q-bank',sourceMeta:{title:'GENERAL PATHOLOGY Q-BANK',institution:'Student-compiled EKB pathology bank; Helwan BMS-102 repository context',path:'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs PATHO Q-BANK.pdf',pages:73,sha:'9bca614057658d04392e315313eb60db5cdcbfe70ff2b7be21fa7bde825f2331',rights:'Local student-compiled EKB study bank held for internal authoring only; no source page is redistributed.',qualification:'Tier-3 complete keyed student-compiled EKB pathology study bank. It is not an administered examination, candidate script, official departmental answer register, or independently verified key.'},authorityNote:'The source visibly says Compiled By Eyad Ahmed&Eman Hefny and warns that apparently wrong or unclear answers should be checked with the doctor or leaders. Terminal keys are preserved as study-bank evidence, not promoted to official or independently verified answers.',evidenceBasis:'Exact native-text stems and options from the six question chapters reconciled against each chapter terminal key on pages 13, 25, 46–47, 51, 55 and 72.',notes:'All retained source wording and terminal keys remain literal and unrepaired. Fifty-four governed second-copy occurrences are excluded; four altered-wording pairs remain separate questions but share their adjudicated handle. The byte-identical manifest alias Questions/PATHO Q-BANK.pdf is one governed object and adds no records.',uncertainty:'Tier-3 student-compiled EKB study-bank evidence only; no sitting, academic year, marks, duration, candidate ownership, official-key approval, recurrence, or independent medical verification is established.',freshness:'source_modified_2025-04-12',keyDetail:'Chapter terminal Key Answers grid; printed True/False words map only to the corresponding printed two-option letter',articles,specs,relations})
const trueFalse=retained.filter(q=>q.format===TF).length
console.log(JSON.stringify({...out,rawPrompts:313,rawAnswers:313,holds:0,copyExclusions:54,retained:259,acceptedHandles:255,mcq:259-trueFalse,trueFalse,semanticReductions:4,priorBmsReuses:158,conceptDelta:97,duplicateCarrierAliases:1},null,2))
