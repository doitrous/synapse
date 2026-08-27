/**
 * What an Ain Shams exam paper looks like once it is data.
 *
 * Copied from `scripts/kasr/seeds/types.ts`, which is Kasr Al Ainy's version of
 * this file — the shared toolchain manual asks that field semantics stay
 * byte-identical between the two universities so their batches can be
 * compared, and this is where a field's meaning is fixed. Copy the pattern;
 * do not fork it. See `docs/Ain-Shams-Source-Imports/LANE-BRIEF.md`.
 *
 * One seed per question. Every generator reads these — the concept batch, the
 * written-question batch, and the coverage ledger — so a question cannot come
 * to mean one thing to the concept that carries it and another to the question
 * that asks it.
 *
 * `asked` is the paper's own wording, kept verbatim and never edited. Everything
 * else is a reading of it, and a reviewer who disagrees can open the paper at
 * `page` and say so.
 *
 * ORDER CHANGE, 2026-08-22 — concept IDs are NOT salted by module or
 * university any more. `mintConceptId` used to read
 * `sha256("kau:<module>:" + key)`, which is Kasr's own divergence from the
 * shared minting law. The law is
 * `Instruction Manual for Content Creation/tools/mint-concept-id.mjs`:
 * `CON-<SYSTEM>-` + `sha256(canonicalKey)` uppercased, first 14 hex — the
 * canonical key ALONE. Same medical idea -> same ID across every university;
 * a university, a year and a module are overlays on the concept, never part
 * of its identity. Verified against the tool itself (2026-08-22): it hashes
 * `canonicalKey` with no other input, and its system-code list is
 * `docs/medical-library-program/systems/SYS-*.md`, which is the same list as
 * `BodySystem` below.
 *
 * Question, written and practical IDs are a different case and keep a module
 * salt (`asu:<module>:...`, replacing Kasr's `kau:`) — those are
 * university-specific occurrences, not portable medical ideas, so two
 * universities asking "different" questions about the same concept must mint
 * two questions, not one.
 */
import { createHash } from 'node:crypto'
import type { ExamSourceTier } from '../../../src/data/examSignal.ts'
import { universities } from '../../../src/data/universities.ts'

/**
 * The module a paper belongs to, as the catalogue spells it.
 *
 * `yearId`, `name` and `term` are new relative to Kasr's `ModuleRef` — Kasr is
 * a single-year (Year 1) toolchain and hardcoded `KAU_Y1` in six places in
 * `emit.ts`. Ain Shams spans Years 1, 2 and 3 in one toolchain and genuinely
 * splits its modules across terms (unlike Kasr, which defaults every module to
 * Term 1), so the year and term have to travel with the module rather than
 * being constants — every place Kasr's `emit.ts` wrote `KAU_Y1` now reads
 * `module.yearId`.
 */
export interface ModuleRef {
  /** The catalogue's exact ID, spaces included — `CNS 2`, `IBM-1`, `CVS`. Never a shorthand. */
  id: string
  /** `id` with spaces removed — the filename/result-directory token: `CNS2`, `IBM-1`, `CVS`. */
  code: string
  /** The catalogue's year ID for this module — `ASU_Y1`, `ASU_Y2` or `ASU_Y3`. */
  yearId: string
  /** The module's full title, as the catalogue lane recorded it. */
  name: string
  /** `Term 1` or `Term 2` — Ain Shams modules genuinely split across terms. */
  term: string
}

/**
 * Ain Shams's modules, derived from `src/data/universities.ts` — the
 * catalogue of record, `ASU_MODULES` — rather than hand-copied here. That
 * file is the single source both the runtime UI and this toolchain must
 * agree with, and importing it (`universities.find(u => u.id === 'asu')`)
 * makes agreement automatic instead of something to keep in sync by hand.
 * `src/data/universities.ts` has no imports of its own, so this resolves
 * cleanly under `--experimental-strip-types` — verified 2026-08-22.
 *
 * This toolchain does not invent module IDs (LANE-BRIEF.md §3): every ID,
 * name, year and term below is exactly what `ASU_MODULES` says. The one
 * addition is the throwaway `ASU-FIXTURE` module below it, for this
 * toolchain's own proof — see `scripts/asu/fixtures/`.
 */
const asuCatalogue = universities.find((u) => u.id === 'asu')
if (!asuCatalogue) {
  throw new Error('src/data/universities.ts has no "asu" university — the catalogue lane has not landed it yet')
}

export const MODULES: Record<string, ModuleRef> = Object.fromEntries(
  asuCatalogue.years.flatMap((year) => year.courses.map((course) => {
    if (!course.moduleId) {
      throw new Error(`${year.id}: course "${course.name}" has no moduleId in the catalogue`)
    }
    const ref: ModuleRef = {
      id: course.moduleId,
      code: course.moduleId.replace(/\s+/g, ''),
      yearId: year.id,
      name: course.name,
      term: course.term ?? 'Term 1',
    }
    return [course.moduleId, ref] as const
  })),
)

/**
 * Throwaway fixture module — see scripts/asu/fixtures/. Not part of the real
 * catalogue. `code` follows the same rule as every real module above: the ID
 * with spaces removed (there are none here, so `code === id`).
 */
MODULES['ASU-FIXTURE'] = {
  id: 'ASU-FIXTURE', code: 'ASU-FIXTURE', yearId: 'ASU_Y1',
  name: 'Fixture module for scripts/asu toolchain proof', term: 'Term 1',
}

/** The manifest row a paper is. */
export interface SourceRef {
  /** The manifest ID — `docs/Ain-Shams-Source-Imports/manifest/asu-y<N>-sources.json`. */
  id: string
  file: string
  /**
   * The module this paper was set for.
   *
   * Required, unlike Kasr's `SourceRef.module`, which defaults to `101 ISK`
   * for papers seeded before the module was a parameter. Ain Shams has no
   * such legacy: every paper here is seeded after `moduleOf` already required
   * one, so a missing module is a mistake to catch, not a case to default
   * around silently.
   */
  module: string
  /** The calendar year the paper was sat, not the batch code on its cover. */
  sittingYear: number
  /**
   * How the blueprint weights it — and it must be a tier the importer knows.
   * See `ExamSourceTier` / `EXAM_SOURCE_TIERS` in `src/data/examSignal.ts`.
   * An unrecognised tier is silently coerced to `other` there, costing a paper
   * its blueprint weight — see `TIER_PREFIX` in `build-batches.ts`.
   */
  tier: ExamSourceTier
  /** Which section headings this paper uses, in the order it prints them. */
  sections: readonly string[]
  /** What this copy of the paper does not reproduce (see Kasr's original for the worked case). */
  incomplete?: string
  /** The manifest ID of the same paper with answers written on it, where the corpus holds one. */
  solvedCopy?: string
}

/** The module a source belongs to, resolved and checked against the catalogue. */
export function moduleOf(source: SourceRef): ModuleRef {
  if (!source.module) {
    throw new Error(
      `${source.file}: no module named. Ain Shams has no default module — unlike Kasr's `
      + '"101 ISK" fallback for pre-parameter papers — so every source must name one explicitly.')
  }
  const found = MODULES[source.module]
  if (!found) {
    throw new Error(
      `${source.file}: "${source.module}" is not a module in the catalogue — one of `
      + `${Object.keys(MODULES).join(', ')}. This toolchain reads MODULES from `
      + '`ASU_MODULES` in src/data/universities.ts and does not invent module IDs.')
  }
  return found
}

/**
 * The subjects an Ain Shams concept can sit under.
 *
 * Identical to Kasr's `KasrSubject` — the runtime catalogue
 * (`src/data/curriculumCatalog.ts`) carries twenty subjects and both
 * universities' concepts sit in the same catalogue, so the list cannot
 * diverge between them. Renamed for this toolchain; the values are unchanged.
 */
export type AsuSubject =
  | 'cvs' | 'resp' | 'renal' | 'gi' | 'neuro' | 'endo' | 'msk' | 'pharm'
  | 'fnd' | 'dev' | 'haem' | 'imm' | 'inf' | 'obs' | 'gyn' | 'androl'
  | 'psy' | 'derm' | 'mul' | 'pop'

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
  subject: AsuSubject
  /**
   * The body-system code for the concept ID.
   *
   * Required in this toolchain rather than optional-with-a-default (Kasr's
   * `DEFAULT_SYSTEM`): the concept ID no longer carries a module, so a wrong
   * or defaulted system is the only way left to mint a rival ID for a concept
   * that already exists under the right one. See `systemFor`.
   */
  system?: BodySystem
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

  // ---- Everything below is what takes a concept from `medical:batch` clean to
  // `medical:audit` clean. See Kasr's `types.ts` for the field-by-field
  // rationale; unchanged here.

  arabicLabel?: string
  arabicAliases?: string[]
  articleId?: string
  relatedArticleIds?: string[]
  relatedConceptIds?: string[]
  claimIds?: string[]
  resourceIds?: string[]
  rejectedMergeCandidateIds?: string[]
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Challenging'
  sourcePage?: number
  topic?: string
  subtopic?: string
  microtopic?: string
}

export type WrittenFormat =
  | 'short_answer' | 'structured_written' | 'comparison_table' | 'essay' | 'multipart_written'
  | 'matching'
  | 'completion' | 'labeling'
  | 'mcq_single_best'

/** One lettered subpart, where the paper printed lettered subparts. */
export interface SchemePart {
  letter: string
  prompt: string
  expects: string[]
  conceptKey?: string
}

export interface Scheme {
  format: WrittenFormat
  prompt: string
  expects: string[]
  completionText?: string
  parts?: SchemePart[]
  options?: { letter: string; text: string }[]
  matches?: { prompt: string; letter: string }[]
}

/** One paper, as a module a generator can pick up. */
export interface Paper {
  source: SourceRef
  seeds: Seed[]
  schemes: Record<string, Scheme>
}

/**
 * The body-system codes a concept ID may carry.
 *
 * Read from `docs/medical-library-program/systems/SYS-*.md` and verified
 * byte-for-byte identical to `Instruction Manual for Content
 * Creation/tools/mint-concept-id.mjs`'s own list (2026-08-22): AND CVS DER
 * DEV END FND GIT GYN HEM IMM INF MSK MUL NEU OBS POP PSY REN RES.
 */
export type BodySystem =
  | 'AND' | 'CVS' | 'DER' | 'DEV' | 'END' | 'FND' | 'GIT' | 'GYN' | 'HEM'
  | 'IMM' | 'INF' | 'MSK' | 'MUL' | 'NEU' | 'OBS' | 'POP' | 'PSY' | 'REN' | 'RES'

/**
 * The code to use when a seed does not name one.
 *
 * Unlike Kasr's `DEFAULT_SYSTEM`, this table exists only for the subjects
 * where the body-system code is genuinely unambiguous — a blood concept is
 * `HEM`, a musculoskeletal one is `MSK` — on the same reasoning Kasr's
 * `types.ts` documents at length: `pharm` has no honest default (live state
 * files its 206 pharm concepts as `FND` x 85 and `INF` x 121, never one
 * pharmacology code), so it is deliberately absent and `systemFor` refuses to
 * guess for it. A `pharm` seed must name `system` explicitly.
 */
const DEFAULT_SYSTEM: Partial<Record<AsuSubject, BodySystem>> = {
  msk: 'MSK', fnd: 'FND', dev: 'DEV', haem: 'HEM',
  cvs: 'CVS', resp: 'RES', gi: 'GIT', neuro: 'NEU',
  renal: 'REN', endo: 'END', imm: 'IMM', inf: 'INF',
  obs: 'OBS', gyn: 'GYN', androl: 'AND', psy: 'PSY', derm: 'DER',
  mul: 'MUL', pop: 'POP',
}

/** The code for a subject, or the explicit override a seed carries. */
export function systemFor(subject: AsuSubject, override?: BodySystem): BodySystem {
  if (override) return override
  const code = DEFAULT_SYSTEM[subject]
  if (!code) {
    throw new Error(
      `subject "${subject}" has no default body-system code — name one on the seed as `
      + `\`system\`. Live state places all 206 pharm concepts under FND (general) or INF `
      + `(anti-infectives); there is no pharmacology body system, and CON-MUL-* has zero `
      + `members.`)
  }
  return code
}

/**
 * `CON-<SYS>-<14 hex>`, minted from the body-system code and the canonical
 * key alone.
 *
 * ORDER CHANGE, 2026-08-22 — this used to also hash the module (Kasr's
 * `mintConceptId(module, subject, key, system)`, `kau:<module>:<key>`).
 * That salt is Kasr's own divergence from the shared minting law
 * (`tools/mint-concept-id.mjs`), which hashes `canonicalKey` alone. Dropped
 * here: this function is now byte-for-byte what that tool computes for the
 * same `(system, key)`, and the fixture proof shows it. A concept is a
 * medical idea, not a university's reading of one, so the same idea taught at
 * Kasr and at Ain Shams must mint the same ID — the alternative is two
 * concepts a student's mastery silently splits across, forever, because
 * nothing at import time would notice.
 *
 * `build-batches.ts` looks the ID up against live state and every pending
 * batch (see `findExistingConcept` there) before deciding whether to write a
 * full record or a sparse update — this function does not do that lookup
 * itself, on the same principle `types.ts` documents elsewhere: minting is
 * pure, deciding what to do with the result is the caller's job.
 */
export function mintConceptId(subject: AsuSubject, key: string, system?: BodySystem): string {
  return `CON-${systemFor(subject, system)}-${conceptHash(key)}`
}

/**
 * The part of a concept ID that identifies the idea, without the subject.
 *
 * Unchanged in spirit from Kasr's version, minus the module: two subjects
 * filing one key still mint the same hash behind two prefixes, which is what
 * `subjectCollisions` below exists to catch by looking, rather than leaving
 * it to a convention two authors have to remember.
 */
export function conceptHash(key: string): string {
  return createHash('sha256').update(key).digest('hex').toUpperCase().slice(0, 14)
}

/**
 * The subject a concept takes, from where it sits in the curriculum.
 *
 * Returns null where the path is outside the rule, which is a question for a
 * human rather than a default to fall back on — see Kasr's `types.ts` for the
 * full reasoning. This toolchain ships with no Ain Shams-specific rules yet
 * (unlike Kasr's, which encodes 101's own curriculum headings): add module
 * paths here as the corpus is read, do not force Ain Shams material through
 * Kasr's rules.
 */
export function subjectForPath(_modulePath: string): AsuSubject | null {
  return null
}

/**
 * Canonical keys that have been given more than one subject.
 *
 * Unchanged from Kasr's version — the mint hashes the canonical key alone (now
 * more than ever, with the module also dropped), so two authors filing one
 * key under two subjects still mint two IDs for one idea, differing only in
 * the `CON-<SYS>-` prefix.
 */
export function subjectCollisions(
  entries: readonly { key: string; subject: AsuSubject; where: string }[],
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
 * `QW-<code>-<12 hex>`, minted from the module, the paper and the question.
 *
 * A question or written item is a university-specific occurrence, not a
 * portable medical idea, so it keeps a module salt — `asu:<module>:...`,
 * replacing Kasr's `kau:`. The opposite rule to a concept: the same question
 * on two papers is two questions, because each is a separate occurrence and
 * the blueprint counts occurrences.
 */
export function mintQuestionId(source: SourceRef, seed: Seed): string {
  const module = moduleOf(source)
  const hash = createHash('sha256')
    .update(`asu:${module.id}:${source.id}:${seed.section}:${seed.q}`).digest('hex').toUpperCase()
  return `QW-${module.code}-${hash.slice(0, 12)}`
}

/** A question's key in a paper's scheme table: section initial plus number. */
export const partsKey = (seed: Seed) => `${seed.section[0].toUpperCase()}${seed.q}`
