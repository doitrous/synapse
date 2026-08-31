import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_4abfcc7807e4409a34dd'
const teaching = 'src_bd6d792541ed79e0e692'

const A1 = 'ART-HU-BMS102-MIC-F11P2-RESISTANCE-MECHANISMS'
const A2 = 'ART-HU-BMS102-MIC-F11P2-RESISTANCE-ORIGINS-GENETICS'
const A3 = 'ART-HU-BMS102-MIC-F11P2-ANTIMICROBIAL-COMPLICATIONS'
const A4 = 'ART-HU-BMS102-MIC-F11P2-COMBINATIONS-STEWARDSHIP'
const allArticles = [A1, A2, A3, A4]

const concepts = [
  { ref: 'Q17', id: 'CON-INF-64A7823DCEC6E5', reuse: true, key: 'antibiotic-resistance.mechanism.beta-lactamase-inactivation', subjectCode: 'inf', article: A1, page: 21, micro: 'Resistance mechanisms', nano: 'Enzymatic drug inactivation', type: 'mechanism', label: 'Beta-lactamase destroys penicillin by enzymatically inactivating the drug', aliases: ['Beta-lactamase drug inactivation', 'Penicillin-destroying enzyme'], definition: 'Bacterial beta-lactamases enzymatically hydrolyse and inactivate susceptible beta-lactam antibiotics before the drugs can act on their cell-wall target. This mechanism changes the drug itself and differs from target modification, reduced permeability and active efflux.', objective: 'Identify beta-lactamase production as enzymatic drug inactivation and distinguish it from other resistance mechanisms.', pitfalls: 'Calling altered PBPs, porin loss or efflux examples of enzymatic destruction merely because each produces resistance.', subject: 'Beta-lactamase', predicate: 'inactivates', object: 'penicillin by enzymatic drug destruction', display: 'Beta-lactamase inactivates penicillin by enzymatic drug destruction.', quote: 'Bacteria produce enzymes that inactivate the drug e.g. production of penicillin-destroying enzymes (β-lactamases).' },
  { ref: 'Q18', id: 'CON-INF-570A1012DB9324', reuse: false, key: 'altered-pbp-resistance', subjectCode: 'inf', article: A1, page: 22, micro: 'Resistance mechanisms', nano: 'Modified drug targets', type: 'mechanism', label: 'Alteration of penicillin-binding proteins creates modified-target beta-lactam resistance', aliases: ['Altered PBP resistance', 'Modified beta-lactam target'], definition: 'A bacterium may resist an antimicrobial by changing the molecule the drug normally binds. Alteration of penicillin-binding proteins lowers effective beta-lactam binding and exemplifies target modification rather than enzymatic drug destruction, bypass metabolism or efflux.', objective: 'Recognize altered PBPs as a modified-target resistance mechanism.', pitfalls: 'Confusing production of beta-lactamase with alteration of the PBP target, or selecting a bypass or efflux mechanism when the stem asks for a modified target.', subject: 'Altered penicillin-binding proteins', predicate: 'cause', object: 'modified-target resistance to penicillin', display: 'Altered penicillin-binding proteins cause modified-target resistance to penicillin.', quote: 'Alteration of the penicillin-binding proteins is a mode of resistance to penicillin.' },
  { ref: 'Q19', id: 'CON-INF-39978E6864743D', reuse: true, key: 'antibiotic-resistance.mechanism.alternative-metabolic-pathway', subjectCode: 'inf', article: A1, page: 24, micro: 'Resistance mechanisms', nano: 'Folate bypass', type: 'mechanism', label: 'Sulphonamide-resistant bacteria can bypass PABA by using preformed folic acid', aliases: ['Sulphonamide folate bypass', 'Alternative metabolic pathway resistance'], definition: 'Some sulphonamide-resistant bacteria acquire the ability to use preformed folic acid and therefore no longer depend on the PABA-requiring synthesis step blocked by the drug. This is metabolic bypass, not drug degradation, efflux or DNA-gyrase alteration.', objective: 'Identify use of preformed folate as the metabolic-bypass mechanism of sulphonamide resistance.', pitfalls: 'Selecting active export or drug-degrading enzymes simply because these are other legitimate resistance mechanisms.', subject: 'Sulphonamide-resistant bacteria', predicate: 'bypass inhibition by', object: 'using preformed folic acid without extracellular PABA', display: 'Sulphonamide-resistant bacteria can bypass inhibition by using preformed folic acid without extracellular PABA.', quote: 'Sulphonamide resistant bacteria acquire the ability to use preformed folic acid with no need for extracellular PABA.' },
  { ref: 'Q20', id: 'CON-INF-DFC3D949513ED2', reuse: true, key: 'antibiotic-resistance.mechanism.altered-permeability', subjectCode: 'inf', article: A1, page: 25, micro: 'Resistance mechanisms', nano: 'Reduced permeability', type: 'mechanism', label: 'Porin changes reduce antimicrobial permeability and intracellular drug concentration', aliases: ['Porin-mediated reduced permeability', 'Reduced antimicrobial entry'], definition: 'Changes in bacterial outer-membrane porins can reduce drug entry so that an effective intracellular concentration is not achieved. This altered-permeability mechanism reduces influx and is distinct from enzymatic drug inactivation or active efflux after entry.', objective: 'Explain how altered porins cause resistance by lowering antimicrobial permeability and intracellular concentration.', pitfalls: 'Treating reduced entry through porins as proton-coupled efflux or as alteration of a ribosomal target.', subject: 'Porin changes', predicate: 'cause resistance by', object: 'reducing antimicrobial permeability below an effective intracellular concentration', display: 'Porin changes cause resistance by reducing antimicrobial permeability below an effective intracellular concentration.', quote: 'Changes in porins (hollow membrane proteins) can reduce the amount of penicillin entering bacteria.' },
  { ref: 'Q21', id: 'CON-INF-0096D0AC9CB83E', reuse: false, key: 'efflux-pump-resistance-mechanism', subjectCode: 'inf', article: A1, page: 26, micro: 'Resistance mechanisms', nano: 'MDR efflux', type: 'mechanism', label: 'Multidrug-resistance pumps actively export antibiotics and lower intracellular concentration', aliases: ['MDR efflux pump', 'Active antimicrobial export'], definition: 'A multidrug-resistance efflux pump exchanges protons while exporting structurally varied foreign molecules, including some quinolones and macrolides. Active export prevents the antibiotic from reaching an effective intracellular concentration.', objective: 'Identify active drug export and reduced intracellular concentration as the MDR-pump resistance mechanism.', pitfalls: 'Calling efflux enzymatic inactivation, target alteration or metabolic bypass when the drug is transported intact out of the cell.', subject: 'A multidrug-resistance pump', predicate: 'causes resistance by', object: 'actively exporting antibiotics and decreasing intracellular concentration', display: 'A multidrug-resistance pump causes resistance by actively exporting antibiotics and decreasing intracellular concentration.', quote: 'Bacteria actively pump the drug out across the cytoplasmic membrane using efflux pump or "multidrug resistance pump" (MDR).' },
  { ref: 'Q22', id: 'CON-INF-DCD82D2A1D396C', reuse: true, key: 'antibiotic-resistance.acquired-vs-intrinsic-genetic', subjectCode: 'inf', article: A2, page: 29, micro: 'Resistance origins and genetics', nano: 'Intrinsic Mycoplasma resistance', type: 'mechanism', label: 'Mycoplasma is intrinsically resistant to penicillin because it lacks a cell wall', aliases: ['Mycoplasma natural penicillin resistance', 'Absent-target intrinsic resistance'], definition: 'Mycoplasma has intrinsic natural resistance to penicillin because it lacks the bacterial cell wall that beta-lactams target. Failure therefore reflects absence of the target structure, not acquired beta-lactamase, host immunity or sequestration in an abscess.', objective: 'Explain Mycoplasma penicillin failure as intrinsic resistance due to absence of a cell wall.', pitfalls: 'Inferring an acquired resistance enzyme when the organism naturally lacks the drug target.', subject: 'Mycoplasma', predicate: 'is intrinsically resistant to penicillin because it', object: 'lacks a cell wall', display: 'Mycoplasma is intrinsically resistant to penicillin because it lacks a cell wall.', quote: 'Mycoplasma are naturally resistant to penicillin because they lack a cell wall.' },
  { ref: 'Q23', id: 'CON-INF-134BE2C9B827D5', reuse: true, key: 'antibiotic-resistance.mobile-genetic-elements.r-plasmid', subjectCode: 'inf', article: A2, page: 30, micro: 'Resistance origins and genetics', nano: 'R factors', type: 'definition', label: 'Resistance factors are plasmids carrying resistance to one or more antimicrobial agents', aliases: ['R factor', 'Resistance plasmid'], definition: 'A resistance factor, or R plasmid, is a plasmid carrying genes that mediate resistance to one or more antimicrobial agents. It differs from a transposon, an integron and a prophage even though these genetic elements can interact in resistance dissemination.', objective: 'Identify a plasmid carrying multiple antimicrobial-resistance genes as a resistance factor.', pitfalls: 'Choosing transposon or integron merely because each can contain resistance genes when the stem explicitly asks for the plasmid class.', subject: 'A resistance factor', predicate: 'is', object: 'a plasmid carrying resistance to one or more antimicrobial agents', display: 'A resistance factor is a plasmid carrying resistance to one or more antimicrobial agents.', quote: 'Resistance (R) factors are a class of plasmids that mediate resistance to one or more antimicrobial agent.' },
  { ref: 'Q24', id: 'CON-INF-D6A264E108B348', reuse: true, key: 'bacteria.genetics.transposons', subjectCode: 'inf', article: A2, page: 30, micro: 'Resistance origins and genetics', nano: 'Transposition', type: 'definition', label: 'Movement of a transposon between plasmids and chromosomes is transposition', aliases: ['Transposition', 'Transposon gene movement'], definition: 'Transposons are mobile DNA elements that can move resistance genes between plasmids and chromosomes. The movement process is called transposition and differs from cell-to-cell conjugation, uptake of naked DNA by transformation and spontaneous mutation.', objective: 'Name movement of a transposon between plasmid and chromosome as transposition.', pitfalls: 'Naming a DNA-transfer route instead of the movement of the transposable element itself.', subject: 'Transposon movement', predicate: 'is called', object: 'transposition', display: 'Transposon movement between plasmids and chromosomes is called transposition.', quote: 'As they move between plasmids and chromosomes they can transfer this property to bacteria. The process is called transposition.' },
  { ref: 'Q25', id: 'CON-INF-D69C8C4C6B0D6D', reuse: false, key: 'chromosomal-resistance-spontaneous-mutation', subjectCode: 'inf', article: A2, page: 30, micro: 'Resistance origins and genetics', nano: 'Chromosomal mutation', type: 'mechanism', label: 'Chromosomal drug resistance develops through spontaneous mutation of a susceptibility gene', aliases: ['Chromosomal resistance mutation', 'Spontaneous susceptibility-gene mutation'], definition: 'Chromosomal antimicrobial resistance typically arises when a spontaneous mutation changes a gene controlling susceptibility to the drug. This origin differs from acquiring a plasmid, importing a transposon or merely being exposed to a sub-inhibitory concentration.', objective: 'Identify spontaneous mutation in a susceptibility gene as the usual origin of chromosomal drug resistance.', pitfalls: 'Treating selection by drug exposure as the mutation-generating mechanism, or choosing mobile-element acquisition when the stem specifies chromosomal origin.', subject: 'Chromosomal drug resistance', predicate: 'develops through', object: 'spontaneous mutation in a gene controlling antimicrobial susceptibility', display: 'Chromosomal drug resistance develops through spontaneous mutation in a gene controlling antimicrobial susceptibility.', quote: 'Chromosomal drug resistance develops as a result of spontaneous mutation in a gene that controls susceptibility to an antimicrobial agent.' },
  { ref: 'Q26', id: 'CON-INF-86D082D1785D7A', reuse: true, key: 'teaching.microv1.chemotherapy.superinfection', subjectCode: 'inf', article: A3, page: 34, micro: 'Complications of therapy', nano: 'Candida superinfection', type: 'clinical_application', label: 'Antibiotic suppression of normal flora can permit Candida oral superinfection', aliases: ['Antibiotic-associated oral thrush', 'Candida superinfection'], definition: 'Prolonged antimicrobial therapy can suppress susceptible normal flora and allow resistant organisms to overgrow. Candida overgrowth in the mouth with oral thrush is the source example of superinfection, not direct drug toxicity, hypersensitivity or resistance developing in the patient.', objective: 'Recognize oral Candida overgrowth after prolonged antibiotics as superinfection caused by suppression of normal flora.', pitfalls: 'Calling thrush drug toxicity or hypersensitivity without identifying replacement of suppressed normal flora.', subject: 'Antibiotic suppression of normal flora', predicate: 'can cause', object: 'Candida oral superinfection', display: 'Antibiotic suppression of normal flora can cause Candida oral superinfection.', quote: 'Another type of superinfection is due to suppression of normal flora by the antibiotic used and their replacement with drug resistant organisms which cause disease, e.g. overgrowth of Candida in the mouth causing oral thrush.' },
  { ref: 'Q27', id: 'CON-INF-303D18B5BF2499', reuse: false, key: 'streptomycin-ototoxicity', subjectCode: 'pharm', article: A3, page: 33, micro: 'Complications of therapy', nano: 'Streptomycin ototoxicity', type: 'adverse_effect', label: 'Streptomycin can injure the eighth cranial nerve and cause deafness', aliases: ['Streptomycin ototoxicity', 'Aminoglycoside deafness'], definition: 'Streptomycin is classically associated with ototoxic injury involving the eighth cranial nerve and may cause deafness. This adverse-effect association differs from chloramphenicol marrow depression and tetracycline effects on developing bones and teeth.', objective: 'Associate the classic toxic adverse effect of deafness with streptomycin.', pitfalls: 'Choosing another familiar antibiotic adverse effect without matching the specific organ toxicity in the stem.', subject: 'Streptomycin', predicate: 'can cause', object: 'eighth-cranial-nerve injury and deafness', display: 'Streptomycin can cause eighth-cranial-nerve injury and deafness.', quote: 'Streptomycin affects the 8th cranial nerve leading to deafness.' },
  { ref: 'Q29', id: 'CON-FND-CE72B2E63A736B', reuse: true, key: 'teaching.pharma.interactions.combination-effects', subjectCode: 'pharm', article: A4, page: 41, micro: 'Drug combinations and stewardship', nano: 'Synergism', type: 'classification', label: 'Synergism means a combined drug effect significantly greater than the sum of separate effects', aliases: ['Antimicrobial synergism', 'Greater-than-additive combination'], definition: 'Synergism occurs when two drugs together produce an effect significantly greater than the sum of their separate effects. Addition equals the sum, indifference is no greater than the most effective drug alone, and antagonism reduces the effect.', objective: 'Distinguish synergism from addition, indifference and antagonism using the magnitude of the combined effect.', pitfalls: 'Calling an effect equal to the sum synergism, or treating all beneficial combinations as greater-than-additive.', subject: 'Synergism', predicate: 'is', object: 'a combined drug effect significantly greater than the sum of separate effects', display: 'Synergism is a combined drug effect significantly greater than the sum of separate effects.', quote: 'Synergism, i.e., the combined action is significantly greater than the sum of the two drugs acting separately.' },
  { ref: 'Q30', id: 'CON-INF-CFAD0540F6E8F9', reuse: false, key: 'antibiotic-stewardship-diagnosis-principle', subjectCode: 'pharm', article: A4, page: 39, micro: 'Drug combinations and stewardship', nano: 'Diagnosis before treatment', type: 'clinical_principle', label: 'Antibiotic treatment should be based on a clear clinical and bacteriological diagnosis whenever possible', aliases: ['Diagnosis-led antibiotic use', 'Antimicrobial stewardship diagnosis principle'], definition: 'A key principle of clinical antibiotic use is to base treatment on a clear clinical and bacteriological diagnosis whenever possible and collect suitable specimens before therapy. Empirical treatment may begin after sampling and should later be adjusted to susceptibility results.', objective: 'Identify diagnosis-led, specimen-informed treatment as a stewardship principle that discourages resistance.', pitfalls: 'Using antibiotics for every fever, assuming combinations are always superior or extending prophylaxis routinely to every procedure.', subject: 'Antibiotic treatment', predicate: 'should be based on', object: 'a clear clinical and bacteriological diagnosis whenever possible', display: 'Antibiotic treatment should be based on a clear clinical and bacteriological diagnosis whenever possible.', quote: 'Treatment should be based on a clear clinical and bacteriological diagnosis. Suitable specimens should be sent to the laboratory before treatment is begun.' },
]

for (const c of concepts) {
  c.claim = `CLM-HU102-F11P2-${c.ref}-01`
  c.currCit = `CIT-HU102-F11P2-${c.ref}-CURR`
  c.asmCit = `CIT-HU102-F11P2-${c.ref}-ASM`
  c.span = `SPN-HU102-F11P2-${c.ref}-01`
}
const byRef = Object.fromEntries(concepts.map((c) => [c.ref, c]))

const questions = [
  { ref: 'Q17', page: 5, key: 'B', stem: "A bacteria's production of an enzyme that modifies and inactivates a\ndrug is a common resistance mechanism. An example is:", options: ['Alteration of the 30S ribosomal protein', 'Production of beta-lactamases that destroy penicillin', 'Activation of efflux pumps', 'Decreased permeability through porin channels'], reasons: ['this modifies the target', 'beta-lactamase enzymatically destroys the drug', 'efflux exports intact drug', 'porin change reduces entry'] },
  { ref: 'Q18', page: 5, key: 'C', stem: 'A bacterium can become resistant to an antimicrobial agent by\nsynthesizing a modified target. Which of the following exemplifies this?', options: ['Production of beta-lactamase', 'Acquisition of genes to use preformed folic acid', 'Alteration of penicillin-binding proteins (PBPs)', 'Activation of a multidrug resistance pump'], reasons: ['this inactivates the drug', 'this creates metabolic bypass', 'altered PBPs are modified beta-lactam targets', 'this actively exports drug'] },
  { ref: 'Q19', page: 5, key: 'A', stem: 'Some bacteria resist the effects of sulphonamides by:', options: ['Acquiring the ability to use preformed folic acid, bypassing the need for PABA', 'Actively pumping the drug out of the cell', 'Producing an enzyme that degrades the drug', 'Altering the structure of their DNA gyrase'], reasons: ['preformed folate bypasses the PABA-dependent step', 'efflux is a different mechanism', 'drug degradation is not the taught sulphonamide example', 'DNA-gyrase alteration concerns other drugs'] },
  { ref: 'Q20', page: 6, key: 'C', stem: 'Changes in porin proteins in the bacterial outer membrane can lead\nto resistance by:', options: ['Inactivating the drug through enzymatic modification', 'Pumping the drug out of the cell using proton exchange', "Decreasing the drug's permeability, preventing it from reaching an effective\nintracellular concentration", 'Altering the ribosomal target site so the drug cannot bind'], reasons: ['porins do not enzymatically modify drug', 'this describes active efflux', 'porin change reduces entry and intracellular concentration', 'this is target modification'] },
  { ref: 'Q21', page: 6, key: 'D', stem: 'Resistance mediated by a multidrug resistance (MDR) pump, which\nexports various antibiotics like quinolones, is an example of:', options: ['Bacteria producing inactivating enzymes', "Bacteria altering the drug's target site", 'Bacteria developing a new metabolic pathway', 'Bacteria actively decreasing intracellular drug concentration by pumping it\nout'], reasons: ['the pump does not destroy the drug', 'the target is unchanged', 'the pump is transport rather than bypass metabolism', 'active export lowers intracellular concentration'] },
  { ref: 'Q22', page: 6, key: 'B', stem: 'A patient with a chronic infection caused by Mycoplasma is treated\nwith penicillin, but the treatment fails. This is likely due to:', options: ['The bacteria producing a beta-lactamase', "The bacteria's intrinsic natural resistance, as Mycoplasma lack a cell wall", "The patient's poor immune response to the infection", 'The bacteria being walled off in an abscess cavity'], reasons: ['the defining problem is absent target, not acquired enzyme', 'Mycoplasma naturally lacks the penicillin target', 'host immunity does not explain organism-specific natural resistance', 'the stem supplies no abscess'] },
  { ref: 'Q23', page: 7, key: 'C', stem: 'A plasmid that carries genes for resistance to multiple antimicrobial\nagents is known as a(n):', options: ['Transposon', 'Integron', 'Resistance (R) factor', 'Prophage'], reasons: ['a transposon is a mobile DNA segment, not the named plasmid class', 'an integron captures gene cassettes', 'an R factor is the resistance plasmid described', 'a prophage is integrated phage DNA'] },
  { ref: 'Q24', page: 7, key: 'C', stem: 'The transfer of resistance genes via transposons, which can move\nbetween plasmids and chromosomes, is a process called:', options: ['Conjugation', 'Transformation', 'Transposition', 'Mutation'], reasons: ['conjugation transfers DNA between cells', 'transformation takes up extracellular DNA', 'movement of transposons is transposition', 'mutation changes sequence rather than naming element movement'] },
  { ref: 'Q25', page: 7, key: 'B', stem: 'Chromosomal drug resistance in bacteria typically develops as a\nresult of:', options: ['Acquisition of plasmids from other bacteria', 'A spontaneous mutation in a gene controlling drug susceptibility', 'Integration of a transposon carrying resistance genes', 'Exposure to sub-inhibitory concentrations of the drug'], reasons: ['this is plasmid acquisition', 'this is the taught chromosomal origin', 'this is mobile-element integration', 'exposure selects variants but is not itself the stated genetic origin'] },
  { ref: 'Q26', page: 7, key: 'C', stem: 'A patient on long-term, high-dose antibiotic therapy develops oral\nthrush caused by Candida overgrowth. This is a classic example of which\ncomplication?', options: ['Drug toxicity', 'Hypersensitivity', 'Superinfection', 'Development of drug resistance'], reasons: ['toxicity is direct host injury', 'hypersensitivity is an immune reaction to drug', 'Candida replacement after flora suppression is superinfection', 'the clinical event is overgrowth rather than demonstrated resistance evolution'] },
  { ref: 'Q27', page: 8, key: 'C', stem: 'The toxic side effect of deafness is most classically associated with\nwhich antibiotic?', options: ['Tetracycline', 'Chloramphenicol', 'Streptomycin', 'Penicillin'], reasons: ['tetracycline is classically linked to developing bones and teeth', 'chloramphenicol can depress marrow', 'streptomycin is classically ototoxic', 'penicillin is not the source-keyed deafness association'] },
  { ref: 'Q29', page: 8, key: 'C', stem: 'When two drugs are combined, and the resulting effect is\nsignificantly greater than the sum of their individual effects, this\ninteraction is known as:', options: ['Indifference', 'Addition', 'Synergism', 'Antagonism'], reasons: ['indifference adds no benefit beyond the more effective drug', 'addition equals the sum', 'synergism is greater than the sum', 'antagonism reduces the action'] },
  { ref: 'Q30', page: 9, key: 'B', stem: 'Which of the following represents a key principle for the clinical use\nof antibiotics to discourage the emergence of resistance?', options: ['Antibiotics should be used for all febrile illnesses to prevent complications', 'Treatment should be based on a clear clinical and bacteriological diagnosis\nwhenever possible', 'Combination therapy is always superior to monotherapy', 'Prophylactic antibiotics should be used routinely for all surgical procedures'], reasons: ['routine treatment of fever promotes unnecessary exposure', 'diagnosis-led use is the stated principle', 'combination therapy is reserved for selected conditions', 'prophylaxis is restricted to special circumstances'] },
]
for (const q of questions) q.id = `Q-HU102-MIC-F11-${q.ref}`

const sourceRow = (x) => `# Item\n## id\n${x.id}\n## title\n${x.title}\n## institution\n${x.institution}\n## collection_id\nhu-y1\n## source_relative_path\n${x.path}\n## media_type\napplication/pdf\n## languages\nen\n## page_count\n${x.pages}\n## sha256\n${x.sha}\n## processing_status\npending\n## rights\nLocal university material held for internal authoring only; no page image is redistributed.\n## qualification\n${x.qualification}\n## is_assessment\n${x.assessment ? 'yes' : 'no'}`
const sources = [
  sourceRow({ id: assessment, title: 'Helwan S2 antimicrobial chemotherapy MCQ bank with printed answers', institution: 'Helwan University local corpus; every page watermarked Dr Mustafa Elsudani', path: 'Year 1/BMS 102/Microbiology/Questions/MCQs/MCQs - Helwan S2 Micro Antimicrobial Chemotherapy MCQ.pdf', pages: 9, sha: '4abfcc7807e4409a34dd0e6c9983937a17f07120b3852351a6d2d79ff5e9ee04', qualification: 'Tier-3 local Helwan-attributed keyed study bank. Page 9 visibly prints answers for 30 MCQs; Part 2 releases Q17–Q27 and Q29–Q30 only. It is not an authenticated sitting, official examination or official departmental answer key.', assessment: true }),
  sourceRow({ id: teaching, title: 'Antimicrobial chemotherapy — HU-BMS-102 microbiology lecture', institution: 'Faculty of Medicine, Helwan University; Dr Ehab M. Fahmy', path: 'Year 1/BMS 102/Microbiology/Theoretical/Lec 3 - Antimicrobials/-Antimicrobial chemotherapy.pdf', pages: 46, sha: 'bd6d792541ed79e0e692652157092fec0c7ee969a0b225e10155b2364a0010a8', qualification: 'Direct Helwan theoretical teaching carrier. Pages 21–41 supply the resistance, complication, interaction and stewardship teaching used in this slice; it is not an assessment instrument.', assessment: false }),
].join('\n---\n\n')

const qFor = (c) => questions.find((q) => q.ref === c.ref)
const conceptRow = (c) => `# Item
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
${c.subjectCode}
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-MIC
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
${allArticles.filter((id) => id !== c.article).join('\n')}
## related_concept_ids
${concepts.filter((o) => o.article === c.article && o.id !== c.id).map((o) => o.id).join('\n')}
## resource_ids
${teaching}
${assessment}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.84
## exam_weight_by_year
HU_Y1=0.84
## clinical_relevance
0.78
## academic_relevance
0.98
## weight_confidence
0.65
## confidence
0.92
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | Family-11 ${c.ref}
## atomic_claim_ids
${c.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${c.page}] ${c.quote}
[Assessment p${qFor(c).page} ${c.ref}] ${qFor(c).stem.replaceAll('\n', ' ')} Answer: ${qFor(c).options['ABCD'.indexOf(qFor(c).key)].replaceAll('\n', ' ')}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication.
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
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: No distinct source-supported Arabic alias has been reviewed.
microtopicId: No reviewed microtopic ID exists beneath the canonical placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 11 completed the four-query search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New HU overlay; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: ${c.reuse ? 'Standalone-complete HU overlay preserving the exact governed concept ID and canonical scope.' : 'New Family-11 question-led concept after the governed no-same-scope decision.'}`

const explain = (q, i) => {
  const correct = 'ABCD'.indexOf(q.key)
  if (i === correct) return `${q.options[i].replaceAll('\n', ' ')} is correct because ${q.reasons[i]}. Direct Helwan teaching supports the distinction, while the printed ${q.key} remains auxiliary study-bank evidence rather than an official key.`
  return `${q.options[i].replaceAll('\n', ' ')} is not the best answer because ${q.reasons[i]}. The governed teaching instead supports ${q.options[correct].replaceAll('\n', ' ')}; the item remains Draft pending faculty review.`
}
const questionRow = (q) => { const c = byRef[q.ref]; return `# Item
## id
${q.id}
## title
${q.stem.replaceAll('\n', ' ')}
## subject
${c.subjectCode}
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
${q.options.map((o, i) => `## answer_${'abcd'[i]}\n${o}\n## explanation_${'abcd'[i]}\n${explain(q, i)}`).join('\n')}
## topic
Antimicrobial chemotherapy
## subtopic
${c.micro}
## difficulty
Moderate
## question_type
${c.subjectCode === 'inf' ? 'Microbiology' : 'Pharmacology'}
## main_concept
${c.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${c.micro} > ${c.nano}
## clinical_relevance
0.78
## academic_relevance
0.98
## cognitive_effort_score
0.52
## exam_weight_by_year
HU_Y1=0.84
## question_only_for
HU_Y1
## concept_ids
${c.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
Medium
## setting
Both
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
8
## contextual_concept_ids

## library_ids
${c.article}
## resource_ids
${assessment}
${teaching}
## learning_objective
${c.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${q.page}, Family-11 ${q.ref}: exact stem, option order and visibly printed answer ${q.options['ABCD'.indexOf(q.key)].replaceAll('\n', ' ')} preserved. Authority: tier-3 local Helwan-attributed keyed study bank, not an official exam or authenticated official key. Teaching: ${teaching}, PDF p${c.page}.
## attachments

## attached_image

## author_notes
Exact source grammar, wording, capitalization, punctuation and option order are preserved. No marks, recurrence, official sitting or official-key status is inferred. Q15 remains a valid printed-B dependency/scope hold and Q28 remains a time-sensitive guideline hold; neither has a student-facing record in Part 2.${c.reuse ? ' The main concept reuses the governed exact ID in a standalone-complete HU overlay.' : ''}
## estimated_seconds
65
## randomise_answers
yes` }

const specs = [
  { id: A1, subject: 'inf', title: 'Mechanisms of antimicrobial resistance', aliases: ['Drug inactivation target modification bypass permeability and efflux', 'Question-led antimicrobial resistance mechanisms'], refs: ['Q17','Q18','Q19','Q20','Q21'], summary: 'Bacteria resist antimicrobials by inactivating the drug, modifying its target, bypassing an inhibited metabolic step, reducing entry or actively exporting the drug. The five mechanisms are distinct even though each lowers antimicrobial effectiveness.', sections: '### Drug inactivation and target modification\nBeta-lactamase destroys a susceptible beta-lactam drug. Altered PBPs instead change the drug target so effective binding is lost.\n\n### Metabolic bypass\nSulphonamide-resistant bacteria may use preformed folate and avoid the PABA-dependent step that sulphonamides block.\n\n### Entry and exit\nPorin changes reduce antimicrobial influx across the outer membrane. MDR pumps actively export drug after it reaches the membrane or cytoplasm. Both lower intracellular concentration but act in opposite directions.', loses: ['Calling altered PBPs enzymatic drug destruction.', 'Calling use of preformed folate efflux.', 'Treating porin-mediated reduced influx as proton-coupled export.', 'Calling an MDR pump target modification.'] },
  { id: A2, subject: 'inf', title: 'Origins and genetic vehicles of antimicrobial resistance', aliases: ['Intrinsic and acquired antimicrobial resistance', 'R factors transposons and chromosomal mutation'], refs: ['Q22','Q23','Q24','Q25'], summary: 'Resistance may be intrinsic because the organism lacks a drug target, or acquired through mobile genetic elements and chromosomal mutation. Mycoplasma lacks a cell wall; R factors are resistance plasmids; transposons move by transposition; chromosomal resistance commonly arises through spontaneous mutation.', sections: '### Intrinsic absent-target resistance\nMycoplasma naturally lacks peptidoglycan and therefore has no target for penicillin. This is intrinsic resistance rather than acquisition of a beta-lactamase.\n\n### Mobile resistance genes\nR factors are plasmids mediating resistance to one or more agents. Transposons can carry resistance genes between plasmids and chromosomes, and their movement is transposition.\n\n### Chromosomal origin\nA spontaneous mutation in a gene controlling drug susceptibility can establish chromosomal resistance. Drug exposure may select the mutant, but it is not substituted for the genetic event in this question.', loses: ['Inferring beta-lactamase in naturally cell-wall-free Mycoplasma.', 'Calling a transposon an R plasmid.', 'Calling transposition conjugation or transformation.', 'Treating exposure alone as the stated chromosomal mutation.'] },
  { id: A3, subject: 'pharm', title: 'Superinfection and antimicrobial drug toxicity', aliases: ['Complications of antimicrobial chemotherapy', 'Candida superinfection and streptomycin deafness'], refs: ['Q26','Q27'], summary: 'Antimicrobial therapy can cause ecological and direct toxic complications. Suppression of normal oral flora may permit Candida superinfection, while streptomycin can injure the eighth cranial nerve and cause deafness.', sections: '### Superinfection\nProlonged or intensive therapy can remove susceptible normal flora and allow resistant organisms to overgrow. Oral Candida thrush is the source example.\n\n### Drug toxicity\nStreptomycin is classically associated with eighth-cranial-nerve injury and deafness. Other listed toxicities belong to different drugs, so the adverse effect must be matched to the named agent.\n\n### Distinguishing complications\nSuperinfection is replacement overgrowth after ecological disruption. Toxicity is direct drug injury, while hypersensitivity is an exaggerated immune response to the drug.', loses: ['Calling Candida replacement direct drug toxicity.', 'Calling oral thrush hypersensitivity.', 'Assigning streptomycin deafness to chloramphenicol.', 'Treating every complication as development of microbial resistance.'] },
  { id: A4, subject: 'pharm', title: 'Antimicrobial combinations and diagnosis-led stewardship', aliases: ['Synergism and responsible antibiotic use', 'Combination effects and stewardship principles'], refs: ['Q29','Q30'], summary: 'Synergism is a combined effect greater than the sum of the individual drug effects. Antibiotic stewardship also requires diagnosis-led, specimen-informed treatment whenever possible rather than routine use for every fever, operation or prophylactic situation.', sections: '### Combination effects\nIndifference is no better than the more effective drug alone, addition equals the sum, synergism exceeds the sum, and antagonism reduces the action.\n\n### Diagnosis before treatment\nSuitable specimens should be collected and treatment should be based on a clear clinical and bacteriological diagnosis whenever possible. Empirical treatment can begin after sampling and should be revised using susceptibility results.\n\n### Avoiding overuse\nAntibiotics are not indicated for every febrile illness. Combination therapy and prophylaxis are reserved for defined situations rather than applied routinely.', loses: ['Calling simple addition synergism.', 'Assuming every combination is superior to monotherapy.', 'Giving antibiotics for every fever.', 'Using prophylaxis routinely rather than in selected circumstances.'] },
]

const articleRow = (s) => { const subset = s.refs.map((r) => byRef[r]); return `# Item
## id
${s.id}
## title
${s.title}
## arabic_title

## aliases
${s.aliases.join('\n')}
## subject
${s.subject}
## topic
Microbiology
## subtopic
Antimicrobial chemotherapy
## microtopic
${subset[0].micro}
## nanotopic
Family-11 Part-2 exact-key concepts
## primary_node_id
DIS-MIC-T01
## secondary_node_ids
SYS-INF
DIS-MIC
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
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
${s.summary}
## sections
### Definition
${subset.map((c) => c.display).join(' ')}

### Mechanism
${s.sections}

### Key determinants
${subset.map((c) => c.objective).join(' ')}

### Clinical significance
These distinctions support mechanism-based resistance interpretation and responsible antimicrobial use. They are educational summaries, not patient-specific treatment advice, and every linked record remains Draft pending independent review.

### Exam approach
Name the axis tested in the stem—drug, target, pathway, transport, genetic vehicle, complication or stewardship principle—before comparing the options.
## published_summary

## published_sections

## hold_these
${subset.map((c) => c.display).join('\n')}
## lose_the_mark
${s.loses.join('\n')}
## related_concepts
${subset.map((c) => c.id).join('\n')}
## related_articles
${allArticles.filter((id) => id !== s.id).join('\n')}
## question_ids
${subset.map((c) => qFor(c).id).join('\n')}
## resource_ids
${teaching}
${assessment}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${subset[0].micro}
## university_notes
hu: Restricted to HU-BMS-102 Year 1. The Helwan lecture supplies direct teaching; Family 11 supplies exact auxiliary printed-answer occurrences without official-exam authority.
## annotations
${subset.map((c) => `### definition_of · ${c.id}\nQuote: ${c.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((c) => `### ${c.display}\nClaims: ${c.claim}\nCitations: ${c.currCit}, ${c.asmCit}\nSpan: ${c.span}`).join('\n\n')}
## article_source_ids
${teaching}
${assessment}
## claim_ids
${subset.map((c) => c.claim).join('\n')}
## span_ids
${subset.map((c) => c.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Direct Helwan curriculum teaching plus exact printed-answer occurrences from a tier-3 local keyed study bank. Neither carrier is represented as an authenticated official examination key.
## evidence_gaps
Independent medical verification and Helwan microbiology faculty review remain required before publication.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Q15 and Q28 remain explicit held occurrences and are not linked into this article set.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for these tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.` }

const claimRow = (c) => `# Item\n## id\n${c.claim}\n## concept_id\n${c.id}\n## subject\n${c.subject}\n## predicate\n${c.predicate}\n## object\n${c.object}\n## display_text\n${c.display}\n## risk_class\nfoundational_stable\n## verification_status\nneeds_evidence\n## conflict_status\nnone\n## confidence\n0.92\n## freshness\nstable_local_curriculum_fact\n## time_sensitive\nno\n## qualifiers\nauthority: direct governed Helwan teaching plus auxiliary exact printed answer; no official-key authority inferred`
const currCitation = (c) => `# Item\n## id\n${c.currCit}\n## claim_id\n${c.claim}\n## resource_id\n${teaching}\n## evidence_role\nlocal_curriculum\n## support_span\n${c.quote}\n## locator_type\npage\n## locator_page\n${c.page}\n## locator_section\nAntimicrobial chemotherapy — ${c.micro}\n## locator_detail\nPDF p${c.page}, direct Helwan teaching\n## context_note\nLocal curriculum support only; independent medical verification remains required.\n## confidence\n0.92\n## counts_as_claim_evidence\nno`
const asmCitation = (q) => { const c=byRef[q.ref]; return `# Item\n## id\n${c.asmCit}\n## claim_id\n${c.claim}\n## resource_id\n${assessment}\n## evidence_role\nauxiliary_assessment\n## support_span\n${q.stem.replaceAll('\n',' ')} Answer: ${q.options['ABCD'.indexOf(q.key)].replaceAll('\n',' ')}.\n## locator_type\npage\n## locator_page\n${q.page}\n## locator_section\nFamily 11 ${q.ref}\n## locator_detail\nPDF p${q.page}, exact prompt and visibly printed answer\n## context_note\nTier-3 local Helwan-attributed keyed study-bank evidence only; not an official exam or authenticated official key. Q15 and Q28 remain explicit holds outside this slice.\n## confidence\n0.95\n## counts_as_claim_evidence\nno` }
const spanRow = (c) => `# Item\n## id\n${c.span}\n## article_id\n${c.article}\n## section_id\n${c.article.toLowerCase()}-${c.ref.toLowerCase()}\n## text\n${c.display}\n## claim_ids\n${c.claim}\n## citation_ids\n${c.currCit}\n${c.asmCit}`

const relationDefs = [
  ['Q17','contrasts_with','Q18','drug inactivation contrasts with modification of the drug target'],
  ['Q19','contrasts_with','Q20','metabolic bypass contrasts with reduced drug entry'],
  ['Q20','contrasts_with','Q21','reduced influx through porins contrasts with active export through efflux pumps'],
  ['Q22','contrasts_with','Q18','intrinsic absence of a target contrasts with acquired modification of an existing target'],
  ['Q23','associated_with','Q24','resistance plasmids and transposons cooperate in mobile resistance-gene dissemination'],
  ['Q24','contrasts_with','Q25','transposition is mobile-element movement while chromosomal resistance can arise by spontaneous mutation'],
  ['Q26','associated_with','Q27','superinfection and drug toxicity are distinct complications of antimicrobial therapy'],
  ['Q29','associated_with','Q30','combination choices sit within diagnosis-led responsible antimicrobial use'],
  ['Q17','associated_with','Q23','R plasmids may carry beta-lactamase genes'],
  ['Q21','associated_with','Q23','efflux mechanisms may be carried in mobile resistance determinants'],
]
const relationRow = ([a,t,b,scope]) => `# Item\n## source\n${byRef[a].id}\n## type\n${t}\n## target\n${byRef[b].id}\n## evidence_claim_ids\n${byRef[a].claim}\n${byRef[b].claim}\n## citation_ids\n${byRef[a].currCit}\n${byRef[b].currCit}\n## verification_status\nneeds_evidence\n## confidence\n0.86\n## qualifiers\nscope: ${scope}\n## reviewer\nMedical team, Helwan Microbiology faculty`

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family11-part2-sources.md', sources],
  ['article/HU-BMS-102-microbiology-family11-part2-articles.md', specs.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-microbiology-family11-part2-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family11-part2-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family11-part2-citations.md', [...concepts.map(currCitation), ...questions.map(asmCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family11-part2-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-microbiology-family11-part2-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-microbiology-family11-part2-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])
for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: '11-part2', refs: questions.map((q) => q.ref), keys: questions.map((q) => q.key).join(''), released: { sources: 2, articles: 4, concepts: 13, newConcepts: 5, standaloneCompleteConceptReuses: 8, questions: 13, claims: 13, citations: 26, spans: 13, relations: 10 }, holds: { Q15: 'valid printed-B dependency/scope hold', Q28: 'time-sensitive guideline hold' } }, null, 2))
