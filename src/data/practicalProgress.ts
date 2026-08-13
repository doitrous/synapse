/**
 * What a student has done on the practical surfaces.
 *
 * Every one of these numbers used to be a literal in the seed file: a station
 * that said "best · 2 tries" no matter how many times it was run, a case stuck
 * on "in progress" forever, a lab set frozen at 12 of 20, and twelve skills
 * with sign-off dates and consultants' names attached to a student who had
 * never met them. This is where those figures come from now.
 *
 * The sign-off distinction is deliberate and load-bearing. A student can record
 * that they have practised a skill and that they consider themselves ready. Only
 * an assessor can sign one off, and no assessor identity exists in this product
 * yet — so `signedOffBy` has nowhere to come from and the UI must not imply it
 * does.
 */

export const PRACTICAL_PROGRESS_STORAGE_KEY = 'synapse.practical.progress.v1'

export interface StationProgress {
  attempts: number
  /** Best marks achieved, out of the station's own total. */
  bestMarks: number
  /** The station's mark total when `bestMarks` was set, so a percentage is honest. */
  outOf: number
  lastAt: string
  /** Mark-scheme items ticked on the most recent run, so it can be resumed. */
  checkedItems: string[]
}

export type CaseStatus = 'not-started' | 'in-progress' | 'completed'

export interface CaseProgress {
  status: CaseStatus
  /** How far through the decision points the student reached. */
  lastStep: number
  steps: number
  lastAt: string
}

export interface LabProgress {
  done: number
  items: number
  lastAt: string
}

/** What the student says about a skill. Never what an assessor says. */
export type SkillStatus = 'not-started' | 'practised' | 'ready'

export interface SkillProgress {
  status: SkillStatus
  lastAt: string
}

export interface PracticalProgress {
  version: 1
  stations: Record<string, StationProgress>
  cases: Record<string, CaseProgress>
  labs: Record<string, LabProgress>
  skills: Record<string, SkillProgress>
}

export const EMPTY_PRACTICAL_PROGRESS: PracticalProgress = {
  version: 1, stations: {}, cases: {}, labs: {}, skills: {},
}

/**
 * Fold a finished station run in.
 *
 * The best score only moves up, and it carries the mark total it was scored
 * against — a station later re-authored out of 30 must not make an old 18/20
 * read as 18/30.
 */
export function recordStationRun(
  progress: PracticalProgress,
  stationId: string,
  run: { marks: number; outOf: number; checkedItems: string[]; at: string },
): PracticalProgress {
  const current = progress.stations[stationId]
  const previousShare = current && current.outOf ? current.bestMarks / current.outOf : -1
  const thisShare = run.outOf ? run.marks / run.outOf : 0
  const better = thisShare >= previousShare
  return {
    ...progress,
    stations: {
      ...progress.stations,
      [stationId]: {
        attempts: (current?.attempts ?? 0) + 1,
        bestMarks: better ? run.marks : current!.bestMarks,
        outOf: better ? run.outOf : current!.outOf,
        lastAt: run.at,
        checkedItems: run.checkedItems,
      },
    },
  }
}

export function recordCaseStep(
  progress: PracticalProgress,
  caseId: string,
  step: { lastStep: number; steps: number; completed: boolean; at: string },
): PracticalProgress {
  const current = progress.cases[caseId]
  return {
    ...progress,
    cases: {
      ...progress.cases,
      [caseId]: {
        // Once completed, revisiting a case does not demote it to in-progress.
        status: step.completed || current?.status === 'completed' ? 'completed' : 'in-progress',
        lastStep: Math.max(step.lastStep, current?.lastStep ?? 0),
        steps: step.steps,
        lastAt: step.at,
      },
    },
  }
}

export function recordLabAnswered(
  progress: PracticalProgress,
  labId: string,
  state: { done: number; items: number; at: string },
): PracticalProgress {
  const current = progress.labs[labId]
  return {
    ...progress,
    labs: {
      ...progress.labs,
      [labId]: {
        done: Math.max(state.done, current?.done ?? 0),
        items: state.items,
        lastAt: state.at,
      },
    },
  }
}

export function setSkillStatus(
  progress: PracticalProgress,
  skillId: string,
  status: SkillStatus,
  at: string,
): PracticalProgress {
  if (status === 'not-started') {
    const { [skillId]: _removed, ...rest } = progress.skills
    return { ...progress, skills: rest }
  }
  return { ...progress, skills: { ...progress.skills, [skillId]: { status, lastAt: at } } }
}

export interface SkillsSummary {
  practised: number
  ready: number
  total: number
}

/**
 * How the skills list stands.
 *
 * The total is passed in from the live list rather than stored, so the headline
 * can never disagree with the list beneath it — which is exactly what "14 / 22
 * signed off" did while displaying twelve skills.
 */
export function summariseSkills(progress: PracticalProgress, total: number): SkillsSummary {
  const values = Object.values(progress.skills)
  return {
    practised: values.filter((skill) => skill.status === 'practised' || skill.status === 'ready').length,
    ready: values.filter((skill) => skill.status === 'ready').length,
    total,
  }
}
