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
 *
 * Everything here is module-agnostic. It was written for `101 ISK`, with the
 * module spelled into the ID templates; five modules are being extracted at
 * once now, and a generator that knows only one of them mints the second
 * module's concepts inside the first module's namespace. So the module is a
 * parameter — with defaults chosen so every ID already authored for 101 mints
 * unchanged. See `mintConceptId`.
 */
import { createHash } from 'node:crypto'
import type { ExamSourceTier } from '../../../src/data/examSignal.ts'

/** The module a paper belongs to, as the catalogue spells it. */
export interface ModuleRef {
  /** The catalogue's exact ID — `101 ISK`, `102 INT`. Never a shorthand. */
  id: string
  /** The numeric prefix, which is what a question ID carries: `101`, `102`. */
  code: string
}

/**
 * `src/data/universities.ts` is the catalogue of record, and its ID for module
 * 102 is `102 INT` rather than `102`. A module written any other way resolves
 * to nothing, or worse, mints a competing module.
 */
export const MODULES: Record<string, ModuleRef> = {
  // Year 1 — unchanged. `mintConceptId` hashes `kau:<module>:<key>`, so
  // touching an existing entry here would mint a different ID for every
  // concept already authored under it.
  '101 ISK': { id: '101 ISK', code: '101' },
  '102 INT': { id: '102 INT', code: '102' },
  '103 BMS': { id: '103 BMS', code: '103' },
  '104 CPS': { id: '104 CPS', code: '104' },
  '108 INT': { id: '108 INT', code: '108' },
  // Year 2 (`src/data/universities.ts`, `KAU_MODULES['Year 2']`). Every ID has
  // a numeric prefix, so `code` is that number as a string, matching 101's
  // pattern.
  '205 NEU': { id: '205 NEU', code: '205' },
  '206 DIG': { id: '206 DIG', code: '206' },
  '207 END': { id: '207 END', code: '207' },
  '208 INT': { id: '208 INT', code: '208' },
  '210 PAT': { id: '210 PAT', code: '210' },
  '213 PSY': { id: '213 PSY', code: '213' },
  // Year 3 (`KAU_MODULES['Year 3']`). Six of eight carry a numeric prefix and
  // keep it as `code`. `314` and `319` are the whole catalogue ID — no letters
  // to strip — so `code` is the ID itself. `CLIN 3`, `COMM 3` and `ELEC 3`
  // carry no number at all; `code` is the ID with its space removed
  // (`CLIN3`/`COMM3`/`ELEC3`), which stays short, readable and distinct from
  // every numeric code in this table — `code` is never parsed back into a
  // number anywhere (confirmed by grepping `\.code\b` under scripts/kasr/: it
  // is only ever interpolated into an ID template), so a non-numeric string is
  // exactly as valid as `'101'` is.
  '309 INF': { id: '309 INF', code: '309' },
  '310 PAT': { id: '310 PAT', code: '310' },
  '314': { id: '314', code: '314' },
  '319': { id: '319', code: '319' },
  '327 MPE': { id: '327 MPE', code: '327' },
  'CLIN 3': { id: 'CLIN 3', code: 'CLIN3' },
  'COMM 3': { id: 'COMM 3', code: 'COMM3' },
  'ELEC 3': { id: 'ELEC 3', code: 'ELEC3' },
  // Year 4 (`KAU_MODULES['Year 4']`). None of these carry a numeric prefix —
  // the year digit is a suffix instead, because module IDs are unique
  // faculty-wide and SURG/IM/FM repeat across years 4 and 5. `code` strips the
  // space (`PEDS 4` -> `PEDS4`), same rule as the Year 3 codeless entries.
  'PEDS 4': { id: 'PEDS 4', code: 'PEDS4' },
  'OBGYN 4': { id: 'OBGYN 4', code: 'OBGYN4' },
  'SURG 4': { id: 'SURG 4', code: 'SURG4' },
  'IM 4': { id: 'IM 4', code: 'IM4' },
  'PSY 4': { id: 'PSY 4', code: 'PSY4' },
  'FM 4': { id: 'FM 4', code: 'FM4' },
  'CM 4': { id: 'CM 4', code: 'CM4' },
  'PALL 4': { id: 'PALL 4', code: 'PALL4' },
  'RSCH 4': { id: 'RSCH 4', code: 'RSCH4' },
  // Year 5 (`KAU_MODULES['Year 5']`) — SURG/IM/FM again, same suffix rule.
  'SURG 5': { id: 'SURG 5', code: 'SURG5' },
  'IM 5': { id: 'IM 5', code: 'IM5' },
  'FM 5': { id: 'FM 5', code: 'FM5' },
}

/** The manifest row a paper is. */
export interface SourceRef {
  /** The manifest ID — `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json`. */
  id: string
  file: string
  /**
   * The module this paper was set for.
   *
   * Optional, defaulting to `101 ISK`, so the papers seeded before this was a
   * parameter keep meaning what they meant. A new paper should always say.
   */
  module?: string
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
  /**
   * The manifest ID of the same paper with answers written on it, where the
   * corpus holds one.
   *
   * Recorded because it is where the mark scheme comes from, and because how
   * much of it a student actually answered is a fact about the evidence: the
   * 2025 102 copy solves page 1 and the diagram blanks and leaves both matching
   * blocks and all four physiology essays untouched, so the expected points for
   * those come from the department book instead. A reader who does not know
   * that would take every `expects` line as a student's answer.
   */
  solvedCopy?: string
}

/** The module a source belongs to, resolved and checked against the catalogue. */
export function moduleOf(source: SourceRef): ModuleRef {
  const id = source.module ?? '101 ISK'
  const found = MODULES[id]
  if (!found) throw new Error(`${source.file}: "${id}" is not a module in the catalogue`)
  return found
}

/**
 * The subjects a Kasr concept can sit under.
 *
 * Not the manuals' list of eight, which is stale: the runtime catalogue
 * (`src/data/curriculumCatalog.ts`) carries twenty, and without `fnd`, `dev`
 * and `haem` a histology or embryology concept has nowhere honest to sit.
 *
 * All twenty are here rather than the eight Year 1 needed first. Module 108
 * needs `pharm` and 104 needs `inf`; widening this by three every time a module
 * arrives is how a list goes stale twice, and the runtime is the authority for
 * what a subject is either way.
 */
export type KasrSubject =
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
  subject: KasrSubject
  /**
   * The body-system code for the concept ID, where it is not the subject's
   * default. Required on `pharm`; see `DEFAULT_SYSTEM`.
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
  // `medical:audit` clean. The audit wants 28 fields populated and 22 more
  // merely present, which is the manual's floor of 50 of 52. Optional here
  // because a seed that omits one gets an explicit `field_notes` reason instead
  // of a blank, which is what the audit actually asks for.
  //
  // The emitter writes all of these columns (`emit.ts`, `conceptTail`), and
  // fills them from `seeds/links.ts` where the module has an evidence pass. A
  // seed may name one directly, which is what these fields are for — the 102
  // seed JSON does, and dropping them from the type would discard authored data
  // on load.

  /** The reviewed Arabic term. Researched, never transliterated on the fly. */
  arabicLabel?: string
  arabicAliases?: string[]
  /** The article that teaches this. It must list the concept back in `related_concepts`. */
  articleId?: string
  /** Articles that discuss it without owning it. */
  relatedArticleIds?: string[]
  /** The untyped "see also" neighbours. Typed edges are relations, not this. */
  relatedConceptIds?: string[]
  /** Evidence claims supporting it — `CLM-<SYS>-<SLUG>-NN`. Authored, never invented. */
  claimIds?: string[]
  /** Manifest `src_…` IDs. Every one must be in the evidence store. */
  resourceIds?: string[]
  /** Concepts deliberately NOT merged into this one, so nobody re-litigates it. */
  rejectedMergeCandidateIds?: string[]
  /**
   * The band this question was written at.
   *
   * Judged across the batch, not per file: the bank targets Easy 25 / Moderate
   * 55 / Hard 15 / Challenging 5, and a paper cannot be made to hit it without
   * lying about a question.
   */
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Challenging'
  /** The physical page of the source PDF, where it differs from `page`. */
  sourcePage?: number
  /** The overlay placement, where the curriculum names one. */
  topic?: string
  subtopic?: string
  microtopic?: string
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
  /**
   * The other two shapes a sat paper sets, on the same reasoning.
   *
   * The 2024 102 paper prints two fill-in-the-blank blocks, and papers with
   * diagrams print labelling ones. Neither is a written question and neither is
   * an MCQ, so without these a real section of a real paper again has nowhere
   * to live.
   */
  | 'completion' | 'labeling'
  /**
   * A question the paper sets as lettered options.
   *
   * Recorded so a `Paper` seed can hold the whole sitting, and **skipped by the
   * written batch**, which has no column for an option. Declaring one as
   * `short_answer` instead gives it a mark scheme it does not have and no
   * options, and the emitter then builds a part worth nothing — a question a
   * student meets and cannot pass.
   */
  | 'mcq_single_best'

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
   * A completion question's sentence, with its blanks inline as
   * `[[answer|also accepted]]`.
   *
   * This **is** the answer model for the format, the way options are for a
   * single-best-answer and `parts` are for a written one. A completion scheme
   * carrying `parts` instead gets refused twice over — "needs at least one
   * blank", and "written parts were given, but the format is completion".
   */
  completionText?: string
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
   *
   * **Including the options nothing matches.** The 2025 102 paper offers seven
   * options for five prompts, and the two spare ones are the question: a
   * student who knows glycine is the smallest amino acid still has to notice
   * that it is non-essential rather than reaching for "essential acidic".
   * Dropping them turns a discrimination into a lookup.
   *
   * Where a paper prints the options unlettered — an unlettered column the
   * student draws a line across, which is a shape the importer has no column
   * for — the letters are ours, and the loader that reads that paper says so.
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

/**
 * A concept ID is stable under *this* implementation, and not across history.
 *
 * `mintConceptId` is deterministic, and the byte-identity check in
 * `check-id-stability.ts` proves the current implementation reproduces what it
 * produced before. That is a narrower property than it sounds, and the
 * difference has already cost somebody a duplicate:
 *
 *     $ node "…/tools/mint-concept-id.mjs" FND teaching.pharma.loading.definition
 *     CON-FND-92FC0CBAED15B8
 *     ok — checked against 2353 existing IDs.
 *
 * The live concept whose `canonicalKey` is exactly that string is
 * `CON-FND-3CC86CC26BF549`. The tool reports "ok" because it checks whether the
 * *ID* it just minted collides, never whether the *canonical key* already
 * belongs to something. So it will happily mint a second ID for a concept that
 * exists, and tell you it is fine.
 *
 * **For a record that already exists, look the ID up. Never re-derive it.** An
 * update row carries the real `## id` off live state; minting one is how a
 * three-field improvement becomes a duplicate record. This is the same family
 * of error as inferring a body-system code from a subject: a value that looks
 * derivable and is not.
 */

/**
 * The body-system codes a concept ID may carry.
 *
 * `tools/mint-concept-id.mjs` is the authority for the list, and it is explicit
 * that these are **body systems, not subject IDs** — renal is `REN`, gi is
 * `GIT`, resp is `RES`.
 */
export type BodySystem =
  | 'AND' | 'CVS' | 'DER' | 'DEV' | 'END' | 'FND' | 'GIT' | 'GYN' | 'HEM'
  | 'IMM' | 'INF' | 'MSK' | 'MUL' | 'NEU' | 'OBS' | 'POP' | 'PSY' | 'REN' | 'RES'

/**
 * The rule, stated once rather than as two special cases.
 *
 * **The `CON-` code is a taxonomy-namespace label. The subject is a separate
 * field. Never infer one from the other.**
 *
 * Two consequences that look like bugs and are not:
 *
 * - `CON-HEM-*` holds both the legacy `subjectId: 'medical'` extraction records
 *   and the new Year 1 `subjectId: 'haem'` ones. That is one namespace holding
 *   two subjects, and it is correct.
 * - `CON-FND-*` holds general pharmacology (`subjectId: 'pharm'`, 85 records)
 *   and will hold general pathology from module 108. Also correct, also not a
 *   collision.
 *
 * The error is the inference, which is why `systemFor` refuses to guess for the
 * one subject where the code is genuinely ambiguous rather than quietly picking.
 */

/**
 * The code to use when a seed does not name one.
 *
 * A **default**, not a mapping: subject and body system are decoupled in live
 * state and this table cannot express that. Counted over all 1,718 concepts in
 * `server/data/medical-library-v1.json`:
 *
 * | subject | concepts | codes they actually carry |
 * |---|--:|---|
 * | `pharm` | 206 | `FND` × 85, `INF` × 121 — **never** one pharmacology code |
 * | `cvs` `neuro` `gi` `msk` `resp` `renal` `endo` | 776 | their own code, always |
 * | `haem` `fnd` `dev` `imm` `inf` `mul` `pop` | **0** | no live concept uses them yet |
 *
 * So `pharm` is deliberately **absent** from this table. A drug concept is
 * placed by what the drug acts on — general pharmacology under `FND`, the
 * anti-infectives under `INF` — and there is no honest default for "a drug".
 * Guessing produced `CON-MUL-…`, a namespace with **zero** members in the whole
 * library, which would have minted a second copy of concepts that already exist
 * under `CON-FND-…` and split a student's mastery across the pair. That is
 * exactly what `mintConceptId`'s own comment exists to prevent, so a `pharm`
 * seed must name its `system` and is refused without one.
 *
 * `haem`, `fnd` and `dev` have no live precedent either, but they are also not
 * ambiguous — a blood concept is `HEM` — so they keep a default. The 122
 * `CON-HEM-*`, 111 `CON-DEV-*` and 133 `CON-IMM-*` records that do exist all
 * carry `subjectId: 'medical'`, which `00-START-HERE.md` §3 names as legacy
 * extraction data and not a subject anyone may use. Year 1 is establishing that
 * convention rather than following one.
 *
 * The first eight entries are the `SYSTEM` table this replaces, value for
 * value, so every 101 concept keeps the prefix it was minted with.
 */
const DEFAULT_SYSTEM: Partial<Record<KasrSubject, BodySystem>> = {
  msk: 'MSK', fnd: 'FND', dev: 'DEV', haem: 'HEM',
  cvs: 'CVS', resp: 'RES', gi: 'GIT', neuro: 'NEU',
  renal: 'REN', endo: 'END', imm: 'IMM', inf: 'INF',
  obs: 'OBS', gyn: 'GYN', androl: 'AND', psy: 'PSY', derm: 'DER',
  mul: 'MUL', pop: 'POP',
}

/** The code for a subject, or the explicit override a seed carries. */
export function systemFor(subject: KasrSubject, override?: BodySystem): BodySystem {
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
 * `CON-<SYS>-<14 hex>`, minted from the module and the canonical key.
 *
 * Deliberately not from the paper: two papers that ask the same thing must mint
 * the same concept, or a module ends up with four decidua concepts and a student
 * whose mastery is split four ways across them.
 *
 * The module was always in the hash — the template read `kau:101 ISK:${key}` —
 * and it stays in the same position, so passing `101 ISK` reproduces every
 * concept ID already authored for that module byte for byte. It does mean two
 * modules teaching the same idea mint two concepts; that is a real duplicate,
 * and §4 of the manual is how it gets found, not this function.
 */
export function mintConceptId(
  module: string, subject: KasrSubject, key: string, system?: BodySystem,
): string {
  return `CON-${systemFor(subject, system)}-${conceptHash(module, key)}`
}

/**
 * The part of a concept ID that identifies the idea, without the subject.
 *
 * The subject only selects the prefix, so the same key under two subjects gives
 * one hash behind two prefixes — `CON-DEV-B84639…` and `CON-MSK-B84639…` are
 * two IDs for one concept, and nothing at import time would notice. Exposing
 * the hash lets `subjectCollisions` find that by looking, rather than leaving it
 * to a convention two authors have to remember.
 *
 * The module is hashed and the subject is not, which is the asymmetry that
 * matters: two modules asking one thing are two concepts, two subjects filing
 * one key are one concept minted twice.
 */
export function conceptHash(module: string, key: string): string {
  return createHash('sha256').update(`kau:${module}:${key}`).digest('hex').toUpperCase().slice(0, 14)
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
 * human rather than a default to fall back on. The rules are 101's own
 * curriculum headings, so a path from another module falls through to null and
 * is left alone rather than being forced onto 101's tree.
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
 * `QW-<code>-<12 hex>`, minted from the module, the paper and the question.
 *
 * The opposite rule to a concept: the same question on two papers is two
 * questions, because each is a separate occurrence and the blueprint counts
 * occurrences.
 *
 * As above, the module sits where it sat when it was hardcoded, so 101's
 * question IDs are unchanged.
 */
export function mintQuestionId(source: SourceRef, seed: Seed): string {
  const module = moduleOf(source)
  const hash = createHash('sha256')
    .update(`kau:${module.id}:${source.id}:${seed.section}:${seed.q}`).digest('hex').toUpperCase()
  return `QW-${module.code}-${hash.slice(0, 12)}`
}

/** A question's key in a paper's scheme table: section initial plus number. */
export const partsKey = (seed: Seed) => `${seed.section[0].toUpperCase()}${seed.q}`
