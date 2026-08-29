#!/usr/bin/env node
/**
 * Deterministic S1 evidence runner for HU-BMS-101.  The register is intentionally
 * triage-only: no IDs are minted and no import files are touched.  Each row supplies
 * the manual's four query classes (distinctive term, alias, synonym, mechanism).
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const register = `
morula-timing\tmorula|cleavage|zygote|fertilization
myelinated-conduction\tmyelination|myelinated|nerve fibres|saltatory
blind-ended-lymphatic-capillaries\tlymphatic|blind-ended|lymph capillaries|lymphatic capillaries
brachioradialis-insertion\tbrachioradialis|brachioradial|elbow flexor|radius
allantois-origin\tallantois|allantoic|umbilical|yolk sac
subscapularis-attachment\tsubscapularis|subscapular|lesser tubercle|scapula
ulnar-nerve-medial-epicondyle\tulnar nerve|ulnar|medial epicondyle|cubital tunnel
polyhydramnios\tpolyhydramnios|amniotic fluid|hydramnios|fetal swallowing
thenar-innervation\tthenar|thenar muscles|recurrent median|median nerve
coracobrachialis-innervation\tcoracobrachialis|coracobrachial|musculocutaneous|anterior arm
flexor-carpi-radialis-innervation\tflexor carpi|FCR|median nerve|forearm flexor
anatomical-snuffbox-border\tsnuffbox|anatomical snuffbox|radial border|extensor pollicis
ulnar-artery-course\tulnar artery|ulnar|palmar arch|forearm artery
gastrulation-germ-layers\tgastrulation|germ layer|trilaminar|epiblast
placental-barrier-fourth-month\tplacental barrier|placenta barrier|fourth month|trophoblast
fetal-placenta\tfetal placenta|chorionic plate|fetal surface|chorion
hypothenar-innervation\thypothenar|hypothenar muscles|deep ulnar|ulnar nerve
axillary-artery-branches\taxillary artery|axillary|thoracoacromial|subscapular artery
paraxial-mesoderm-derivatives\tparaxial|somite|sclerotome|dermomyotome
radial-artery-branches\tradial artery|radial|deep palmar|dorsal carpal
lateral-plate-mesoderm-derivatives\tlateral plate|splanchnic mesoderm|somatic mesoderm|intraembryonic coelom
syncytiotrophoblast-features\tsyncytiotrophoblast|syncytio|trophoblast|hCG
implantation-timing\timplantation|implant|blastocyst|endometrium
fertilisation-second-week-events\tfertilisation|fertilization|acrosome|zona pellucida
uteroplacental-circulation-onset\tuteroplacental|placental circulation|intervillous|spiral artery
posterior-cord-branches\tposterior cord|posterior cord branches|thoracodorsal|subscapular nerve
anterior-axillary-wall\tanterior axillary|axillary wall|pectoralis minor|clavipectoral
shoulder-joint-class\tshoulder joint|glenohumeral|ball and socket|synovial joint
somite-formation-rate\tsomite|somitogenesis|paraxial|segmentation
musculocutaneous-nerve-course\tmusculocutaneous|musculocutaneous nerve|coracobrachialis|lateral cutaneous forearm
triceps-action\ttriceps|triceps brachii|elbow extension|radial nerve
lumbrical-mcp-action\tlumbrical|lumbricals|MCP flexion|interphalangeal extension
abductor-pollicis-longus-insertion\tabductor pollicis|APL|first metacarpal|thumb abductor
median-nerve-carpal-tunnel\tcarpal tunnel|median nerve|flexor retinaculum|thenar
brachial-artery-termination\tbrachial artery|brachial|radial artery|ulnar artery
ulnar-collateral-ligament-attachment\tulnar collateral ligament|UCL|medial epicondyle|coronoid process
cloacal-membrane\tcloacal membrane|cloaca|urorectal|endoderm
neurenteric-canal\tneurenteric|neurenteric canal|primitive node|notochord
cubital-fossa-contents-and-roof\tcubital fossa|cubital|bicipital aponeurosis|brachial artery
embryonic-folding\tembryonic folding|folding|lateral fold|cephalocaudal
maternal-placenta\tmaternal placenta|decidua basalis|maternal surface|placental cotyledon
amniotic-fluid-definitions\tamniotic fluid|amniotic|liquor|amniotic cavity
somite-derivatives\tsomite derivatives|sclerotome|myotome|dermatome
ectoderm-derivatives\tectoderm|ectoderm derivatives|neural crest|epidermis
pronator-teres-OINA\tpronator teres|pronator|median nerve|coronoid process
ubiquitin-protein-degradation\tubiquitin|proteasome|protein degradation|ubiquitination
elastin-collagen-comparison\telastin|elastic fibre|collagen|connective tissue
sickle-cell-mutation\tsickle|sickle cell|beta globin|glutamate valine
translation-initiation\ttranslation initiation|initiation|AUG|ribosome
haemoglobinopathy\thaemoglobinopathy|hemoglobinopathy|globin|haemoglobin
quinolone-topoisomerase\tquinolone|fluoroquinolone|topoisomerase|DNA gyrase
osteogenesis-imperfecta\tosteogenesis|osteogenesis imperfecta|type I collagen|brittle bone
prokaryotic-transcription\tprokaryotic transcription|prokaryotic|RNA polymerase|sigma factor
biotin-carboxylation\tbiotin|carboxylation|carboxylase|CO2
ferroportin\tferroportin|iron export|hepcidin|enterocyte
topoisomerase-ii-inhibition\ttopoisomerase II|etoposide|topoisomerase|DNA strand
histone-chromatin-regulation\thistone|chromatin|histone modification|acetylation
rho-dependent-termination\trho|rho dependent|termination|prokaryotic transcription
oxygen-dissociation-curve\toxygen dissociation|oxyhaemoglobin|2,3-BPG|haemoglobin affinity
linker-histone\tlinker histone|histone H1|nucleosome|chromatin
gc-base-pairing\tguanine cytosine|GC|base pairing|hydrogen bonds
cyp-polymorphism\tCYP|cytochrome P450|polymorphism|pharmacogenetics
urease-enzyme-class\turease|urea|hydrolase|enzyme class
mismatch-repair-hnpcc\tmismatch repair|HNPCC|Lynch|DNA repair
trna-and-aminoacylation\ttRNA|aminoacyl|aminoacyl tRNA synthetase|anticodon
competitive-inhibition\tcompetitive inhibition|competitive inhibitor|Vmax|Michaelis
tissue-hypoxia\ttissue hypoxia|hypoxia|oxygen delivery|cyanide
vitamin-a-visual-cycle\tvitamin A|retinal|visual cycle|rhodopsin
allosteric-kinetics\tallosteric|allosteric enzyme|sigmoidal|cooperativity
creatine-kinase-isoenzymes\tcreatine kinase|CK|isoenzyme|CK-MB
promoter-mutation\tpromoter|promoter mutation|transcription|RNA polymerase
niacin-deficiency\tniacin|pellagra|vitamin B3|NAD
vitamin-c-collagen-hydroxylation\tvitamin C|ascorbic|collagen hydroxylation|proline
vitamin-d-rickets\tvitamin D|rickets|calcitriol|bone mineralization
prokaryotic-eukaryotic-translation\ttranslation|prokaryotic|eukaryotic|ribosome
primase\tprimase|RNA primer|DNA replication|Okazaki
two-three-bpg\t2,3-BPG|BPG|haemoglobin|oxygen affinity
copper-dependent-enzymes\tcopper|copper enzyme|lysyl oxidase|ceruloplasmin
ldh-isoenzymes\tLDH|lactate dehydrogenase|isoenzyme|lactate
lyase-enzyme-class\tlyase|enzyme class|cleavage|synthase
z-dna\tZ-DNA|Z DNA|left handed|DNA conformation
nucleosome-function\tnucleosome|histone octamer|chromatin|DNA packaging
dna-polymerase-iii-proofreading\tDNA polymerase III|polymerase III|proofreading|exonuclease
complex-iv\tcomplex IV|cytochrome c oxidase|ETC|oxygen acceptor
etc-complexes\telectron transport|ETC|mitochondrial complex|oxidative phosphorylation
etc-uncoupling\tuncoupling|uncoupler|proton gradient|oxidative phosphorylation
folate-deficiency\tfolate|folic acid|megaloblastic|one carbon
rna-polymerase-iii\tRNA polymerase III|polymerase III|5S RNA|RNA polymerase
start-codon-aug\tAUG|start codon|methionine|translation initiation
codon-degeneracy\tcodon degeneracy|degenerate code|genetic code|codon
lipid-classification\tlipid|lipid class|phospholipid|triglyceride
diphtheria-ef2\tdiphtheria|EF-2|elongation factor|ADP ribosylation
rotenone-complex-i\trotenone|complex I|NADH dehydrogenase|ETC
dna-methylation\tDNA methylation|methylation|epigenetic|CpG
collagen-amino-acids\tcollagen|glycine|hydroxyproline|amino acid
xeroderma-pigmentosum-repair\txeroderma|xeroderma pigmentosum|nucleotide excision|thymine dimer
alternative-splicing\talternative splicing|splicing|RNA processing|introns
mitochondrial-dna-polymerase\tmitochondrial DNA|DNA polymerase gamma|polymerase gamma|mitochondria
deoxy-sugars\tdeoxy sugar|deoxyribose|sugar|nucleotide
nitrogenous-base-structure\tnitrogenous base|purine|pyrimidine|nucleotide
cytokinesis\tcytokinesis|cell division|cleavage furrow|actin ring
meiosis-tetrads\ttetrad|tetrads|meiosis|crossing over
topoisomerase-i-vs-ii\ttopoisomerase I|topoisomerase II|topoisomerase|DNA topology
connective-tissue-receptors\tconnective tissue receptor|mechanoreceptor|Pacinian|Ruffini
traumatic-brain-oedema\tbrain oedema|cerebral oedema|traumatic brain|blood brain barrier
vinca-alkaloids\tvinca|vincristine|vinblastine|microtubule
crossing-over\tcrossing over|crossing-over|meiosis|chiasma
vascular-tissue-classification\tvascular tissue|blood vessel|artery vein|capillary
basic-tissue-classification\tbasic histology|tissue classification|epithelium|connective tissue
elastic-laminae\telastic lamina|internal elastic|external elastic|artery
nucleolar-disappearance\tnucleolus|nucleolar|mitosis|prophase
down-syndrome\tDown syndrome|trisomy 21|Down|chromosome
turner-syndrome\tTurner syndrome|45,X|Turner|sex chromosome
dorsal-root-ganglion\tdorsal root ganglion|spinal ganglion|DRG|pseudounipolar
avascular-epithelium\tavascular|epithelium|blood vessels|diffusion
desmin-intermediate-filament\tdesmin|intermediate filament|muscle filament|cytoskeleton
mast-cell-histamine\tmast cell|histamine|mast|granule
coronary-circulation\tcoronary|coronary artery|heart blood supply|epicardium
keratin\tkeratin|keratinization|keratinocyte|epidermis
pancreatic-salivary-ducts\tpancreatic duct|salivary duct|duct epithelium|stratified cuboidal
purkinje-fibres\tPurkinje fibre|Purkinje|cardiac conduction|subendocardial
cellular-pigments\thaemosiderin|hemosiderin|lipofuscin|macrophage pigment
chromosome-morphology\tchromosome morphology|chromosome|centromere|metacentric
epidermal-layers\tepidermal layers|epidermis|stratum|keratinocyte
capillary-types-and-sites\tfenestrated capillary|capillary|sinusoid|continuous capillary
medium-artery-vein-comparison\tmedium artery|medium vein|artery vein|tunica media
euchromatin-heterochromatin\teuchromatin|heterochromatin|chromatin|transcription
neuron-glial-morphology\tglia|neuron|neuroglia|nervous tissue
collagen-fibres\tcollagen fibre|collagen|type I collagen|connective tissue
marfan-fibrillin\tMarfan|fibrillin|elastic fibre|connective tissue
sex-chromosome-karyotype\tkaryotype|sex chromosome|Barr body|chromosome
venous-smooth-muscle\tvein smooth muscle|venous|smooth muscle|tunica media
brown-adipose-tissue\tbrown adipose|brown fat|adipose|thermogenesis
cell-cycle-competence\tcell cycle|cell cycle competence|G0|proliferation
epicardium\tepicardium|pericardium|heart wall|mesothelium
trigeminal-nucleus\ttrigeminal nucleus|trigeminal|cranial nerve|brainstem
elastic-fibres\telastic fibre|elastin|fibrillin|connective tissue
umbilical-cord-connective-tissue\tumbilical cord|Wharton|mucoid connective|umbilical
hair-follicle-receptor\thair follicle|root hair plexus|hair receptor|mechanoreceptor
thermoregulatory-av-shunts\tarteriovenous shunt|AV shunt|thermoregulation|skin blood flow
adherens-junction\tadherens junction|adherens|cadherin|cell junction
urinary-oral-epithelia\turothelium|transitional epithelium|oral epithelium|stratified squamous
vasa-vasorum\tvasa vasorum|vasorum|large artery|blood vessel wall
barbiturate-neurotransmission\tbarbiturate|GABA|neurotransmission|chloride channel
synaptic-fatigue\tsynaptic fatigue|synaptic|fatigue|neurotransmitter depletion
skin-ageing\tskin ageing|aging skin|skin|collagen
thermoregulation\tthermoregulation|temperature regulation|heat loss|hypothalamus
temporal-summation\ttemporal summation|summation|synapse|postsynaptic
potassium-and-resting-potential\thypokalaemia|hyperkalaemia|potassium|resting membrane potential
resting-membrane-potential\tresting membrane potential|RMP|membrane potential|potassium permeability
calcium-transmitter-release\tcalcium channel|calcium dependent|neurotransmitter release|presynaptic
body-fluid-osmolarity\tosmolarity|osmolality|ECF|ICF
chemical-synapse-sequence\tchemical synapse|synaptic transmission|vesicle release|calcium channel
intracellular-potassium\tintracellular potassium|ICF potassium|potassium|body fluid
ipsp-inhibitory-neurotransmitter\tIPSP|inhibitory postsynaptic|inhibitory neurotransmitter|GABA
cleavage-lines\tcleavage lines|Langer lines|incision|skin tension
diarrhoeal-fluid-balance\tdiarrhoea|diarrheal|fluid balance|extracellular fluid
calcium-homeostasis\tcalcium homeostasis|calcium|parathyroid|calcitriol
diffusion-and-facilitated-diffusion\tfacilitated diffusion|diffusion|carrier|passive transport
convergence\tconvergence|neural convergence|synapse|neuronal circuit
energy-independent-transport\tpassive transport|energy independent|diffusion|osmosis
dehydration-vomiting\tdehydration|vomiting|fluid loss|hypokalaemia
steady-state-osmolarity\tsteady state|osmolarity|osmolality|body fluids
epinephrine-actions\tepinephrine|adrenaline|sympathetic|beta receptor
osmosis\tosmosis|osmotic|water movement|semipermeable
carrier-stereospecificity-saturation\tcarrier saturation|stereospecificity|carrier|transport maximum
fluid-shifts-solute-load\tfluid shift|solute load|osmolarity|ECF ICF
melanocyte-photoprotection\tmelanocyte|melanin|photoprotection|ultraviolet
action-potential-upstroke\taction potential|upstroke|sodium influx|depolarisation
potassium-equilibrium-potential\tpotassium equilibrium|equilibrium potential|Nernst|potassium
potassium-efflux-repolarisation\trepolarisation|potassium efflux|action potential|potassium channel
sodium-channel-block\tsodium channel block|sodium channel|local anaesthetic|action potential
siadh-compartments\tSIADH|ADH|hyponatraemia|body fluid
hypertonic-saline-compartments\thypertonic saline|hypertonic|ECF ICF|fluid shift
hypotonic-saline-compartments\thypotonic saline|hypotonic|ECF ICF|fluid shift
body-fluid-volume-calculation\tICF volume|plasma volume|interstitial fluid|body fluid compartment
sodium-nernst-potential\tsodium Nernst|Nernst|sodium equilibrium|membrane potential
sodium-potassium-atpase-inhibition\tNa/K ATPase|sodium potassium pump|ouabain|active transport
hyperkalaemic-weakness\thyperkalaemic weakness|hyperkalaemia|muscle weakness|membrane potential
potassium-current-driving-force\tdriving force|potassium current|potassium|membrane potential
`;

const concepts = register.trim().split('\n').map((line) => {
  const [key, rawQueries] = line.split('\t');
  const queries = rawQueries.split('|');
  if (queries.length !== 4 || queries.some((query) => !query.trim())) throw new Error(`bad register row: ${line}`);
  return { key, queries };
});

const command = process.platform === 'win32' ? 'node.exe' : 'node';
const runner = 'Instruction Manual for Content Creation/tools/find-existing.mjs';
async function search(query) {
  const { stdout } = await execFileAsync(command, [runner, query], { maxBuffer: 1024 * 1024 });
  return stdout.split('\n').filter((line) => /^(live |pending\s)/.test(line)).map((line) => line.trim());
}
async function pool(items, workerCount, fn) {
  const result = new Array(items.length); let next = 0;
  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (next < items.length) { const index = next++; result[index] = await fn(items[index]); }
  }));
  return result;
}
const limitArgument = process.argv.find((argument) => argument.startsWith('--limit='));
const selectedConcepts = limitArgument
  ? concepts.slice(0, Number(limitArgument.slice('--limit='.length)))
  : concepts;
if (!Number.isInteger(selectedConcepts.length) || selectedConcepts.length < 1) {
  throw new Error('Use --limit=<positive integer> when limiting the transcript.');
}
const output = await pool(selectedConcepts, Number(process.env.HU_TRIAGE_WORKERS || 6), async (concept) => {
  const queryHits = await pool(concept.queries, 4, async (query) => ({ query, hits: await search(query) }));
  const evidence = [...new Set(queryHits.flatMap(({ hits }) => hits))];
  return { ...concept, queryHits, evidence, adjudication: 'UNADJUDICATED' };
});
const contract = {
  totalRegisteredConcepts: concepts.length,
  totalRequiredQueries: concepts.length * 4,
  transcriptConcepts: output.length,
  transcriptQueries: output.reduce((count, item) => count + item.queryHits.length, 0),
  adjudicationState: 'UNADJUDICATED',
  semanticDispositionFields: 0,
};
process.stdout.write(`${JSON.stringify({ generatedAt: 'deterministic-run', contract, concepts: output }, null, 2)}\n`);
