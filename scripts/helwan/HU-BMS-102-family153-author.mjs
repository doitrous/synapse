import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'

const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const A1='ART-HU-BMS102-PAT-F153-HYPOXIC-INJURY'
const A2='ART-HU-BMS102-PAT-F153-APOPTOSIS'
const specs=[
  {
    ref:'Q01',key:'A',canonical:'necrosis.caseation.tuberculous-cheese-like',concept:'CON-FND-5B3B6BA12670C7',article:A1,qp:1,kp:4,
    stem:'which of the following types of necrosis is most characteristic for TB?',
    options:['Caseous','Coagulative','Enzymatic','Fibrinoid','Liquefactive'],
    correct:'The terminal answer list identifies A) Caseous as the answer to this exact source question.'
  },
  {
    ref:'Q02',key:'E',canonical:'myocardial-hypoxia-anaerobic-glycolysis-glycogenolysis',article:A1,qp:1,kp:4,
    stem:'In a case of myocardial infarction Which of the following biochemical events most likely occurred during the period of hypoxia?',
    options:['Decreased hydrogen ion concentration','Increase in oxidative phosphorylation','Loss of intracellular Na+ and water','Stimulation of ATP synthesis','Stimulation of anaerobic glycolysis and glycogenolysis'],
    correct:'The terminal answer list identifies E) Stimulation of anaerobic glycolysis and glycogenolysis as the answer to this exact source question.'
  },
  {
    ref:'Q03',key:'D',canonical:'fibrinoid-necrosis-no-gross-appearance',article:A1,qp:1,kp:4,
    stem:"One of these types of necrosis don't appear grossly",
    options:['Caseous','Coagulative','Enzymatic','Fibrinoid','Liquefactive'],
    correct:'The terminal answer list identifies D) Fibrinoid as the answer to this exact source question.'
  },
  {
    ref:'Q04',key:'D',canonical:'reversible-cell-injury-feature-exception',article:A1,qp:2,kp:4,
    stem:'A 56-year-old man recovered from a myocardial infarction after his myocardium was entirely "saved" by immediate thrombolytic therapy. If it had been possible to examine microscopic sections of his heart during his ischemic episode, which of the following would be the most likely cellular change to be found?',
    options:['Karyolysis','Karyorrhexis','Pyknosis','Swelling of the endoplasmic reticulum'],
    correct:'The terminal answer list identifies D) Swelling of the endoplasmic reticulum as the answer to this exact source question.'
  },
  {
    ref:'Q05',key:'E',canonical:'necrosis-morphology-nuclear-changes',article:A1,qp:2,kp:4,
    stem:'A 56-year-old man dies 24 hours after the onset of substernal chest pain radiating down his left arm to the ulnar aspect of his fingertips. Which of the following morphologic myocardial findings is an indicator of irreversible injury?',
    options:['Cell blebs','Depletion of glycogen','Mitochondrial swelling','Myelin figures','Pyknotic nuclei'],
    correct:'The terminal answer list identifies E) Pyknotic nuclei as the answer to this exact source question.'
  },
  {
    ref:'Q06',key:'A',canonical:'brain-hypoxia-irreversible-three-five-minutes',article:A1,qp:2,kp:4,
    stem:'Hypoxic injury becomes irreversible in brain cell after:',
    options:['1- 3 to 5 minutes','2- 1 to 2 hours','3- 1 to 2 days','4- 10 hours'],
    correct:'The terminal answer list identifies A) 1- 3 to 5 minutes as the answer to this exact source question.'
  },
  {
    ref:'Q07',key:'B',canonical:'glutathione-peroxidase-radiolysis-ros-protection',article:A1,qp:3,kp:4,
    stem:'In an experiment, cells are subjected to radiant energy in the form of x-rays. This results in cell injury caused by hydrolysis of water. Which of the following cellular enzymes protects the cells from this type of injury?',
    options:['Phospholipase','Glutathione peroxidase','Endonuclease','Lactate dehydrogenase','Protease'],
    correct:'The terminal answer list identifies B) Glutathione peroxidase as the answer to this exact source question.'
  },
  {
    ref:'Q08',key:'A',canonical:'premenstrual-endometrial-apoptosis',article:A2,qp:3,kp:4,
    stem:'On day 28 of her menstrual cycle, a 23-year-old woman experiences onset of menstrual bleeding that lasts for 6 days. She has had regular cycles for many years. Which of the following processes is most likely occurring in the endometrium just before the onset of bleeding?',
    options:['Apoptosis','Caseous necrosis','Heterophagocytosis','Atrophy','Liquefactive necrosis'],
    correct:'The terminal answer list identifies A) Apoptosis as the answer to this exact source question.'
  },
  {
    ref:'Q09',key:'B',canonical:'p53-loss-chemotherapy-apoptosis-resistance',article:A2,qp:3,kp:4,
    stem:'In a clinical trial, a chemotherapeutic agent is given to patients with breast cancer metastases. Samples of the cancer cells are obtained and assessed for the presence of death of tumor cells by apoptosis. Mutational inactivation of which of the following products is most likely to render tumor cells resistant to the effects of such an agent?',
    options:['BCL-2','p53','NF-kB','Cytochrome P-450','Granzyme B'],
    correct:'The terminal answer list identifies B) p53 as the answer to this exact source question.'
  },
  {
    ref:'Q10',key:'B',canonical:'mitochondrial-cytochrome-c-apoptosis-trigger',article:A2,qp:4,kp:4,
    stem:'A 40-year-old man had undifferentiated carcinoma of the lung. Despite chemotherapy, the man died of widespread metastases. At autopsy, tumors were found in many organs. Histologic examination showed many foci in which Individual tumor cells appeared shrunken and deeply eosinophilic. Their nuclei exhibited condensed aggregates of chromatin under the nuclear membrane. The process affecting these shrunken tumor cells was most likely triggered by the release of which of the following substances into the cytosol?',
    options:['Lipofuscin','Cytochrome c','Catalase','Phospholipase','BCL-2'],
    correct:'The terminal answer list identifies B) Cytochrome c as the answer to this exact source question.'
  },
  {
    ref:'Q11',key:'A',canonical:'cell-injury-mechanisms',article:A2,qp:4,kp:4,
    stem:'A tissue preparation is experimentally subjected to a hypoxic environment. The cells in this tissue begin to swell, and chromatin begins to clump in the nucleus. ATPases are activated, and ATP production decreases. Which of the following ions released from mitochondria leads to these findings and to eventual cell death?',
    options:['Ca2+','Cl','HCO3','K+','Na+'],
    correct:'The terminal answer list identifies A) Ca2+ as the answer to this exact source question.'
  }
]

const out=authorFamily(repo,{
  family:153,
  source:'src_eb6c011d344ff77c05e1',
  subtopic:'Cell injury and death',
  sourceMeta:{
    title:'College MCQs Cell injury',
    institution:'Faculty of Medicine, Helwan University',
    path:'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs Cell injury dr Enas.pdf',
    pages:4,
    sha:'eb6c011d344ff77c05e1f88837e2777d655d62ead15b4965890e2bb58ee41d7b',
    rights:'Local Helwan-branded study carrier held for internal authoring only; no source page is redistributed.',
    qualification:'Tier-3 Helwan-branded keyed College-MCQ study carrier with a separate terminal 1–11 answer list. Not an authenticated examination, official key register, or student response.'
  },
  authorityNote:'Helwan-branded College-MCQ study carrier with a source-supplied terminal answer list; not an authenticated examination or official department key.',
  evidenceBasis:'Exact raster-visible stems and options on pages 1–4 paired in top-to-bottom, page-to-page order with the terminal numbered 1–11 answer list on page 4.',
  notes:'All source wording is retained literally, including Q3 grammar, Q6 duplicated ordinal-like option prefixes, Q7 hydrolysis wording, Q10 capitalization, and Q11 ion notation. Red circular capture artifacts are not treated as answer marks.',
  uncertainty:'Tier-3 teaching-bank key only; no module code, academic year, sitting, marks, duration, candidate field, official-key declaration, or named instructor attribution is visible.',
  freshness:'source_modified_2025-04-22',
  keyDetail:'Terminal numbered 1–11 answer list mapped to top-to-bottom, page-to-page question order',
  articles:[
    {id:A1,title:'Hypoxic injury and necrosis in Family153',micro:'Hypoxic injury and necrosis',summary:'The source bank tests selected necrosis patterns, hypoxic injury changes and antioxidant protection.'},
    {id:A2,title:'Apoptosis and injury signalling in Family153',micro:'Apoptosis and injury signalling',summary:'The source bank tests physiologic and tumour-cell apoptosis together with selected injury signalling.'}
  ],
  specs,
  relations:[
    {sourceRef:'Q02',targetRef:'Q04',type:'related_concepts',scope:'the source tests a biochemical hypoxic response and a reversible structural response in myocardium'},
    {sourceRef:'Q04',targetRef:'Q05',type:'contrasts_with',scope:'endoplasmic-reticulum swelling is keyed in the reversible case whereas pyknosis is keyed as irreversible morphology'},
    {sourceRef:'Q08',targetRef:'Q10',type:'related_concepts',scope:'the source tests a physiologic apoptotic setting and a tumour-cell intrinsic-apoptosis trigger'},
    {sourceRef:'Q09',targetRef:'Q10',type:'related_concepts',scope:'the source separately keys p53-linked treatment resistance and cytochrome-c release in apoptosis'},
    {sourceRef:'Q07',targetRef:'Q11',type:'contrasts_with',scope:'glutathione peroxidase is keyed as protection from radiant injury while calcium is keyed in hypoxic injury progression'}
  ]
})

console.log(JSON.stringify({...out,rawPrompts:11,rawAnswers:11,holds:0,exclusions:0,acceptedHandles:11,priorBmsReuses:5,conceptDelta:6},null,2))
