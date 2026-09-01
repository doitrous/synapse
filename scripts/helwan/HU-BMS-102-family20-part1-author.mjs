import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const repo = process.cwd()
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const bank = 'src_e89478440e99a6b8a854'
const carrier = 'src_bd6d792541ed79e0e692'
const oldBank = 'src_4abfcc7807e4409a34dd'

const A1 = 'ART-HU-BMS102-MIC-F20P1-DEFINITIONS-RESISTANCE'
const A2 = 'ART-HU-BMS102-MIC-F20P1-ACTION-SELECTION'
const A3 = 'ART-HU-BMS102-MIC-F20P1-SPECTRUM-TOXICITY'

const concepts = [
  { id: 'CON-INF-804364C9A03875', key: 'antibiotic-current-use-natural-synthetic-definition', refs: ['Q01'], article: A1, label: 'Current medical use applies antibiotic to natural or synthetic antimicrobial agents', aliases: ['Current-use antibiotic definition', 'Natural or synthetic antimicrobial agent'], type: 'definition', micro: 'Core antimicrobial definitions', nano: 'Current-use antibiotic definition', definition: 'In this study bank, current medical use applies the term antibiotic to any antimicrobial agent, whether natural or synthetic. This broader usage is kept distinct from the lecture’s traditional biological-origin definition of an antibiotic.', objective: 'Recognize the source-qualified current-use definition that includes natural and synthetic antimicrobial agents.', pitfalls: 'Replacing the explicit current-use qualifier with only the traditional biological-origin definition, or extending the term to anticancer drugs.', annotation: 'Current medical use applies the term antibiotic to any natural or synthetic antimicrobial agent.', limitation: 'The broader wording is source-qualified as current medical use and must not erase the narrower biological-origin definition used elsewhere in the module.', prior: [] },
  { id: 'CON-INF-64A7823DCEC6E5', refs: ['Q02'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'This exact-ID Helwan reuse adds the Family-20 occurrence without changing the established beta-lactamase drug-inactivation scope.' },
  { id: 'CON-INF-86D082D1785D7A', refs: ['Q04'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part2-concepts.md', limitation: 'The oral Candida presentation is retained as the source example of superinfection after long-term antibacterial therapy.' },
  { id: 'CON-INF-179939E4F5811A', key: 'enterococcus-intrinsic-cephalosporin-receptor-resistance', refs: ['Q05'], article: A1, label: 'Enterococci are intrinsically resistant to cephalosporins in the source because they lack the drug receptor', aliases: ['Enterococcal intrinsic cephalosporin resistance', 'Absent cephalosporin receptor in enterococci'], type: 'mechanism', micro: 'Antimicrobial resistance', nano: 'Intrinsic absent-target resistance', definition: 'The Helwan lecture classifies enterococci as naturally resistant to cephalosporins because they lack the receptor for the drug. This is an intrinsic absent-target explanation rather than acquired resistance through mutation or plasmid transfer.', objective: 'Identify enterococci as the source example of intrinsic cephalosporin resistance attributed to an absent drug receptor.', pitfalls: 'Selecting Mycoplasma, whose absent cell wall explains penicillin resistance, or converting the source-specific receptor wording into a universal mechanistic claim.', annotation: 'The source attributes intrinsic enterococcal cephalosporin resistance to absence of the drug receptor.', limitation: 'The missing-receptor wording is preserved as a source-specific teaching formulation and remains needs_evidence rather than being generalized beyond the governed lecture.', prior: [] },
  { id: 'CON-INF-5A15540CA80809', refs: ['Q06'], article: A1, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'This exact-ID reuse preserves sulphonamide competition with PABA and does not broaden the mechanism beyond folate synthesis.' },
  { id: 'CON-INF-4E8ECDA3106CD7', refs: ['Q07', 'Q09'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'The two distinct Family-20 occurrences preserve the existing composite concept: growth inhibition without killing and subsequent host-defence clearance.' },
  { id: 'CON-INF-E5422DEBE7A81C', refs: ['Q08'], article: A3, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'The spectrum statement remains limited to the source comparison of selected Gram-positive cocci and does not imply universal clinical coverage.' },
  { id: 'CON-INF-7D05204BF47C67', refs: ['Q10'], article: A2, reuse: 'docs/Helwan-Source-Imports/concept/HU-BMS-102-microbiology-family11-part1-concepts.md', limitation: 'The recommendation is limited to the source scenario of severe infection with impaired host clearance in leucopenia.' },
  { id: 'CON-INF-29BCDD4434DE0E', key: 'tetracycline-fetal-teeth-bone-toxicity', refs: ['Q11'], article: A3, label: 'Fetal tetracycline exposure can stain teeth and impair bone growth', aliases: ['Tetracycline fetal teeth toxicity', 'Tetracycline bone and dental developmental toxicity'], type: 'clinical_application', micro: 'Complications of antimicrobial therapy', nano: 'Tetracycline developmental toxicity', definition: 'Tetracyclines can impair growth and development of bones and teeth in the developing fetus and infant. In the source vignette, in-utero exposure followed by stained teeth and impaired bone growth identifies tetracycline.', objective: 'Identify tetracycline from the paired developmental findings of stained teeth and impaired bone growth after fetal exposure.', pitfalls: 'Substituting aminoglycoside ototoxicity, chloramphenicol toxicity, or a fluoroquinolone adverse-effect profile for the source’s paired dental and bone findings.', annotation: 'Fetal tetracycline exposure can stain teeth and impair bone growth.', limitation: 'The item is a tier-6 study-bank occurrence supported by local teaching and does not carry official examination-key authority.', prior: [] },
  { id: 'CON-INF-BECFE64492EFE7', key: 'polymyxin-narrow-selective-toxicity-margin', refs: ['Q12'], article: A3, label: 'Polymyxins have a narrow margin of selective toxicity in the source framework', aliases: ['Polymyxin selective-toxicity margin', 'Polymyxin host-cell toxicity'], type: 'classification', micro: 'Selective toxicity', nano: 'Narrow selective-toxicity margin', definition: 'The lecture lists polymyxins among membrane-active drugs with a narrow margin of selective toxicity and therefore high host toxicity. The study bank asks for polymyxin as the most toxic option in its specific comparison.', objective: 'Select polymyxin from the source option set as the drug with the narrowest selective-toxicity margin.', pitfalls: 'Reading the misspelled source words as new terminology, or turning a source-option comparison into an unrestricted ranking across all drugs and doses.', annotation: 'Polymyxins have a narrow margin of selective toxicity in the source framework.', limitation: 'The literal `topic` and `topicity` spellings and the comparative toxicity claim are preserved but remain source-bounded and needs_evidence.', prior: [] },
]

const questions = [
  { ref: 'Q01', page: 1, key: 'C', stem: '1- Which of the following best defines an antibiotic in current medical use?', options: ['Only natural substances that inhibit microorganisms', 'Only synthetic drugs with antimicrobial action', 'Any antimicrobial agent, natural or synthetic', 'Drugs used for cancer treatment'], reason: 'the stem explicitly qualifies current medical use, and the printed answer includes both natural and synthetic antimicrobial agents', teachingPage: 3, teaching: 'Antibiotic is an antimicrobial substance produced by living organism and is active in high dilutions.', limitation: 'The study-bank answer uses a broader current-use definition, while the carrier preserves the narrower biological-origin definition; both contexts remain explicit.' },
  { ref: 'Q02', page: 1, key: 'C', stem: '2- Which enzyme destroys penicillin and causes resistance?', options: ['RNA polymerase', 'DNA gyrase', 'B-lactamase', 'PBP'], reason: 'beta-lactamase enzymatically inactivates susceptible penicillin rather than serving as a drug target', teachingPage: 21, teaching: 'Bacteria produce enzymes that inactivate the drug e.g. production of penicillin-destroying enzymes (β-lactamases).', limitation: 'The literal source spelling `B-lactamase` is preserved in the option while the explanation uses the standard beta-lactamase name.' },
  { ref: 'Q04', page: 1, key: 'B', stem: '4- A 65-year-old male with a history of chronic urinary tract infections has been on long-term antibiotic\ntherapy. He presents with white patches in his mouth and discomfort while eating. Which complication of\nantibiotic therapy is most likely?', options: ['Drug toxicity', 'Superinfection', 'Hypersensitivity', 'Antibiotic resistance'], reason: 'long-term therapy can suppress normal flora and permit oral Candida overgrowth as a superinfection', teachingPage: 34, teaching: 'Suppression of normal flora by the antibiotic used and replacement with drug resistant organisms can cause overgrowth of Candida in the mouth causing oral thrush.', limitation: 'The source vignette supports superinfection; it does not independently establish the organism by laboratory testing.' },
  { ref: 'Q05', page: 1, key: 'B', stem: '5- Which bacteria are naturally resistant to cephalosporins due to missing receptors?', options: ['Mycoplasma', 'Enterococci', 'Staphylococci', 'Neisseria'], reason: 'the carrier explicitly gives enterococci as the intrinsic-resistance example attributed to absence of the drug receptor', teachingPage: 29, teaching: 'Enterococci are naturally resistant to cephalosporins as they lack the receptor for the drug.', limitation: 'The missing-receptor wording is retained as the source formulation and is not generalized beyond this local teaching framework.' },
  { ref: 'Q06', page: 1, key: 'B', stem: '6- A drug that acts by competing with PABA and blocks folic acid synthesis\nis:', options: ['Tetracycline', 'Sulphonamide', 'Quinolone', 'Amphotericin B'], reason: 'sulphonamides are structural analogues that compete with PABA and inhibit bacterial folate synthesis', teachingPage: 18, teaching: 'Sulphonamides are structural analogues to PABA and compete for the active center of the enzyme, inhibiting folic acid synthesis.', limitation: 'The mechanism is restricted to the source’s competitive folate-pathway teaching.' },
  { ref: 'Q07', page: 2, key: 'C', stem: '7- A patient with a mild bacterial infection is prescribed a bacteriostatic agent. What is eppected to\ncontribute to the clearance of the infection?', options: ['Complete bacterial lysis by the drug', 'Suppression of the immune response', 'Host immune mechanisms like phagocytosis', 'Continuous drug use indefinitely'], reason: 'bacteriostatic drugs arrest multiplication and leave killing and clearance to host defences such as phagocytosis', teachingPage: 5, teaching: 'The host defence mechanisms, such as phagocytosis, are required to kill bacteria during bacteriostatic therapy.', limitation: 'The literal typo `eppected` is preserved, and the host-clearance statement is limited to the source scenario.' },
  { ref: 'Q08', page: 2, key: 'B', stem: '8- A drug that targets Gram-positive cocci, such as Staphylococcus and Enterococcus, would most likely be:', options: ['Tetracycline', 'Vancomycin', 'Chloramphenicol', 'Ampicillin'], reason: 'the lecture identifies vancomycin as primarily used against selected Gram-positive cocci including staphylococci and enterococci', teachingPage: 8, teaching: 'Vancomycin is primarily used against certain Gram positive cocci i.e. staphylococci and enterococci.', limitation: 'The answer is the source’s spectrum comparison and is not an unrestricted treatment recommendation for every isolate.' },
  { ref: 'Q09', page: 2, key: 'C', stem: '9- Bacteriostatic drugs act by:', options: ['Killing bacteria directly', 'Preventing host immunity from functioning', 'Inhibiting bacterial growth without killing them', 'Disrupting viral replication'], reason: 'bacteriostatic action inhibits bacterial multiplication without directly killing the organisms', teachingPage: 5, teaching: 'Bacteriostatic drugs inhibit bacterial multiplication, but do not kill them.', limitation: 'The definition is paired with, but not collapsed into, the distinct host-clearance occurrence at Q07.' },
  { ref: 'Q10', page: 2, key: 'B', stem: '10- A leucopenic patient develops a severe infection. What type of drug is best?', options: ['Bacteriostatic', 'Bactericidal', 'Antiviral', 'Antifungal'], reason: 'rapid irreversible bacterial killing is particularly important in severe infection when leucopenia impairs host clearance', teachingPage: 6, teaching: 'Bactericidal drugs are particularly useful in immediately life-threatening infections as in severe leucopenic patients.', limitation: 'The recommendation remains tied to the source’s severe bacterial-infection scenario.' },
  { ref: 'Q11', page: 2, key: 'B', stem: '11- A newborn epposed in utero to an antibiotic develops stained teeth and impaired bone growth. Which of\nthe following drugs is the most likely cause?', options: ['Gentamicin', 'Tetracycline', 'Chloramphenicol', 'Ciprofloxacin'], reason: 'the carrier specifically links tetracyclines to impaired bone and tooth development in the fetus and infant', teachingPage: 33, teaching: 'Tetracyclines inhibit growth and development of bones and teeth in the developing foetus and infants.', limitation: 'The literal typo `epposed` is preserved; the developmental-toxicity teaching remains Draft pending medical review.' },
  { ref: 'Q12', page: 2, key: 'A', stem: '12- Which of the following drugs is most topic to human cells due to a narrow margin of selective topicity?', options: ['Polymyxin', 'Penicillin', 'Tetracycline', 'Rifampicin'], reason: 'the lecture lists polymyxins among membrane-active drugs that are highly toxic because their selective-toxicity margin is narrow', teachingPage: 14, teaching: 'Polymyxins are highly toxic as they have a narrow margin of selective toxicity.', limitation: 'The literal `topic` and `topicity` typos and the comparative ranking are preserved as source wording and remain needs_evidence.' },
]

const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))
const byConcept = Object.fromEntries(concepts.map((c) => [c.id, c]))
for (const c of concepts) for (const ref of c.refs) byRef[ref].concept = c.id
for (const q of questions) {
  q.claim = `CLM-HU102-F20P1-${q.ref}-01`
  q.currCit = `CIT-HU102-F20P1-${q.ref}-CURR`
  q.bankCit = `CIT-HU102-F20P1-${q.ref}-BANK`
  q.span = `SPN-HU102-F20P1-${q.ref}-01`
  q.id = `Q-HU102-MIC-F20-${q.ref}`
  q.display = ({
    Q01: 'Current medical use applies the term antibiotic to any natural or synthetic antimicrobial agent.',
    Q02: 'Beta-lactamase destroys penicillin by enzymatic drug inactivation.',
    Q04: 'Long-term antibacterial therapy can permit oral Candida superinfection after suppression of normal flora.',
    Q05: 'The source attributes intrinsic enterococcal cephalosporin resistance to absence of the drug receptor.',
    Q06: 'Sulphonamides compete with PABA and inhibit bacterial folic-acid synthesis.',
    Q07: 'Host immune mechanisms such as phagocytosis contribute to clearance during bacteriostatic therapy.',
    Q08: 'Vancomycin targets selected Gram-positive cocci such as staphylococci and enterococci in the source comparison.',
    Q09: 'Bacteriostatic drugs inhibit bacterial growth without directly killing the bacteria.',
    Q10: 'Bactericidal therapy is preferred for severe infection in a leucopenic patient in the source scenario.',
    Q11: 'Fetal tetracycline exposure can stain teeth and impair bone growth.',
    Q12: 'Polymyxins have a narrow margin of selective toxicity in the source framework.',
  })[q.ref]
}

const sources = [
  { id: bank, title: 'Antimicrobial chemotherapy — auxiliary MCQ study bank', path: 'Year 1/BMS 102/Microbiology/Notes and Summaries/Antimicrobial chemotherapy.pdf', sha: 'e89478440e99a6b8a854a9ca7e38b792c5904634a7f6aa2d6f2ae44809340e0f', pages: 6, assessment: 'yes', qualification: 'Tier-6 Helwan-local auxiliary study bank. Pages 1–6 contain 35 complete four-option MCQs and page 6 prints a complete red answer table; Part1 releases Q01, Q02 and Q04–Q12 only. The table supplies study-bank answers, not an authenticated examination or official key.' },
  { id: carrier, title: 'Antimicrobial chemotherapy — HU-BMS-102 microbiology lecture', path: 'Year 1/BMS 102/Microbiology/Theoretical/Lec 3 - Antimicrobials/-Antimicrobial chemotherapy.pdf', sha: 'bd6d792541ed79e0e692652157092fec0c7ee969a0b225e10155b2364a0010a8', pages: 46, assessment: 'no', qualification: 'Tier-4 theoretical teaching carrier attributed to Dr Ehab M. Fahmy, Faculty of Medicine, Helwan University. It supplies the governed definitions and mechanisms but has no sitting, marks, candidate instructions or official answer-key authority.' },
]

const sourceRows = sources.map((s) => `# Item
## id
${s.id}
## title
${s.title}
## institution
Faculty of Medicine, Helwan University local corpus
## collection_id
hu-y1
## source_relative_path
${s.path}
## media_type
application/pdf
## languages
en
## page_count
${s.pages}
## sha256
${s.sha}
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
${s.qualification}
## is_assessment
${s.assessment}`).join('\n---\n\n')

const articleSpecs = [
  { id: A1, title: 'Antimicrobial definitions and resistance mechanisms', micro: 'Core definitions and resistance', refs: ['Q01','Q02','Q05','Q06'], sections: `### Definition
Current medical use applies the term antibiotic to any natural or synthetic antimicrobial agent. The carrier also preserves a narrower biological-origin definition, so the qualifier in the study-bank stem matters.

### Mechanism
Beta-lactamase destroys penicillin by enzymatic drug inactivation. The source attributes intrinsic enterococcal cephalosporin resistance to absence of the drug receptor. Sulphonamides compete with PABA and inhibit bacterial folic-acid synthesis.

### Key determinants
Drug destruction, absent-target intrinsic resistance and competitive metabolic inhibition are separate mechanisms. The stem wording decides which relation is being tested.

### Clinical significance
Accurate mechanism classification supports antimicrobial selection and interpretation of resistance. Source-specific formulations remain Draft until reviewed.

### Exam approach
Preserve the current-use qualifier, distinguish acquired enzyme action from intrinsic absent-target resistance, and match PABA competition to sulphonamide.

### Authority limitation
The answer letters are printed by a tier-6 study bank and are supported by a tier-4 Helwan lecture; neither source is an authenticated examination key.` },
  { id: A2, title: 'Bacteriostatic clearance, bactericidal selection and superinfection', micro: 'Antimicrobial action and clinical selection', refs: ['Q04','Q07','Q09','Q10'], sections: `### Definition
Bacteriostatic drugs inhibit bacterial growth without directly killing the bacteria. Host immune mechanisms such as phagocytosis contribute to clearance during bacteriostatic therapy.

### Mechanism
Long-term antibacterial therapy can permit oral Candida superinfection after suppression of normal flora. Bactericidal therapy is preferred for severe infection in a leucopenic patient in the source scenario.

### Key determinants
Growth arrest and host clearance form one bacteriostatic concept but are tested in two distinct source occurrences. Rapid irreversible killing is a separate bactericidal action.

### Clinical significance
Host-defence competence and infection severity influence the importance of bactericidal action. Disruption of normal flora can create superinfection.

### Exam approach
Use the clinical facts in each stem: mild infection plus phagocytosis indicates bacteriostatic clearance, severe leucopenia favours bactericidal therapy, and oral Candida after prolonged treatment indicates superinfection.

### Authority limitation
The source supplies printed study answers only and does not establish an official examination, sitting, mark or recurrence.` },
  { id: A3, title: 'Antimicrobial spectrum and host toxicity', micro: 'Spectrum and toxicity', refs: ['Q08','Q11','Q12'], sections: `### Definition
Vancomycin targets selected Gram-positive cocci such as staphylococci and enterococci in the source comparison.

### Mechanism
Fetal tetracycline exposure can stain teeth and impair bone growth. Polymyxins have a narrow margin of selective toxicity in the source framework.

### Key determinants
Spectrum, developmental toxicity and selective-toxicity margin are different tested dimensions. A potent antimicrobial action does not by itself establish a wide safety margin.

### Clinical significance
Drug spectrum and host toxicity both shape antimicrobial selection. Developmental exposure and narrow selective toxicity require particular caution.

### Exam approach
Preserve the literal \`epposed\`, \`topic\` and \`topicity\` typos while interpreting the governed medical relation. Keep the polymyxin ranking within the printed option set.

### Authority limitation
The comparative spectrum and toxicity statements remain Draft and needs_evidence; the study-bank table is not an official key.` },
]

const articleRow = (a) => {
  const qs = a.refs.map((r) => byRef[r])
  const cs = [...new Set(qs.map((q) => q.concept))].map((id) => byConcept[id])
  return `# Item
## id
${a.id}
## title
${a.title}
## arabic_title

## aliases
Family-20 ${a.micro}
HU-BMS-102 antimicrobial chemotherapy
## subject
inf
## topic
Microbiology
## subtopic
Antimicrobial chemotherapy
## microtopic
${a.micro}
## nanotopic
Family-20 Part1
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-PHA
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
6
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Microbiology faculty
## final_publisher
Admin team
## summary
Question-led teaching for ${a.micro.toLowerCase()}, preserving the source’s exact keyed occurrences and authority limits.
## sections
${a.sections}
## published_summary

## published_sections

## hold_these
${qs.map((q) => q.display).join('\n')}
## lose_the_mark
Treating the tier-6 study-bank answer table as an official examination key.
Ignoring the source qualifiers or silently correcting its literal wording.
## related_concepts
${cs.map((c) => c.id).join('\n')}
## related_articles
${[A1,A2,A3].filter((id) => id !== a.id).join('\n')}
## question_ids
${qs.map((q) => q.id).join('\n')}
## resource_ids
${bank}
${carrier}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${a.micro} > Family-20 Part1
## university_notes
hu: Tier-6 Helwan-local study-bank occurrences supported by the tier-4 Helwan lecture; no examination, sitting, marks or official-key status is inferred.
## annotations
${cs.map((c) => `### definition_of · ${c.id}\nQuote: ${c.annotation ?? byRef[c.refs[0]].display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${qs.map((q) => `### ${q.display}\nClaims: ${q.claim}\nCitations: ${q.currCit}, ${q.bankCit}\nSpan: ${q.span}`).join('\n\n')}
## article_source_ids
${bank}
${carrier}
## claim_ids
${qs.map((q) => q.claim).join('\n')}
## span_ids
${qs.map((q) => q.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Exact tier-6 study-bank occurrence and printed answer letter paired with direct tier-4 local Helwan teaching. No official examination-key authority is claimed.
## evidence_gaps
Independent medical verification and named Helwan faculty review remain required. Q03 is held for an unresolved cross-university dependency; Q13–Q35 remain routine backlog.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Family-20 Part1 releases Q01, Q02 and Q04–Q12 only. Q03 remains a valid keyed dependency hold; Q13–Q35 remain unprocessed routine backlog.
## field_notes
arabicTitle: Blank pending terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached.
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.`
}

const findBlock = (file, id) => {
  const text = readFileSync(join(repo, file), 'utf8')
  const block = text.split(/^---$/m).map((x) => x.trim()).find((x) => new RegExp(`^## id\\s*\\n${id}$`, 'm').test(x))
  if (!block) throw new Error(`Cannot find ${id} in ${file}`)
  return block
}
const field = (block, name) => block.match(new RegExp(`^## ${name}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim() ?? ''
const setField = (block, name, value) => {
  const re = new RegExp(`(^## ${name}\\s*\\n)[\\s\\S]*?(?=\\n## |$)`, 'm')
  if (!re.test(block)) throw new Error(`Missing field ${name}`)
  return block.replace(re, `$1${value}`)
}
const unionLines = (...values) => [...new Set(values.flatMap((v) => v.split('\n')).map((x) => x.trim()).filter((x) => x && x !== '[clear]'))].join('\n')

const newConceptRow = (c) => {
  const qs = c.refs.map((r) => byRef[r])
  return `# Item
## label
${c.label}
## id
${c.id}
## canonical_key
${c.key}
## aliases
${c.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${c.definition}
## explicit_objective
${c.objective}
## pitfalls
${c.pitfalls}
## concept_type
${c.type}
## status
Draft
## support_mode
direct_statement
## subject
inf
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-PHA
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${c.micro} > ${c.nano}
## article_ids
${c.article}
## related_article_ids
${[A1,A2,A3].filter((id) => id !== c.article).join('\n')}
## related_concept_ids
[clear]
## resource_ids
${bank}
${carrier}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.62
## exam_weight_by_year
HU_Y1=0.62
## clinical_relevance
0.66
## academic_relevance
0.94
## weight_confidence
0.48
## confidence
0.86
## exam_signal
${bank} | tier-6 auxiliary study bank | Family-20 ${c.refs.join('/')}, printed study answer only; ${carrier} | tier-4 local teaching carrier | direct teaching, no official-key authority
## atomic_claim_ids
${qs.map((q) => q.claim).join('\n')}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${qs.map((q) => `[Family-20 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}
## merge_ids
[clear]
## rejected_merge_candidate_ids
${c.id === 'CON-INF-804364C9A03875' ? 'CON-INF-ABF1EA01540430' : '[clear]'}
## conflicts
[clear]
## uncertainty
${c.limitation}
## evidence_gaps
No official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan faculty review remain required.
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Microbiology faculty
## final_publisher
Admin team
## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
drafted_not_reviewed
## exclusion_reason

## field_notes
arabicLabel: Blank pending terminology review.
arabicAliases: No reviewed Arabic alias is available.
microtopicId: No reviewed microtopic ID exists beneath the canonical placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from the exact Family-20 occurrence and carrier teaching.
sourceCandidateIds: Family 20 completed the governed four-query search-before-mint gate.
mergeIds: No merge occurred.
rejectedMergeCandidateIds: ${c.id === 'CON-INF-804364C9A03875' ? 'The biological-origin definition is narrower and retained as a contrast rather than merged.' : 'No same-scope rival survived triage.'}
lastReviewed: New Draft; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: New Family-20 question-led concept after governed no-same-scope adjudication.`
}

const reuseConceptRow = (c) => {
  let block = findBlock(c.reuse, c.id)
  const qs = c.refs.map((r) => byRef[r])
  block = setField(block, 'status', 'Draft')
  block = setField(block, 'article_ids', unionLines(field(block, 'article_ids'), c.article))
  block = setField(block, 'resource_ids', unionLines(field(block, 'resource_ids'), oldBank, carrier, bank))
  block = setField(block, 'atomic_claim_ids', unionLines(field(block, 'atomic_claim_ids'), qs.map((q) => q.claim).join('\n')))
  block = setField(block, 'exam_signal', `${field(block, 'exam_signal')}\n${bank} | tier-6 auxiliary study bank | Family-20 ${c.refs.join('/')}; printed study answer only, no official-key authority`)
  block = setField(block, 'original_wording', `${field(block, 'original_wording')}\n${qs.map((q) => `[Family-20 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}`)
  block = setField(block, 'field_notes', `${field(block, 'field_notes')}\nfamily20Reuse: Exact-ID reuse preserves the earlier semantic record and appends only the Family-20 article, source occurrence and claim links. ${c.limitation}`)
  return block
}

const conceptRows = concepts.map((c) => c.reuse ? reuseConceptRow(c) : newConceptRow(c)).join('\n---\n\n')

const correctExplanation = (q) => `The option “${q.options['ABCD'.indexOf(q.key)]}” is the printed study-bank answer because ${q.reason}. The tier-4 Helwan lecture supplies the teaching context, while the red answer table supplies only study-bank answer authority. ${q.limitation}`
const wrongExplanation = (q, i) => `The option “${q.options[i]}” is not the best source-framed answer because it does not match the governed relation tested by this stem. The printed study-bank answer is “${q.options['ABCD'.indexOf(q.key)]}”, supported by the local lecture teaching. This Draft item does not claim official examination-key authority.`
const questionRow = (q) => {
  const c = byConcept[q.concept]
  return `# Item
## id
${q.id}
## title
${q.stem}
## subject
inf
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${q.stem}
## format
single best answer
## derived_from

## correct_answer
${q.key}
${q.options.map((o, i) => `## answer_${'abcd'[i]}\n${o}\n## explanation_${'abcd'[i]}\n${'ABCD'[i] === q.key ? correctExplanation(q) : wrongExplanation(q, i)}`).join('\n')}
## topic
Antimicrobial chemotherapy
## subtopic
${c.micro ?? 'Governed Family-11 concept reuse'}
## difficulty
Moderate
## question_type
Microbiology
## main_concept
${q.concept}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > Family-20 Part1 > ${q.ref}
## clinical_relevance
0.66
## academic_relevance
0.94
## cognitive_effort_score
0.46
## exam_weight_by_year
HU_Y1=0.62
## question_only_for
HU_Y1
## concept_ids
${q.concept}
## years
HU_Y1
## universities
hu
## cognitive_effort
Low
## setting
Academic
## reasoning_level
1
## inferred_difficulty
46
## exam_relevance
6
## contextual_concept_ids

## library_ids
${c.article}
## resource_ids
${bank}
${carrier}
## learning_objective
${c.objective ?? `Apply the established ${field(findBlock(c.reuse, c.id), 'label').toLowerCase()} concept to this exact source occurrence.`}
## media_recommendations

## source_citation
${bank}, p${q.page}, Family-20 ${q.ref}: literal stem, options and order; p6 red table prints answer ${q.key}. ${carrier}, p${q.teachingPage}: ${q.teaching} The answer is a tier-6 study-bank answer, not an official examination key.
## attachments

## attached_image

## author_notes
Literal source wording, capitalization, option order and typos are preserved. ${q.limitation} Family-20 Q03 is held for its ASU dependency; Q13–Q35 remain routine backlog.
## estimated_seconds
60
## randomise_answers
yes`
}

const claimRow = (q) => `# Item
## id
${q.claim}
## concept_id
${q.concept}
## subject
inf
## predicate
supports
## object
the exact Family-20 ${q.ref} tested relation
## display_text
${q.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.86
## freshness
stable_local_teaching_fact
## time_sensitive
no
## qualifiers
authority: tier-6 auxiliary study-bank answer plus tier-4 local Helwan teaching, with no official examination-key authority. limitation: ${q.limitation}`

const carrierCitation = (q) => `# Item
## id
${q.currCit}
## claim_id
${q.claim}
## resource_id
${carrier}
## evidence_role
local_curriculum
## support_span
${q.teaching}
## locator_type
page
## locator_page
${q.teachingPage}
## locator_section
Antimicrobial chemotherapy teaching for Family-20 ${q.ref}
## locator_detail
Direct local teaching used to explain the source occurrence
## context_note
Tier-4 Helwan teaching carrier; it supplies curriculum context but no official examination answer. ${q.limitation}
## confidence
0.90
## counts_as_claim_evidence
no`

const bankCitation = (q) => `# Item
## id
${q.bankCit}
## claim_id
${q.claim}
## resource_id
${bank}
## evidence_role
auxiliary_assessment
## support_span
${q.stem} Printed study-bank answer: ${q.key}.
## locator_type
page
## locator_page
${q.page}
## locator_section
Family-20 ${q.ref}; matched answer table on p6
## locator_detail
Exact stem and option order with printed red answer-table letter
## context_note
Tier-6 Helwan-local study bank; the answer table is not an authenticated examination or official departmental key.
## confidence
0.92
## counts_as_claim_evidence
no`

const spanRow = (q) => `# Item
## id
${q.span}
## article_id
${byConcept[q.concept].article}
## section_id
${byConcept[q.concept].article.toLowerCase()}-${q.ref.toLowerCase()}
## text
${q.display}
## claim_ids
${q.claim}
## citation_ids
${q.currCit}
${q.bankCit}`

const relationSpecs = [
  ['CON-INF-804364C9A03875', 'contrasts_with', 'CON-INF-ABF1EA01540430', ['Q01'], 'current-use natural-or-synthetic wording contrasts with the narrower biological-origin definition'],
  ['CON-INF-64A7823DCEC6E5', 'contrasts_with', 'CON-INF-179939E4F5811A', ['Q02','Q05'], 'acquired enzymatic drug destruction contrasts with intrinsic resistance attributed to an absent receptor'],
  ['CON-INF-29BCDD4434DE0E', 'related_concepts', 'CON-INF-BECFE64492EFE7', ['Q11','Q12'], 'both concepts test host toxicity while retaining distinct developmental and selective-margin mechanisms'],
]
const relationRows = relationSpecs.map(([source, type, target, refs, scope]) => `# Item
## source
${source}
## type
${type}
## target
${target}
## evidence_claim_ids
${refs.map((r) => byRef[r].claim).join('\n')}
## citation_ids
${refs.map((r) => byRef[r].currCit).join('\n')}
## verification_status
needs_evidence
## confidence
0.82
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Microbiology faculty`).join('\n---\n\n')

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family20-part1-sources.md', sourceRows],
  ['article/HU-BMS-102-microbiology-family20-part1-articles.md', articleSpecs.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-microbiology-family20-part1-concepts.md', conceptRows],
  ['evidence/HU-BMS-102-microbiology-family20-part1-claims.md', questions.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family20-part1-citations.md', [...questions.map(carrierCitation), ...questions.map(bankCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family20-part1-spans.md', questions.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-microbiology-family20-part1-relations.md', relationRows],
  ['question/HU-BMS-102-microbiology-family20-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '20-part1', refs: questions.map((q) => q.ref), answers: questions.map((q) => `${q.ref}:${q.key}`), released: { sources: 2, articles: 3, concepts: 10, newConcepts: 4, reusedConcepts: 6, questions: 11, claims: 11, citations: 22, spans: 11, relations: 3 }, holds: { crossUniversityDependency: ['Q03'], routineBacklog: ['Q13-Q35'] } }, null, 2))
