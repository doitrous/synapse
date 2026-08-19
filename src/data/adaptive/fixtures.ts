/**
 * Fixture builders for the adaptive tests.
 *
 * Kept out of the test files so every test starts from the same defaults and a
 * test only has to state the one field it is actually about. A test that spells
 * out twenty irrelevant properties hides its own subject.
 *
 * Imports nothing from the app: these files run under `node --test`, which does
 * not resolve the `@/` alias. Type-only imports are erased and so are safe.
 */

import type { Question } from '@/data/qbank'
import type { AdaptiveItem } from './item.ts'
import type { AdaptiveEvidenceEvent } from './evidenceLedger.ts'

export const AT = '2026-08-12T10:00:00.000Z'

/** Days after `AT`, as an ISO timestamp. */
export function daysAfter(days: number, from = AT): string {
  return new Date(new Date(from).getTime() + days * 86_400_000).toISOString()
}

export function hoursAfter(hours: number, from = AT): string {
  return new Date(new Date(from).getTime() + hours * 3_600_000).toISOString()
}

function question(id: string, topic: string): Question {
  return {
    id,
    subjectId: 'cvs',
    topic,
    difficulty: 'Moderate',
    vignette: '',
    stem: `Stem for ${id}`,
    options: [
      { text: 'Right', correct: true, rationale: 'Correct.' },
      { text: 'Wrong', correct: false, rationale: 'A common confusion with the adjacent mechanism.' },
    ],
    explanation: '',
    libraryRefs: [],
    resourceRefs: [],
  }
}

export function item(overrides: Partial<AdaptiveItem> & { id: string }): AdaptiveItem {
  const topic = overrides.topic ?? 'Heart failure'
  const main = overrides.mainConceptIds ?? ['CON-A']
  const secondary = overrides.secondaryConceptIds ?? []

  const base: AdaptiveItem = {
    id: overrides.id,
    question: question(overrides.id, topic),
    version: 'v1',
    subjectId: 'cvs',
    topic,
    difficulty: 'Moderate',
    mainConceptIds: main,
    secondaryConceptIds: secondary,
    conceptIds: [...main, ...secondary],
    moduleIds: [],
    universityIds: [],
    years: [],
    onlyFor: [],
    cognitiveEffort: 0.5,
    clinicalReasoningLevel: 2,
    examRelevance: 3,
    estimatedSeconds: 60,
    demanding: false,
    optionRationales: ['Correct.', 'A common confusion.'],
  }

  // `conceptIds` is derived last so a caller overriding either list cannot leave
  // it disagreeing with the two lists it is supposed to be the union of.
  const merged = { ...base, ...overrides }
  return { ...merged, conceptIds: [...merged.mainConceptIds, ...merged.secondaryConceptIds] }
}

/** A pool of `count` items, spread across `topics`, one concept each. */
export function pool(count: number, topics = ['Heart failure', 'Arrhythmia', 'Valves', 'Ischaemia']): AdaptiveItem[] {
  return Array.from({ length: count }, (_, index) =>
    item({
      id: `q-${index}`,
      topic: topics[index % topics.length],
      mainConceptIds: [`CON-${index % Math.max(1, Math.floor(count / 2))}`],
    }),
  )
}

export function evidence(overrides: Partial<AdaptiveEvidenceEvent> & { conceptId: string }): AdaptiveEvidenceEvent {
  const attemptId = overrides.attemptId ?? `attempt-${overrides.questionId ?? 'q-0'}`
  const base: AdaptiveEvidenceEvent = {
    id: `${attemptId}:${overrides.conceptId}`,
    at: AT,
    attemptId,
    blockId: 'block-1',
    questionId: 'q-0',
    questionVersion: 'v1',
    conceptId: overrides.conceptId,
    role: 'main',
    correct: true,
    outcome: 'answered',
    confidence: 'unstated',
    seconds: 60,
    expectedSeconds: 60,
    mode: 'tutor',
    exposure: 'first',
    difficulty: 'Moderate',
    configVersion: 1,
  }
  // The id is the idempotency key, so it is rebuilt from whatever attempt and
  // concept survive the override rather than left pointing at the defaults.
  const merged = { ...base, ...overrides }
  return { ...merged, id: `${merged.attemptId}:${merged.conceptId}` }
}

/** `n` wrong answers on one concept, each on a different question. */
export function wrongRun(conceptId: string, count: number, from = AT): AdaptiveEvidenceEvent[] {
  return Array.from({ length: count }, (_, index) =>
    evidence({
      conceptId,
      questionId: `q-wrong-${index}`,
      attemptId: `attempt-wrong-${index}`,
      correct: false,
      at: hoursAfter(index, from),
    }),
  )
}
