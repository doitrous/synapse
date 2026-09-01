import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const repo = process.cwd()
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const bank = 'src_e89478440e99a6b8a854'
const carrier = 'src_bd6d792541ed79e0e692'
const oldBank = 'src_4abfcc7807e4409a34dd'

const A1 = 'ART-HU-BMS102-MIC-F20P3-CELL-WALL-AND-SELECTIVE-TOXICITY'
const A2 = 'ART-HU-BMS102-MIC-F20P3-RESISTANCE-MECHANISMS'
const A3 = 'ART-HU-BMS102-MIC-F20P3-CLINICAL-ANTIMICROBIAL-SELECTION'
const allArticles = [A1, A2, A3]

const concepts = [
  { id: 'CON-INF-AD7DC1EF66E104', refs: ['Q25'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'Exact-ID reuse preserves vancomycin inhibition of an early peptidoglycan step and appends only this distinct Family-20 occurrence.' },
  { id: 'CON-INF-05D590078F3DCC', refs: ['Q26'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'Exact-ID reuse preserves the established selective-toxicity definition and appends only this distinct Family-20 occurrence.' },
  { id: 'CON-INF-DCD82D2A1D396C', refs: ['Q27'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'Exact-ID reuse preserves Mycoplasma intrinsic resistance from absence of a cell wall and appends only this source occurrence.' },
  {
    id: 'CON-INF-18ED9F76230710', key: 'bactericidal-selection-endocarditis', refs: ['Q29'], article: A3,
    label: 'Bactericidal therapy is selected for endocarditis when rapid irreversible killing is required',
    aliases: ['Bactericidal selection in endocarditis', 'Endocarditis rapid irreversible antimicrobial killing'], type: 'clinical_application',
    micro: 'Clinical antimicrobial selection', nano: 'Bactericidal therapy for endocarditis',
    definition: 'Bactericidal agents produce rapid, irreversible killing. The Helwan teaching lists endocarditis among immediately life-threatening infections in which bactericidal treatment is particularly useful.',
    objective: 'Select a bactericidal antimicrobial class for the stated endocarditis scenario requiring rapid irreversible killing.',
    pitfalls: 'Choosing a bacteriostatic class despite the stem explicitly requiring rapid irreversible killing, or treating the study-bank answer as a universal regimen recommendation.',
    display: 'Bactericidal therapy is selected for endocarditis when rapid irreversible killing is required.',
    limitation: 'This concept preserves the source’s class-level indication only and does not infer a specific agent, dose or patient-specific regimen.'
  },
  { id: 'CON-INF-0096D0AC9CB83E', refs: ['Q30'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'Exact-ID reuse preserves active MDR-pump drug export and appends the literal Family-20 membrane-protein occurrence.' },
  {
    id: 'CON-INF-3613A490E1C125', key: 'vancomycin-mrsa-treatment-selection', refs: ['Q31'], article: A3,
    label: 'Vancomycin is selected for MRSA that does not respond to beta-lactams in the source teaching',
    aliases: ['Vancomycin selection for MRSA', 'MRSA non-response to beta-lactams and vancomycin'], type: 'clinical_application',
    micro: 'Clinical antimicrobial selection', nano: 'Vancomycin selection for MRSA',
    definition: 'The Helwan lecture links vancomycin’s distinct early peptidoglycan effect to activity against beta-lactam-resistant staphylococcal infection. In the printed comparison, vancomycin is therefore selected when MRSA is not responding to beta-lactams.',
    objective: 'Choose vancomycin in the source-bounded MRSA scenario after beta-lactam non-response.',
    pitfalls: 'Selecting penicillin despite the stated beta-lactam non-response, or expanding this Draft teaching occurrence into a complete current treatment guideline.',
    display: 'Vancomycin is selected for MRSA that does not respond to beta-lactams in the source teaching.',
    limitation: 'The lecture supplies a stable curriculum association, not a current patient-specific guideline; independent clinical review remains required.'
  },
  { id: 'CON-INF-DFC3D949513ED2', refs: ['Q32'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'Exact-ID reuse preserves reduced antimicrobial entry through altered permeability and appends the source’s penicillin/porin occurrence without widening the definition.' },
  {
    id: 'CON-INF-FB45DDDCD69E28', key: 'antimicrobial-resistance-mechanism-exception', refs: ['Q33'], article: A2,
    label: 'Increasing drug concentration in the host is not a bacterial antimicrobial-resistance mechanism',
    aliases: ['Antimicrobial-resistance mechanism exception', 'Host drug-concentration exception'], type: 'classification',
    micro: 'Mechanisms of antimicrobial resistance', nano: 'Resistance-mechanism exception',
    definition: 'Bacterial antimicrobial-resistance mechanisms include drug inactivation, alteration of a drug target and active efflux. Increasing drug concentration in the host is a treatment exposure change, not a bacterial resistance mechanism.',
    objective: 'Distinguish a host drug-exposure change from bacterial target alteration, efflux and enzymatic drug inactivation.',
    pitfalls: 'Treating any change involving an antimicrobial concentration as a microbial resistance mechanism, or claiming that the lecture provides a single direct negative sentence for the exception.',
    display: 'Increasing drug concentration in the host is not a bacterial antimicrobial-resistance mechanism.',
    limitation: 'The carrier directly teaches the three valid mechanisms across pages 20–26; the negative exception is supported by the printed comparison rather than by one direct negative lecture sentence.'
  },
  { id: 'CON-INF-39978E6864743D', refs: ['Q34'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'Exact-ID reuse preserves sulphonamide resistance through use of preformed folic acid and appends only this distinct occurrence.' },
  { id: 'CON-INF-90DF7C039A770B', refs: ['Q35'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'Exact-ID reuse preserves beta-lactam binding to PBPs and final-step peptidoglycan inhibition and appends the penicillin occurrence.' },
]

const questions = [
  { ref:'Q25', page:'4', key:'D', stem:'25- vancomycin differs from ẞ-lactams in that it:', options:['Targets protein synthesis','Inhibits late steps of peptidoglycan synthesis','Disrupts cytoplasmic membranes','Inhibits early steps of peptidoglycan synthesis'], reason:'the lecture states that vancomycin inhibits early peptidoglycan-synthesis steps by a mechanism different from beta-lactams', teachingPage:'12', teaching:'Vancomycin inhibits the early steps in peptidoglycan synthesis by a different mechanism.', limitation:'The literal lowercase `vancomycin` and source glyph `ẞ-lactams` are preserved; no broader glycopeptide claim is added.' },
  { ref:'Q26', page:'4-5', key:'D', stem:'26- Selective topicity means:', options:['Toxicity to both host and pathogen','Harm to host tissues to kill bacteria','Ability to destroy host cells infected with bacteria','Killing pathogens without harming host cells'], reason:'selective toxicity is defined as harming the pathogen without harming the host', teachingPage:'10', teaching:'Selective toxicity: is the ability of the antimicrobial agent to harm a pathogen without harming the host.', limitation:'The literal source typo `topicity` is preserved in the occurrence.' },
  { ref:'Q27', page:'5', key:'B', stem:'27- Which of the following is a correct epample of non-genetic resistance?', options:['Plasmid-encoded B-lactamase','Mycoplasma lacking a cell wall','Chromosomal mutation in a drug target','Resistance gene in a transposon'], reason:'Mycoplasma lacks the cell-wall target and is naturally resistant to penicillin without acquiring a resistance gene', teachingPage:'28', teaching:'Mycoplasma are naturally resistant to penicillin because they lack a cell wall.', limitation:'The literal `epample` and `B-lactamase` forms are preserved; the answer is limited to the source’s non-genetic example.' },
  { ref:'Q29', page:'5', key:'D', stem:'29- A 58-year-old male with endocarditis is admitted to ICU. His physician prescribes a drug with rapid and\nirreversible killing action. Which class of antibiotics is most appropriate in this case?', options:['Bacteriostatic','Antivirals','Antifungals','Bactericidal'], reason:'bactericidal agents produce rapid irreversible killing and are particularly useful in immediately life-threatening infections such as endocarditis', teachingPage:'6', teaching:'Those are particularly useful in certain infections, e.g. those that are immediately life-threatening as in severe leucopenic patients and endocarditis.', limitation:'The source supports a class-level teaching choice and does not supply a patient-specific drug regimen.' },
  { ref:'Q30', page:'5', key:'C', stem:'30- A strain of bacteria is resistant to multiple antibiotics. Analysis shows it pumps drugs out using\nmembrane proteins. This mechanism is: QuizYs', options:['Target modification','Enzymatic degradation','Efflux pump (MDR)','Porin change'], reason:'an MDR efflux pump uses membrane transport to export multiple antimicrobial molecules', teachingPage:'26', teaching:'The MDR pump imports protons and, in an exchange-type reaction, exports a variety of foreign molecules including certain antibiotics.', limitation:'The stray literal `QuizYs` is preserved and is not interpreted as content.' },
  { ref:'Q31', page:'5', key:'C', stem:'31- A patient with MRSA is not responding to B-lactams. Which drug is preferred?', options:['Tetracycline','Rifampicin','Vancomycin','Penicillin'], reason:'the lecture links vancomycin’s distinct early peptidoglycan action to treatment of beta-lactam-resistant staphylococcal infections', teachingPage:'12', teaching:'That is why vancomycin is effective in treatment of β-lactam resistant staphylococcal infections (MRSA).', limitation:'The literal `B-lactams` wording is preserved; this Draft occurrence is a curriculum association rather than a current prescribing guideline.' },
  { ref:'Q32', page:'5', key:'C', stem:'32- Decreased drug entry due to altered porins is a resistance mechanism against:', options:['Vancomycin','Macrolides','Penicillin','Rifampicin'], reason:'the source pairs altered porin-mediated entry with penicillin resistance in this option comparison', teachingPage:'25', teaching:'Changes in the outer membrane permeability may prevent the entry of certain antibiotics.', limitation:'The carrier directly teaches the porin/permeability mechanism; the penicillin-specific selection comes from the printed study-bank comparison.' },
  { ref:'Q33', page:'6', key:'B', stem:'33- Which of the following is not a mechanism of antimicrobial resistance?', options:['Alteration of drug target','Drug concentration increase in the host','Efflux pump activation','Enzymatic drug inactivation'], reason:'target alteration, efflux and enzymatic inactivation are bacterial resistance mechanisms, whereas increasing host drug concentration is not', teachingPage:'20', teaching:'The lecture teaches enzymatic drug inactivation, target alteration and efflux as resistance mechanisms across pages 20–26.', limitation:'The three valid mechanisms are directly taught across pages 20–26; the negative exception is supplied by the printed bank comparison, not by a single direct negative lecture sentence.' },
  { ref:'Q34', page:'6', key:'B', stem:'34- How do sulphonamide-resistant bacteria survive?', options:['Increase porin size','Use preformed folic acid','Alter 50S ribosome','Bind to PBP'], reason:'the lecture states that sulphonamide-resistant bacteria can use preformed folic acid without extracellular PABA', teachingPage:'24', teaching:'Sulphonamide resistant bacteria acquire the ability to use preformed folic acid with no need for extracellular PABA.', limitation:'The answer is restricted to the directly taught metabolic-bypass mechanism.' },
  { ref:'Q35', page:'6', key:'C', stem:'35- Which drug inhibits cell wall synthesis by binding to PBPs?', options:['Tetracycline','Vancomycin','Penicillin','Polymyxin'], reason:'penicillin is a beta-lactam, and beta-lactams bind PBPs and inhibit final peptidoglycan-synthesis steps', teachingPage:'12', teaching:'β-lactams inhibit the final steps in synthesis of peptidoglycan by binding to receptors called penicillin-binding proteins (PBPs) in the cell wall.', limitation:'The answer is the direct drug-target pairing within this printed option set.' },
]

const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))
const byConcept = Object.fromEntries(concepts.map((c) => [c.id, c]))
for (const c of concepts) for (const ref of c.refs) byRef[ref].concept = c.id
for (const q of questions) {
  q.id = `Q-HU102-MIC-F20-${q.ref}`
  q.claim = `CLM-HU102-F20P3-${q.ref}-01`
  q.currCit = `CIT-HU102-F20P3-${q.ref}-CURR`
  q.bankCit = `CIT-HU102-F20P3-${q.ref}-BANK`
  q.span = `SPN-HU102-F20P3-${q.ref}-01`
  q.display = byConcept[q.concept].display ?? ({
    Q25:'Vancomycin inhibits an early peptidoglycan-synthesis step distinct from beta-lactams.',
    Q26:'Selective toxicity harms the pathogen without harming the host.',
    Q27:'Mycoplasma is naturally resistant to penicillin because it lacks a cell wall.',
    Q30:'An MDR efflux pump exports multiple antimicrobial molecules through a membrane transport protein.',
    Q32:'Altered outer-membrane permeability can reduce antimicrobial entry.',
    Q34:'Sulphonamide-resistant bacteria may use preformed folic acid without extracellular PABA.',
    Q35:'Penicillin binds PBPs and inhibits final steps of peptidoglycan synthesis.',
  })[q.ref]
}

const row = (fields) => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const joinRows = (rows) => rows.join('\n---\n\n')
const unionLines = (...values) => [...new Set(values.flatMap((v) => String(v ?? '').split('\n')).map((x) => x.trim()).filter((x) => x && x !== '[clear]'))].join('\n')
const findBlock = (file, id) => {
  const text = readFileSync(join(repo, file), 'utf8')
  const block = text.split(/^---$/m).map((x) => x.trim()).find((x) => new RegExp(`^## id\\s*\\n${id}$`, 'm').test(x))
  if (!block) throw new Error(`Cannot find ${id} in ${file}`)
  return block
}
const field = (block, name) => block.match(new RegExp(`^## ${name}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim() ?? ''
const setField = (block, name, value) => {
  const re = new RegExp(`(^## ${name}\\s*\\n)[\\s\\S]*?(?=\\n## |$)`, 'm')
  if (!re.test(block)) throw new Error(`Missing ${name}`)
  return block.replace(re, `$1${value}`)
}

const sourceRows = joinRows([
  row([['id',bank],['title','Antimicrobial chemotherapy — auxiliary MCQ study bank'],['institution','Faculty of Medicine, Helwan University local corpus'],['collection_id','hu-y1'],['source_relative_path','Year 1/BMS 102/Microbiology/Notes and Summaries/Antimicrobial chemotherapy.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','6'],['sha256','e89478440e99a6b8a854a9ca7e38b792c5904634a7f6aa2d6f2ae44809340e0f'],['processing_status','pending'],['rights','Local university material held for internal authoring only; no page image is redistributed.'],['qualification','Tier-6 Helwan-local auxiliary study bank. Part3 releases Q25–Q27 and Q29–Q35 from pp4–6 with letters matched to the complete red answer table on p6. These are study-bank answers, not authenticated examination or official-key records.'],['is_assessment','yes']]),
  row([['id',carrier],['title','Antimicrobial chemotherapy — HU-BMS-102 microbiology lecture'],['institution','Faculty of Medicine, Helwan University local corpus'],['collection_id','hu-y1'],['source_relative_path','Year 1/BMS 102/Microbiology/Theoretical/Lec 3 - Antimicrobials/-Antimicrobial chemotherapy.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','46'],['sha256','bd6d792541ed79e0e692652157092fec0c7ee969a0b225e10155b2364a0010a8'],['processing_status','pending'],['rights','Local university material held for internal authoring only; no page image is redistributed.'],['qualification','Tier-4 theoretical teaching carrier attributed to Dr Ehab M. Fahmy, Faculty of Medicine, Helwan University. It supplies governed teaching but no sitting, marks, candidate instructions or official answer-key authority.'],['is_assessment','no']]),
])

const articleSpecs = [
  { id:A1, title:'Cell-wall antimicrobial mechanisms and selective toxicity', micro:'Cell-wall mechanisms and selective toxicity', refs:['Q25','Q26','Q35'], sections:`### Definition
Selective toxicity means harming a pathogen without harming the host. Cell-wall synthesis offers a selective bacterial target because human cells lack peptidoglycan.

### Mechanism
Beta-lactams bind penicillin-binding proteins and inhibit final steps of peptidoglycan synthesis. Vancomycin inhibits an earlier peptidoglycan step through a different mechanism.

### Key determinants
The timing and target differ: beta-lactams act through PBPs at final steps, while vancomycin acts at an earlier step. Neither mechanism is a ribosomal or cytoplasmic-membrane action in these comparisons.

### Clinical significance
Target differences help explain why vancomycin retains a distinct role against beta-lactam-resistant staphylococci, but the source does not provide a complete treatment guideline.

### Common pitfalls
Do not silently repair the printed ẞ-lactam or topicity forms, and do not treat the tier-6 letters as an official key.` },
  { id:A2, title:'Intrinsic resistance, permeability, efflux and metabolic bypass', micro:'Mechanisms of antimicrobial resistance', refs:['Q27','Q30','Q32','Q33','Q34'], sections:`### Definition
Resistance may be intrinsic because a target is absent, or may operate through reduced entry, active export, target alteration, enzymatic inactivation or metabolic bypass.

### Mechanism
Mycoplasma lacks the cell-wall target. Altered outer-membrane permeability can reduce drug entry, whereas an MDR pump actively exports multiple drugs. Sulphonamide resistance may use preformed folic acid and bypass extracellular PABA dependence.

### Key determinants
Reduced entry and active export are opposite transport directions. Target alteration and enzymatic drug inactivation are microbial mechanisms; increasing drug concentration in the host is not.

### Clinical significance
Mechanism classification helps interpret treatment failure without confusing host exposure changes with bacterial resistance biology.

### Common pitfalls
Q33 is comparison-based: the carrier teaches the three valid mechanisms across several pages but does not state its negative exception in one direct sentence.` },
  { id:A3, title:'Bactericidal and vancomycin selection in source-bounded clinical scenarios', micro:'Clinical antimicrobial selection', refs:['Q29','Q31'], sections:`### Definition
Bactericidal agents cause rapid irreversible killing. Antimicrobial selection also depends on the organism and its susceptibility pattern.

### Mechanism
The lecture identifies endocarditis as a setting where bactericidal action is particularly useful. It also links vancomycin’s distinct peptidoglycan action to beta-lactam-resistant staphylococcal infection.

### Key determinants
The endocarditis item asks for a drug class, whereas the MRSA item asks for a named drug after beta-lactam non-response.

### Clinical significance
These are foundational curriculum associations, not substitutes for current patient-specific prescribing guidance.

### Common pitfalls
Do not convert the tier-6 printed answer into official-key authority or infer doses, combinations or stewardship decisions not stated by the sources.` },
]

const articleRow = (a) => {
  const qs = a.refs.map((r) => byRef[r])
  const ids = [...new Set(qs.map((q) => q.concept))]
  return row([['id',a.id],['title',a.title],['arabic_title',''],['aliases',`Family-20 Part3 ${a.micro}\nHU-BMS-102 antimicrobial chemotherapy`],['subject','inf'],['topic','Microbiology'],['subtopic','Antimicrobial chemotherapy'],['microtopic',a.micro],['nanotopic','Family-20 Part3'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF\nDIS-PHA'],['template_id','TPL-CONCEPT'],['archetype','concept'],['language','en'],['learner_stage','Years 1–3 foundation'],['reading_time','6'],['high_yield','High'],['time_sensitive','stable'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['summary',`Question-led teaching for ${a.micro.toLowerCase()} with exact Family-20 Part3 wording and authority limits.`],['sections',`${a.sections}\n\n### Source-grounded claims\n${qs.map((q) => q.display).join('\n')}`],['published_summary',''],['published_sections',''],['hold_these',qs.map((q) => q.display).join('\n')],['lose_the_mark','Treating the tier-6 answer table as an official examination key.\nSilently repairing source wording or extending the governed teaching into a clinical guideline.'],['related_concepts',ids.join('\n')],['related_articles',allArticles.filter((id) => id !== a.id).join('\n')],['question_ids',qs.map((q) => q.id).join('\n')],['resource_ids',`${bank}\n${carrier}`],['universities','hu'],['years','HU_Y1'],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${a.micro} > Family-20 Part3`],['university_notes','hu: Tier-6 Helwan-local study-bank occurrences supported by a tier-4 Helwan lecture; no official examination, sitting, marks or official-key status is inferred.'],['annotations',ids.map((id) => `### definition_of · ${id}\nQuote: ${byConcept[id].display ?? byRef[byConcept[id].refs[0]].display}\nBlock: body`).join('\n\n')],['media',''],['media_recommendations',''],['callout_evidence',qs.map((q) => `### ${q.display}\nClaims: ${q.claim}\nCitations: ${q.currCit}, ${q.bankCit}\nSpan: ${q.span}`).join('\n\n')],['article_source_ids',`${bank}\n${carrier}`],['claim_ids',qs.map((q) => q.claim).join('\n')],['span_ids',qs.map((q) => q.span).join('\n')],['publication_gate','needs_evidence'],['evidence_basis','Exact tier-6 study-bank occurrence and printed answer letter paired with direct or explicitly limited tier-4 Helwan teaching. No official key authority is claimed.'],['evidence_gaps','Independent medical verification and named Helwan faculty review remain required. Q13, Q21 and Q28 remain cross-university dependency holds. Q33’s negative exception is comparison-based.'],['conflicts','[clear]'],['last_reviewed',''],['review_due',''],['notes','Family-20 Part3 releases Q25–Q27 and Q29–Q35 only. Q13, Q21 and Q28 remain the only valid keyed dependency holds; routine Family 20 is otherwise closed.'],['field_notes','arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.']])
}

const newConceptRow = (c) => {
  const qs = c.refs.map((r) => byRef[r])
  return row([['label',c.label],['id',c.id],['canonical_key',c.key],['aliases',c.aliases.join('\n')],['arabic_label',''],['arabic_aliases','[clear]'],['definition',c.definition],['explicit_objective',c.objective],['pitfalls',c.pitfalls],['concept_type',c.type],['status','Draft'],['support_mode','direct_statement'],['subject','inf'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF\nDIS-PHA'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${c.micro} > ${c.nano}`],['article_ids',c.article],['related_article_ids',allArticles.filter((id) => id !== c.article).join('\n')],['related_concept_ids','[clear]'],['resource_ids',`${bank}\n${carrier}`],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.62'],['exam_weight_by_year','HU_Y1=0.62'],['clinical_relevance','0.70'],['academic_relevance','0.94'],['weight_confidence','0.48'],['confidence','0.86'],['exam_signal',`${bank} | tier-6 auxiliary study bank | Family-20 ${c.refs.join('/')}, printed study answer only; ${carrier} | tier-4 Helwan teaching carrier | governed teaching, no official-key authority`],['atomic_claim_ids',qs.map((q) => q.claim).join('\n')],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],['original_wording',qs.map((q) => `[Family-20 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty',c.limitation],['evidence_gaps',`No official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan faculty review remain required.`],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath the canonical placement.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from the exact Family-20 occurrence and carrier teaching.\nsourceCandidateIds: Family 20 completed the governed search-before-mint gate.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-scope rival survived triage.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nreuseGovernance: New Family-20 question-led concept after governed no-same-scope adjudication.']])
}

const reusedConceptRow = (c) => {
  let block = findBlock(c.reuse, c.id)
  const qs = c.refs.map((r) => byRef[r])
  block = setField(block, 'status', 'Draft')
  block = setField(block, 'article_ids', unionLines(field(block,'article_ids'), c.article))
  block = setField(block, 'resource_ids', unionLines(field(block,'resource_ids'), oldBank, carrier, bank))
  block = setField(block, 'atomic_claim_ids', unionLines(field(block,'atomic_claim_ids'), qs.map((q) => q.claim).join('\n')))
  block = setField(block, 'exam_signal', `${field(block,'exam_signal')}\n${bank} | tier-6 auxiliary study bank | Family-20 ${c.refs.join('/')}; printed study answer only, no official-key authority`)
  block = setField(block, 'original_wording', `${field(block,'original_wording')}\n${qs.map((q) => `[Family-20 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}`)
  block = setField(block, 'field_notes', `${field(block,'field_notes')}\nfamily20Part3Reuse: Exact-ID reuse preserves the earlier record and appends only Family-20 Part3 article, source-occurrence and claim links. ${c.limitation}`)
  return block
}

const conceptRows = joinRows(concepts.map((c) => c.reuse ? reusedConceptRow(c) : newConceptRow(c)))

const wrongNotes = {
  Q25:['Vancomycin is not presented as a protein-synthesis inhibitor.','Beta-lactams, not vancomycin, are described as acting at the final peptidoglycan-synthesis steps.','Membrane disruption is associated with agents such as polymyxins, not the stated vancomycin mechanism.',''],
  Q26:['Selective toxicity does not mean equivalent toxicity to host and pathogen.','Harming host tissue contradicts the selective-toxicity principle.','Destroying infected host cells is not the definition provided for antimicrobial selective toxicity.',''],
  Q27:['Plasmid-encoded beta-lactamase is an acquired genetic mechanism.','','A chromosomal target mutation is genetic resistance.','A transposon resistance gene is a mobile genetic mechanism.'],
  Q29:['Bacteriostatic agents inhibit growth rather than producing the rapid irreversible killing required by this stem.','Antivirals do not answer an antibiotic-class question.','Antifungals do not answer an antibiotic-class question.',''],
  Q30:['Target modification changes a binding site rather than pumping drug out.','Enzymatic degradation destroys or modifies a drug rather than exporting it.','','A porin change reduces entry and is distinct from active drug export.'],
  Q31:['Tetracycline is not the source-preferred drug in this beta-lactam-resistant MRSA comparison.','Rifampicin is not the keyed selection in this source scenario.','','Penicillin is a beta-lactam and does not fit the stated beta-lactam non-response.'],
  Q32:['Vancomycin is not the source’s porin-linked choice.','Macrolides are not the source’s porin-linked choice.','','Rifampicin is not the source’s porin-linked choice.'],
  Q33:['Target alteration is a recognized bacterial resistance mechanism.','','Efflux activation is a recognized bacterial resistance mechanism.','Enzymatic drug inactivation is a recognized bacterial resistance mechanism.'],
  Q34:['Increasing porin size is not the taught sulphonamide-bypass mechanism.','','Alteration of the 50S ribosome does not bypass the folate pathway.','PBP binding is a beta-lactam action and does not explain sulphonamide resistance.'],
  Q35:['Tetracycline acts at the bacterial 30S ribosomal subunit rather than PBPs.','Vancomycin inhibits an earlier peptidoglycan step by a different mechanism rather than binding PBPs in this teaching.','','Polymyxin disrupts the cytoplasmic membrane rather than binding PBPs.'],
}
const correctExplanation = (q) => `The option “${q.options['ABCD'.indexOf(q.key)]}” is correct because ${q.reason}. This matches the specific mechanism, definition, or selection tested in the stem. Key takeaway: ${q.display}`
const wrongExplanation = (q, i) => `${wrongNotes[q.ref][i]} The tested relationship is: ${q.display} Therefore “${q.options[i]}” is not the best answer.`
const questionRow = (q) => {
  const c = byConcept[q.concept]
  const optionRows = q.options.flatMap((option,i) => [[`answer_${'abcd'[i]}`,option],[`explanation_${'abcd'[i]}`,'ABCD'[i] === q.key ? correctExplanation(q) : wrongExplanation(q,i)]])
  const objective = c.objective ?? field(findBlock(c.reuse,c.id),'explicit_objective')
  return row([['id',q.id],['title',q.stem],['subject','inf'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format','single best answer'],['derived_from',''],['correct_answer',q.key],...optionRows,['topic','Antimicrobial chemotherapy'],['subtopic',c.micro ?? 'Governed prior concept reuse'],['difficulty','Moderate'],['question_type','Microbiology'],['main_concept',q.concept],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Family-20 Part3 > ${q.ref}`],['clinical_relevance','0.70'],['academic_relevance','0.94'],['cognitive_effort_score','0.46'],['exam_weight_by_year','HU_Y1=0.62'],['question_only_for','HU_Y1'],['concept_ids',q.concept],['years','HU_Y1'],['universities','hu'],['cognitive_effort','Low'],['setting','Academic'],['reasoning_level','1'],['inferred_difficulty','46'],['exam_relevance','6'],['contextual_concept_ids',''],['library_ids',c.article],['resource_ids',`${bank}\n${carrier}`],['learning_objective',objective],['media_recommendations',''],['source_citation',`${bank}, p${q.page}, Family-20 ${q.ref}: literal stem, options and order; p6 red table prints answer ${q.key}. ${carrier}, p${q.teachingPage}: ${q.teaching} The answer is a tier-6 study-bank answer, not an official examination key.`],['attachments',''],['attached_image',''],['author_notes',`Literal source wording, capitalization, option order, typos and glyphs are preserved. ${q.limitation} Q13, Q21 and Q28 remain cross-university dependency holds; routine Family 20 is otherwise closed.`],['estimated_seconds','60'],['randomise_answers','yes']])
}

const claimRow = (q) => row([['id',q.claim],['concept_id',q.concept],['subject','inf'],['predicate','supports'],['object',`the exact Family-20 ${q.ref} tested relation`],['display_text',q.display],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence',q.ref === 'Q33' ? '0.78' : '0.86'],['freshness','stable_local_teaching_fact'],['time_sensitive','no'],['qualifiers',`authority: tier-6 auxiliary study-bank answer plus tier-4 local teaching, with no official examination-key authority. limitation: ${q.limitation}`]])
const currentCitation = (q) => row([['id',q.currCit],['claim_id',q.claim],['resource_id',carrier],['evidence_role','local_curriculum'],['support_span',q.teaching],['locator_type','page'],['locator_page',q.teachingPage],['locator_section',`Antimicrobial chemotherapy teaching for Family-20 ${q.ref}`],['locator_detail',q.ref === 'Q33' ? 'Comparison across pp20–26; three valid mechanisms are taught, while the negative exception is not a single direct sentence' : 'Direct or explicitly limited local teaching used to explain the source occurrence'],['context_note',`Tier-4 Helwan teaching carrier; it supplies curriculum context but no official answer. ${q.limitation}`],['confidence',q.ref === 'Q33' ? '0.78' : '0.90'],['counts_as_claim_evidence','no']])
const bankCitation = (q) => row([['id',q.bankCit],['claim_id',q.claim],['resource_id',bank],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Printed study-bank answer: ${q.key}.`],['locator_type','page'],['locator_page',q.page],['locator_section',`Family-20 ${q.ref}; matched red answer table on p6`],['locator_detail','Exact literal stem and option order with printed answer-table letter'],['context_note','Tier-6 Helwan-local study bank; the answer table is not an authenticated examination or official departmental key.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
const spanRow = (q) => row([['id',q.span],['article_id',byConcept[q.concept].article],['section_id',`${byConcept[q.concept].article.toLowerCase()}-${q.ref.toLowerCase()}`],['text',q.display],['claim_ids',q.claim],['citation_ids',`${q.currCit}\n${q.bankCit}`]])

const relationSpecs = [
  ['CON-INF-AD7DC1EF66E104','contrasts_with','CON-INF-90DF7C039A770B',['Q25','Q35'],'vancomycin inhibition of an early peptidoglycan step contrasts with beta-lactam PBP binding at final synthesis steps'],
  ['CON-INF-0096D0AC9CB83E','contrasts_with','CON-INF-DFC3D949513ED2',['Q30','Q32'],'active MDR-pump export contrasts with reduced antimicrobial entry through altered permeability'],
  ['CON-INF-3613A490E1C125','related_concepts','CON-INF-AD7DC1EF66E104',['Q31','Q25'],'the MRSA treatment-selection occurrence is related to vancomycin’s distinct early peptidoglycan mechanism'],
  ['CON-INF-FB45DDDCD69E28','related_concepts','CON-INF-39978E6864743D',['Q33','Q34'],'the resistance-mechanism exception classification is related to a specific valid metabolic-bypass mechanism'],
]
const relationRows = joinRows(relationSpecs.map(([source,type,target,refs,scope]) => row([['source',source],['type',type],['target',target],['evidence_claim_ids',refs.map((r) => byRef[r].claim).join('\n')],['citation_ids',refs.map((r) => byRef[r].currCit).join('\n')],['verification_status','needs_evidence'],['confidence','0.82'],['qualifiers',`scope: ${scope}`],['reviewer','Medical team, Helwan Microbiology faculty']])))

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family20-part3-sources.md',sourceRows],
  ['article/HU-BMS-102-microbiology-family20-part3-articles.md',joinRows(articleSpecs.map(articleRow))],
  ['concept/HU-BMS-102-microbiology-family20-part3-concepts.md',conceptRows],
  ['evidence/HU-BMS-102-microbiology-family20-part3-claims.md',joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family20-part3-citations.md',joinRows([...questions.map(currentCitation),...questions.map(bankCitation)])],
  ['evidence/HU-BMS-102-microbiology-family20-part3-spans.md',joinRows(questions.map(spanRow))],
  ['relations/HU-BMS-102-microbiology-family20-part3-relations.md',relationRows],
  ['question/HU-BMS-102-microbiology-family20-part3-mcq.md',joinRows(questions.map(questionRow))],
])

for (const [relative,body] of files) {
  const output = join(root,relative)
  mkdirSync(dirname(output),{recursive:true})
  writeFileSync(output,`${body.trim()}\n`)
}

console.log(JSON.stringify({family:'20-part3',refs:questions.map((q)=>q.ref),answers:questions.map((q)=>`${q.ref}:${q.key}`),released:{sources:2,articles:3,concepts:10,newConcepts:3,reusedConcepts:7,questions:10,claims:10,citations:20,spans:10,relations:4},holds:{crossUniversityDependency:['Q13','Q21','Q28'],routineBacklog:[]}},null,2))
