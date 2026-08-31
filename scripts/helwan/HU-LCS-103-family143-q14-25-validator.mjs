#!/usr/bin/env node

import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base,'concept/HU-LCS-103-family143-q14-25-joint-concepts.md'), articles: resolve(base,'article/HU-LCS-103-family143-q14-25-joint-articles.md'),
  claims: resolve(base,'evidence/HU-LCS-103-family143-q14-25-claims.md'), citations: resolve(base,'evidence/HU-LCS-103-family143-q14-25-citations.md'),
  spans: resolve(base,'evidence/HU-LCS-103-family143-q14-25-spans.md'), questions: resolve(base,'question/HU-LCS-103-family143-q14-25-mcq.md'),
}
const parse = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block)=>{ const row={}; for(const m of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |(?![\s\S]))/gm)) row[m[1]]=m[2].trim(); return row })
const loaded={}, raw={}
for(const [kind,path] of Object.entries(paths)){ raw[kind]=await readFile(path,'utf8').catch(()=> ''); assert.notEqual(raw[kind],'',`${kind} exists`); loaded[kind]=parse(raw[kind]) }

const ids=['CON-MSK-26A34BABA3FA5B','CON-MSK-8A2645A63ADA75','CON-MSK-8EC65B29B306A6','CON-MSK-89542F9EA00E08','CON-MSK-70A94F3BD14297','CON-MSK-8A4079D1114BC4']
const keys=['pathology.joint.gout-urate-podagra','pathology.joint.pseudogout-calcium-pyrophosphate','pathology.joint.ganglion-synovial-cyst-benign-lesions','pathology.joint.bursitis-causes-gross-histology','pathology.joint.chordoma-notochord-physaliphorous','bonetumor.chondroblastoma-epiphysis-calcified-giant-cells']
for(const index of [1,3,4,5]) assert.equal(ids[index],`CON-MSK-${createHash('sha256').update(keys[index]).digest('hex').slice(0,14).toUpperCase()}`,'deterministic concept ID')
assert.equal(loaded.concepts.length,6,'six concept rows')
assert.deepEqual(loaded.concepts.map((x)=>x.id),ids,'exact concept IDs')
assert.deepEqual(loaded.concepts.map((x)=>x.canonical_key),keys,'exact concept keys')
assert.ok(loaded.concepts.every((x)=>Object.keys(x).length>=50),'concept field minimum')
assert.ok(loaded.concepts.every((x)=>x.status==='under review'&&x.publication_status==='needs_evidence'),'concepts remain prepublication')
assert.match(loaded.concepts[0].article_ids,/ART-HU-LCS103-PAT-F143-CRYSTAL-ARTHRITIS/,'gout reciprocal link')
assert.match(loaded.concepts[2].article_ids,/ART-HU-LCS103-PAT-F143-GANGLION-BURSITIS/,'ganglion reciprocal link')
assert.match(loaded.concepts[3].uncertainty,/exact source wording.*Draft/i,'bursitis risk')
assert.match(loaded.concepts[4].pitfalls,/Physaliphorous.*Physaliferous.*answer repair/i,'chordoma spelling risk')
assert.match(loaded.concepts[5].uncertainty,/exact source wording.*Draft/i,'chondroblastoma risk')

const articleIds=['ART-HU-LCS103-PAT-F143-CRYSTAL-ARTHRITIS','ART-HU-LCS103-PAT-F143-GANGLION-BURSITIS','ART-HU-LCS103-PAT-F143-CHORDOMA-CHONDROBLASTOMA']
assert.equal(loaded.articles.length,3,'three articles')
assert.deepEqual(loaded.articles.map((x)=>x.id),articleIds,'exact article IDs')
assert.ok(loaded.articles.every((x)=>Object.keys(x).length>=49&&x.status==='Draft'),'article fields and Draft status')
assert.match(loaded.articles[1].conflicts,/Q22.*typically.*source-risk/i,'Q22 article risk')
assert.match(loaded.articles[2].conflicts,/Q24.*Physaliphorous.*physaliferous.*Q25.*review/i,'Q24/Q25 article risks')
for(const c of loaded.concepts){ const linked=loaded.articles.find((a)=>c.article_ids.includes(a.id)); assert.ok(linked&&linked.related_concepts.includes(c.id),`reciprocal link for ${c.id}`) }

assert.equal(loaded.claims.length,6,'six claims')
assert.equal(loaded.citations.length,12,'twelve citations')
assert.equal(loaded.spans.length,6,'six spans')
for(let i=0;i<6;i+=1){ const claim=loaded.claims[i], citations=loaded.citations.filter((x)=>x.claim_id===claim.id), span=loaded.spans[i]; assert.equal(citations.length,2,'two citations per claim'); assert.deepEqual(citations.map((x)=>x.resource_id),['src_d24024cfcd418918201f','src_6995e894c8b7f13c8809'],'assessment plus teaching sources'); assert.ok(citations.every((x)=>x.counts_as_claim_evidence==='no'),'local sources do not count independently'); assert.equal(span.claim_ids,claim.id,'span claim link'); assert.ok(span.citation_ids.includes(citations[0].id)&&span.citation_ids.includes(citations[1].id),'span citation links'); const article=loaded.articles.find((x)=>x.id===span.article_id); assert.ok(article.sections.includes(span.text),'span text in article') }

const expectedKeys='CCBDDBBCBDBB'.split('')
const stems=[
  'A 42-year-old man experiences recurrent attacks of severe pain affecting the great toe. What is the most likely diagnosis?', 'The crystal deposited in gout is:', 'The term “Podagra” refers to:',
  'A 70-year-old patient develops inflammatory arthritis caused by deposition of calcium pyrophosphate crystals. The diagnosis is:', 'Which feature favors pseudogout rather than gout?',
  'A young woman presents with a movable cystic swelling on the dorsum of her wrist. The lesion contains clear mucinous fluid. The diagnosis is:', 'Microscopically, a ganglion cyst wall is most commonly composed of:',
  'A housemaid develops painful swelling over the patella after repeated kneeling. The diagnosis is:', 'Histology of bursitis typically reveals infiltration by:',
  'A 55-year-old patient develops a slow-growing malignant tumor arising from remnants of the notochord in the sacrum. The diagnosis is:', 'Microscopically, chordoma is characterized by:',
  'A 17-year-old boy presents with a lytic lesion containing calcifications in the epiphysis of the proximal tibia. Histology shows chondroblasts and osteoclast-like giant cells. The diagnosis is:',
]
const options=[
  ['Rheumatoid arthritis','Osteoarthritis','Gout','Pseudogout','Septic arthritis'],['Calcium oxalate','Calcium pyrophosphate','Monosodium urate','Cholesterol','Hydroxyapatite'],['Rheumatoid arthritis of the wrist','Gout affecting the great toe','Septic arthritis of the knee','Tuberculosis of the spine','Osteoarthritis of the hip'],
  ['Gout','Rheumatoid arthritis','Osteoarthritis','Pseudogout','Septic arthritis'],['Hyperuricemia','Tophi formation','Great toe involvement','Calcium pyrophosphate deposition','Monosodium urate crystals'],['Bursitis','Ganglion cyst','Tophus','Chondroma','Lipoma'],
  ['Malignant cartilage cells','Dense connective tissue','Caseating granulomas','Osteoid tissue','Skeletal muscle'],['Ganglion','Gout','Bursitis','Rheumatoid arthritis','Chondrosarcoma'],['Neutrophils only','Plasma cells, lymphocytes, and macrophages','Eosinophils only','Chondroblasts','Osteoclasts only'],
  ['Chondroblastoma','Osteochondroma','Chondrosarcoma','Chordoma','Fibrosarcoma'],['Reed-Sternberg cells','Physaliphorous cells','Osteoclast-like giant cells','Plasma cells','Touton giant cells'],['Chondrosarcoma','Chondroblastoma','Chordoma','Osteosarcoma','Enchondroma'],
]
const q=loaded.questions
assert.equal(q.length,12,'Q14-Q25 count')
assert.deepEqual(q.map((x)=>x.id),Array.from({length:12},(_,i)=>`Q-HU-LCS103-PAT-F143-${i+14}`),'exact IDs')
assert.deepEqual(q.map((x)=>x.correct_answer),expectedKeys,'source-exact answers')
assert.equal(expectedKeys.join(''),'CCBDDBBCBDBB','corrected locked sequence')
assert.notEqual(expectedKeys.join(''),'CCCBDDBBCBDB','shifted Q13-Q24 sequence refused')
assert.deepEqual(q.map((x)=>x.question),stems,'exact stems')
assert.deepEqual(q.map((x)=>['a','b','c','d','e'].map((l)=>x[`answer_${l}`])),options,'exact options')
assert.ok(q.every((x)=>Object.keys(x).length>=46&&x.status==='Draft'),'question fields and Draft status')
assert.equal(q.filter((x)=>Object.hasOwn(x,'explanation')).length,0,'no generic explanation')
assert.equal(q.reduce((n,x)=>n+Object.keys(x).filter((k)=>/^explanation_[a-f]$/.test(k)).length,0),72,'option-specific headers')
const active=q.flatMap((x)=>['a','b','c','d','e'].map((l)=>x[`explanation_${l}`]))
assert.equal(active.length,60,'active explanations')
assert.ok(active.every((x)=>x.length>=200&&(x.match(/[.!?](?=\s|$)/g)??[]).length>=3),'substantive explanations')
assert.match(q[8].author_notes,/Q22.*source-risk/i,'Q22 note')
assert.match(q[10].author_notes,/Q24.*Physaliphorous.*spelling.*printed B/i,'Q24 note')
assert.match(q[11].author_notes,/Q25.*tumour-histology.*printed B/i,'Q25 note')
assert.ok(['a','b','c','d','e'].every((l)=>/unqualified.*source risk/i.test(q[8][`explanation_${l}`])),'Q22 risk in all explanations')
assert.ok(['a','b','c','d','e'].every((l)=>/Physaliphorous.*spelling.*variation/i.test(q[10][`explanation_${l}`])),'Q24 risk in all explanations')
assert.ok(['a','b','c','d','e'].every((l)=>/tumour-histology.*review/i.test(q[11][`explanation_${l}`])),'Q25 risk in all explanations')
assert.match(q[3].author_notes,/crosses a physical page boundary/i,'Q17 boundary')
assert.match(q[7].author_notes,/crosses a physical page boundary/i,'Q21 boundary')
for(const [kind,text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm)??[]).length,0,`${kind} generic explanation absent`)
console.log(JSON.stringify({counts:{concepts:6,conceptUpdates:2,materialisedReuses:2,newConcepts:2,articles:3,questions:12,claims:6,citations:12,spans:6},keys:expectedKeys.join(''),optionCounts:q.map(()=>5),genericExplanationHeaders:0,optionSpecificExplanationHeaders:72,substantiveExplanations:60,sourceRisks:['Q22 chronicity','Q24 spelling','Q25 tumour histology'],newHolds:[],practical:0,written:0,media:0},null,2))
