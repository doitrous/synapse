export interface LibBlock {
  type: 'p' | 'h' | 'list' | 'callout' | 'fact'
  text?: string
  items?: string[]
  title?: string
  tone?: 'accent' | 'warning'
  /** Stable evidence anchor and all claims/citations supporting this fact. */
  spanId?: string
  claimIds?: string[]
  citationIds?: string[]
}

export interface LinkedQuestion {
  id: string
  stem: string
}

export interface Subtopic {
  id: string
  title: string
  readingMin: number
  summary: string
  blocks: LibBlock[]
  keyPoints: string[]
  questions: LinkedQuestion[]
  resources: string[]
  /** Editorial timestamp for the reader byline. */
  updatedAt?: string
  universityIds?: string[]
  yearIds?: string[]
  moduleIds?: string[]
  relatedConceptIds?: string[]
  resourceIds?: string[]
  evidenceState?: string
  publicationGate?: string
}

export interface LibTopic {
  id: string
  title: string
  subjectId: string
  subtopics: Subtopic[]
}

export const libraryTopics: LibTopic[] = [
  {
    id: 'hf',
    title: 'Heart failure',
    subjectId: 'cvs',
    subtopics: [
      {
        id: 'hf-patho',
        title: 'Pathophysiology',
        readingMin: 9,
        summary:
          'Heart failure is a clinical syndrome in which the heart cannot deliver output sufficient for metabolic demand at normal filling pressures. Compensatory mechanisms restore output short-term but drive progressive decline.',
        blocks: [
          {
            type: 'p',
            text: 'Heart failure (HF) is not a diagnosis in itself but a syndrome that arises from any structural or functional impairment of ventricular filling or ejection. It is classified by ejection fraction into HF with reduced EF (HFrEF, ≤40%), mildly reduced EF (HFmrEF, 41–49%), and preserved EF (HFpEF, ≥50%).',
          },
          { type: 'h', text: 'The compensatory response' },
          {
            type: 'p',
            text: 'A fall in cardiac output is sensed by baroreceptors and the kidney, activating three overlapping systems that initially preserve perfusion but ultimately worsen the failing ventricle:',
          },
          {
            type: 'list',
            items: [
              'Sympathetic activation raises heart rate and contractility and causes vasoconstriction — but increases afterload and myocardial oxygen demand, and is directly toxic to myocytes.',
              'The renin–angiotensin–aldosterone system (RAAS) drives sodium and water retention and vasoconstriction, raising preload and afterload.',
              'Ventricular remodelling: myocyte hypertrophy, apoptosis, and interstitial fibrosis change chamber geometry from elliptical toward spherical, reducing efficiency.',
            ],
          },
          {
            type: 'callout',
            tone: 'accent',
            title: 'Why this matters for treatment',
            text: 'Prognostic HFrEF therapy targets exactly these maladaptive pathways: ACE inhibitors/ARBs and ARNIs block RAAS, beta-blockers oppose sympathetic drive, and MRAs block aldosterone. They work by interrupting compensation, not by stimulating the heart.',
          },
          { type: 'h', text: 'Frank–Starling and its limits' },
          {
            type: 'p',
            text: 'Increased preload normally augments stroke volume by stretching sarcomeres to their optimal overlap. In the failing heart the curve is flattened and shifted downward, so rising filling pressures buy little extra output while producing pulmonary and systemic congestion — the clinical picture of breathlessness and oedema.',
          },
        ],
        keyPoints: [
          'HF is a syndrome of inadequate output at normal filling pressures, classified by ejection fraction.',
          'Sympathetic, RAAS, and remodelling responses compensate acutely but drive progression.',
          'Disease-modifying drugs work by blocking compensation, not by inotropy.',
          'A flattened Frank–Starling curve explains why congestion rises with little output gain.',
        ],
        questions: [
          { id: 'q-hf-1', stem: 'Which mechanism explains the mortality benefit of beta-blockade in HFrEF?' },
          { id: 'q-hf-2', stem: 'A patient with HFrEF has a spherical, dilated ventricle. Which process is responsible?' },
        ],
        resources: ["Kumar & Clark's Clinical Medicine — Heart failure", 'NICE NG106 · Chronic heart failure'],
      },
      {
        id: 'hf-class',
        title: 'Classification & staging',
        readingMin: 6,
        summary:
          'HF is described by ejection fraction, by the NYHA functional class of symptoms, and by the ACC/AHA stages that capture risk and structural disease before symptoms appear.',
        blocks: [
          { type: 'h', text: 'NYHA functional classification' },
          {
            type: 'list',
            items: [
              'Class I — no limitation; ordinary activity causes no symptoms.',
              'Class II — slight limitation; comfortable at rest, ordinary activity causes symptoms.',
              'Class III — marked limitation; less-than-ordinary activity causes symptoms.',
              'Class IV — symptoms at rest.',
            ],
          },
          { type: 'h', text: 'ACC/AHA stages' },
          {
            type: 'p',
            text: 'Where NYHA describes current symptoms and can improve with treatment, the ACC/AHA stages (A at-risk, B structural disease, C symptomatic, D refractory) only progress — reinforcing prevention and early intervention.',
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Exam trap',
            text: 'NYHA class can move both ways with treatment; ACC/AHA stage never regresses. Do not equate a NYHA II patient with ACC/AHA stage B.',
          },
        ],
        keyPoints: [
          'NYHA classes symptoms (I–IV) and can improve with treatment.',
          'ACC/AHA stages (A–D) capture risk and structure and only progress.',
          'Ejection fraction defines HFrEF/HFmrEF/HFpEF and guides which drugs have evidence.',
        ],
        questions: [
          { id: 'q-hf-3', stem: 'A patient comfortable at rest but breathless climbing one flight of stairs is which NYHA class?' },
        ],
        resources: ['ESC Guidelines · Heart failure classification'],
      },
      {
        id: 'hf-mgmt',
        title: 'Pharmacological management',
        readingMin: 7,
        summary:
          'HFrEF has four pillars of prognostic therapy started and up-titrated together; diuretics relieve congestion but do not improve survival.',
        blocks: [
          { type: 'h', text: 'The four pillars (HFrEF)' },
          {
            type: 'list',
            items: [
              'ARNI (or ACE inhibitor/ARB) — RAAS blockade with additional neprilysin inhibition.',
              'Beta-blocker — bisoprolol, carvedilol, or nebivolol, started low and titrated slowly.',
              'MRA — spironolactone or eplerenone; monitor potassium and renal function.',
              'SGLT2 inhibitor — dapagliflozin or empagliflozin, benefit independent of diabetes.',
            ],
          },
          {
            type: 'p',
            text: 'Loop diuretics (e.g. furosemide) are titrated to symptoms and congestion. They are symptomatic therapy — essential for comfort but with no mortality benefit — which is a common point of confusion.',
          },
          {
            type: 'callout',
            tone: 'accent',
            title: 'Sequencing',
            text: 'Modern practice favours starting all four pillars early at low dose and up-titrating, rather than maximising one drug before adding the next.',
          },
        ],
        keyPoints: [
          'Four pillars: ARNI/ACEi, beta-blocker, MRA, SGLT2 inhibitor.',
          'Start low, titrate together; monitor K⁺, renal function, and blood pressure.',
          'Diuretics relieve congestion but do not prolong survival.',
        ],
        questions: [
          { id: 'q-hf-4', stem: 'Which HFrEF drug class relieves symptoms but has no proven mortality benefit?' },
        ],
        resources: ['NICE NG106 · Chronic heart failure', 'BNF · Loop diuretics'],
      },
    ],
  },
  {
    id: 'acs',
    title: 'Acute coronary syndromes',
    subjectId: 'cvs',
    subtopics: [
      {
        id: 'acs-dx',
        title: 'Presentation & diagnosis',
        readingMin: 8,
        summary:
          'ACS spans unstable angina, NSTEMI, and STEMI, distinguished by the ECG and troponin. Rapid recognition changes outcomes.',
        blocks: [
          {
            type: 'p',
            text: 'Acute coronary syndromes result from plaque rupture and thrombus formation in a coronary artery. The clinical spectrum is separated by two investigations: the 12-lead ECG and serial troponin.',
          },
          {
            type: 'list',
            items: [
              'STEMI — ST elevation (or new LBBB) reflecting complete occlusion; needs immediate reperfusion.',
              'NSTEMI — ischaemic symptoms with a troponin rise but without ST elevation.',
              'Unstable angina — ischaemic symptoms without troponin rise; increasingly rare with sensitive assays.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Atypical presentations',
            text: 'Women, older adults, and people with diabetes may present without classic chest pain — with breathlessness, fatigue, or epigastric discomfort. Maintain a low threshold for an ECG.',
          },
        ],
        keyPoints: [
          'ECG + troponin separate STEMI, NSTEMI, and unstable angina.',
          'STEMI = complete occlusion → immediate reperfusion.',
          'Atypical presentations are common and easily missed.',
        ],
        questions: [
          { id: 'q-acs-1', stem: 'A patient has ischaemic chest pain, a normal ECG, and a rising troponin. What is the diagnosis?' },
        ],
        resources: ['Oxford Handbook of Clinical Medicine · ACS', 'ECG library · ST-segment changes'],
      },
      {
        id: 'acs-mgmt',
        title: 'Initial management',
        readingMin: 6,
        summary:
          'Early management combines antiplatelets, anticoagulation, and — for STEMI — timely reperfusion by primary PCI.',
        blocks: [
          {
            type: 'p',
            text: 'Immediate treatment relieves ischaemia and prevents thrombus propagation while arranging definitive reperfusion. Dual antiplatelet therapy and anticoagulation are started early; oxygen is given only if the patient is hypoxaemic.',
          },
          {
            type: 'list',
            items: [
              'Aspirin plus a second antiplatelet (e.g. ticagrelor).',
              'Anticoagulation (e.g. fondaparinux or heparin).',
              'STEMI: primary PCI within 120 minutes, or thrombolysis if PCI is not available in time.',
              'Analgesia and treat complications (arrhythmia, failure).',
            ],
          },
        ],
        keyPoints: [
          'Dual antiplatelet + anticoagulation early.',
          'STEMI → primary PCI within 120 minutes.',
          'Give oxygen only for hypoxaemia.',
        ],
        questions: [
          { id: 'q-acs-2', stem: 'What is the target time for primary PCI in STEMI?' },
        ],
        resources: ['NICE NG185 · Acute coronary syndromes'],
      },
    ],
  },
  {
    id: 'asthma',
    title: 'Asthma',
    subjectId: 'resp',
    subtopics: [
      {
        id: 'asthma-patho',
        title: 'Pathophysiology & diagnosis',
        readingMin: 7,
        summary:
          'Asthma is a chronic inflammatory airway disease with reversible obstruction, airway hyper-responsiveness, and variable symptoms.',
        blocks: [
          {
            type: 'p',
            text: 'Chronic airway inflammation — predominantly eosinophilic and driven by type-2 cytokines in many patients — produces bronchial hyper-responsiveness. The result is variable, reversible airflow obstruction with wheeze, cough, and breathlessness that vary over time and with triggers.',
          },
          {
            type: 'list',
            items: [
              'Diurnal variation with morning dipping of peak flow.',
              'Reversibility: ≥12% improvement in FEV₁ after bronchodilator.',
              'Supportive: raised FeNO, eosinophilia, atopy.',
            ],
          },
        ],
        keyPoints: [
          'Reversible obstruction + airway hyper-responsiveness + inflammation.',
          'Diagnosis is clinical, supported by spirometry with reversibility and FeNO.',
          'Symptoms are variable and trigger-related.',
        ],
        questions: [
          { id: 'q-as-1', stem: 'What spirometric change after bronchodilator supports asthma?' },
        ],
        resources: ['BTS/SIGN Asthma guideline', 'GINA strategy report'],
      },
      {
        id: 'asthma-mgmt',
        title: 'Stepwise management',
        readingMin: 6,
        summary:
          'Modern guidelines centre inhaled corticosteroids and increasingly ICS-formoterol as reliever, stepping up by control.',
        blocks: [
          {
            type: 'p',
            text: 'Management is a stepwise ladder titrated to symptom control and exacerbation risk. The key modern shift is away from short-acting beta-agonist (SABA)-only reliever therapy toward anti-inflammatory reliever regimens.',
          },
          {
            type: 'callout',
            tone: 'accent',
            title: 'High-yield',
            text: 'Frequent SABA use without an inhaled corticosteroid is a red flag for poor control and exacerbation risk.',
          },
        ],
        keyPoints: [
          'Inhaled corticosteroids are the controller foundation.',
          'Step up or down by symptom control and exacerbations.',
          'SABA-only treatment is no longer recommended.',
        ],
        questions: [
          { id: 'q-as-2', stem: 'Why is SABA-only reliever therapy discouraged in asthma?' },
        ],
        resources: ['GINA strategy report'],
      },
    ],
  },
  {
    id: 'acidbase',
    title: 'Acid–base balance',
    subjectId: 'renal',
    subtopics: [
      {
        id: 'ab-approach',
        title: 'A structured approach to interpretation',
        readingMin: 8,
        summary:
          'A reproducible five-step approach turns an arterial blood gas from intimidating to systematic: pH, then the primary disorder, compensation, anion gap, and the clinical fit.',
        blocks: [
          { type: 'h', text: 'The five steps' },
          {
            type: 'list',
            items: [
              'Look at the pH: acidaemia (<7.35) or alkalaemia (>7.45)?',
              'Identify the primary driver: respiratory (CO₂) or metabolic (HCO₃⁻)?',
              'Assess compensation and whether it is appropriate.',
              'Calculate the anion gap in a metabolic acidosis.',
              'Interpret in the clinical context — numbers never stand alone.',
            ],
          },
          {
            type: 'callout',
            tone: 'accent',
            title: 'Anion gap',
            text: 'A raised anion gap metabolic acidosis (MUDPILES-type causes) points to added acid; a normal gap points to bicarbonate loss.',
          },
        ],
        keyPoints: [
          'Read pH first, then find the primary CO₂ or HCO₃⁻ disorder.',
          'Check whether compensation is appropriate — over-compensation implies a second disorder.',
          'Always calculate the anion gap in metabolic acidosis.',
        ],
        questions: [
          { id: 'q-ab-1', stem: 'A low pH with low bicarbonate and a normal anion gap suggests what mechanism?' },
        ],
        resources: ['Deranged Physiology · Acid–base', 'Oxford Handbook · ABG interpretation'],
      },
    ],
  },
  {
    id: 'diuretics',
    title: 'Diuretics',
    subjectId: 'pharm',
    subtopics: [
      {
        id: 'diur-sites',
        title: 'Sites of action & classes',
        readingMin: 6,
        summary:
          'Diuretic classes are best learned by where they act along the nephron, which predicts both their potency and their characteristic side effects.',
        blocks: [
          {
            type: 'list',
            items: [
              'Loop diuretics — thick ascending limb; block Na-K-2Cl; most potent; risk hypokalaemia and ototoxicity.',
              'Thiazides — distal convoluted tubule; block Na-Cl; useful in hypertension; risk hyponatraemia and hyperglycaemia.',
              'Potassium-sparing / MRA — collecting duct; spironolactone blocks aldosterone; risk hyperkalaemia.',
              'Carbonic anhydrase inhibitors — proximal tubule; weak; niche uses.',
            ],
          },
          {
            type: 'callout',
            tone: 'warning',
            title: 'Link to heart failure',
            text: 'Loop diuretics relieve congestion; MRAs are one of the four prognostic pillars of HFrEF. Same organ, very different roles.',
          },
        ],
        keyPoints: [
          'Learn diuretics by nephron site of action.',
          'Loop = most potent; thiazide = hypertension workhorse; MRA = potassium-sparing.',
          'Side effects follow directly from the ion handling at each site.',
        ],
        questions: [
          { id: 'q-di-1', stem: 'Which diuretic class acts on the Na-K-2Cl cotransporter?' },
        ],
        resources: ['BNF · Diuretics', 'Rang & Dale Pharmacology · The kidney'],
      },
    ],
  },
  {
    id: 'cranial-nerves',
    title: 'Cranial nerves',
    subjectId: 'neuro',
    subtopics: [
      {
        id: 'cn-overview',
        title: 'Overview & common lesions',
        readingMin: 7,
        summary:
          'The twelve cranial nerves are a high-yield map of the brainstem. Learn the function, the test, and the sign of the common lesion for each.',
        blocks: [
          {
            type: 'p',
            text: 'Cranial nerve examination localises lesions with precision. For each nerve, anchor three things: what it does, how you test it, and what the classic lesion looks like.',
          },
          {
            type: 'list',
            items: [
              'CN III palsy — down-and-out eye, ptosis, and a dilated pupil if surgical (compressive).',
              'CN VII (facial) — forehead spared in an upper motor neurone lesion, involved in a lower motor neurone (Bell) palsy.',
              'CN X — uvula deviates away from the side of the lesion.',
            ],
          },
        ],
        keyPoints: [
          'For each nerve: function, test, classic lesion.',
          'Forehead sparing separates UMN from LMN facial palsy.',
          'A dilated pupil in a third-nerve palsy suggests a compressive cause.',
        ],
        questions: [
          { id: 'q-cn-1', stem: 'In a facial nerve palsy, what feature suggests an upper motor neurone lesion?' },
        ],
        resources: ['Neuroanatomy through Clinical Cases', 'Geeky Medics · Cranial nerve exam'],
      },
    ],
  },
]

/** Flat lookup of all subtopics for search and default selection. */
export const allSubtopics = libraryTopics.flatMap((t) =>
  t.subtopics.map((s) => ({ ...s, topicId: t.id, topicTitle: t.title, subjectId: t.subjectId })),
)

const UPDATED: Record<string, string> = {
  'hf-patho': '2026-11-06T16:20:00',
  'hf-class': '2026-11-04T11:10:00',
  'hf-mgmt': '2026-11-06T09:45:00',
  'acs-dx': '2026-11-05T14:30:00',
  'acs-mgmt': '2026-11-03T17:00:00',
  'asthma-patho': '2026-10-28T12:15:00',
  'asthma-mgmt': '2026-11-02T10:05:00',
  'ab-approach': '2026-11-06T13:40:00',
  'diur-sites': '2026-11-01T15:25:00',
  'cn-overview': '2026-10-30T08:50:00',
}

export function updatedAtFor(id: string): Date {
  return new Date(UPDATED[id] ?? '2026-11-06T12:00:00')
}
