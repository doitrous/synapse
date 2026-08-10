/**
 * Synapse curriculum source of truth.
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
}

export interface CurriculumSystem {
  id: string
  name: string
  short: string
  color: string
  sysId: string
  topics: CurriculumTopic[]
}

interface TopicSeed {
  title: string
  subtopics: Array<string | { title: string; microtopics: Array<string | { title: string; nanotopics: string[] }> }>
}

interface SystemSeed {
  id: string
  name: string
  short: string
  color: string
  topics: TopicSeed[]
}

export const curriculumSlug = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item'

const upperId = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/(^_|_$)/g, '')

export const curriculumSystemId = (subjectId: string) => `SYS_${upperId(subjectId)}`
export const curriculumTopicId = (nodeId: string) => `TPC_${upperId(nodeId)}`
export const curriculumSubtopicId = (nodeId: string) => `SUB_${upperId(nodeId)}`
export const curriculumMicrotopicId = (nodeId: string) => `MIC_${upperId(nodeId)}`
export const curriculumNanotopicId = (nodeId: string) => `NAN_${upperId(nodeId)}`

const topic = (title: string, subtopics: TopicSeed['subtopics']): TopicSeed => ({ title, subtopics })
const sub = (title: string, microtopics: Array<string | { title: string; nanotopics: string[] }>) => ({ title, microtopics })

const SYSTEM_SEEDS: SystemSeed[] = [
  {
    id: 'cvs', name: 'Cardiovascular', short: 'CVS', color: '#a8462f',
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
        'Developmental anomalies',
      ]),
      topic('Cardiac electrophysiology', [
        sub('Conduction system', ['Sinoatrial node', 'Atrioventricular node', 'His–Purkinje system', 'Autonomic modulation']),
        sub('Cardiac electrical activity and ECG foundations', ['Cardiac action potentials', 'Refractory periods', 'ECG waves and intervals', 'Electrical axis and lead orientation']),
        'Excitation–contraction coupling',
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
        'Chest pain', 'Dyspnoea and orthopnoea', 'Palpitations and syncope', 'Oedema', 'Cyanosis', 'Shock and poor perfusion',
      ]),
      topic('Cardiovascular examination and investigations', [
        'Cardiovascular history', 'Pulse and blood pressure examination', 'Precordial examination', 'Electrocardiography',
        'Cardiac biomarkers', 'Echocardiography', 'Chest imaging', 'Haemodynamic assessment',
      ]),
      topic('Cardiovascular pharmacology', [
        'Antihypertensive drugs', 'Antianginal drugs', 'Heart failure pharmacology', 'Antiarrhythmic drugs',
        'Antiplatelet and anticoagulant drugs', 'Lipid-lowering drugs',
      ]),
      topic('Cardiovascular emergencies and skills', [
        'Acute coronary syndromes', 'Acute heart failure', 'Tachyarrhythmias and bradyarrhythmias',
        'Cardiac arrest and basic life support', 'Cardiogenic shock', 'ECG recording and interpretation skills',
      ]),
    ],
  },
  {
    id: 'resp', name: 'Respiratory', short: 'RESP', color: '#3f6f7a',
    topics: [
      topic('Respiratory anatomy', ['Upper airway', 'Larynx and trachea', 'Bronchial tree', 'Lungs and lobes', 'Pleura and thoracic cavity', 'Respiratory muscles', 'Pulmonary circulation']),
      topic('Respiratory histology and development', ['Conducting airway histology', 'Respiratory unit histology', 'Alveolar cells and surfactant', 'Lung development', 'Developmental anomalies']),
      topic('Ventilation and mechanics', ['Lung volumes and capacities', 'Compliance and elastic recoil', 'Airway resistance', 'Work of breathing', 'Dynamic airway compression']),
      topic('Gas exchange and transport', ['Ventilation–perfusion relationships', 'Diffusion across the alveolar membrane', 'Oxygen transport', 'Carbon dioxide transport', 'Hypoxaemia mechanisms']),
      topic('Control of breathing', ['Brainstem respiratory centres', 'Central and peripheral chemoreceptors', 'Neural reflexes', 'Exercise and altitude adaptation']),
      topic('Respiratory pathology', ['Obstructive airway disease', 'Restrictive lung disease', 'Pulmonary infection', 'Interstitial lung disease', 'Pulmonary vascular disease', 'Pleural disease', 'Respiratory neoplasia']),
      topic('Respiratory presentations', ['Cough', 'Dyspnoea', 'Wheeze and stridor', 'Haemoptysis', 'Chest pain', 'Cyanosis']),
      topic('Respiratory examination and investigations', ['Respiratory history', 'Chest examination', 'Pulse oximetry', 'Arterial blood gases', 'Spirometry and peak flow', 'Chest radiography', 'Computed tomography', 'Pleural fluid analysis']),
      topic('Respiratory pharmacology', ['Bronchodilators', 'Inhaled and systemic corticosteroids', 'Leukotriene modifiers', 'Antitussives and mucolytics', 'Pulmonary vascular drugs', 'Inhaler devices']),
      topic('Respiratory emergencies and skills', ['Acute severe asthma', 'Acute respiratory failure', 'Pneumothorax', 'Pulmonary embolism', 'Oxygen delivery', 'Inhaler technique', 'Arterial blood gas sampling']),
    ],
  },
  {
    id: 'renal', name: 'Renal & Urinary', short: 'RENAL', color: '#6f5788',
    topics: [
      topic('Renal and urinary anatomy', ['Kidneys and coverings', 'Renal blood supply', 'Ureters', 'Urinary bladder', 'Urethra', 'Pelvic relations']),
      topic('Renal histology and development', ['Nephron segments', 'Glomerular filtration barrier', 'Juxtaglomerular apparatus', 'Collecting system histology', 'Development of the urinary system', 'Congenital anomalies']),
      topic('Renal blood flow and filtration', ['Renal haemodynamics', 'Glomerular filtration rate', 'Filtration fraction', 'Autoregulation', 'Clearance principles']),
      topic('Tubular transport', ['Proximal tubular transport', 'Loop of Henle', 'Distal tubule', 'Collecting duct', 'Countercurrent mechanisms', 'Urine concentration and dilution']),
      topic('Fluid, electrolytes and acid–base', ['Body fluid compartments', 'Sodium and water balance', 'Potassium balance', 'Calcium, phosphate and magnesium', 'Acid–base physiology', 'Acid–base disorders']),
      topic('Endocrine functions of the kidney', ['Renin and blood pressure control', 'Erythropoietin', 'Vitamin D activation', 'Prostaglandins and renal mediators']),
      topic('Renal pathology', ['Acute kidney injury', 'Chronic kidney disease', 'Glomerular disease', 'Tubulointerstitial disease', 'Renovascular disease', 'Urinary tract infection', 'Obstruction and stones', 'Renal neoplasia']),
      topic('Renal presentations', ['Oliguria and anuria', 'Haematuria', 'Proteinuria', 'Dysuria and frequency', 'Flank pain', 'Oedema', 'Uraemic symptoms']),
      topic('Renal examination and investigations', ['Renal history', 'Urinalysis', 'Renal function tests', 'Urine microscopy and culture', 'Renal imaging', 'Kidney biopsy', 'Fluid balance assessment']),
      topic('Renal pharmacology and replacement therapy', ['Diuretics', 'Drugs affecting the renin–angiotensin system', 'Nephrotoxic drugs', 'Dose adjustment in renal impairment', 'Haemodialysis', 'Peritoneal dialysis', 'Renal transplantation']),
    ],
  },
  {
    id: 'gi', name: 'Gastrointestinal', short: 'GI', color: '#a07b34',
    topics: [
      topic('Gastrointestinal anatomy', ['Oral cavity and pharynx', 'Oesophagus', 'Stomach', 'Small intestine', 'Large intestine', 'Peritoneum and mesenteries', 'Abdominal blood supply and portal system']),
      topic('Gastrointestinal histology and development', ['General gut wall organisation', 'Oesophageal histology', 'Gastric histology', 'Small and large bowel histology', 'Enteric nervous system', 'Gut development and rotation', 'Developmental anomalies']),
      topic('Gastrointestinal motility and secretion', ['Swallowing and oesophageal motility', 'Gastric motility and emptying', 'Intestinal motility', 'Gastric secretion', 'Pancreatic secretion', 'Biliary secretion', 'Enteric and hormonal control']),
      topic('Digestion and absorption', ['Carbohydrate digestion and absorption', 'Protein digestion and absorption', 'Lipid digestion and absorption', 'Vitamin and mineral absorption', 'Water and electrolyte absorption', 'Gut microbiome foundations']),
      topic('Liver, biliary system and pancreas', ['Liver anatomy and histology', 'Hepatic metabolism', 'Bilirubin metabolism', 'Gallbladder and bile ducts', 'Exocrine pancreas', 'Portal hypertension']),
      topic('Gastrointestinal pathology', ['Reflux and peptic disease', 'Malabsorption', 'Inflammatory bowel disease', 'Functional bowel disorders', 'Hepatitis and cirrhosis', 'Biliary disease', 'Pancreatitis', 'Gastrointestinal neoplasia']),
      topic('Gastrointestinal presentations', ['Dysphagia', 'Dyspepsia', 'Abdominal pain', 'Nausea and vomiting', 'Diarrhoea and constipation', 'Gastrointestinal bleeding', 'Jaundice', 'Ascites and abdominal distension']),
      topic('Gastrointestinal examination and investigations', ['Gastrointestinal history', 'Abdominal examination', 'Liver function tests', 'Stool studies', 'Endoscopy', 'Abdominal imaging', 'Hepatobiliary imaging', 'Nutritional assessment']),
      topic('Gastrointestinal pharmacology', ['Acid suppression', 'Antiemetics and prokinetics', 'Laxatives and antidiarrhoeals', 'Inflammatory bowel disease drugs', 'Hepatobiliary drugs', 'Pancreatic enzyme replacement']),
      topic('Gastrointestinal emergencies and skills', ['Acute abdomen', 'Gastrointestinal haemorrhage', 'Acute liver failure', 'Bowel obstruction', 'Acute pancreatitis', 'Nasogastric tube skills', 'Abdominal fluid assessment']),
    ],
  },
  {
    id: 'neuro', name: 'Neurology', short: 'NEURO', color: '#5b7a4a',
    topics: [
      topic('Neuroanatomy', ['Cerebral hemispheres and lobes', 'Basal ganglia', 'Thalamus and hypothalamus', 'Brainstem', 'Cerebellum', 'Spinal cord', 'Meninges and cerebrospinal fluid', 'Cerebral blood supply', 'Cranial nerves', 'Peripheral nerves']),
      topic('Neural histology and development', ['Neurones and glia', 'Synapses', 'Myelin and nerve fibres', 'Peripheral nerve histology', 'Neural tube development', 'Brain vesicles and ventricular development', 'Developmental anomalies']),
      topic('Cellular neurophysiology', ['Resting membrane potential', 'Action potentials', 'Synaptic transmission', 'Neurotransmitters', 'Receptors and second messengers', 'Neural plasticity']),
      topic('Sensory systems', ['Somatic sensation', 'Pain pathways and modulation', 'Vision', 'Hearing', 'Vestibular function', 'Taste and olfaction']),
      topic('Motor systems', ['Upper and lower motor neurones', 'Corticospinal pathways', 'Basal ganglia circuits', 'Cerebellar control', 'Reflexes', 'Muscle tone and posture']),
      topic('Autonomic nervous system', ['Sympathetic organisation', 'Parasympathetic organisation', 'Autonomic reflexes', 'Autonomic pharmacology interfaces']),
      topic('Higher functions and behaviour', ['Consciousness and arousal', 'Language', 'Memory and learning', 'Emotion and limbic function', 'Sleep', 'Executive function']),
      topic('Neurological pathology', ['Cerebrovascular disease', 'Seizure disorders', 'Demyelinating disease', 'Neurodegeneration', 'Peripheral neuropathy', 'Neuromuscular junction disease', 'Central nervous system infection', 'Neuro-oncology']),
      topic('Neurological presentations and examination', ['Headache', 'Weakness', 'Sensory disturbance', 'Seizures and collapse', 'Dizziness and vertigo', 'Altered consciousness', 'Cranial nerve examination', 'Motor and sensory examination', 'Coordination and gait']),
      topic('Neurological investigations and pharmacology', ['Neuroimaging', 'Electroencephalography', 'Nerve conduction and electromyography', 'Cerebrospinal fluid analysis', 'Antiseizure drugs', 'Parkinson disease drugs', 'Analgesics', 'Anaesthetic foundations']),
    ],
  },
  {
    id: 'endo', name: 'Endocrine', short: 'ENDO', color: '#9c5f7e',
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
      topic('Endocrine pharmacology and emergencies', ['Insulins and non-insulin glucose-lowering drugs', 'Thyroid drugs', 'Corticosteroids', 'Pituitary and adrenal drugs', 'Diabetic emergencies', 'Adrenal crisis', 'Thyroid emergencies']),
    ],
  },
  {
    id: 'msk', name: 'Musculoskeletal', short: 'MSK', color: '#877258',
    topics: [
      topic('Musculoskeletal foundations', ['Anatomical terminology and movement', 'Bones and joints', 'Skeletal muscle architecture', 'Fascia and compartments', 'Peripheral nerves and vessels']),
      topic('Bone, cartilage and connective tissue', ['Bone histology', 'Bone formation and remodelling', 'Cartilage histology', 'Tendons and ligaments', 'Connective tissue matrix', 'Fracture healing']),
      topic('Muscle physiology', ['Neuromuscular junction', 'Excitation–contraction coupling', 'Motor units', 'Length–tension relationship', 'Muscle energetics', 'Fatigue and adaptation']),
      topic('Upper limb', ['Pectoral region and axilla', 'Shoulder', 'Arm', 'Elbow and cubital fossa', 'Forearm', 'Wrist and hand', 'Upper-limb nerves and vessels']),
      topic('Lower limb', ['Gluteal region', 'Hip', 'Thigh', 'Knee and popliteal fossa', 'Leg', 'Ankle and foot', 'Lower-limb nerves and vessels']),
      topic('Back and axial skeleton', ['Vertebral column', 'Back muscles', 'Spinal joints and ligaments', 'Thoracic cage', 'Posture and gait']),
      topic('Musculoskeletal pathology', ['Trauma and fractures', 'Osteoarthritis', 'Inflammatory arthritis', 'Crystal arthropathy', 'Bone infection', 'Metabolic bone disease', 'Muscle disease', 'Bone and soft-tissue tumours']),
      topic('Musculoskeletal presentations and examination', ['Joint pain and swelling', 'Back pain', 'Muscle weakness', 'Limb injury', 'Upper-limb examination', 'Lower-limb examination', 'Spine examination', 'Gait assessment']),
      topic('Musculoskeletal investigations', ['Plain radiography', 'Computed tomography', 'Magnetic resonance imaging', 'Ultrasound', 'Synovial fluid analysis', 'Bone biochemistry', 'Electrodiagnostic studies']),
      topic('Musculoskeletal pharmacology and skills', ['Analgesics', 'Non-steroidal anti-inflammatory drugs', 'Disease-modifying antirheumatic drugs', 'Drugs for gout', 'Drugs for osteoporosis', 'Immobilisation principles', 'Joint aspiration foundations']),
    ],
  },
  {
    id: 'pharm', name: 'Pharmacology', short: 'PHARM', color: '#c06a3f',
    topics: [
      topic('Pharmacokinetics', ['Routes of administration', 'Absorption and bioavailability', 'Distribution and protein binding', 'Metabolism', 'Elimination and clearance', 'Half-life and steady state', 'Compartment models']),
      topic('Pharmacodynamics', ['Drug targets and receptors', 'Dose–response relationships', 'Agonism and antagonism', 'Potency and efficacy', 'Therapeutic index', 'Tolerance and dependence']),
      topic('Safe prescribing and calculations', ['Prescription structure', 'Dose calculations', 'Infusion calculations', 'Renal and hepatic dose adjustment', 'Medicine reconciliation', 'Adherence and shared decisions', 'High-risk medicines']),
      topic('Adverse effects and interactions', ['Adverse drug reaction classification', 'Drug–drug interactions', 'Drug–food interactions', 'Pharmacovigilance', 'Medication errors', 'Deprescribing']),
      topic('Autonomic pharmacology', ['Cholinergic agonists', 'Antimuscarinic drugs', 'Adrenergic agonists', 'Alpha-adrenoceptor antagonists', 'Beta-adrenoceptor antagonists', 'Neuromuscular blockers']),
      topic('Cardiovascular pharmacology', ['Antihypertensive drugs', 'Antianginal drugs', 'Heart failure drugs', 'Antiarrhythmic drugs', 'Antiplatelet drugs', 'Anticoagulants and thrombolytics', 'Lipid-lowering drugs']),
      topic('Respiratory and allergy pharmacology', ['Bronchodilators', 'Corticosteroids', 'Leukotriene modifiers', 'Antihistamines', 'Anaphylaxis medicines', 'Inhaler devices']),
      topic('Renal and endocrine pharmacology', ['Diuretics', 'Renin–angiotensin system drugs', 'Insulins', 'Non-insulin glucose-lowering drugs', 'Thyroid drugs', 'Corticosteroids', 'Reproductive hormones']),
      topic('Gastrointestinal pharmacology', ['Acid suppression', 'Antiemetics', 'Prokinetics', 'Laxatives', 'Antidiarrhoeals', 'Inflammatory bowel disease drugs']),
      topic('Neuropsychopharmacology', ['Analgesics', 'Local and general anaesthetics', 'Antiseizure drugs', 'Parkinson disease drugs', 'Antidepressants', 'Antipsychotics', 'Anxiolytics and sedatives']),
      topic('Antimicrobial pharmacology', ['Antibacterial principles', 'Cell-wall active antibacterials', 'Protein-synthesis inhibitors', 'Nucleic-acid inhibitors', 'Antimycobacterial drugs', 'Antifungal drugs', 'Antiviral drugs', 'Antiparasitic drugs', 'Antimicrobial stewardship']),
      topic('Inflammation, immunity and cancer pharmacology', ['Non-steroidal anti-inflammatory drugs', 'Glucocorticoids', 'Disease-modifying antirheumatic drugs', 'Immunosuppressants', 'Biological therapies', 'Cytotoxic chemotherapy', 'Targeted anticancer therapy']),
      topic('Toxicology and antidotes', ['Initial poisoning assessment', 'Decontamination principles', 'Paracetamol poisoning', 'Opioid poisoning', 'Cholinergic toxicity', 'Toxic alcohols', 'Common antidotes']),
      topic('Special populations and personalised therapy', ['Paediatric pharmacology', 'Pregnancy and lactation', 'Older adults and polypharmacy', 'Pharmacogenomics', 'Therapeutic drug monitoring']),
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
    return { id: topicNodeId, title: topicSeed.title, tpcId: curriculumTopicId(topicNodeId), subs }
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
