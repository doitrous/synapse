import type { Difficulty } from './qbank.ts'

export interface OsceStation {
  id: string
  title: string
  subjectId: string
  minutes: number
  difficulty: Difficulty
  marks: number
  /**
   * A skills checklist is a station with no simulated patient. It runs through
   * the same timer and mark scheme, so it lives in the same list rather than a
   * parallel one — but it is labelled, because what a student prepares for the
   * two is different.
   */
  kind?: 'station' | 'checklist'
}

export interface ClinicalCase {
  id: string
  title: string
  presentation: string
  subjectId: string
  minutes: number
  steps: number
}

/**
 * A skill on the year's checklist.
 *
 * It carries no status and no sign-off. The seeded list previously asserted
 * that a student had been signed off by "Dr Fielding" on 12 May and by "Dr
 * Owusu" on 3 June — named clinicians, specific dates, and an entirely
 * fictitious record. What a student has done with a skill now lives in their
 * own `practicalProgress` record, and a real sign-off needs an assessor
 * identity this product does not yet have.
 */
export interface Skill {
  id: string
  name: string
  category: 'Examination' | 'Procedures' | 'Communication'
}

export interface LabImagingSet {
  id: string
  title: string
  type: 'Lab' | 'Imaging'
  subjectId: string
  items: number
}

export const osceStations: OsceStation[] = [
  { id: 'os-cvs', title: 'Cardiovascular examination', subjectId: 'cvs', minutes: 8, difficulty: 'Moderate', marks: 24 },
  { id: 'os-resp', title: 'Respiratory examination', subjectId: 'resp', minutes: 8, difficulty: 'Easy', marks: 22 },
  { id: 'os-abdo', title: 'Abdominal examination', subjectId: 'gi', minutes: 8, difficulty: 'Moderate', marks: 24 },
  { id: 'os-cn', title: 'Cranial nerve examination', subjectId: 'neuro', minutes: 10, difficulty: 'Hard', marks: 30 },
  { id: 'os-hx', title: 'History taking: chest pain', subjectId: 'cvs', minutes: 8, difficulty: 'Moderate', marks: 20 },
]

export const clinicalCases: ClinicalCase[] = [
  { id: 'cc-postpartum', title: 'Post-partum breathlessness', presentation: 'Sudden hypoxia six days after delivery', subjectId: 'resp', minutes: 12, steps: 3 },
  { id: 'cc-breath', title: 'Breathlessness in a 68-year-old', presentation: 'Progressive exertional dyspnoea and ankle swelling', subjectId: 'cvs', minutes: 15, steps: 6 },
  { id: 'cc-chest', title: 'Acute central chest pain', presentation: 'Sudden crushing chest pain radiating to the jaw', subjectId: 'cvs', minutes: 12, steps: 5 },
  { id: 'cc-confusion', title: 'Confusion in an older adult', presentation: 'Acute confusion and reduced mobility over 2 days', subjectId: 'neuro', minutes: 18, steps: 7 },
  { id: 'cc-thirst', title: 'Polyuria and thirst', presentation: 'Weight loss, thirst, and frequent urination', subjectId: 'endo', minutes: 14, steps: 6 },
]

export const skills: Skill[] = [
  { id: 'sk-bp', name: 'Blood pressure measurement', category: 'Examination' },
  { id: 'sk-cvs', name: 'Cardiovascular examination', category: 'Examination' },
  { id: 'sk-resp', name: 'Respiratory examination', category: 'Examination' },
  { id: 'sk-abdo', name: 'Abdominal examination', category: 'Examination' },
  { id: 'sk-vene', name: 'Venepuncture', category: 'Procedures' },
  { id: 'sk-cann', name: 'IV cannulation', category: 'Procedures' },
  { id: 'sk-ecg', name: 'ECG recording', category: 'Procedures' },
  { id: 'sk-cath', name: 'Urinary catheterisation', category: 'Procedures' },
  { id: 'sk-bls', name: 'Basic life support', category: 'Procedures' },
  { id: 'sk-consent', name: 'Explaining a procedure & consent', category: 'Communication' },
  { id: 'sk-breaking', name: 'Breaking bad news', category: 'Communication' },
  { id: 'sk-handover', name: 'Structured handover (SBAR)', category: 'Communication' },
]

export const labImaging: LabImagingSet[] = [
  { id: 'li-abg', title: 'Arterial blood gas interpretation', type: 'Lab', subjectId: 'renal', items: 20 },
  { id: 'li-fbc', title: 'Full blood count patterns', type: 'Lab', subjectId: 'gi', items: 15 },
  { id: 'li-cxr', title: 'Chest X-ray basics', type: 'Imaging', subjectId: 'resp', items: 18 },
  { id: 'li-ecg', title: 'ECG library', type: 'Imaging', subjectId: 'cvs', items: 30 },
  { id: 'li-ct', title: 'CT head essentials', type: 'Imaging', subjectId: 'neuro', items: 16 },
]

export interface OralQuestion {
  id: string
  subjectId: string
  topic: string
  question: string
  modelAnswer: string
}

/** The most common viva / oral-exam questions, grouped by module (subject). */
export const oralQuestions: OralQuestion[] = [
  // Cardiovascular
  { id: 'or-hf-1', subjectId: 'cvs', topic: 'Heart failure', question: 'Define heart failure and classify it by ejection fraction.', modelAnswer: 'Heart failure is a clinical syndrome in which the heart cannot deliver output sufficient for metabolic demand at normal filling pressures. By ejection fraction it is classified as HFrEF (≤40%), HFmrEF (41–49%), and HFpEF (≥50%).' },
  { id: 'or-hf-2', subjectId: 'cvs', topic: 'Heart failure', question: 'What are the four pillars of prognostic therapy in HFrEF?', modelAnswer: 'ARNI (or ACE inhibitor/ARB), a beta-blocker, a mineralocorticoid receptor antagonist, and an SGLT2 inhibitor. They are started early at low dose and up-titrated together; they work by interrupting maladaptive compensation, not by inotropy.' },
  { id: 'or-acs-1', subjectId: 'cvs', topic: 'Acute coronary syndromes', question: 'How do you distinguish STEMI, NSTEMI, and unstable angina?', modelAnswer: 'By the 12-lead ECG and serial troponin. STEMI has persistent ST elevation (or new LBBB) with troponin rise; NSTEMI has a troponin rise without ST elevation; unstable angina has ischaemic symptoms without a troponin rise.' },

  // Respiratory
  { id: 'or-asth-1', subjectId: 'resp', topic: 'Asthma', question: 'What spirometric finding supports a diagnosis of asthma?', modelAnswer: 'Reversible airflow obstruction — a ≥12% (and ≥200 mL) improvement in FEV₁ after a bronchodilator — supported by diurnal peak-flow variability, raised FeNO, and eosinophilia.' },
  { id: 'or-asth-2', subjectId: 'resp', topic: 'Asthma', question: 'Why is SABA-only reliever therapy discouraged?', modelAnswer: 'It relieves bronchospasm but leaves airway inflammation untreated, and frequent SABA use is associated with a higher risk of severe exacerbations. Modern guidelines centre inhaled corticosteroids, increasingly as ICS-formoterol reliever therapy.' },

  // Renal & urinary
  { id: 'or-ab-1', subjectId: 'renal', topic: 'Acid–base balance', question: 'Describe a structured approach to interpreting an arterial blood gas.', modelAnswer: 'Five steps: read the pH (acidaemia/alkalaemia); identify the primary respiratory (CO₂) or metabolic (HCO₃⁻) driver; assess whether compensation is appropriate; calculate the anion gap in a metabolic acidosis; then interpret in the clinical context.' },

  // Pharmacology
  { id: 'or-diur-1', subjectId: 'pharm', topic: 'Diuretics', question: 'Classify diuretics by their site of action along the nephron.', modelAnswer: 'Loop diuretics act on the Na-K-2Cl cotransporter in the thick ascending limb (most potent); thiazides block Na-Cl in the distal convoluted tubule; potassium-sparing agents/MRAs act in the collecting duct; carbonic anhydrase inhibitors act proximally.' },

  // Neurology
  { id: 'or-cn-1', subjectId: 'neuro', topic: 'Cranial nerves', question: 'What does forehead sparing indicate in a facial nerve palsy?', modelAnswer: 'An upper motor neurone lesion. The forehead receives bilateral cortical input, so it is spared in a UMN lesion but involved in a lower motor neurone (Bell) palsy, which affects the whole half of the face.' },

  // GI
  { id: 'or-gi-1', subjectId: 'gi', topic: 'Abdominal examination', question: 'How would you present the signs of chronic liver disease found on examination?', modelAnswer: 'Peripheral: leuconychia, clubbing, palmar erythema, Dupuytren\'s, spider naevi, gynaecomastia. Abdominal: distension, caput medusae, splenomegaly, ascites (shifting dullness). Complete by assessing for encephalopathy (asterixis) and jaundice.' },

  // Endocrine
  { id: 'or-endo-1', subjectId: 'endo', topic: 'Diabetes', question: 'How is diabetes mellitus diagnosed biochemically?', modelAnswer: 'Fasting glucose ≥7.0 mmol/L, random/2-hour OGTT glucose ≥11.1 mmol/L, or HbA1c ≥48 mmol/mol (6.5%). In an asymptomatic patient the abnormal result should be confirmed on a second occasion.' },
]

/**
 * There is deliberately no `skillsTotals` export any more.
 *
 * It said `{ signed: 14, total: 22 }` above a list of twelve skills, six of
 * which claimed a sign-off. The headline is now counted from the list it sits
 * above, in `summariseSkills`.
 */
