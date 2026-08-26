/**
 * The construction economy behind Build Maristanas.
 *
 * A credit shown here must come from something the learning product can
 * explain: an active minute on a study surface, a server-marked answer, or the
 * score of an assessment-length question session. Decorative "XP" that cannot
 * be traced back to learning never enters this model.
 */

export const MARISTANA_CONFIG_KEY = 'synapse-maristana-config-v1'
export const MARISTANA_ONBOARDING_KEY = 'synapse.maristanas.onboarding.v1'
export const MARISTANA_STEPS = 25

export function maristanaStageAsset(stage: number): string {
  return `/maristana/stages/stage-${String(Math.max(1, stage)).padStart(2, '0')}.webp`
}

export interface MaristanaOnboardingState {
  version: 1
  completed: boolean
}

export const DEFAULT_MARISTANA_ONBOARDING: MaristanaOnboardingState = {
  version: 1,
  completed: false,
}

export interface MaristanaMilestone {
  stage: number
  title: string
  description: string
}

/**
 * The six moments students can recognise in the commissioned construction
 * sequence. They are architectural milestones, not invented XP ranks, so an
 * achievement always describes a visible change to the hospital itself.
 */
export const MARISTANA_MILESTONES: readonly MaristanaMilestone[] = [
  { stage: 1, title: 'Site prepared', description: 'The perimeter and first foundation are in place.' },
  { stage: 5, title: 'Courtyard planned', description: 'The central court and its paths have been set out.' },
  { stage: 10, title: 'Arcades raised', description: 'The first clinical wings now enclose the court.' },
  { stage: 15, title: 'Healing hall opened', description: 'The central hall joins both sides of the Maristana.' },
  { stage: 20, title: 'Dome crowned', description: 'The hospital has received its defining crown.' },
  { stage: 25, title: 'Maristana complete', description: 'The hospital and its gardens are ready to serve.' },
] as const

/**
 * The visible construction sequence in the commissioned 25-frame model.
 * These labels stay architectural and concrete so the roadmap describes the
 * part the student is actually working toward, not an abstract game level.
 */
export const MARISTANA_BUILD_STEPS = [
  'Perimeter set',
  'Foundation bed',
  'Courtyard traced',
  'Main axis laid',
  'Entry steps formed',
  'West wing begun',
  'West arcade raised',
  'Front wall enclosed',
  'East wing framed',
  'Twin arcades joined',
  'Courtyard wings opened',
  'Central hall planned',
  'Healing hall raised',
  'Main portal framed',
  'Grand portal finished',
  'Rooflines secured',
  'Entrance masonry set',
  'Dome ribs assembled',
  'Dome crowned',
  'Main doors fitted',
  'Fountain opened',
  'Gardens planted',
  'Cypress court completed',
  'Tilework finished',
  'Maristana complete',
] as const

export interface MaristanaConfig {
  version: 1
  enabled: boolean
  creditsPerStep: number
  creditsPerStudyMinute: number
  creditsPerQuestion: number
  creditsPerCorrectAnswer: number
  assessmentMinimumQuestions: number
  creditsPerAssessmentPercent: number
}

export const DEFAULT_MARISTANA_CONFIG: MaristanaConfig = {
  version: 1,
  enabled: true,
  creditsPerStep: 100,
  creditsPerStudyMinute: 2,
  creditsPerQuestion: 2,
  creditsPerCorrectAnswer: 10,
  assessmentMinimumQuestions: 20,
  creditsPerAssessmentPercent: 1.5,
}

export interface MaristanaCreditBreakdown {
  study: number
  questions: number
  accuracy: number
  assessments: number
}

export interface MaristanaHospital {
  slot: number
  name: string
  stage: number
  completed: boolean
  active: boolean
  creditsInHospital: number
  creditsToNextStep: number
  stepProgress: number
}

export interface MaristanaRecentActivity {
  id: string
  kind: 'study' | 'question' | 'assessment' | 'milestone'
  label: string
  detail: string
  credits: number
  at: string
}

export interface MaristanaOverview {
  enabled: boolean
  config: MaristanaConfig
  totalCredits: number
  completedHospitals: number
  studyMinutes: number
  questionsAnswered: number
  correctAnswers: number
  assessmentSessions: number
  averageAssessmentScore: number | null
  breakdown: MaristanaCreditBreakdown
  hospitals: MaristanaHospital[]
  recentActivity: MaristanaRecentActivity[]
  thisWeek: { studyMinutes: number; questionsAnswered: number; credits: number }
}

export interface MaristanaProgressDelta {
  earnedCredits: number
  stepsPlaced: number
  hospitalName: string
  stage: number
  nextStage: number
  creditsToNextStep: number
  stepProgress: number
  hospitalCompleted: boolean
}

/** Build the small, global progress acknowledgement from two server ledgers. */
export function maristanaProgressDelta(previous: MaristanaOverview, next: MaristanaOverview): MaristanaProgressDelta | null {
  const earnedCredits = Math.round(next.totalCredits - previous.totalCredits)
  if (!next.enabled || earnedCredits <= 0) return null
  const hospital = next.hospitals.find((candidate) => candidate.active) ?? next.hospitals.at(-1)
  if (!hospital) return null
  const stepCost = Math.max(1, next.config.creditsPerStep)
  const stepsPlaced = Math.max(0, Math.floor(next.totalCredits / stepCost) - Math.floor(previous.totalCredits / stepCost))
  return {
    earnedCredits,
    stepsPlaced,
    hospitalName: hospital.name,
    stage: hospital.stage,
    nextStage: Math.min(MARISTANA_STEPS, hospital.stage + (hospital.completed ? 0 : 1)),
    creditsToNextStep: hospital.creditsToNextStep,
    stepProgress: hospital.completed ? 1 : hospital.stepProgress,
    hospitalCompleted: next.completedHospitals > previous.completedHospitals,
  }
}

export interface MaristanaEvidence {
  studyMinutes: number
  questionsAnswered: number
  correctAnswers: number
  assessmentScores: number[]
}

export function normaliseMaristanaConfig(value: unknown): MaristanaConfig {
  const input = value && typeof value === 'object' ? value as Partial<MaristanaConfig> : {}
  const bounded = (candidate: unknown, fallback: number, min: number, max: number) => {
    const parsed = Number(candidate)
    return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback
  }
  return {
    version: 1,
    enabled: input.enabled !== false,
    creditsPerStep: bounded(input.creditsPerStep, DEFAULT_MARISTANA_CONFIG.creditsPerStep, 20, 10_000),
    creditsPerStudyMinute: bounded(input.creditsPerStudyMinute, DEFAULT_MARISTANA_CONFIG.creditsPerStudyMinute, 0, 100),
    creditsPerQuestion: bounded(input.creditsPerQuestion, DEFAULT_MARISTANA_CONFIG.creditsPerQuestion, 0, 500),
    creditsPerCorrectAnswer: bounded(input.creditsPerCorrectAnswer, DEFAULT_MARISTANA_CONFIG.creditsPerCorrectAnswer, 0, 1_000),
    assessmentMinimumQuestions: Math.round(bounded(input.assessmentMinimumQuestions, DEFAULT_MARISTANA_CONFIG.assessmentMinimumQuestions, 5, 200)),
    creditsPerAssessmentPercent: bounded(input.creditsPerAssessmentPercent, DEFAULT_MARISTANA_CONFIG.creditsPerAssessmentPercent, 0, 100),
  }
}

export function maristanaCredits(evidence: MaristanaEvidence, config = DEFAULT_MARISTANA_CONFIG) {
  const safe = normaliseMaristanaConfig(config)
  const breakdown: MaristanaCreditBreakdown = {
    study: Math.round(Math.max(0, evidence.studyMinutes) * safe.creditsPerStudyMinute),
    questions: Math.round(Math.max(0, evidence.questionsAnswered) * safe.creditsPerQuestion),
    accuracy: Math.round(Math.max(0, Math.min(evidence.questionsAnswered, evidence.correctAnswers)) * safe.creditsPerCorrectAnswer),
    assessments: Math.round(evidence.assessmentScores.reduce(
      (total, score) => total + Math.max(0, Math.min(100, score)) * safe.creditsPerAssessmentPercent,
      0,
    )),
  }
  return {
    breakdown,
    total: breakdown.study + breakdown.questions + breakdown.accuracy + breakdown.assessments,
  }
}

export function maristanaHospitals(totalCredits: number, config = DEFAULT_MARISTANA_CONFIG, names: Record<number, string> = {}): MaristanaHospital[] {
  const safe = normaliseMaristanaConfig(config)
  const hospitalCredits = safe.creditsPerStep * MARISTANA_STEPS
  const total = Math.max(0, Math.floor(totalCredits))
  const completed = Math.floor(total / hospitalCredits)
  // Keep the next site visible even on an exact boundary. The collection then
  // reads as "three built, the fourth ready" rather than ending at a wall.
  const visible = Math.max(1, completed + 1)
  return Array.from({ length: visible }, (_, index) => {
    const slot = index + 1
    const available = Math.max(0, total - index * hospitalCredits)
    const creditsInHospital = Math.min(hospitalCredits, available)
    const stage = Math.min(MARISTANA_STEPS, Math.floor(creditsInHospital / safe.creditsPerStep))
    const complete = stage === MARISTANA_STEPS
    const remainder = complete ? 0 : creditsInHospital % safe.creditsPerStep
    return {
      slot,
      name: names[slot] || `Maristana ${String(slot).padStart(2, '0')}`,
      stage,
      completed: complete,
      active: slot === visible,
      creditsInHospital,
      creditsToNextStep: complete ? 0 : safe.creditsPerStep - remainder,
      stepProgress: complete ? 1 : remainder / safe.creditsPerStep,
    }
  })
}

/** Default balance preview: one representative taught module. */
export function projectedModuleHospitals(config = DEFAULT_MARISTANA_CONFIG): number {
  const { total } = maristanaCredits({
    studyMinutes: 30 * 60,
    questionsAnswered: 300,
    correctAnswers: 225,
    assessmentScores: Array.from({ length: 10 }, () => 75),
  }, config)
  return total / (normaliseMaristanaConfig(config).creditsPerStep * MARISTANA_STEPS)
}

export const DEMO_MARISTANA_OVERVIEW: MaristanaOverview = (() => {
  const evidence: MaristanaEvidence = {
    studyMinutes: 1_327,
    questionsAnswered: 244,
    correctAnswers: 189,
    assessmentScores: [72, 78, 81, 76, 84, 79, 88],
  }
  const { breakdown, total } = maristanaCredits(evidence)
  return {
    enabled: true,
    config: DEFAULT_MARISTANA_CONFIG,
    totalCredits: total,
    completedHospitals: Math.floor(total / (DEFAULT_MARISTANA_CONFIG.creditsPerStep * MARISTANA_STEPS)),
    studyMinutes: evidence.studyMinutes,
    questionsAnswered: evidence.questionsAnswered,
    correctAnswers: evidence.correctAnswers,
    assessmentSessions: evidence.assessmentScores.length,
    averageAssessmentScore: Math.round(evidence.assessmentScores.reduce((a, b) => a + b, 0) / evidence.assessmentScores.length),
    breakdown,
    hospitals: maristanaHospitals(total, DEFAULT_MARISTANA_CONFIG, { 1: 'Al-Razi House', 2: 'Ibn Sina House', 3: 'The Courtyard' }),
    thisWeek: { studyMinutes: 286, questionsAnswered: 63, credits: 1_094 },
    recentActivity: [
      { id: 'demo-1', kind: 'assessment', label: 'Cardiovascular assessment', detail: '84% · 25 scored questions', credits: 176, at: new Date(Date.now() - 42 * 60_000).toISOString() },
      { id: 'demo-2', kind: 'study', label: 'Focused study', detail: 'Heart failure · 48 active minutes', credits: 96, at: new Date(Date.now() - 3 * 3_600_000).toISOString() },
      { id: 'demo-3', kind: 'question', label: 'Question Bank', detail: '18 correct of 24', credits: 228, at: new Date(Date.now() - 26 * 3_600_000).toISOString() },
    ],
  }
})()
