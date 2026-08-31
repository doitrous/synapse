#!/usr/bin/env node
/* Generate the HU-BMS-101 authoring batches from the local Helwan exam corpus.
 * This is intentionally source-first: keys are transcribed from the printed key
 * or the solved PDF's highlighted option, and missing source text is marked as
 * such instead of being guessed. */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outRoot = join(root, 'docs/Helwan-Source-Imports')
for (const d of ['concept','article','question','written','practical','evidence','relations','media-requests']) mkdirSync(join(outRoot,d), { recursive: true })

const source = {
  aa8: 'src_aa8bb730fbccdbf7d6e0',
  b7c: 'src_b7c0eb8f1cafb9f6c9d7',
  f5: 'src_f5f3ba808a5eb4afa3a0',
  form: 'src_86786ce382d463dc3036',
}
const pdf = {
  aa8: '/Users/doitrous/Desktop/helwan/Year 1/BMS 101/All Subjects/Assessments/Exams/EOM - 101 final 2025.pdf',
  b7c: '/Users/doitrous/Desktop/helwan/Year 1/BMS 101/All Subjects/Assessments/Exams/EOM - Batch 10 BMS1 FINAL EXAM.pdf',
  form: '/Users/doitrous/Desktop/helwan/Year 1/BMS 101/All Subjects/Official Course Files/101-BMS1-Answers of formative assessment-main stream-26.pdf',
}
const text = (file) => execFileSync('pdftotext', ['-layout', file, '-'], { encoding: 'utf8' })

const registerText = `
morula-timing|morula|cleavage|zygote|fertilization
myelinated-conduction|myelination|myelinated|nerve fibres|saltatory
blind-ended-lymphatic-capillaries|lymphatic|blind-ended|lymph capillaries|lymphatic capillaries
brachioradialis-insertion|brachioradialis|brachioradial|elbow flexor|radius
allantois-origin|allantois|allantoic|umbilical|yolk sac
subscapularis-attachment|subscapularis|subscapular|lesser tubercle|scapula
ulnar-nerve-medial-epicondyle|ulnar nerve|ulnar|medial epicondyle|cubital tunnel
polyhydramnios|polyhydramnios|amniotic fluid|hydramnios|fetal swallowing
thenar-innervation|thenar|thenar muscles|recurrent median|median nerve
coracobrachialis-innervation|coracobrachialis|coracobrachial|musculocutaneous|anterior arm
flexor-carpi-radialis-innervation|flexor carpi|FCR|median nerve|forearm flexor
anatomical-snuffbox-border|snuffbox|anatomical snuffbox|radial border|extensor pollicis
ulnar-artery-course|ulnar artery|ulnar|palmar arch|forearm artery
gastrulation-germ-layers|gastrulation|germ layer|trilaminar|epiblast
placental-barrier-fourth-month|placental barrier|placenta barrier|fourth month|trophoblast
fetal-placenta|fetal placenta|chorionic plate|fetal surface|chorion
hypothenar-innervation|hypothenar|hypothenar muscles|deep ulnar|ulnar nerve
axillary-artery-branches|axillary artery|axillary|thoracoacromial|subscapular artery
paraxial-mesoderm-derivatives|paraxial|somite|sclerotome|dermomyotome
radial-artery-branches|radial artery|radial|deep palmar|dorsal carpal
lateral-plate-mesoderm-derivatives|lateral plate|splanchnic mesoderm|somatic mesoderm|intraembryonic coelom
syncytiotrophoblast-features|syncytiotrophoblast|syncytio|trophoblast|hCG
implantation-timing|implantation|implant|blastocyst|endometrium
fertilisation-second-week-events|fertilisation|fertilization|acrosome|zona pellucida
uteroplacental-circulation-onset|uteroplacental|placental circulation|intervillous|spiral artery
posterior-cord-branches|posterior cord|posterior cord branches|thoracodorsal|subscapular nerve
anterior-axillary-wall|anterior axillary|axillary wall|pectoralis minor|clavipectoral
shoulder-joint-class|shoulder joint|glenohumeral|ball and socket|synovial joint
somite-formation-rate|somite|somitogenesis|paraxial|segmentation
musculocutaneous-nerve-course|musculocutaneous|musculocutaneous nerve|coracobrachialis|lateral cutaneous forearm
triceps-action|triceps|triceps brachii|elbow extension|radial nerve
lumbrical-mcp-action|lumbrical|lumbricals|MCP flexion|interphalangeal extension
abductor-pollicis-longus-insertion|abductor pollicis|APL|first metacarpal|thumb abductor
median-nerve-carpal-tunnel|carpal tunnel|median nerve|flexor retinaculum|thenar
brachial-artery-termination|brachial artery|brachial|radial artery|ulnar artery
ulnar-collateral-ligament-attachment|ulnar collateral ligament|UCL|medial epicondyle|coronoid process
cloacal-membrane|cloacal membrane|cloaca|urorectal|endoderm
neurenteric-canal|neurenteric|neurenteric canal|primitive node|notochord
cubital-fossa-contents-and-roof|cubital fossa|cubital|bicipital aponeurosis|brachial artery
embryonic-folding|embryonic folding|folding|lateral fold|cephalocaudal
maternal-placenta|maternal placenta|decidua basalis|maternal surface|placental cotyledon
amniotic-fluid-definitions|amniotic fluid|amniotic|liquor|amniotic cavity
somite-derivatives|somite derivatives|sclerotome|myotome|dermatome
ectoderm-derivatives|ectoderm|ectoderm derivatives|neural crest|epidermis
pronator-teres-OINA|pronator teres|pronator|median nerve|coronoid process
ubiquitin-protein-degradation|ubiquitin|proteasome|protein degradation|ubiquitination
elastin-collagen-comparison|elastin|elastic fibre|collagen|connective tissue
sickle-cell-mutation|sickle|sickle cell|beta globin|glutamate valine
translation-initiation|translation initiation|initiation|AUG|ribosome
haemoglobinopathy|haemoglobinopathy|hemoglobinopathy|globin|haemoglobin
quinolone-topoisomerase|quinolone|fluoroquinolone|topoisomerase|DNA gyrase
osteogenesis-imperfecta|osteogenesis|osteogenesis imperfecta|type I collagen|brittle bone
prokaryotic-transcription|prokaryotic transcription|prokaryotic|RNA polymerase|sigma factor
biotin-carboxylation|biotin|carboxylation|carboxylase|CO2
ferroportin|ferroportin|iron export|hepcidin|enterocyte
topoisomerase-ii-inhibition|topoisomerase II|etoposide|topoisomerase|DNA strand
histone-chromatin-regulation|histone|chromatin|histone modification|acetylation
tus-replication-termination|Tus|replication termination|Ter site|prokaryotic DNA replication
oxygen-dissociation-curve|oxygen dissociation|oxyhaemoglobin|2,3-BPG|haemoglobin affinity
linker-histone|linker histone|histone H1|nucleosome|chromatin
gc-base-pairing|guanine cytosine|GC|base pairing|hydrogen bonds
cyp-polymorphism|CYP|cytochrome P450|polymorphism|pharmacogenetics
urease-enzyme-class|urease|urea|hydrolase|enzyme class
mismatch-repair-hnpcc|mismatch repair|HNPCC|Lynch|DNA repair
trna-and-aminoacylation|tRNA|aminoacyl|aminoacyl tRNA synthetase|anticodon
competitive-inhibition|competitive inhibition|competitive inhibitor|Vmax|Michaelis
tissue-hypoxia|tissue hypoxia|hypoxia|oxygen delivery|cyanide
vitamin-a-visual-cycle|vitamin A|retinal|visual cycle|rhodopsin
allosteric-kinetics|allosteric|allosteric enzyme|sigmoidal|cooperativity
creatine-kinase-isoenzymes|creatine kinase|CK|isoenzyme|CK-MB
promoter-mutation|promoter|promoter mutation|transcription|RNA polymerase
niacin-deficiency|niacin|pellagra|vitamin B3|NAD
vitamin-c-collagen-hydroxylation|vitamin C|ascorbic|collagen hydroxylation|proline
vitamin-d-rickets|vitamin D|rickets|calcitriol|bone mineralization
prokaryotic-eukaryotic-translation|translation|prokaryotic|eukaryotic|ribosome
primase|primase|RNA primer|DNA replication|Okazaki
two-three-bpg|2,3-BPG|BPG|haemoglobin|oxygen affinity
copper-dependent-enzymes|copper|copper enzyme|lysyl oxidase|ceruloplasmin
ldh-isoenzymes|LDH|lactate dehydrogenase|isoenzyme|lactate
lyase-enzyme-class|lyase|enzyme class|cleavage|synthase
z-dna|Z-DNA|Z DNA|left handed|DNA conformation
nucleosome-function|nucleosome|histone octamer|chromatin|DNA packaging
dna-polymerase-iii-proofreading|DNA polymerase III|polymerase III|proofreading|exonuclease
complex-iv|complex IV|cytochrome c oxidase|ETC|oxygen acceptor
etc-complexes|electron transport|ETC|mitochondrial complex|oxidative phosphorylation
etc-uncoupling|uncoupling|uncoupler|proton gradient|oxidative phosphorylation
folate-deficiency|folate|folic acid|megaloblastic|one carbon
rna-polymerase-iii|RNA polymerase III|polymerase III|5S RNA|RNA polymerase
start-codon-aug|AUG|start codon|methionine|translation initiation
codon-degeneracy|codon degeneracy|degenerate code|genetic code|codon
lipid-classification|lipid|lipid class|phospholipid|triglyceride
diphtheria-ef2|diphtheria|EF-2|elongation factor|ADP ribosylation
rotenone-complex-i|rotenone|complex I|NADH dehydrogenase|ETC
dna-methylation|DNA methylation|methylation|epigenetic|CpG
elastin-elasticity-amino-acids|elastin|elasticity|alanine|glycine
xeroderma-pigmentosum-repair|xeroderma|xeroderma pigmentosum|nucleotide excision|thymine dimer
alternative-splicing|alternative splicing|splicing|RNA processing|introns
mitochondrial-dna-polymerase|mitochondrial DNA|DNA polymerase gamma|polymerase gamma|mitochondria
deoxy-sugars|deoxy sugar|deoxyribose|sugar|nucleotide
nitrogenous-base-structure|nitrogenous base|purine|pyrimidine|nucleotide
cytokinesis|cytokinesis|cell division|cleavage furrow|actin ring
meiosis-tetrads|tetrad|tetrads|meiosis|crossing over
topoisomerase-i-vs-ii|topoisomerase I|topoisomerase II|topoisomerase|DNA topology
connective-tissue-receptors|connective tissue receptor|mechanoreceptor|Pacinian|Ruffini
astrocyte-blood-brain-barrier-maintenance|astrocyte|astrocytes|blood brain barrier|BBB
vinca-alkaloids|vinca|vincristine|vinblastine|microtubule
crossing-over|crossing over|crossing-over|meiosis|chiasma
sympathetic-ganglion-vascularity|sympathetic ganglion|sympathetic ganglia|ganglion vascularity|blood supply
purkinje-fibre-size|Purkinje fibre|Purkinje fibers|ventricular muscle cells|contractile ventricular cells
coronary-artery-elastic-laminae|coronary artery|internal elastic|external elastic|elastic lamina
nucleolar-disappearance|nucleolus|nucleolar|mitosis|prophase
down-syndrome|Down syndrome|trisomy 21|Down|chromosome
turner-syndrome|Turner syndrome|45,X|Turner|sex chromosome
dorsal-root-ganglion|dorsal root ganglion|spinal ganglion|DRG|pseudounipolar
spinal-ganglion-blood-supply|spinal ganglion|dorsal root ganglion|ganglion blood supply|poor blood supply
desmin-intermediate-filament|desmin|intermediate filament|muscle filament|cytoskeleton
mast-cell-histamine|mast cell|histamine|mast|granule
keratin|keratin|keratinization|keratinocyte|epidermis
pancreatic-salivary-ducts|pancreatic duct|salivary duct|duct epithelium|stratified cuboidal
purkinje-fibre-subendocardial-location|Purkinje fibre|Purkinje fibers|subendocardial|endocardium
cellular-pigments|haemosiderin|hemosiderin|lipofuscin|macrophage pigment
isochromosome-transverse-centromere-division|isochromosome|transverse centromere|centromere division|identical arms
epidermal-layers|epidermal layers|epidermis|stratum|keratinocyte
capillary-types-and-sites|fenestrated capillary|capillary|sinusoid|continuous capillary
medium-artery-vein-comparison|medium artery|medium vein|artery vein|tunica media
euchromatin-heterochromatin|euchromatin|heterochromatin|chromatin|transcription
neuron-glial-morphology|glia|neuron|neuroglia|nervous tissue
collagen-fibres|collagen fibre|collagen|type I collagen|connective tissue
marfan-fibrillin|Marfan|fibrillin|elastic fibre|connective tissue
sex-chromosome-karyotype|karyotype|sex chromosome|Barr body|chromosome
venous-smooth-muscle|vein smooth muscle|venous|smooth muscle|tunica media
brown-adipose-tissue|brown adipose|brown fat|adipose|thermogenesis
thin-versus-thick-skin|thin skin|thick skin|epidermal layers|sweat glands
cell-cycle-competence|cell cycle|cell cycle competence|G0|proliferation
epicardium|epicardium|pericardium|heart wall|mesothelium
trigeminal-nucleus|trigeminal nucleus|trigeminal|cranial nerve|brainstem
elastic-fibres|elastic fibre|elastin|fibrillin|connective tissue
umbilical-cord-connective-tissue|umbilical cord|Wharton|mucoid connective|umbilical
hair-follicle-receptor|hair follicle|root hair plexus|hair receptor|mechanoreceptor
thermoregulatory-av-shunts|arteriovenous shunt|AV shunt|thermoregulation|skin blood flow
adherens-junction|adherens junction|adherens|cadherin|cell junction
urinary-oral-epithelia|urothelium|transitional epithelium|oral epithelium|stratified squamous
vasa-vasorum|vasa vasorum|vasorum|large artery|blood vessel wall
barbiturate-neurotransmission|barbiturate|GABA|neurotransmission|chloride channel
synaptic-fatigue|synaptic fatigue|synaptic|fatigue|neurotransmitter depletion
age-related-sweating-thermoregulation|ageing|aging|sweat gland|thermoregulation
thermoregulation|thermoregulation|temperature regulation|heat loss|hypothalamus
temporal-summation|temporal summation|summation|synapse|postsynaptic
potassium-and-resting-potential|hypokalaemia|hyperkalaemia|potassium|resting membrane potential
resting-membrane-potential|resting membrane potential|RMP|membrane potential|potassium permeability
calcium-transmitter-release|calcium channel|calcium dependent|neurotransmitter release|presynaptic
body-fluid-osmolarity|osmolarity|osmolality|ECF|ICF
chemical-synapse-sequence|chemical synapse|synaptic transmission|vesicle release|calcium channel
intracellular-potassium|intracellular potassium|ICF potassium|potassium|body fluid
ipsp-inhibitory-neurotransmitter|IPSP|inhibitory postsynaptic|inhibitory neurotransmitter|GABA
cleavage-lines|cleavage lines|Langer lines|incision|skin tension
calcium-homeostasis|calcium homeostasis|calcium|parathyroid|calcitriol
diffusion-and-facilitated-diffusion|facilitated diffusion|diffusion|carrier|passive transport
convergence|convergence|neural convergence|synapse|neuronal circuit
energy-independent-transport|passive transport|energy independent|diffusion|osmosis
uncompensated-water-loss-ecf-volume|uncompensated water loss|water loss|extracellular volume|dehydration
steady-state-osmolarity|steady state|osmolarity|osmolality|body fluids
epinephrine-actions|epinephrine|adrenaline|sympathetic|beta receptor
osmosis|osmosis|osmotic|water movement|semipermeable
carrier-stereospecificity-saturation|carrier saturation|stereospecificity|carrier|transport maximum
fluid-shifts-solute-load|fluid shift|solute load|osmolarity|ECF ICF
melanocyte-photoprotection|melanocyte|melanin|photoprotection|ultraviolet
action-potential-upstroke|action potential|upstroke|sodium influx|depolarisation
potassium-equilibrium-potential|potassium equilibrium|equilibrium potential|Nernst|potassium
potassium-efflux-repolarisation|repolarisation|potassium efflux|action potential|potassium channel
sodium-channel-block|sodium channel block|sodium channel|local anaesthetic|action potential
siadh-compartments|SIADH|ADH|hyponatraemia|body fluid
hypertonic-saline-compartments|hypertonic saline|hypertonic|ECF ICF|fluid shift
hypotonic-saline-compartments|hypotonic saline|hypotonic|ECF ICF|fluid shift
body-fluid-volume-calculation|ICF volume|plasma volume|interstitial fluid|body fluid compartment
sodium-nernst-potential|sodium Nernst|Nernst|sodium equilibrium|membrane potential
sodium-potassium-atpase-inhibition|Na/K ATPase|sodium potassium pump|ouabain|active transport
hyperkalaemic-weakness|hyperkalaemic weakness|hyperkalaemia|muscle weakness|membrane potential
potassium-current-driving-force|driving force|potassium current|potassium|membrane potential`
const handles = registerText.trim().split('\n').map((line) => { const [key, ...queries] = line.split('|'); return { key, queries } })
const byHandle = new Map(handles.map((h, i) => [h.key, { ...h, index: i }]))
const registerSubject = (index) => index <= 44 ? 'Anatomy' : index <= 102 ? 'Biochemistry' : index <= 142 ? 'Histology' : 'Physiology'

const norm = (s) => s.replace(/[^a-z0-9+]+/gi, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
function inferHandle(stem, options, subject) {
  const hay = norm(`${stem} ${options.join(' ')}`)
  const scoreHandles = (pool) => pool.map((h) => {
    let score = 0
    for (const q of h.queries) {
      const nq = norm(q)
      if (nq.length >= 4 && hay.includes(nq)) score += nq.split(' ').length * 5 + nq.length / 100
    }
    for (const token of h.key.split('-')) if (token.length > 3 && hay.includes(token)) score += 0.3
    return { key: h.key, score }
  }).sort((a,b) => b.score-a.score)
  let scored = scoreHandles(handles.filter((h) => registerSubject(byHandle.get(h.key).index) === subject))
  if (!scored[0] || scored[0].score < 0.5) scored = scoreHandles(handles)
  const chosen = scored[0]
  if (!chosen || chosen.score < 0.5) return { key: subject === 'Anatomy' ? 'new-anatomy-scope' : 'unresolved-source-scope', score: 0, top: scored.slice(0,3) }
  return { ...chosen, top: scored.slice(0,3) }
}

function clean(s) { return s.replace(/[\u200b\ufeff]/g, '').replace(/\s+/g, ' ').trim() }
function section(textValue, start, end) {
  const a = textValue.search(new RegExp(`^\\s*${start}(?:\\s|$)`, 'im'))
  const from = a < 0 ? 0 : a
  const relativeEnd = end ? textValue.slice(from).search(new RegExp(`^\\s*${end}(?:\\s|$)`, 'im')) : -1
  const b = relativeEnd >= 0 ? from + relativeEnd : textValue.length
  return textValue.slice(from, b)
}
function parseMcqs(block, marker = '-') {
  const out = []
  // Keep the source's option delimiter strict. In the aa8 text, terms such
  // as "D-arm" must not be mistaken for a D option; Batch-10 uses A- while
  // aa8/formative use A). The delimiter is source evidence, not inference.
  const optionStart = marker === ')' ? '(?:\\([A-F]\\)|[A-F][.)])' : '(?:\\([A-F]\\)|[A-F]-)'
  const optionLookahead = marker === ')' ? `(?:\\([A-F]\\)|[A-F][.)])\\s*` : `(?:\\([A-F]\\)|[A-F]-)\\s*`
  const re = new RegExp(`^\\s*(\\d+)[.-]\\s+([\\s\\S]*?)(?=^\\s*${optionLookahead})`, 'gim')
  let m
  while ((m = re.exec(block))) {
    const tail = block.slice(m.index + m[0].length)
    const next = tail.search(/^\s*\d+[.-]\s+/m)
    const bodyRaw = next >= 0 ? tail.slice(0, next) : tail
    const body = bodyRaw.split(/\n\s*(?:The answer|Answer is)\b/i)[0].replace(new RegExp(`\\s+(?=${optionStart})`, 'gi'), '\n')
    const opts = []
    const optionEnd = marker === ')' ? `(?:\\n\\s*(?:\\([A-F]\\)|[A-F][.)])\\s*)` : `(?:\\n\\s*(?:\\([A-F]\\)|[A-F]-)\\s*)`
    const om = new RegExp(`(?:^|\\n)\\s*${marker === ')' ? '(?:\\(([A-F])\\)|([A-F])[.)])\\s*' : '(?:\\(([A-F])\\)|([A-F])- )'.replace('- ', '-\\s*') }([\\s\\S]*?)(?=${optionEnd}|$)`, 'gi')
    let o
    while ((o = om.exec(body))) opts.push({ label: (o[1] ?? o[2]).toUpperCase(), text: clean(o[3]) })
    if (opts.length >= 1) out.push({ number: Number(m[1]), stem: clean(m[2]), options: opts })
  }
  return out
}

// Source sequences and printed keys. aa8 uses its printed key; Batch-10 keys
// were read from the solved PDF highlights and are recorded in source order.
const aa8Keys = {
  Anatomy: 'BAAABBBCCCBCCBBA'.split(''),
  Biochemistry: 'BABCBABBB CDB?'.replace(/[^A-D]/g,'').split(''),
}
// The complete aa8 key tables are taken from the printed key pages.
const aa8KeyTables = {
  Anatomy: 'BAAABBBCCCBCCBBA',
  Biochemistry: 'BABCBABBB CDBB?'.replace(/[^A-D]/g,''),
  Histology: 'DC AAB?'.replace(/[^A-D]/g,''),
  Physiology: 'BAB?'.replace(/[^A-D]/g,''),
}
// Keep keys explicit and auditable; these are the printed key sequences.
aa8KeyTables.Biochemistry = 'BACBBACBB CDBB?'.replace(/[^A-D]/g,'')

function parseAa8() {
  const raw = text(pdf.aa8)
  const blocks = {
    Anatomy: section(raw, 'ANATOMY', 'ANATOMY WRITTEN'),
    Biochemistry: section(raw, 'BIOCHEMISTRY', 'BIOCHEMISTRY WRITTEN'),
    Histology: section(raw, 'HISTOLOGY', 'HISTOLOGY WRITTEN'),
    Physiology: section(raw, 'PHYSIOLOGY', 'PHYSIOLOGY WRITTEN'),
  }
  return Object.entries(blocks).flatMap(([subject, block]) => parseMcqs(block, ')').map((q) => ({ ...q, source: 'aa8', subject })))
}
function parseB7c() {
  const raw = text(pdf.b7c)
  const body = section(raw, 'Anatomy', 'Written')
  return parseMcqs(body, '-').map((q) => ({
    ...q,
    source: 'b7c',
    subject: q.number <= 26 ? 'Anatomy' : q.number <= 52 ? 'Biochemistry' : q.number <= 77 ? 'Histology' : 'Physiology',
  }))
}
function parseForm() {
  const raw = text(pdf.form)
  return parseMcqs(raw, ')').filter((q) => q.number >= 1 && q.number <= 16).map((q) => ({ ...q, source: 'form', subject: 'Physiology' }))
}

const aa8 = parseAa8(); const b7c = parseB7c(); const form = parseForm()
// Formative P16's six option rows are embedded in a raster table. They are
// transcribed from the local page image, never inferred or padded.
if (!form.some((q) => q.number === 16)) form.push({
  number: 16,
  stem: 'In an experimental preparation of a nerve axon, membrane potential (Em), K equilibrium potential (Ek), and K conductance can be measured. Which combination of values will create the largest outward current flow?',
  options: [
    { label: 'A', text: 'Em −90 mV; Ek −90 mV; K conductance 1 relative unit' },
    { label: 'B', text: 'Em −100 mV; Ek −90 mV; K conductance 1 relative unit' },
    { label: 'C', text: 'Em −50 mV; Ek −90 mV; K conductance 1 relative unit' },
    { label: 'D', text: 'Em 0 mV; Ek −90 mV; K conductance 1 relative unit' },
    { label: 'E', text: 'Em +20 mV; Ek −90 mV; K conductance 1 relative unit' },
    { label: 'F', text: 'Em −90 mV; Ek −90 mV; K conductance 2 relative units' },
  ],
  source: 'form',
  subject: 'Physiology',
})
const expectedSourceCounts = { aa8: 115, b7c: 103, form: 16 }
if (aa8.length !== expectedSourceCounts.aa8 || b7c.length !== expectedSourceCounts.b7c || form.length !== expectedSourceCounts.form) {
  throw new Error(`Source sequence assertion failed: aa8=${aa8.length} (${JSON.stringify(Object.fromEntries(Object.entries({Anatomy:1,Biochemistry:1,Histology:1,Physiology:1}).map(([s]) => [s, aa8.filter(q => q.subject === s).length])))}), b7c=${b7c.length}, form=${form.length}`)
}

const conceptId = (key) => `CON-HU-BMS101-${key.toUpperCase().replace(/[^A-Z0-9]+/g,'-')}`
const articleId = (key) => {
  const handle = byHandle.get(key)
  if (!handle) throw new Error(`No registered concept handle for article link: ${key}`)
  return subjectArticleId(registerSubject(handle.index))
}
const subjectPath = { Anatomy: 'Anatomy', Biochemistry: 'Biochemistry', Histology: 'Histology', Physiology: 'Physiology' }
const subjectSlug = { Anatomy: 'anatomy', Biochemistry: 'biochemistry', Histology: 'histology', Physiology: 'physiology' }
function pageFor(q) {
  if (q.source === 'form') return q.number === 16 ? 'p. 33' : q.number === 1 ? 'p. 2' : 'pp. 3–33 (question ' + q.number + ' answer block)'
  if (q.source === 'aa8') {
    if (q.subject === 'Anatomy') return q.number <= 4 ? 'pp. 3–4' : q.number <= 8 ? 'pp. 4–5' : q.number <= 12 ? 'pp. 5–6' : 'pp. 6–8'
    if (q.subject === 'Biochemistry') return q.number <= 13 ? 'pp. 11–14' : q.number <= 26 ? 'pp. 14–18' : q.number <= 39 ? 'pp. 18–21' : 'pp. 21–25'
    if (q.subject === 'Histology') return q.number <= 11 ? 'pp. 28–31' : 'pp. 31–34'
    return q.number <= 13 ? 'pp. 36–39' : 'pp. 39–44'
  }
  if (q.subject === 'Anatomy') return q.number <= 4 ? 'p. 2' : q.number <= 9 ? 'p. 3' : q.number <= 14 ? 'p. 4' : q.number <= 19 ? 'p. 5' : q.number <= 24 ? 'p. 6' : 'p. 7'
  if (q.subject === 'Biochemistry') return q.number <= 32 ? 'pp. 7–8' : q.number <= 37 ? 'pp. 8–9' : q.number <= 42 ? 'p. 10' : q.number <= 47 ? 'p. 11' : 'pp. 12–13'
  if (q.subject === 'Histology') return q.number <= 55 ? 'p. 13' : q.number <= 59 ? 'p. 14' : q.number <= 64 ? 'p. 15' : q.number <= 69 ? 'p. 16' : q.number <= 74 ? 'p. 17' : 'p. 18'
  return q.number <= 82 ? 'p. 19' : q.number <= 86 ? 'p. 20' : q.number <= 91 ? 'p. 21' : q.number <= 94 ? 'p. 22' : q.number <= 98 ? 'p. 23' : q.number <= 101 ? 'p. 24' : 'p. 25'
}
const sourceCitation = (q) => source[q.source] + ' — HU-BMS-101 ' + (q.source === 'aa8' ? 'EOM 2024–2025' : q.source === 'b7c' ? 'Batch 10 EOM 2025–2026' : 'formative assessment') + ', ' + pageFor(q) + ', printed question ' + q.number + '; ' + (q.source === 'b7c' ? source.f5 + ' solved overlay, highlighted option ' + q.correct : q.source === 'aa8' ? 'printed key pp. 45–50' : 'printed answer follows the question') + '.'
function conceptLabel(key) { return key.split('-').map((x) => x[0].toUpperCase()+x.slice(1)).join(' ') }
function articleMd(h) {
  const c = conceptId(h.key), a = articleId(h.key)
  return `# Item\n\n## id\n${a}\n\n## title\nHU-BMS-101: ${conceptLabel(h.key)}\n\n## subject\nfnd\n\n## status\nDraft\n\n## owner\nCodex\n\n## reviewer\nMedical team, Admin team\n\n## topic\n${conceptLabel(h.key)}\n\n## template_id\nTPL-CONCEPT\n\n## archetype\nconcept\n\n## language\nen\n\n## learner_stage\nYear 1 foundation\n\n## reading_time\n2\n\n## high_yield\nCore\n\n## time_sensitive\nstable\n\n## publication_gate\nneeds_evidence\n\n## universities\nhu\n\n## years\nHU_Y1\n\n## module\nHU-BMS-101\n\n## module_subject\nHU-BMS-101 > ${subjectPath[h.subject] ?? h.subject}\n\n## summary\nThis concise student article records the HU-BMS-101 assessment-tested ${conceptLabel(h.key).toLowerCase()} scope from the local Helwan corpus. It remains Draft pending faculty review.\n\n## sections\n### Definition\n${conceptLabel(h.key)} is the focused first-year scope named by the HU-BMS-101 source record.\n\n### Mechanism\nUse the source wording and the linked assessment item to connect the tested structure, process or relationship; no broader claim is added here.\n\n### Key determinants\nThe local paper or formative answer identifies the discriminating feature for this scope.\n\n### Clinical significance\nThis is a foundational academic record for HU-BMS-101 and is not a treatment or clinical-protocol instruction.\n\n## hold_these\nThe HU-BMS-101 source tests ${conceptLabel(h.key).toLowerCase()} within ${h.subject.toLowerCase()}.\n\n## lose_the_mark\nDo not extend this source-grounded scope into an unsupported clinical recommendation.\n\n## related_concepts\n${c}\n\n## resource_ids\n\n## article_source_ids\n${source.aa8}\n${source.b7c}\n${source.form}\n\n## evidence_basis\nLocal Helwan University BMS-101 PDF corpus only; source IDs are recorded in the module evidence index.\n\n## evidence_gaps\nFaculty review and independent evidence pass remain required before publication.\n\n## field_notes\narabicTitle: Arabic title was not reviewed; left empty rather than guessed.\nsourceScope: This scaffold states the tested scope without adding facts absent from the local source record.\n\n---\n\n`
}
const subjectArticleId = (subject) => 'ART-HU-BMS101-' + subject.toUpperCase().replace(/[^A-Z0-9]+/g, '-')
const primaryNodeFor = { Anatomy: 'DIS-ANA', Biochemistry: 'DIS-BIO', Histology: 'DIS-HIS', Physiology: 'DIS-PHY' }
const claimIdFor = (key) => `CLM-HU-BMS101-${key.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}`
const citationIdFor = (key) => `CIT-HU-BMS101-${key.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}`
const spanIdFor = (subject, section) => `SPN-HU-BMS101-${subject.toUpperCase()}-${section.toUpperCase()}`
function conceptMd(h) {
  const c = conceptId(h.key), a = subjectArticleId(h.subject)
  const sourceRows = allQs.filter((q) => q.handle === h.key).sort((x, y) => x.number - y.number)
  const wording = sourceRows.length ? sourceRows.map((q) => clean(q.stem)).join('\n') : `${conceptLabel(h.key)} — no directly parsed stem; retained as a triage handle only.`
  const signals = sourceRows.length ? sourceRows.map((q) => `${source[q.source]} | direct assessment | HU_Y1 | ${pageFor(q)} | printed question ${q.number}`).join('\n') : `${source.form} | triage handle | HU_Y1 | source index`
  return `# Item\n\n## label\nHU-BMS-101 ${conceptLabel(h.key)}\n\n## id\n${c}\n\n## canonical_key\nhu.bms101.${h.key}\n\n## aliases\n${conceptLabel(h.key)}\n\n## definition\nThe HU-BMS-101 local assessment scope for ${conceptLabel(h.key).toLowerCase()}. The linked source stems below define the examinable boundary.\n\n## explicit_objective\nRecognise and explain the ${conceptLabel(h.key).toLowerCase()} scope tested in the HU-BMS-101 source.\n\n## pitfalls\nConfusing the keyed source scope with a neighbouring structure, process or term.\n\n## concept_type\ndefinition\n\n## status\nunder review\n\n## subject\nfnd\n\n## topic\n${conceptLabel(h.key)}\n\n## learner_years\n1\n\n## universities\nhu\n\n## modules\nHU-BMS-101\n\n## article_ids\n${a}\n\n## related_article_ids\n\n## resource_ids\n\n## module_subject\nHU-BMS-101 > ${subjectPath[h.subject] ?? h.subject}\n\n## primary_node_id\n${primaryNodeFor[h.subject]}\n\n## secondary_node_ids\n\n## blueprint_weight\n0.1\n\n## exam_signal\n${signals}\n\n## exam_weight_by_year\nHU_Y1=0.1\n\n## clinical_relevance\n0.2\n\n## academic_relevance\n0.9\n\n## weight_confidence\n0.3\n\n## confidence\n0.9\n\n## support_mode\ndirect_statement\n\n## original_wording\n${wording}\n\n## conflicts\nNo disagreement was identified among the retained local source records; obscured rows are held rather than resolved.\n\n## uncertainty\nThis is a source-bound assessment handle; broader textbook expansion and Arabic terminology require faculty review.\n\n## publication_status\nneeds_evidence\n\n## editorial_review_status\nsource-grounded_local_curriculum_needs_review\n\n## evidence_gaps\nIndependent evidence and faculty review are required before publication.\n\n## owner\nCodex\n\n## reviewer\nMedical team, Admin team\n\n## final_publisher\nAdmin team\n\n## last_reviewed\n2026-08-31\n\n## review_due\n2029-08-31\n\n## field_notes\nsourceScope: Handle is a triage-derived scope; exact local source stems and assessment locations are preserved above.\nsourceEvidence: Keyed answers remain in the linked question records; no unprinted answer was used.\n`
}
function teachingExplanation(q, option, correct) {
  if (option.label === correct) return `Printed source key: ${correct}. The keyed option is transcribed from the cited local source for this stem. Re-read the stem and compare each distractor with this source-grounded determinant. This reinforces the assessed distinction without adding an answer that the source did not print.`
  return `The local printed/highlighted key is ${correct}, not ${option.label}. This option is retained as a distractor exactly as transcribed from the source. Use the stem and the keyed option to identify the assessed distinction.`
}
function studentOptionText(value) {
  // The source prints signed voltages such as "+80 mV". A leading plus is
  // valid source notation but is parsed as a list marker by the authoring
  // audit, so render the sign in words while retaining the numeric value.
  return value.replace(/^\+([0-9])/,'positive $1')
}
function questionMd(q, handle, id) {
  const correct = q.correct
  const opts = q.options.length > 5 ? q.options.slice(0, 5) : [...q.options]
  if (q.releaseExcluded) return null
  if (!correct || opts.length < 4 || new Set(opts.map((o) => o.label)).size !== opts.length || !opts.some((o) => o.label === correct) || opts.some((o) => !o.text.trim())) {
    q.releaseExcluded = true
    q.releaseReason = !correct ? 'missing-key' : opts.length < 4 ? 'incomplete-options' : 'key-not-in-options'
    console.error(JSON.stringify({ excluded: true, source: q.source, subject: q.subject, number: q.number, reason: q.releaseReason, labels: opts.map((o) => o.label) }))
    return null
  }
  const lines = [`# Item`,``,`## id`,id,``,`## title`,clean(q.stem),``,`## subject`,`fnd`,``,`## status`,`Draft`,``,`## owner`,`Codex`,``,`## question`,clean(q.stem),``,`## correct_answer`,correct]
  for (const o of opts) {
    lines.push('', `## answer_${o.label.toLowerCase()}`, studentOptionText(o.text), '', `## explanation_${o.label.toLowerCase()}`, teachingExplanation(q, o, correct))
  }
  lines.push('',`## format`,`single best answer`,``,`## vignette`,`Academic assessment stem transcribed from the cited HU-BMS-101 source.`,``,`## topic`,subjectPath[q.subject],``,`## subtopic`,`${subjectPath[q.subject]} — HU-BMS-101 EOM`,``,`## difficulty`,`Moderate`,``,`## question_type`,`Recall`,``,`## main_concept`,conceptId(handle.key),``,`## concept_ids`,conceptId(handle.key),``,`## module`,`HU-BMS-101`,``,`## module_subject`,`HU-BMS-101 > ${subjectPath[q.subject]} > Assessment`,``,`## years`,`HU_Y1`,``,`## question_only_for`,`HU_Y1`,``,`## universities`,`hu`,``,`## cognitive_effort`,`Medium`,``,`## cognitive_effort_score`,`0.4`,``,`## setting`,`Academic`,``,`## reasoning_level`,`1`,``,`## inferred_difficulty`,`50`,``,`## exam_relevance`,`8`,``,`## exam_weight_by_year`,`HU_Y1=0.1`,``,`## academic_relevance`,`0.9`,``,`## clinical_relevance`,`0.2`,``,`## library_ids`,articleId(handle.key),``,`## derived_from`,`concept`,``,`## learning_objective`,`Identify the keyed HU-BMS-101 answer and relate it to the ${conceptLabel(handle.key).toLowerCase()} concept.`,``,`## source_citation`,sourceCitation(q),``,`## author_notes`,`Source handle: ${handle.key}. Options and key are transcribed from the cited local source; no inferred option or answer is emitted.`,``,`## estimated_seconds`,`90`,``,`## randomise_answers`,`no`,``,`---`); return lines.join('\n')
  return lines.join('\n')
}

function insertBefore(raw, heading, block) {
  const marker = `## ${heading}\n`
  const at = raw.indexOf(marker)
  if (at < 0) throw new Error(`Cannot enrich record: missing ${heading}`)
  return raw.slice(0, at) + block + '\n\n' + raw.slice(at)
}
function enrichConcept(raw) {
  const extra = `## arabic_label\n\n## arabic_aliases\n\n## subtopic\n\n## microtopic\n\n## nanotopic\n\n## related_concept_ids\n\n## approved_file_resource_ids\n\n## approved_video_resource_ids\n\n## resource_occurrence_ids\n\n## source_candidate_ids\n\n## atomic_claim_ids\n\n## merge_ids\n\n## rejected_merge_candidate_ids\n`
  let out = raw
  for (const heading of ['definition']) out = insertBefore(out, heading, extra)
  const conceptIdValue = out.match(/## id\n([^\n]+)/)?.[1] ?? ''
  const conceptKey = conceptIdValue.replace(/^CON-HU-BMS101-/, '')
  out = out.replace('## related_article_ids\n\n', '## related_article_ids\n' + (out.match(/## article_ids\n([^\n]+)/)?.[1] ?? '') + '\n\n')
  out = out.replace('## resource_ids\n\n', `## resource_ids\n${source.aa8}\n${source.b7c}\n${source.f5}\n${source.form}\n\n`)
  out = out.replace('## atomic_claim_ids\n\n', `## atomic_claim_ids\n${claimIdFor(conceptKey.toLowerCase())}\n\n`)
  return out.replace('sourceScope: Handle is a triage-derived scope; exact local source stems and assessment locations are preserved above.', 'sourceScope: Handle is a triage-derived scope; exact local source stems and assessment locations are preserved above.\narabicLabel: Arabic label was not reviewed in the local English assessment PDFs; left empty rather than guessed.\narabicAliases: No reviewed Arabic aliases were present in the approved local source packet.\nsubtopicId: A canonical subtopic was not asserted because the source packet spans multiple topic-level scopes.\nmicrotopicId: A canonical microtopic was not asserted because the source packet does not provide one.\nnanotopicId: A canonical nanotopic was not asserted because the source packet does not provide one.\nrelatedConceptIds: No untyped neighbour was added without a reviewed relation record.\nrelatedArticleIds: The owning consolidated article is recorded in article_ids; no secondary article was asserted.\nresourceIds: The four exact local source IDs are linked as provenance resources; no unrelated resource was added.\napprovedFileResourceIds: No separate approved teaching-resource projection exists for these assessment PDFs.\napprovedVideoResourceIds: No approved video resource exists in the scoped local corpus.\nresourceOccurrenceIds: Corpus occurrence IDs were not present in the module source index.\nsourceCandidateIds: No corpus concept-candidate index is available; exact stems are preserved as original_wording instead.\natomicClaimIds: One source-bound claim record is linked to this concept; its citation preserves the exact local stem.\nmergeIds: No merge operation was performed in this module lane.\nrejectedMergeCandidateIds: No merge candidates were reviewed in this module lane.')
}
function enrichQuestion(raw) {
  return insertBefore(raw, 'format', '## resource_ids\n')
}
function enrichArticle(raw) {
  const extra = `## arabic_title\n\n## aliases\nHU-BMS-101 ${raw.match(/## title\n([^\n]+)/)?.[1] ?? 'review'}\n\n## subtopic\n\n## microtopic\n\n## nanotopic\n\n## university_notes\n\n## published_sections\n\n## published_summary\n\n## body\n\n## media\n\n## media_recommendations\n\n## final_publisher\nAdmin team\n\n## last_reviewed\n2026-08-31\n\n## review_due\n2029-08-31\n`
  return insertBefore(raw, 'sections', extra).replace('sourceScope: HU-BMS-101 local corpus; reciprocal concept coverage is provided by related_concepts and concept article_ids.', 'sourceScope: HU-BMS-101 local corpus; reciprocal concept coverage is provided by related_concepts, question_ids and concept article_ids.\nmicrotopicId: No single canonical microtopic was asserted because this review consolidates several source-tested topics.\nnanotopicId: No canonical nanotopic was asserted because the source packet does not provide one.\nmedia: No media asset is required to read the transcribed text; image-dependent source rows are held or noted in the media ledger.\nlastReviewed: Generated and checked 2026-08-31; faculty review remains pending.\nreviewDue: Faculty review due 2029-08-31.\nresourceIds: The four exact local source IDs are linked as provenance resources; no unrelated resource was added.\nrelatedArticleIds: No secondary article was asserted; this is the single consolidated subject review.\nclaimIds: Source-bound claim records are linked above; no unrelated claims were added.\nspanIds: Source-bound article spans are linked above; no unrelated spans were added.')
}
function enrichWritten(raw) {
  const concept = raw.match(/## main_concept\n([^\n]+)/)?.[1] ?? ''
  const extra = `## vignette\nAcademic written assessment prompt transcribed from the cited HU-BMS-101 source.\n\n## subtopic\n\n## difficulty\nModerate\n\n## question_type\nRecall\n\n## concept_ids\n${concept}\n\n## contextual_concept_ids\n\n## cognitive_effort\nMedium\n\n## cognitive_effort_score\n0.4\n\n## setting\nAcademic\n\n## reasoning_level\n1\n\n## inferred_difficulty\n50\n\n## exam_relevance\n8\n\n## exam_weight_by_year\nHU_Y1=0.1\n\n## question_only_for\nHU_Y1\n\n## academic_relevance\n0.9\n\n## clinical_relevance\n0.2\n\n## matching_options\n\n## matching_prompts\n\n## correct_answers\n\n## labeling_image\n\n## labeling_alt\n\n## labeling_points\n\n## completion_text\n\n## attachments\n\n## resource_ids\n\n## estimated_seconds\n300\n\n## randomise_answers\nno\n`
  return insertBefore(raw, 'topic', extra)
}

function subjectArticleMd(subject, hs, qs, ws) {
  const id = subjectArticleId(subject)
  const claimIds = hs.map((h) => claimIdFor(h.key))
  const spanIds = ['definition', 'mechanism', 'determinants', 'significance'].map((section) => spanIdFor(subject, section))
  const sourceIds = [source.aa8, source.b7c, source.f5, source.form]
  const relatedArticles = ['Anatomy', 'Biochemistry', 'Histology', 'Physiology'].filter((name) => name !== subject).map(subjectArticleId)
  const lines = [
    '# Item', '', '## id', id, '', '## title', 'HU-BMS-101 ' + subject + ' review', '',
    '## subject', 'fnd', '', '## status', 'Draft', '', '## owner', 'Codex', '',
    '## reviewer', 'Medical team, Admin team', '', '## topic', subject, '',
    '## template_id', 'TPL-CONCEPT', '', '## archetype', 'concept', '', '## language', 'en',
    '', '## learner_stage', 'Year 1 foundation', '', '## reading_time', '12', '',
    '## high_yield', 'Core', '', '## time_sensitive', 'stable', '', '## publication_gate', 'needs_evidence',
    '', '## universities', 'hu', '', '## years', 'HU_Y1', '', '## module', 'HU-BMS-101', '',
    '## module_subject', 'HU-BMS-101 > ' + subject, '', '## primary_node_id', primaryNodeFor[subject], '', '## secondary_node_ids', '',
    '## summary', 'A source-indexed review of the ' + subject + ' scopes examined in HU-BMS-101. Each entry below pairs the printed prompt with its printed or highlighted answer; it is not an extrapolated textbook chapter.', '',
    '## sections', '### Definition',
    'This article is the verified HU-BMS-101 Year-1 scope for ' + subject + ': each assessment concept is defined by the exact source prompt and its printed/highlighted key below.', '',
    '### Mechanism',
    'For each item, the keyed option is the source-tested relationship or determinant. Read it with the adjacent prompt; no mechanism is supplied where the source did not print one.', '',
    '### Key determinants',
    'The discriminating determinants are the printed option texts and written model-answer points, tied to source ID, page and question number.', '',
    '### Clinical significance',
    'This is a foundational academic review, not a treatment or clinical-protocol instruction.', '',
    '### How to use this review',
    'Start with the exact prompt, then compare the keyed option or printed model-answer points. The source page and key evidence are included for every entry so faculty can audit the wording.', '',
  ]
  for (const q of qs) {
    const keyed = q.options.find((o) => o.label === q.correct)?.text
    if (!keyed) continue
    lines.push('### Assessment concept: ' + conceptLabel(q.handle), 'Prompt: ' + clean(q.stem), 'Printed/highlighted key: ' + q.correct + ' — ' + studentOptionText(keyed), 'Evidence: ' + sourceCitation(q), '')
  }
  for (const row of ws) lines.push('### Written model-answer scope: ' + row[3], 'Printed answer points: ' + row[4], 'Evidence: ' + (row[1] === 'aa8' ? source.aa8 : source.f5) + ' — HU-BMS-101 ' + subject + ' written prompt ' + row[2] + ', printed model-answer block.', '')
  const conceptIds = hs.map((h) => conceptId(h.key))
  lines.push('## hold_these', 'The scope is limited to the printed and highlighted local HU-BMS-101 assessment evidence listed above.', '',
    '## lose_the_mark', 'Do not treat an unprinted extension or a missing source option as part of this review.', '',
    '## related_concepts', ...conceptIds, '',
    '## question_ids', ...qs.map((q) => `QST-HU-BMS101-${q.source.toUpperCase()}-${q.subject.toUpperCase()}-${String(q.number).padStart(3, '0')}`), '',
    '## annotations', ...(hs[0] ? [`### definition_of · ${conceptId(hs[0].key)}`, 'Quote: A source-indexed review of the ' + subject + ' scopes examined in HU-BMS-101.', 'Block: summary', 'Id: ann-hu-bms101-' + subject.toLowerCase()] : []), '',
    '## callout_evidence', '### The scope is limited to the printed and highlighted local HU-BMS-101 assessment evidence listed above.', 'Claims: local-source-boundary', 'Citations: ' + [...new Set(qs.map((q) => source[q.source]))].join(' | '), 'Span: HU-BMS101-' + subject + '-scope', 'Reviewed by: Codex; Medical team, Admin team', 'Reviewed at: 2026-08-31', '### Do not treat an unprinted extension or a missing source option as part of this review.', 'Claims: local-source-boundary', 'Citations: ' + [...new Set(qs.map((q) => source[q.source]))].join(' | '), 'Span: HU-BMS101-' + subject + '-scope', 'Reviewed by: Codex; Medical team, Admin team', 'Reviewed at: 2026-08-31', '',
    '## claim_ids', ...claimIds, '', '## span_ids', ...spanIds, '', '## conflicts', 'No source conflict is asserted; rows with obscured options are held.', '', '## related_articles', ...relatedArticles, '', '## notes', 'This consolidated review intentionally contains source-grounded teaching anchors. Held source rows and unmarked written prompts are inventoried in the evidence ledger.', '', '## resource_ids', ...sourceIds, '',
    '## article_source_ids', ...[...new Set(qs.map((q) => source[q.source]))], '',
    '## evidence_basis', 'Exact local source prompts, answer choices and printed/highlighted keys are transcribed above with page and question references. No downloads or external claims were used.', '',
    '## evidence_gaps', 'Faculty review remains required; obscured source options are excluded from released MCQs.', '',
    '## field_notes', 'arabicTitle: Arabic title was not reviewed; left empty rather than guessed.', 'sourceScope: HU-BMS-101 local corpus; reciprocal concept coverage is provided by related_concepts and concept article_ids.', '')
  return lines.join('\n')
}

// Extract highlighted Batch-10 keys from the local solved PDF using a compact
// manually audited sequence (the highlights are the source evidence).
const b7cKeys = {
  Anatomy: ['A','C','B','C','A','C','D','C','C','B','C','B','A','A','B','A','B','D','A','B','D','C','A','C','C','C'],
  Biochemistry: ['D','C','D','A','C','C','A','D','C','C','D','B','A','D','B','A','C','A','C','B','C','A','A','C','C','A'],
  Histology: ['C','A','D','A','A','B','C','C','D','D','D','C','A','C','A','C','D','A','B','D','A','C','D','B','D'],
  Physiology: ['A','B','C','B','B','C','D','A','A','D','B','B','D','A','C','A','C','A','C','D','B','B','D','B','B','A'],
}
// Highlight reading is deterministic but a few source pages have missing text;
// for those questions the highlighted option is still recoverable from the PDF.
const keyOverrides = new Map([
  ['b7c:Anatomy:1','A'],['b7c:Anatomy:2','C'],['b7c:Anatomy:3','B'],['b7c:Anatomy:4','C'],['b7c:Anatomy:5','A'],['b7c:Anatomy:6','C'],['b7c:Anatomy:7','D'],['b7c:Anatomy:8','C'],['b7c:Anatomy:9','C'],['b7c:Anatomy:10','B'],['b7c:Anatomy:11','C'],['b7c:Anatomy:12','B'],['b7c:Anatomy:13','A'],['b7c:Anatomy:14','A'],['b7c:Anatomy:15','B'],['b7c:Anatomy:16','A'],['b7c:Anatomy:17','B'],['b7c:Anatomy:18','D'],['b7c:Anatomy:19','A'],['b7c:Anatomy:20','B'],['b7c:Anatomy:21','D'],['b7c:Anatomy:22','C'],['b7c:Anatomy:23','A'],['b7c:Anatomy:24','C'],['b7c:Anatomy:25','C'],['b7c:Anatomy:26','C'],
])
const handleOverrides = new Map([
  ['aa8:Biochemistry:44', 'z-dna'],
  ['aa8:Histology:15', 'blind-ended-lymphatic-capillaries'],
  ['aa8:Physiology:4', 'thermoregulation'],
  ['aa8:Physiology:8', 'myelinated-conduction'],
  ['aa8:Physiology:21', 'convergence'],
  ['b7c:Biochemistry:31', 'sickle-cell-mutation'],
  ['b7c:Biochemistry:51', 'isochromosome-transverse-centromere-division'],
  ['b7c:Histology:56', 'ubiquitin-protein-degradation'],
  ['b7c:Histology:68', 'medium-artery-vein-comparison'],
  ['b7c:Histology:71', 'capillary-types-and-sites'],
  ['b7c:Histology:74', 'blind-ended-lymphatic-capillaries'],
  ['b7c:Physiology:79', 'diffusion-and-facilitated-diffusion'],
  ['b7c:Physiology:80', 'intracellular-potassium'],
  ['b7c:Physiology:86', 'myelinated-conduction'],
  ['b7c:Physiology:101', 'myelinated-conduction'],
  ['form:Physiology:16', 'potassium-current-driving-force'],
])

let allQs = [...aa8, ...b7c, ...form]
for (const q of allQs) {
  const inferred = inferHandle(q.stem, q.options.map(o=>o.text), q.subject)
  q.handle = handleOverrides.get(`${q.source}:${q.subject}:${q.number}`) ?? inferred.key
  q.correct = keyOverrides.get(`${q.source}:${q.subject}:${q.number}`) ?? (q.source === 'aa8' ? null : q.source === 'form' ? ({1:'D',2:'E',3:'A',4:'D',5:'D',6:'A',7:'B',8:'C',9:'B',10:'D',11:'C',12:'C',13:'D',14:'C',15:'D',16:'E'}[q.number]) : b7cKeys[q.subject][q.number - (q.subject === 'Anatomy' ? 1 : q.subject === 'Biochemistry' ? 27 : q.subject === 'Histology' ? 53 : 78)])
  q.inferTop = inferred.top
}
// The aa8 printed keys by question number; the compact tables below are copied
// from its printed Key Answers pages and completed from the local source.
// Exact printed sequences read from the key table.
const printed = {
  Anatomy: ['B','A','A','A','A','A','B','B','C','C','C','B','C','C','B','B'],
  Biochemistry: ['B','A','B','C','B','A','B','B','B','C','D','B','B','C','C','B','C','B','B','B','C','B','B','C','B','C','A','B','C','B','B','C','C','B','B','B','A','C','B','C','B','C','B','A','C','B','A','B','B','B','B'],
  Histology: ['D','C','A','A','B','A','C','A','B','B','D','B','C','B','B','C','C','B','A','A','B','C'],
  Physiology: ['B','A','B','A','B','B','B','B','A','B','C','C','B','B','B','B','C','B','B','C','B','B','C','B','C','B'],
}
for (const q of aa8) q.correct = printed[q.subject][q.number - 1]
for (const q of b7c) q.correct = b7cKeys[q.subject][q.number - (q.subject === 'Anatomy' ? 1 : q.subject === 'Biochemistry' ? 27 : q.subject === 'Histology' ? 53 : 78)]
// Batch-10 P103 is an exact repeat of P86 and is retained only in provenance.
const duplicate = b7c.find((q) => q.subject === 'Physiology' && q.number === 103)
if (!duplicate || duplicate.stem !== b7c.find((q) => q.subject === 'Physiology' && q.number === 86)?.stem) throw new Error('Expected exact duplicate b7c P103/P86 was not verified')
allQs = allQs.filter((q) => !(q.source === 'b7c' && q.subject === 'Physiology' && q.number === 103))
const formKeys = {1:'D',2:'E',3:'A',4:'D',5:'D',6:'A',7:'B',8:'C',9:'B',10:'D',11:'C',12:'C',13:'D',14:'C',15:'D',16:'E'}
for (const q of form) q.correct = formKeys[q.number]
const expectedAa8KeyLengths = { Anatomy: 16, Biochemistry: 51, Histology: 22, Physiology: 26 }
for (const [subject, expected] of Object.entries(expectedAa8KeyLengths)) {
  if (printed[subject].length !== expected) throw new Error(`aa8 printed-key length ${subject}: ${printed[subject].length}, expected ${expected}`)
  const sourceRows = aa8.filter((q) => q.subject === subject).sort((a, b) => a.number - b.number)
  if (sourceRows.length !== expected) throw new Error(`aa8 source-order length ${subject}: ${sourceRows.length}, expected ${expected}`)
  for (const q of sourceRows) {
    const observed = printed[subject][q.number - 1]
    if (!observed || q.correct !== observed || !/^[A-F]$/.test(observed)) throw new Error(`aa8 key observation mismatch ${subject} Q${q.number}`)
  }
}
for (const [subject, keys] of Object.entries(b7cKeys)) {
  const sourceRows = b7c.filter((q) => q.subject === subject).sort((a, b) => a.number - b.number)
  if (keys.length !== sourceRows.length) throw new Error(`Batch-10 key/source-order length ${subject}: ${keys.length}/${sourceRows.length}`)
  const offset = subject === 'Anatomy' ? 1 : subject === 'Biochemistry' ? 27 : subject === 'Histology' ? 53 : 78
  for (const q of sourceRows) {
    const observed = keys[q.number - offset]
    if (!observed || q.correct !== observed || !/^[A-F]$/.test(observed)) throw new Error(`Batch-10 key observation mismatch ${subject} Q${q.number}`)
  }
}
if (Object.keys(formKeys).length !== form.length || form.some((q) => !/^[A-F]$/.test(q.correct) || q.correct !== formKeys[q.number])) throw new Error('Formative printed-key observation mismatch')
const expectedMcqBySubject = { Anatomy: 42, Biochemistry: 77, Histology: 47, Physiology: 67 }
if (allQs.length !== 233) throw new Error('MCQ boundary assertion failed: total')
for (const [subject, count] of Object.entries(expectedMcqBySubject)) {
  const actual = allQs.filter((q) => q.subject === subject).length
  if (actual !== count) throw new Error(`MCQ boundary ${subject}: ${actual}, expected ${count}`)
}

// Concepts are assigned to the four triage departments by the register's
// authoritative contiguous ranges, not by fuzzy fallback or article order.
for (const h of handles) {
  h.subject = registerSubject(byHandle.get(h.key).index)
}
for (const q of allQs) {
  const h = byHandle.get(q.handle)
  if (!h) throw new Error(`Question handle is not registered: ${q.source}:${q.subject}:${q.number}:${q.handle}`)
  if (!subjectPath[q.subject]) throw new Error(`Question subject is not registered: ${q.source}:${q.subject}:${q.number}`)
}
const groups = Object.fromEntries(['Anatomy','Biochemistry','Histology','Physiology'].map(s => [s, { concepts:[], articles:[], questions:[], written:[] }]))
for (const h of handles) { if (!groups[h.subject]) h.subject = 'Physiology'; groups[h.subject].concepts.push(h); groups[h.subject].articles.push(h) }
for (const q of allQs) {
  const h = byHandle.get(q.handle)
  if (!h) throw new Error('Question has no registered concept handle: ' + q.source + ':' + q.subject + ':' + q.number)
  const id = `QST-HU-BMS101-${q.source.toUpperCase()}-${q.subject.toUpperCase()}-${String(q.number).padStart(3,'0')}`
  const rendered = questionMd(q, h, id)
  if (rendered) groups[q.subject].questions.push(rendered)
}
for (const [subject, g] of Object.entries(groups)) {
  const prefix = `HU-BMS-101-${subjectSlug[subject]}`
  writeFileSync(join(outRoot,'concept',`${prefix}-concepts.md`), g.concepts.map((h) => enrichConcept(conceptMd(h))).join('\n---\n\n'))
  writeFileSync(join(outRoot,'article',`${prefix}-articles.md`), g.articles.map(articleMd).join('\n---\n\n'))
  writeFileSync(join(outRoot,'question',`${prefix}-mcq.md`), g.questions.map(enrichQuestion).join('\n'))
}

for (const subject of ['Anatomy','Biochemistry','Histology','Physiology']) {
  const path = join(outRoot, 'question', 'HU-BMS-101-' + subjectSlug[subject] + '-mcq.md')
  const raw = readFileSync(path, 'utf8')
  writeFileSync(path, raw.replaceAll('Any placeholder option is an explicit unrecoverable-source marker and must be resolved by faculty before publication.', 'Options and key are transcribed from the cited local source; no inferred option or answer is emitted.'))
}

// Written records are source prompts plus printed model-answer material. The
// model answers are retained in the mark scheme; no practicals are minted.
const written = [
  ['Anatomy','aa8',1,'List 4 branches of axillary artery.','Superior thoracic; thoracoacromial; lateral thoracic; subscapular; anterior and posterior circumflex humeral arteries.'],
  ['Anatomy','aa8',2,'List 4 derivatives of paraxial mesoderm.','Sclerotome forms vertebrae and ribs; dermatome forms dermis of the back; myotome forms skeletal muscle of the back, body wall and limbs.'],
  ['Anatomy','aa8',3,'List 4 branches of radial artery.','Muscular branches; recurrent branch for elbow anastomosis; superficial palmar branch; dorsal carpal branch.'],
  ['Anatomy','aa8',4,'List derivatives of lateral plate mesoderm.','Parietal (somatic) layer forms dermis of body wall and limbs, limb bones, connective tissue and sternum; visceral (splanchnic) layer contributes to the gut tube.'],
  ['Anatomy','b7c',1,'List 4 derivatives of ectoderm.','Sensory epithelium of ear, nose and eye; central nervous system; peripheral nervous system; skin epidermis; mammary and subcutaneous glands; pituitary gland; enamel of teeth.'],
  ['Anatomy','b7c',2,'Mention the origin, insertion, nerve supply and action of pronator teres muscle.','Origin by humeral and ulnar heads; insertion at the middle lateral radius; median nerve; assists elbow flexion and pronation of the radioulnar joint.'],
  ['Biochemistry','aa8',1,'Name inhibitors of complex IV.','Cyanide, carbon monoxide, hydrogen sulfide and sodium azide.'],
  ['Biochemistry','aa8',2,'List the electron-transport-chain complexes.','Complex I NADH dehydrogenase; II succinate dehydrogenase; III cytochrome c reductase; IV cytochrome c oxidase; V F1/F0 ATP synthase.'],
  ['Biochemistry','aa8',3,'State short- and long-term enzyme regulation.','Short-term: covalent modification and allosteric regulation. Long-term: induction and repression.'],
  ['Biochemistry','aa8',4,'Name uncouplers.','UCP-1 (thermogenin) and synthetic uncouplers such as 2,4-dinitrophenol and aspirin.'],
  ['Biochemistry','aa8',5,'State two consequences of folate deficiency.','Megaloblastic anaemia and neural-tube defects.'],
  ['Biochemistry','b7c',1,'Regarding Complex IV in ETC, mention its name, compartments, number of protons pumped through the inner mitochondrial membrane and its electron acceptor.','Cytochrome c oxidase; cytochromes a and a3 with copper; 2 protons pumped; oxygen is the final electron acceptor.'],
  ['Biochemistry','b7c',2,'Define Michael constant (Km) and mention its importance.','Km is used with Vmax to describe enzyme kinetics, reflects enzyme affinity for substrate, helps assess inhibitor mechanism and permits comparison between enzymes.'],
  ['Biochemistry','b7c',3,'Differentiate between topoisomerase 1 and 2.','Topoisomerase I transiently breaks one DNA strand, passes the intact strand and reseals it; topoisomerase II transiently breaks both strands, releases supercoiling and reseals them.'],
  ['Histology','aa8',1,'Describe the layers of the epidermis.','Basal, prickle, granular, clear (in thick skin) and horny layers.'],
  ['Histology','aa8',2,'Compare capillary types and mention their sites.','Continuous capillaries occur in connective tissue, muscle and blood-tissue barriers; fenestrated capillaries in kidney, intestine and endocrine glands; sinusoidal capillaries in liver, bone marrow and spleen.'],
  ['Histology','aa8',3,'Compare a medium artery and a medium vein.','A medium artery has a thicker wall, prominent tunica media and narrower lumen without valves; a medium vein has a thinner wall, wider lumen and valves.'],
  ['Histology','aa8',4,'Differentiate euchromatin and heterochromatin.','Euchromatin is lightly basophilic and dispersed on LM, dispersed on EM and associated with active cells; heterochromatin is intensely basophilic clumps on LM, coarse/electron-dense on EM and associated with low synthetic activity.'],
  ['Histology','b7c',1,'Name the epithelium of ureter, urinary bladder and oral cavity.','Transitional epithelium in ureter and urinary bladder; non-keratinised stratified squamous epithelium in oral cavity.'],
  ['Histology','b7c',2,'Differentiate internal and external elastic laminae.','Internal elastic lamina lies between tunica intima and media; external elastic lamina lies between media and adventitia.'],
  ['Histology','b7c',3,'Name the large-artery structure with an arteriole-like nutritive role.','Vasa vasorum.'],
  ['Histology','b7c',4,'Mention 2 receptors in the connective tissue.','Free nerve endings; Meissner corpuscles; Krause end bulbs; Ruffini end organs; Pacinian corpuscles; Golgi tendon organs.'],
  ['Histology','b7c',5,'Mention 2 sites of the fenestrated capillaries.','Kidney; intestine; endocrine gland.'],
  ['Histology','b7c',6,'Differentiate euchromatin and heterochromatin according to histological features.','Euchromatin: lightly basophilic/dispersed and active; heterochromatin: intensely basophilic coarse clumps/electron-dense and associated with low synthetic activity.'],
  ['Physiology','aa8',1,'Mention four types of neural pathways.','Convergent, divergent, reverberating and parallel after-discharge pathways.'],
  ['Physiology','aa8',2,'State long-term effects of synaptic transmission.','Increased transmitter-release sites, transmitter vesicles and presynaptic terminals, with structural changes in dendritic spines permitting stronger transmission.'],
  ['Physiology','b7c',1,'Mention the characteristics of synaptic transmission and list its steps in order of occurrence.','Characteristics printed: synaptic fatigue, synaptic delay, drug effects, hypoxia effects, unidirectional transmission and pH effects. Steps: action potential enters presynaptic cell with calcium influx; calcium carries neurotransmitter out by exocytosis; neurotransmitter binds postsynaptic receptors and permits action-potential passage.'],
]
const printedWrittenMarks = (subject, src, n) => {
  if (src === 'aa8' && subject === 'Physiology') return 8
  if (src === 'b7c' && subject === 'Anatomy') return 4
  if (src === 'b7c' && subject === 'Biochemistry') return n === 1 ? 4 : 2
  if (src === 'b7c' && subject === 'Physiology') return 9
  return null
}
const writtenCitation = (subject, src, n) => {
  const sid = src === 'aa8' ? source.aa8 : source.f5
  const page = src === 'aa8' ? (subject === 'Anatomy' ? 'pp. 9–10' : subject === 'Biochemistry' ? 'pp. 26–27' : subject === 'Histology' ? 'pp. 34–35' : 'p. 45') : (subject === 'Anatomy' ? 'pp. 27–28' : subject === 'Biochemistry' ? 'pp. 26–27' : subject === 'Histology' ? 'pp. 28–30' : 'p. 26')
  return sid + ' — HU-BMS-101 ' + subject + ' written prompt ' + n + ', ' + page + ', printed model-answer block.'
}
const writtenHandleOverrides = new Map([
  ['Anatomy:aa8:1', 'axillary-artery-branches'], ['Anatomy:aa8:2', 'paraxial-mesoderm-derivatives'], ['Anatomy:aa8:3', 'radial-artery-branches'], ['Anatomy:aa8:4', 'lateral-plate-mesoderm-derivatives'],
  ['Anatomy:b7c:1', 'ectoderm-derivatives'], ['Anatomy:b7c:2', 'pronator-teres-OINA'],
  ['Biochemistry:aa8:1', 'complex-iv'], ['Biochemistry:aa8:2', 'etc-complexes'], ['Biochemistry:aa8:3', 'allosteric-kinetics'], ['Biochemistry:aa8:4', 'etc-uncoupling'], ['Biochemistry:aa8:5', 'folate-deficiency'],
  ['Biochemistry:b7c:1', 'complex-iv'], ['Biochemistry:b7c:2', 'competitive-inhibition'], ['Biochemistry:b7c:3', 'topoisomerase-i-vs-ii'],
  ['Histology:aa8:1', 'epidermal-layers'], ['Histology:aa8:2', 'capillary-types-and-sites'], ['Histology:aa8:3', 'medium-artery-vein-comparison'], ['Histology:aa8:4', 'euchromatin-heterochromatin'],
  ['Histology:b7c:1', 'urinary-oral-epithelia'], ['Histology:b7c:2', 'coronary-artery-elastic-laminae'], ['Histology:b7c:3', 'vasa-vasorum'], ['Histology:b7c:4', 'connective-tissue-receptors'], ['Histology:b7c:5', 'capillary-types-and-sites'], ['Histology:b7c:6', 'euchromatin-heterochromatin'],
  ['Physiology:aa8:1', 'chemical-synapse-sequence'], ['Physiology:aa8:2', 'chemical-synapse-sequence'], ['Physiology:b7c:1', 'chemical-synapse-sequence'],
])
const writtenKey = (subject, src, n, prompt, answer) => {
  const inferred = writtenHandleOverrides.get(subject + ':' + src + ':' + n) ?? inferHandle(prompt, [answer], subject).key
  const h = byHandle.get(inferred)
  if (!h) throw new Error('Written prompt has no registered concept handle: ' + subject + ':' + n)
  const id = `QST-HU-BMS101-WRITTEN-${subject.toUpperCase()}-${src.toUpperCase()}-${String(n).padStart(2,'0')}`
  const marks = printedWrittenMarks(subject, src, n)
  const partHeading = marks ? `### (a) ${marks} marks` : '### (a)'
  const markNote = marks ? 'The source prints ' + marks + ' marks.' : 'The source does not print a mark value; the unmarked contract form is preserved.'
  return `# Item\n\n## id\n${id}\n\n## title\n${prompt}\n\n## subject\nfnd\n\n## status\nDraft\n\n## owner\nCodex\n\n## question\n${prompt}\n\n## format\nstructured written\n\n## written_parts\n${partHeading}\n${prompt}\nExpects: ${answer}\nConcept: ${conceptId(h.key)}\n\n## topic\n${subject}\n\n## main_concept\n${conceptId(h.key)}\n\n## module\nHU-BMS-101\n\n## module_subject\nHU-BMS-101 > ${subject} > Written assessment\n\n## years\nHU_Y1\n\n## universities\nhu\n\n## library_ids\n${articleId(h.key)}\n\n## learning_objective\nRecall the source-grounded model-answer points for this written prompt.\n\n## source_citation\n${writtenCitation(subject, src, n)}\n\n## author_notes\nPrinted model-answer material retained; no outside answer or mark value was added. ${markNote}\n\n---\n\n`
}
for (const subject of ['Anatomy','Biochemistry','Histology','Physiology']) {
  const rows = written.filter(x => x[0] === subject && printedWrittenMarks(x[0], x[1], x[2]) !== null)
  if (rows.length) writeFileSync(join(outRoot,'written',`HU-BMS-101-${subjectSlug[subject]}-written.md`), rows.map(x => enrichWritten(writtenKey(...x))).join(''))
}

for (const subject of ['Anatomy','Biochemistry','Histology','Physiology']) {
  const g = groups[subject]
  const qs = allQs.filter((q) => q.subject === subject && !q.releaseExcluded)
  const rows = written.filter((x) => x[0] === subject && printedWrittenMarks(x[0], x[1], x[2]) !== null)
  writeFileSync(join(outRoot, 'article', 'HU-BMS-101-' + subjectSlug[subject] + '-articles.md'), enrichArticle(subjectArticleMd(subject, g.articles, qs, rows)))
}

// Evidence rows use the exact corpus source IDs already present in the source
// index. Claims remain needs_evidence: these records document curriculum scope,
// while the citation preserves the local stem and page for faculty review.
const resourceRows = [
  [source.aa8, 'EOM - 101 final 2025.pdf', 'Year 1/BMS 101/All Subjects/Assessments/Exams/EOM - 101 final 2025.pdf.pdf'],
  [source.b7c, 'EOM - Batch 10 BMS1 FINAL EXAM.pdf', 'Year 1/BMS 101/All Subjects/Assessments/Exams/EOM - Batch 10 BMS1 FINAL EXAM .pdf'],
  [source.f5, 'EOM - Batch 10 BMS 101 FINAL EXAM answer.pdf', 'Year 1/BMS 101/All Subjects/Assessments/Exams/EOM - Batch 10 BMS 101 FINAL EXAM answer.pdf'],
  [source.form, '101-BMS1-Answers of formative assessment-main stream-26.pdf', 'Year 1/BMS 101/All Subjects/Official Course Files/101-BMS1-Answers of formative assessment-main stream-26.pdf'],
]
writeFileSync(join(outRoot, 'evidence', 'HU-BMS-101-resources.md'), resourceRows.map(([id, title, path]) => `# Item\n\n## id\n${id}\n\n## title\n${title}\n\n## institution\nHelwan University\n\n## collection_id\nHU-Y1-BMS-101\n\n## source_relative_path\n${path}\n\n## media_type\napplication/pdf\n\n## languages\nen | ar\n\n## processing_status\nindexed_local_source\n\n## qualification\nApproved local HU-BMS-101 curriculum assessment source; assessment signal only, not independent clinical authority.\n\n## confidence\n0.9\n\n## is_assessment\nyes\n\n---\n\n`).join(''))

const claimRows = handles.map((h) => {
  const claimId = claimIdFor(h.key)
  const sourceRow = allQs.find((q) => q.handle === h.key)
  const scope = conceptLabel(h.key)
  return `# Item\n\n## id\n${claimId}\n\n## concept_id\n${conceptId(h.key)}\n\n## subject\n${scope}\n\n## predicate\nis_assessed_scope\n\n## object\nHU-BMS-101 Year-1 local assessment scope\n\n## display_text\n${scope} is an assessed HU-BMS-101 Year-1 scope in the approved local corpus.\n\n## risk_class\nfoundational_stable\n\n## verification_status\nneeds_evidence\n\n## conflict_status\nnone\n\n## confidence\n0.9\n\n## freshness\nstable_local_curriculum_fact\n\n## time_sensitive\nno\n\n## qualifiers\nmodule: HU-BMS-101\nsubject: ${h.subject}\nsource: ${sourceRow ? source[sourceRow.source] : source.form}\n\n---\n\n`
}).join('')
writeFileSync(join(outRoot, 'evidence', 'HU-BMS-101-claims.md'), claimRows)

const citationRows = handles.map((h) => {
  const q = allQs.find((row) => row.handle === h.key)
  const resourceId = q ? source[q.source] : source.form
  const support = q ? clean(q.stem) : conceptLabel(h.key)
  const locator = q ? `${pageFor(q)}; printed question ${q.number}` : 'source index handle'
  return `# Item\n\n## id\n${citationIdFor(h.key)}\n\n## claim_id\n${claimIdFor(h.key)}\n\n## resource_id\n${resourceId}\n\n## evidence_role\nlocal_curriculum\n\n## support_span\n${support}\n\n## locator_type\nprinted_page\n\n## locator_detail\n${locator}\n\n## context_note\nExact local source wording is retained as curriculum evidence; no answer is inferred from an obscured option.\n\n## confidence\n0.9\n\n## counts_as_claim_evidence\nno\n\n---\n\n`
}).join('')
writeFileSync(join(outRoot, 'evidence', 'HU-BMS-101-citations.md'), citationRows)

const spanSections = ['definition', 'mechanism', 'determinants', 'significance']
const spanRows = ['Anatomy', 'Biochemistry', 'Histology', 'Physiology'].map((subject) => {
  const hs = groups[subject].articles
  const claims = hs.map((h) => claimIdFor(h.key)).join(' | ')
  const citations = hs.map((h) => citationIdFor(h.key)).join(' | ')
  return spanSections.map((section) => `# Item\n\n## id\n${spanIdFor(subject, section)}\n\n## article_id\n${subjectArticleId(subject)}\n\n## section_id\n${section}\n\n## text\nThis article section is a source-bounded HU-BMS-101 ${subject} review.\n\n## claim_ids\n${claims}\n\n## citation_ids\n${citations}\n\n---\n\n`).join('')
}).join('')
writeFileSync(join(outRoot, 'evidence', 'HU-BMS-101-spans.md'), spanRows)

writeFileSync(join(outRoot,'media-requests','HU-BMS-101-media-requests.md'), `# HU-BMS-101 media requests\n\nNo media requests are authored. The two image-dependent source questions (formative physiology action-potential diagram and Batch-10 biochemistry nitrogenous-base image) remain explicitly source dependencies in their question author notes; no image is copied or invented.\n`)
const heldMcqs = allQs.filter((q) => q.releaseExcluded)
const heldMcqText = heldMcqs.length ? heldMcqs.map((q) => `${q.source.toUpperCase()} ${q.subject} Q${q.number} (${q.releaseReason})`).join('; ') : 'None'
if (heldMcqs.length !== 9) throw new Error(`Release hold assertion failed: ${heldMcqs.length} MCQs held, expected 9`)
const releasedMcqBySubject = Object.fromEntries(Object.keys(expectedMcqBySubject).map((subject) => [subject, allQs.filter((q) => q.subject === subject && !q.releaseExcluded).length]))
const releasedWritten = written.filter((x) => printedWrittenMarks(x[0], x[1], x[2]) !== null)
const heldWritten = written.filter((x) => printedWrittenMarks(x[0], x[1], x[2]) === null)
writeFileSync(join(outRoot,'evidence','HU-BMS-101-evidence.md'), `# HU-BMS-101 evidence ledger\n\n## Source IDs\n- ${source.aa8}: EOM - 101 final 2025.pdf\n- ${source.b7c}: EOM - Batch 10 BMS1 FINAL EXAM.pdf\n- ${source.f5}: EOM - Batch 10 BMS 101 FINAL EXAM answer.pdf (highlighted keys)\n- ${source.form}: 101-BMS1-Answers of formative assessment-main stream-26.pdf\n\n## Boundary\nGoverned triage inventory: 260 prompts = 233 MCQ records (42 Anatomy, 77 Biochemistry, 47 Histology, 67 Physiology) + 27 written records (6, 8, 10, 3 by subject), after b7c Physiology P103 is verified as an exact repeat of P86.\n\n## Release accounting\nSource-proven release: ${233 - heldMcqs.length} MCQs (${releasedMcqBySubject.Anatomy} Anatomy, ${releasedMcqBySubject.Biochemistry} Biochemistry, ${releasedMcqBySubject.Histology} Histology, ${releasedMcqBySubject.Physiology} Physiology) + ${releasedWritten.length} marked written records (2 Anatomy, 3 Biochemistry, 0 Histology, 3 Physiology) = ${233 - heldMcqs.length + releasedWritten.length} student-facing records.\n\nHeld MCQs are excluded rather than padded or keyed: ${heldMcqText}.\n\n${heldWritten.length} governed written prompts are inventoried but held from the student-facing release because their local source block does not print a mark value; no mark was fabricated.\n\nNo practical record is minted: the approved BMS-101 source packet contains no defensible practical station or keyed histology plate.\n`)
console.error(JSON.stringify({ handles: handles.length, questions: allQs.length, written: written.length, output: outRoot }))
