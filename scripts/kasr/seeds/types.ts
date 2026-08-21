/**
 * What a Kasr Al Ainy exam paper looks like once it is data.
 *
 * One seed per question. Every generator reads these — the concept batch, the
 * written-question batch, and the coverage ledger — so a question cannot come
 * to mean one thing to the concept that carries it and another to the question
 * that asks it.
 *
 * `asked` is the paper's own wording, kept verbatim and never edited. Everything
 * else is a reading of it, and a reviewer who disagrees can open the paper at
 * `page` and say so.
 */
import { createHash } from 'node:crypto'

/** The manifest row a paper is. */
export interface SourceRef {
  /** The manifest ID — `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json`. */
  id: string
  file: string
  /** The calendar year the paper was sat, not the batch code on its cover. */
  sittingYear: number
  /** How the blueprint weights it: an end-of-year paper outranks an end-of-module. */
  tier: 'end_of_year' | 'end_of_module' | 'resit' | 'formative'
  /** Which section headings this paper uses, in the order it prints them. */
  sections: readonly string[]
}

/**
 * The subjects a first-year Kasr concept can sit under.
 *
 * Not the manuals' list of eight, which is stale: the runtime catalogue carries
 * twenty, and without `fnd`, `dev` and `haem` a histology or embryology concept
 * has nowhere honest to sit.
 */
export type KasrSubject = 'msk' | 'fnd' | 'dev' | 'haem' | 'cvs' | 'resp' | 'gi' | 'neuro'

export interface Seed {
  /** The question number on the paper, and which section it sat in. */
  q: number
  section: string
  page: number
  marks: number
  /** The question as the paper words it. Verbatim, never tidied. */
  asked: string
  label: string
  key: string
  definition: string
  objective: string
  pitfall: string
  subject: KasrSubject
  primary: string
  secondary: string[]
  modulePath: string
  type: string
}

export type WrittenFormat =
  | 'short_answer' | 'structured_written' | 'comparison_table' | 'essay' | 'multipart_written'

export interface Scheme {
  format: WrittenFormat
  /** The prompt as the student sits it, and what earns the marks. */
  prompt: string
  expects: string[]
}

/** One paper, as a module a generator can pick up. */
export interface Paper {
  source: SourceRef
  seeds: Seed[]
  schemes: Record<string, Scheme>
}

const SYSTEM: Record<KasrSubject, string> = {
  msk: 'MSK', fnd: 'FND', dev: 'DEV', haem: 'HEM',
  cvs: 'CVS', resp: 'RES', gi: 'GIT', neuro: 'NEU',
}

/**
 * `CON-<SYS>-<14 hex>`, minted from the canonical key alone.
 *
 * Deliberately not from the paper: two papers that ask the same thing must mint
 * the same concept, or a module ends up with four decidua concepts and a student
 * whose mastery is split four ways across them.
 */
export function mintConceptId(subject: KasrSubject, key: string): string {
  const hash = createHash('sha256').update(`kau:101 ISK:${key}`).digest('hex').toUpperCase()
  return `CON-${SYSTEM[subject]}-${hash.slice(0, 14)}`
}

/**
 * `QW-101-<12 hex>`, minted from the paper and the question.
 *
 * The opposite rule to a concept: the same question on two papers is two
 * questions, because each is a separate occurrence and the blueprint counts
 * occurrences.
 */
export function mintQuestionId(source: SourceRef, seed: Seed): string {
  const hash = createHash('sha256')
    .update(`kau:101 ISK:${source.id}:${seed.section}:${seed.q}`).digest('hex').toUpperCase()
  return `QW-101-${hash.slice(0, 12)}`
}

/** A question's key in a paper's scheme table: section initial plus number. */
export const partsKey = (seed: Seed) => `${seed.section[0].toUpperCase()}${seed.q}`
