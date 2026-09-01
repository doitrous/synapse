import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'

const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const pdf='/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs Repair MCQs.pdf'
const source='src_4f5e06c1ac4a6efc2e69'
const A1='ART-HU-BMS102-PAT-F160-REPAIR-PRINCIPLES'
const A2='ART-HU-BMS102-PAT-F160-WOUND-BONE-CNS'
const TF='true or false'
const normal=x=>x.replace(/\s+/g,' ').trim()
const extract=(start,end)=>execFileSync('pdftotext',['-layout','-f',String(start),'-l',String(end),pdf,'-'],{encoding:'utf8'})

function parseQuestions(){
  const out=[]
  let current=null,option=null,next=1
  for(const [pageOffset,pageText] of extract(1,7).split('\f').entries()){
    const page=1+pageOffset
    for(const raw of pageText.split(/\r?\n/)){
      const line=raw.trim()
      if(!line)continue
      const q=line.match(/^(\d{1,2})\.\s*(.*)$/)
      if(q&&Number(q[1])===next){current={n:next,page,stem:q[2],options:[]};out.push(current);next++;option=null;continue}
      if(!current)continue
      const markers=[...line.matchAll(/(?:^|\s)([A-Ea-e])[.)]\s*/g)]
      if(markers.length&&markers[0].index===0){
        for(let i=0;i<markers.length;i++){
          const start=markers[i].index+markers[i][0].length
          const end=i+1<markers.length?markers[i+1].index:line.length
          current.options.push(normal(line.slice(start,end)));option=current.options.length-1
        }
        continue
      }
      if(option===null)current.stem=normal(`${current.stem} ${line}`)
      else current.options[option]=normal(`${current.options[option]} ${line}`)
    }
  }
  if(out.length!==41||out.at(-1)?.n!==41)throw new Error(`expected 41 prompts, parsed ${out.length}`)
  for(const q of out){q.stem=normal(q.stem);q.options=q.options.map(normal)}
  return out
}

function parseKeys(){
  const keys=new Map()
  for(const match of extract(8,8).matchAll(/\b(\d{1,2})-([a-e])\b/gi))keys.set(Number(match[1]),match[2].toUpperCase())
  if(keys.size!==41)throw new Error(`expected 41 keys, parsed ${keys.size}`)
  for(let n=1;n<=41;n++)if(!keys.has(n))throw new Error(`missing key ${n}`)
  return keys
}

const replayExclusions=new Set([18,19,20,21,22,23,24,25,26,27,29,30,31,32,33,34,35,36,37,38,40,41])
const schemaHolds=new Set([11,13,17])
if(replayExclusions.size!==22||schemaHolds.size!==3)throw new Error('disposition-set checksum failed')
const canonical=new Map([
  [1,'clean-incision-primary-intention-linear-scar'],
  [2,'open-wound-secondary-intention-contraction'],[7,'open-wound-secondary-intention-contraction'],
  [3,'alcoholic-cirrhosis-healing-by-fibrosis'],
  [4,'keloid-beyond-wound-margins-recurrence'],
  [5,'fracture-demolition-macrophage-osteoclast-clearance'],
  [6,'resolution-complete-restoration-definition'],
  [8,'cns-gliosis-replaces-fibrosis'],[39,'cns-gliosis-replaces-fibrosis'],
  [9,'provisional-callus-woven-bone-cartilage'],
  [10,'fgf-fibroblast-angiogenesis-wound-healing'],
  [12,'regeneration-requires-capacity-and-stroma'],
  [14,'clotting-first-skin-wound-healing-step'],
  [15,'wound-epithelium-normal-thickness-day-five'],
  [16,'primary-intention-excludes-wound-contraction'],
  [28,'incisional-macrophages-day-three-not-24h']
])
const keys=parseKeys(),raw=parseQuestions()
const safe=[]
for(const q of raw){
  q.key=keys.get(q.n)
  if(replayExclusions.has(q.n)||schemaHolds.has(q.n))continue
  q.canonical=canonical.get(q.n)
  if(!q.canonical)throw new Error(`missing canonical handle for Q${q.n}`)
  q.format=q.options.length===2?TF:'single best answer'
  const importerValid=q.format===TF?q.options.length===2:q.options.length>=4&&q.options.length<=5
  if(!importerValid)throw new Error(`Q${q.n}: importer-incompatible ${q.options.length}-option record escaped disposition`)
  const answer=q.options[q.key.charCodeAt(0)-65]
  if(answer===undefined)throw new Error(`Q${q.n}: key ${q.key} does not resolve`)
  q.article=q.n<=10&&q.n!==8?A1:A2
  q.ref=`Q${String(q.n).padStart(2,'0')}`
  q.label=`${q.stem} — source-selected ${answer}`
  q.correct=`The terminal source key identifies ${q.key}) ${answer} as the answer to this exact source question.`
  safe.push(q)
}
if(safe.length!==16)throw new Error(`expected 16 safe retained records, got ${safe.length}`)
if(new Set(safe.map(q=>q.canonical)).size!==14)throw new Error('expected 14 authored handles')
for(const n of schemaHolds){const q=raw[n-1];if(q.options.length!==3)throw new Error(`Q${n}: expected a three-option hold, parsed ${q.options.length}`)}

const specs=safe.map(q=>({ref:q.ref,key:q.key,canonical:q.canonical,label:q.label,article:q.article,qp:q.page,kp:8,stem:q.stem,options:q.options,format:q.format,correct:q.correct,authorNotes:'Literal stem and option wording preserved after joining native PDF line wraps.'}))
const relations=[
  {sourceRef:'Q01',targetRef:'Q02',type:'contrasts_with',scope:'the source contrasts first-intention closure with open-wound secondary-intention healing'},
  {sourceRef:'Q02',targetRef:'Q07',type:'related_concepts',scope:'the two retained vignettes share the same secondary-intention contraction handle'},
  {sourceRef:'Q03',targetRef:'Q06',type:'contrasts_with',scope:'the source contrasts fibrotic repair with complete restoration by resolution'},
  {sourceRef:'Q05',targetRef:'Q09',type:'related_concepts',scope:'the source tests demolition-stage clearance and provisional-callus composition in fracture healing'},
  {sourceRef:'Q08',targetRef:'Q39',type:'related_concepts',scope:'the two retained wordings share the CNS gliosis-replaces-fibrosis handle'},
  {sourceRef:'Q14',targetRef:'Q15',type:'related_concepts',scope:'the source tests the first wound-healing step and later epithelial-thickness timing'},
  {sourceRef:'Q16',targetRef:'Q28',type:'contrasts_with',scope:'the source tests primary-intention features and the corrected macrophage timing proposition'}
].filter(r=>{
  const s=specs.find(q=>q.ref===r.sourceRef),t=specs.find(q=>q.ref===r.targetRef)
  return s&&t&&s.canonical!==t.canonical
})

const out=authorFamily(repo,{family:160,source,subtopic:'Repair keyed study bank',sourceMeta:{title:'Repair',institution:'Helwan BMS-102 repository context (not visibly named in carrier)',path:'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs Repair MCQs.pdf',pages:8,sha:'4f5e06c1ac4a6efc2e69032a33efaba33cf0310f7dea4001a416737ac439148f',rights:'Local terminal-keyed study bank held for internal authoring only; no source page is redistributed.',qualification:'Tier-3 complete terminal-keyed repair study bank of otherwise unattributed visible authority. It is not an authenticated Helwan exam, official departmental key, candidate response, or practical station record.'},authorityNote:'The visible carrier identifies only Repair and devotional/study text. Its terminal key is auxiliary study-bank evidence; metadata authorship is not promoted to visible institutional or official-key authority.',evidenceBasis:'Exact native-text stems and options on pages 1–7 reconciled against the complete terminal Key Answers grid on page 8.',notes:'Twenty-two exact or orthographic Final Revision prompt-layer replays are excluded. Retained Q11, Q13 and Q17 are held out because each has only three printed choices and the importer requires four or five for an MCQ; no fourth option is invented. All authored wording and keys remain literal and medically unrepaired.',uncertainty:'Tier-3 terminal-keyed study-bank evidence only; no visible university, instructor, assessment title, academic year, sitting, marks, candidate ownership, or official-key approval is established.',freshness:'source_created_2025-08-12',keyDetail:'Terminal Key Answers grid for Q1–Q41 on PDF page 8',articles:[{id:A1,title:'Repair principles in Family160',micro:'Repair principles',summary:'The keyed study bank tests source-bounded principles of regeneration, fibrosis, resolution and wound repair.'},{id:A2,title:'Wound, bone and CNS repair in Family160',micro:'Wound, bone and CNS repair',summary:'The keyed study bank tests source-bounded wound timing, fracture repair and CNS gliosis propositions.'}],specs,relations})
const trueFalse=safe.filter(q=>q.format===TF).length
console.log(JSON.stringify({...out,rawPrompts:41,rawAnswers:41,replayExclusions:22,schemaHolds:3,safeRetained:16,acceptedHandles:14,mcq:16-trueFalse,trueFalse,priorBmsReuses:14,conceptDelta:0,holdDetail:'Q11, Q13 and Q17 each have only three printed choices; no fourth option was invented.'},null,2))
