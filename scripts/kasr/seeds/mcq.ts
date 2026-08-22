/**
 * What an author adds to a machine-extracted multiple-choice question.
 *
 * The extraction gives a stem, its options and — for most of them — the
 * examiner's answer. None of that teaches anything: a student who picks the
 * wrong option learns only that it was wrong. The judgement an author supplies
 * is why each option is right or wrong, which concept the question tests, and
 * whether the question is fit to sit at all.
 *
 * One file per subject-tree leaf, under `seeds/mcq/<module>/` — `seeds/mcq/101-ISK/`,
 * `seeds/mcq/102-INT/`, and so on, one folder per module. A leaf is the unit
 * because it is the unit the faculty teaches in, the unit its article covers,
 * and small enough that one pass over it can be held in mind at once.
 *
 * The bank itself — stems, options, extracted answers, repetition counts — is
 * `scripts/kasr/extract/mcq-bank.json` and is never edited by hand. An author
 * disagreeing with it says so here, with a reason, so the disagreement is
 * visible rather than absorbed.
 *
 * This shape started in a parallel session that stopped before landing
 * anything; two of its decisions were better than mine and are kept — an
 * excluded question stays in the file with its reason, and an answer override
 * cannot be written without one.
 */
import type { KasrSubject } from './types.ts'

/** A concept an author minted while reading a leaf's questions. */
export interface McqConcept {
  /** Stable across papers. Two papers asking this mint one concept. */
  key: string
  /** A full sentence stating what is true, not a topic name. */
  label: string
  definition: string
  objective: string
  pitfall: string
  subject: KasrSubject
  primary: string
  secondary: string[]
  modulePath: string
  type: string
  /** Alternate names a student or a question book may use. Never a second concept. */
  aliases?: string[]
  /** Where sources disagree. Recorded, never resolved silently. */
  conflicts?: string[]
  /** What is still unsupported by a source this faculty would accept. */
  gaps?: string[]
  /** What is genuinely unclear, as opposed to unsourced. */
  uncertainty?: string
  /**
   * Override for `resource_ids`, for the rare concept whose evidence is not
   * simply "the module's department book" — a named atlas, a cross-module
   * source, or a book the manifest does not categorise as `Department Book`.
   * Absent by default: `emit.ts`'s `mcqConceptBlock` then resolves the
   * module's own department book(s) from the manifest, scoped by this
   * concept's `modulePath` department where one of several applies.
   */
  resourceIds?: string[]
}

export interface McqAuthored {
  /** The bank row this belongs to, by its `key`. */
  key: string
  /** Which concept this leaf's `concepts` list says the question tests. */
  conceptKey: string
  /**
   * Why each option is right or wrong, by letter.
   *
   * Every filled option needs one, and the validator enforces it. A
   * distractor's explanation should say what would make a student pick it,
   * not merely restate that it is wrong — the misconception is the teachable
   * part, and it is the only reason a wrong answer is worth showing at all.
   */
  explanations: Record<string, string>
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging'
  questionType: string
  learningObjective: string
  /**
   * The answer, when the author disagrees with the extracted one or the source
   * gave none. Absent when the extracted answer stands.
   */
  answerOverride?: string
  /** Why the author changed it. Required whenever `answerOverride` is set. */
  answerOverrideReason?: string
  /**
   * Set when the question must not be imported — a mangled stem, an option set
   * that cannot be repaired, an answer nobody can establish.
   *
   * Excluded questions stay in the file with their reason rather than being
   * deleted. A question dropped silently is one nobody can reconsider, and
   * 232 of this bank's rows are low-confidence OCR that may become recoverable
   * when someone rescans the page.
   */
  exclude?: boolean
  excludeReason?: string
}

export interface McqLeafSeed {
  /** The subject-tree leaf, exactly as `101-isk-structure.md` spells it. */
  leaf: string
  modulePath: string
  /** The article that teaches this leaf. A question needs one to be publishable. */
  articleId: string
  concepts: McqConcept[]
  questions: McqAuthored[]
}

/** One row of `mcq-bank.json`, as the emitter reads it. */
export interface BankRow {
  key: string
  stem: string
  options: Record<string, string>
  answer?: string
  answerConfidence: 'keyed' | 'same-file' | 'none' | 'conflicting'
  occurrences: { sourceId: string; file: string; page: number; number: number }[]
  timesAsked: number
  topic: string
  confidence: 'high' | 'medium' | 'low'
  variants?: string[]
  subject?: string
  chapter?: string
  leaf?: string
  needsManualTranscription?: boolean
}
