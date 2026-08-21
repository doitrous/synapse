import { readFileSync } from 'node:fs'
import { conceptFromRow, materialiseNewConcept } from '../../src/data/conceptImport.ts'

const conceptPopulated = ['label','canonicalKey','definition','status','articleIds','subjectId','primaryNodeId',
 'conceptType','learnerYears','universityIds','explicitObjective','blueprintWeight','examWeightByYear',
 'clinicalRelevance','academicRelevance','relatedArticleIds','resourceIds','atomicClaimIds','supportMode',
 'confidence','originalWording','owner','reviewer','finalPublisher','publicationStatus','editorialReviewStatus',
 'weightConfidence','fieldNotes']
const conceptPresent = ['systemId','topicTagId','subtopicId','microtopicId','nanotopicId','secondaryNodeIds',
 'relatedConceptIds','moduleIds','aliases','arabicLabel','arabicAliases','pitfalls','approvedFileResourceIds',
 'approvedVideoResourceIds','conflicts','uncertainty','evidenceGaps','mergeIds','rejectedMergeCandidateIds',
 'lastReviewed','reviewDue','exclusionReason']

const normalize = (v) => v.trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')
const parse = (text) => text.split(/^\s*---\s*$/m).map(p=>p.trim()).filter(Boolean).map(doc => {
  const out = {}; const re = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
  let m; while ((m = re.exec(doc))) out[normalize(m[1])] = m[2].trim(); return out })

for (const file of process.argv.slice(2)) {
  const rows = parse(readFileSync(file, 'utf8'))
  const absent = {}, unpopulated = {}
  for (const row of rows) {
    if (!row.id && !row.label) continue
    const c = materialiseNewConcept(conceptFromRow(row))
    for (const k of conceptPresent) if (!(k in c) || c[k] === undefined) (absent[k] ??= []).push(c.id)
    for (const k of conceptPopulated) {
      const v = c[k]
      const empty = v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)
        || (typeof v === 'object' && !Array.isArray(v) && !Object.keys(v).length)
      if (empty && !c.fieldNotes?.[k]) (unpopulated[k] ??= []).push(c.id)
    }
  }
  const a = Object.entries(absent), u = Object.entries(unpopulated)
  console.log(`${file.split('/').pop()}: ${rows.length} rows`)
  console.log(`   absent keys:      ${a.length ? a.map(([k,v])=>`${k}(${v.length})`).join(' ') : 'none'}`)
  console.log(`   unpopulated:      ${u.length ? u.map(([k,v])=>`${k}(${v.length})`).join(' ') : 'none'}`)
}
