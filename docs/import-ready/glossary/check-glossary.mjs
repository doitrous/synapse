// Mirrors ImportWizard.parseMarkdown + guess() + GlossaryImportPage.validateRow/commit,
// so a batch can be checked before anyone opens the wizard.
import { readFileSync } from 'node:fs'

const CATEGORIES = ['Directional & anatomy','Word parts','Signs & symptoms','Examination','Investigations','Common conditions','Pharmacology']
const FIELD_KEYS = ['term','ar','category','def','defAr','example','id']
const ALIASES = { english:'term', arabic:'ar', word:'term', definition:'def', definition_ar:'defAr', meaning:'def', group:'category' }

const normalize = (v) => v.trim().toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')
function parseMarkdown(text){
  const docs = text.split(/^\s*---\s*$/m).map(p=>p.trim()).filter(Boolean)
  const objects = docs.map(doc=>{
    const result={}
    const h1=doc.match(/^#\s+(.+)$/m)?.[1]?.trim()
    const matcher=/^##\s+(.+)\s*\n([\s\S]*?)(?=^##\s+|$)/gm
    let m; while((m=matcher.exec(doc))) result[normalize(m[1])]=m[2].trim()
    if(h1&&normalize(h1)!=='item'&&!result.title)result.title=h1
    return result
  })
  const headers=[...new Set(objects.flatMap(o=>Object.keys(o)))]
  return { headers, rows: objects.map(o=>headers.map(h=>o[h]??'')) }
}
const slug = (v) => v.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)

let bad = 0
const seenIds = new Map()
// INDEX.md sits in this folder by convention and is not a batch.
for (const file of process.argv.slice(2).filter(f => !f.endsWith('INDEX.md'))) {
  const sheet = parseMarkdown(readFileSync(file,'utf8'))
  const mapping = sheet.headers.map(h => { const g = ALIASES[normalize(h)] ?? normalize(h); return FIELD_KEYS.includes(g) ? g : '__ignore__' })
  const unmapped = sheet.headers.filter((h,i)=>mapping[i]==='__ignore__')
  const problems = []
  if (!sheet.headers.length) problems.push('NO HEADERS — the wizard would refuse this file')
  if (unmapped.length) problems.push(`columns the wizard will NOT auto-map: ${unmapped.join(', ')}`)
  sheet.rows.forEach((row, i) => {
    const v = {}; mapping.forEach((k,c)=>{ if(k!=='__ignore__') v[k]=row[c] ?? '' })
    const n = i + 1
    for (const req of ['term','ar','def','defAr','example']) if (!v[req]?.trim()) problems.push(`row ${n} (${v.term||'?'}): missing ${req}`)
    if (!CATEGORIES.includes(v.category?.trim())) problems.push(`row ${n} (${v.term||'?'}): bad category ${JSON.stringify(v.category)}`)
    const id = v.id?.trim() || slug(v.term ?? '')
    if (seenIds.has(id)) problems.push(`row ${n} (${v.term}): duplicate id "${id}" — also ${seenIds.get(id)}`)
    else seenIds.set(id, `${file}#${n}`)
    // Circular use is the whole word inside its own definition. Naming the affix as a
    // token ("dent- comes from Latin") is not circular, so a head followed by "-" passes.
    const head = (v.term||'').split('\u00b7')[0].trim().toLowerCase().replace(/[-\u2013]|\(o\)/g,'')
    const esc = head.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
    if (head.length > 2 && v.def && new RegExp(`(?<!-)\\b${esc}\\b(?!-)`,'i').test(v.def)) problems.push(`row ${n} (${v.term}): definition uses the term itself`)
  })
  bad += problems.length
  console.log(`${file}: ${sheet.rows.length} rows, ${sheet.headers.length} columns → ${problems.length ? 'PROBLEMS' : 'clean'}`)
  problems.forEach(p => console.log('   -', p))
}
console.log(`\ntotal ids: ${seenIds.size} | total problems: ${bad}`)
