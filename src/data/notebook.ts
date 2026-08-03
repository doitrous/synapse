export interface Note {
  id: string
  title: string
  body: string
  tags: string[]
  subtopicId?: string
  subtopicTitle?: string
  subjectId?: string
  imageData?: string
  updated: string
}

export const initialNotes: Note[] = [
  {
    id: 'nb1',
    title: 'Heart failure — the compensation trap',
    body: 'The systems that compensate for low output (sympathetic drive, RAAS, remodelling) are exactly what disease-modifying drugs block. Beta-blockers, ACEi/ARNI, and MRAs work by interrupting compensation — they do not "boost" the heart.\n\nFrank–Starling curve is flattened, so rising filling pressure buys congestion, not output.',
    tags: ['Cardiology', 'High-yield'],
    subtopicId: 'hf-patho',
    subtopicTitle: 'Heart failure · Pathophysiology',
    updated: '2 days ago',
  },
  {
    id: 'nb2',
    title: 'Four pillars of HFrEF',
    body: 'ARNI (or ACEi/ARB) · Beta-blocker · MRA · SGLT2 inhibitor.\n\nStart all four early at low dose and up-titrate together. Loop diuretics = symptoms only, no mortality benefit. Watch K⁺ and renal function with MRA + ARNI.',
    tags: ['Pharmacology', 'Management'],
    subtopicId: 'hf-mgmt',
    subtopicTitle: 'Heart failure · Pharmacological management',
    updated: '4 days ago',
  },
  {
    id: 'nb3',
    title: 'ABG in five steps',
    body: '1. pH — acidaemic or alkalaemic?\n2. Primary driver — respiratory (CO₂) or metabolic (HCO₃⁻)?\n3. Compensation — appropriate?\n4. Anion gap — always in a metabolic acidosis.\n5. Clinical context — numbers never stand alone.',
    tags: ['Renal', 'Exam technique'],
    subtopicId: 'ab-approach',
    subtopicTitle: 'Acid–base · A structured approach',
    updated: '1 week ago',
  },
  {
    id: 'nb4',
    title: 'ACS — ECG + troponin decide everything',
    body: 'STEMI = ST elevation (or new LBBB) → complete occlusion → PCI within 120 min.\nNSTEMI = troponin rise, no ST elevation.\nUnstable angina = symptoms, no troponin rise.\n\nAtypical presentations: women, older adults, diabetes — low threshold for an ECG.',
    tags: ['Cardiology'],
    subtopicId: 'acs-dx',
    subtopicTitle: 'Acute coronary syndromes · Presentation & diagnosis',
    updated: '1 week ago',
  },
  {
    id: 'nb5',
    title: 'Cranial nerves — quick recall',
    body: 'For each nerve: function, test, classic lesion.\n\nForehead sparing = UMN facial lesion (bilateral cortical input). Dilated pupil in a III palsy = compressive until proven otherwise.',
    tags: ['Neurology', 'High-yield'],
    subtopicId: 'cn-overview',
    subtopicTitle: 'Cranial nerves · Overview & common lesions',
    updated: '2 weeks ago',
  },
]
