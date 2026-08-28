/* Runnable detail content for the Practical surface, keyed by item id with
   sensible generic fallbacks so every item is playable. */

/* ---- OSCE mark schemes ------------------------------------------------- */

export interface MarkItem {
  id: string
  text: string
}
export interface MarkSection {
  id: string
  title: string
  marks: number
  items: MarkItem[]
}
export interface OsceDetail {
  scenario: string
  markScheme: MarkItem[]
  markSections?: MarkSection[]
  actorBrief?: {
    opening: string
    identity: string
    prompts: { label: string; response: string }[]
    examinerNote?: string
    sections?: { id: string; label: string; content: string; group?: string }[]
    flags?: string[]
  }
  references?: string[]
}

const OSCE: Record<string, OsceDetail> = {
  'os-cvs': {
    scenario:
      'Mr Adeyi, a 62-year-old man, has been referred with breathlessness. Please perform a cardiovascular examination and present your findings.',
    markScheme: [
      { id: 'c1', text: 'Introduces self, confirms patient identity, and gains consent' },
      { id: 'c2', text: 'Positions the patient at 45° and exposes the chest appropriately' },
      { id: 'c3', text: 'General inspection: comfort, breathlessness, peripheral cyanosis' },
      { id: 'c4', text: 'Examines the hands: temperature, clubbing, splinter haemorrhages' },
      { id: 'c5', text: 'Assesses the radial pulse (rate, rhythm) and checks for a collapsing pulse' },
      { id: 'c6', text: 'Comments on the blood pressure' },
      { id: 'c7', text: 'Assesses the jugular venous pressure' },
      { id: 'c8', text: 'Examines the face and eyes: conjunctival pallor, central cyanosis' },
      { id: 'c9', text: 'Palpates the praecordium: apex beat, heaves, thrills' },
      { id: 'c10', text: 'Auscultates the four valve areas and the carotids' },
      { id: 'c11', text: 'Checks for sacral and peripheral oedema' },
      { id: 'c12', text: 'Thanks the patient, summarises, and suggests investigations' },
    ],
  },
  'os-hx': {
    scenario:
      'Ms Rowe, 55, presents to the emergency department with chest pain. Please take a focused history.',
    markScheme: [
      { id: 'h1', text: 'Opens the consultation and establishes rapport' },
      { id: 'h2', text: 'Explores the presenting complaint fully (SOCRATES)' },
      { id: 'h3', text: 'Asks about associated symptoms (breathlessness, sweating, nausea)' },
      { id: 'h4', text: 'Screens cardiovascular risk factors' },
      { id: 'h5', text: 'Takes past medical, drug, and allergy history' },
      { id: 'h6', text: 'Takes family and social history, including smoking' },
      { id: 'h7', text: "Explores the patient's ideas, concerns, and expectations" },
      { id: 'h8', text: 'Summarises back to the patient and closes appropriately' },
    ],
    actorBrief: {
      opening: "It came on when I was carrying shopping up the stairs. It's still there.",
      identity: 'You are Daniel Rossi, 55, a self-employed builder. Central chest tightness began four hours ago and radiates into your left arm. You feel sick and clammy.',
      prompts: [
        { label: 'Character', response: 'Like someone standing on it. Heavy, not sharp.' },
        { label: 'Radiation', response: 'Down my left arm, and a bit into my jaw.' },
        { label: 'Exercise tolerance', response: "I've been getting out of breath on the stairs for maybe two months." },
        { label: 'Similar before', response: 'Twice last month, but it went off when I stopped.' },
        { label: 'Ideas and concerns', response: "I think it's my heart. My dad went at 58 and I'm 55." },
      ],
      examinerNote: 'If the candidate does not ask an open question in the first ninety seconds, become briefer and answer only what is asked.',
      sections: [
        { id: 'who', label: 'Who you are', content: 'You are Daniel Rossi, 55, a self-employed builder. Central chest tightness began four hours ago and radiates into your left arm. You feel sick and clammy.' },
        { id: 'asked', label: 'Only if asked', content: 'Do not volunteer the following details. Give each answer only when the candidate asks a relevant open or focused question.', group: 'Only if asked' },
        { id: 'character', label: 'Character', content: 'Like someone standing on it. Heavy, not sharp.', group: 'Only if asked' },
        { id: 'radiation', label: 'Radiation', content: 'Down my left arm, and a bit into my jaw.', group: 'Only if asked' },
        { id: 'exercise', label: 'Exercise tolerance', content: "I've been getting out of breath on the stairs for maybe two months.", group: 'Only if asked' },
        { id: 'similar', label: 'Similar before', content: 'Twice last month, but it went off when I stopped.', group: 'Only if asked' },
        { id: 'concerns', label: 'Ideas and concerns', content: "I think it's my heart. My dad went at 58 and I'm 55.", group: 'Only if asked' },
      ],
      flags: [
        'If the candidate does not ask an open question in the first ninety seconds, become briefer and answer only what is asked.',
        'If the candidate lectures without checking understanding, become quieter and agree without commitment.',
      ],
    },
    markSections: [
      { id: 'opening', title: 'Opening and structure', marks: 15, items: [
        { id: 'h1', text: 'Introduces self and role, confirms identity' },
        { id: 'h2', text: 'Opens with an open question and does not interrupt' },
        { id: 'h3', text: 'Signposts the structure of the consultation' },
      ] },
      { id: 'pain', title: 'Pain characterisation', marks: 25, items: [
        { id: 'h4', text: 'Site, onset, character, and radiation' },
        { id: 'h5', text: 'Associated symptoms — sweating, nausea, breathlessness' },
        { id: 'h6', text: 'Timing, exacerbating and relieving factors, severity' },
        { id: 'h7', text: 'Establishes this is a crescendo pattern over two months' },
      ] },
      { id: 'risk', title: 'Risk and background', marks: 20, items: [
        { id: 'h8', text: 'Smoking quantified in pack-years' },
        { id: 'h9', text: 'Family history with age of event' },
        { id: 'h10', text: 'Asks about diabetes, hypertension, and lipids' },
        { id: 'h11', text: 'Drug history and allergies' },
      ] },
      { id: 'ice', title: 'Ideas, concerns, expectations', marks: 15, items: [
        { id: 'h12', text: 'Elicits his concern about his father' },
        { id: 'h13', text: 'Responds to it rather than moving straight on' },
      ] },
      { id: 'present', title: 'Presentation and differential', marks: 25, items: [
        { id: 'h14', text: 'Concise structured summary' },
        { id: 'h15', text: 'Acute coronary syndrome first, with reasoning' },
        { id: 'h16', text: 'Names at least two alternatives — dissection, pericarditis, oesophageal' },
        { id: 'h17', text: 'States the immediate investigation: ECG and troponin' },
      ] },
    ],
    references: ['Oxford Handbook · Chest pain', 'NICE NG185 · Acute coronary syndromes'],
  },
}

/**
 * The demo station's content, or null when there is none.
 *
 * It used to fall back to `GENERIC_OSCE`: a generic eight-point mark scheme and
 * an invented actor brief, returned for every station an admin authored. A
 * student running a real station was marked against a checklist nobody wrote
 * for it. An item with no content now says so.
 */
export function getOsceDetail(id: string): OsceDetail | null {
  return OSCE[id] ?? null
}

/* ---- Clinical case stages --------------------------------------------- */

export interface CaseStage {
  title: string
  context?: string
  question?: string
  prompt: string
  answer: string
  options?: string[]
  optionExplanations?: string[]
  correctIndex?: number
}
// `Vitals` is the authoring model's type (it also rides on imported cases), so
// it lives in contentControl and is re-exported here for the seeded content and
// the runner that already import it from this module.
export type { Vitals } from '@/data/contentControl'
import type { Vitals } from '@/data/contentControl'

export interface CaseDetail {
  stages: CaseStage[]
  vitals?: Vitals
  debrief?: string
  references?: string[]
}

const CASES: Record<string, CaseDetail> = {
  'cc-postpartum': {
    stages: [
      {
        title: 'Immediate action',
        context: 'You are the on-call foundation doctor. A 34-year-old woman, six days after a caesarean section, has become acutely breathless. Respiratory rate 30/min, saturations 91% on air, heart rate 118/min, blood pressure 108/68 mmHg, temperature 37.4 °C.',
        question: 'What is your first action?',
        prompt: 'What is your first action?',
        options: ['Give oxygen, begin ABCDE, and call for senior help', 'Wait for a chest X-ray before treating', 'Give oral antibiotics and review tomorrow', 'Arrange outpatient spirometry'],
        optionExplanations: ['This treats immediate hypoxia while maintaining a broad, safe diagnostic approach.', 'Imaging must not delay oxygen, monitoring, escalation, and initial stabilisation.', 'This patient is hypoxic and tachycardic with a time-critical differential; outpatient treatment is unsafe.', 'Spirometry has no role in the immediate assessment of acute post-partum hypoxia.'],
        correctIndex: 0,
        answer: 'Treat the hypoxia while keeping the diagnosis open: oxygen, ABCDE assessment, monitoring, IV access, and urgent senior help.',
      },
      {
        title: 'Working diagnosis',
        prompt: 'She is tachycardic with pleuritic pain and unilateral calf swelling. What is your working diagnosis and next step?',
        options: ['Pulmonary embolism; calculate risk and arrange urgent imaging', 'Pulmonary oedema; discharge after one diuretic dose', 'Pneumonia; no further investigation', 'Panic attack; reassure only'],
        correctIndex: 0,
        answer: 'Pulmonary embolism is the leading diagnosis. Continue stabilisation, take bloods and ECG, and arrange urgent definitive imaging according to local pregnancy/post-partum guidance.',
      },
      {
        title: 'Anticoagulation',
        prompt: 'Imaging confirms a pulmonary embolism. Which anticoagulation is most appropriate while she is breastfeeding?',
        options: ['Low-molecular-weight heparin', 'A direct oral anticoagulant without checking guidance', 'Aspirin alone', 'No anticoagulation once oxygen improves'],
        correctIndex: 0,
        answer: 'Low-molecular-weight heparin is appropriate and compatible with breastfeeding; treatment duration and transition should follow specialist guidance.',
      },
    ],
    vitals: { hr: 118, bp: '108/68', rr: 30, spo2: 91, temp: 37.4, abnormal: ['hr', 'rr', 'spo2'], note: 'room air' },
    debrief: 'Post-partum breathlessness has a short, dangerous differential. The case rewards treating the hypoxia while the diagnosis is still open, then recognising venous thromboembolism and choosing safe anticoagulation.',
    references: ['RCOG · Thromboembolic disease in pregnancy and the puerperium', 'NICE · Venous thromboembolic diseases'],
  },
  'cc-breath': {
    stages: [
      { title: 'Presentation', prompt: 'A 68-year-old man presents with 3 weeks of progressive breathlessness on exertion and swollen ankles. What is your initial approach?', answer: 'Assess with ABCDE and establish haemodynamic stability, then take a focused history and examination. Exertional dyspnoea with peripheral oedema places heart failure high on the differential.' },
      { title: 'History', prompt: 'What key features would you ask about?', answer: 'Orthopnoea and paroxysmal nocturnal dyspnoea, exercise tolerance, chest pain and palpitations; risk factors such as hypertension, ischaemic heart disease and diabetes; drug and alcohol history.' },
      { title: 'Examination', prompt: 'Which findings would support heart failure?', answer: 'Raised JVP, a displaced apex beat, a third heart sound (S3), bibasal crepitations, and pitting peripheral oedema.' },
      { title: 'Investigations', prompt: 'Which investigations would you request first?', answer: 'ECG, chest X-ray, bloods including NT-proBNP, and an echocardiogram to assess ejection fraction. NT-proBNP guides how urgently the echo is needed.' },
      { title: 'Diagnosis', prompt: 'The echocardiogram shows an ejection fraction of 30%. What is the diagnosis?', answer: 'Heart failure with reduced ejection fraction (HFrEF).' },
      { title: 'Management', prompt: 'Outline your management.', answer: 'A loop diuretic for congestion, then start the four prognostic pillars — ARNI/ACE inhibitor, beta-blocker, MRA, and SGLT2 inhibitor — titrated with monitoring of U&Es and blood pressure. Treat the underlying cause and modifiable risk factors.' },
    ],
    vitals: { hr: 94, bp: '148/90', rr: 20, spo2: 94, temp: 36.8, abnormal: ['spo2', 'bp'], note: 'room air' },
    debrief: 'Progressive breathlessness with oedema should trigger a structured assessment for heart failure, confirmation of ventricular function, and treatment that separates symptom relief from prognostic therapy.',
    references: ['NICE NG106 · Chronic heart failure', 'ESC · Heart failure guideline'],
  },
}

/** The demo case's stages, or null when there are none. See `getOsceDetail`. */
export function getCaseDetail(id: string): CaseDetail | null {
  return CASES[id] ?? null
}

/* ---- Lab & imaging interpretation ------------------------------------- */

export interface LabQ {
  stem: string
  context?: string
  question?: string
  options: { text: string; correct: boolean; explanation?: string }[]
  explanation: string
}
export interface LabDetail {
  questions: LabQ[]
}

const LAB: Record<string, LabDetail> = {
  'li-abg': {
    questions: [
      {
        stem: 'pH 7.28 · PaCO₂ 3.5 kPa · HCO₃⁻ 12 mmol/L. What is the primary disorder?',
        options: [
          { text: 'Metabolic acidosis', correct: true },
          { text: 'Respiratory acidosis', correct: false },
          { text: 'Metabolic alkalosis', correct: false },
          { text: 'Respiratory alkalosis', correct: false },
        ],
        explanation: 'A low pH with a low bicarbonate is a metabolic acidosis; the low CO₂ is appropriate respiratory compensation.',
      },
      {
        stem: 'The same patient: Na⁺ 140 · Cl⁻ 100 · HCO₃⁻ 12. Is the anion gap raised?',
        options: [
          { text: 'Yes — the anion gap is raised', correct: true },
          { text: 'No — the anion gap is normal', correct: false },
          { text: 'It cannot be calculated', correct: false },
        ],
        explanation: 'Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻) = 140 − 112 = 28, which is raised — pointing to an added acid such as lactate or ketones.',
      },
      {
        stem: 'pH 7.50 · PaCO₂ 3.2 kPa · HCO₃⁻ 24 mmol/L. What is the disorder?',
        options: [
          { text: 'Respiratory alkalosis', correct: true },
          { text: 'Metabolic alkalosis', correct: false },
          { text: 'Respiratory acidosis', correct: false },
        ],
        explanation: 'A high pH with a low CO₂ and a normal bicarbonate is an acute respiratory alkalosis — for example from hyperventilation.',
      },
    ],
  },
  'li-ecg': {
    questions: [
      {
        stem: 'An ECG shows ST elevation in leads II, III and aVF. Which territory is affected?',
        options: [
          { text: 'Inferior', correct: true },
          { text: 'Anterior', correct: false },
          { text: 'Lateral', correct: false },
          { text: 'Posterior', correct: false },
        ],
        explanation: 'Leads II, III and aVF look at the inferior surface — usually the territory of the right coronary artery.',
      },
      {
        stem: 'Which rhythm shows an irregularly irregular pulse with no discernible P waves?',
        options: [
          { text: 'Atrial fibrillation', correct: true },
          { text: 'Atrial flutter', correct: false },
          { text: 'Sinus tachycardia', correct: false },
        ],
        explanation: 'Atrial fibrillation is irregularly irregular with absent P waves and a chaotic baseline.',
      },
    ],
  },
}

/** The demo set's questions, or null when there are none. See `getOsceDetail`. */
export function getLabDetail(id: string): LabDetail | null {
  return LAB[id] ?? null
}
