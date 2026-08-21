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
import type { ExamSourceTier } from '../../../src/data/examSignal.ts'

/** The manifest row a paper is. */
export interface SourceRef {
  /** The manifest ID — `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json`. */
  id: string
  file: string
  /** The calendar year the paper was sat, not the batch code on its cover. */
  sittingYear: number
  /**
   * How the blueprint weights it — and it must be a tier the importer knows.
   *
   * This was its own four-word vocabulary (`end_of_year`, `end_of_module`,
   * `resit`, `formative`) and only two of those words existed in
   * `EXAM_SOURCE_TIERS`. `examSignal.ts:193` coerces anything it does not
   * recognise to `other`, silently, so four of the seven papers seeded here
   * carried a blueprint weight of 0.3 where they had earned 0.8 or 0.9. A resit
   * counted for less than a random handout, and nothing said so.
   *
   * Typed against the importer's own list now, because two vocabularies for one
   * concept is the bug, not the mapping between them. `baqoon` is this
   * faculty's word for a resit and is what the importer already calls it.
   */
  tier: ExamSourceTier
  /** Which section headings this paper uses, in the order it prints them. */
  sections: readonly string[]
  /**
   * What this copy of the paper does not reproduce.
   *
   * These are student-collected copies, and a collector who typed out the
   * written questions may not have typed the multiple-choice ones. The paper
   * says how many there were; we simply do not have them. Recording that is the
   * difference between a paper with no MCQs and a paper whose MCQs we are
   * missing, and only one of those is true of the 2025 sitting — which states
   * `+26 MCQ {½ Mark each}` at the foot of its Histology section and prints not
   * one of them, in the solved copy or the unsolved one. Seeding what is
   * printed and calling the paper done records a 94-mark paper as an 81-mark
   * one and loses 26 questions against a green validator.
   */
  incomplete?: string
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
  /** Alternate names a student or a paper may use. Never a second concept. */
  aliases?: string[]
  /** Where sources disagree. Recorded, never resolved silently. */
  conflicts?: string[]
  /** What is still unsupported by a source this faculty would accept. */
  gaps?: string[]
  /** What is genuinely unclear about the concept, as opposed to unsourced. */
  uncertainty?: string
}

export type WrittenFormat =
  | 'short_answer' | 'structured_written' | 'comparison_table' | 'essay' | 'multipart_written'
  /**
   * Not a written format, and here anyway.
   *
   * Sat papers carry matching tables — the Baqoon and July 2022 sittings both
   * end with them — and a matching question is neither a written question nor a
   * question-book MCQ. It belongs to the paper it was sat on, which means it
   * belongs to a `Paper` seed; the alternative is that a whole section of a real
   * paper has nowhere to live and quietly does not get transcribed.
   */
  | 'matching'

/** One lettered subpart, where the paper printed lettered subparts. */
export interface SchemePart {
  /** `a`, `b`, `c` — the paper's own letter. */
  letter: string
  prompt: string
  expects: string[]
  /**
   * The concept this subpart tests, when it is not the question's first.
   *
   * The two cases on the 2025 paper each ask four lettered things, and they are
   * not four askings of one idea: case 1 goes from the lymphatic drainage of
   * the breast to a nerve injured at operation, which a student can know one of
   * and not the other. A subpart that tests its own concept says so here, and
   * the question becomes co-primary on both.
   */
  conceptKey?: string
}

export interface Scheme {
  format: WrittenFormat
  /** The prompt as the student sits it, and what earns the marks. */
  prompt: string
  expects: string[]
  /**
   * The paper's lettered subparts, where it printed them.
   *
   * Absent on most questions, which state one demand in one sentence. Present
   * on the cases, and flattening those into a single prompt lost the structure
   * the examiner actually set — which is how a case asking for the boundaries,
   * contents, floor and roof of the snuff box was first read as a question
   * about scaphoid fracture. The marks divide evenly across the letters,
   * because the paper gives a total for the case and letters beneath it.
   */
  parts?: SchemePart[]
  /**
   * The option bank of a matching question, in the paper's own lettering.
   *
   * An option may answer several prompts and some may answer none, which is
   * what makes a matching question harder than the same facts as four MCQs.
   */
  options?: { letter: string; text: string }[]
  /** Each prompt and the option that answers it. */
  matches?: { prompt: string; letter: string }[]
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
  return `CON-${SYSTEM[subject]}-${conceptHash(key)}`
}

/**
 * The part of a concept ID that identifies the idea, without the subject.
 *
 * The subject only selects the prefix, so the same key under two subjects gives
 * one hash behind two prefixes — `CON-DEV-B84639…` and `CON-MSK-B84639…` are
 * two IDs for one concept, and nothing at import time would notice. Exposing
 * the hash lets `subjectCollisions` find that by looking, rather than leaving it
 * to a convention two authors have to remember.
 */
export function conceptHash(key: string): string {
  return createHash('sha256').update(`kau:101 ISK:${key}`).digest('hex').toUpperCase().slice(0, 14)
}

/**
 * The subject a concept takes, from where it sits in the curriculum.
 *
 * Agreed between the two lanes authoring this module, because the subject is
 * the one field that can still fork a concept: the mint hashes the canonical
 * key alone and the subject only picks the `CON-<SYS>-` prefix, so two authors
 * filing one key differently produce two ids for one idea.
 *
 * Returns null where the path is outside the rule, which is a question for a
 * human rather than a default to fall back on.
 */
export function subjectForPath(modulePath: string): KasrSubject | null {
  if (modulePath.includes('> Histology > Blood')) return 'haem'
  if (modulePath.includes('> Histology')) return 'fnd'
  if (modulePath.includes('> General Embryology')) return 'dev'
  if (modulePath.includes('> Basis of Anatomy') || modulePath.includes('> Upper Limb')) return 'msk'
  return null
}

/**
 * Canonical keys that have been given more than one subject.
 *
 * The one way this pipeline can still mint rival IDs for one idea. Two authors
 * working the same key — one filing the decidua under `dev`, the other under
 * `msk` — produce two concepts a student's mastery splits across, and the IDs
 * differ only in a prefix nobody reads closely.
 *
 * Returns the offenders rather than throwing, so a caller can report every one
 * of them at once instead of one per run.
 */
export function subjectCollisions(
  entries: readonly { key: string; subject: KasrSubject; where: string }[],
): { key: string; subjects: string[]; where: string[] }[] {
  const byKey = new Map<string, { subjects: Set<string>; where: Set<string> }>()
  for (const entry of entries) {
    const found = byKey.get(entry.key) ?? { subjects: new Set(), where: new Set() }
    found.subjects.add(entry.subject)
    found.where.add(entry.where)
    byKey.set(entry.key, found)
  }
  return [...byKey.entries()]
    .filter(([, seen]) => seen.subjects.size > 1)
    .map(([key, seen]) => ({ key, subjects: [...seen.subjects].sort(), where: [...seen.where].sort() }))
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
