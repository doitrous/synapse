import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const repo = process.cwd()
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const bank = 'src_e89478440e99a6b8a854'
const carrier = 'src_bd6d792541ed79e0e692'
const oldBank = 'src_4abfcc7807e4409a34dd'

const A1 = 'ART-HU-BMS102-MIC-F20P2-RESISTANCE-AND-DRUG-TARGETS'
const A2 = 'ART-HU-BMS102-MIC-F20P2-SPECTRUM-TOXICITY-AND-CLASSIFICATION'
const A3 = 'ART-HU-BMS102-MIC-F20P2-FOLATE-AND-COMBINATION-EFFECTS'
const allArticles = [A1, A2, A3]

const concepts = [
  {
    id: 'CON-INF-33FCD9AB4B031B', key: 'abscess-poor-drug-penetration-resistance', refs: ['Q14'], article: A1,
    label: 'Bacteria walled off in an abscess may resist therapy because the drug cannot penetrate effectively',
    aliases: ['Abscess drug-penetration resistance', 'Walled-off bacteria and poor antimicrobial penetration'], type: 'mechanism',
    micro: 'Origins of antimicrobial resistance', nano: 'Walled-off abscess and poor penetration',
    definition: 'Bacteria may be phenotypically resistant when they are walled off inside an abscess cavity that an antimicrobial cannot penetrate effectively. This is a non-genetic access problem rather than plasmid mutation, enzyme degradation or target modification.',
    objective: 'Identify poor antimicrobial penetration as the source mechanism of resistance in a walled-off abscess.',
    pitfalls: 'Treating the abscess setting as proof of plasmid mutation, drug-inactivating enzyme production or target modification.',
    display: 'Bacteria walled off in an abscess may resist therapy because the drug cannot penetrate effectively.',
    limitation: 'The concept is limited to the source’s non-genetic walled-off-abscess explanation and does not imply that every treatment failure in an abscess has this single cause.'
  },
  { id: 'CON-INF-6F6F8F6ABEE2FC', refs: ['Q15'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'Exact-ID reuse preserves tetracycline action at the bacterial 30S subunit and appends only this distinct Family-20 occurrence.' },
  { id: 'CON-INF-303D18B5BF2499', refs: ['Q16'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'Exact-ID reuse preserves the classic streptomycin/eighth-cranial-nerve teaching; the literal `ototopicity` and `D.Tetracycline` wording remains source-bound.' },
  { id: 'CON-INF-D69C8C4C6B0D6D', refs: ['Q17'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'Exact-ID reuse preserves spontaneous mutation as the source origin of chromosomal resistance; literal `exchang` is retained only in the question occurrence.' },
  {
    id: 'CON-INF-86138846456A2F', key: 'rifampicin-rna-polymerase-inhibition', refs: ['Q18'], article: A1,
    label: 'Rifampicin inhibits bacterial RNA synthesis by binding RNA polymerase',
    aliases: ['Rifampicin RNA-polymerase inhibition', 'Rifampicin inhibition of RNA synthesis'], type: 'mechanism',
    micro: 'Mechanisms of antimicrobial action', nano: 'Rifampicin and RNA polymerase',
    definition: 'Rifampicin inhibits bacterial RNA synthesis by binding to RNA polymerase. This distinguishes it from quinolone inhibition of DNA gyrase and from ribosome-directed protein-synthesis inhibitors.',
    objective: 'Match rifampicin to inhibition of bacterial RNA polymerase and RNA synthesis.',
    pitfalls: 'Assigning DNA-gyrase inhibition to rifampicin or confusing RNA synthesis with ribosomal protein synthesis.',
    display: 'Rifampicin inhibits bacterial RNA synthesis by binding RNA polymerase.',
    limitation: 'The concept preserves the direct local lecture formulation without adding dosing, resistance or clinical-use claims.'
  },
  { id: 'CON-INF-8779E4885B09B8', refs: ['Q19'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'Exact-ID reuse preserves penicillin as the bactericidal example within the printed option comparison.' },
  {
    id: 'CON-INF-AE5FF83DC667F3', key: 'broad-spectrum-empiric-unknown-pathogen-use', refs: ['Q20'], article: A2,
    label: 'Broad-spectrum antibacterial therapy covers several organism types while an unknown pathogen awaits culture results',
    aliases: ['Broad-spectrum empiric therapy before culture result', 'Unknown pathogen broad-spectrum selection'], type: 'clinical_application',
    micro: 'Clinical use of antimicrobials', nano: 'Empiric broad-spectrum selection',
    definition: 'In the study-bank scenario, a broad-spectrum antibacterial is selected while the pathogen is unknown and culture results are pending. The carrier separately defines broad-spectrum agents and states that empirical treatment may begin after specimens are taken and should later be modified using susceptibility results.',
    objective: 'Choose broad-spectrum antibacterial coverage for the stated initial empiric-treatment scenario while culture results are pending.',
    pitfalls: 'Choosing an antiviral or antifungal for a bacterial-antibiotic stem, or treating the source answer as a universal prescribing rule independent of sampling, site, severity and stewardship.',
    display: 'Broad-spectrum antibacterial therapy covers several organism types while an unknown pathogen awaits culture results.',
    limitation: 'The lecture supports the spectrum definition and specimen-first empiric-treatment framework but does not state that every unknown pathogen requires broad-spectrum treatment; this Draft occurrence remains source-bounded.'
  },
  {
    id: 'CON-INF-437C87F228ADDB', key: 'trimethoprim-nucleotide-synthesis-inhibition', refs: ['Q22'], article: A3,
    label: 'Trimethoprim inhibits bacterial nucleotide synthesis',
    aliases: ['Trimethoprim nucleotide-synthesis inhibition', 'Trimethoprim folate-pathway mechanism'], type: 'mechanism',
    micro: 'Mechanisms of antimicrobial action', nano: 'Trimethoprim and nucleotide synthesis',
    definition: 'The governed lecture groups trimethoprim with sulfonamides as inhibitors of bacterial nucleotide synthesis. The source therefore pairs trimethoprim with nucleotide-synthesis inhibition while keeping the wording broader than a direct enzyme-target statement.',
    objective: 'Recognize the source-supported pairing of trimethoprim with inhibition of bacterial nucleotide synthesis.',
    pitfalls: 'Claiming that the carrier names a more precise molecular target than it actually states, or accepting the distractor that sulphonamide competes with folic acid rather than PABA.',
    display: 'Trimethoprim inhibits bacterial nucleotide synthesis.',
    limitation: 'The carrier states the broad pathway effect only; no more precise enzyme target is inferred, and the printed answer remains a tier-6 study-bank answer rather than an official key.'
  },
  {
    id: 'CON-INF-CBA58FDF25F720', key: 'tetracycline-broad-spectrum-example', refs: ['Q23'], article: A2,
    label: 'Tetracycline is a broad-spectrum antibiotic example in the Helwan lecture',
    aliases: ['Tetracycline broad-spectrum example', 'Broad-spectrum tetracycline classification'], type: 'classification',
    micro: 'Antimicrobial spectrum', nano: 'Tetracycline broad-spectrum classification',
    definition: 'The lecture defines broad-spectrum antibiotics as active against several types of microorganisms, including Gram-positive and Gram-negative bacteria, and lists tetracyclines as examples.',
    objective: 'Identify tetracycline as the source-listed broad-spectrum antibiotic example.',
    pitfalls: 'Selecting vancomycin, which the same lecture presents as narrow-spectrum against selected Gram-positive cocci, or generalizing spectrum without susceptibility context.',
    display: 'Tetracycline is a broad-spectrum antibiotic example in the Helwan lecture.',
    limitation: 'The classification is a teaching example and does not guarantee susceptibility of every organism or endorse empiric tetracycline use.'
  },
  { id: 'CON-INF-EAF4C14131FA44', refs: ['Q24'], article: A3, live: true, objective: 'Distinguish addition, in which combined action equals the sum of the individual actions, from other antimicrobial combination effects.', limitation: 'Live exact-ID reuse preserves the KAU-authored fields and appends the distinct Helwan occurrence, article and evidence links without replacing the existing source state.' },
]

const questions = [
  { ref: 'Q14', page: 3, key: 'D', stem: '14- Drug resistance in abscesses is mainly due to:', options: ['Plasmid mutation','Enzyme degradation','Target modification','Poor drug penetration'], reason: 'the lecture explains that bacteria may be walled off within an abscess cavity that the drug cannot penetrate effectively', teachingPage: 28, teaching: 'Bacteria may be walled off within an abscess cavity that the drug can not penetrate effectively.', limitation: 'The answer is limited to the source’s walled-off-abscess mechanism and is not a universal explanation for every abscess treatment failure.' },
  { ref: 'Q15', page: 3, key: 'B', stem: '15- Tetracycline inhibits protein synthesis by acting on:', options: ['50S subunit','30S subunit','80S ribosome','RNA polymerase'], reason: 'the lecture directly places tetracycline among drugs acting on the bacterial 30S ribosomal subunit', teachingPage: 15, teaching: 'Tetracycline and aminoglycosides act on 30S subunits.', limitation: 'This exact source occurrence is distinct from, but semantically collapses to, the established Family-11 tetracycline/30S concept.' },
  { ref: 'Q16', page: 3, key: 'C', stem: '16- Which of the following antibiotics is most likely to cause ototopicity by affecting the 8th cranial nerve?', options: ['Chloramphenicol','Gentamicin','Streptomycin','Tetracycline'], reason: 'the lecture specifically associates streptomycin with eighth-cranial-nerve injury leading to deafness', teachingPage: 33, teaching: 'Streptomycin affects the 8th cranial nerve leading to deafness.', limitation: 'The literal typo `ototopicity` and the no-space source form `D.Tetracycline` are preserved in the stem/source notes; the keyed teaching is the lecture’s classic streptomycin association and remains Draft.' },
  { ref: 'Q17', page: 3, key: 'B', stem: '17- Chromosomal resistance typically arises through:', options: ['Plasmid exchang','Spontaneous mutation','Protein denaturation','Cell wall lysis'], reason: 'the lecture describes chromosomal resistance as developing from spontaneous mutation in a susceptibility-controlling gene', teachingPage: 30, teaching: 'Chromosomal drug resistance develops as a result of spontaneous mutation in a gene that controls susceptibility to an antimicrobial agent.', limitation: 'The literal incomplete word `exchang` is preserved as option A and is not repaired in the student-facing occurrence.' },
  { ref: 'Q18', page: 3, key: 'C', stem: '18- Which drug inhibits RNA polymerase in bacteria?', options: ['Quinolone','Sulphonamide','Rifampicin','Chloramphenicol'], reason: 'the lecture directly states that rifampicin binds RNA polymerase and inhibits RNA synthesis', teachingPage: 16, teaching: 'Rifampicin inhibits RNA synthesis by binding to RNA polymerase.', limitation: 'The mechanism is confined to the direct lecture statement and does not add clinical-use or resistance claims.' },
  { ref: 'Q19', page: 3, key: 'C', stem: '19- Which of the following is a bactericidal antibiotic?', options: ['Sulphonamide','Tetracycline','Penicillin','Chloramphenicol'], reason: 'the lecture lists penicillins among bactericidal drugs and the other printed options among bacteriostatic examples', teachingPage: 6, teaching: 'Examples of bactericidal drugs include penicillins, cephalosporins and aminoglycosides.', limitation: 'The answer is the source classification within this printed option set.' },
  { ref: 'Q20', page: 4, key: 'C', stem: '20- A medical intern is asked to choose an antibiotic for an unknown pathogen while awaiting culture\nresults. Which type of antibiotic is most appropriate?', options: ['Antiviral','Narrow-spectrum','Broad-spectrum','Antifungal'], reason: 'the source frames an unknown bacterial pathogen awaiting culture as the setting for initial broad-spectrum coverage', teachingPage: 8, teaching: 'Broad spectrum antibiotics are active against several types of microorganisms, both Gram positive and Gram negative.', limitation: 'The lecture supports the spectrum definition but not an unrestricted rule that every unknown pathogen requires broad-spectrum treatment; specimens, site, severity and stewardship still matter.' },
  { ref: 'Q22', page: 4, key: 'D', stem: '22- Which of the following correctly pairs the drug with its mechanism of action?', options: ['Quinolone - inhibits RNA polymerase','Rifampicin - inhibits DNA gyrase','Sulphonamide - competes with folic acid','Trimethoprim - inhibits nucleotide synthesis'], reason: 'the lecture explicitly groups trimethoprim with sulfonamides as inhibitors of nucleotide synthesis', teachingPage: 16, teaching: 'Trimethoprim and sulfonamides inhibit nucleotide synthesis.', limitation: 'The phrase `inhibits nucleotide synthesis` is broad; the carrier does not support inferring a more precise direct enzyme target. The answer remains source-bounded and Draft.' },
  { ref: 'Q23', page: 4, key: 'B', stem: '23- Which antibiotic is an epample of a broad-spectrum agent?', options: ['Vancomycin','Tetracycline','Erythromycin','Metronidazole'], reason: 'the lecture lists tetracyclines as broad-spectrum examples active across several microorganism types', teachingPage: 8, teaching: 'Broad spectrum antibiotics are active against several types of microorganisms, both Gram positive and Gram negative; examples include tetracyclines.', limitation: 'The literal typo `epample` is preserved and the classification does not predict every organism’s susceptibility.' },
  { ref: 'Q24', page: 4, key: 'B', stem: '24- In antibiotic combinations, which term describes a situation where the total effect is equal to the sum of\nthe individual effects?', options: ['Synergism','Addition','Antagonism','Indifference'], reason: 'the lecture defines addition as combined action equivalent to the sum of the actions of each drug alone', teachingPage: 43, teaching: 'Addition means the combined action is equivalent to the sum of the actions of each drug when used alone.', limitation: 'Addition is kept distinct from synergism, which exceeds the sum, and from indifference or antagonism.' },
]

const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))
const byConcept = Object.fromEntries(concepts.map((c) => [c.id, c]))
for (const c of concepts) for (const ref of c.refs) byRef[ref].concept = c.id
for (const q of questions) {
  q.id = `Q-HU102-MIC-F20-${q.ref}`
  q.claim = `CLM-HU102-F20P2-${q.ref}-01`
  q.currCit = `CIT-HU102-F20P2-${q.ref}-CURR`
  q.bankCit = `CIT-HU102-F20P2-${q.ref}-BANK`
  q.span = `SPN-HU102-F20P2-${q.ref}-01`
  q.display = byConcept[q.concept].display ?? ({
    Q15: 'Tetracycline acts on the bacterial 30S ribosomal subunit.',
    Q16: 'Streptomycin can affect the eighth cranial nerve and cause deafness.',
    Q17: 'Chromosomal antimicrobial resistance can arise through spontaneous mutation.',
    Q19: 'Penicillin is a bactericidal antibiotic.',
    Q24: 'Addition means the combined antimicrobial action equals the sum of each drug’s action alone.',
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
  row([['id',bank],['title','Antimicrobial chemotherapy — auxiliary MCQ study bank'],['institution','Faculty of Medicine, Helwan University local corpus'],['collection_id','hu-y1'],['source_relative_path','Year 1/BMS 102/Microbiology/Notes and Summaries/Antimicrobial chemotherapy.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','6'],['sha256','e89478440e99a6b8a854a9ca7e38b792c5904634a7f6aa2d6f2ae44809340e0f'],['processing_status','pending'],['rights','Local university material held for internal authoring only; no page image is redistributed.'],['qualification','Tier-6 Helwan-local auxiliary study bank. Part2 releases Q14–Q20 and Q22–Q24 from pp3–4 with letters matched to the complete red answer table on p6. These are study-bank answers, not authenticated examination or official-key records.'],['is_assessment','yes']]),
  row([['id',carrier],['title','Antimicrobial chemotherapy — HU-BMS-102 microbiology lecture'],['institution','Faculty of Medicine, Helwan University local corpus'],['collection_id','hu-y1'],['source_relative_path','Year 1/BMS 102/Microbiology/Theoretical/Lec 3 - Antimicrobials/-Antimicrobial chemotherapy.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','46'],['sha256','bd6d792541ed79e0e692652157092fec0c7ee969a0b225e10155b2364a0010a8'],['processing_status','pending'],['rights','Local university material held for internal authoring only; no page image is redistributed.'],['qualification','Tier-4 theoretical teaching carrier attributed to Dr Ehab M. Fahmy, Faculty of Medicine, Helwan University. It supplies governed teaching but no sitting, marks, candidate instructions or official answer-key authority.'],['is_assessment','no']]),
])

const articleSpecs = [
  { id:A1, title:'Resistance origins and antimicrobial drug targets', micro:'Resistance and drug targets', refs:['Q14','Q15','Q17','Q18'], sections:`### Definition
Antimicrobial failure can arise because a drug cannot reach walled-off bacteria, because a chromosomal mutation changes inherited susceptibility, or because a drug acts at a particular microbial target. These relations must not be collapsed into one generic resistance label.

### Mechanism
Bacteria inside an abscess may be inaccessible to effective drug concentrations. Tetracycline acts at the bacterial 30S ribosomal subunit. Rifampicin binds bacterial RNA polymerase and inhibits RNA synthesis. Chromosomal resistance may arise through spontaneous mutation in a susceptibility-controlling gene.

### Key determinants
Poor penetration is non-genetic and access-related; spontaneous mutation is genetic. A 30S ribosomal target concerns protein synthesis, whereas RNA polymerase concerns RNA synthesis.

### Clinical significance
Drug delivery to the site and the organism’s resistance mechanism both affect response. Correct target matching prevents confusion between ribosomal, DNA and RNA mechanisms.

### Exam approach
Use the abscess clue for poor penetration, match tetracycline to 30S, chromosomal resistance to spontaneous mutation, and rifampicin to RNA polymerase.

### Authority limitation
The printed letters come from a tier-6 study bank. The tier-4 Helwan lecture supplies teaching but neither source supplies an authenticated examination key.` },
  { id:A2, title:'Antimicrobial spectrum, bactericidal classification and toxicity', micro:'Spectrum, classification and toxicity', refs:['Q16','Q19','Q20','Q23'], sections:`### Definition
Broad-spectrum antibiotics act against several microorganism types, including Gram-positive and Gram-negative bacteria. Tetracyclines are source-listed broad-spectrum examples; penicillins are source-listed bactericidal examples.

### Mechanism
Bactericidal drugs kill rapidly and irreversibly. Streptomycin is classically linked by the lecture to eighth-cranial-nerve injury and deafness. Spectrum describes breadth of activity and is separate from bactericidal action or toxicity.

### Key determinants
An unknown-pathogen vignette selects broad-spectrum coverage while culture results are pending. This is not a universal prescribing rule. The named-example item separately tests tetracycline’s spectrum classification.

### Clinical significance
Empiric therapy should follow specimen collection where possible and should be revised using culture and susceptibility findings. Spectrum and host toxicity both shape selection.

### Exam approach
Keep the two spectrum questions distinct: one tests an empiric scenario and one tests a named example. Match penicillin to bactericidal classification and the classic eighth-nerve clue to streptomycin.

### Authority limitation
The literal source typos are preserved. All recommendations remain Draft, source-bounded and subject to faculty review.` },
  { id:A3, title:'Folate-pathway inhibition and antimicrobial combination effects', micro:'Folate pathway and combination effects', refs:['Q22','Q24'], sections:`### Definition
The lecture groups trimethoprim with sulfonamides as inhibitors of bacterial nucleotide synthesis. In combined therapy, addition means the total action equals the sum of the actions of the drugs used alone.

### Mechanism
The trimethoprim statement is a broad pathway-level formulation; this source does not name a more precise enzyme target. Combination effects are classified by comparison with individual actions: addition equals the sum, synergism exceeds it, indifference adds no benefit beyond the better drug, and antagonism reduces action.

### Key determinants
Sulphonamides compete with PABA rather than with folic acid. The wording of Q22 therefore makes the trimethoprim pairing the printed answer. Q24 tests equality with the sum, not an effect greater than the sum.

### Clinical significance
Mechanism matching and combination-effect terminology support rational antimicrobial use, while source precision limits how far an explanation may go.

### Exam approach
Reject the swapped quinolone/rifampicin targets, retain the broad trimethoprim wording exactly, and distinguish addition from synergism.

### Authority limitation
The study-bank answers are not official keys. The Q22 teaching remains explicitly partial and no unstated direct enzyme target is inferred.` },
]

const articleRow = (a) => {
  const qs = a.refs.map((r) => byRef[r])
  const ids = [...new Set(qs.map((q) => q.concept))]
  return row([['id',a.id],['title',a.title],['arabic_title',''],['aliases',`Family-20 Part2 ${a.micro}\nHU-BMS-102 antimicrobial chemotherapy`],['subject','inf'],['topic','Microbiology'],['subtopic','Antimicrobial chemotherapy'],['microtopic',a.micro],['nanotopic','Family-20 Part2'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF\nDIS-PHA'],['template_id','TPL-CONCEPT'],['archetype','concept'],['language','en'],['learner_stage','Years 1–3 foundation'],['reading_time','6'],['high_yield','High'],['time_sensitive','stable'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['summary',`Question-led teaching for ${a.micro.toLowerCase()} with exact Family-20 Part2 wording, evidence and authority limits.`],['sections',`${a.sections}\n\n### Source-grounded claims\n${qs.map((q) => q.display).join('\n')}`],['published_summary',''],['published_sections',''],['hold_these',qs.map((q) => q.display).join('\n')],['lose_the_mark','Treating the tier-6 answer table as an official examination key.\nSilently repairing source wording or extending Q20/Q22 beyond the governed teaching.'],['related_concepts',ids.join('\n')],['related_articles',allArticles.filter((id) => id !== a.id).join('\n')],['question_ids',qs.map((q) => q.id).join('\n')],['resource_ids',`${bank}\n${carrier}`],['universities','hu'],['years','HU_Y1'],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${a.micro} > Family-20 Part2`],['university_notes','hu: Tier-6 Helwan-local study-bank occurrences supported by a tier-4 Helwan lecture; no official examination, sitting, marks or official-key status is inferred.'],['annotations',ids.map((id) => `### definition_of · ${id}\nQuote: ${byConcept[id].display ?? byRef[byConcept[id].refs[0]].display}\nBlock: body`).join('\n\n')],['media',''],['media_recommendations',''],['callout_evidence',qs.map((q) => `### ${q.display}\nClaims: ${q.claim}\nCitations: ${q.currCit}, ${q.bankCit}\nSpan: ${q.span}`).join('\n\n')],['article_source_ids',`${bank}\n${carrier}`],['claim_ids',qs.map((q) => q.claim).join('\n')],['span_ids',qs.map((q) => q.span).join('\n')],['publication_gate','needs_evidence'],['evidence_basis','Exact tier-6 study-bank occurrence and printed answer letter paired with direct or explicitly limited tier-4 Helwan teaching. No official key authority is claimed.'],['evidence_gaps','Independent medical verification and named Helwan faculty review remain required. Q13 and Q21 are cross-university dependency holds; Q25–Q35 remain routine backlog.'],['conflicts','[clear]'],['last_reviewed',''],['review_due',''],['notes','Family-20 Part2 releases Q14–Q20 and Q22–Q24 only. Q13 and Q21 remain valid keyed dependency holds; Q25–Q35 remain unprocessed routine backlog.'],['field_notes','arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.']])
}

const newConceptRow = (c) => {
  const qs = c.refs.map((r) => byRef[r])
  return row([['label',c.label],['id',c.id],['canonical_key',c.key],['aliases',c.aliases.join('\n')],['arabic_label',''],['arabic_aliases','[clear]'],['definition',c.definition],['explicit_objective',c.objective],['pitfalls',c.pitfalls],['concept_type',c.type],['status','Draft'],['support_mode','direct_statement'],['subject','inf'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF\nDIS-PHA'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${c.micro} > ${c.nano}`],['article_ids',c.article],['related_article_ids',allArticles.filter((id) => id !== c.article).join('\n')],['related_concept_ids','[clear]'],['resource_ids',`${bank}\n${carrier}`],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.62'],['exam_weight_by_year','HU_Y1=0.62'],['clinical_relevance','0.66'],['academic_relevance','0.94'],['weight_confidence','0.48'],['confidence','0.86'],['exam_signal',`${bank} | tier-6 auxiliary study bank | Family-20 ${c.refs.join('/')}, printed study answer only; ${carrier} | tier-4 Helwan teaching carrier | governed teaching, no official-key authority`],['atomic_claim_ids',qs.map((q) => q.claim).join('\n')],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],['original_wording',qs.map((q) => `[Family-20 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty',c.limitation],['evidence_gaps',`No official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan faculty review remain required.`],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath the canonical placement.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from the exact Family-20 occurrence and carrier teaching.\nsourceCandidateIds: Family 20 completed the governed search-before-mint gate.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No same-scope rival survived triage.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nreuseGovernance: New Family-20 question-led concept after governed no-same-scope adjudication.']])
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
  block = setField(block, 'field_notes', `${field(block,'field_notes')}\nfamily20Part2Reuse: Exact-ID reuse preserves the earlier record and appends only Family-20 Part2 article, source-occurrence and claim links. ${c.limitation}`)
  return block
}

const liveConceptRow = (c) => {
  const library = JSON.parse(readFileSync(join(repo,'server/data/medical-library-v1.json'),'utf8'))
  const stack = [library]
  let live
  while (stack.length && !live) {
    const value = stack.pop()
    if (Array.isArray(value)) for (const x of value) stack.push(x)
    else if (value && typeof value === 'object') {
      if (value.id === c.id && value.canonicalKey) live = value
      else for (const x of Object.values(value)) if (x && typeof x === 'object') stack.push(x)
    }
  }
  if (!live) throw new Error(`Cannot find live ${c.id}`)
  const q = byRef[c.refs[0]]
  const lines = (v) => Array.isArray(v) ? v.join('\n') : String(v ?? '')
  return row([['label',live.label],['id',live.id],['canonical_key',live.canonicalKey],['aliases',lines(live.aliases) || '[clear]'],['arabic_label',live.arabicLabel],['arabic_aliases',lines(live.arabicAliases) || '[clear]'],['definition',live.definition],['explicit_objective',live.explicitObjective],['pitfalls',live.pitfalls],['concept_type',live.conceptType],['status','Draft'],['support_mode',live.supportMode],['subject',live.subjectId],['primary_node_id',live.primaryNodeId],['secondary_node_ids',lines(live.secondaryNodeIds)],['learner_years',lines(live.learnerYears)],['universities',unionLines(lines(live.universityIds),'hu')],['modules',unionLines(lines(live.moduleIds),'HU-BMS-102')],['module_subject','HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Combination effects > Addition'],['article_ids',unionLines(lines(live.articleIds),c.article)],['related_article_ids',unionLines(lines(live.relatedArticleIds),allArticles.filter((id) => id !== c.article).join('\n'))],['related_concept_ids',lines(live.relatedConceptIds) || '[clear]'],['resource_ids',unionLines(lines(live.resourceIds),bank,carrier)],['approved_file_resource_ids',lines(live.approvedFileResourceIds) || '[clear]'],['approved_video_resource_ids',lines(live.approvedVideoResourceIds) || '[clear]'],['blueprint_weight',live.blueprintWeight],['exam_weight_by_year',`${Object.entries(live.examWeightByYear).map(([k,v]) => `${k}=${v}`).join('\n')}\nHU_Y1=0.62`],['clinical_relevance',live.clinicalRelevance],['academic_relevance',live.academicRelevance],['weight_confidence',live.weightConfidence],['confidence',live.confidence],['exam_signal',`${bank} | tier-6 auxiliary study bank | Family-20 Q24, printed study answer only; ${carrier} | tier-4 Helwan teaching carrier | direct addition definition, no official-key authority`],['atomic_claim_ids',unionLines(lines(live.atomicClaimIds),q.claim)],['resource_occurrence_ids',lines(live.resourceOccurrenceIds) || '[clear]'],['source_candidate_ids',lines(live.sourceCandidateIds) || '[clear]'],['original_wording',`${lines(live.originalWording)}\n[Family-20 Q24] ${q.stem} [printed answer B]`],['merge_ids',lines(live.mergeIds) || '[clear]'],['rejected_merge_candidate_ids',lines(live.rejectedMergeCandidateIds) || '[clear]'],['conflicts',lines(live.conflicts) || '[clear]'],['uncertainty',`${lines(live.uncertainty)}${lines(live.uncertainty) ? '\n' : ''}${c.limitation}`],['evidence_gaps',`${lines(live.evidenceGaps)}\nNo official Helwan examination key, sitting or marks are available for the Family-20 occurrence.`],['owner',live.owner],['reviewer',live.reviewer],['final_publisher',live.finalPublisher],['last_reviewed',live.lastReviewed],['review_due',live.reviewDue],['publication_status',live.publicationStatus],['editorial_review_status',live.editorialReviewStatus],['exclusion_reason',live.exclusionReason ?? ''],['field_notes',`${Object.entries(live.fieldNotes).map(([k,v]) => `${k}: ${v}`).join('\n')}\nfamily20Part2Reuse: ${c.limitation}`]])
}

const conceptRows = joinRows(concepts.map((c) => c.reuse ? reusedConceptRow(c) : c.live ? liveConceptRow(c) : newConceptRow(c)))

const wrongNotes = {
  Q14: ['A plasmid mutation would be a genetic resistance mechanism, whereas this abscess stem tests impaired access to walled-off bacteria.','Enzyme degradation requires drug inactivation and does not explain the anatomic barrier highlighted by an abscess.','Target modification changes the drug-binding site rather than preventing the antimicrobial from reaching the bacteria.',''],
  Q15: ['The 50S subunit is associated here with chloramphenicol and erythromycin rather than tetracycline.','','The 80S ribosome belongs to human cells, whereas antibacterial selectivity relies on the bacterial 70S ribosome.','RNA polymerase is the target paired with rifampicin, not tetracycline.'],
  Q16: ['Chloramphenicol is classically associated here with bone-marrow depression rather than eighth-nerve injury.','Gentamicin is listed as nephrotoxic in this teaching comparison, while the explicit eighth-nerve association is streptomycin.','','Tetracycline is associated with impaired development of fetal and infant bones and teeth rather than the stated cranial-nerve effect.'],
  Q17: ['Plasmid exchange describes mobile genetic transfer and is distinct from the origin of chromosomal resistance.','','Protein denaturation is not the stated genetic origin of antimicrobial resistance.','Cell-wall lysis is an antibacterial effect, not the origin of chromosomal resistance.'],
  Q18: ['Quinolones inhibit DNA gyrase and DNA synthesis rather than RNA polymerase.','Sulphonamides inhibit folate-dependent nucleotide synthesis rather than binding RNA polymerase.','','Chloramphenicol acts at the bacterial 50S ribosomal subunit rather than RNA polymerase.'],
  Q19: ['Sulphonamides are presented as bacteriostatic examples rather than bactericidal agents.','Tetracyclines inhibit bacterial multiplication and are classified here as bacteriostatic.','','Chloramphenicol is listed among bacteriostatic drugs rather than bactericidal examples.'],
  Q20: ['An antiviral targets viral infection and does not provide antibacterial spectrum for this antibiotic-selection stem.','Narrow-spectrum therapy covers few organism types and therefore does not match the pending-culture scenario as framed.','','An antifungal targets fungi and does not provide antibacterial coverage for this stem.'],
  Q22: ['Quinolones inhibit DNA gyrase rather than RNA polymerase.','Rifampicin binds RNA polymerase rather than DNA gyrase.','Sulphonamides compete with PABA, not with folic acid itself.',''],
  Q23: ['Vancomycin is presented as narrow-spectrum against selected Gram-positive cocci rather than as the broad-spectrum example.','','Erythromycin is not the broad-spectrum example identified in this teaching comparison.','Metronidazole is not the broad-spectrum example identified in this teaching comparison.'],
  Q24: ['Synergism means the combined effect is greater than the sum, not equal to it.','','Antagonism means one drug reduces the action of the other.','Indifference means the combination is no more effective than the most effective agent alone.'],
}
const correctExplanation = (q) => `The option “${q.options['ABCD'.indexOf(q.key)]}” is correct because ${q.reason}. This matches the specific mechanism, classification, or combination rule tested in the stem. Key takeaway: ${q.display}`
const wrongExplanation = (q, i) => `${wrongNotes[q.ref][i]} The tested relationship is: ${q.display} Therefore “${q.options[i]}” is not the best answer.`
const questionRow = (q) => {
  const c = byConcept[q.concept]
  const optionRows = q.options.flatMap((option,i) => [[`answer_${'abcd'[i]}`,option],[`explanation_${'abcd'[i]}`,'ABCD'[i] === q.key ? correctExplanation(q) : wrongExplanation(q,i)]])
  return row([['id',q.id],['title',q.stem],['subject','inf'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format','single best answer'],['derived_from',''],['correct_answer',q.key],...optionRows,['topic','Antimicrobial chemotherapy'],['subtopic',c.micro ?? 'Governed prior concept reuse'],['difficulty','Moderate'],['question_type','Microbiology'],['main_concept',q.concept],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Family-20 Part2 > ${q.ref}`],['clinical_relevance','0.66'],['academic_relevance','0.94'],['cognitive_effort_score','0.46'],['exam_weight_by_year','HU_Y1=0.62'],['question_only_for','HU_Y1'],['concept_ids',q.concept],['years','HU_Y1'],['universities','hu'],['cognitive_effort','Low'],['setting','Academic'],['reasoning_level','1'],['inferred_difficulty','46'],['exam_relevance','6'],['contextual_concept_ids',''],['library_ids',c.article],['resource_ids',`${bank}\n${carrier}`],['learning_objective',c.objective ?? `Apply the established ${field(findBlock(c.reuse,c.id),'label').toLowerCase()} concept to this exact source occurrence.`],['media_recommendations',''],['source_citation',`${bank}, p${q.page}, Family-20 ${q.ref}: literal stem, options and order; p6 red table prints answer ${q.key}. ${carrier}, p${q.teachingPage}: ${q.teaching} The answer is a tier-6 study-bank answer, not an official examination key.`],['attachments',''],['attached_image',''],['author_notes',`Literal source wording, capitalization, option order and typos are preserved. ${q.ref === 'Q16' ? 'The source option is literally printed as D.Tetracycline. ' : ''}${q.limitation} Q13 and Q21 remain cross-university dependency holds; Q25–Q35 remain routine backlog.`],['estimated_seconds','60'],['randomise_answers','yes']])
}

const claimRow = (q) => row([['id',q.claim],['concept_id',q.concept],['subject','inf'],['predicate','supports'],['object',`the exact Family-20 ${q.ref} tested relation`],['display_text',q.display],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence','0.86'],['freshness','stable_local_teaching_fact'],['time_sensitive','no'],['qualifiers',`authority: tier-6 auxiliary study-bank answer plus tier-4 local teaching, with no official examination-key authority. limitation: ${q.limitation}`]])
const currentCitation = (q) => row([['id',q.currCit],['claim_id',q.claim],['resource_id',carrier],['evidence_role','local_curriculum'],['support_span',q.teaching],['locator_type','page'],['locator_page',q.teachingPage],['locator_section',`Antimicrobial chemotherapy teaching for Family-20 ${q.ref}`],['locator_detail','Direct or explicitly limited local teaching used to explain the source occurrence'],['context_note',`Tier-4 Helwan teaching carrier; it supplies curriculum context but no official answer. ${q.limitation}`],['confidence','0.90'],['counts_as_claim_evidence','no']])
const bankCitation = (q) => row([['id',q.bankCit],['claim_id',q.claim],['resource_id',bank],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Printed study-bank answer: ${q.key}.`],['locator_type','page'],['locator_page',q.page],['locator_section',`Family-20 ${q.ref}; matched red answer table on p6`],['locator_detail','Exact literal stem and option order with printed answer-table letter'],['context_note','Tier-6 Helwan-local study bank; the answer table is not an authenticated examination or official departmental key.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
const spanRow = (q) => row([['id',q.span],['article_id',byConcept[q.concept].article],['section_id',`${byConcept[q.concept].article.toLowerCase()}-${q.ref.toLowerCase()}`],['text',q.display],['claim_ids',q.claim],['citation_ids',`${q.currCit}\n${q.bankCit}`]])

const relationSpecs = [
  ['CON-INF-33FCD9AB4B031B','contrasts_with','CON-INF-D69C8C4C6B0D6D',['Q14','Q17'],'non-genetic poor penetration to walled-off bacteria contrasts with genetic chromosomal resistance arising through spontaneous mutation'],
  ['CON-INF-AE5FF83DC667F3','related_concepts','CON-INF-CBA58FDF25F720',['Q20','Q23'],'the empiric broad-spectrum scenario is related to, but distinct from, tetracycline as a named broad-spectrum example'],
  ['CON-INF-437C87F228ADDB','contrasts_with','CON-INF-86138846456A2F',['Q22','Q18'],'broad nucleotide-synthesis pathway inhibition contrasts with rifampicin binding bacterial RNA polymerase to inhibit RNA synthesis'],
]
const relationRows = joinRows(relationSpecs.map(([source,type,target,refs,scope]) => row([['source',source],['type',type],['target',target],['evidence_claim_ids',refs.map((r) => byRef[r].claim).join('\n')],['citation_ids',refs.map((r) => byRef[r].currCit).join('\n')],['verification_status','needs_evidence'],['confidence','0.82'],['qualifiers',`scope: ${scope}`],['reviewer','Medical team, Helwan Microbiology faculty']])))

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family20-part2-sources.md',sourceRows],
  ['article/HU-BMS-102-microbiology-family20-part2-articles.md',joinRows(articleSpecs.map(articleRow))],
  ['concept/HU-BMS-102-microbiology-family20-part2-concepts.md',conceptRows],
  ['evidence/HU-BMS-102-microbiology-family20-part2-claims.md',joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family20-part2-citations.md',joinRows([...questions.map(currentCitation),...questions.map(bankCitation)])],
  ['evidence/HU-BMS-102-microbiology-family20-part2-spans.md',joinRows(questions.map(spanRow))],
  ['relations/HU-BMS-102-microbiology-family20-part2-relations.md',relationRows],
  ['question/HU-BMS-102-microbiology-family20-part2-mcq.md',joinRows(questions.map(questionRow))],
])

for (const [relative,body] of files) {
  const output = join(root,relative)
  mkdirSync(dirname(output),{recursive:true})
  writeFileSync(output,`${body.trim()}\n`)
}

console.log(JSON.stringify({family:'20-part2',refs:questions.map((q)=>q.ref),answers:questions.map((q)=>`${q.ref}:${q.key}`),released:{sources:2,articles:3,concepts:10,newConcepts:5,reusedConcepts:5,questions:10,claims:10,citations:20,spans:10,relations:3},holds:{crossUniversityDependency:['Q13','Q21'],routineBacklog:['Q25-Q35']}},null,2))
