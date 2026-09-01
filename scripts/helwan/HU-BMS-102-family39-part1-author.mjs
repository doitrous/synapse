import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_e121796ed9807de71e51'
const A1 = 'ART-HU-BMS102-MIC-F13P1-PROKARYOTIC-CELL-WALL'
const A2 = 'ART-HU-BMS102-MIC-F39P1-SPORES-CAPSULE-GLYCOCALYX'
const A3 = 'ART-HU-BMS102-MIC-F39P1-INCLUSIONS-WALL-DEFICIENT-FORMS'
const A4 = 'ART-HU-BMS102-MIC-F39P1-FLAGELLAR-ANTIGEN-PILI-VIRULENCE'
const allArticles = [A1, A2, A3, A4]
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`
const row = (fields) => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const joinRows = (rows) => rows.join('\n---\n\n')

const concepts = [
  { ref:'Q01', id:'CON-INF-FECB8B49CCB55A', reuse:true, article:A1, display:'A prokaryotic bacterial cell lacks a well-defined membrane-bound nucleus.', objective:'Identify absence of a well-defined membrane-bound nucleus as a defining prokaryotic feature.', limitation:'The question tests the introductory nuclear-envelope distinction only; the broader reused concept retains its source-specific one-chromosome warning.' },
  { ref:'Q03', id:'CON-INF-AC7ACA9832F349', reuse:true, article:A1, display:'Gram-positive bacteria have a thicker and structurally simpler peptidoglycan wall in the source comparison.', objective:'Distinguish the thick Gram-positive peptidoglycan wall from the thinner Gram-negative wall.', limitation:'“Simpler” is preserved from the source comparison; the existing concept retains its warning that fixed wall percentages are source-specific.' },
  { ref:'Q09', id:'CON-INF-8382E6BC6DA82E', key:'bacterial-endospore-harsh-environment-survival', article:A2, label:'Bacterial endospores enable survival under harsh environmental conditions', aliases:['Endospore environmental survival','Bacterial spore resistance'], type:'structure_function_relationship', micro:'Bacterial endospores', nano:'Environmental survival', definition:'An endospore is a resistant dormant bacterial structure that enables survival during harsh environmental conditions. It is a survival structure rather than a capsule, flagellum or pilus.', objective:'Select the spore as the structure responsible for survival under harsh environmental conditions.', pitfalls:'Choosing an adherence or motility appendage, or treating a spore as a reproductive structure.', display:'Bacterial endospores enable survival under harsh environmental conditions.', subjectClaim:'Bacterial endospores', predicate:'enable', object:'survival under harsh environmental conditions', limitation:'The item tests the source’s broad survival function and does not specify a particular stress, organism or validated sterilization endpoint.' },
  { ref:'Q12', id:'CON-INF-B33132254E76E0', key:'bacillus-anthracis-poly-d-glutamate-capsule', article:A2, label:'The Bacillus anthracis capsule is a poly-D-glutamate polypeptide capsule', aliases:['Anthrax polypeptide capsule','Bacillus anthracis poly-D-glutamate'], type:'structure_function_relationship', micro:'Bacterial capsules', nano:'Anthrax capsule composition', definition:'The study bank keys “Protein” for the anthrax capsule. More precise terminology is a poly-D-glutamate polypeptide capsule, which distinguishes Bacillus anthracis from bacteria whose capsules are polysaccharides.', objective:'Preserve the printed Protein choice while recognizing the more precise poly-D-glutamate polypeptide description.', pitfalls:'Generalizing the choice to every bacterial capsule, or calling the anthrax capsule a conventional polysaccharide capsule.', display:'The Bacillus anthracis capsule is the poly-D-glutamate polypeptide exception represented by the source choice “Protein.”', subjectClaim:'The Bacillus anthracis capsule', predicate:'is represented in the source as', object:'Protein, more precisely a poly-D-glutamate polypeptide capsule', limitation:'The printed option says “Protein”; this Draft record preserves that key while explicitly warning that poly-D-glutamate polypeptide is the more precise description.' },
  { ref:'Q13', id:'CON-INF-4F01FEDB2A8421', key:'volutin-granules-phosphate-storage', article:A3, label:'Volutin granules store phosphate in bacterial cells', aliases:['Volutin phosphate storage','Metachromatic phosphate granules'], type:'structure_function_relationship', micro:'Bacterial inclusions', nano:'Volutin storage', definition:'Volutin, also called metachromatic granules, is an intracellular reserve of inorganic polyphosphate in bacteria. It is not primarily a store of sugar, fat or protein.', objective:'Identify phosphate as the material stored in volutin granules.', pitfalls:'Confusing volutin with glycogen, lipid inclusions or protein granules.', display:'Volutin granules store phosphate in bacterial cells.', subjectClaim:'Volutin granules', predicate:'store', object:'phosphate', limitation:'The source tests the foundational storage identity without organism-specific staining or metabolic detail.' },
  { ref:'Q14', id:'CON-INF-FA631FCD5A2CF0', key:'spheroplast-gram-negative-partial-cell-wall-loss', article:A3, label:'A spheroplast is a Gram-negative bacterium with partial cell-wall loss', aliases:['Gram-negative spheroplast','Partial bacterial wall loss'], type:'definition', micro:'Wall-deficient bacterial forms', nano:'Spheroplast definition', definition:'A spheroplast is the osmotically fragile form produced when a Gram-negative bacterium loses part, but not all, of its cell wall. It differs from a protoplast with more complete wall removal and from naturally wall-free Mycoplasma.', objective:'Define a spheroplast as a Gram-negative bacterium partially lacking its cell wall.', pitfalls:'Calling it a virus, a DNA-free spore or a thick-walled Mycoplasma variant.', display:'A spheroplast is a Gram-negative bacterium with partial cell-wall loss.', subjectClaim:'A spheroplast', predicate:'is', object:'a Gram-negative bacterium with partial cell-wall loss', limitation:'The item is a foundational morphology definition and does not specify the experimental method used to remove the wall.' },
  { ref:'Q15', id:'CON-INF-C552A2F8ADB7A6', key:'bacterial-glycocalyx-surface-adherence', article:A2, label:'The bacterial glycocalyx facilitates adherence to surfaces', aliases:['Glycocalyx surface adherence','Bacterial glycocalyx attachment'], type:'structure_function_relationship', micro:'Bacterial glycocalyx', nano:'Surface adherence', definition:'The bacterial glycocalyx is an extracellular layer that supports attachment to surfaces and may contribute to stable colonization or biofilm formation. It is not the site of energy production, DNA replication or protein synthesis.', objective:'Identify surface adherence as the primary glycocalyx function in the option set.', pitfalls:'Assigning cytoplasmic energy, replication or ribosomal functions to an extracellular layer.', display:'The bacterial glycocalyx facilitates adherence to surfaces.', subjectClaim:'The bacterial glycocalyx', predicate:'facilitates', object:'adherence to surfaces', limitation:'The question tests adherence as the best option and does not claim that adherence is the glycocalyx’s only biological role.' },
  { ref:'Q16', id:'CON-INF-04DA27FB93E957', key:'bacterial-h-antigen-flagella', article:A4, label:'The bacterial H antigen is associated with flagella', aliases:['Flagellar H antigen','Bacterial H-antigen location'], type:'structure_function_relationship', micro:'Bacterial flagella', nano:'H antigen', definition:'The bacterial H antigen is the flagellar antigen used in serologic classification. It is associated with flagella rather than capsule, cytoplasmic membrane or pili.', objective:'Locate the H antigen on bacterial flagella.', pitfalls:'Confusing H antigen with capsular, somatic or pilus-associated antigen categories.', display:'The bacterial H antigen is associated with flagella.', subjectClaim:'The bacterial H antigen', predicate:'is associated with', object:'flagella', limitation:'The source asks only for the appendage association and does not provide a complete serotyping framework.' },
  { ref:'Q18', id:'CON-INF-0E27DF821347C7', key:'source-gonococcal-pili-mutant-loss-of-disease-ability', article:A4, label:'The source states that gonococcal mutants lacking pili lose their ability to cause disease', aliases:['Gonococcal pili mutant virulence','Neisseria gonorrhoeae pili and disease ability'], type:'source_assertion', micro:'Bacterial pili', nano:'Gonococcal virulence model', definition:'Within the source’s mutant comparison, Neisseria gonorrhoeae that lacks pili is keyed as losing the ability to cause disease. The item links pili-dependent attachment to virulence in this model and should not be universalized into an absolute statement about every strain, host or virulence determinant.', objective:'Preserve the source’s keyed effect of pilus loss in its gonococcal mutant model.', pitfalls:'Treating the source statement as proof that pili are the only gonococcal virulence determinant, or substituting antibiotic resistance, increased invasion or toxin production.', display:'The source states that gonococcal mutants lacking pili lose their ability to cause disease.', subjectClaim:'Gonococcal mutants lacking pili', predicate:'are stated in the source to', object:'lose their ability to cause disease', limitation:'This is explicitly a source-bounded mutant/virulence statement, not an exception-free claim that pili are the only determinant of gonococcal disease.' },
]

for (const c of concepts.filter((x) => !x.reuse)) {
  if (idFor(c.key) !== c.id) throw new Error(`Deterministic concept ID mismatch for ${c.ref}`)
}

const questions = [
  { ref:'Q01', page:'1', key:'A', stem:'Which of the following is NOT a characteristic feature of prokaryotes?', options:['Well-defined nucleus','Absence of nuclear membrane','Presence of ribosomes','Binary fission'], reason:'a prokaryote lacks a well-defined membrane-bound nucleus, while absence of a nuclear membrane, ribosomes and binary fission are characteristic source-listed features' },
  { ref:'Q03', page:'1', key:'A', stem:'Which type of bacteria has a thicker and simpler cell wall?', options:['Gram-positive','Gram-negative','Mycoplasma','Gram-neutral'], reason:'the source comparison identifies Gram-positive bacteria as having the thicker and simpler wall' },
  { ref:'Q09', page:'2', key:'D', stem:'What is the special structure that allows certain bacteria to survive harsh\nenvironmental conditions?', options:['Capsule','Flagella','Pili','Spore'], reason:'a bacterial spore is the resistant survival structure among these options' },
  { ref:'Q12', page:'2', key:'B', stem:"Anthrax's capsule is special because it's made of:", options:['Sugar','Protein','Fat','DNA'], reason:'the printed study answer is Protein; more precisely, the Bacillus anthracis capsule is poly-D-glutamate polypeptide' },
  { ref:'Q13', page:'3', key:'B', stem:'Volutin granules store:', options:['Sugar','Phosphate','Fat','Protein'], reason:'volutin granules are polyphosphate reserves' },
  { ref:'Q14', page:'3', key:'C', stem:'What are spheroplasts?', options:['Viruses infecting bacterial cells','Bacterial spores without DNA','Gram-negative bacteria partially lacking the cell wall','Mycoplasma variants with a thickened cell wall'], reason:'a spheroplast is the partially wall-deficient Gram-negative bacterial form' },
  { ref:'Q15', page:'3', key:'C', stem:'What is the primary function of the bacterial glycocalyx?', options:['Energy production','DNA replication','Facilitating bacterial adherence to surfaces','Protein synthesis'], reason:'the extracellular glycocalyx supports bacterial adherence to surfaces' },
  { ref:'Q16', page:'3', key:'C', stem:'The H antigen is found in which part of a bacterial cell?', options:['Capsule','Cell membrane','Flagella','Pili'], reason:'H antigen is the flagellar antigen' },
  { ref:'Q18', page:'3', key:'C', stem:'What happens to Neisseria gonorrhoeae mutants that lack pili?', options:['They become antibiotic resistant','They become more invasive','They lose their ability to cause disease','They increase toxin production'], reason:'the printed study answer states that the pilus-deficient mutants lose their ability to cause disease' },
]

const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))
const byConcept = Object.fromEntries(concepts.map((c) => [c.id, c]))
for (const c of concepts) byRef[c.ref].concept = c.id
for (const q of questions) {
  q.id = `Q-HU102-MIC-F39-${q.ref}`
  q.claim = `CLM-HU102-F39-${q.ref}-01`
  q.questionCit = `CIT-HU102-F39-${q.ref}-QUESTION`
  q.keyCit = `CIT-HU102-F39-${q.ref}-KEY`
  q.span = `SPN-HU102-F39-${q.ref}-01`
  q.display = byConcept[q.concept].display
}

const sourceRow = row([
  ['id',source],['title','Introduction to Bacteriology and Bacterial Structure — MCQ study bank'],
  ['institution','Unattributed local HU-BMS-102 corpus carrier'],['collection_id','hu-y1'],
  ['source_relative_path','Year 1/BMS 102/Microbiology/Notes and Summaries/Introduction to Bacteriology and Bacterial Structure.pdf'],
  ['media_type','application/pdf'],['languages','en'],['page_count','4'],
  ['sha256','e121796ed9807de71e51a739df2cf3aa5b11b1b2f62c5d49817f4e5fddb3f499'],
  ['processing_status','pending'],
  ['rights','Local study material held for internal authoring only; no page image is redistributed.'],
  ['qualification','Tier-6 locally formatted MCQ study bank. Pages 1–3 print eighteen four-option questions and page 4 prints a directly aligned red Key Answers register. No university, department, examiner, sitting, marks or authenticated official-key provenance is printed. Family 39 releases only Q01, Q03, Q09, Q12–Q16 and Q18; all nine other occurrences remain explicit dependency, option-conflict or medical-conflict holds.'],
  ['is_assessment','yes'],
])

const oldArticlePath = join(root, 'article', 'HU-BMS-102-microbiology-family13-part1-articles.md')
const oldConceptPath = join(root, 'concept', 'HU-BMS-102-microbiology-family13-part1-concepts.md')
const extractById = (path, id) => {
  const item = readFileSync(path, 'utf8').split(/\n---\n/).find((part) => part.includes(`## id\n${id}\n`))
  if (!item) throw new Error(`Cannot find ${id} in ${path}`)
  return item.trim()
}
const getField = (item, name) => {
  const match = item.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))
  if (!match) throw new Error(`Missing ${name}`)
  return match[1].trimEnd()
}
const setField = (item, name, value) => {
  const rx = new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`)
  if (!rx.test(item)) throw new Error(`Missing ${name}`)
  return item.replace(rx, `$1${value}`)
}
const appendLines = (item, name, lines) => {
  const existing = getField(item, name)
  const merged = [...existing.split('\n').filter(Boolean)]
  for (const line of lines) if (!merged.includes(line)) merged.push(line)
  return setField(item, name, merged.join('\n'))
}
const appendText = (item, name, text) => {
  const existing = getField(item, name)
  return setField(item, name, existing.includes(text) ? existing : `${existing}\n${text}`.trim())
}

let reusedArticle = extractById(oldArticlePath, A1)
for (const [field, lines] of [
  ['question_ids',['Q-HU102-MIC-F39-Q01','Q-HU102-MIC-F39-Q03']],
  ['resource_ids',[source]],['article_source_ids',[source]],
  ['claim_ids',['CLM-HU102-F39-Q01-01','CLM-HU102-F39-Q03-01']],
  ['span_ids',['SPN-HU102-F39-Q01-01','SPN-HU102-F39-Q03-01']],
  ['hold_these',['A prokaryotic bacterial cell lacks a well-defined membrane-bound nucleus.','Gram-positive bacteria have a thicker and structurally simpler peptidoglycan wall in the source comparison.']],
]) reusedArticle = appendLines(reusedArticle, field, lines)
reusedArticle = appendText(reusedArticle, 'callout_evidence', `### A prokaryotic bacterial cell lacks a well-defined membrane-bound nucleus.\nClaims: CLM-HU102-F39-Q01-01\nCitations: CIT-HU102-F39-Q01-QUESTION, CIT-HU102-F39-Q01-KEY\nSpan: SPN-HU102-F39-Q01-01\n\n### Gram-positive bacteria have a thicker and structurally simpler peptidoglycan wall in the source comparison.\nClaims: CLM-HU102-F39-Q03-01\nCitations: CIT-HU102-F39-Q03-QUESTION, CIT-HU102-F39-Q03-KEY\nSpan: SPN-HU102-F39-Q03-01`)
reusedArticle = appendText(reusedArticle, 'evidence_basis', 'Family-39 adds exact tier-6 prompt occurrences and a directly aligned study-answer register; this does not create official-key authority.')
reusedArticle = appendText(reusedArticle, 'notes', 'Family-39 reuses this exact article for Q01 and Q03 only; all existing Family-13 fields and links are preserved.')

const articleSpecs = [
  { id:A2, title:'Bacterial spores, capsules and glycocalyx functions', micro:'Spores, capsules and glycocalyx', refs:['Q09','Q12','Q15'], sections:`### Definition
Endospores are resistant dormant structures for survival under harsh conditions. The glycocalyx is an extracellular layer that can support surface adherence. The Bacillus anthracis capsule is the source’s unusual composition example.

### Mechanism
Endospore dormancy protects the bacterial lineage during adverse conditions. Extracellular capsule or glycocalyx material instead changes how the vegetative cell interacts with its surroundings, including surface adherence.

### Key determinants
The spore is a survival structure, not an adherence appendage. The glycocalyx supports attachment rather than intracellular energy production, replication or protein synthesis. The study bank’s “Protein” choice for anthrax is retained with the more precise poly-D-glutamate polypeptide warning.

### Clinical significance
Resistant spores affect sterilization reasoning, while capsule and glycocalyx properties affect persistence and colonization. These are tier-6 study-bank answers, not an official examination key; Q12 remains Draft because its printed category requires more precise faculty review.` },
  { id:A3, title:'Volutin inclusions and bacterial spheroplasts', micro:'Bacterial inclusions and wall-deficient forms', refs:['Q13','Q14'], sections:`### Definition
Volutin granules are intracellular polyphosphate reserves. A spheroplast is a Gram-negative bacterial form with partial cell-wall loss.

### Mechanism
Volutin concentrates phosphate as an intracellular reserve. Partial removal of the Gram-negative wall leaves a fragile spheroplast that retains more envelope material than a fully wall-stripped protoplast.

### Key determinants
Volutin is distinguished from sugar, lipid and protein storage options. A spheroplast is distinguished from a virus, a DNA-free spore, a protoplast and naturally wall-free Mycoplasma.

### Clinical significance
Inclusion identity supports bacterial morphology interpretation, while wall-deficient forms help explain osmotic fragility. The source supplies a local study-answer register without examiner, sitting, marks or official-key provenance; both records remain Draft pending independent review.` },
  { id:A4, title:'Flagellar H antigen and pili-dependent gonococcal virulence', micro:'Bacterial appendages and virulence', refs:['Q16','Q18'], sections:`### Definition
The H antigen is associated with bacterial flagella. In the source’s gonococcal mutant comparison, loss of pili is keyed as loss of disease ability.

### Mechanism
Flagellar antigen provides a surface classification marker. Pili support attachment to host surfaces, so a pilus-deficient mutant can lose an important early virulence function in the source model.

### Key determinants
H antigen is flagellar rather than capsular, membrane-associated or pilus-associated in this option set. The gonococcal item connects pili with pathogenic attachment but does not establish pili as the only virulence determinant.

### Clinical significance
Surface appendages contribute to laboratory classification and host interaction. Q18 is preserved as a source-bounded mutant statement and must not be generalized to every strain, host or virulence pathway; neither answer is promoted to official-key status.` },
]

const articleRow = (a) => {
  const qs = a.refs.map((ref) => byRef[ref])
  const ids = qs.map((q) => q.concept)
  return row([
    ['id',a.id],['title',a.title],['arabic_title',''],['aliases',`Family-39 ${a.micro}\nHU-BMS-102 bacterial structure`],
    ['subject','inf'],['topic','Microbiology'],['subtopic','Bacterial morphology and structure'],['microtopic',a.micro],['nanotopic','Family-39 safe objective slice'],
    ['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['template_id','TPL-CONCEPT'],['archetype','concept'],['language','en'],['learner_stage','Years 1–3 foundation'],['reading_time','6'],['high_yield','High'],['time_sensitive','stable'],['status','Draft'],
    ['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],
    ['summary',`Question-led teaching for ${a.micro.toLowerCase()} with literal Family-39 wording and explicit study-bank authority limits.`],
    ['sections',`${a.sections}\n\n### Source-grounded claims\n${qs.map((q) => q.display).join('\n')}`],['published_summary',''],['published_sections',''],
    ['hold_these',qs.map((q) => q.display).join('\n')],['lose_the_mark','Treating the printed study-answer register as an official examination key.\nSilently repairing or replacing the literal source options.\nGeneralizing Q12 or Q18 beyond its explicit source-bounded warning.'],
    ['related_concepts',ids.join('\n')],['related_articles',allArticles.filter((id) => id !== a.id).join('\n')],['question_ids',qs.map((q) => q.id).join('\n')],['resource_ids',source],
    ['universities','hu'],['years','HU_Y1'],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Bacterial morphology and structure > ${a.micro} > Family-39`],
    ['university_notes','hu: Tier-6 local study-bank answers only; no institution attribution, sitting, marks or official-key status is inferred.'],
    ['annotations',ids.map((id) => `### definition_of · ${id}\nQuote: ${byConcept[id].display}\nBlock: body`).join('\n\n')],['media',''],['media_recommendations',''],
    ['callout_evidence',qs.map((q) => `### ${q.display}\nClaims: ${q.claim}\nCitations: ${q.questionCit}, ${q.keyCit}\nSpan: ${q.span}`).join('\n\n')],
    ['article_source_ids',source],['claim_ids',qs.map((q) => q.claim).join('\n')],['span_ids',qs.map((q) => q.span).join('\n')],['publication_gate','needs_evidence'],
    ['evidence_basis','Exact tier-6 prompt occurrence and directly aligned printed study-answer letter from the same governed carrier; no official-key authority is claimed.'],
    ['evidence_gaps','Independent medical verification and named Helwan microbiology faculty review remain required. Family-39 Q02/Q06/Q08/Q10/Q11/Q17 remain cross-university dependency holds; Q04 is a non-exclusive-option hold; Q05/Q07 are legacy mesosome medical-conflict holds.'],
    ['conflicts','[clear]'],['last_reviewed',''],['review_due',''],['notes','Family 39 releases only Q01/Q03/Q09/Q12–Q16/Q18. All nine other occurrences receive no student-facing records.'],
    ['field_notes','arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
}

const newConceptRow = (c) => {
  const q = byRef[c.ref]
  return row([
    ['label',c.label],['id',c.id],['canonical_key',c.key],['aliases',c.aliases.join('\n')],['arabic_label',''],['arabic_aliases','[clear]'],
    ['definition',c.definition],['explicit_objective',c.objective],['pitfalls',c.pitfalls],['concept_type',c.type],['status','Draft'],['support_mode','direct_statement'],
    ['subject','inf'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],
    ['module_subject',`HU-BMS-102 > Microbiology > Bacterial morphology and structure > ${c.micro} > ${c.nano}`],['article_ids',c.article],['related_article_ids',allArticles.filter((id) => id !== c.article).join('\n')],['related_concept_ids','[clear]'],
    ['resource_ids',source],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.55'],['exam_weight_by_year','HU_Y1=0.55'],['clinical_relevance','0.58'],['academic_relevance','0.94'],['weight_confidence','0.42'],['confidence',c.ref === 'Q12' || c.ref === 'Q18' ? '0.72' : '0.84'],
    ['exam_signal',`${source} | tier-6 local MCQ study bank | Family-39 ${c.ref}, printed answer on p4 | not an official examination key`],['atomic_claim_ids',q.claim],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],
    ['original_wording',`[Family-39 ${c.ref}] ${q.stem} [printed answer ${q.key}]`],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty',c.limitation],
    ['evidence_gaps',`No university attribution, official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan faculty review remain required.`],
    ['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],
    ['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath the canonical placement.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family-39 prompt and answer pages.\nsourceCandidateIds: Family 39 completed the governed search-before-mint gate.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-scope rival exists.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nreuseGovernance: New Family-39 question-led concept after governed no-same-scope adjudication.'],
  ])
}

const reusedConcept = (c) => {
  let item = extractById(oldConceptPath, c.id)
  item = appendLines(item, 'resource_ids', [source])
  item = appendLines(item, 'atomic_claim_ids', [byRef[c.ref].claim])
  item = appendText(item, 'exam_signal', `${source} | tier-6 local MCQ study bank | Family-39 ${c.ref}, printed answer on p4 | not an official examination key`)
  item = appendText(item, 'original_wording', `[Family-39 ${c.ref}] ${byRef[c.ref].stem} [printed answer ${byRef[c.ref].key}]`)
  item = appendText(item, 'evidence_gaps', c.limitation)
  item = appendText(item, 'field_notes', `family39Reuse: Exact-ID reuse preserves every Family-13 field and appends only the Family-39 source occurrence, claim and authority warning for ${c.ref}.`)
  return item
}

const wrongNotes = {
  Q01:['','Absence of a nuclear membrane is a characteristic prokaryotic feature, so it is not the requested exception.','Prokaryotes contain ribosomes, so this is not the requested exception.','Binary fission is the source-listed prokaryotic division pattern, so it is not the requested exception.'],
  Q03:['','Gram-negative bacteria have the thinner, more complex envelope in this comparison.','Mycoplasma lacks a conventional peptidoglycan wall rather than having the source’s thicker wall.','“Gram-neutral” is not the source’s thick-wall category.'],
  Q09:['A capsule may aid protection or adherence but is not the resistant survival structure asked for.','Flagella mediate motility rather than harsh-condition dormancy.','Pili mediate adherence or gene transfer rather than harsh-condition dormancy.',''],
  Q12:['Most bacterial capsules are polysaccharides, but the stem asks for the anthrax exception.','','Fat is not the source-keyed anthrax capsule composition.','DNA is not the source-keyed anthrax capsule composition.'],
  Q13:['Sugar may be stored in other inclusion forms but is not the volutin reserve.','','Fat is not the volutin reserve.','Protein is not the volutin reserve.'],
  Q14:['A spheroplast is a bacterial wall-deficient form, not a virus.','A spheroplast is not a DNA-free bacterial spore.','','Mycoplasma naturally lacks a conventional cell wall and is not a thick-walled spheroplast variant.'],
  Q15:['Energy production is associated with the cytoplasmic membrane and metabolism, not the extracellular glycocalyx.','DNA replication is intracellular and not the glycocalyx function.','','Protein synthesis occurs at ribosomes, not in the glycocalyx.'],
  Q16:['Capsular antigens are distinct from the H antigen.','The H antigen is not assigned to the cell membrane in this option set.','','Pili are not the H-antigen appendage.'],
  Q18:['The source does not key antibiotic resistance as the effect of losing pili.','The source does not key increased invasion as the effect of losing pili.','','The source does not key increased toxin production as the effect of losing pili.'],
}

const answerRows = (q) => q.options.flatMap((option, i) => {
  const letter = 'ABCD'[i]
  const correct = letter === q.key
  const explanation = correct
    ? `The option “${option}” is the directly printed study answer because ${q.reason}. ${byConcept[q.concept].limitation}`
    : `${wrongNotes[q.ref][i]} The tested relationship is: ${q.display} Therefore “${option}” is not the best answer.`
  return [[`answer_${'abcd'[i]}`,option],[`explanation_${'abcd'[i]}`,explanation]]
})

const questionRow = (q) => {
  const c = byConcept[q.concept]
  return row([
    ['id',q.id],['title',q.stem],['subject','inf'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format','single best answer'],['derived_from',''],['correct_answer',q.key],...answerRows(q),
    ['topic','Bacterial morphology and structure'],['subtopic',c.reuse ? 'Bacterial cell foundations' : c.micro],['difficulty','Moderate'],['question_type','Microbiology'],['main_concept',q.concept],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Bacterial morphology and structure > Family-39 > ${q.ref}`],
    ['clinical_relevance','0.58'],['academic_relevance','0.94'],['cognitive_effort_score','0.44'],['exam_weight_by_year','HU_Y1=0.55'],['question_only_for','HU_Y1'],['concept_ids',q.concept],['years','HU_Y1'],['universities','hu'],['cognitive_effort','Low'],['setting','Academic'],['reasoning_level','1'],['inferred_difficulty','44'],['exam_relevance','6'],['contextual_concept_ids',''],['library_ids',c.article],['resource_ids',source],
    ['learning_objective',c.objective],['media_recommendations',''],['source_citation',`${source}, PDF p${q.page}, Family-39 ${q.ref}: literal four-option stem; directly aligned printed study answer ${q.key} on p4. Tier-6 local study-bank authority only, not an official examination or authenticated official key.`],['attachments',''],['attached_image',''],
    ['author_notes',`Literal wording and source option text are preserved without answer repair. ${c.limitation} Holds without student-facing records: Q02/Q06/Q08/Q10/Q11/Q17 dependencies; Q04 non-exclusive options; Q05/Q07 legacy mesosome conflicts.`],['estimated_seconds','60'],['randomise_answers','yes'],
  ])
}

const claimRow = (q) => {
  const c = byConcept[q.concept]
  const predicate = c.predicate ?? (q.ref === 'Q01' ? 'lacks' : 'is described in the source as having')
  const object = c.object ?? (q.ref === 'Q01' ? 'a well-defined membrane-bound nucleus' : 'a thicker and structurally simpler peptidoglycan wall than Gram-negative bacteria')
  return row([['id',q.claim],['concept_id',q.concept],['subject','inf'],['predicate',predicate],['object',object],['display_text',q.display],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence',q.ref === 'Q12' || q.ref === 'Q18' ? '0.72' : '0.84'],['freshness','stable_local_study_answer'],['time_sensitive','no'],['qualifiers',`authority: tier-6 local prompt plus printed study-answer register, without official-key status. scope: ${c.limitation}`]])
}
const questionCitation = (q) => row([['id',q.questionCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Options: ${q.options.map((o,i) => `${'ABCD'[i]}. ${o}`).join(' | ')}`],['locator_type','page'],['locator_page',q.page],['locator_section',`Family-39 ${q.ref}`],['locator_detail','Exact literal four-option prompt occurrence'],['context_note','Tier-6 local study-bank prompt with no institution, sitting, marks or official-key provenance.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
const keyCitation = (q) => row([['id',q.keyCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.ref.replace('Q','')}- ${q.key}`],['locator_type','page'],['locator_page','4'],['locator_section','Key Answers'],['locator_detail',`Red answer register directly aligns Family-39 ${q.ref} to ${q.key}`],['context_note','Printed study-answer letter only; not an authenticated official answer key.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
const spanRow = (q) => row([['id',q.span],['article_id',byConcept[q.concept].article],['section_id',`${byConcept[q.concept].article.toLowerCase()}-${q.ref.toLowerCase()}`],['text',q.display],['claim_ids',q.claim],['citation_ids',`${q.questionCit}\n${q.keyCit}`]])

const relationRows = joinRows([
  row([['source','CON-INF-8382E6BC6DA82E'],['type','associated_with'],['target','CON-INF-4B9CAB5EB3121A'],['evidence_claim_ids','CLM-HU102-F39-Q09-01\nCLM-HU102-F13P1-Q09-01'],['citation_ids','CIT-HU102-F39-Q09-QUESTION\nCIT-HU102-F13P1-Q09-CURR'],['verification_status','needs_evidence'],['confidence','0.80'],['qualifiers','scope: endospore survival under harsh conditions is related to the existing source-specific autoclave/spore-sterilization concept'],['reviewer','Medical team, Helwan Microbiology faculty']]),
  row([['source','CON-INF-B33132254E76E0'],['type','related_concepts'],['target','CON-INF-C552A2F8ADB7A6'],['evidence_claim_ids','CLM-HU102-F39-Q12-01\nCLM-HU102-F39-Q15-01'],['citation_ids','CIT-HU102-F39-Q12-QUESTION\nCIT-HU102-F39-Q15-QUESTION'],['verification_status','needs_evidence'],['confidence','0.80'],['qualifiers','scope: the anthrax capsule composition example and glycocalyx adherence function are distinct but related extracellular-layer concepts'],['reviewer','Medical team, Helwan Microbiology faculty']]),
  row([['source','CON-INF-04DA27FB93E957'],['type','associated_with'],['target','CON-INF-5FDB9641FAD906'],['evidence_claim_ids','CLM-HU102-F39-Q16-01\nCLM-HU102-F13P1-Q03-01'],['citation_ids','CIT-HU102-F39-Q16-QUESTION\nCIT-HU102-F13P1-Q03-CURR'],['verification_status','needs_evidence'],['confidence','0.82'],['qualifiers','scope: the H-antigen association complements the existing concept that locates flagella outside the bacterial cell wall'],['reviewer','Medical team, Helwan Microbiology faculty']]),
  row([['source','CON-INF-0E27DF821347C7'],['type','related_concepts'],['target','CON-INF-17398A634B7F26'],['evidence_claim_ids','CLM-HU102-F39-Q18-01\nCLM-HU102-F24-Q05-01'],['citation_ids','CIT-HU102-F39-Q18-QUESTION\nCIT-HU102-F24-Q05-CURR'],['verification_status','needs_evidence'],['confidence','0.76'],['qualifiers','scope: the source-bounded gonococcal pilus-loss outcome is related to the existing organism-specific pili-adherence application without claiming identical disease mechanisms'],['reviewer','Medical team, Helwan Microbiology faculty']]),
])

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family39-part1-sources.md',sourceRow],
  ['article/HU-BMS-102-microbiology-family39-part1-articles.md',joinRows([reusedArticle, ...articleSpecs.map(articleRow)])],
  ['concept/HU-BMS-102-microbiology-family39-part1-concepts.md',joinRows(concepts.map((c) => c.reuse ? reusedConcept(c) : newConceptRow(c)))],
  ['evidence/HU-BMS-102-microbiology-family39-part1-claims.md',joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family39-part1-citations.md',joinRows([...questions.map(questionCitation), ...questions.map(keyCitation)])],
  ['evidence/HU-BMS-102-microbiology-family39-part1-spans.md',joinRows(questions.map(spanRow))],
  ['relations/HU-BMS-102-microbiology-family39-part1-relations.md',relationRows],
  ['question/HU-BMS-102-microbiology-family39-part1-questions.md',joinRows(questions.map(questionRow))],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family:'39-part1', refs:questions.map((q) => q.ref), answers:questions.map((q) => `${q.ref}:${q.key}`), released:{ sources:1, articles:4, articleReuses:1, concepts:9, conceptReuses:2, newConcepts:7, questions:9, claims:9, citations:18, spans:9, relations:4 }, holds:{ dependencies:['Q02','Q06','Q08','Q10','Q11','Q17'], optionConflict:['Q04'], medicalConflict:['Q05','Q07'] } }, null, 2))
