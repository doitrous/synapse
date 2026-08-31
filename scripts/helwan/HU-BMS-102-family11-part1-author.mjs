import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_4abfcc7807e4409a34dd'
const teaching = 'src_bd6d792541ed79e0e692'

const A1 = 'ART-HU-BMS102-MIC-F11P1-DEFINITIONS-CIDALITY'
const A2 = 'ART-HU-BMS102-MIC-F11P1-SPECTRUM-SELECTIVE-TOXICITY'
const A3 = 'ART-HU-BMS102-MIC-F11P1-CELL-WALL-MECHANISMS'
const A4 = 'ART-HU-BMS102-MIC-F11P1-RIBOSOME-FOLATE-MECHANISMS'
const allArticles = [A1, A2, A3, A4]

const concepts = [
  { ref: 'Q01', id: 'CON-INF-25871D95E4E1D3', reuse: true, key: 'teaching.microv1.chemotherapeutic-agent.definition', article: A1, page: 3, micro: 'Core definitions', nano: 'Antimicrobial chemotherapy', type: 'definition', label: 'Antimicrobial chemotherapy treats infectious disease with drugs lethal or inhibitory to the causative organism', aliases: ['Antimicrobial chemotherapy definition', 'Chemotherapeutic antimicrobial agent'], definition: 'Antimicrobial chemotherapy is treatment of an infectious disease by administering a drug that kills the causative microorganism or inhibits its multiplication. Disinfectants and antiseptics act on external surfaces and are not substitutes for a selectively toxic systemic chemotherapeutic agent.', objective: 'Define antimicrobial chemotherapy by its therapeutic use of lethal or inhibitory drugs against the causative organism.', pitfalls: 'Substituting surface disinfection, nonspecific immune stimulation or prophylactic antisepsis for drug treatment of an established infectious disease.', subject: 'Antimicrobial chemotherapy', predicate: 'is', object: 'treatment of infectious disease with drugs lethal or inhibitory to the causative organisms', display: 'Antimicrobial chemotherapy is treatment of infectious disease with drugs lethal or inhibitory to the causative organisms.', quote: 'Antimicrobial Chemotherapy is treatment of infectious diseases by administration of drugs which are lethal or inhibitory to the causative organisms.' },
  { ref: 'Q02', id: 'CON-INF-ABF1EA01540430', reuse: true, key: 'teaching.microv1.antibiotic.definition', article: A1, page: 3, micro: 'Core definitions', nano: 'Antibiotic definition', type: 'definition', label: 'An antibiotic is an antimicrobial substance produced by a living organism and active in high dilution', aliases: ['Antibiotic biological-origin definition', 'Microbial antimicrobial product'], definition: 'In the source definition, an antibiotic is an antimicrobial substance produced by a living organism and active at high dilution. Modern usage may extend the term to synthetic and semisynthetic agents, but this question asks for the source bank’s specific biological-origin definition.', objective: 'Recognize the biological-origin and high-dilution wording used to define an antibiotic in this Helwan teaching source.', pitfalls: 'Replacing the source definition with the broader modern usage, or adding an immediate irreversible-killing requirement that excludes bacteriostatic antibiotics.', subject: 'An antibiotic', predicate: 'is', object: 'an antimicrobial substance produced by a living organism and active in high dilution', display: 'An antibiotic is an antimicrobial substance produced by a living organism and active in high dilution.', quote: 'Antibiotic is an antimicrobial substance produced by living organism and is active in high dilutions.' },
  { ref: 'Q03', id: 'CON-INF-D410FB0D3DDFA8', reuse: false, key: 'antibiotic-origin-natural-semisynthetic-synthetic', article: A1, page: 4, micro: 'Core definitions', nano: 'Antibiotic origins', type: 'classification', label: 'Antimicrobial agents may be natural, semisynthetic or synthetic', aliases: ['Antibiotic origin classification', 'Natural semisynthetic synthetic antimicrobials'], definition: 'Antimicrobial agents may be naturally produced, chemically synthesized, or semisynthetic modifications of previously discovered drugs. A semisynthetic antibiotic begins with an existing antimicrobial scaffold and changes it chemically to alter useful properties.', objective: 'Distinguish natural, synthetic and semisynthetic antimicrobial origins and identify chemical modification of a discovered drug as semisynthetic development.', pitfalls: 'Claiming every antibiotic is naturally produced, or treating semisynthesis as microbial production without chemical modification.', subject: 'Semisynthetic antibiotics', predicate: 'are developed by', object: 'chemical modification of previously discovered drugs', display: 'Semisynthetic antibiotics are developed by chemical modification of previously discovered drugs.', quote: 'Synthetic modifications of previously discovered drugs (semisynthetic) allowed the development of several new antimicrobial agents.' },
  { ref: 'Q04', id: 'CON-INF-4E8ECDA3106CD7', reuse: true, key: 'teaching.microv1.bacteriostatic.definition', article: A1, page: 5, micro: 'Bacteriostatic and bactericidal action', nano: 'Bacteriostatic action', type: 'definition', label: 'A bacteriostatic drug inhibits multiplication and leaves clearance to host defences', aliases: ['Bacteriostatic definition', 'Reversible bacterial growth inhibition'], definition: 'A bacteriostatic drug inhibits bacterial multiplication without directly killing the organisms. Growth can resume after withdrawal, so host defence mechanisms such as phagocytosis are required to clear the inhibited bacteria.', objective: 'Define bacteriostatic action and explain why intact host defence is needed for microbial clearance.', pitfalls: 'Calling reversible growth inhibition rapid irreversible killing, or assuming that inhibition alone eliminates bacteria in a severely immunocompromised host.', subject: 'A bacteriostatic drug', predicate: 'inhibits', object: 'bacterial multiplication while host defences clear the organisms', display: 'A bacteriostatic drug inhibits bacterial multiplication while host defences clear the organisms.', quote: 'Inhibit bacterial multiplication, but do not kill them. The host defence mechanisms, such as phagocytosis, are required to kill bacteria.' },
  { ref: 'Q05', id: 'CON-INF-7D05204BF47C67', reuse: false, key: 'bactericidal-indication-severe-immunocompromised', article: A1, page: 6, micro: 'Bacteriostatic and bactericidal action', nano: 'Bactericidal indications', type: 'clinical_application', label: 'Bactericidal therapy is especially important in immediately life-threatening infection or severe leucopenia', aliases: ['Bactericidal treatment indication', 'Severe infection in a leucopenic patient'], definition: 'Bactericidal drugs rapidly and irreversibly kill bacteria. They are particularly important when infection is immediately life-threatening or host clearance is impaired, as in severe leucopenia, because merely arresting growth may be insufficient.', objective: 'Choose a severe life-threatening infection in a leucopenic patient as the scenario in which bactericidal action is most crucial.', pitfalls: 'Applying the strongest-treatment principle indiscriminately to mild infections or prophylaxis without considering severity and host defence.', subject: 'Bactericidal therapy', predicate: 'is especially important in', object: 'immediately life-threatening infection in a severely leucopenic patient', display: 'Bactericidal therapy is especially important in immediately life-threatening infection in a severely leucopenic patient.', quote: 'Those are particularly useful in certain infections, e.g. those that are immediately life-threatening as in severe leucopenic patients and endocarditis.' },
  { ref: 'Q06', id: 'CON-INF-8779E4885B09B8', reuse: false, key: 'bactericidal-drug-classification', article: A1, page: 6, micro: 'Bacteriostatic and bactericidal action', nano: 'Drug-class examples', type: 'classification', label: 'Penicillins, cephalosporins and aminoglycosides are bactericidal, whereas tetracyclines are bacteriostatic', aliases: ['Bactericidal antibiotic examples', 'Tetracycline bacteriostatic exception'], definition: 'The Helwan classification lists penicillins, cephalosporins and aminoglycosides as bactericidal drug groups. Tetracyclines inhibit bacterial protein synthesis and are listed among bacteriostatic drugs, making them the exception in that comparison.', objective: 'Classify the named drug groups by cidal or static action and identify tetracyclines as the non-bactericidal option.', pitfalls: 'Assuming every protein-synthesis inhibitor has the same cidal/static classification or overlooking the EXCEPT wording.', subject: 'Tetracyclines', predicate: 'are classified as', object: 'bacteriostatic rather than bactericidal drugs', display: 'Tetracyclines are classified as bacteriostatic rather than bactericidal drugs.', quote: 'Examples include penicillins, cephalosporins and aminoglycosides. [Bacteriostatic] examples include sulphonamides, tetracyclines and chloramphenicol.' },
  { ref: 'Q07', id: 'CON-INF-05859CA13449A5', reuse: false, key: 'broad-spectrum-antibiotic-definition', article: A2, page: 8, micro: 'Spectrum and selective toxicity', nano: 'Broad spectrum', type: 'definition', label: 'A broad-spectrum antibiotic acts against Gram-positive and Gram-negative bacteria', aliases: ['Broad-spectrum antibiotic definition', 'Wide antimicrobial spectrum'], definition: 'A broad-spectrum antibiotic acts against several types of microorganisms and includes activity against both Gram-positive and Gram-negative bacteria. This spectrum category is independent of whether the drug is bactericidal or bacteriostatic.', objective: 'Define broad-spectrum activity by coverage of several microbial types including Gram-positive and Gram-negative bacteria.', pitfalls: 'Confusing breadth of coverage with killing mechanism, competitive inhibition or potency.', subject: 'A broad-spectrum antibiotic', predicate: 'is active against', object: 'several microbial types including Gram-positive and Gram-negative bacteria', display: 'A broad-spectrum antibiotic is active against several microbial types including Gram-positive and Gram-negative bacteria.', quote: 'Broad spectrum antibiotics: Those are active against several types of microorganisms, both Gram positive and Gram negative.' },
  { ref: 'Q08', id: 'CON-INF-E5422DEBE7A81C', reuse: false, key: 'vancomycin-narrow-spectrum-gram-positive', article: A2, page: 8, micro: 'Spectrum and selective toxicity', nano: 'Vancomycin spectrum', type: 'classification', label: 'Vancomycin has a narrow spectrum focused on selected Gram-positive cocci', aliases: ['Vancomycin narrow spectrum', 'Vancomycin Gram-positive cocci coverage'], definition: 'In this introductory spectrum classification, vancomycin is a narrow-spectrum antibiotic used primarily against selected Gram-positive cocci, including staphylococci and enterococci. It is not described as covering a broad mixture of Gram-positive and Gram-negative organisms.', objective: 'Identify selected Gram-positive cocci as the spectrum that makes vancomycin narrow in the source comparison.', pitfalls: 'Extending vancomycin’s activity to Gram-negative rods merely because it is a potent antibiotic.', subject: 'Vancomycin', predicate: 'is used primarily against', object: 'selected Gram-positive cocci such as staphylococci and enterococci', display: 'Vancomycin is used primarily against selected Gram-positive cocci such as staphylococci and enterococci.', quote: 'Vancomycin is primarily used against certain Gram positive cocci i.e. staphylococci and enterococci.' },
  { ref: 'Q09', id: 'CON-INF-05D590078F3DCC', reuse: false, key: 'antimicrobial-selective-toxicity-definition', article: A2, page: 10, micro: 'Spectrum and selective toxicity', nano: 'Selective toxicity', type: 'definition', label: 'Selective toxicity harms the pathogen without significantly harming the host', aliases: ['Antimicrobial selective toxicity', 'Pathogen-selective drug action'], definition: 'Selective toxicity is the ability of an antimicrobial agent to harm a pathogen without significantly harming the host. It is achieved by targeting a microbial structure or metabolic pathway that is absent from, or sufficiently different in, host cells.', objective: 'Define selective toxicity and relate it to microbial targets that differ from host structures or pathways.', pitfalls: 'Interpreting selective toxicity as activity against only one bacterial species or as equal toxicity to pathogen and host.', subject: 'Selective toxicity', predicate: 'is', object: 'harm to the pathogen without significant harm to the host', display: 'Selective toxicity is harm to the pathogen without significant harm to the host.', quote: 'Selective toxicity: is the ability of the antimicrobial agent to harm a pathogen without harming the host.' },
  { ref: 'Q10', id: 'CON-INF-B05E407B1B6341', reuse: false, key: 'disinfectant-systemic-toxicity', article: A2, page: 11, micro: 'Spectrum and selective toxicity', nano: 'Disinfectant toxicity', type: 'mechanism', label: 'Phenol-like disinfectants are unsuitable chemotherapeutic agents because they are highly toxic to human tissues', aliases: ['Disinfectant systemic toxicity', 'Phenol unsuitable for chemotherapy'], definition: 'Disinfectants such as phenol can destroy microorganisms but lack adequate selective toxicity for administration to human tissues. Their high tissue toxicity makes them unsuitable as systemic chemotherapeutic agents despite their antimicrobial action on surfaces.', objective: 'Explain why antimicrobial activity alone does not make a disinfectant suitable for systemic chemotherapy.', pitfalls: 'Blaming viral specificity, a narrow spectrum or rapid metabolism when the decisive limitation is host-tissue toxicity.', subject: 'Phenol-like disinfectants', predicate: 'are unsuitable for chemotherapy because of', object: 'high toxicity to human tissue cells', display: 'Phenol-like disinfectants are unsuitable for chemotherapy because of high toxicity to human tissue cells.', quote: 'Disinfectants, e.g. phenol ... destroy bacteria but they are highly toxic to tissue cells and are unsuitable for use as chemotherapeutic agents.' },
  { ref: 'Q11', id: 'CON-INF-90DF7C039A770B', reuse: false, key: 'beta-lactam-pbp-cell-wall-mechanism', article: A3, page: 12, micro: 'Cell-wall mechanisms', nano: 'Beta-lactam PBPs', type: 'mechanism', label: 'Beta-lactams bind PBPs and inhibit the final steps of peptidoglycan synthesis', aliases: ['Beta-lactam mechanism', 'Penicillin-binding protein inhibition'], definition: 'Beta-lactam antibiotics such as penicillins bind penicillin-binding proteins in the bacterial cell wall and inhibit final steps in peptidoglycan synthesis. Loss of a functional wall promotes bacteriolysis and provides selective toxicity because human cells lack peptidoglycan.', objective: 'Identify PBP binding and inhibition of peptidoglycan synthesis as the primary beta-lactam mechanism.', pitfalls: 'Assigning beta-lactams to ribosomes, the cytoplasmic membrane or folate metabolism.', subject: 'Beta-lactam antibiotics', predicate: 'inhibit', object: 'final peptidoglycan synthesis by binding penicillin-binding proteins', display: 'Beta-lactam antibiotics inhibit final peptidoglycan synthesis by binding penicillin-binding proteins.', quote: 'β-lactams inhibit the final steps in synthesis of peptidoglycan by binding to receptors called penicillin-binding proteins (PBPs) in the cell wall.' },
  { ref: 'Q12', id: 'CON-INF-AD7DC1EF66E104', reuse: false, key: 'vancomycin-mrsa-peptidoglycan-mechanism', article: A3, page: 12, micro: 'Cell-wall mechanisms', nano: 'Vancomycin and MRSA', type: 'mechanism', label: 'Vancomycin inhibits an early peptidoglycan step distinct from the beta-lactam target', aliases: ['Vancomycin MRSA mechanism', 'Glycopeptide early peptidoglycan inhibition'], definition: 'Vancomycin inhibits early steps of peptidoglycan synthesis by a mechanism different from beta-lactam binding to PBPs. This distinct target explains its activity against beta-lactam-resistant staphylococcal infections in the source teaching.', objective: 'Contrast vancomycin’s early peptidoglycan inhibition with beta-lactam PBP inhibition.', pitfalls: 'Claiming vancomycin acts by efflux, ribosomal alteration or simple beta-lactamase resistance without naming its distinct cell-wall mechanism.', subject: 'Vancomycin', predicate: 'inhibits', object: 'an early peptidoglycan-synthesis step distinct from beta-lactams', display: 'Vancomycin inhibits an early peptidoglycan-synthesis step distinct from beta-lactams.', quote: 'Vancomycin inhibits the early steps in peptidoglycan synthesis by a different mechanism. That is why vancomycin is effective in treatment of β-lactam resistant staphylococcal infections (MRSA).' },
  { ref: 'Q13', id: 'CON-INF-29351FD540E214', reuse: true, key: 'bacteria.ribosome.70s-protein-synthesis', article: A4, page: 15, micro: 'Protein and folate mechanisms', nano: 'Ribosomal selectivity', type: 'structure_function_relationship', label: 'Bacterial 70S ribosomes differ from human cytoplasmic 80S ribosomes and permit selective inhibition', aliases: ['70S versus 80S ribosomes', 'Ribosomal selective toxicity'], definition: 'Bacteria contain 70S ribosomes made of 50S and 30S subunits, whereas human cytoplasmic ribosomes are 80S with 60S and 40S subunits. Structural differences in ribosomal proteins, RNA and associated enzymes allow several antibiotics to inhibit bacterial protein synthesis with less interference in host translation.', objective: 'Explain the 70S-versus-80S ribosomal basis of selective toxicity for protein-synthesis inhibitors.', pitfalls: 'Attributing this selectivity to cell-wall structure, energy metabolism or nonspecific membrane permeability when the item explicitly asks about protein synthesis.', subject: 'Ribosomal selective toxicity', predicate: 'depends on', object: 'differences between bacterial 70S and human 80S ribosomes', display: 'Ribosomal selective toxicity depends on differences between bacterial 70S and human 80S ribosomes.', quote: 'Bacteria have 70S ribosomes (with 50S and 30S subunits), whereas human cells have 80S ribosomes (with 60S and 40S subunits).' },
  { ref: 'Q14', id: 'CON-INF-6F6F8F6ABEE2FC', reuse: false, key: 'tetracycline-30s-binding', article: A4, page: 15, micro: 'Protein and folate mechanisms', nano: 'Tetracycline target', type: 'mechanism', label: 'Tetracycline acts on the bacterial 30S ribosomal subunit', aliases: ['Tetracycline 30S binding', '30S protein-synthesis inhibitor'], definition: 'Tetracycline inhibits bacterial protein synthesis through action on the 30S ribosomal subunit. In the source comparison, erythromycin and chloramphenicol act on 50S, while rifampicin inhibits RNA synthesis through RNA polymerase.', objective: 'Identify tetracycline as the listed antibiotic acting on the bacterial 30S ribosomal subunit.', pitfalls: 'Choosing a 50S inhibitor or the RNA-polymerase inhibitor rifampicin merely because all are antimicrobial drugs.', subject: 'Tetracycline', predicate: 'acts on', object: 'the bacterial 30S ribosomal subunit', display: 'Tetracycline acts on the bacterial 30S ribosomal subunit.', quote: 'Tetracycline and aminoglycosides act on 30S subunits.' },
  { ref: 'Q16', id: 'CON-INF-5A15540CA80809', reuse: true, key: 'sulfonamide-competitive-inhibition-of-folate-synthesis', article: A4, page: 18, micro: 'Protein and folate mechanisms', nano: 'Sulphonamide competitive inhibition', type: 'mechanism', label: 'Sulphonamides are PABA analogues that competitively inhibit bacterial folate synthesis', aliases: ['Sulfonamide PABA competition', 'Competitive folate-synthesis inhibition'], definition: 'Sulphonamides structurally resemble para-aminobenzoic acid and compete with PABA for the active centre of the bacterial enzyme that incorporates it into folate synthesis. Blocking folate formation limits nucleotide synthesis and bacterial multiplication.', objective: 'Explain sulphonamide action as competitive inhibition produced by structural analogy to PABA.', pitfalls: 'Assigning sulphonamides to DNA gyrase, irreversible protein-synthesis inhibition or cell-wall autolysis.', subject: 'Sulphonamides', predicate: 'competitively inhibit', object: 'bacterial folate synthesis as structural analogues of PABA', display: 'Sulphonamides competitively inhibit bacterial folate synthesis as structural analogues of PABA.', quote: 'Sulphonamides are structural analogues to PABA so they enter into the reaction in place of PABA and compete for the active center of the enzyme thus inhibiting folic acid synthesis.' },
]

for (const c of concepts) {
  c.claim = `CLM-HU102-F11P1-${c.ref}-01`
  c.currCit = `CIT-HU102-F11P1-${c.ref}-CURR`
  c.asmCit = `CIT-HU102-F11P1-${c.ref}-ASM`
  c.span = `SPN-HU102-F11P1-${c.ref}-01`
}
const byRef = Object.fromEntries(concepts.map((c) => [c.ref, c]))

const questions = [
  { ref: 'Q01', page: 1, key: 'B', stem: 'Antimicrobial chemotherapy is defined as the treatment of infectious\ndiseases by:', options: ['Using disinfectants like phenol to eliminate all microorganisms', 'Administering drugs that are lethal or inhibitory to the causative organisms', "Boosting the host's immune system to fight off infection", 'Using antiseptics like alcohol to prevent infection'], reasons: ['surface disinfection is not chemotherapy of infection', 'this is the source definition', 'immune stimulation is not the stated antimicrobial-drug treatment', 'antisepsis prevents surface infection rather than treating disease'] },
  { ref: 'Q02', page: 1, key: 'A', stem: 'An antibiotic is specifically defined as an antimicrobial substance that\nis :', options: ['Produced by a living organism and active in high dilutions', 'Always chemically synthesized in a laboratory', 'Effective only against Gram-positive bacteria', 'Capable of killing bacteria immediately and irreversibly'], reasons: ['this preserves the source-specific definition', 'antibiotics are not always synthetic', 'spectrum is not restricted to Gram-positive organisms', 'bacteriostatic antibiotics need not kill immediately'] },
  { ref: 'Q03', page: 1, key: 'B', stem: 'Which of the following statements is true regarding the origin of\nantibiotics?', options: ['All antibiotics are naturally produced by microorganisms', 'Semisynthetic antibiotics are developed through chemical modifications of\npreviously discovered drugs', 'Synthetic antibiotics are produced only by bacteria and fungi', 'Naturally produced antibiotics are always more effective than synthetic ones'], reasons: ['natural production does not cover synthetic and semisynthetic agents', 'this is the taught definition of semisynthetic development', 'chemical synthesis is not biological production by bacteria or fungi', 'origin does not establish universal superiority'] },
  { ref: 'Q04', page: 2, key: 'D', stem: 'A bacteriostatic drug is best described as an agent that:', options: ['Has a rapid, irreversible killing action on bacteria', 'Directly lyses bacteria by disrupting their cell wall', 'Is particularly useful in life-threatening infections like endocarditis', "Inhibits bacterial multiplication, allowing the host's immune system to kill the\nbacteria"], reasons: ['rapid irreversible killing is bactericidal', 'direct lysis is a killing mechanism', 'this points to a setting favoring bactericidal activity', 'this states growth inhibition with host clearance'] },
  { ref: 'Q05', page: 2, key: 'C', stem: 'In which clinical scenario would a bactericidal drug be most crucial?', options: ['A mild case of acne vulgaris', 'An uncomplicated urinary tract infection in an otherwise healthy adult', 'A severe, life-threatening infection in a leucopenic patient', 'Prophylaxis before dental surgery in a healthy patient'], reasons: ['mild acne does not create the stated urgency', 'an immunocompetent uncomplicated infection is not the strongest indication in this comparison', 'severe infection plus leucopenia limits host clearance and makes killing crucial', 'prophylaxis in a healthy patient is not treatment of life-threatening infection'] },
  { ref: 'Q06', page: 2, key: 'D', stem: 'All of the following are examples of bactericidal drugs EXCEPT:', options: ['Penicillins', 'Aminoglycosides', 'Cephalosporins', 'Tetracyclines'], reasons: ['penicillins are listed as bactericidal', 'aminoglycosides are listed as bactericidal', 'cephalosporins are listed as bactericidal', 'tetracyclines are listed as bacteriostatic'] },
  { ref: 'Q07', page: 2, key: 'C', stem: 'An antibiotic that is active against both Gram-positive and\nGram-negative bacteria is classified as a:', options: ['Narrow-spectrum antibiotic', 'Bacteriostatic antibiotic', 'Broad-spectrum antibiotic', 'Competitive inhibitor'], reasons: ['narrow spectrum covers one or few types', 'static/cidal classification does not describe breadth', 'coverage of both groups defines broad spectrum', 'competitive inhibition is a mechanism rather than spectrum'] },
  { ref: 'Q08', page: 3, key: 'C', stem: 'Vancomycin is considered a narrow-spectrum antibiotic because it is\nprimarily used against:', options: ['Gram-negative rods like E. coli', 'A wide variety of both Gram-positive and Gram-negative bacteria', 'Certain Gram-positive cocci, such as staphylococci and enterococci', 'Anaerobic bacteria'], reasons: ['the source does not define its spectrum by Gram-negative rods', 'this would be broad-spectrum activity', 'these selected Gram-positive cocci are the taught narrow spectrum', 'the source does not use anaerobes to define this classification'] },
  { ref: 'Q09', page: 3, key: 'B', stem: "Selective toxicity, an ideal property of antimicrobial agents, refers to\nthe drug's ability to:", options: ['Harm both the pathogen and the host cells equally', 'Harm the pathogen without significantly harming the host', 'Selectively target only one specific type of bacterium', 'Be effective against a broad range of microorganisms'], reasons: ['equal host toxicity contradicts selectivity', 'this is the taught definition', 'organism count describes spectrum rather than toxicity', 'broad coverage also describes spectrum'] },
  { ref: 'Q10', page: 3, key: 'B', stem: 'Why are disinfectants like phenol not suitable for use as\nchemotherapeutic agents?', options: ['They are only effective against viruses', 'They are highly toxic to human tissue cells', 'They have a very narrow spectrum of activity', 'They are rapidly broken down by the body'], reasons: ['phenol is not virus-only', 'high tissue toxicity prevents systemic chemotherapeutic use', 'spectrum is not the decisive limitation given', 'rapid breakdown is not the stated reason'] },
  { ref: 'Q11', page: 3, key: 'C', stem: 'The mechanism of action of beta-lactam antibiotics, such as penicillin,\nprimarily involves:', options: ['Inhibition of protein synthesis by binding to the 30S ribosomal subunit', 'Disruption of the cytoplasmic membrane function', 'Inhibition of bacterial cell wall synthesis by binding to penicillin-binding\nproteins (PBPs)', 'Competitive inhibition of folic acid synthesis'], reasons: ['30S action belongs to other antibiotic classes', 'membrane disruption is a different mechanism', 'PBP binding blocks final peptidoglycan synthesis', 'PABA competition describes sulphonamides'] },
  { ref: 'Q12', page: 4, key: 'B', stem: 'Vancomycin       is   effective     in   treating     methicillin-resistant\nStaphylococcus aureus (MRSA) because it:', options: ['Is not affected by beta-lactamases', 'Inhibits a different, early step in peptidoglycan synthesis than beta-lactams', 'Actively pumps beta-lactam antibiotics out of the bacterial cell', 'Alters the bacterial ribosome to which beta-lactams bind'], reasons: ['this does not state vancomycin’s positive mechanism', 'this is the distinct taught cell-wall mechanism', 'drug efflux is a bacterial resistance mechanism', 'beta-lactams do not bind bacterial ribosomes'] },
  { ref: 'Q13', page: 4, key: 'C', stem: 'The selective toxicity of antibiotics that inhibit bacterial protein\nsynthesis is primarily due to differences in the:', options: ['Cell wall structure between bacteria and humans', 'Metabolic pathways for energy production', 'Ribosomal structure (70S vs. 80S) between bacteria and human cells', 'Permeability of the bacterial and human cell membranes'], reasons: ['cell-wall difference supports other targets', 'energy pathways are not the protein-synthesis target', '70S-versus-80S ribosomal differences provide the stated selectivity', 'membrane permeability is not the primary basis stated'] },
  { ref: 'Q14', page: 4, key: 'C', stem: 'An antibiotic that binds to the 30S subunit of the bacterial ribosome\nis:', options: ['Erythromycin', 'Chloramphenicol', 'Tetracycline', 'Rifampicin'], reasons: ['erythromycin acts on 50S', 'chloramphenicol acts on 50S', 'tetracycline acts on 30S', 'rifampicin targets RNA polymerase'] },
  { ref: 'Q16', page: 5, key: 'C', stem: 'The mechanism of action of sulphonamides is best described as:', options: ['Inhibition of nucleic acid synthesis by blocking DNA gyrase', 'Irreversible inhibition of protein synthesis', 'Competitive inhibition, as they are structural analogues of PABA', 'Disruption of the bacterial cell wall by activating autolytic enzymes'], reasons: ['DNA gyrase is the quinolone target', 'sulphonamides do not act by irreversible ribosomal inhibition', 'PABA analogy creates competitive folate-pathway inhibition', 'cell-wall autolysis is not the sulphonamide mechanism'] },
]
for (const q of questions) q.id = `Q-HU102-MIC-F11-${q.ref}`

const sourceRow = (x) => `# Item\n## id\n${x.id}\n## title\n${x.title}\n## institution\n${x.institution}\n## collection_id\nhu-y1\n## source_relative_path\n${x.path}\n## media_type\napplication/pdf\n## languages\nen\n## page_count\n${x.pages}\n## sha256\n${x.sha}\n## processing_status\npending\n## rights\nLocal university material held for internal authoring only; no page image is redistributed.\n## qualification\n${x.qualification}\n## is_assessment\n${x.assessment ? 'yes' : 'no'}`

const sources = [
  sourceRow({ id: assessment, title: 'Helwan S2 antimicrobial chemotherapy MCQ bank with printed answers', institution: 'Helwan University local corpus; every page watermarked Dr Mustafa Elsudani', path: 'Year 1/BMS 102/Microbiology/Questions/MCQs/MCQs - Helwan S2 Micro Antimicrobial Chemotherapy MCQ.pdf', pages: 9, sha: '4abfcc7807e4409a34dd0e6c9983937a17f07120b3852351a6d2d79ff5e9ee04', qualification: 'Tier-3 local Helwan-attributed keyed study bank. Page 9 visibly prints answers for 30 MCQs; Part 1 releases Q1–Q14 and Q16 only. It is not an authenticated sitting, official examination or official departmental answer key.', assessment: true }),
  sourceRow({ id: teaching, title: 'Antimicrobial chemotherapy — HU-BMS-102 microbiology lecture', institution: 'Faculty of Medicine, Helwan University; Dr Ehab M. Fahmy', path: 'Year 1/BMS 102/Microbiology/Theoretical/Lec 3 - Antimicrobials/-Antimicrobial chemotherapy.pdf', pages: 46, sha: 'bd6d792541ed79e0e692652157092fec0c7ee969a0b225e10155b2364a0010a8', qualification: 'Direct Helwan theoretical teaching carrier. Pages 3–18 supply the definitions, classifications and mechanisms used in this slice; it is not an assessment instrument.', assessment: false }),
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
pharm
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
0.72
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
  if (i === correct) return `${q.options[i].replaceAll('\n', ' ')} is correct because ${q.reasons[i]}. The teaching source directly supports this distinction, and the printed ${q.key} is preserved without being promoted to an official key.`
  return `${q.options[i].replaceAll('\n', ' ')} is not the best answer because ${q.reasons[i]}. The governed teaching instead supports ${q.options[correct].replaceAll('\n', ' ')}; the item remains Draft pending faculty review.`
}

const questionRow = (q) => {
  const c = byRef[q.ref]
  return `# Item
## id
${q.id}
## title
${q.stem.replaceAll('\n', ' ')}
## subject
pharm
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
Easy
## question_type
Pharmacology
## main_concept
${c.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Microbiology > Antimicrobial chemotherapy > ${c.micro} > ${c.nano}
## clinical_relevance
0.72
## academic_relevance
0.98
## cognitive_effort_score
0.46
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
Low
## setting
Academic
## reasoning_level
1
## inferred_difficulty
43
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
Exact source wording, capitalization, punctuation and option order are preserved. No marks, recurrence, official sitting or official-key status is inferred. Q15 is omitted as a valid printed-B dependency/scope hold because its pending shared concept is ciprofloxacin-specific and unresolved across universities. Q28 remains a separate time-sensitive guideline hold; Q17–Q27 and Q29–Q30 are outside this bounded Part-1 slice.${c.reuse ? ' The main concept reuses the governed exact ID in a standalone-complete HU overlay.' : ''}
## estimated_seconds
60
## randomise_answers
yes`
}

const articleSpecs = [
  { id: A1, title: 'Antimicrobial definitions and bacteriostatic–bactericidal distinctions', aliases: ['Antimicrobial chemotherapy foundations', 'Cidal and static antimicrobial action'], refs: ['Q01','Q02','Q03','Q04','Q05','Q06'], summary: 'Antimicrobial chemotherapy treats infectious disease with drugs that kill or inhibit causative organisms. Antibiotics may be natural, semisynthetic or synthetic; bacteriostatic agents arrest multiplication and depend on host clearance, while bactericidal agents kill irreversibly and are especially important in severe infection with impaired host defence.', sections: '### Antimicrobial chemotherapy and antibiotics\nChemotherapy refers to treatment of infection with antimicrobial drugs, not disinfection of an external surface. The source-specific antibiotic definition emphasizes production by a living organism and activity in high dilution, while the adjacent origin classification recognizes natural, semisynthetic and synthetic agents.\n\n### Static versus cidal action\nBacteriostatic drugs reversibly arrest multiplication and leave clearance to host phagocytes. Bactericidal drugs produce rapid irreversible killing, a particularly important property in immediately life-threatening infection or severe leucopenia.\n\n### Classification examples\nPenicillins, cephalosporins and aminoglycosides are listed as bactericidal. Tetracyclines are listed as bacteriostatic, so cidal/static classification must not be inferred merely from whether a drug inhibits protein synthesis.', loses: ['Calling surface disinfection treatment of an established infection.', 'Treating every antibiotic as naturally produced despite the taught semisynthetic and synthetic categories.', 'Calling reversible growth arrest bactericidal.', 'Missing the EXCEPT instruction when tetracycline is compared with three bactericidal groups.'] },
  { id: A2, title: 'Antimicrobial spectrum and selective toxicity', aliases: ['Broad and narrow antimicrobial spectrum', 'Selective toxicity and disinfectant limitation'], refs: ['Q07','Q08','Q09','Q10'], summary: 'Spectrum describes how many microbial groups an antimicrobial covers: broad-spectrum drugs cover several groups including Gram-positive and Gram-negative bacteria, whereas vancomycin is presented as narrow-spectrum for selected Gram-positive cocci. Selective toxicity means harming the pathogen without significant host harm and explains why phenol is unsuitable systemically.', sections: '### Spectrum\nBroad spectrum refers to activity against several microbial types and is independent of bactericidal or bacteriostatic action. Vancomycin is narrow in this teaching comparison because its useful activity is focused on selected Gram-positive cocci such as staphylococci and enterococci.\n\n### Selective toxicity\nThe safest antimicrobial targets a structure or pathway that microbes possess and human cells lack or use differently. This is why peptidoglycan and bacterial ribosomes are useful targets.\n\n### Why disinfectants are not systemic drugs\nPhenol and related disinfectants kill microorganisms but are also highly toxic to tissue cells. Antimicrobial action without adequate host selectivity is not enough for chemotherapeutic use.', loses: ['Confusing spectrum with cidal/static action.', 'Assigning vancomycin broad Gram-negative coverage in this introductory comparison.', 'Defining selective toxicity as equal pathogen and host injury.', 'Assuming every antimicrobial surface chemical is suitable for systemic administration.'] },
  { id: A3, title: 'Beta-lactam and vancomycin inhibition of bacterial cell-wall synthesis', aliases: ['PBP and peptidoglycan mechanisms', 'Cell-wall antimicrobial mechanisms'], refs: ['Q11','Q12'], summary: 'Beta-lactams and vancomycin both inhibit peptidoglycan synthesis, but at different points. Beta-lactams bind PBPs and block final synthesis steps; vancomycin blocks an earlier step by a distinct mechanism, explaining its utility against beta-lactam-resistant staphylococci in the source teaching.', sections: '### Beta-lactams\nPenicillins and cephalosporins bind penicillin-binding proteins and prevent completion of peptidoglycan. The weakened wall cannot withstand osmotic stress, promoting bacteriolysis.\n\n### Vancomycin\nVancomycin is a glycopeptide that inhibits an earlier peptidoglycan-synthesis step without using the beta-lactam PBP-binding mechanism. The distinction matters when a staphylococcal infection resists beta-lactams.\n\n### Selective target\nHuman cells do not synthesize peptidoglycan. Targeting this uniquely bacterial structure provides a basis for selective toxicity.', loses: ['Putting beta-lactams on the 30S ribosome.', 'Calling cytoplasmic-membrane disruption the primary penicillin mechanism.', 'Explaining vancomycin action as bacterial efflux.', 'Saying beta-lactams bind a ribosome that vancomycin alters.'] },
  { id: A4, title: 'Ribosomal and folate-pathway mechanisms of antimicrobial action', aliases: ['70S ribosome and PABA mechanisms', 'Tetracycline and sulphonamide mechanisms'], refs: ['Q13','Q14','Q16'], summary: 'Bacterial 70S ribosomes differ from human cytoplasmic 80S ribosomes, supporting selective inhibition of bacterial protein synthesis. Tetracycline acts on 30S, whereas sulphonamides act elsewhere: as PABA analogues they competitively inhibit bacterial folate synthesis.', sections: '### Ribosomal selectivity\nBacterial ribosomes contain 50S and 30S subunits; human cytoplasmic ribosomes contain 60S and 40S subunits. Differences in proteins, RNA and associated enzymes let several drugs inhibit bacterial translation more selectively.\n\n### Tetracycline\nTetracycline acts on the bacterial 30S subunit. Erythromycin and chloramphenicol are 50S agents in the same source comparison, while rifampicin targets RNA polymerase rather than a ribosome.\n\n### Sulphonamides\nPABA is a precursor for microbial folate synthesis. Sulphonamides resemble PABA and compete for the relevant enzyme active centre, reducing folate and downstream nucleotide synthesis. This is competitive metabolic inhibition, not direct DNA-gyrase or ribosomal inhibition.', loses: ['Using cell-wall structure to answer a question specifically about selective protein-synthesis inhibition.', 'Placing erythromycin or chloramphenicol on 30S.', 'Calling rifampicin a ribosomal inhibitor.', 'Assigning sulphonamides to DNA gyrase or cell-wall autolysis.'] },
]

const articleRow = (s) => {
  const subset = s.refs.map((r) => byRef[r])
  return `# Item
## id
${s.id}
## title
${s.title}
## arabic_title

## aliases
${s.aliases.join('\n')}
## subject
pharm
## topic
Microbiology
## subtopic
Antimicrobial chemotherapy
## microtopic
${subset[0].micro}
## nanotopic
Family-11 Part-1 exact-key concepts
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
These definitions and mechanisms support safe antimicrobial reasoning by separating spectrum, target, static or cidal action, and host selectivity. They do not constitute treatment advice, and every linked record remains Draft pending independent review.

### Exam approach
Use the mechanism or definition asked in the stem, then eliminate alternatives from a different classification axis. Every linked question keeps its printed answer and remains Draft pending independent review.
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
hu: Restricted to HU-BMS-102 Year 1. The Helwan lecture supplies direct curriculum teaching; Family 11 supplies exact auxiliary printed-answer occurrences without official-exam authority.
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
Q15 is not linked or taught here because its shared pending concept has an unresolved cross-university scope dependency. Q28 remains a time-sensitive guideline hold.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for these tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`
}

const claimRow = (c) => `# Item\n## id\n${c.claim}\n## concept_id\n${c.id}\n## subject\n${c.subject}\n## predicate\n${c.predicate}\n## object\n${c.object}\n## display_text\n${c.display}\n## risk_class\nfoundational_stable\n## verification_status\nneeds_evidence\n## conflict_status\nnone\n## confidence\n0.92\n## freshness\nstable_local_curriculum_fact\n## time_sensitive\nno\n## qualifiers\nauthority: direct governed Helwan teaching plus auxiliary exact printed answer; no official-key authority inferred`

const currCitation = (c) => `# Item\n## id\n${c.currCit}\n## claim_id\n${c.claim}\n## resource_id\n${teaching}\n## evidence_role\nlocal_curriculum\n## support_span\n${c.quote}\n## locator_type\npage\n## locator_page\n${c.page}\n## locator_section\nAntimicrobial chemotherapy — ${c.micro}\n## locator_detail\nPDF p${c.page}, direct Helwan teaching\n## context_note\nLocal curriculum support only; independent medical verification remains required.\n## confidence\n0.92\n## counts_as_claim_evidence\nno`
const asmCitation = (q) => { const c = byRef[q.ref]; return `# Item\n## id\n${c.asmCit}\n## claim_id\n${c.claim}\n## resource_id\n${assessment}\n## evidence_role\nauxiliary_assessment\n## support_span\n${q.stem.replaceAll('\n',' ')} Answer: ${q.options['ABCD'.indexOf(q.key)].replaceAll('\n',' ')}.\n## locator_type\npage\n## locator_page\n${q.page}\n## locator_section\nFamily 11 ${q.ref}\n## locator_detail\nPDF p${q.page}, exact prompt and visibly printed answer\n## context_note\nTier-3 local Helwan-attributed keyed study-bank evidence only; not an official exam or authenticated official key. Q15 and Q28 remain explicit holds outside this slice.\n## confidence\n0.95\n## counts_as_claim_evidence\nno` }
const spanRow = (c) => `# Item\n## id\n${c.span}\n## article_id\n${c.article}\n## section_id\n${c.article.toLowerCase()}-${c.ref.toLowerCase()}\n## text\n${c.display}\n## claim_ids\n${c.claim}\n## citation_ids\n${c.currCit}\n${c.asmCit}`

const relationDefs = [
  ['Q01','associated_with','Q02','the antibiotic definition is nested within antimicrobial chemotherapy terminology'],
  ['Q02','associated_with','Q03','the source-specific biological-origin definition is complemented by the natural, semisynthetic and synthetic usage classification'],
  ['Q04','contrasts_with','Q05','growth arrest contrasts with the need for irreversible killing in severe host-defence impairment'],
  ['Q04','contrasts_with','Q06','tetracycline exemplifies the static side of the cidal/static classification'],
  ['Q07','contrasts_with','Q08','broad Gram-positive/Gram-negative coverage contrasts with vancomycin’s selected Gram-positive spectrum'],
  ['Q09','associated_with','Q10','lack of host selectivity explains why phenol is unsuitable systemically'],
  ['Q09','associated_with','Q11','peptidoglycan is a selectively toxic microbial target'],
  ['Q11','contrasts_with','Q12','both inhibit peptidoglycan but beta-lactams bind PBPs at final steps while vancomycin acts earlier'],
  ['Q13','associated_with','Q14','the 70S/80S difference supports selective tetracycline action at 30S'],
  ['Q13','contrasts_with','Q16','ribosomal protein-synthesis inhibition differs from PABA-competitive folate inhibition'],
]
const relationRow = ([a,t,b,scope]) => `# Item\n## source\n${byRef[a].id}\n## type\n${t}\n## target\n${byRef[b].id}\n## evidence_claim_ids\n${byRef[a].claim}\n${byRef[b].claim}\n## citation_ids\n${byRef[a].currCit}\n${byRef[b].currCit}\n## verification_status\nneeds_evidence\n## confidence\n0.86\n## qualifiers\nscope: ${scope}\n## reviewer\nMedical team, Helwan Microbiology faculty`

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family11-part1-sources.md', sources],
  ['article/HU-BMS-102-microbiology-family11-part1-articles.md', articleSpecs.map(articleRow).join('\n---\n\n')],
  ['concept/HU-BMS-102-microbiology-family11-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family11-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family11-part1-citations.md', [...concepts.map(currCitation), ...questions.map(asmCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-microbiology-family11-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-microbiology-family11-part1-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-microbiology-family11-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: '11-part1', refs: questions.map((q) => q.ref), keys: questions.map((q) => q.key).join(''), released: { sources: 2, articles: 4, concepts: 15, newConcepts: 10, standaloneCompleteConceptReuses: 5, questions: 15, claims: 15, citations: 30, spans: 15, relations: 10 }, holds: { Q15: 'valid printed-B dependency/scope hold; no student-facing record', Q28: 'time-sensitive guideline hold' } }, null, 2))
