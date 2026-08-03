export interface OsceStation {
  id: string
  title: string
  subjectId: string
  minutes: number
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  marks: number
  attempts: number
  bestScore?: number
}

export interface ClinicalCase {
  id: string
  title: string
  presentation: string
  subjectId: string
  minutes: number
  steps: number
  status: 'not-started' | 'in-progress' | 'completed'
}

export interface Skill {
  id: string
  name: string
  category: 'Examination' | 'Procedures' | 'Communication'
  status: 'signed' | 'pending' | 'not-started'
  signedBy?: string
  date?: string
}

export interface LabImagingSet {
  id: string
  title: string
  type: 'Lab' | 'Imaging'
  subjectId: string
  items: number
  done: number
}

export const osceStations: OsceStation[] = [
  { id: 'os-cvs', title: 'Cardiovascular examination', subjectId: 'cvs', minutes: 8, difficulty: 'Moderate', marks: 24, attempts: 2, bestScore: 78 },
  { id: 'os-resp', title: 'Respiratory examination', subjectId: 'resp', minutes: 8, difficulty: 'Easy', marks: 22, attempts: 1, bestScore: 71 },
  { id: 'os-abdo', title: 'Abdominal examination', subjectId: 'gi', minutes: 8, difficulty: 'Moderate', marks: 24, attempts: 0 },
  { id: 'os-cn', title: 'Cranial nerve examination', subjectId: 'neuro', minutes: 10, difficulty: 'Hard', marks: 30, attempts: 1, bestScore: 64 },
  { id: 'os-hx', title: 'History taking: chest pain', subjectId: 'cvs', minutes: 8, difficulty: 'Moderate', marks: 20, attempts: 3, bestScore: 82 },
]

export const clinicalCases: ClinicalCase[] = [
  { id: 'cc-postpartum', title: 'Post-partum breathlessness', presentation: 'Sudden hypoxia six days after delivery', subjectId: 'resp', minutes: 12, steps: 3, status: 'not-started' },
  { id: 'cc-breath', title: 'Breathlessness in a 68-year-old', presentation: 'Progressive exertional dyspnoea and ankle swelling', subjectId: 'cvs', minutes: 15, steps: 6, status: 'completed' },
  { id: 'cc-chest', title: 'Acute central chest pain', presentation: 'Sudden crushing chest pain radiating to the jaw', subjectId: 'cvs', minutes: 12, steps: 5, status: 'in-progress' },
  { id: 'cc-confusion', title: 'Confusion in an older adult', presentation: 'Acute confusion and reduced mobility over 2 days', subjectId: 'neuro', minutes: 18, steps: 7, status: 'not-started' },
  { id: 'cc-thirst', title: 'Polyuria and thirst', presentation: 'Weight loss, thirst, and frequent urination', subjectId: 'endo', minutes: 14, steps: 6, status: 'not-started' },
]

export const skills: Skill[] = [
  { id: 'sk-bp', name: 'Blood pressure measurement', category: 'Examination', status: 'signed', signedBy: 'Dr Fielding', date: '12 May' },
  { id: 'sk-cvs', name: 'Cardiovascular examination', category: 'Examination', status: 'signed', signedBy: 'Dr Owusu', date: '3 Jun' },
  { id: 'sk-resp', name: 'Respiratory examination', category: 'Examination', status: 'signed', signedBy: 'Dr Owusu', date: '3 Jun' },
  { id: 'sk-abdo', name: 'Abdominal examination', category: 'Examination', status: 'pending' },
  { id: 'sk-vene', name: 'Venepuncture', category: 'Procedures', status: 'signed', signedBy: 'Sr. Patel', date: '21 May' },
  { id: 'sk-cann', name: 'IV cannulation', category: 'Procedures', status: 'pending' },
  { id: 'sk-ecg', name: 'ECG recording', category: 'Procedures', status: 'pending' },
  { id: 'sk-cath', name: 'Urinary catheterisation', category: 'Procedures', status: 'not-started' },
  { id: 'sk-bls', name: 'Basic life support', category: 'Procedures', status: 'signed', signedBy: 'Resus team', date: '9 Apr' },
  { id: 'sk-consent', name: 'Explaining a procedure & consent', category: 'Communication', status: 'signed', signedBy: 'Dr Fielding', date: '18 Jun' },
  { id: 'sk-breaking', name: 'Breaking bad news', category: 'Communication', status: 'not-started' },
  { id: 'sk-handover', name: 'Structured handover (SBAR)', category: 'Communication', status: 'pending' },
]

export const labImaging: LabImagingSet[] = [
  { id: 'li-abg', title: 'Arterial blood gas interpretation', type: 'Lab', subjectId: 'renal', items: 20, done: 12 },
  { id: 'li-fbc', title: 'Full blood count patterns', type: 'Lab', subjectId: 'gi', items: 15, done: 8 },
  { id: 'li-cxr', title: 'Chest X-ray basics', type: 'Imaging', subjectId: 'resp', items: 18, done: 6 },
  { id: 'li-ecg', title: 'ECG library', type: 'Imaging', subjectId: 'cvs', items: 30, done: 14 },
  { id: 'li-ct', title: 'CT head essentials', type: 'Imaging', subjectId: 'neuro', items: 16, done: 0 },
]

/** Year-wide skills sign-off total (matches the dashboard headline). */
export const skillsTotals = { signed: 14, total: 22 }
