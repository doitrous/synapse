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

interface JsonSeed extends Omit<Seed, 'subject' | 'system'> {
  subject: string
  system?: string
  difficulty?: string
  sourcePage?: number
}

interface JsonPaper {
  source: SourceRef & { module: string, solvedCopy?: string }
  seeds: JsonSeed[]
  schemes: Record<string, Scheme & {
    matchingOptions?: string[]
    matchingPrompts?: string[]
  }>
  mediaRequests?: MediaRequest[]
  unsat?: { scheme: string, issue: string, blockedOn?: string }[]
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
    return { ...seed, subject: seed.subject as KasrSubject, system: seed.system as BodySystem | undefined }
  })

  for (const [key, scheme] of Object.entries(json.schemes)) {
    for (const part of scheme.parts ?? []) {
      if (part.conceptKey && !keys.has(part.conceptKey)) {
        problems.push(`scheme ${key} part (${part.letter}): conceptKey "${part.conceptKey}" matches no seed`)
      }
    }
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
    schemes: json.schemes,
    mediaRequests: json.mediaRequests ?? [],
    unsat: json.unsat ?? [],
    difficulty: Object.fromEntries(json.seeds.filter((s) => s.difficulty).map((s) => [s.key, s.difficulty!])),
  }
}
