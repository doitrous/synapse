import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'

const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const oldPath='docs/Helwan-Source-Imports/concept/HU-BMS-102-pathology-family185-concepts.md'
const currentConceptPath=join(repo,oldPath)
const currentQuestionPath=join(repo,'docs/Helwan-Source-Imports/question/HU-BMS-102-pathology-family185-mcq.md')
const output=join(repo,'docs/Helwan-Source-Imports/concept/HU-BMS-102-pathology-family185-live-correction-concepts.md')
const oldText=execFileSync('git',['show',`41de310e:${oldPath}`],{cwd:repo,encoding:'utf8'})
const currentText=readFileSync(currentConceptPath,'utf8')
const questionText=readFileSync(currentQuestionPath,'utf8')
const split=x=>x.trim().split(/\n---\n/).map(r=>r.trim())
const get=(x,n)=>x.match(new RegExp(`## ${n}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd()??''
const set=(x,n,v)=>x.replace(new RegExp(`(## ${n}\\n)[\\s\\S]*?(?=\\n## |$)`),`$1${v}`)
const append=(x,n,v)=>{const prior=get(x,n);return set(x,n,prior&&prior!=='[clear]'?`${prior}\n${v}`:v)}
const idOf=x=>get(x,'id')
const currentIds=new Set(split(currentText).map(idOf))
const mainByRef=new Map(split(questionText).map(r=>[idOf(r).replace('Q-HU102-PAT-F185-',''),get(r,'main_concept')]))
const obsolete=split(oldText).filter(r=>!currentIds.has(idOf(r)))
if(obsolete.length!==18)throw new Error(`expected 18 obsolete uploaded concepts, found ${obsolete.length}`)

const corrected=obsolete.map(row=>{
  const original=get(row,'original_wording')
  const ref=original.match(/\[Family185 ([^\]]+)\]/)?.[1]
  const replacement=mainByRef.get(ref)
  if(!ref||!replacement||replacement===idOf(row))throw new Error(`cannot resolve replacement for ${idOf(row)} (${ref??'no ref'})`)
  let x=row
  x=set(x,'definition',`${get(x,'definition')} This source-specific duplicate ID is retained only as a non-published audit record; the governed concept for this scope is ${replacement}.`)
  x=set(x,'explicit_objective',`Do not select or publish this superseded Draft ID. Resolve Family185 ${ref} through governed concept ${replacement}.`)
  x=set(x,'pitfalls',`Publishing this superseded ID would split one tested idea across multiple concept records. Preserve it only for upload-history traceability and use ${replacement}.`)
  x=set(x,'blueprint_weight','0')
  x=set(x,'exam_weight_by_year','HU_Y1=0')
  x=set(x,'clinical_relevance','0')
  x=set(x,'academic_relevance','0')
  x=set(x,'weight_confidence','1')
  x=set(x,'confidence','1')
  x=append(x,'related_concept_ids',replacement)
  x=set(x,'conflicts',`superseded_by:${replacement}`)
  x=set(x,'uncertainty',`No uncertainty about disposition: ${idOf(row)} was minted by the superseded 41de310e upload before exact concept reuse was reconciled. Medical content remains unreviewed.`)
  x=set(x,'evidence_gaps',`This obsolete ID must never be promoted. Independent medical verification and faculty review remain attached to governed replacement ${replacement}.`)
  x=set(x,'last_reviewed','2026-09-01')
  x=set(x,'publication_status','needs_evidence')
  x=set(x,'editorial_review_status','superseded_archived_draft_not_for_publication')
  x=set(x,'exclusion_reason',`Superseded duplicate created by the already-uploaded pre-reconciliation Family185 batch (commit 41de310e). Replaced by governed concept ${replacement}; retained without deletion solely for live audit traceability.`)
  const priorNotes=get(x,'field_notes')
    .replace('lastReviewed: New Draft; no faculty review.','lastReviewed: Governance supersession reviewed 2026-09-01; medical content remains without faculty review.')
    .replace('exclusionReason: Not excluded; held at needs_evidence.','exclusionReason: Superseded duplicate retained only for audit traceability and blocked from publication.')
  x=set(x,'field_notes',`${priorNotes}\nsupersessionSource: Old uploaded Family185 commit 41de310e.\nsupersededBy: ${replacement}.\nsupersessionAction: Non-destructive Draft update; publication remains blocked and no student-facing status is granted.\ncorrectionCommitBasis: Corrected Family185 commit 2c47d10c.`)
  return x
})

const replacementIds=corrected.map(x=>get(x,'related_concept_ids').split(/\n/).at(-1))
if(new Set(corrected.map(idOf)).size!==18)throw new Error('obsolete ID uniqueness checksum failed')
if(replacementIds.some(id=>!currentIds.has(id)))throw new Error('replacement concept missing from corrected Family185 batch')
writeFileSync(output,`${corrected.join('\n---\n\n')}\n`)
console.log(JSON.stringify({obsoleteIds:corrected.map(idOf),obsoleteCount:18,replacementIds:[...new Set(replacementIds)],replacementCount:new Set(replacementIds).size,output},null,2))
