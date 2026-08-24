/**
 * Maristana curriculum source of truth.
 *
 * This file owns the stable Subjects & Topics hierarchy. Articles, concepts,
 * questions, resources, filters, and import preflight all reference these IDs;
 * none of those features may mint a parallel topic name.
 */

export interface CurriculumNano {
  id: string
  title: string
  nanId: string
}

export interface CurriculumMicro {
  id: string
  title: string
  micId: string
  nanos: CurriculumNano[]
}

export interface CurriculumSubtopic {
  id: string
  title: string
  subId: string
  micros: CurriculumMicro[]
}

export interface CurriculumTopic {
  id: string
  title: string
  tpcId: string
  subs: CurriculumSubtopic[]
  /**
   * Subtopic node IDs owned by another subject that are also relevant here.
   * A cross-reference is a link, never a second node: it exists so a label is
   * declared once and browsed from everywhere it matters.
   */
  crossRefs?: string[]
}

export interface CurriculumSystem {
  id: string
  name: string
  short: string
  color: string
  sysId: string
  topics: CurriculumTopic[]
  /** Whole topics owned by another subject that are also relevant here. */
  crossRefs?: string[]
}

interface TopicSeed {
  title: string
  subtopics: Array<string | { title: string; microtopics: Array<string | { title: string; nanotopics: string[] }> }>
  crossRefs?: string[]
}

interface SystemSeed {
  id: string
  name: string
  short: string
  color: string
  topics: TopicSeed[]
  crossRefs?: string[]
}

export const curriculumSlug = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item'

const upperId = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/(^_|_$)/g, '')

export const curriculumSystemId = (subjectId: string) => `SYS_${upperId(subjectId)}`
export const curriculumTopicId = (nodeId: string) => `TPC_${upperId(nodeId)}`
export const curriculumSubtopicId = (nodeId: string) => `SUB_${upperId(nodeId)}`
export const curriculumMicrotopicId = (nodeId: string) => `MIC_${upperId(nodeId)}`
export const curriculumNanotopicId = (nodeId: string) => `NAN_${upperId(nodeId)}`

const topic = (title: string, subtopics: TopicSeed['subtopics'], crossRefs?: string[]): TopicSeed => ({ title, subtopics, crossRefs })
const sub = (title: string, microtopics: Array<string | { title: string; nanotopics: string[] }>) => ({ title, microtopics })

const SYSTEM_SEEDS: SystemSeed[] = [
  {
    id: 'cvs', name: 'Cardiovascular', short: 'CVS', color: '#b52230',
    crossRefs: ['pharm-cardiovascular-pharmacology'],
    topics: [
      topic('Cardiac anatomy', [
        sub('Heart orientation and pericardium', ['Pericardial coverings', 'Mediastinal position and relations', 'Cardiac surfaces and borders', 'Valve and papillary apparatus']),
        sub('Cardiac chambers and valves', ['Atrial anatomy', 'Ventricular anatomy', 'Interatrial and interventricular septa', 'Atrioventricular and semilunar valves']),
        sub('Coronary circulation', ['Coronary arterial supply', 'Coronary dominance', 'Cardiac venous drainage', 'Myocardial perfusion territories']),
        'Great vessels and mediastinal relations',
        'Surface and imaging anatomy of the heart',
      ]),
      topic('Cardiac histology and development', [
        sub('Cardiac histology', ['Cardiomyocytes and intercalated discs', 'Endocardium and myocardium', 'Conducting tissue histology', 'Vessel wall histology']),
        'Development of the heart tube and looping',
        'Septation and outflow tract development',
        'Fetal circulation and postnatal changes',
        'Cardiac developmental anomalies',
      ]),
      topic('Cardiac electrophysiology', [
        sub('Conduction system', ['Sinoatrial node', 'Atrioventricular node', 'His–Purkinje system', 'Autonomic modulation']),
        sub('Cardiac electrical activity and ECG foundations', ['Cardiac action potentials', 'Refractory periods', 'ECG waves and intervals', 'Electrical axis and lead orientation']),
        'Cardiac excitation–contraction coupling',
        'Rhythm generation and conduction disturbances',
      ]),
      topic('Cardiac mechanics and haemodynamics', [
        sub('Cardiac cycle', ['Pressure–volume changes', 'Valve events', 'Heart sounds', 'Pressure–volume loops']),
        sub('Cardiac output, preload and afterload', ['Stroke volume and ejection fraction', 'Venous return', 'Frank–Starling mechanism', 'Contractility and afterload']),
        'Ventricular function curves',
        'Exercise and cardiovascular adaptation',
      ]),
      topic('Vascular physiology', [
        sub('Blood pressure and its regulation', ['Determinants of arterial pressure', 'Baroreceptor reflex', 'Renin–angiotensin–aldosterone system', 'Long-term pressure regulation']),
        sub('Blood flow and microcirculation', ['Flow, pressure and resistance', 'Compliance and capacitance', 'Capillary exchange', 'Local control of blood flow']),
        'Venous return and venous pressure',
        'Regional circulations',
        'Lymphatic circulation',
      ]),
      topic('Cardiovascular pathology', [
        'Atherosclerosis and vascular injury', 'Ischaemic heart disease', 'Heart failure', 'Hypertension',
        'Valvular heart disease', 'Cardiomyopathies', 'Pericardial disease', 'Congenital heart disease',
      ]),
      topic('Cardiovascular presentations', [
        'Chest pain', 'Palpitations and syncope', 'Oedema', 'Shock and poor perfusion',
      ], ['resp-respiratory-presentations-dyspnoea', 'resp-respiratory-presentations-cyanosis']),
      topic('Cardiovascular examination and investigations', [
        'Cardiovascular history', 'Pulse and blood pressure examination', 'Precordial examination', 'Electrocardiography',
        'Cardiac biomarkers', 'Echocardiography', 'Chest imaging', 'Haemodynamic assessment',
      ]),
      topic('Cardiovascular emergencies and skills', [
        'Acute coronary syndromes', 'Acute heart failure', 'Tachyarrhythmias and bradyarrhythmias',
        'Cardiac arrest and basic life support', 'Cardiogenic shock', 'ECG recording and interpretation skills',
      ]),
    ],
  },
  {
    id: 'resp', name: 'Respiratory', short: 'RESP', color: '#1f6f8b',
    crossRefs: ['pharm-respiratory-and-allergy-pharmacology'],
    topics: [
      topic('Respiratory anatomy', ['Upper airway', 'Larynx and trachea', 'Bronchial tree', 'Lungs and lobes', 'Pleura and thoracic cavity', 'Respiratory muscles', 'Pulmonary circulation']),
      topic('Respiratory histology and development', ['Conducting airway histology', 'Respiratory unit histology', 'Alveolar cells and surfactant', 'Lung development', 'Respiratory developmental anomalies']),
      topic('Ventilation and mechanics', ['Lung volumes and capacities', 'Compliance and elastic recoil', 'Airway resistance', 'Work of breathing', 'Dynamic airway compression']),
      topic('Gas exchange and transport', ['Ventilation–perfusion relationships', 'Diffusion across the alveolar membrane', 'Oxygen transport', 'Carbon dioxide transport', 'Hypoxaemia mechanisms']),
      topic('Control of breathing', ['Brainstem respiratory centres', 'Central and peripheral chemoreceptors', 'Neural reflexes', 'Exercise and altitude adaptation']),
      topic('Respiratory pathology', ['Obstructive airway disease', 'Restrictive lung disease', 'Pulmonary infection', 'Interstitial lung disease', 'Pulmonary vascular disease', 'Pleural disease', 'Respiratory neoplasia']),
      topic('Respiratory presentations', ['Cough', 'Dyspnoea', 'Wheeze and stridor', 'Haemoptysis', 'Cyanosis'], ['cvs-cardiovascular-presentations-chest-pain']),
      topic('Respiratory examination and investigations', ['Respiratory history', 'Chest examination', 'Pulse oximetry', 'Arterial blood gases', 'Spirometry and peak flow', 'Chest radiography', 'Computed tomography', 'Pleural fluid analysis']),
      topic('Respiratory emergencies and skills', ['Acute severe asthma', 'Acute respiratory failure', 'Pneumothorax', 'Pulmonary embolism', 'Oxygen delivery', 'Inhaler technique', 'Arterial blood gas sampling']),
    ],
  },
  {
    id: 'renal', name: 'Renal & Urinary', short: 'RENAL', color: '#5a5b9a',
    crossRefs: ['pharm-renal-and-endocrine-pharmacology', 'pharm-safe-prescribing-and-calculations'],
    topics: [
      topic('Renal and urinary anatomy', ['Kidneys and coverings', 'Renal blood supply', 'Ureters', 'Urinary bladder', 'Urethra', 'Pelvic relations']),
      topic('Renal histology and development', ['Nephron segments', 'Glomerular filtration barrier', 'Juxtaglomerular apparatus', 'Collecting system histology', 'Development of the urinary system', 'Congenital anomalies']),
      topic('Renal blood flow and filtration', ['Renal haemodynamics', 'Glomerular filtration rate', 'Filtration fraction', 'Autoregulation', 'Clearance principles']),
      topic('Tubular transport', ['Proximal tubular transport', 'Loop of Henle', 'Distal tubule', 'Collecting duct', 'Countercurrent mechanisms', 'Urine concentration and dilution']),
      topic('Fluid, electrolytes and acid–base', ['Body fluid compartments', 'Sodium and water balance', 'Potassium balance', 'Calcium, phosphate and magnesium', 'Acid–base physiology', 'Acid–base disorders']),
      topic('Endocrine functions of the kidney', ['Renin and blood pressure control', 'Erythropoietin', 'Vitamin D activation', 'Prostaglandins and renal mediators']),
      topic('Renal pathology', ['Acute kidney injury', 'Chronic kidney disease', 'Glomerular disease', 'Tubulointerstitial disease', 'Renovascular disease', 'Urinary tract infection', 'Obstruction and stones', 'Renal neoplasia']),
      topic('Renal presentations', ['Oliguria and anuria', 'Haematuria', 'Proteinuria', 'Dysuria and frequency', 'Flank pain', 'Uraemic symptoms'], ['cvs-cardiovascular-presentations-oedema']),
      topic('Renal examination and investigations', ['Renal history', 'Urinalysis', 'Renal function tests', 'Urine microscopy and culture', 'Renal imaging', 'Kidney biopsy', 'Fluid balance assessment']),
      topic('Renal replacement therapy', ['Haemodialysis', 'Peritoneal dialysis', 'Renal transplantation']),
    ],
  },
  {
    id: 'gi', name: 'Gastrointestinal', short: 'GI', color: '#9a6a1f',
    crossRefs: ['pharm-gastrointestinal-pharmacology'],
    topics: [
      topic('Gastrointestinal anatomy', ['Oral cavity and pharynx', 'Oesophagus', 'Stomach', 'Small intestine', 'Large intestine', 'Peritoneum and mesenteries', 'Abdominal blood supply and portal system']),
      topic('Gastrointestinal histology and development', ['General gut wall organisation', 'Oesophageal histology', 'Gastric histology', 'Small and large bowel histology', 'Enteric nervous system', 'Gut development and rotation', 'Gastrointestinal developmental anomalies']),
      topic('Gastrointestinal motility and secretion', ['Swallowing and oesophageal motility', 'Gastric motility and emptying', 'Intestinal motility', 'Gastric secretion', 'Pancreatic secretion', 'Biliary secretion', 'Enteric and hormonal control']),
      topic('Digestion and absorption', ['Carbohydrate digestion and absorption', 'Protein digestion and absorption', 'Lipid digestion and absorption', 'Vitamin and mineral absorption', 'Water and electrolyte absorption', 'Gut microbiome foundations']),
      topic('Liver, biliary system and pancreas', ['Liver anatomy and histology', 'Hepatic metabolism', 'Bilirubin metabolism', 'Gallbladder and bile ducts', 'Exocrine pancreas', 'Portal hypertension']),
      topic('Gastrointestinal pathology', ['Reflux and peptic disease', 'Malabsorption', 'Inflammatory bowel disease', 'Functional bowel disorders', 'Hepatitis and cirrhosis', 'Biliary disease', 'Pancreatitis', 'Gastrointestinal neoplasia']),
      topic('Gastrointestinal presentations', ['Dysphagia', 'Dyspepsia', 'Abdominal pain', 'Nausea and vomiting', 'Diarrhoea and constipation', 'Gastrointestinal bleeding', 'Jaundice', 'Ascites and abdominal distension']),
      topic('Gastrointestinal examination and investigations', ['Gastrointestinal history', 'Abdominal examination', 'Liver function tests', 'Stool studies', 'Endoscopy', 'Abdominal imaging', 'Hepatobiliary imaging', 'Nutritional assessment']),
      topic('Gastrointestinal emergencies and skills', ['Acute abdomen', 'Gastrointestinal haemorrhage', 'Acute liver failure', 'Bowel obstruction', 'Acute pancreatitis', 'Nasogastric tube skills', 'Abdominal fluid assessment']),
    ],
  },
  {
    id: 'neuro', name: 'Neurology', short: 'NEURO', color: '#2f6bc7',
    crossRefs: ['pharm-neuropsychopharmacology'],
    topics: [
      topic('Neuroanatomy', ['Cerebral hemispheres and lobes', 'Basal ganglia', 'Thalamus and hypothalamus', 'Brainstem', 'Cerebellum', 'Spinal cord', 'Meninges and cerebrospinal fluid', 'Cerebral blood supply', 'Cranial nerves', 'Peripheral nerves']),
      topic('Neural histology and development', ['Neurones and glia', 'Synapses', 'Myelin and nerve fibres', 'Peripheral nerve histology', 'Neural tube development', 'Brain vesicles and ventricular development', 'Neural developmental anomalies']),
      topic('Cellular neurophysiology', ['Resting membrane potential', 'Action potentials', 'Synaptic transmission', 'Neurotransmitters', 'Receptors and second messengers', 'Neural plasticity']),
      topic('Sensory systems', ['Somatic sensation', 'Pain pathways and modulation', 'Vision', 'Hearing', 'Vestibular function', 'Taste and olfaction']),
      topic('Motor systems', ['Upper and lower motor neurones', 'Corticospinal pathways', 'Basal ganglia circuits', 'Cerebellar control', 'Reflexes', 'Muscle tone and posture']),
      topic('Autonomic nervous system', ['Sympathetic organisation', 'Parasympathetic organisation', 'Autonomic reflexes', 'Autonomic pharmacology interfaces']),
      topic('Higher functions and behaviour', ['Consciousness and arousal', 'Language', 'Memory and learning', 'Emotion and limbic function', 'Sleep', 'Executive function']),
      topic('Neurological pathology', ['Cerebrovascular disease', 'Seizure disorders', 'Demyelinating disease', 'Neurodegeneration', 'Peripheral neuropathy', 'Neuromuscular junction disease', 'Central nervous system infection', 'Neuro-oncology']),
      topic('Neurological presentations and examination', ['Headache', 'Weakness', 'Sensory disturbance', 'Seizures and collapse', 'Dizziness and vertigo', 'Altered consciousness', 'Cranial nerve examination', 'Motor and sensory examination', 'Coordination and gait']),
      topic('Neurological investigations', ['Neuroimaging', 'Electroencephalography', 'Nerve conduction and electromyography', 'Cerebrospinal fluid analysis']),
    ],
  },
  {
    id: 'endo', name: 'Endocrine', short: 'ENDO', color: '#8d4a72',
    crossRefs: ['pharm-renal-and-endocrine-pharmacology'],
    topics: [
      topic('Endocrine anatomy and histology', ['Hypothalamus and pituitary', 'Thyroid and parathyroids', 'Adrenal glands', 'Endocrine pancreas', 'Gonads', 'Diffuse endocrine system']),
      topic('Hormone signalling and regulation', ['Hormone classes', 'Receptor signalling', 'Feedback control', 'Hormone transport and metabolism', 'Biological rhythms']),
      topic('Hypothalamic and pituitary systems', ['Anterior pituitary hormones', 'Posterior pituitary hormones', 'Growth hormone axis', 'Prolactin regulation', 'Pituitary pathology']),
      topic('Thyroid physiology and disease', ['Thyroid hormone synthesis', 'Thyroid hormone action', 'Thyroid function tests', 'Hyperthyroidism', 'Hypothyroidism', 'Thyroid nodules and neoplasia']),
      topic('Adrenal physiology and disease', ['Cortisol', 'Aldosterone', 'Adrenal androgens', 'Catecholamines', 'Adrenal insufficiency', 'Hormone excess states']),
      topic('Endocrine pancreas and metabolism', ['Insulin and glucagon', 'Fed and fasting states', 'Diabetes mellitus', 'Hypoglycaemia', 'Diabetic complications', 'Obesity and metabolic syndrome']),
      topic('Calcium, phosphate and bone metabolism', ['Parathyroid hormone', 'Vitamin D', 'Calcitonin', 'Calcium and phosphate balance', 'Metabolic bone disease']),
      topic('Reproductive endocrinology', ['Puberty', 'Menstrual cycle', 'Pregnancy hormones', 'Male reproductive hormones', 'Menopause', 'Disorders of sexual development']),
      topic('Endocrine presentations and investigations', ['Weight change', 'Polyuria and polydipsia', 'Growth disturbance', 'Electrolyte clues', 'Dynamic endocrine testing', 'Endocrine imaging']),
      topic('Endocrine emergencies', ['Diabetic emergencies', 'Adrenal crisis', 'Thyroid emergencies']),
    ],
  },
  {
    id: 'msk', name: 'Musculoskeletal', short: 'MSK', color: '#6d7688',
    crossRefs: ['pharm-inflammation-immunity-and-cancer-pharmacology', 'pharm-neuropsychopharmacology'],
    topics: [
      topic('Musculoskeletal foundations', ['Anatomical terminology and movement', 'Bones and joints', 'Skeletal muscle architecture', 'Fascia and compartments', 'Peripheral nerves and vessels']),
      topic('Bone, cartilage and connective tissue', ['Bone histology', 'Bone formation and remodelling', 'Cartilage histology', 'Tendons and ligaments', 'Connective tissue matrix', 'Fracture healing']),
      topic('Muscle physiology', ['Neuromuscular junction', 'Skeletal muscle excitation–contraction coupling', 'Motor units', 'Length–tension relationship', 'Muscle energetics', 'Fatigue and adaptation']),
      topic('Upper limb', ['Pectoral region and axilla', 'Shoulder', 'Arm', 'Elbow and cubital fossa', 'Forearm', 'Wrist and hand', 'Upper-limb nerves and vessels']),
      topic('Lower limb', ['Gluteal region', 'Hip', 'Thigh', 'Knee and popliteal fossa', 'Leg', 'Ankle and foot', 'Lower-limb nerves and vessels']),
      topic('Back and axial skeleton', ['Vertebral column', 'Back muscles', 'Spinal joints and ligaments', 'Thoracic cage', 'Posture and gait']),
      topic('Musculoskeletal pathology', ['Trauma and fractures', 'Osteoarthritis', 'Inflammatory arthritis', 'Crystal arthropathy', 'Bone infection', 'Muscle disease', 'Bone and soft-tissue tumours'], ['endo-calcium-phosphate-and-bone-metabolism-metabolic-bone-disease']),
      topic('Musculoskeletal presentations and examination', ['Joint pain and swelling', 'Back pain', 'Muscle weakness', 'Limb injury', 'Upper-limb examination', 'Lower-limb examination', 'Spine examination', 'Gait assessment']),
      topic('Musculoskeletal investigations', ['Plain radiography', 'Magnetic resonance imaging', 'Ultrasound', 'Synovial fluid analysis', 'Bone biochemistry', 'Electrodiagnostic studies'], ['resp-respiratory-examination-and-investigations-computed-tomography']),
      topic('Musculoskeletal skills', ['Immobilisation principles', 'Joint aspiration foundations']),
    ],
  },
  {
    id: 'pharm', name: 'Pharmacology', short: 'PHARM', color: '#c14a2e',
    topics: [
      topic('Pharmacokinetics', ['Routes of administration', 'Absorption and bioavailability', 'Distribution and protein binding', 'Metabolism', 'Elimination and clearance', 'Half-life and steady state', 'Compartment models']),
      topic('Pharmacodynamics', ['Drug targets and receptors', 'Dose–response relationships', 'Agonism and antagonism', 'Potency and efficacy', 'Therapeutic index', 'Tolerance and dependence']),
      topic('Safe prescribing and calculations', ['Prescription structure', 'Dose calculations', 'Infusion calculations', 'Renal and hepatic dose adjustment', 'Medicine reconciliation', 'Adherence and shared decisions', 'High-risk medicines']),
      topic('Adverse effects and interactions', ['Adverse drug reaction classification', 'Drug–drug interactions', 'Drug–food interactions', 'Pharmacovigilance', 'Medication errors', 'Deprescribing']),
      topic('Autonomic pharmacology', ['Cholinergic agonists', 'Antimuscarinic drugs', 'Adrenergic agonists', 'Alpha-adrenoceptor antagonists', 'Beta-adrenoceptor antagonists', 'Neuromuscular blockers']),
      topic('Cardiovascular pharmacology', ['Antihypertensive drugs', 'Antianginal drugs', 'Heart failure drugs', 'Antiarrhythmic drugs', 'Antiplatelet drugs', 'Anticoagulants and thrombolytics', 'Lipid-lowering drugs']),
      topic('Respiratory and allergy pharmacology', ['Bronchodilators', 'Leukotriene modifiers', 'Antihistamines', 'Anaphylaxis medicines', 'Antitussives and mucolytics', 'Pulmonary vascular drugs', 'Inhaler devices'], ['pharm-inflammation-immunity-and-cancer-pharmacology-corticosteroids']),
      topic('Renal and endocrine pharmacology', ['Diuretics', 'Renin–angiotensin system drugs', 'Nephrotoxic drugs', 'Insulins', 'Non-insulin glucose-lowering drugs', 'Thyroid drugs', 'Pituitary and adrenal drugs', 'Reproductive hormones'], ['pharm-inflammation-immunity-and-cancer-pharmacology-corticosteroids']),
      topic('Gastrointestinal pharmacology', ['Acid suppression', 'Antiemetics', 'Prokinetics', 'Laxatives', 'Antidiarrhoeals', 'Inflammatory bowel disease drugs', 'Hepatobiliary drugs', 'Pancreatic enzyme replacement']),
      topic('Neuropsychopharmacology', ['Analgesics', 'Local and general anaesthetics', 'Antiseizure drugs', 'Parkinson disease drugs', 'Antidepressants', 'Antipsychotics', 'Anxiolytics and sedatives']),
      topic('Antimicrobial pharmacology', ['Antibacterial principles', 'Cell-wall active antibacterials', 'Protein-synthesis inhibitors', 'Nucleic-acid inhibitors', 'Antimycobacterial drugs', 'Antifungal drugs', 'Antiviral drugs', 'Antiparasitic drugs', 'Antimicrobial stewardship']),
      topic('Inflammation, immunity and cancer pharmacology', ['Non-steroidal anti-inflammatory drugs', 'Corticosteroids', 'Disease-modifying antirheumatic drugs', 'Drugs for gout', 'Drugs for osteoporosis', 'Immunosuppressants', 'Biological therapies', 'Cytotoxic chemotherapy', 'Targeted anticancer therapy']),
      topic('Toxicology and antidotes', ['Initial poisoning assessment', 'Decontamination principles', 'Paracetamol poisoning', 'Opioid poisoning', 'Cholinergic toxicity', 'Toxic alcohols', 'Common antidotes']),
      topic('Special populations and personalised therapy', ['Paediatric pharmacology', 'Pregnancy and lactation', 'Older adults and polypharmacy', 'Pharmacogenomics', 'Therapeutic drug monitoring']),
    ],
  },
  {
    id: 'fnd', name: 'Foundations', short: 'FND', color: '#5145a8',
    topics: [
      topic('Cell & molecular biology', [
        sub('Cell structure and organelles', ['Membranes', 'Cytoskeleton', 'Nucleus', 'Mitochondria']),
        sub('Cell cycle and signalling', ['Cell cycle', 'Receptors', 'Second messengers', 'Apoptosis']),
      ]),
      topic('Human genetics', [
        sub('Inheritance and variation', ['Mendelian inheritance', 'Chromosomal disorders', 'Mitochondrial inheritance']),
        sub('Genomic methods and counselling', ['Pedigrees', 'Genetic testing', 'Counselling principles']),
      ]),
      topic('General pathology', [
        sub('Cell injury and adaptation', ['Reversible injury', 'Necrosis', 'Apoptosis', 'Adaptations']),
        sub('Inflammation and repair', ['Acute inflammation', 'Chronic inflammation', 'Wound healing']),
        sub('Neoplasia', ['Carcinogenesis', 'Tumour biology', 'Grading and staging']),
      ]),
      topic('General pharmacology', [
        sub('Foundational pharmacokinetics', ['Absorption', 'Distribution', 'Metabolism', 'Excretion']),
        sub('Foundational pharmacodynamics', ['Receptors', 'Dose-response', 'Therapeutic index']),
        sub('Safe medicines use', ['Adverse reactions', 'Interactions', 'Special populations']),
      ]),
      topic('General microbiology', [
        sub('Microbial structure and classification', ['Bacteria', 'Viruses', 'Fungi', 'Parasites']),
        sub('Host-pathogen interaction', ['Virulence', 'Transmission', 'Colonization']),
        sub('Diagnostics and control', ['Specimen collection', 'Culture', 'Molecular tests', 'Sterilization']),
      ]),
      topic('Core mechanisms', [
        sub('Hemodynamics and thrombosis', ['Oedema', 'Thrombosis', 'Embolism', 'Infarction']),
        sub('Fluid, electrolyte and acid-base principles', ['Volume', 'Sodium', 'Potassium', 'Acid-base']),
      ]),
    ],
  },
  {
    id: 'dev', name: 'Human development', short: 'DEV', color: '#7f6a33',
    topics: [
      topic('Growth and development', [
        sub('Infancy and early childhood', ['Growth', 'Milestones', 'Nutrition', 'Screening']),
        sub('School age and adolescence', ['Puberty', 'Development', 'Risk behavior', 'Preventive care']),
      ]),
      topic('Adult health', [
        sub('Young and middle adulthood', ['Lifestyle', 'Screening', 'Occupational health']),
        sub('Healthy aging', ['Normal aging', 'Frailty', 'Falls', 'Polypharmacy']),
      ]),
      topic('Nutrition across the life course', [
        sub('Macronutrients and micronutrients', ['Requirements', 'Deficiency', 'Excess']),
        sub('Clinical nutrition', ['Malnutrition', 'Enteral nutrition', 'Parenteral nutrition']),
      ]),
      topic('Care of the well patient', [
        sub('Screening and anticipatory guidance', ['Risk assessment', 'Counselling', 'Vaccination']),
        sub('Social and developmental context', ['Family', 'School', 'Work', 'Caregiving']),
        sub('Disability and inclusive care', ['Function and participation', 'Communication and access needs', 'Reasonable adjustments', 'Caregiver and community support']),
      ]),
    ],
  },
  {
    id: 'haem', name: 'Blood and lymphoreticular', short: 'HAEM', color: '#9c2848',
    topics: [
      topic('Haematopoiesis and blood science', [
        sub('Blood cell development', ['Erythropoiesis', 'Leukopoiesis', 'Platelets']),
        sub('Laboratory foundations', ['CBC', 'Blood film', 'Bone marrow']),
      ]),
      topic('Anaemia and red-cell disorders', [
        sub('Microcytic anaemia', ['Iron deficiency', 'Thalassemia', 'Chronic disease']),
        sub('Normocytic and macrocytic anaemia', ['Hemolysis', 'B12 and folate', 'Marrow failure']),
        sub('Haemoglobin disorders', ['Sickle cell disease', 'Thalassemia']),
      ]),
      topic('Haemostasis and thrombosis', [
        sub('Bleeding disorders', ['Platelet disorders', 'Hemophilia', 'von Willebrand disease']),
        sub('Thrombotic disorders', ['VTE', 'Thrombophilia', 'DIC']),
      ]),
      topic('White-cell disorders', [
        sub('Benign leukocyte disorders', ['Neutropenia', 'Leukocytosis', 'Reactive changes']),
        sub('Leukaemia and myeloproliferative disease', ['Acute leukaemia', 'Chronic leukaemia', 'MPN']),
      ]),
      topic('Lymphoid and plasma-cell disease', [
        sub('Lymphoma', ['Hodgkin', 'Non-Hodgkin']),
        sub('Plasma-cell disorders', ['Multiple myeloma', 'Monoclonal gammopathy']),
      ]),
      topic('Transfusion medicine', [
        sub('Blood components', ['Red cells', 'Platelets', 'Plasma', 'Cryoprecipitate']),
        sub('Transfusion safety', ['Compatibility', 'Reactions', 'Massive transfusion']),
      ]),
    ],
  },
  {
    id: 'imm', name: 'Immune system', short: 'IMM', color: '#1f8a5a',
    topics: [
      topic('Normal immune function', [
        sub('Innate immunity', ['Barriers', 'Complement', 'Phagocytes', 'Inflammation']),
        sub('Adaptive immunity', ['B cells', 'T cells', 'Antibodies', 'Tolerance']),
      ]),
      topic('Hypersensitivity and allergy', [
        sub('Immediate hypersensitivity', ['Anaphylaxis', 'Atopy', 'Urticaria']),
        sub('Delayed and immune-complex disease', ['Type II', 'Type III', 'Type IV']),
      ]),
      topic('Autoimmune disease', [
        sub('Systemic autoimmune disease', ['SLE', 'Systemic sclerosis', 'Vasculitis']),
        sub('Organ-specific autoimmunity', ['Thyroid', 'Neuromuscular', 'Gastrointestinal']),
      ]),
      topic('Immunodeficiency', [
        sub('Primary immunodeficiency', ['Humoral', 'Cellular', 'Combined', 'Phagocyte']),
        sub('Secondary immunodeficiency', ['HIV', 'Malnutrition', 'Iatrogenic']),
      ]),
      topic('Transplantation and immunotherapy', [
        sub('Transplant immunology', ['Rejection', 'GVHD', 'Immunosuppression']),
        sub('Biologics and immunomodulation', ['Monoclonal antibodies', 'Cytokine therapy', 'Vaccines']),
      ]),
    ],
  },
  {
    id: 'inf', name: 'Infection and tropical medicine', short: 'INF', color: '#6b8c1f',
    topics: [
      topic('Bacterial disease', [
        sub('Gram-positive infection', ['Staphylococci', 'Streptococci', 'Clostridia']),
        sub('Gram-negative infection', ['Enteric bacteria', 'Neisseria', 'Pseudomonas']),
        sub('Mycobacterial disease', ['Tuberculosis', 'Leprosy', 'Nontuberculous mycobacteria']),
      ]),
      topic('Viral disease', [
        sub('Respiratory and exanthem viruses', ['Influenza', 'Coronaviruses', 'Measles', 'Mumps', 'Rubella']),
        sub('Blood-borne and chronic viruses', ['HIV', 'HBV', 'HCV']),
        sub('Herpes and neurotropic viruses', ['HSV', 'VZV', 'CMV', 'Rabies']),
      ]),
      topic('Fungal disease', [
        sub('Superficial and mucosal mycoses', ['Dermatophytes', 'Candida']),
        sub('Systemic and opportunistic mycoses', ['Aspergillus', 'Cryptococcus', 'Mucor']),
      ]),
      topic('Parasitology', [
        sub('Protozoal disease', ['Malaria', 'Amoebiasis', 'Giardiasis', 'Toxoplasmosis']),
        sub('Helminthic disease', ['Schistosomiasis', 'Filaria', 'Cestodes', 'Nematodes']),
      ]),
      topic('Syndromic infectious disease', [
        sub('Fever syndromes', ['Fever of unknown origin', 'Sepsis', 'Febrile traveler']),
        sub('Organ-based infection', ['Meningitis', 'Endocarditis', 'Pneumonia', 'Gastroenteritis', 'UTI']),
      ]),
      topic('Antimicrobials and stewardship', [
        sub('Antibacterial therapy', ['Drug classes', 'Empiric choice', 'Resistance']),
        sub('Antiviral, antifungal and antiparasitic therapy', ['Indications', 'Toxicity', 'Interactions']),
        sub('Stewardship', ['Specimens', 'De-escalation', 'Duration', 'Prophylaxis']),
      ]),
      topic('Infection prevention and Egyptian context', [
        sub('Prevention and control', ['Isolation', 'Vaccination', 'Needlestick injury', 'Outbreaks']),
        sub('Locally important infections', ['Schistosomiasis', 'Viral hepatitis', 'Tuberculosis', 'Food- and water-borne disease']),
      ]),
    ],
  },
  {
    id: 'obs', name: 'Pregnancy and childbirth', short: 'OBS', color: '#b0417e',
    topics: [
      topic('Normal pregnancy', [
        sub('Antenatal physiology and care', ['Maternal adaptation', 'Dating', 'Screening', 'Nutrition']),
        sub('Foetal development and surveillance', ['Placenta', 'Growth', 'Foetal monitoring']),
      ]),
      topic('Early-pregnancy problems', [
        sub('Pregnancy loss and ectopic pregnancy', ['Miscarriage', 'Ectopic pregnancy']),
        sub('Gestational trophoblastic disease', ['Molar pregnancy', 'Choriocarcinoma']),
      ]),
      topic('Medical disorders in pregnancy', [
        sub('Hypertensive disease', ['Gestational hypertension', 'Preeclampsia', 'Eclampsia']),
        sub('Metabolic and hematologic disease', ['Gestational diabetes', 'Anaemia', 'Thrombosis']),
      ]),
      topic('Labour and delivery', [
        sub('Normal labour', ['Stages', 'Monitoring', 'Analgesia']),
        sub('Operative delivery', ['Instrumental delivery', 'Cesarean section']),
      ]),
      topic('Obstetric emergencies', [
        sub('Haemorrhage', ['Placental abruption', 'Placenta previa', 'Postpartum haemorrhage']),
        sub('Maternal and fetal compromise', ['Shoulder dystocia', 'Cord prolapse', 'Uterine rupture', 'Foetal distress']),
      ]),
      topic('Postpartum care', [
        sub('Maternal puerperium', ['Infection', 'Thrombosis', 'Mental health', 'Lactation']),
        sub('Newborn transition', ['Resuscitation', 'Feeding', 'Screening']),
      ]),
    ],
  },
  {
    id: 'gyn', name: 'Female reproductive', short: 'GYN', color: '#7b3f9e',
    topics: [
      topic('Structure and reproductive physiology', [
        sub('Pelvic and breast anatomy', ['Pelvic organs', 'Support', 'Breast']),
        sub('Reproductive physiology', ['Menstrual cycle', 'Puberty', 'Menopause']),
      ]),
      topic('Menstrual and endocrine disorders', [
        sub('Abnormal bleeding', ['Amenorrhea', 'Heavy menstrual bleeding', 'Dysmenorrhea']),
        sub('Endocrine gynaecology', ['PCOS', 'Hyperprolactinemia', 'Menopause']),
      ]),
      topic('Benign gynaecologic disease', [
        sub('Uterine and ovarian disease', ['Fibroids', 'Endometriosis', 'Ovarian cysts']),
        sub('Pelvic-floor disease', ['Prolapse', 'Incontinence', 'Fistula']),
      ]),
      topic('Infection, fertility and contraception', [
        sub('Reproductive infection', ['PID', 'Vaginitis', 'STIs']),
        sub('Fertility and family planning', ['Infertility', 'Contraception', 'Assisted reproduction']),
      ]),
      topic('Gynaecologic oncology', [
        sub('Cervix and uterus', ['Cervical cancer', 'Endometrial cancer']),
        sub('Ovary and vulva', ['Ovarian cancer', 'Vulvar cancer']),
      ]),
      topic('Breast disease', [
        sub('Benign breast disease', ['Mastalgia', 'Fibroadenoma', 'Infection']),
        sub('Breast cancer', ['Screening', 'Diagnosis', 'Staging', 'Treatment']),
      ]),
      topic('Gynaecologic skills and procedures', [
        sub('Assessment', ['Pelvic history', 'Speculum exam', 'Bimanual exam', 'Breast exam']),
        sub('Procedures', ['Cervical sampling', 'Contraceptive procedures', 'Gynaecologic imaging']),
      ]),
    ],
  },
  {
    id: 'androl', name: 'Male reproductive', short: 'AND', color: '#3a6d9e',
    topics: [
      topic('Andrological structure and reproductive physiology', [
        sub('Male genital anatomy', ['Testis', 'Epididymis', 'Prostate', 'Penis']),
        sub('Andrological reproductive physiology', ['Spermatogenesis', 'Androgens', 'Sexual function']),
      ]),
      topic('Andrology and sexual medicine', [
        sub('Infertility', ['Semen disorders', 'Varicocele', 'Endocrine causes']),
        sub('Sexual dysfunction', ['Erectile dysfunction', 'Ejaculatory disorders']),
      ]),
      topic('Infection and inflammation', [
        sub('Urethral and testicular infection', ['Urethritis', 'Epididymitis', 'Orchitis']),
        sub('Prostatic inflammation', ['Acute prostatitis', 'Chronic prostatitis']),
      ]),
      topic('Prostate disease', [
        sub('Benign disease', ['BPH', 'Lower urinary tract symptoms']),
        sub('Prostate cancer', ['Screening', 'Diagnosis', 'Staging', 'Management']),
      ]),
      topic('Testicular and penile disease', [
        sub('Testicular disorders', ['Torsion', 'Hydrocele', 'Testicular cancer']),
        sub('Penile disorders', ['Phimosis', 'Peyronie disease', 'Penile cancer']),
      ]),
      topic('Male reproductive skills', [
        sub('Examination', ['Genital exam', 'Prostate exam', 'Hernia exam']),
        sub('Interpretation and procedures', ['Semen analysis', 'Scrotal ultrasound', 'Catheterization']),
      ]),
    ],
  },
  {
    id: 'psy', name: 'Behavioural health', short: 'PSY', color: '#6a6a4a',
    topics: [
      topic('Psychiatric assessment', [
        sub('Mental-state examination', ['Appearance', 'Speech', 'Mood', 'Thought', 'Perception', 'Cognition']),
        sub('Risk assessment', ['Suicide', 'Violence', 'Safeguarding', 'Capacity']),
      ]),
      topic('Mood and anxiety disorders', [
        sub('Depressive and bipolar disorders', ['Major depression', 'Bipolar disorder', 'Postpartum mood']),
        sub('Anxiety and trauma disorders', ['GAD', 'Panic', 'OCD', 'PTSD']),
      ]),
      topic('Psychotic disorders', [
        sub('Primary psychosis', ['Schizophrenia', 'Schizoaffective disorder']),
        sub('Secondary psychosis', ['Substances', 'Medical causes', 'Delirium']),
      ]),
      topic('Substance use and addiction', [
        sub('Alcohol and sedatives', ['Intoxication', 'Withdrawal', 'Treatment']),
        sub('Opioids and stimulants', ['Intoxication', 'Withdrawal', 'Harm reduction']),
      ]),
      topic('Neurodevelopmental and cognitive disorders', [
        sub('Child and adolescent disorders', ['ADHD', 'Autism', 'Conduct disorders']),
        sub('Cognitive disorders', ['Delirium', 'Dementia', 'Amnestic syndromes']),
      ]),
      topic('Other behavioural disorders', [
        sub('Eating and somatic disorders', ['Anorexia', 'Bulimia', 'Somatic symptoms']),
        sub('Personality, sleep and sexual health', ['Personality disorders', 'Insomnia', 'Sexual dysfunction']),
      ]),
    ],
  },
  {
    id: 'derm', name: 'Skin', short: 'DERM', color: '#a85f3a',
    topics: [
      topic('Dermatologic assessment', [
        sub('Lesion morphology', ['Primary lesions', 'Secondary changes', 'Distribution']),
        sub('Common presentations', ['Rash', 'Pruritus', 'Ulcer', 'Pigment change']),
      ]),
      topic('Inflammatory skin disease', [
        sub('Eczematous and papulosquamous disease', ['Atopic dermatitis', 'Contact dermatitis', 'Psoriasis']),
        sub('Acneiform and follicular disease', ['Acne', 'Rosacea', 'Hidradenitis']),
      ]),
      topic('Skin infection and infestation', [
        sub('Bacterial and viral disease', ['Cellulitis', 'Impetigo', 'Herpes', 'Warts']),
        sub('Fungal and parasitic disease', ['Dermatophytes', 'Candida', 'Scabies', 'Lice']),
      ]),
      topic('Autoimmune and blistering disease', [
        sub('Blistering disorders', ['Pemphigus', 'Pemphigoid', 'Dermatitis herpetiformis']),
        sub('Connective-tissue manifestations', ['Lupus', 'Dermatomyositis', 'Scleroderma']),
      ]),
      topic('Skin tumours', [
        sub('Benign and premalignant lesions', ['Nevi', 'Keratoses']),
        sub('Skin cancer', ['Melanoma', 'Basal cell carcinoma', 'Squamous cell carcinoma']),
      ]),
      topic('Wounds, burns, hair and nails', [
        sub('Wounds and burns', ['Pressure injury', 'Burn assessment', 'Wound healing']),
        sub('Appendage disorders', ['Alopecia', 'Nail disorders']),
      ]),
    ],
  },
  {
    id: 'mul', name: 'Multisystem and emergencies', short: 'MUL', color: '#8a2f22',
    topics: [
      topic('Acute deterioration', [
        sub('ABCDE assessment', ['Airway', 'Breathing', 'Circulation', 'Disability', 'Exposure']),
        sub('Shock and resuscitation', ['Hypovolemic', 'Cardiogenic', 'Distributive', 'Obstructive']),
      ]),
      topic('Sepsis and organ failure', [
        sub('Sepsis syndromes', ['Recognition', 'Initial management', 'Source control']),
        sub('Multiple organ failure', ['Respiratory', 'Renal', 'Cardiovascular', 'Neurologic']),
      ]),
      topic('Trauma', [
        sub('Primary and secondary survey', ['Airway', 'Chest', 'Abdomen', 'Pelvis', 'Neurologic']),
        sub('Specific trauma', ['Head injury', 'Spinal injury', 'Burns', 'Haemorrhage']),
      ]),
      topic('Toxicology and environmental medicine', [
        sub('Poisoning', ['Paracetamol', 'Organophosphate', 'Opioid', 'Corrosives']),
        sub('Environmental emergencies', ['Heat illness', 'Drowning', 'Envenomation', 'Electrical injury']),
      ]),
      topic('Oncology principles', [
        sub('Cancer diagnosis and staging', ['Screening', 'Biopsy', 'TNM', 'Performance status']),
        sub('Cancer treatment and emergencies', ['Chemotherapy', 'Radiotherapy', 'Neutropenic sepsis', 'Cord compression', 'TLS']),
      ]),
      topic('Perioperative and critical care', [
        sub('Perioperative medicine', ['Risk assessment', 'Fluids', 'Analgesia', 'Complications']),
        sub('Critical-care support', ['Oxygen', 'Ventilation', 'Vasopressors', 'Nutrition']),
        sub('Anaesthesia', ['Preoperative preparation', 'Airway and ventilation', 'General and regional techniques', 'Monitoring and recovery']),
      ]),
      topic('Pain, palliative and end-of-life care', [
        sub('Pain management', ['Assessment', 'Non-opioids', 'Opioids', 'Neuropathic pain']),
        sub('Palliative care', ['Symptom control', 'Goals of care', 'End-of-life communication']),
      ]),
    ],
  },
  {
    id: 'pop', name: 'Population health', short: 'POP', color: '#14707d',
    topics: [
      topic('Epidemiology', [
        sub('Disease frequency and association', ['Incidence', 'Prevalence', 'Risk', 'Odds']),
        sub('Study designs', ['Cross-sectional', 'Case-control', 'Cohort', 'Trial']),
      ]),
      topic('Biostatistics', [
        sub('Descriptive statistics', ['Central tendency', 'Variation', 'Distribution']),
        sub('Inference and interpretation', ['Confidence intervals', 'p values', 'Power', 'Regression']),
      ]),
      topic('Evidence-based medicine', [
        sub('Clinical questions and searching', ['PICO', 'Search strategy', 'Evidence hierarchy']),
        sub('Critical appraisal', ['Bias', 'Confounding', 'Validity', 'GRADE']),
      ]),
      topic('Screening and prevention', [
        sub('Screening tests', ['Sensitivity', 'Specificity', 'Predictive values', 'ROC']),
        sub('Prevention programs', ['Vaccination', 'Cancer screening', 'Risk reduction']),
      ]),
      topic('Health systems and patient safety', [
        sub('Quality and safety', ['Human factors', 'Incident reporting', 'Quality improvement methods', 'Infection control']),
        sub('Health-service delivery', ['Primary care', 'Referral', 'Resource allocation', 'Universal coverage']),
        sub('Digital health and clinical information', ['Electronic health records', 'Telemedicine and virtual care', 'Clinical decision support and health AI', 'Data privacy and cybersecurity']),
      ]),
      topic('Ethics, law and professionalism', [
        sub('Ethical practice', ['Consent', 'Capacity', 'Confidentiality', 'Shared decisions']),
        sub('Professional duties', ['Boundaries', 'Duty of candour', 'Documentation', 'Social media']),
      ]),
      topic('Community, occupational and environmental health', [
        sub('Community medicine', ['Social determinants', 'Health promotion', 'Maternal and child health']),
        sub('Occupational and environmental health', ['Work hazards', 'Air and water', 'Climate', 'Disaster health']),
        sub('Global health and health equity', ['Health inequity and social determinants', 'Migration and refugee health', 'Global disease threats and One Health', 'Humanitarian health']),
      ]),
    ],
  },
]

function buildSystem(seed: SystemSeed): CurriculumSystem {
  const sysId = curriculumSystemId(seed.id)
  const topics = seed.topics.map((topicSeed) => {
    const topicNodeId = `${seed.id}-${curriculumSlug(topicSeed.title)}`
    const subs = topicSeed.subtopics.map((subtopicSeed) => {
      const subTitle = typeof subtopicSeed === 'string' ? subtopicSeed : subtopicSeed.title
      const subNodeId = `${topicNodeId}-${curriculumSlug(subTitle)}`
      const microtopics = typeof subtopicSeed === 'string' ? [] : subtopicSeed.microtopics
      const micros = microtopics.map((microtopicSeed) => {
        const microTitle = typeof microtopicSeed === 'string' ? microtopicSeed : microtopicSeed.title
        const microNodeId = `${subNodeId}-${curriculumSlug(microTitle)}`
        const nanotopics = typeof microtopicSeed === 'string' ? [] : microtopicSeed.nanotopics
        return {
          id: microNodeId,
          title: microTitle,
          micId: curriculumMicrotopicId(microNodeId),
          nanos: nanotopics.map((nanoTitle) => {
            const nanoNodeId = `${microNodeId}-${curriculumSlug(nanoTitle)}`
            return { id: nanoNodeId, title: nanoTitle, nanId: curriculumNanotopicId(nanoNodeId) }
          }),
        }
      })
      return { id: subNodeId, title: subTitle, subId: curriculumSubtopicId(subNodeId), micros }
    })
    return { id: topicNodeId, title: topicSeed.title, tpcId: curriculumTopicId(topicNodeId), subs, ...(topicSeed.crossRefs ? { crossRefs: topicSeed.crossRefs } : {}) }
  })
  return { ...seed, sysId, topics }
}

/** Immutable seed; callers must clone before editing. */
export const CURRICULUM_CATALOG: CurriculumSystem[] = SYSTEM_SEEDS.map(buildSystem)

export const CURRICULUM_SUBJECTS = CURRICULUM_CATALOG.map(({ id, name, short, color }) => ({ id, name, short, color }))

export function freshCurriculumCatalog(): CurriculumSystem[] {
  return structuredClone(CURRICULUM_CATALOG)
}

export function findCurriculumPath(
  tree: CurriculumSystem[],
  query: { systemId?: string; topicId?: string; subtopicId?: string; microtopicId?: string; nanotopicId?: string },
) {
  for (const system of tree) {
    if (query.systemId && system.id !== query.systemId && system.sysId !== query.systemId) continue
    for (const topicNode of system.topics) {
      if (query.topicId && topicNode.id !== query.topicId && topicNode.tpcId !== query.topicId) continue
      for (const subtopicNode of topicNode.subs) {
        if (query.subtopicId && subtopicNode.id !== query.subtopicId && subtopicNode.subId !== query.subtopicId) continue
        for (const microtopicNode of subtopicNode.micros) {
          if (query.microtopicId && microtopicNode.id !== query.microtopicId && microtopicNode.micId !== query.microtopicId) continue
          const nanotopicNode = microtopicNode.nanos.find((node) => !query.nanotopicId || node.id === query.nanotopicId || node.nanId === query.nanotopicId)
          return { system, topic: topicNode, subtopic: subtopicNode, microtopic: microtopicNode, nanotopic: nanotopicNode }
        }
        return { system, topic: topicNode, subtopic: subtopicNode, microtopic: undefined, nanotopic: undefined }
      }
      return { system, topic: topicNode, subtopic: undefined, microtopic: undefined, nanotopic: undefined }
    }
    return { system, topic: undefined, subtopic: undefined, microtopic: undefined, nanotopic: undefined }
  }
  return undefined
}

export const PILOT_ARTICLE_PLACEMENTS: Record<string, { topicTitle: string; subtopicTitle: string }> = {
  'ART-CVS-HEART-ORIENTATION': { topicTitle: 'Cardiac anatomy', subtopicTitle: 'Heart orientation and pericardium' },
  'ART-CVS-CHAMBERS-VALVES': { topicTitle: 'Cardiac anatomy', subtopicTitle: 'Cardiac chambers and valves' },
  'ART-CVS-CORONARY-CIRCULATION': { topicTitle: 'Cardiac anatomy', subtopicTitle: 'Coronary circulation' },
  'ART-CVS-CARDIAC-HISTOLOGY': { topicTitle: 'Cardiac histology and development', subtopicTitle: 'Cardiac histology' },
  'ART-CVS-CONDUCTION': { topicTitle: 'Cardiac electrophysiology', subtopicTitle: 'Conduction system' },
  'ART-CVS-CARDIAC-ELECTRICAL': { topicTitle: 'Cardiac electrophysiology', subtopicTitle: 'Cardiac electrical activity and ECG foundations' },
  'ART-CVS-CARDIAC-CYCLE': { topicTitle: 'Cardiac mechanics and haemodynamics', subtopicTitle: 'Cardiac cycle' },
  'ART-CVS-CARDIAC-OUTPUT': { topicTitle: 'Cardiac mechanics and haemodynamics', subtopicTitle: 'Cardiac output, preload and afterload' },
  'ART-CVS-BLOOD-PRESSURE': { topicTitle: 'Vascular physiology', subtopicTitle: 'Blood pressure and its regulation' },
  'ART-CVS-VASCULAR-FLOW': { topicTitle: 'Vascular physiology', subtopicTitle: 'Blood flow and microcirculation' },
}

export function pilotArticlePlacement(articleId: string, tree = CURRICULUM_CATALOG) {
  const target = PILOT_ARTICLE_PLACEMENTS[articleId]
  const system = tree.find((node) => node.id === 'cvs')
  const topicNode = system?.topics.find((node) => node.title === target?.topicTitle)
  const subtopicNode = topicNode?.subs.find((node) => node.title === target?.subtopicTitle)
  return system && topicNode && subtopicNode ? { system, topic: topicNode, subtopic: subtopicNode } : undefined
}
