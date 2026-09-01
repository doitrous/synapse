import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'
const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const A1='ART-HU-BMS102-PAT-F150-NECROSIS',A2='ART-HU-BMS102-PAT-F150-FAT-NECROSIS-APOPTOSIS'
const specs=[
  {
    "ref": "Q01",
    "key": "C",
    "canonical": "adaptation-exception-apoptosis",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "The following are examples of adaptation except:",
    "options": [
      "Local reaction of vascularized connective tissue",
      "Programmed cell death",
      "Death of cells in living body",
      "Reversible cell injury",
      "Causes of the disease"
    ],
    "correct": "The printed right-column key identifies C) Death of cells in living body as the answer to this exact source question.",
    "concept": "CON-FND-51DCC9CE9BD364"
  },
  {
    "ref": "Q02",
    "key": "D",
    "canonical": "apoptosis-irreversible-cell-change",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "Which of the following is irreversible change seen in a cell:",
    "options": [
      "Hydropic degeneration",
      "Fatty degeneration",
      "Cloudy swelling",
      "Apoptosis",
      "Amyloidosis"
    ],
    "correct": "The printed right-column key identifies D) Apoptosis as the answer to this exact source question.",
    "label": "Apoptosis is source-keyed as an irreversible cellular change"
  },
  {
    "ref": "Q03",
    "key": "C",
    "canonical": "pathology.cell-injury.hypoxia-most-common-cause-source-key",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "The most common cause of cell injury and cell death is:",
    "options": [
      "Mechanical injury",
      "Immunological injury",
      "Hypoxic injury",
      "Chemical injury",
      "Nutritional imbalance"
    ],
    "correct": "The printed right-column key identifies C) Hypoxic injury as the answer to this exact source question.",
    "concept": "CON-FND-32AA09BB573026"
  },
  {
    "ref": "Q04",
    "key": "A",
    "canonical": "pathology.necrosis.coagulative-most-common-pattern-source-key",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "The most common morphological pattern of cell death is:",
    "options": [
      "Coagulative necrosis",
      "Fat necrosis",
      "Liquefactive necrosis",
      "Caseous necrosis",
      "Fibrinoid necrosis"
    ],
    "correct": "The printed right-column key identifies A) Coagulative necrosis as the answer to this exact source question.",
    "concept": "CON-FND-8B5F2D33342C3B"
  },
  {
    "ref": "Q05",
    "key": "D",
    "canonical": "ischemic-cell-injury-calcium-influx",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "You are asked to participate in a research project on myocardial infarction in a rat model. Which of the following occurs in ischemic cell injury:",
    "options": [
      "Efflux of Na+",
      "Influx of K+",
      "Influx of K+ and H2O",
      "Influx of Ca++",
      "Influx of Na+ and K+"
    ],
    "correct": "The printed right-column key identifies D) Influx of Ca++ as the answer to this exact source question."
  },
  {
    "ref": "Q06",
    "key": "B",
    "canonical": "myocardial-infarction-coagulative-necrosis",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "Myocardial infarction is a type of:",
    "options": [
      "Liquefactive necrosis",
      "Coagulative necrosis",
      "Fat necrosis",
      "Caseous necrosis",
      "Fibrinoid necrosis"
    ],
    "correct": "The printed right-column key identifies B) Coagulative necrosis as the answer to this exact source question."
  },
  {
    "ref": "Q07",
    "key": "B",
    "canonical": "ischemia-causes-coagulative-necrosis",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "Coagulative necrosis usually results from:",
    "options": [
      "Abscess formation",
      "Ischemia",
      "Trauma",
      "Tuberculosis",
      "Syphilis"
    ],
    "correct": "The printed right-column key identifies B) Ischemia as the answer to this exact source question."
  },
  {
    "ref": "Q08",
    "key": "D",
    "canonical": "necrosis.liquefactive.cns-infarct-and-pus",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "Which tissue is the most susceptible to liquefactive necrosis following ischemic injury:",
    "options": [
      "Pancreas",
      "Liver",
      "Spleen",
      "Brain",
      "Intestine"
    ],
    "correct": "The printed right-column key identifies D) Brain as the answer to this exact source question.",
    "concept": "CON-FND-88508ABAB84A67"
  },
  {
    "ref": "Q09",
    "key": "C",
    "canonical": "necrosis.caseation.tuberculous-cheese-like",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "A 29-year-old man hospitalized for AlDS is found to have pulmonary tuberculosis. Which type of necrosis is found in this granulomatous lesions:",
    "options": [
      "Coagulative",
      "Liquefactive",
      "Caseous",
      "Fibrinoid",
      "Enzymatic"
    ],
    "correct": "The printed right-column key identifies C) Caseous as the answer to this exact source question.",
    "concept": "CON-FND-5B3B6BA12670C7"
  },
  {
    "ref": "Q10",
    "key": "E",
    "canonical": "celldeath.contrast.necrosis-versus-apoptosis",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "All of the following are reversible pathological changes except:",
    "options": [
      "Vacuolar degeneration",
      "Mucoid change",
      "Cloudy swelling",
      "Hyaline change",
      "Necrosis"
    ],
    "correct": "The printed right-column key identifies E) Necrosis as the answer to this exact source question.",
    "concept": "CON-FND-2CDE9A5C884133"
  },
  {
    "ref": "Q11",
    "key": "D",
    "canonical": "necrosis-cell-death-definition",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "Necrosis means:",
    "options": [
      "Abnormal storage of glycerides",
      "Cellular degeneration",
      "Reversible cell damage",
      "Cell death",
      "Hypoxia"
    ],
    "correct": "The printed right-column key identifies D) Cell death as the answer to this exact source question."
  },
  {
    "ref": "Q12",
    "key": "D",
    "canonical": "irreversible-injury-nuclear-fragmentation",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "Irreversible cell injury is evident by light microscope by:",
    "options": [
      "Swelling of the cytoplasm",
      "Stretching of the cell membrane",
      "Vacuolation of the cytoplasm",
      "Fragmentation of the nucleus",
      "Swelling of the mitochondria"
    ],
    "correct": "The printed right-column key identifies D) Fragmentation of the nucleus as the answer to this exact source question."
  },
  {
    "ref": "Q13",
    "key": "E",
    "canonical": "necrosis-types-exception-venous-congestion",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "The following are types of necrosis except:",
    "options": [
      "Coagulative",
      "Liquefactive",
      "Fibrinoid",
      "Caseous",
      "Venous congestion"
    ],
    "correct": "The printed right-column key identifies E) Venous congestion as the answer to this exact source question."
  },
  {
    "ref": "Q14",
    "key": "B",
    "canonical": "coagulative-necrosis-gross-dull-firm",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "The most suitable description of coagulative necrosis is:",
    "options": [
      "Cheese-like material.",
      "Dull, swollen firm area.",
      "Green black discoloration.",
      "Soft liquefying material.",
      "White foci surrounded by hyperemic ring."
    ],
    "correct": "The printed right-column key identifies B) Dull, swollen firm area. as the answer to this exact source question."
  },
  {
    "ref": "Q15",
    "key": "A",
    "canonical": "necrosis.coagulative.ischaemic-protein-denaturation",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "You are asked to write a microscopic description of the coagulative necrosis that was noted in the heart of a patient who died of a heart attack because of cocaine abuse. Which of the following best describes coagulative necrosis:",
    "options": [
      "Eosinophilic cytoplasm with cell outlines preserved",
      "Granular friable mass of material devoid of cell outline",
      "Localized solid basophilic lesion with calcification",
      "Necrosis in which tissue is converted to fluid",
      "None of the above"
    ],
    "correct": "The printed right-column key identifies A) Eosinophilic cytoplasm with cell outlines preserved as the answer to this exact source question.",
    "concept": "CON-FND-5285A9707E61CA"
  },
  {
    "ref": "Q16",
    "key": "B",
    "canonical": "abscess-liquefactive-necrosis-identification",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "Which of the following types of necrosis is characteristic of abscesses:",
    "options": [
      "Coagulation necrosis",
      "Liquefaction necrosis",
      "Caseous necrosis",
      "Fat necrosis",
      "Gangrenous necrosis"
    ],
    "correct": "The printed right-column key identifies B) Liquefaction necrosis as the answer to this exact source question."
  },
  {
    "ref": "Q17",
    "key": "B",
    "canonical": "necrosis.caseation.tuberculous-cheese-like",
    "article": A1,
    "qp": 4,
    "kp": 4,
    "stem": "Caseation necrosis is most characteristic of:",
    "options": [
      "Acute myocardial infarction",
      "TB",
      "Acute pancreatitis",
      "Brain infarction",
      "Pulmonary pneumoconiosis"
    ],
    "correct": "The printed right-column key identifies B) TB as the answer to this exact source question.",
    "concept": "CON-FND-5B3B6BA12670C7"
  },
  {
    "ref": "Q18",
    "key": "D",
    "canonical": "traumatic-breast-fat-necrosis-cause",
    "article": A2,
    "qp": 4,
    "kp": 4,
    "stem": "Fat necrosis might be found in which of the following conditions:",
    "options": [
      "Brain injury",
      "Muscle injury",
      "Trauma of the shoulder",
      "Trauma of the breast",
      "Trauma of the bowel"
    ],
    "correct": "The printed right-column key identifies D) Trauma of the breast as the answer to this exact source question."
  },
  {
    "ref": "Q19",
    "key": "B",
    "canonical": "breast-fat-necrosis-morphology-diagnosis",
    "article": A2,
    "qp": 4,
    "kp": 4,
    "stem": "A female patient with a hard breast mass. Biopsy from the mass showed ruptured fat cells, chronic inflammatory cells, fibrosis and calcification. The most likely diagnosis is:",
    "options": [
      "Breast cancer",
      "Fat necrosis",
      "TB granuloma",
      "Gumma",
      "Fatty change"
    ],
    "correct": "The printed right-column key identifies B) Fat necrosis as the answer to this exact source question."
  },
  {
    "ref": "Q20",
    "key": "B",
    "canonical": "necrosis.fat.traumatic-and-enzymatic",
    "article": A2,
    "qp": 4,
    "kp": 4,
    "stem": "The following inflammation leads to fat necrosis:",
    "options": [
      "Mastitis",
      "Pancreatitis",
      "Appendicitis",
      "Hepatitis",
      "Pyelonephritis"
    ],
    "correct": "The printed right-column key identifies B) Pancreatitis as the answer to this exact source question.",
    "concept": "CON-FND-6626C19B61A23B"
  },
  {
    "ref": "Q21",
    "key": "C",
    "canonical": "necrosis.fat.traumatic-and-enzymatic",
    "article": A2,
    "qp": 4,
    "kp": 4,
    "stem": "Enzymatic fat necrosis occurs in:",
    "options": [
      "Fat embolism",
      "TB peritonitis",
      "Acute hemorrhagic pancreatitis",
      "Gas gangrene",
      "None of the above"
    ],
    "correct": "The printed right-column key identifies C) Acute hemorrhagic pancreatitis as the answer to this exact source question.",
    "concept": "CON-FND-6626C19B61A23B"
  },
  {
    "ref": "Q22",
    "key": "A",
    "canonical": "polyarteritis-nodosa-fibrinoid-necrosis",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "Fibrinoid necrosis:",
    "options": [
      "Occurs in polyarteritis nodosa",
      "Appears homogenous blue by Hx & E.",
      "Is due to clostridium infection",
      "Is caused by enzymatic lysis of fat",
      "Is seen characteristically in TB"
    ],
    "correct": "The printed right-column key identifies A) Occurs in polyarteritis nodosa as the answer to this exact source question."
  },
  {
    "ref": "Q23",
    "key": "D",
    "canonical": "apoptosis-regular-dna-fragmentation",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "In cell death by apoptosis:",
    "options": [
      "Cell membrane dissolves",
      "It is a type of caseous necrosis",
      "There's death of a large group of cells",
      "There's regular DNA fragmentation",
      "It causes severe inflammatory reaction"
    ],
    "correct": "The printed right-column key identifies D) There's regular DNA fragmentation as the answer to this exact source question."
  },
  {
    "ref": "Q24",
    "key": "C",
    "canonical": "apoptosis-genetic-activation-vs-coagulative-necrosis",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "Apoptosis differentiated from coagulative necrosis by that in apoptosis:",
    "options": [
      "There is inflammatory reaction",
      "There is cell membrane injury",
      "There is genetic activation",
      "Death affects group of cells",
      "The cause is always hypoxia or toxins"
    ],
    "correct": "The printed right-column key identifies C) There is genetic activation as the answer to this exact source question."
  }
]
const out=authorFamily(repo,{family:150,source:'src_92a00e70d341f27e46fd',subtopic:'Cell death',sourceMeta:{title:'Cell injury 2',institution:'Helwan local teaching collection',path:'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Cell injury 2 MCQ.pdf',pages:5,sha:'92a00e70d341f27e46fde13c81d347bba647ad2f3de00dc38b803efe2bd2c429',rights:'Local instructor bank held for internal authoring only; no source page is redistributed.',qualification:'Tier-3 Ahmed Hassan instructor MCQ study bank with twenty-five stable printed right-column letter keys. One literal duplicate prompt is excluded. Not an authenticated exam or official key.'},authorityNote:'Ahmed Hassan local instructor study bank with a stable printed letter-key column; not an authenticated Helwan exam or official department key.',evidenceBasis:'Exact numbered stems, options and aligned printed right-column letters in the five-page instructor bank.',notes:'Q25 is a literal copy of Q7 and is excluded as a second record. Source anomalies, including the malformed Q1 scope and exact printed terminology, remain literal and unrepaired.',uncertainty:'Tier-3 instructor-bank key only; no university masthead, module code, sitting, marks, candidate response or official-key declaration is visible.',freshness:'source_created_2025-04-06',keyDetail:'Printed right-column letter aligned to the numbered MCQ row',articles:[{id:A1,title:'Necrosis patterns in Family150',micro:'Necrosis patterns',summary:'The source bank tests causes, definitions and morphology of coagulative, liquefactive and caseous necrosis.'},{id:A2,title:'Fat necrosis and apoptosis in Family150',micro:'Fat necrosis and apoptosis',summary:'The source bank tests traumatic and enzymatic fat necrosis, fibrinoid necrosis and selected apoptosis features.'}],specs,relations:[{sourceRef:'Q03',targetRef:'Q05',type:'related_concepts',scope:'hypoxia is a source-keyed common injury cause while calcium influx is a tested ischemic mechanism'},{sourceRef:'Q06',targetRef:'Q08',type:'contrasts_with',scope:'myocardial infarction is keyed as coagulative whereas cerebral infarction is keyed as liquefactive necrosis'},{sourceRef:'Q09',targetRef:'Q06',type:'contrasts_with',scope:'tuberculosis-associated caseous necrosis differs from infarct-associated coagulative necrosis'},{sourceRef:'Q18',targetRef:'Q20',type:'contrasts_with',scope:'traumatic breast fat necrosis differs in setting from enzymatic pancreatitis-associated fat necrosis'},{sourceRef:'Q23',targetRef:'Q24',type:'related_concepts',scope:'regular DNA fragmentation and genetic activation are distinct source-keyed apoptosis features'}]})
console.log(JSON.stringify({...out,rawPrompts:25,rawAnswers:25,holds:0,exclusions:1,acceptedHandles:22},null,2))
