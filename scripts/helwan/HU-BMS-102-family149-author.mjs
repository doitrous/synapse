import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { authorFamily } from './HU-BMS-102-pathology-family-author-lib.mjs'
const repo=join(dirname(fileURLToPath(import.meta.url)),'..','..')
const A1='ART-HU-BMS102-PAT-F149-ADAPTATION',A2='ART-HU-BMS102-PAT-F149-METAPLASIA',A3='ART-HU-BMS102-PAT-F149-CELL-INJURY'
const specs=[
  {
    "ref": "Q01",
    "key": "D",
    "canonical": "adaptation-exception-apoptosis",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "The following are examples of adaptation except:",
    "options": [
      "Hypertrophy",
      "Hyperplasia",
      "Atrophy",
      "Apoptosis"
    ],
    "correct": "The printed right-column key identifies D) Apoptosis as the answer to this exact source question."
  },
  {
    "ref": "Q02",
    "key": "D",
    "canonical": "atrophy-causes-exception-nephrectomy",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "Atrophy may be the result of all of the followings except:",
    "options": [
      "Lack of innervation",
      "Reduction of blood supply",
      "Aging",
      "Nephrectomy",
      "Reduction of hormonal stimulation"
    ],
    "correct": "The printed right-column key identifies D) Nephrectomy as the answer to this exact source question."
  },
  {
    "ref": "Q03",
    "key": "C",
    "canonical": "pathological-atrophy-thymic-involution-exception",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "All of the following are examples of pathological atrophy except:",
    "options": [
      "An aortic aneurysm pressing on the surroundings",
      "Muscle atrophy in poliomyelitis",
      "Atrophy of the thymus during sexual maturation",
      "Atrophy of the thyroid in pituitary insufficiency"
    ],
    "correct": "The printed right-column key identifies C) Atrophy of the thymus during sexual maturation as the answer to this exact source question."
  },
  {
    "ref": "Q04",
    "key": "D",
    "canonical": "atrophy-sudden-ischemia-exception",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "Atrophy is not caused by:",
    "options": [
      "Cutting of nerve supply",
      "Disuse",
      "Senility",
      "Sudden cut of blood supply"
    ],
    "correct": "The printed right-column key identifies D) Sudden cut of blood supply as the answer to this exact source question."
  },
  {
    "ref": "Q05",
    "key": "C",
    "canonical": "pregnant-uterus-hypertrophy-example",
    "article": A1,
    "qp": 1,
    "kp": 1,
    "stem": "Which of the followings is an example of hypertrophy:",
    "options": [
      "Increased respiratory epithelium in response to Vit A deficiency",
      "Increase size of female breast during lactation",
      "Increase in size of female uterus during pregnancy",
      "Increase size of female breast during puberty",
      "Increase in liver size after partial hepatectomy"
    ],
    "correct": "The printed right-column key identifies C) Increase in size of female uterus during pregnancy as the answer to this exact source question."
  },
  {
    "ref": "Q06",
    "key": "C",
    "canonical": "pathology.adaptation.hypertrophy-associated-with-increased-workload",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "Occurs in response to increased muscle activity or sustained outflow resistance:",
    "options": [
      "Hypertrophy & hyperplasia of uterine muscle",
      "Hyperplasia of breast tissue",
      "Muscle hypertrophy",
      "Thyroid hyperplasia",
      "Hyperplasia of bone marrow"
    ],
    "correct": "The printed right-column key identifies C) Muscle hypertrophy as the answer to this exact source question.",
    "concept": "CON-FND-3A448A31F5D030"
  },
  {
    "ref": "Q07",
    "key": "D",
    "canonical": "puberty-pregnancy-thyroid-hyperplasia-source-key",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "Consequence of the increased metabolic demand of puberty & pregnancy:",
    "options": [
      "Hypertrophy & hyperplasia of uterine muscle",
      "Hyperplasia of breast tissue",
      "Muscle hypertrophy",
      "Thyroid hyperplasia",
      "Hyperplasia of bone marrow"
    ],
    "correct": "The printed right-column key identifies D) Thyroid hyperplasia as the answer to this exact source question."
  },
  {
    "ref": "Q08",
    "key": "B",
    "canonical": "pathology.cell-injury.cloudy-swelling-earliest-form-source-key",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "The earliest type of cell injury due to lack of oxygen is:",
    "options": [
      "Necrosis",
      "Cloudy swelling",
      "Hydropic swelling",
      "Fatty change",
      "Apoptosis"
    ],
    "correct": "The printed right-column key identifies B) Cloudy swelling as the answer to this exact source question.",
    "concept": "CON-FND-370074798CB753"
  },
  {
    "ref": "Q09",
    "key": "C",
    "canonical": "cloudy-swelling-organelle-mitochondria-source-key",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "The key cellular organelle responsible for the pathogenesis of cloudy swelling is:",
    "options": [
      "Smooth endoplasmic reticulum",
      "Micro-tubules",
      "Mitochondria",
      "Golgi apparatus",
      "Micro-filaments"
    ],
    "correct": "The printed right-column key identifies C) Mitochondria as the answer to this exact source question."
  },
  {
    "ref": "Q10",
    "key": "D",
    "canonical": "cloudy-swelling-nuclei-normal",
    "article": A1,
    "qp": 2,
    "kp": 2,
    "stem": "In cloudy swelling, the nuclei of the affected cells show:",
    "options": [
      "Pyknosis",
      "Karyorrhexis",
      "Karyolysis",
      "They are normal",
      "They are lost"
    ],
    "correct": "The printed right-column key identifies D) They are normal as the answer to this exact source question."
  },
  {
    "ref": "Q11",
    "key": "D",
    "canonical": "fatty-change-reversible-cellular-response",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "Which of the following cellular response to irritation is reversible:",
    "options": [
      "Amyloidosis",
      "Fat necrosis",
      "Apoptosis",
      "Fatty change",
      "Liquefactive necrosis"
    ],
    "correct": "The printed right-column key identifies D) Fatty change as the answer to this exact source question."
  },
  {
    "ref": "Q12",
    "key": "E",
    "canonical": "fatty-change-irreversibility-exception",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "Regarding fatty change, which is not true:",
    "options": [
      "It may be due to chronic alcoholism",
      "It can be caused by DM and malnutrition",
      "It is more often seen in the liver and heart",
      "It is a reversible lesion",
      "It is an irreversible lesion"
    ],
    "correct": "The printed right-column key identifies E) It is an irreversible lesion as the answer to this exact source question."
  },
  {
    "ref": "Q13",
    "key": "C",
    "canonical": "corticosteroid-steatosis-fatty-acid-uptake",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "Corticosteroids can cause steatosis by:",
    "options": [
      "Decreasing fatty acid oxidation",
      "Increasing acetate inside hepatocytes",
      "Increasing hepatic uptake of fatty acids",
      "Decreasing apoprotein formation",
      "Increasing esterification of fatty ac"
    ],
    "correct": "The printed right-column key identifies C) Increasing hepatic uptake of fatty acids as the answer to this exact source question."
  },
  {
    "ref": "Q14",
    "key": "E",
    "canonical": "partial-hepatectomy-surviving-cell-proliferation",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "A male patient had undergone partial hepatectomy. The remaining liver tissue would compensate by:",
    "options": [
      "Collagen synthesis",
      "Proliferation of fibroblasts",
      "Angiogenesis",
      "Activation of macrophages",
      "Proliferation of surviving cells"
    ],
    "correct": "The printed right-column key identifies E) Proliferation of surviving cells as the answer to this exact source question."
  },
  {
    "ref": "Q15",
    "key": "A",
    "canonical": "pathology.adaptation.hypertrophy-increased-cell-size-definition",
    "article": A1,
    "qp": 3,
    "kp": 3,
    "stem": "Hypertrophy is defined as:",
    "options": [
      " in the size of an organ due to increase in the size of its cells.",
      " in the size of an organ due to increase in the number of its cells.",
      "Congenital enlargement of an organ",
      "Arrest of the development of an organ",
      "Transformation of one kind of tissue into another kind."
    ],
    "correct": "The printed right-column key identifies A)  in the size of an organ due to increase in the size of its cells. as the answer to this exact source question.",
    "concept": "CON-FND-4392920DB19884"
  },
  {
    "ref": "Q16",
    "key": "B",
    "canonical": "pathology.adaptation.hypertrophy-increased-cell-size-definition",
    "article": A1,
    "qp": 4,
    "kp": 4,
    "stem": "Cellular hypertrophy is:",
    "options": [
      "An increase in cell number",
      "An increase in cell size",
      "A decrease in cell number",
      "A decrease in cell size"
    ],
    "correct": "The printed right-column key identifies B) An increase in cell size as the answer to this exact source question.",
    "concept": "CON-FND-4392920DB19884"
  },
  {
    "ref": "Q17",
    "key": "E",
    "canonical": "hypertension-cardiac-hypertrophy",
    "article": A1,
    "qp": 4,
    "kp": 4,
    "stem": "A 55 year old male patient has blood pressure of 150 / 95 mm Hg for more than 15 years. Which of the following cellular alterations can be seen in this heart:",
    "options": [
      "Atrophy",
      "Hyperplasia",
      "Metaplasia",
      "Hemosiderosis",
      "Hypertrophy"
    ],
    "correct": "The printed right-column key identifies E) Hypertrophy as the answer to this exact source question."
  },
  {
    "ref": "Q18",
    "key": "D",
    "canonical": "contralateral-nephrectomy-compensatory-renal-hypertrophy",
    "article": A1,
    "qp": 4,
    "kp": 4,
    "stem": "Hypertrophy of the kidney after contralateral nephrectomy is called:",
    "options": [
      "Hormonal hypertrophy",
      "Physiological hypertrophy",
      "Adaptive hypertrophy",
      "Compensatory hypertrophy"
    ],
    "correct": "The printed right-column key identifies D) Compensatory hypertrophy as the answer to this exact source question."
  },
  {
    "ref": "Q19",
    "key": "B",
    "canonical": "pathology.hyperplasia.organ-size-cell-number",
    "article": A1,
    "qp": 4,
    "kp": 4,
    "stem": "Hyperplasia means:",
    "options": [
      " in the size of cells, resulting in an increase in the size of the organ",
      " in the number of cells in an organ or tissue",
      "Reduced size of an organ or tissue resulting from a decrease in cell size & number",
      "Reversible change in which on differentiated cell type (epithelial or mesenchymal) is replaced by another cell type",
      "Disordered non-neoplastic cellular proliferation"
    ],
    "correct": "The printed right-column key identifies B)  in the number of cells in an organ or tissue as the answer to this exact source question.",
    "concept": "CON-FND-022049C93C4CD0"
  },
  {
    "ref": "Q20",
    "key": "D",
    "canonical": "pathology.hyperplasia.organ-size-cell-number",
    "article": A1,
    "qp": 4,
    "kp": 4,
    "stem": "Increased number of cellular elements is called:",
    "options": [
      "Degeneration",
      "Hypertrophy",
      "Metaplasia",
      "Hyperplasia",
      "Dysplasia"
    ],
    "correct": "The printed right-column key identifies D) Hyperplasia as the answer to this exact source question.",
    "concept": "CON-FND-022049C93C4CD0"
  },
  {
    "ref": "Q21",
    "key": "D",
    "canonical": "epithelial-metaplasia-in-smoking-and-bilharziasis",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "In habitual cigarette smoker, the normal ciliated columnar epithelial cells of the trachea and bronchi are often replaced by stratified squamous epithelial cells. this is an example of:",
    "options": [
      "Hypertrophy",
      "Hyperplasia",
      "Atrophy",
      "Metaplasia"
    ],
    "correct": "The printed right-column key identifies D) Metaplasia as the answer to this exact source question.",
    "concept": "CON-FND-5AD09BF9FC2420"
  },
  {
    "ref": "Q22",
    "key": "A",
    "canonical": "pathology.adaptation.metaplasia-adult-cell-substitution-definition",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "Metaplasia is:",
    "options": [
      "Change of one adult type of cell to another adult type",
      "An abnormal deposition of calcium salts",
      "An increase of number of cells in an organ or tissue",
      "Increase in the size of cells",
      "Increased cellular metabolism"
    ],
    "correct": "The printed right-column key identifies A) Change of one adult type of cell to another adult type as the answer to this exact source question.",
    "concept": "CON-FND-D754A739E976FD"
  },
  {
    "ref": "Q23",
    "key": "D",
    "canonical": "pathology.adaptation.metaplasia-adult-cell-substitution-definition",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "Metaplasia is defined as:",
    "options": [
      " in the size of the organ due to decrease in the number of its cells",
      " in the size of the organ due to increase in the number of its cells",
      " in the size of the organ due to increase in the size of its cells",
      "Transformation of one type of tissue into another of same category",
      "Failure of the organ to reach its final adult size"
    ],
    "correct": "The printed right-column key identifies D) Transformation of one type of tissue into another of same category as the answer to this exact source question.",
    "concept": "CON-FND-D754A739E976FD"
  },
  {
    "ref": "Q24",
    "key": "E",
    "canonical": "gallbladder-stone-epithelial-metaplasia",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "Metaplasia is a reversible change in which one adult cell type is replaced by another adult cell type of the same category. In which of the following situations is the process of epithelial metaplasia most likely occurred:",
    "options": [
      "Acute myocardial infarction",
      "Lactation during pregnancy",
      "Skin after exposure to sunlight",
      "Urinary obstruction due to enlarged prostate",
      "Irritation of gall bladder mucosa by a stone"
    ],
    "correct": "The printed right-column key identifies E) Irritation of gall bladder mucosa by a stone as the answer to this exact source question."
  },
  {
    "ref": "Q25",
    "key": "B",
    "canonical": "bronchial-keratinizing-squamous-metaplasia",
    "article": A2,
    "qp": 5,
    "kp": 5,
    "stem": "An area of keratinizing squamous epithelium lining a major bronchus is an example of:",
    "options": [
      "Heterotopia",
      "Metaplasia",
      "Dysplasia",
      "Atrophy"
    ],
    "correct": "The printed right-column key identifies B) Metaplasia as the answer to this exact source question."
  },
  {
    "ref": "Q27",
    "key": "D",
    "canonical": "reversible-injury-sodium-water-accumulation",
    "article": A3,
    "qp": 6,
    "kp": 6,
    "stem": "Reversible cell injury is characterized by:",
    "options": [
      "Nuclear changes as pyknosis and karyorrhexis",
      "Pathological calcification",
      "Formation of apoptotic bodies",
      "Accumulation of sodium and water inside the cell",
      "None of the above"
    ],
    "correct": "The printed right-column key identifies D) Accumulation of sodium and water inside the cell as the answer to this exact source question."
  },
  {
    "ref": "Q29",
    "key": "C",
    "canonical": "burn-epidermis-hydropic-degeneration",
    "article": A3,
    "qp": 6,
    "kp": 6,
    "stem": "Accumulation of excess fluid in epidermal cells in burns is an example of:",
    "options": [
      "Cloudy swelling",
      "Fatty change",
      "Hydropic (Vacuolar) degeneration",
      "Necrosis"
    ],
    "correct": "The printed right-column key identifies C) Hydropic (Vacuolar) degeneration as the answer to this exact source question."
  },
  {
    "ref": "Q30",
    "key": "D",
    "canonical": "fatty-change-reversible-cellular-response",
    "article": A3,
    "qp": 6,
    "kp": 6,
    "stem": "Which of the following cellular response to irritation is reversible:",
    "options": [
      "Amyloid deposition",
      "Fat necrosis",
      "Apoptosis",
      "Fatty change",
      "Liquefactive necrosis"
    ],
    "correct": "The printed right-column key identifies D) Fatty change as the answer to this exact source question."
  },
  {
    "ref": "Q31",
    "key": "C",
    "canonical": "hepatocyte-clear-vacuoles-triglycerides",
    "article": A3,
    "qp": 7,
    "kp": 7,
    "stem": "A 55-year old obese patient was found to have mildly enlarged liver and elevated liver enzymes. A liver biopsy was examined with a routine hematoxylin and eosin stains revealed clear spaces in the cytoplasm of most of the hepatocytes. These clear spaces are formed of:",
    "options": [
      "Calcium",
      "Cholesterol",
      "Triglycerides",
      "Hemosiderin",
      "Lipofuscin"
    ],
    "correct": "The printed right-column key identifies C) Triglycerides as the answer to this exact source question."
  },
  {
    "ref": "Q32",
    "key": "E",
    "canonical": "pathology.steatosis.fatty-liver-predisposition",
    "article": A3,
    "qp": 7,
    "kp": 7,
    "stem": "Accumulation of lipids within liver cells may be related to:",
    "options": [
      "Starvation of the patient",
      "Excessive alcohol intake by the patient",
      "Obesity",
      "Toxic injury to liver cells",
      "All of the above"
    ],
    "correct": "The printed right-column key identifies E) All of the above as the answer to this exact source question.",
    "concept": "CON-FND-4CAD16D517ABF4"
  },
  {
    "ref": "Q33",
    "key": "B",
    "canonical": "hepatic-fat-hepatocyte-cytoplasm",
    "article": A3,
    "qp": 7,
    "kp": 7,
    "stem": "In fatty change of the liver, fat is seen in:",
    "options": [
      "Wall of blood vessels",
      "Cytoplasm of hepatocytes",
      "Stroma of portal tracts",
      "All of the above",
      "None of the above"
    ],
    "correct": "The printed right-column key identifies B) Cytoplasm of hepatocytes as the answer to this exact source question."
  },
  {
    "ref": "Q34",
    "key": "E",
    "canonical": "signet-ring-fatty-liver-etiology-set",
    "article": A3,
    "qp": 7,
    "kp": 7,
    "stem": "A biopsy from the liver shows that all the liver cells are vacuolated and the nucleus is eccentric giving signet ring appearance. The cause of this histological picture of the liver can be:",
    "options": [
      "Hypoxia",
      "Starvation",
      "Carbon tetrachloride poisoning",
      "D.M",
      "All of the above"
    ],
    "correct": "The printed right-column key identifies E) All of the above as the answer to this exact source question."
  },
  {
    "ref": "Q35",
    "key": "E",
    "canonical": "diphtheria-diffuse-myocardial-fatty-change",
    "article": A3,
    "qp": 8,
    "kp": 8,
    "stem": "Diffuse myocardial fatty change is most likely to be found in:",
    "options": [
      "Rheumatic heart",
      "Myocardial infarction",
      "Acute rheumatic fever",
      "Coronary atherosclerosis",
      "Diphtheria"
    ],
    "correct": "The printed right-column key identifies E) Diphtheria as the answer to this exact source question."
  },
  {
    "ref": "Q36",
    "key": "D",
    "canonical": "pathology.steatosis.anemia-myocardium-tiger-heart",
    "article": A3,
    "qp": 8,
    "kp": 8,
    "stem": "A patient with chronic bleeding per-rectum, developed anemia. His heart is most likely to develop:",
    "options": [
      "Peri-portal fibrosis.",
      "Hemosiderosis",
      "Cirrhosis.",
      "Fatty change.",
      "Hepatic necrosis."
    ],
    "correct": "The printed right-column key identifies D) Fatty change. as the answer to this exact source question.",
    "concept": "CON-FND-0E2F639336D89A"
  },
  {
    "ref": "Q37",
    "key": "C",
    "canonical": "pathology.steatosis.anemia-myocardium-tiger-heart",
    "article": A3,
    "qp": 8,
    "kp": 8,
    "stem": "The gross examination of the heart of a patient of severe anemia reveals bands of yellowish myocardium alternating with dark brown fibers. The microscopic examination will show:",
    "options": [
      "Hydropic change",
      "Cloudy swelling",
      "Fatty change",
      "Amyloidosis",
      "Necrosis"
    ],
    "correct": "The printed right-column key identifies C) Fatty change as the answer to this exact source question.",
    "concept": "CON-FND-0E2F639336D89A"
  },
  {
    "ref": "Q38",
    "key": "D",
    "canonical": "frozen-section-fat-sudan-iii",
    "article": A3,
    "qp": 8,
    "kp": 8,
    "stem": "Fat can be seen in frozen sections by one of the following stains:",
    "options": [
      "Methyl violet",
      "Toluidine blue",
      "Hx & E",
      "Sudan III",
      "Congo red"
    ],
    "correct": "The printed right-column key identifies D) Sudan III as the answer to this exact source question."
  },
  {
    "ref": "Q39",
    "key": "B",
    "canonical": "pubertal-breast-physiologic-hyperplasia",
    "article": A3,
    "qp": 8,
    "kp": 8,
    "stem": "Enlargement of the female breast at puberty is an example of:",
    "options": [
      "Physiologic hypertrophy",
      "Physiologic hyperplasia",
      "Physiologic atrophy",
      "Epithelial metaplasia",
      "Fatty change"
    ],
    "correct": "The printed right-column key identifies B) Physiologic hyperplasia as the answer to this exact source question."
  },
  {
    "ref": "Q40",
    "key": "B",
    "canonical": "pathology.cell-injury.cloudy-swelling-earliest-form-source-key",
    "article": A3,
    "qp": 8,
    "kp": 8,
    "stem": "The earliest type of cell injury due to lack of oxygen is:",
    "options": [
      "Metaplasia",
      "Cloudy swelling",
      "Hydropic swelling",
      "Fatty change",
      "Atrophy"
    ],
    "correct": "The printed right-column key identifies B) Cloudy swelling as the answer to this exact source question.",
    "concept": "CON-FND-370074798CB753"
  }
]
const out=authorFamily(repo,{family:149,source:'src_e446a1e064b3d421e312',subtopic:'Cell injury and adaptation',sourceMeta:{title:'Cell injury 1',institution:'Helwan local teaching collection',path:'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Cell injury 1 MCQ.pdf',pages:8,sha:'e446a1e064b3d421e3128f4aada63c4980e18c5d9c61039da6852432f07decbc',rights:'Local instructor bank held for internal authoring only; no source page is redistributed.',qualification:'Tier-3 Ahmed Hassan instructor MCQ study bank with forty stable printed right-column letter keys. Two literal duplicate prompts are excluded. Not an authenticated exam or official key.'},authorityNote:'Ahmed Hassan local instructor study bank with a stable printed letter-key column; not an authenticated Helwan exam or official department key.',evidenceBasis:'Exact numbered stems, options and aligned printed right-column letters in the eight-page instructor bank.',notes:'Q26 is a literal copy of Q8 and Q28 is a literal copy of Q10, so those two occurrences are excluded as second records. Source anomalies remain literal and unrepaired.',uncertainty:'Tier-3 instructor-bank key only; no university masthead, module code, sitting, marks, candidate response or official-key declaration is visible.',freshness:'source_created_2025-04-06',keyDetail:'Printed right-column letter aligned to the numbered MCQ row',articles:[{id:A1,title:'Cellular adaptation in Family149',micro:'Atrophy, hypertrophy and hyperplasia',summary:'The source bank tests definitions, causes and examples of atrophy, hypertrophy and hyperplasia.'},{id:A2,title:'Metaplasia in Family149',micro:'Metaplasia',summary:'The source bank tests metaplasia definitions and organ-specific examples.'},{id:A3,title:'Reversible cell injury and fatty change in Family149',micro:'Reversible injury and steatosis',summary:'The source bank tests cloudy swelling, hydropic change and fatty-change morphology, causes and stains.'}],specs,relations:[{sourceRef:'Q01',targetRef:'Q08',type:'contrasts_with',scope:'cellular adaptation differs from early reversible hypoxic injury'},{sourceRef:'Q15',targetRef:'Q19',type:'contrasts_with',scope:'hypertrophy increases cell size whereas hyperplasia increases cell number'},{sourceRef:'Q21',targetRef:'Q22',type:'related_concepts',scope:'the smoking example instantiates the adult-cell replacement definition of metaplasia'},{sourceRef:'Q31',targetRef:'Q32',type:'related_concepts',scope:'hepatocyte triglyceride morphology is related to the source-listed fatty-liver causes'},{sourceRef:'Q36',targetRef:'Q35',type:'related_concepts',scope:'anaemia-associated and diphtheria-associated myocardial fatty change are distinct source contexts'}]})
console.log(JSON.stringify({...out,rawPrompts:40,rawAnswers:40,holds:0,exclusions:2,acceptedHandles:32},null,2))
