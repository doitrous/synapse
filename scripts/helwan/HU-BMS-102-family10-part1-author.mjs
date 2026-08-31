import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')

const assessment = 'src_a2b7d25d987469febab8'
const orientation = 'src_d270bc32d14620134e75'
const cellInjury1 = 'src_7c79d90e00f17c534be6'
const circulation1 = 'src_50d9ef5f2db5dc46e3e3'
const inflammation1 = 'src_eaea111707b57559a904'
const inflammation2 = 'src_949c1820aea58bded856'

const foundationsArticle = 'ART-HU-BMS102-PAT-F10P1-FOUNDATIONS-CELL-INJURY'
const inflammationArticle = 'ART-HU-BMS102-PAT-F10P1-ACUTE-INFLAMMATION'
const oedemaArticle = 'ART-HU-BMS102-PAT-F10P1-OEDEMA-EXUDATE'

const concepts = [
  {
    ref: 'M01', id: 'CON-FND-138A2385CB2CB5', key: 'pathology.general.pathogenesis-disease-mechanism-term', reuse: false,
    label: 'Pathogenesis is the mechanism through which a cause produces disease manifestations', aliases: ['Pathogenesis definition', 'Disease mechanism', 'Aetiology versus pathogenesis'],
    definition: 'Pathogenesis is the chain of mechanisms through which an aetiologic factor produces structural, functional and clinical manifestations of disease. Aetiology names the cause, morphology describes structural change, and fate describes the outcome rather than the causal mechanism.',
    objective: 'Distinguish pathogenesis from aetiology, morphologic change and disease outcome.', pitfalls: 'Using aetiology and pathogenesis as synonyms, or choosing morphology when the stem asks how the cause produces the manifestations.',
    type: 'definition', micro: 'Introduction to pathology', nano: 'Pathogenesis', article: foundationsArticle, subjectCode: 'fnd', primary: 'SYS-FND-T03', secondary: 'DIS-PAT',
    subject: 'Pathogenesis', predicate: 'is', object: 'the mechanism through which a cause produces pathological and clinical manifestations', display: 'Pathogenesis is the mechanism through which a cause produces pathological and clinical manifestations.',
    teaching: [{ source: orientation, page: 10, text: 'Pathology involves aetiology (causes) and pathogenesis (mechanisms), followed by pathological changes and clinical manifestations.' }, { source: orientation, page: 14, text: 'Pathogenesis is the development of disease and the chain of events leading to it.' }],
  },
  {
    ref: 'M03', id: 'CON-FND-DF726F864C8BC3', key: 'cell.adaptation.hypertrophy-hyperplasia-atrophy-metaplasia', reuse: true,
    label: 'Cellular adaptation preserves viability in a new altered steady state', aliases: ['Cellular adaptation', 'Adaptive cellular response', 'Hypertrophy hyperplasia atrophy metaplasia'],
    definition: 'Cellular adaptation is a reversible modification of cell structure and function that establishes a new steady state while preserving viability during environmental stress. Its four major forms are hypertrophy, hyperplasia, atrophy and metaplasia.',
    objective: 'Define cellular adaptation and identify it as a reversible viable response to adverse environmental change.', pitfalls: 'Calling adaptation cell death or assuming that every change caused by stress is irreversible.',
    type: 'classification', micro: 'Cellular adaptation', nano: 'Adaptation definition', article: foundationsArticle, subjectCode: 'fnd', primary: 'SYS-FND-T03-S01', secondary: 'DIS-PAT-T01',
    subject: 'Cellular adaptation', predicate: 'is', object: 'a reversible viable change to an altered steady state', display: 'Cellular adaptation is a reversible viable change to an altered steady state.',
    teaching: [{ source: orientation, page: 67, text: 'Adaptation modifies cell structure and function to achieve a new altered steady state while preserving vitality.' }],
  },
  {
    ref: 'M04', id: 'CON-FND-084E7714F4E0B6', key: 'pathology.cell-adaptation.atrophy-cell-shrinkage-loss-substance', reuse: false,
    label: 'Atrophy is shrinkage caused by loss of cell substance', aliases: ['Cellular atrophy definition', 'Decreased cell mass', 'Cell shrinkage'],
    definition: 'Atrophy is a decrease in cell size caused by loss of cell substance, with a corresponding reduction in cell mass and often organ size. It is an adaptive response and differs from hypertrophy, which increases cell size, and hyperplasia, which increases cell number.',
    objective: 'Define atrophy by reduced cell size and substance and distinguish it from hypertrophy and hyperplasia.', pitfalls: 'Confusing reduced cell size with reduced cell number or choosing hypertrophy simply because both terms describe a change in cell mass.',
    type: 'definition', micro: 'Cellular adaptation', nano: 'Atrophy', article: foundationsArticle, subjectCode: 'fnd', primary: 'SYS-FND-T03-S01-M04', secondary: 'DIS-PAT-T01',
    subject: 'Atrophy', predicate: 'is', object: 'shrinkage of a cell caused by loss of cell substance', display: 'Atrophy is shrinkage of a cell caused by loss of cell substance.',
    teaching: [{ source: orientation, page: 67, text: 'Atrophy is listed among adaptations and defined as decrease in cell mass.' }],
  },
  {
    ref: 'M05', id: 'CON-FND-2CDE9A5C884133', key: 'celldeath.contrast.necrosis-versus-apoptosis', reuse: true,
    label: 'Necrosis affects groups of cells, disrupts membranes and provokes inflammation', aliases: ['Necrosis versus apoptosis', 'Necrotic cell death', 'Group cell death with inflammation'],
    definition: 'Necrosis is irreversible death of groups of cells with loss of membrane integrity, enzymatic digestion and leakage of cellular contents. It provokes inflammation and necrotic tissue may calcify. Apoptosis instead removes individual cells while preserving membrane integrity and avoiding a surrounding inflammatory reaction.',
    objective: 'Recognize necrosis from grouped cell death, autolysis, inflammation and possible calcification.', pitfalls: 'Choosing apoptosis when the stem explicitly describes groups of cells, autolysis and inflammation, or treating granulomatous inflammation and hyalinosis as forms of cell death.',
    type: 'comparison', micro: 'Cell injury', nano: 'Necrosis versus apoptosis', article: foundationsArticle, subjectCode: 'fnd', primary: 'SYS-FND-T03-S01-M03', secondary: 'DIS-PAT-T01',
    subject: 'Necrosis', predicate: 'is characterized by', object: 'grouped cell death with membrane loss, autolysis and inflammation', display: 'Necrosis is characterized by grouped cell death with membrane loss, autolysis and inflammation.',
    teaching: [{ source: cellInjury1, page: 34, text: 'Necrosis is death of a group of cells with loss of membrane integrity and leakage; cytoplasmic organelles rupture and may calcify.' }],
  },
  {
    ref: 'M06', id: 'CON-INF-4502B7A8891300', key: 'pathology.inflammation.acute-rapid-short-exudative-no-fibrosis', reuse: true,
    label: 'Acute inflammation is an immediate early host response', aliases: ['Acute inflammation characteristics', 'Rapid inflammatory response', 'Exudative acute inflammation'],
    definition: 'Acute inflammation is an immediate, rapid and usually short-duration host response that delivers leukocytes and plasma proteins to an injured or infected site. Prolonged tissue destruction, fibrosis and granuloma formation are more characteristic of chronic inflammation or repair.',
    objective: 'Identify immediate and early response as a defining characteristic of acute inflammation.', pitfalls: 'Choosing prolonged duration, fibrosis or granuloma formation when the question asks for the acute pattern.',
    type: 'comparison', micro: 'Acute inflammation', nano: 'Core characteristics', article: inflammationArticle, subjectCode: 'fnd', primary: 'SYS-INF', secondary: 'DIS-PAT-T02',
    subject: 'Acute inflammation', predicate: 'is', object: 'an immediate and early response to an injurious agent', display: 'Acute inflammation is an immediate and early response to an injurious agent.',
    teaching: [{ source: inflammation1, page: 12, text: 'Acute inflammation is a rapid host response that delivers leukocytes and plasma proteins to infection or tissue injury.' }],
  },
  {
    ref: 'M07', id: 'CON-INF-47F33376E995DE', key: 'pathology.inflammation.leukocyte-recruitment-rolling-adhesion-transmigration-chemotaxis', reuse: false,
    label: 'Leukocyte recruitment proceeds through rolling, adhesion, transmigration and chemotaxis', aliases: ['Leukocyte recruitment stages', 'Rolling adhesion diapedesis chemotaxis', 'Cellular inflammatory response sequence'],
    definition: 'The cellular response of acute inflammation includes leukocyte margination and rolling, firm adhesion, transmigration through the vessel wall and chemotaxis within tissue. Immediate momentary vasoconstriction is an earlier vascular event, not a stage of leukocyte recruitment.',
    objective: 'Order the major leukocyte-recruitment stages and exclude transient vasoconstriction from the cellular sequence.', pitfalls: 'Mixing vascular calibre changes with leukocyte behaviour or placing chemotaxis inside the vessel before transmigration.',
    type: 'sequence', micro: 'Acute inflammation', nano: 'Leukocyte recruitment', article: inflammationArticle, subjectCode: 'fnd', primary: 'SYS-INF', secondary: 'DIS-PAT-T02',
    subject: 'Leukocyte recruitment', predicate: 'includes', object: 'rolling, adhesion, transmigration and chemotaxis but not transient vasoconstriction', display: 'Leukocyte recruitment includes rolling, adhesion, transmigration and chemotaxis but not transient vasoconstriction.',
    teaching: [{ source: inflammation1, page: 26, text: 'The leukocyte journey lists margination, rolling, adhesion, transmigration, chemotaxis and phagocytosis.' }, { source: inflammation1, page: 36, text: 'The complete sequence places transient vasoconstriction before vascular and leukocyte events.' }],
  },
  {
    ref: 'M08', id: 'CON-INF-8E61F598EFD892', key: 'pathology.inflammation.bradykinin-pain-mediator', reuse: true,
    label: 'Bradykinin is a principal mediator of inflammatory pain', aliases: ['Inflammatory pain mediator', 'Bradykinin and pain', 'Kinin pain'],
    definition: 'Bradykinin is a major chemical mediator of pain during acute inflammation. Histamine mainly promotes vasodilatation and permeability, prostaglandin E2 sensitizes nociceptors, and C5a is chiefly an anaphylatoxin and chemotactic factor; the printed comparison selects bradykinin.',
    objective: 'Identify bradykinin as the main pain mediator in the source comparison.', pitfalls: 'Choosing histamine because it is prominent in early vascular change or choosing C5a because it recruits leukocytes.',
    type: 'mechanism', micro: 'Inflammatory mediators', nano: 'Pain', article: inflammationArticle, subjectCode: 'fnd', primary: 'SYS-INF', secondary: 'DIS-PAT-T02',
    subject: 'Bradykinin', predicate: 'mediates', object: 'pain in acute inflammation', display: 'Bradykinin mediates pain in acute inflammation.',
    teaching: [{ source: inflammation1, page: 16, text: 'Bradykinin is listed as an early inflammatory mediator acting with histamine during the vascular response.' }],
  },
  {
    ref: 'M09', id: 'CON-INF-91A505FE18153C', key: 'pathology.inflammation.fibrinous-pericarditis-bread-and-butter', reuse: false,
    label: 'Fibrinous pericarditis produces a bread-and-butter appearance', aliases: ['Bread-and-butter pericarditis', 'Fibrinous pericarditis morphology', 'Pericardial fibrin'],
    definition: 'Fibrinous inflammation produces fibrin-rich exudate on a serous surface. In the pericardium, fibrin coats the visceral and parietal layers and the opposed rough surfaces produce the classic bread-and-butter appearance.',
    objective: 'Associate the bread-and-butter appearance with fibrinous inflammation of the pericardium.', pitfalls: 'Choosing serous, suppurative or catarrhal inflammation when the named gross pattern is caused by fibrin deposited on pericardial surfaces.',
    type: 'morphological_pattern', micro: 'Acute inflammatory patterns', nano: 'Fibrinous pericarditis', article: inflammationArticle, subjectCode: 'fnd', primary: 'SYS-INF', secondary: 'DIS-PAT-T02\nSYS-CVS',
    subject: 'Fibrinous pericarditis', predicate: 'produces', object: 'a bread-and-butter appearance', display: 'Fibrinous pericarditis produces a bread-and-butter appearance.',
    teaching: [{ source: inflammation2, page: 26, text: 'Fibrin-rich exudate collects on both pericardial surfaces, which stick together as bread-and-butter adhesion.' }],
  },
  {
    ref: 'M10', id: 'CON-FND-25AC330CA5D09B', key: 'pathology.edema.interstitial-tissue-body-cavity-fluid-definition', reuse: false,
    label: 'Oedema is abnormal fluid accumulation in interstitial tissue or body cavities', aliases: ['Oedema definition', 'Edema definition', 'Interstitial fluid accumulation'],
    definition: 'Oedema is abnormal accumulation of fluid in interstitial tissue spaces or body cavities. It differs from hyperaemia, which is increased blood flow; haemorrhage, which is escape of blood from vessels or chambers; and embolism, which is circulation of detached intravascular material.',
    objective: 'Define oedema by the location and abnormal accumulation of fluid.', pitfalls: 'Confusing oedema with hyperaemia, haemorrhage or embolism because each involves the circulation but not the same compartment or material.',
    type: 'definition', micro: 'Haemodynamic disorders', nano: 'Oedema definition', article: oedemaArticle, subjectCode: 'fnd', primary: 'DIS-PAT-T03', secondary: 'SYS-CVS',
    subject: 'Oedema', predicate: 'is', object: 'abnormal fluid accumulation in interstitial tissue spaces or body cavities', display: 'Oedema is abnormal fluid accumulation in interstitial tissue spaces or body cavities.',
    teaching: [{ source: circulation1, page: 9, text: 'Edema is abnormal accumulation of fluid in the interstitial tissue or body cavities.' }],
  },
  {
    ref: 'M11', id: 'CON-FND-19B0A2A6DDA3D5', key: 'pathology.edema.inflammatory-increased-vascular-permeability', reuse: true,
    label: 'Inflammatory exudate forms because vascular permeability increases', aliases: ['Exudate permeability mechanism', 'Inflammatory capillary leak', 'Protein-rich fluid exudation'],
    definition: 'Increased microvascular permeability allows protein-rich fluid and inflammatory cells to escape into tissue, forming exudate. Increased hydrostatic pressure without endothelial leak more often produces a protein-poor transudate, while trauma may cause frank haemorrhage.',
    objective: 'Identify increased capillary permeability as the mechanism producing inflammatory exudate.', pitfalls: 'Choosing increased hydrostatic pressure, blood flow or vessel trauma without distinguishing exudate from transudate and haemorrhage.',
    type: 'pathophysiological_mechanism', micro: 'Haemodynamic disorders', nano: 'Inflammatory exudate', article: oedemaArticle, subjectCode: 'fnd', primary: 'SYS-INF', secondary: 'DIS-PAT-T02\nDIS-PAT-T03',
    subject: 'Inflammatory exudate', predicate: 'results from', object: 'increased capillary permeability', display: 'Inflammatory exudate results from increased capillary permeability.',
    teaching: [{ source: inflammation1, page: 18, text: 'Inflammatory exudate contains fluid and cellular components.' }, { source: inflammation1, page: 19, text: 'The exudate mechanism contrasts vascular permeability with capillary hydrostatic pressure.' }],
  },
  {
    ref: 'M12', id: 'CON-HEM-3899015C5024C0', key: 'neutrophil-granules-and-first-line-defence', reuse: true,
    label: 'Neutrophils phagocytose bacteria as first-line inflammatory cells', aliases: ['Neutrophil phagocytic function', 'Neutrophil bacterial ingestion', 'Polymorph function'],
    definition: 'Neutrophils are motile first-line phagocytes in acute inflammation. After recruitment into tissue, they ingest and destroy bacteria using phagosomes, granule enzymes and oxidative killing mechanisms; immunoglobulin production belongs to plasma cells and lymphokine production to lymphocytes.',
    objective: 'Identify bacterial phagocytosis as a core neutrophil function.', pitfalls: 'Assigning antibody production, lymphokine production or orchestration of repair to the neutrophil when the option set asks for its direct effector function.',
    type: 'structure_function_relationship', micro: 'Inflammatory cells', nano: 'Neutrophil phagocytosis', article: inflammationArticle, subjectCode: 'haem', primary: 'DIS-HIS-T02', secondary: 'SYS-INF\nDIS-PAT-T02',
    subject: 'Neutrophils', predicate: 'function to', object: 'phagocytose bacteria', display: 'Neutrophils function to phagocytose bacteria.',
    teaching: [{ source: inflammation1, page: 31, text: 'Phagocytosis is ingestion and destruction of bacteria, necrotic debris and foreign particles by phagocytic inflammatory cells.' }],
  },
  {
    ref: 'M13', id: 'CON-IMM-075EC1A6A3022D', key: 'teaching.microv2.basophil-mast.histamine', reuse: true,
    label: 'Basophils and mast cells contain and release histamine', aliases: ['Basophil histamine source', 'Mast-cell histamine', 'Inflammatory histamine release'],
    definition: 'Basophils and mast cells contain histamine in cytoplasmic granules and can release it during inflammatory and allergic responses. Neutrophils, monocytes and eosinophils have other effector roles and are not the source selected by the printed comparison.',
    objective: 'Identify basophils as the histamine-producing option in the source comparison.', pitfalls: 'Choosing any leukocyte merely because it participates in inflammation, without distinguishing mediator storage and release from phagocytic or antiparasitic functions.',
    type: 'structure_function_relationship', micro: 'Inflammatory mediators', nano: 'Histamine source', article: inflammationArticle, subjectCode: 'imm', primary: 'DIS-IMU-T01', secondary: 'SYS-INF\nDIS-PAT-T02',
    subject: 'Basophils', predicate: 'can produce and release', object: 'histamine', display: 'Basophils can produce and release histamine.',
    teaching: [{ source: inflammation1, page: 34, text: 'The inflammatory-mediator map lists histamine among leukocyte-derived mediators.' }],
  },
]

for (const concept of concepts) {
  concept.claim = `CLM-HU102-F10P1-${concept.ref}-01`
  concept.currCit = `CIT-HU102-F10P1-${concept.ref}-CURR`
  concept.asmCit = `CIT-HU102-F10P1-${concept.ref}-ASM`
  concept.span = `SPN-HU102-F10P1-${concept.ref}-01`
}
const byRef = Object.fromEntries(concepts.map((concept) => [concept.ref, concept]))

const questions = [
  { ref: 'M01', page: 1, key: 'C', stem: 'The mechanism through which the cause operates to produce the pathological and clinical manifestations defined as:', options: ['Etiology', 'Morphologic changes.', 'Pathogenesis', 'Fate'], clue: 'the stem asks for the causal mechanism rather than the cause, structural result or outcome', reasons: ['aetiology identifies the cause of disease', 'morphologic changes are structural consequences of disease', 'pathogenesis names the mechanism by which a cause produces manifestations', 'fate describes the eventual outcome rather than the mechanism'] },
  { ref: 'M03', page: 1, key: 'C', stem: 'The changes made by a cell in response to adverse environmental changes, which are reversible if the cause is ceased defined as:', options: ['Apoptosis', 'Necrosis', 'Cellular adaptation', 'Cellular destruction'], clue: 'the described response is viable and reversible when the stress is removed', reasons: ['apoptosis is programmed cell death and is not an adaptive steady state', 'necrosis is irreversible cell death', 'cellular adaptation is the reversible viable response described', 'cellular destruction contradicts reversibility and preserved viability'] },
  { ref: 'M04', page: 1, key: 'A', stem: 'The shrinkage in the size of the cell due to loss of cell substance defined as:', options: ['Atrophy', 'Hypertrophy', 'Hyperplasia', 'Dysplasia'], clue: 'loss of cell substance with reduced cell size defines atrophy', reasons: ['atrophy is cell shrinkage caused by loss of cell substance', 'hypertrophy increases cell size', 'hyperplasia increases cell number', 'dysplasia is disordered atypical growth rather than simple shrinkage'] },
  { ref: 'M05', page: 1, key: 'B', stem: 'The form of cell injury in which the living cells (in groups following exposure respond by autolysis, with subsequent inflammation & calcification:', options: ['Apoptosis', 'Necrosis', 'Granulomatosis', 'Hyalinosis'], clue: 'grouped cell death with autolysis, inflammation and possible calcification is necrosis', reasons: ['apoptosis affects individual cells and usually avoids inflammation', 'necrosis matches grouped cell death, autolysis and inflammation', 'granulomatosis is a chronic inflammatory pattern rather than this form of cell death', 'hyalinosis is a descriptive glassy change rather than grouped cell death'] },
  { ref: 'M06', page: 1, key: 'C', stem: 'Acute inflammation is characterized by:', options: ['prolonged inflammatory process (weeks or months)', 'tissue destruction and fibrosis are common', 'immediate and early response to an injurious agent', 'Granuloma formation'], clue: 'acute inflammation is the rapid early host response', reasons: ['weeks or months describes chronic inflammation', 'tissue destruction and fibrosis are characteristic of chronic inflammation and repair', 'immediate and early response is the acute pattern', 'granuloma formation is a specialized chronic inflammatory response'] },
  { ref: 'M07', page: 1, key: 'D', stem: 'The cellular response has the following stages except:', options: ['Migration, rolling & adhesion of leukocytes', 'Transmigration of leukocytes', 'Chemotaxis', 'Immediate (momentary) vasoconstriction'], clue: 'vasoconstriction is a vascular event, while the other options describe leukocyte recruitment', reasons: ['migration, rolling and adhesion are stages of leukocyte recruitment', 'transmigration carries leukocytes across the vessel wall', 'chemotaxis directs extravascular leukocyte movement', 'immediate vasoconstriction is the printed exception because it is a vascular calibre change'] },
  { ref: 'M08', page: 2, key: 'B', stem: 'Pain caused mainly by:', options: ['histamine', 'bradykinin', 'prostaglandin E2', 'C5a'], clue: 'the printed comparison selects bradykinin as the principal inflammatory pain mediator', reasons: ['histamine mainly drives vasodilatation and permeability', 'bradykinin is the printed principal pain mediator', 'prostaglandin E2 sensitizes pain pathways but is not the source-keyed answer here', 'C5a chiefly promotes chemotaxis and anaphylatoxin activity'] },
  { ref: 'M09', page: 2, key: 'B', stem: 'Butter and bread appearance in:', options: ['Serous inflammation of pericardium', 'Fibrinous inflammation of pericardium', 'Suppurative (Purulent) inflammation of pericardium', 'Catarrhal inflammation of pericardium'], clue: 'fibrin coating opposed pericardial surfaces produces the named gross appearance', reasons: ['serous inflammation produces watery effusion rather than rough fibrinous surfaces', 'fibrinous pericarditis produces the bread-and-butter appearance', 'suppurative inflammation produces pus', 'catarrhal inflammation is a mucus-rich mucosal pattern rather than a pericardial one'] },
  { ref: 'M10', page: 2, key: 'A', stem: 'Edema:', options: ['increased fluid in interstitial tissue spaces or body cavities', 'increased blood flow to the tissues in response to an insult.', 'escape of blood outside blood vessels or cardiac chambers', 'circulation of insoluble material in the blood.'], clue: 'oedema is defined by abnormal fluid accumulation outside the vascular lumen', reasons: ['increased fluid in interstitial spaces or body cavities is the definition of oedema', 'increased tissue blood flow is hyperaemia', 'escape of blood is haemorrhage', 'circulation of insoluble material describes embolism'] },
  { ref: 'M11', page: 2, key: 'C', stem: 'Exudates is due to:', options: ['Increased hydrostatic pressure', 'Increased blood flow', 'Increased capillary permeability', 'Trauma to blood vessels'], clue: 'protein-rich inflammatory exudate forms when endothelial permeability increases', reasons: ['hydrostatic pressure classically produces a transudate when permeability remains intact', 'increased blood flow causes hyperaemia but does not itself define exudate formation', 'increased capillary permeability permits protein-rich exudate to escape', 'trauma may produce haemorrhage rather than the general inflammatory exudate mechanism'] },
  { ref: 'M12', page: 2, key: 'A', stem: 'Neutrophils function is to', options: ['Phagocytose the bacteria', 'Prepare the inflammatory area for repair', 'Production of immunoglobulin', 'Production of lymphokines'], clue: 'neutrophils are acute first-line phagocytes', reasons: ['phagocytosis and killing of bacteria are core neutrophil functions', 'macrophages have a larger role in clearing and organizing the repair environment', 'plasma cells produce immunoglobulins', 'activated lymphocytes produce lymphokines'] },
  { ref: 'M13', page: 2, key: 'D', stem: 'Histamine can be produced by:', options: ['neutrophils', 'monocyte', 'eosinophils', 'basophils'], clue: 'basophil granules contain histamine', reasons: ['neutrophils are primarily phagocytic granulocytes', 'monocytes become macrophages and are not the keyed histamine source', 'eosinophils specialize in antiparasitic and allergic effector functions', 'basophils contain and release histamine'] },
]
for (const question of questions) question.id = `Q-HU102-PAT-F10-${question.ref}`

const sourceRow = ({ id, title, institution, path, pages, sha, qualification, assessment: isAssessment }) => `# Item
## id
${id}
## title
${title}
## institution
${institution}
## collection_id
hu-y1
## source_relative_path
${path}
## media_type
application/pdf
## languages
en
## page_count
${pages}
## sha256
${sha}
## processing_status
pending
## rights
Local university material held for internal authoring only; no page image is redistributed.
## qualification
${qualification}
## is_assessment
${isAssessment ? 'yes' : 'no'}`

const sourceRows = [
  sourceRow({ id: assessment, title: 'General pathology MCQ and true/false bank with printed answers', institution: 'Helwan BMS-102 local corpus; visible attribution to Dr Ahmed Hassan', path: 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - MCQ Pathology.pdf', pages: 6, sha: 'a2b7d25d987469febab87a5a80fd52db5c8d74a1ade0dfabd6482fec9da63475', qualification: 'Tier-3 local pathology study bank. Pages 1–4 contain 25 MCQs with printed answer occurrences; the present slice uses M01 and M03–M13 only. It is not an authenticated sitting, official departmental key or mark scheme.', assessment: true }),
  sourceRow({ id: orientation, title: 'Introduction to pathology and cellular adaptation — BMS-102', institution: 'Faculty of Medicine, Helwan University', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 1 - Orientation/Main_stream_Lecture_1_introduction_to_pathology_adaptation_2026.pdf', pages: 82, sha: 'd270bc32d14620134e75fc33684afd3f45a1a98835dd77bfecf1ec1e7e16416a', qualification: 'Current dated HU-BMS-102 theoretical teaching lecture for academic year 2025–2026. It supplies local curriculum wording and is not an assessment instrument.', assessment: false }),
  sourceRow({ id: cellInjury1, title: 'Cell Injury 1 — Helwan BMS-102 pathology lecture', institution: 'Faculty of Medicine, Helwan University', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 2 - Cell Injury 1/Cell injury lecture 1.pdf', pages: 51, sha: '7c79d90e00f17c534be66ba3cfa964bf2972c7a4767985e9c1a20d05469350f0', qualification: 'Tier-4 Helwan theoretical teaching carrier visibly attributed to Dr Enas Megahed Elhosary. It supplies local cell-injury teaching, not an official answer key.', assessment: false }),
  sourceRow({ id: circulation1, title: 'Circulation 1 — Helwan BMS-102 pathology lecture', institution: 'Faculty of Medicine, Helwan University', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 4 - Circulation 1/Main-stream-circulatory-1-new.pdf', pages: 50, sha: '50d9ef5f2db5dc46e3e3b10da4844e90c8c4cee5d94b7a0fc800960d83e939da', qualification: 'Current governed HU-BMS-102 circulation teaching carrier. It directly supplies the local oedema definition and is not an assessment instrument.', assessment: false }),
  sourceRow({ id: inflammation1, title: 'Inflammation 1 — Helwan BMS-102 pathology lecture', institution: 'Faculty of Medicine, Helwan University', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 5 - Inflammation 1/Inflammation-lecture-1.pdf', pages: 37, sha: 'eaea111707b57559a9042fc7c7fcd737cfbf326a5bf28fba026252566575fdc7', qualification: 'Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary. It supplies local acute-inflammation teaching, not an official answer key.', assessment: false }),
  sourceRow({ id: inflammation2, title: 'Inflammation 2 — Helwan BMS-102 pathology lecture', institution: 'Faculty of Medicine, Helwan University', path: 'Year 1/BMS 102/Pathology/Theoretical/Lec 7 - Inflammation 2/Inflammation lecture 2.pdf', pages: 53, sha: '949c1820aea58bded856011cc31bd8ce958941ce7f17e4c390cb1343b8d1677d', qualification: 'Tier-4 Helwan theoretical lecture visibly attributed to Dr Enas Megahed Elhosary. It supplies local inflammatory-pattern teaching, not an official answer key.', assessment: false }),
].join('\n---\n\n')

const conceptQuestions = (concept) => questions.filter((question) => question.ref === concept.ref)
const articleSources = (article) => [...new Set(concepts.filter((concept) => concept.article === article).flatMap((concept) => concept.teaching.map((citation) => citation.source))), assessment]

const conceptRow = (concept) => `# Item
## label
${concept.label}
## id
${concept.id}
## canonical_key
${concept.key}
## aliases
${concept.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${concept.definition}
## explicit_objective
${concept.objective}
## pitfalls
${concept.pitfalls}
## concept_type
${concept.type}
## status
Draft
## subject
${concept.subjectCode}
## primary_node_id
${concept.primary}
## secondary_node_ids
${concept.secondary}
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${concept.micro} > ${concept.nano}
## article_ids
${concept.article}
## related_article_ids
${[foundationsArticle, inflammationArticle, oedemaArticle].filter((id) => id !== concept.article).join('\n')}
## related_concept_ids
${concepts.filter((other) => other.article === concept.article && other.id !== concept.id).map((other) => other.id).join('\n')}
## resource_ids
${[...new Set([...concept.teaching.map((citation) => citation.source), assessment])].join('\n')}
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
## support_mode
direct_statement
## confidence
0.92
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | Family-10 ${concept.ref}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${concept.teaching.map((citation) => `[Teaching p${citation.page}] ${citation.text}`).join('\n')}
[Assessment p${conceptQuestions(concept)[0].page} ${concept.ref}] ${conceptQuestions(concept)[0].stem} Answer: ${conceptQuestions(concept)[0].options['ABCD'.indexOf(conceptQuestions(concept)[0].key)]}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
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
sourceCandidateIds: Family 10 completed the four-query search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New HU overlay; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: ${concept.reuse ? 'Standalone-complete HU overlay preserving the exact governed concept ID, canonical key and meaning.' : 'New Family-10 question-led concept after the governed no-same-scope decision.'}`

const explanation = (question, index) => {
  const correct = 'ABCD'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive distinction is that ${question.clue}. This preserves the visibly printed answer and exact option wording while the record remains Draft.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive distinction is that ${question.clue}, which supports ${question.options[correct]}. The explanation remains tied to governed teaching and the exact assessment occurrence.`
}

const questionRow = (question) => {
  const concept = byRef[question.ref]
  const sources = [...new Set([assessment, ...concept.teaching.map((citation) => citation.source)])]
  return `# Item
## id
${question.id}
## title
${question.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${question.stem}
## format
single best answer
## derived_from

## correct_answer
${question.key}
${question.options.map((option, index) => `## answer_${'abcd'[index]}\n${option}\n## explanation_${'abcd'[index]}\n${explanation(question, index)}`).join('\n')}
## topic
General pathology
## subtopic
${concept.micro}
## difficulty
Easy
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${concept.micro} > ${concept.nano}
## clinical_relevance
0.76
## academic_relevance
0.98
## cognitive_effort_score
0.48
## exam_weight_by_year
HU_Y1=0.84
## question_only_for
HU_Y1
## concept_ids
${concept.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
Low
## setting
Both
## reasoning_level
1
## inferred_difficulty
44
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${sources.join('\n')}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${question.page}, Family-10 ${question.ref}: exact stem, option order and visibly printed answer ${question.options['ABCD'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching context: ${concept.teaching.map((citation) => `${citation.source}, PDF p${citation.page}`).join('; ')}.
## attachments

## attached_image

## author_notes
Exact source wording, capitalization, punctuation and option order are preserved. No official sitting, marks, recurrence or candidate response is inferred. M02 is a separate valid phrase-keyed occurrence held for a later schema-aware slice because it has no option contract. M14 onward and all true/false prompts are excluded from this slice.${concept.reuse ? ' This row reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
60
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, otherArticles, micro, summary, sections, loses, basis }) => `# Item
## id
${id}
## title
${title}
## arabic_title

## aliases
${aliases.join('\n')}
## subject
fnd
## topic
General pathology
## subtopic
${micro}
## microtopic
Question-led definitions and distinctions
## nanotopic
Family-10 exact-key concepts
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## summary
${summary}
## sections
### Definition
${subset.map((concept) => concept.display).join(' ')}

### Mechanism
${sections}

### Key determinants
${subset.map((concept) => concept.objective).join(' ')}

### Clinical significance
These distinctions prevent category errors between causes, mechanisms, morphologic changes and cellular effects. Each linked question retains its exact printed answer while the explanatory teaching remains Draft pending independent review.
## published_summary

## published_sections

## hold_these
${subset.map((concept) => concept.display).join('\n')}
## lose_the_mark
${loses.join('\n')}
## related_concepts
${subset.map((concept) => concept.id).join('\n')}
## related_articles
${otherArticles.join('\n')}
## question_ids
${subset.map((concept) => conceptQuestions(concept)[0].id).join('\n')}
## resource_ids
${articleSources(id).join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${micro}
## university_notes
hu: Restricted to HU-BMS-102 Year-1. Governed Helwan lectures supply local teaching and Family-10 supplies exact auxiliary printed-answer occurrences without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${concept.currCit}, ${concept.asmCit}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${articleSources(id).join('\n')}
## claim_ids
${subset.map((concept) => concept.claim).join('\n')}
## span_ids
${subset.map((concept) => concept.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
${basis}
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication. The assessment carrier is auxiliary and its printed answers are not described as an authenticated official key.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Exact source wording is retained in linked questions; prose standardizes terminology without changing printed answers.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for these tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const foundationConcepts = concepts.filter((concept) => concept.article === foundationsArticle)
const inflammationConcepts = concepts.filter((concept) => concept.article === inflammationArticle)
const oedemaConcepts = concepts.filter((concept) => concept.article === oedemaArticle)
const articles = [
  articleRow({
    id: foundationsArticle, title: 'Pathogenesis, cellular adaptation, atrophy and necrotic cell death', aliases: ['Question-led foundations of general pathology', 'Adaptation and necrosis distinctions'], subset: foundationConcepts, otherArticles: [inflammationArticle, oedemaArticle], micro: 'Introduction, adaptation and cell injury',
    summary: 'Pathogenesis explains how a cause produces disease manifestations. Cells may adapt reversibly to stress, including by atrophy, whereas necrosis is irreversible grouped cell death with membrane failure, autolysis and inflammation.',
    sections: `### Pathogenesis versus aetiology\n${byRef.M01.display} Aetiology asks why disease begins; pathogenesis asks how the cause generates lesions and symptoms. Morphology describes the structural result, and fate describes what eventually happens.\n\n### Reversible adaptation\n${byRef.M03.display} Adaptation establishes a new viable steady state. Hypertrophy increases cell size, hyperplasia increases cell number, atrophy decreases cell mass, and metaplasia changes the differentiated cell type.\n\n### Atrophy\n${byRef.M04.display} The decisive feature is loss of cell substance with reduced size. It should not be confused with hypoplasia, which is underdevelopment, or dysplasia, which is disordered atypical proliferation.\n\n### Irreversible injury\n${byRef.M05.display} Membrane disruption permits enzymatic digestion and leakage, which recruits inflammation. Dystrophic calcium may later deposit in necrotic tissue. Apoptosis differs by affecting individual cells with preserved membranes and little surrounding inflammation.\n\n### Exam approach\nFirst classify what the stem asks: cause, mechanism, structural change, adaptive response or cell death. Then use reversibility, cell number and membrane integrity to separate the close alternatives.`,
    loses: ['Using aetiology and pathogenesis as synonyms.', 'Calling irreversible cell death an adaptation.', 'Confusing decreased cell mass in atrophy with increased cell number in hyperplasia.', 'Choosing apoptosis when grouped autolysis and inflammation are explicit.'],
    basis: 'Current Helwan Orientation pp10,14,67 and Cell Injury 1 p34 supply direct teaching; Family-10 p1 supplies four exact printed-answer occurrences.',
  }),
  articleRow({
    id: inflammationArticle, title: 'Acute inflammation: timing, leukocyte recruitment, mediators and fibrinous morphology', aliases: ['Question-led acute inflammatory response', 'Cells mediators and bread-and-butter pericarditis'], subset: inflammationConcepts, otherArticles: [foundationsArticle, oedemaArticle], micro: 'Acute inflammation',
    summary: 'Acute inflammation is a rapid early response. Leukocytes roll, adhere, transmigrate and follow chemotactic gradients; neutrophils phagocytose bacteria. Bradykinin mediates pain, basophils release histamine, and fibrinous pericarditis produces a bread-and-butter surface.',
    sections: `### Rapid host response\n${byRef.M06.display} Acute inflammation delivers plasma proteins and leukocytes quickly. Fibrosis and granuloma formation instead point to repair or chronic inflammation.\n\n### Leukocyte recruitment\n${byRef.M07.display} After vascular changes, leukocytes marginated along the wall roll, adhere firmly, cross the endothelium and migrate through tissue by chemotaxis. Momentary vasoconstriction belongs to the vascular phase and is not a cellular recruitment stage.\n\n### Chemical mediators\n${byRef.M08.display} ${byRef.M13.display} Histamine is prominent in early vascular permeability, whereas bradykinin is the source-keyed main pain mediator. Matching a mediator to its effect is more reliable than selecting any molecule known to participate in inflammation.\n\n### Effector cells\n${byRef.M12.display} Antibody production belongs to plasma cells and lymphokine production to lymphocytes; neutrophils are recruited to ingest and kill bacteria and clear necrotic debris.\n\n### Morphologic pattern\n${byRef.M09.display} Fibrin-rich exudate roughens opposing pericardial surfaces. Serous inflammation is watery, purulent inflammation produces pus, and catarrhal inflammation affects mucosa with mucus-rich discharge.`,
    loses: ['Calling vasoconstriction a leukocyte-recruitment stage.', 'Assigning immunoglobulin or lymphokine production to neutrophils.', 'Selecting serous or purulent pericarditis for the bread-and-butter pattern.', 'Choosing histamine merely because it is an early mediator when the item asks about pain.'],
    basis: 'Helwan Inflammation 1 pp12,16,26,31,34,36 and Inflammation 2 p26 supply direct teaching; Family-10 pp1–2 supply six exact printed-answer occurrences.',
  }),
  articleRow({
    id: oedemaArticle, title: 'Oedema and inflammatory exudate: definitions and mechanism', aliases: ['Question-led oedema and exudation', 'Interstitial fluid and capillary permeability'], subset: oedemaConcepts, otherArticles: [foundationsArticle, inflammationArticle], micro: 'Haemodynamic disorders',
    summary: 'Oedema is abnormal fluid in interstitial tissue spaces or body cavities. In inflammation, increased capillary permeability allows protein-rich fluid to escape as exudate; hydrostatic imbalance without endothelial leak more often produces transudate.',
    sections: `### Definition\n${byRef.M10.display} The definition concerns fluid outside the normal intravascular compartment. Increased blood flow is hyperaemia, blood escaping vessels is haemorrhage, and circulating insoluble material is embolism.\n\n### Exudate mechanism\n${byRef.M11.display} Inflammatory mediators open endothelial gaps or injure endothelium, allowing proteins and cells to leave the microcirculation. The protein-rich fluid raises interstitial volume and contributes to swelling.\n\n### Exudate versus transudate\nAn exudate reflects increased permeability and carries relatively abundant protein and inflammatory cells. A transudate reflects hydrostatic or oncotic imbalance across an intact barrier and is relatively protein poor. This distinction explains why increased hydrostatic pressure is not the keyed exudate mechanism.\n\n### Exam approach\nDefine the material and compartment first. Fluid accumulation is oedema; protein-rich inflammatory leakage is exudate; red-cell escape is haemorrhage; increased intravascular flow is hyperaemia.`,
    loses: ['Defining oedema as increased blood flow.', 'Calling haemorrhage an exudate.', 'Choosing hydrostatic pressure without distinguishing transudate from inflammatory exudate.', 'Treating any vascular injury as equivalent to the regulated permeability response.'],
    basis: 'Helwan Circulation 1 p9 and Inflammation 1 pp18–19 supply direct teaching; Family-10 p2 supplies two exact printed-answer occurrences.',
  }),
].join('\n---\n\n')

const claimRow = (concept) => `# Item
## id
${concept.claim}
## concept_id
${concept.id}
## subject
${concept.subject}
## predicate
${concept.predicate}
## object
${concept.object}
## display_text
${concept.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.92
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: governed Helwan teaching plus an auxiliary exact printed answer; no official-key authority inferred`

const curriculumCitation = (concept) => `# Item
## id
${concept.currCit}
## claim_id
${concept.claim}
## resource_id
${concept.teaching[0].source}
## evidence_role
local_curriculum
## support_span
${concept.teaching.map((citation) => citation.text).join(' ')}
## locator_type
page
## locator_page
${concept.teaching[0].page}
## locator_section
${concept.micro}
## locator_detail
${concept.teaching.map((citation) => `PDF p${citation.page}`).join(', ')}, governed Helwan teaching source
## context_note
Local curriculum support only; independent medical verification remains required.
## confidence
0.92
## counts_as_claim_evidence
no`

const assessmentCitation = (question) => {
  const concept = byRef[question.ref]
  return `# Item
## id
${concept.asmCit}
## claim_id
${concept.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${question.stem} Answer: ${question.options['ABCD'.indexOf(question.key)]}.
## locator_type
page
## locator_page
${question.page}
## locator_section
Family 10 ${question.ref}
## locator_detail
PDF p${question.page}, exact prompt and visibly printed answer
## context_note
Tier-3 local keyed study-bank evidence only; not an official exam or authenticated official key. M02 remains a separate valid phrase-keyed hold because it has no options.
## confidence
0.95
## counts_as_claim_evidence
no`
}

const spanRow = (concept) => `# Item
## id
${concept.span}
## article_id
${concept.article}
## section_id
${concept.article.toLowerCase()}-${concept.nano.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${concept.display}
## claim_ids
${concept.claim}
## citation_ids
${concept.currCit}
${concept.asmCit}`

const relationDefs = [
  ['M03', 'associated_with', 'M04', 'atrophy is one of the major cellular adaptations'],
  ['M06', 'associated_with', 'M07', 'the rapid acute response recruits leukocytes through the ordered cellular sequence'],
  ['M07', 'associated_with', 'M12', 'recruited neutrophils enter tissue and phagocytose bacteria'],
  ['M08', 'associated_with', 'M06', 'bradykinin mediates pain during the acute inflammatory response'],
  ['M09', 'is_a', 'M06', 'fibrinous pericarditis is a morphologic pattern of acute inflammation'],
  ['M11', 'associated_with', 'M10', 'permeability-mediated exudation increases interstitial fluid and contributes to oedema'],
  ['M13', 'associated_with', 'M11', 'histamine release promotes the vascular permeability underlying inflammatory exudation'],
]
const relationRow = ([source, type, target, scope]) => {
  const a = byRef[source]
  const b = byRef[target]
  return `# Item
## source
${a.id}
## type
${type}
## target
${b.id}
## evidence_claim_ids
${a.claim}
${b.claim}
## citation_ids
${a.currCit}
${b.currCit}
## verification_status
needs_evidence
## confidence
0.86
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Pathology faculty`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family10-part1-sources.md', sourceRows],
  ['article/HU-BMS-102-pathology-family10-part1-articles.md', articles],
  ['concept/HU-BMS-102-pathology-family10-part1-concepts.md', concepts.map(conceptRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-part1-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family10-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family10-part1-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family10-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '10-part1', refs: questions.map((question) => `F10-${question.ref}`), keys: questions.map((question) => question.key),
  released: { sources: 6, articles: 3, concepts: 12, newConcepts: 5, standaloneCompleteConceptReuses: 7, questions: 12, claims: 12, citations: 24, spans: 12, relations: 7 },
  holds: { validPhraseKeyed: ['F10-M02 — Natural history of the disease'], laterMcqAndTrueFalse: 'Excluded from Part1' },
}, null, 2))
