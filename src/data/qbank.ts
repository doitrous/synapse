export type Difficulty = 'Easy' | 'Moderate' | 'Hard' | 'Challenging'

/** The bands in ascending order of demand, for anything that has to rank them. */
export const DIFFICULTIES: readonly Difficulty[] = ['Easy', 'Moderate', 'Hard', 'Challenging']

/**
 * `Hard` and `Challenging` both mean "expect most students to miss this". They
 * are separated because the intent differs: `Hard` is a concept a strong student
 * gets right, `Challenging` needs several steps held at once.
 */
export const DEMANDING_DIFFICULTIES: readonly Difficulty[] = ['Moderate', 'Hard', 'Challenging']

export interface QOption {
  text: string
  correct: boolean
  rationale: string
}

export interface LibraryRef {
  id: string
  title: string
}

export interface QuestionMedia {
  id: string
  type: 'image' | 'audio' | 'video'
  name: string
  url: string
  mimeType?: string
  size?: number
}

export interface Question {
  id: string
  subjectId: string
  topic: string
  difficulty: Difficulty
  vignette: string
  stem: string
  options: QOption[]
  explanation: string
  libraryRefs: LibraryRef[]
  resourceRefs: string[]
  attachedImage?: string
  attachments?: QuestionMedia[]
  /** What a correct response demonstrates. Held back until the answer is revealed. */
  learningObjective?: string
  /**
   * Concepts the question actually assesses — `mainConceptIds` then `conceptIds`.
   * Contextual concepts are deliberately excluded: they are mentioned by the
   * vignette but not tested, and listing them would tell a student to revise
   * something this question never measured.
   */
  conceptIds?: string[]
}

export const questions: Question[] = [
  {
    id: 'q-hf-1',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Moderate',
    vignette:
      'A 68-year-old man with HFrEF (ejection fraction 30%) is started on bisoprolol, which is slowly up-titrated over several weeks.',
    stem: 'Which mechanism best explains the mortality benefit of beta-blockade in HFrEF?',
    options: [
      { text: 'Direct positive inotropy increasing cardiac output', correct: false, rationale: 'Beta-blockers are negatively inotropic; benefit is not from stimulating the heart.' },
      { text: 'Opposing chronic sympathetic activation and its remodelling effects', correct: true, rationale: 'Correct — blunting sympathetic overdrive reduces myocyte toxicity, arrhythmia, and adverse remodelling.' },
      { text: 'Blocking aldosterone at the collecting duct', correct: false, rationale: 'That is the mechanism of MRAs, not beta-blockers.' },
      { text: 'Increasing heart rate to improve output', correct: false, rationale: 'Beta-blockers lower heart rate; a lower rate improves diastolic filling and oxygen demand.' },
    ],
    explanation:
      'HFrEF progresses partly through chronic sympathetic activation, which is directly toxic to myocytes and drives remodelling. Beta-blockers improve survival by interrupting this maladaptive compensation — not by stimulating contractility.',
    libraryRefs: [{ id: 'hf-patho', title: 'Heart failure · Pathophysiology' }],
    resourceRefs: ['NICE NG106 · Chronic heart failure'],
  },
  {
    id: 'q-hf-4',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Easy',
    vignette: 'A patient with HFrEF is reviewed in clinic and their medications are discussed.',
    stem: 'Which drug class relieves congestive symptoms but has no proven mortality benefit in HFrEF?',
    options: [
      { text: 'Loop diuretics', correct: true, rationale: 'Correct — furosemide relieves congestion but does not prolong survival.' },
      { text: 'ARNI', correct: false, rationale: 'ARNIs are a prognostic pillar with mortality benefit.' },
      { text: 'SGLT2 inhibitors', correct: false, rationale: 'These improve outcomes independent of diabetes status.' },
      { text: 'Mineralocorticoid receptor antagonists', correct: false, rationale: 'MRAs are one of the four prognostic pillars.' },
    ],
    explanation:
      'The four pillars (ARNI/ACEi, beta-blocker, MRA, SGLT2 inhibitor) improve survival. Loop diuretics are symptomatic therapy — essential for comfort but without a mortality benefit.',
    libraryRefs: [{ id: 'hf-mgmt', title: 'Heart failure · Pharmacological management' }],
    resourceRefs: ['BNF · Loop diuretics'],
  },
  {
    id: 'q-acs-1',
    subjectId: 'cvs',
    topic: 'Acute coronary syndromes',
    difficulty: 'Easy',
    vignette:
      'A 59-year-old woman presents with 40 minutes of central chest pain. Her 12-lead ECG shows no ST elevation. High-sensitivity troponin is rising on serial testing.',
    stem: 'What is the most likely diagnosis?',
    options: [
      { text: 'STEMI', correct: false, rationale: 'STEMI requires ST elevation (or new LBBB).' },
      { text: 'NSTEMI', correct: true, rationale: 'Correct — ischaemic symptoms + troponin rise without ST elevation.' },
      { text: 'Unstable angina', correct: false, rationale: 'Unstable angina has no troponin rise.' },
      { text: 'Stable angina', correct: false, rationale: 'Stable angina is exertional and predictable, without a troponin rise.' },
    ],
    explanation:
      'The ECG and serial troponin separate the acute coronary syndromes. A troponin rise without ST elevation defines NSTEMI.',
    libraryRefs: [{ id: 'acs-dx', title: 'Acute coronary syndromes · Presentation & diagnosis' }],
    resourceRefs: ['ECG library · ST-segment changes'],
  },
  {
    id: 'q-acs-2',
    subjectId: 'cvs',
    topic: 'Acute coronary syndromes',
    difficulty: 'Moderate',
    vignette: 'A patient is diagnosed with STEMI in the emergency department.',
    stem: 'What is the target time window for primary PCI?',
    options: [
      { text: 'Within 120 minutes', correct: true, rationale: 'Correct — primary PCI is preferred within 120 minutes of diagnosis.' },
      { text: 'Within 12 hours only', correct: false, rationale: 'Earlier reperfusion saves more myocardium; 120 minutes is the target.' },
      { text: 'Within 30 minutes', correct: false, rationale: 'Desirable but not the guideline threshold; door-to-balloon targets differ.' },
      { text: 'Within 24 hours', correct: false, rationale: 'Too long — myocardial salvage falls sharply with delay.' },
    ],
    explanation:
      'STEMI reflects complete coronary occlusion and needs prompt reperfusion. Primary PCI within 120 minutes is preferred; thrombolysis is used when PCI is not available in time.',
    libraryRefs: [{ id: 'acs-mgmt', title: 'Acute coronary syndromes · Initial management' }],
    resourceRefs: ['NICE NG185 · Acute coronary syndromes'],
  },
  {
    id: 'q-as-1',
    subjectId: 'resp',
    topic: 'Asthma',
    difficulty: 'Easy',
    vignette: 'A 24-year-old with episodic wheeze undergoes spirometry before and after a bronchodilator.',
    stem: 'Which change supports a diagnosis of asthma?',
    options: [
      { text: '≥12% improvement in FEV₁ after bronchodilator', correct: true, rationale: 'Correct — significant reversibility supports asthma.' },
      { text: 'A fixed, irreversible obstruction', correct: false, rationale: 'That pattern suggests COPD rather than asthma.' },
      { text: 'A restrictive pattern with reduced FVC', correct: false, rationale: 'Restriction points away from an obstructive airway disease.' },
      { text: 'No change in FEV₁', correct: false, rationale: 'Reversibility is the key supportive feature.' },
    ],
    explanation:
      'Asthma is characterised by variable, reversible airflow obstruction. A ≥12% improvement in FEV₁ after bronchodilator is a supportive spirometric finding.',
    libraryRefs: [{ id: 'asthma-patho', title: 'Asthma · Pathophysiology & diagnosis' }],
    resourceRefs: ['BTS/SIGN Asthma guideline'],
  },
  {
    id: 'q-di-1',
    subjectId: 'pharm',
    topic: 'Diuretics',
    difficulty: 'Easy',
    vignette: 'A student is revising the sites of action of diuretics along the nephron.',
    stem: 'Which diuretic class acts on the Na-K-2Cl cotransporter?',
    options: [
      { text: 'Loop diuretics', correct: true, rationale: 'Correct — the thick ascending limb Na-K-2Cl cotransporter.' },
      { text: 'Thiazides', correct: false, rationale: 'Thiazides block Na-Cl in the distal convoluted tubule.' },
      { text: 'Spironolactone', correct: false, rationale: 'Spironolactone antagonises aldosterone in the collecting duct.' },
      { text: 'Acetazolamide', correct: false, rationale: 'A carbonic anhydrase inhibitor acting proximally.' },
    ],
    explanation:
      'Loop diuretics act on the Na-K-2Cl cotransporter in the thick ascending limb, making them the most potent class.',
    libraryRefs: [{ id: 'diur-sites', title: 'Diuretics · Sites of action & classes' }],
    resourceRefs: ['Rang & Dale Pharmacology · The kidney'],
  },
  {
    id: 'q-ab-1',
    subjectId: 'renal',
    topic: 'Acid–base balance',
    difficulty: 'Hard',
    vignette:
      'An arterial blood gas shows a low pH with a low bicarbonate. The calculated anion gap is normal.',
    stem: 'Which mechanism best explains this picture?',
    options: [
      { text: 'Loss of bicarbonate (e.g. diarrhoea or renal tubular acidosis)', correct: true, rationale: 'Correct — a normal-gap metabolic acidosis reflects bicarbonate loss.' },
      { text: 'Accumulation of an added acid (e.g. lactate)', correct: false, rationale: 'Added acid raises the anion gap.' },
      { text: 'Primary respiratory acidosis', correct: false, rationale: 'That would raise, not lower, bicarbonate as compensation.' },
      { text: 'Primary metabolic alkalosis', correct: false, rationale: 'Alkalosis raises pH; here the pH is low.' },
    ],
    explanation:
      'A metabolic acidosis with a normal anion gap points to bicarbonate loss rather than added acid — the anion gap is the key discriminator.',
    libraryRefs: [{ id: 'ab-approach', title: 'Acid–base · A structured approach' }],
    resourceRefs: ['Deranged Physiology · Acid–base'],
  },
  {
    id: 'q-cn-1',
    subjectId: 'neuro',
    topic: 'Cranial nerves',
    difficulty: 'Moderate',
    vignette:
      'A patient has facial weakness. On examination, the forehead is spared and can still wrinkle on the affected side.',
    stem: 'What does forehead sparing indicate?',
    options: [
      { text: 'An upper motor neurone lesion', correct: true, rationale: 'Correct — bilateral cortical input to the forehead spares it in UMN lesions.' },
      { text: 'A lower motor neurone (Bell) palsy', correct: false, rationale: 'An LMN lesion involves the whole half of the face, including the forehead.' },
      { text: 'A lesion of the trigeminal nerve', correct: false, rationale: 'CN V is sensory to the face and motor to mastication, not facial expression.' },
      { text: 'A neuromuscular junction disorder', correct: false, rationale: 'These cause fatigable weakness, not a forehead-sparing pattern.' },
    ],
    explanation:
      'The forehead receives bilateral upper motor neurone input, so it is spared in a UMN facial lesion but involved in an LMN (Bell) palsy — a classic localising sign.',
    libraryRefs: [{ id: 'cn-overview', title: 'Cranial nerves · Overview & common lesions' }],
    resourceRefs: ['Geeky Medics · Cranial nerve exam'],
  },
  {
    id: 'q-hf-2',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Moderate',
    vignette: 'Echocardiography shows a dilated, increasingly spherical left ventricle in a patient with chronic HFrEF.',
    stem: 'Which process best explains this change in chamber geometry?',
    options: [
      { text: 'Adverse ventricular remodelling', correct: true, rationale: 'Correct — hypertrophy, myocyte loss, and fibrosis alter ventricular geometry.' },
      { text: 'Acute pericardial constriction', correct: false, rationale: 'Constriction impairs filling but does not cause this chronic spherical remodelling.' },
      { text: 'Physiological athletic hypertrophy', correct: false, rationale: 'Athletic adaptation is proportionate and does not produce a failing spherical ventricle.' },
      { text: 'Isolated right ventricular infarction', correct: false, rationale: 'The finding described is a chronic left-ventricular process.' },
    ],
    explanation: 'Chronic neurohormonal activation drives myocyte hypertrophy, apoptosis, and interstitial fibrosis. The ventricle dilates and becomes spherical, reducing mechanical efficiency.',
    libraryRefs: [{ id: 'hf-patho', title: 'Heart failure · Pathophysiology' }],
    resourceRefs: ["Kumar & Clark's Clinical Medicine · Heart failure"],
  },
  {
    id: 'q-hf-3',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Easy',
    vignette: 'A patient is comfortable at rest but becomes breathless when climbing one flight of stairs.',
    stem: 'Which NYHA functional class best describes this limitation?',
    options: [
      { text: 'Class II', correct: true, rationale: 'Correct — ordinary activity causes symptoms, but the patient is comfortable at rest.' },
      { text: 'Class I', correct: false, rationale: 'Class I has no limitation with ordinary activity.' },
      { text: 'Class III', correct: false, rationale: 'Class III symptoms occur with less-than-ordinary activity.' },
      { text: 'Class IV', correct: false, rationale: 'Class IV includes symptoms at rest.' },
    ],
    explanation: 'NYHA II means slight limitation: the patient is comfortable at rest, while ordinary physical activity causes symptoms.',
    libraryRefs: [{ id: 'hf-class', title: 'Heart failure · Classification & staging' }],
    resourceRefs: ['ESC Guidelines · Heart failure classification'],
  },
  {
    id: 'q-as-2',
    subjectId: 'resp',
    topic: 'Asthma',
    difficulty: 'Moderate',
    vignette: 'A patient relies on a salbutamol inhaler most days and takes no inhaled corticosteroid.',
    stem: 'Why is SABA-only treatment discouraged?',
    options: [
      { text: 'It does not treat airway inflammation and is associated with exacerbation risk', correct: true, rationale: 'Correct — symptom relief alone leaves the inflammatory driver untreated.' },
      { text: 'It always causes irreversible bronchospasm', correct: false, rationale: 'SABA relieves bronchospasm; the problem is unopposed inflammation and risk.' },
      { text: 'It is ineffective as a bronchodilator', correct: false, rationale: 'SABA is an effective short-acting bronchodilator.' },
      { text: 'It can only be delivered intravenously', correct: false, rationale: 'SABA is routinely inhaled.' },
    ],
    explanation: 'Frequent SABA use relieves bronchospasm without treating airway inflammation. An ICS-containing strategy reduces severe exacerbation risk.',
    libraryRefs: [{ id: 'asthma-mgmt', title: 'Asthma · Stepwise management' }],
    resourceRefs: ['GINA strategy report'],
  },
]
