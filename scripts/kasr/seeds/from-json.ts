/**
 * A paper read into JSON, loaded as a `Paper`.
 *
 *   import { paperFromJson } from './from-json.ts'
 *
 * The 101 seeds are hand-written TypeScript, which is right for one paper and
 * does not scale to twenty-two: an agent reading a paper produces JSON, and
 * transcribing that into a `.ts` literal by hand is a step that can only lose
 * fidelity. So the JSON *is* the seed file, and this validates it on the way in.
 *
 * The validation matters more than the loading. A seed that names a
 * `modulePath` no chapter uses, or a `conceptKey` no seed defines, is a silent
 * mis-filing rather than an error — the importer takes the path as written and
 * resolves it to nothing. Both are checked here, where the file is read, rather
 * than being discovered by a reviewer opening the tree.
 */
import { readFileSync } from 'node:fs'
import {
  MODULES, type BodySystem, type KasrSubject, type Paper, type Scheme, type Seed, type SourceRef,
} from './types.ts'

interface JsonSeed extends Omit<Seed, 'subject' | 'system' | 'difficulty'> {
  subject: string
  system?: string
  /**
   * The band, as JSON spells it — a string until it has been checked.
   *
   * `Seed.difficulty` is the four-word union the emitter reads, and a fifth
   * word would fall through every ternary in `writtenBlock` to the "Moderate"
   * arm. That is a mis-banded question the batch reports as banded, so an
   * unknown word is refused here rather than quietly averaged.
   */
  difficulty?: string
  sourcePage?: number
}

/** The bands `Seed.difficulty` allows, so a typo cannot become "Moderate". */
const DIFFICULTIES: Seed['difficulty'][] = ['Easy', 'Moderate', 'Hard', 'Challenging']

/**
 * A matching block as this corpus's JSON writes it, and as `Scheme` holds it.
 *
 * The JSON carries the two halves already flattened — `"A | text"` and
 * `"prompt = A"` — because that is what the importer's own columns look like.
 * `Scheme` holds them structured, which is the shape the 101 seeds use and the
 * shape `emit.ts` formats from. Parsed on the way in rather than kept as
 * strings: two spellings of "this scheme is a matching block" in one codebase
 * is worse than either, and the structured one is the one already on main.
 */
interface JsonScheme extends Omit<Scheme, 'options' | 'matches'> {
  /** `A | Essential sulfur containing amino acid` */
  matchingOptions?: string[]
  /** `Glycine = C` */
  matchingPrompts?: string[]
}

interface JsonPaper {
  source: SourceRef & { module: string, solvedCopy?: string }
  seeds: JsonSeed[]
  schemes: Record<string, JsonScheme>
  mediaRequests?: MediaRequest[]
  unsat?: { scheme: string, issue: string, blockedOn?: string }[]
}

/**
 * Split `A | text` and `prompt = A` into the pairs `Scheme` holds.
 *
 * Split once, on the first separator, because an option's text may itself
 * contain the separator — "Explains why the estimated number of proteins much
 * exceeds the number of genes" does not, but a prompt like `3'-Phosphoadenosine-
 * 5'-phosphosulfate (PAPS) = D` has to keep everything before the last ` = `.
 * A malformed line is reported rather than silently producing a blank letter,
 * which would import as a matching question nothing can be matched against.
 */
function matchingBlock(key: string, scheme: JsonScheme, problems: string[]): Pick<Scheme, 'options' | 'matches'> {
  if (scheme.format !== 'matching') return {}
  const options = (scheme.matchingOptions ?? []).map((line) => {
    const at = line.indexOf(' | ')
    if (at < 0) { problems.push(`scheme ${key}: matching option "${line}" is not "<letter> | <text>"`); return null }
    return { letter: line.slice(0, at).trim(), text: line.slice(at + 3).trim() }
  }).filter((one) => one !== null)
  const letters = new Set(options.map((one) => one.letter))
  const matches = (scheme.matchingPrompts ?? []).map((line) => {
    const at = line.lastIndexOf(' = ')
    if (at < 0) { problems.push(`scheme ${key}: matching prompt "${line}" is not "<prompt> = <letter>"`); return null }
    const letter = line.slice(at + 3).trim()
    if (!letters.has(letter)) {
      problems.push(`scheme ${key}: matching prompt "${line}" answers "${letter}", which is not one of its options`)
    }
    return { prompt: line.slice(0, at).trim(), letter }
  }).filter((one) => one !== null)
  if (!options.length) problems.push(`scheme ${key}: format is matching but it lists no options`)
  if (!matches.length) problems.push(`scheme ${key}: format is matching but it lists no prompts`)
  return { options, matches }
}

export interface MediaRequest {
  forScheme: string
  heading: string
  brief: string
  purpose: string
  priority: string
  status: string
  kind?: string
  sourceDirection?: string
  rights?: string
}

export interface LoadedPaper extends Paper {
  mediaRequests: MediaRequest[]
  unsat: { scheme: string, issue: string, blockedOn?: string }[]
  /** Per-seed difficulty, where the reading assigned one. Keyed by canonical key. */
  difficulty: Record<string, string>
}

/**
 * Every `subjectPath` the module's own subject tree defines.
 *
 * A `module_subject` path is stored as written and matched against the tree by
 * name; a path that stops matching partway resolves to **nothing** and files
 * the item nowhere. Checking it against the tree here is the only place that
 * catches a chapter renamed underneath a seed.
 */
function knownPaths(module: string): Set<string> {
  const slug = module.replace(/\s+/g, '-')
  const paths = new Set<string>()
  for (const half of ['biochem', 'physio']) {
    const file = `scripts/kasr/extract/${slug}/${half}-chapters.json`
    for (const chapter of JSON.parse(readFileSync(file, 'utf8'))) paths.add(chapter.subjectPath)
  }
  return paths
}

export function paperFromJson(file: string): LoadedPaper {
  const json: JsonPaper = JSON.parse(readFileSync(file, 'utf8'))
  const module = json.source.module
  if (!MODULES[module]) throw new Error(`${file}: "${module}" is not a module in the catalogue`)

  const paths = knownPaths(module)
  const problems: string[] = []
  const keys = new Set(json.seeds.map((seed) => seed.key))

  const seeds: Seed[] = json.seeds.map((seed) => {
    if (!paths.has(seed.modulePath)) {
      problems.push(`${seed.section} Q${seed.q}: modulePath "${seed.modulePath}" is not a chapter in the ${module} tree`)
    }
    if (seed.difficulty && !DIFFICULTIES.includes(seed.difficulty as Seed['difficulty'])) {
      problems.push(
        `${seed.section} Q${seed.q}: difficulty "${seed.difficulty}" is not one of `
        + `${DIFFICULTIES.join(', ')} — an unknown band is emitted as Moderate and looks authored`)
    }
    return {
      ...seed,
      subject: seed.subject as KasrSubject,
      system: seed.system as BodySystem | undefined,
      difficulty: seed.difficulty as Seed['difficulty'],
    }
  })

  const schemes: Record<string, Scheme> = {}
  for (const [key, scheme] of Object.entries(json.schemes)) {
    for (const part of scheme.parts ?? []) {
      if (part.conceptKey && !keys.has(part.conceptKey)) {
        problems.push(`scheme ${key} part (${part.letter}): conceptKey "${part.conceptKey}" matches no seed`)
      }
    }
    const { matchingOptions: _options, matchingPrompts: _prompts, ...rest } = scheme
    // A completion question's blanks are its answer model. One with no `[[…]]`
    // is a sentence nothing can be marked against, and the importer says so —
    // better to hear it here, naming the scheme, than as a row-level refusal.
    if (scheme.format === 'completion') {
      if (!scheme.completionText?.includes('[[')) {
        problems.push(`scheme ${key}: format is completion but completionText has no [[blank]]`)
      }
      if (scheme.parts?.length) {
        problems.push(`scheme ${key}: format is completion but it also carries written parts — the importer refuses both`)
      }
    }
    schemes[key] = { ...rest, ...matchingBlock(key, scheme, problems) }
  }
  for (const seed of seeds) {
    const key = `${seed.section[0].toUpperCase()}${seed.q}`
    if (!json.schemes[key]) problems.push(`${seed.section} Q${seed.q}: no mark scheme under "${key}"`)
  }
  for (const request of json.mediaRequests ?? []) {
    if (!json.schemes[request.forScheme]) {
      problems.push(`media request "${request.heading}": forScheme "${request.forScheme}" matches no scheme`)
    }
  }

  if (problems.length) throw new Error(`${file}:\n  ${problems.join('\n  ')}`)

  return {
    source: json.source,
    seeds,
    schemes,
    mediaRequests: json.mediaRequests ?? [],
    unsat: json.unsat ?? [],
    difficulty: Object.fromEntries(json.seeds.filter((s) => s.difficulty).map((s) => [s.key, s.difficulty!])),
  }
}
