/**
 * Turn a paper's seeds into the batches the importer reads.
 *
 * Copied from `scripts/kasr/emit.ts`. The shared toolchain manual asks that
 * field semantics stay byte-identical to Kasr's so the two universities'
 * batches can be compared — this file is where a field's meaning is fixed,
 * and it is copied rather than rewritten for that reason.
 *
 * Two real differences from Kasr's copy, both load-bearing:
 *
 * 1. **Concept IDs are not salted by module or university any more.**
 *    `mintConceptId(subject, key, system)` (`seeds/types.ts`) now matches the
 *    shared minting law (`tools/mint-concept-id.mjs`) exactly: `CON-<SYS>-` +
 *    `sha256(canonicalKey)`, no module, no `kau:`/`asu:` prefix. So the same
 *    medical idea mints the same ID whether it was first read at Kasr or at
 *    Ain Shams — universities, years and modules are overlays on a concept,
 *    never part of its identity. `build-batches.ts` looks every ID up against
 *    live state and every pending batch before deciding whether to write a
 *    full concept record or a sparse update.
 * 2. **`KAU_Y1` is not a constant.** Kasr is a single-year toolchain and wrote
 *    the literal `KAU_Y1` in six places; Ain Shams spans Years 1, 2 and 3 in
 *    one toolchain, so every one of those six now reads `module.yearId`, and
 *    `## years` is derived from it rather than hardcoded to `Year 1`.
 *
 * Concepts deduplicate across papers **and across universities**, now that the
 * ID carries no university. A concept is the thing being examined; two
 * universities teaching the same idea are two occurrences of one concept, not
 * two concepts — the same rule Kasr's own comment states for two papers.
 */
import { createHash } from 'node:crypto'
import {
  mintConceptId, mintQuestionId, moduleOf, partsKey,
  type ModuleRef, type Paper, type Seed, type SourceRef,
} from './seeds/types.ts'
import type { ConceptLinks } from './seeds/links.ts'
import type { BankRow, McqAuthored, McqConcept, McqLeafSeed } from './seeds/mcq.ts'
import type { ExistingConcept } from './seeds/existing.ts'
import { readFileSync } from 'node:fs'

/** `ASU_Y2` -> `2`. Throws rather than defaulting — see Kasr's `TIER_PREFIX` for why a silent fallback here is the dangerous kind of bug. */
export function yearNumber(yearId: string): number {
  const match = yearId.match(/_Y(\d+)$/)
  if (!match) throw new Error(`"${yearId}" is not a "..._Y<N>" year ID — cannot derive a year number from it`)
  return Number(match[1])
}

/**
 * The claims each concept asserts, by concept ID.
 *
 * Written by `build-evidence.ts`, which reads the concept batches and splits
 * each definition into its sentences. Empty on a first run, before any claims
 * exist — that is the honest state, not an error: `atomic_claim_ids` then
 * says `[clear]`.
 */
const CLAIMS_FOR_CONCEPT: Record<string, string[]> = (() => {
  try { return JSON.parse(readFileSync('scripts/asu/seeds/claim-links.json', 'utf8')) }
  catch { return {} }
})()

/**
 * Where a concept was examined, in the `exam_signal` column's own grammar.
 */
const occurrence = (source: SourceRef, seed: Seed) =>
  `${source.id} | ${source.tier} | ${source.sittingYear} | p${seed.page} | ${moduleOf(source).id}`

/**
 * How much of the paper this concept is worth, as a 0–1 weight.
 *
 * Its marks over the paper's total, lifted by each further sitting it appears
 * on. A thing asked in three years running is worth more of a student's time
 * than its marks on any one paper say, and repetition is the only evidence in
 * this corpus for that.
 */
export const blueprintWeight = (seed: Seed, paperMarks: number, sittings: number) =>
  Math.min(1, (seed.marks / Math.max(paperMarks, 1)) * (1 + 0.5 * sittings)).toFixed(2)

/** Same weight formula `mcqConceptBlock` uses internally, exported so `build-batches.ts` can compute the same figure for a sparse update record without duplicating the constants. */
export const mcqConceptWeight = (signalCount: number) => Math.min(1, 0.15 + 0.08 * signalCount).toFixed(2)

export function conceptBlock(
  source: SourceRef, seed: Seed, alsoSeenOn: string[] = [],
  context: {
    paperMarks?: number; articleId?: string; relatedArticleIds?: string[]
    /** What this concept is taught by and supported by, where the module has had its evidence pass. */
    links?: ConceptLinks
  } = {},
): string {
  const module = moduleOf(source)
  const articleId = context.links?.articleId ?? context.articleId
  const signals = [occurrence(source, seed), ...alsoSeenOn].join('\n')
  const weight = blueprintWeight(seed, context.paperMarks ?? 81, alsoSeenOn.length)
  const clinical = seed.type === 'clinical_correlation'
  const path = seed.modulePath.split(' > ')
  const year = yearNumber(module.yearId)
  return `# Item
## label
${seed.label}
## id
${mintConceptId(seed.subject, seed.key, seed.system)}
## canonical_key
${seed.key}
## definition
${seed.definition}
## explicit_objective
${seed.objective}
## pitfalls
${seed.pitfall}
## concept_type
${seed.type}
## status
under review
## subject
${seed.subject}
## primary_node_id
${seed.primary}
## secondary_node_ids
${seed.secondary.join(' | ') || '[clear]'}
## modules
${module.id}
## module_subject
${seed.modulePath}
## universities
asu
## learner_years
${year}
## exam_signal
${signals}
## weight_confidence
${alsoSeenOn.length ? '0.9' : '0.7'}
## blueprint_weight
${weight}
## exam_weight_by_year
${module.yearId}=${weight}
## clinical_relevance
${clinical ? '0.8' : '0.3'}
## academic_relevance
0.9
## confidence
${alsoSeenOn.length ? '0.9' : '0.75'}
## topic
${path[1] ?? seed.section}
## subtopic
${path[2] ?? path.at(-1) ?? ''}
## aliases
${(seed.aliases ?? []).join(' | ') || '[clear]'}
${articleId ? `## article_ids\n${articleId}\n` : ''}## support_mode
direct_statement
## original_wording
[${seed.section} Q${seed.q}, ${seed.marks} marks] ${seed.asked}
## conflicts
${(seed.conflicts ?? []).join('\n') || '[clear]'}
## uncertainty
${seed.uncertainty || '[clear]'}
## evidence_gaps
${(seed.gaps ?? []).join('\n') || '[clear]'}
${conceptTail(
  context.relatedArticleIds ?? [],
  mintConceptId(seed.subject, seed.key, seed.system),
  context.links, seed,
)}`
}

/**
 * A sparse UPDATE record for a concept ID that already exists — live, in
 * either import-ready queue, or in any university's pending Source-Imports
 * batches.
 *
 * The manual's own rule: "An update is deliberately sparse — id + the
 * discriminating columns + the fields you are changing" (02-concepts.md). No
 * `fieldsUsed` floor applies to it and `medical:simulate` should report
 * `created: 0, updated: 1`.
 *
 * `universities`, `learner_years` and `modules` are genuine list columns —
 * `conceptImport.ts` reads them through `optionalList`, which understands a
 * leading `+` as append (`src/data/importSemantics.ts`) — so those three are
 * written as `+asu` / `+<year>` / `+<module id>`.
 *
 * `module_subject` does NOT get the `+` treatment, and this was verified
 * empirically, not assumed — a first draft wrote `+<path>` per an explicit
 * instruction that the append convention covers it, and it does not.
 * Confirmed two ways: reading `conceptFromRow`
 * (`src/data/conceptImport.ts:185-187`) shows `module_subject` going through
 * `parseModuleSubjectPaths` directly, never through
 * `optionalList`/`listDirective`, so nothing marks the resulting array with
 * `isAppend` and `mergeAuthoringData` (`src/data/importMerge.ts:44-56`) has no
 * signal to append rather than replace; and running a real `+<path>` row
 * through `medical:simulate` against a genuine live concept
 * (`CON-FND-7EC14E00DE2EAE`) stored `moduleSubjectPaths: ["+ASU-CVS >
 * Anatomy > …"]` — the plus sign landed in the data. So this writes the full
 * merged list instead: the existing paths the lookup found, plus this one,
 * with no `+`.
 *
 * `exam_signal` and `exam_weight_by_year` go through neither `optionalList` nor a `+`-aware directive
 * (`parseExamAppearances` and `weightMap`, `conceptImport.ts:188-192` and
 * `:178`). Both are written here as a full replace — the existing value the
 * lookup found, merged with what this build is adding — rather than trusted
 * to append on their own.
 *
 * `exam_weight_by_year` turns out not to have needed that: it is a plain
 * `Record<string, number>`, and `mergeConcept` runs the **whole** concept
 * through `mergeAuthoringData` (`src/data/importMerge.ts:44-56`), which
 * recurses into nested plain objects key-by-key rather than replacing them —
 * the same mechanism that lets `field_notes` accumulate. So even a bare
 * `## exam_weight_by_year\nASU_Y1=0.5` would merge with an existing `KAU_Y1`
 * entry rather than evict it. Merging by hand here anyway, because it costs
 * nothing, makes the emitted row self-describing without reading the
 * importer's merge code, and does not depend on `exam_weight_by_year`
 * staying a plain object rather than becoming a list some day.
 *
 * `## label` is written unconditionally, carrying `existing.label` —
 * measured, not assumed: `detectBatchKind` (`src/data/batchKind.ts:44`)
 * recognises a row as a concept only by `has('label') || has('canonical_key')`,
 * and a first draft of this function that wrote neither produced a batch
 * `medical:batch` and `medical:simulate` both read as `kind: "unknown"` and
 * silently skipped — no error, just nothing applied. So a sparse update is
 * not "id + only what changed" in the strictest reading; it is "id + at
 * least one detector column + only what changed". Re-emitting the record's
 * own existing label rather than this build's newly-authored one, so an
 * update never overwrites another university's phrasing of the same idea
 * just to satisfy the detector.
 */
export function conceptUpdateBlock(
  id: string, existing: ExistingConcept, module: ModuleRef,
  modulePath: string, newSignal: string, newWeight: string,
): string {
  const year = yearNumber(module.yearId)
  const lines = ['# Item', '## id', id, '## label', existing.label || id]
  if (!existing.universities.includes('asu')) lines.push('## universities', '+asu')
  if (!existing.learnerYears.includes(year)) lines.push('## learner_years', `+${year}`)
  if (!existing.moduleIds.includes(module.id)) lines.push('## modules', `+${module.id}`)
  const modulePaths = existing.moduleSubjectPaths.includes(modulePath)
    ? existing.moduleSubjectPaths
    : [...existing.moduleSubjectPaths, modulePath]
  if (modulePaths.length) lines.push('## module_subject', modulePaths.join('\n'))
  const examSignal = existing.examSignal.includes(newSignal) ? existing.examSignal : [...existing.examSignal, newSignal]
  lines.push('## exam_signal', examSignal.join('\n'))
  const weightByYear = new Map(existing.examWeightByYear.map((line) => {
    const at = line.indexOf('=')
    return [line.slice(0, at), line.slice(at + 1)] as const
  }))
  weightByYear.set(module.yearId, newWeight)
  lines.push('## exam_weight_by_year', [...weightByYear.entries()].map(([y, w]) => `${y}=${w}`).join(' | '))
  return `${lines.join('\n')}\n`
}

/** The `exam_signal` line a concept block would carry for this seed — exposed so `build-batches.ts` can pass it to `conceptUpdateBlock` without recomputing the grammar. */
export const conceptOccurrence = occurrence

/**
 * The columns every concept carries regardless of where it came from.
 *
 * Unchanged from Kasr's `conceptTail` — see that file for the field-by-field
 * rationale behind `[clear]` vs an empty `## key` block vs a named absence,
 * and for why `reviewer`/`final_publisher` carry the manual's documented
 * defaults rather than `[clear]`.
 */
function conceptTail(
  relatedArticleIds: string[] = [], conceptId?: string,
  links?: ConceptLinks, seed?: Seed,
): string {
  const list = (key: string, values: string[] | undefined) =>
    `## ${key}\n${values?.length ? values.join(' | ') : '[clear]'}`

  const scalar = (key: string, value: string | undefined) =>
    `## ${key}\n${value?.trim() ?? ''}`

  const presence = [
    scalar('arabic_label', seed?.arabicLabel),
    list('arabic_aliases', seed?.arabicAliases),
    `## microtopic\n${seed?.microtopic ?? '[clear]'}`,
    '## nanotopic\n[clear]',
    list('related_concept_ids', seed?.relatedConceptIds),
    list('related_article_ids',
      links?.relatedArticleIds?.length ? links.relatedArticleIds
        : relatedArticleIds.length ? relatedArticleIds : seed?.relatedArticleIds),
    // Kasr's fallback is its own department book, a Kasr-specific manifest
    // source ID. This toolchain has no equivalent fallback yet — the Ain
    // Shams department books have not been indexed — so a concept with
    // nothing else named simply gets no `resource_ids`, which is honest: the
    // audit reports it absent rather than pointing at a source that is not
    // this corpus's own book.
    list('resource_ids',
      links?.resourceIds?.length ? links.resourceIds
        : seed?.resourceIds?.length ? seed.resourceIds : undefined),
    list('approved_file_resource_ids', undefined),
    list('approved_video_resource_ids', undefined),
    list('atomic_claim_ids',
      links?.claimIds?.length ? links.claimIds
        : seed?.claimIds?.length ? seed.claimIds
          : conceptId ? CLAIMS_FOR_CONCEPT[conceptId] : undefined),
    list('resource_occurrence_ids', undefined),
    list('source_candidate_ids', undefined),
    list('merge_ids', undefined),
    list('rejected_merge_candidate_ids', seed?.rejectedMergeCandidateIds),
    scalar('exclusion_reason', undefined),
    scalar('reviewer', 'Medical team, Admin team'),
    scalar('final_publisher', 'Admin team'),
    scalar('last_reviewed', undefined),
    scalar('review_due', undefined),
  ].join('\n')

  return `${presence}
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
aliases: Filled where a paper or a student uses another name for the same thing; [clear] where this concept is known by one name only.
arabicLabel: Arabic terminology has not been researched; it is filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
atomicClaimIds: The claims this concept's definition asserts, generated by build-evidence.ts. Empty only where the definition yields no sentence long enough to stand as a claim.
approvedFileResourceIds: As above — no approved file resources exist for this module.
approvedVideoResourceIds: This faculty distributes no video for this module.
resourceOccurrenceIds: Occurrences are recorded on exam_signal, which names the manifest source, page and sitting; there are no resource records to point at yet.
sourceCandidateIds: The source is known exactly, not a candidate — it is named on exam_signal.
relatedConceptIds: Left for the relations pass, which types the edges rather than guessing an untyped neighbour list.
relatedArticleIds: The article that teaches this concept is on article_ids; further reading is chosen when the library for this module is complete.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: No merge has been proposed or rejected.
exclusionReason: This concept is not excluded; it is awaiting evidence, which publication_status records.
reviewer: No faculty reviewer has seen this yet.
finalPublisher: Not published — it has not passed the evidence gate.
lastReviewed: Never reviewed.
reviewDue: A review date is set when a reviewer is assigned; setting one now would be a date nobody agreed to.`
}

/**
 * The written question for one number on the paper.
 *
 * Unchanged from Kasr's `writtenBlock` except `KAU_Y1` -> `module.yearId` and
 * `## years` derived from it, and `mintConceptId` calls dropping the module
 * argument.
 */
export function writtenBlock(
  paper: Paper,
  seeds: Seed[],
  articleFor: (conceptId: string) => string | undefined,
  mediaFor: (schemeKey: string) => string[] = () => [],
): string {
  const { source } = paper
  const [seed] = seeds
  const scheme = paper.schemes[partsKey(seed)]
  if (!scheme) throw new Error(`${source.file}: no mark scheme for ${partsKey(seed)}`)

  const module = moduleOf(source)
  const byKey = new Map(seeds.map((one) => [one.key, mintConceptId(one.subject, one.key, one.system)]))
  const conceptId = byKey.get(seed.key)!
  const total = paper.seeds.reduce((sum, other) => sum + other.marks, 0)

  const parts = scheme.parts?.length
    ? scheme.parts.map((part) => {
      const marks = seed.marks / scheme.parts!.length
      const partConcept = part.conceptKey ? byKey.get(part.conceptKey) ?? conceptId : conceptId
      return `### (${part.letter}) ${Number(marks.toFixed(2))} marks\n${part.prompt}\n`
        + part.expects.map((point) => `Expects: ${point}`).join('\n')
        + `\nConcept: ${partConcept}`
    }).join('\n')
    : `### (a) ${seed.marks} marks\n${scheme.prompt}\n`
      + scheme.expects.map((point) => `Expects: ${point}`).join('\n')
      + `\nConcept: ${conceptId}`

  const relevance = Math.min(10, (seed.marks / total) * 10 * paper.seeds.length).toFixed(1)
  const clinical = seeds.some((one) => one.type === 'clinical_correlation')
  const articles = [...new Set([...byKey.values()].map(articleFor).filter(Boolean))]
  const askedAll = seeds.map((one) => one.asked).join(' ')
  const requests = mediaFor(partsKey(seed))
  const year = yearNumber(module.yearId)

  const banded = seed.difficulty
    ? `## inferred_difficulty\n${
      seed.difficulty === 'Easy' ? 75
        : seed.difficulty === 'Hard' ? 30
          : seed.difficulty === 'Challenging' ? 15
            : 55}\n`
      + `## cognitive_effort_score\n${
        seed.difficulty === 'Easy' ? '0.3'
          : seed.difficulty === 'Hard' ? '0.75'
            : seed.difficulty === 'Challenging' ? '0.9'
              : '0.5'}\n`
    : ''

  return `# Item
## id
${mintQuestionId(source, seed)}
## title
${seed.label}
## subject
${seed.subject}
## status
Draft
## format
${scheme.format}
## question
${scheme.prompt}
${scheme.format === 'matching'
  ? `## matching_options\n${(scheme.options ?? []).map((one) => `${one.letter} | ${one.text}`).join('\n')}\n`
    + `## matching_prompts\n${(scheme.matches ?? []).map((one) => `${one.prompt} = ${one.letter}`).join('\n')}`
  : scheme.format === 'completion'
    ? `## completion_text\n${scheme.completionText ?? ''}`
    : `## written_parts\n${parts}`}
## main_concept
${[...byKey.values()].join(' | ')}
## topic
${seed.section}
## subtopic
${seed.modulePath.split(' > ').slice(-1)[0]}
## module
${module.id}
## module_subject
${[...new Set(seeds.map((one) => one.modulePath))].join('\n')}
## universities
asu
## years
Year ${year}
## question_only_for
${module.yearId}
## difficulty
${seed.difficulty ?? (seed.marks >= 6 ? 'Hard' : 'Moderate')}
## question_type
${clinical ? 'Clinical application' : 'Structure and function'}
## learning_objective
${seeds.map((one) => one.objective).join(' ')}
## setting
Academic
## academic_relevance
0.9
## clinical_relevance
${clinical ? '0.8' : '0.3'}
## exam_relevance
${relevance}
## exam_weight_by_year
${module.yearId}=${(Number(relevance) / 10).toFixed(2)}
## concept_ids
[clear]
## contextual_concept_ids
[clear]
${banded}## cognitive_effort
${seed.difficulty === 'Challenging' || seed.difficulty === 'Hard' ? 'High'
    : seed.difficulty === 'Easy' ? 'Low'
      : seed.difficulty === 'Moderate' ? 'Medium'
        : seed.marks >= 6 ? 'High' : 'Medium'}
## reasoning_level
${clinical ? '3' : '1'}
## estimated_seconds
${seed.marks * 60}
${articles.length ? `## library_ids\n${articles.join('\n')}\n` : ''}## owner
Claude
## source_citation
${source.file} — Ain Shams ${source.tier.replace(/_/g, ' ')} ${source.sittingYear}, ${seed.section} Q${seed.q}, p${seed.page}. Manifest ${source.id}.
${requests.length ? `## media_recommendations\n${requests.join('\n')}\n` : ''}## author_notes
Transcribed from the paper, not derived. The examiner's wording was: "${askedAll}"
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
${scheme.parts?.length
  ? `The paper printed ${scheme.parts.length} lettered subparts and one total of ${seed.marks} marks, so the letters divide it evenly. The per-letter figure is not the examiner's.`
  : `Per-element marks are not the examiner's — the paper gave ${seed.marks} for the whole question and named the elements. The scheme apportions.`}
${byKey.size > 1 ? `This question is co-primary on ${byKey.size} concepts: its subparts test things a student can know separately.` : 'No vignette: this paper states its cases inside the question itself, so there is no separate stem.'}
No derived_from: transcribed rather than derived, so there is nothing to name.`
}

/**
 * Columns where `[clear]` is stored as the literal four characters.
 *
 * Unchanged from Kasr's list — see that file's `TEXT_COLUMNS` comment for
 * how it was measured (`check-column-parsers.ts`) and why `subtopic`,
 * `microtopic` and `nanotopic` are deliberately absent from it.
 */
const TEXT_COLUMNS = [
  'arabic_label', 'canonical_key', 'concept_type', 'definition',
  'editorial_review_status', 'exclusion_reason', 'explicit_objective',
  'final_publisher', 'id', 'label', 'last_reviewed', 'owner', 'pitfalls',
  'primary_node_id', 'publication_status', 'review_due', 'reviewer',
  'support_mode',
]

/**
 * A batch file: a comment explaining itself, then the items.
 *
 * Unchanged from Kasr's `batchFile` — same refusal, same reasoning.
 */
export const batchFile = (header: string, blocks: string[]) => {
  const text = `<!--\n${header.trim().split('\n').map((line) => `  ${line}`.trimEnd()).join('\n')}\n-->\n\n`
    + blocks.join('\n\n---\n\n') + '\n'

  const offenders = TEXT_COLUMNS
    .filter((column) => new RegExp(`^## ${column}\\n\\[clear\\]$`, 'm').test(text))
  if (offenders.length) {
    throw new Error(
      `refusing to write a batch: ${offenders.join(', ')} carr${offenders.length === 1 ? 'ies' : 'y'} `
      + '"[clear]", which is a LIST sentinel. `text()` does not read it, so it would be stored as '
      + 'the literal four characters and pass every validator. Emit the key with nothing under it '
      + 'instead — the parser still counts the column, and `materialiseNewConcept` writes the null.')
  }
  return text
}

/**
 * A concept an author minted while reading a leaf's multiple-choice questions.
 */
export function mcqConceptBlock(
  module: ModuleRef,
  concept: McqConcept, signals: string[], articleId?: string, asked?: string,
  relatedArticleIds: string[] = [],
): string {
  const weight = Math.min(1, 0.15 + 0.08 * signals.length).toFixed(2)
  const path = concept.modulePath.split(' > ')
  const year = yearNumber(module.yearId)
  return `# Item
## label
${concept.label}
## id
${mintConceptId(concept.subject, concept.key)}
## canonical_key
${concept.key}
## definition
${concept.definition}
## explicit_objective
${concept.objective}
## pitfalls
${concept.pitfall}
## concept_type
${concept.type}
## status
under review
## subject
${concept.subject}
## primary_node_id
${concept.primary}
## secondary_node_ids
${concept.secondary.join(' | ') || '[clear]'}
## modules
${module.id}
## module_subject
${concept.modulePath}
## universities
asu
## learner_years
${year}
## exam_signal
${signals.join('\n')}
## weight_confidence
${signals.length > 2 ? '0.8' : '0.6'}
## blueprint_weight
${weight}
## exam_weight_by_year
${module.yearId}=${weight}
## clinical_relevance
0.3
## academic_relevance
0.9
## confidence
${signals.length > 2 ? '0.85' : '0.7'}
## topic
${path[1] ?? ''}
## subtopic
${path[2] ?? path.at(-1) ?? ''}
## aliases
${(concept.aliases ?? []).join(' | ') || '[clear]'}
${articleId ? `## article_ids\n${articleId}\n` : ''}## support_mode
direct_statement
## original_wording
${asked ?? ''}
## conflicts
${(concept.conflicts ?? []).join('\n') || '[clear]'}
## uncertainty
${concept.uncertainty || '[clear]'}
## evidence_gaps
${(concept.gaps ?? []).join('\n') || '[clear]'}
${conceptTail(relatedArticleIds, mintConceptId(concept.subject, concept.key))}
`
}

/**
 * One multiple-choice question, from a bank row plus what an author added.
 *
 * `QM-<code>-<12 hex>` — a university-specific occurrence, so it keeps a
 * module salt (`asu:<module>:mcq:<key>`, replacing Kasr's `kau:`), unlike a
 * concept ID.
 */
export function mcqBlock(
  row: BankRow, authored: McqAuthored, leaf: McqLeafSeed, module: ModuleRef,
): string {
  if (authored.answerOverride && !authored.answerOverrideReason?.trim()) {
    throw new Error(`${authored.key}: answerOverride without answerOverrideReason`)
  }
  const answer = authored.answerOverride ?? row.answer
  if (!answer) throw new Error(`${authored.key}: no answer, and none supplied — exclude it instead`)

  const letters = Object.keys(row.options).filter((letter) => row.options[letter]?.trim()).sort()
  const missing = letters.filter((letter) => !authored.explanations[letter]?.trim())
  if (missing.length) throw new Error(`${authored.key}: no explanation for option ${missing.join(', ')}`)
  if (!letters.includes(answer)) throw new Error(`${authored.key}: answer ${answer} is not a filled option`)

  const id = `QM-${module.code}-${createHash('sha256').update(`asu:${module.id}:mcq:${row.key}`).digest('hex').toUpperCase().slice(0, 12)}`
  const concept = leaf.concepts.find((one) => one.key === authored.conceptKey)
  if (!concept) throw new Error(`${authored.key}: conceptKey ${authored.conceptKey} is not in this leaf`)

  const seen = row.occurrences
    .map((where) => `${where.file} p${where.page} q${where.number}`)
    .join('; ')
  const year = yearNumber(module.yearId)

  return `# Item
## id
${id}
## title
${row.stem.length > 90 ? `${row.stem.slice(0, 87)}…` : row.stem}
## subject
${concept.subject}
## status
Draft
## format
single_best_answer
## question
${row.stem}
${letters.map((letter) => `## answer_${letter.toLowerCase()}\n${row.options[letter]}\n## explanation_${letter.toLowerCase()}\n${authored.explanations[letter]}`).join('\n')}
## correct_answer
${answer}
## main_concept
${mintConceptId(concept.subject, concept.key)}
## library_ids
${leaf.articleId}
## topic
${row.topic && row.topic !== 'unknown' ? row.topic : leaf.leaf}
## subtopic
${leaf.leaf}
## module
${module.id}
## module_subject
${leaf.modulePath}
## universities
asu
## years
Year ${year}
## question_only_for
${module.yearId}
## difficulty
${authored.difficulty}
## question_type
${authored.questionType}
## learning_objective
${authored.learningObjective}
## setting
Academic
## academic_relevance
0.9
## clinical_relevance
0.3
## exam_relevance
${Math.min(10, 3 + row.timesAsked * 1.5).toFixed(1)}
## exam_weight_by_year
${module.yearId}=${(Math.min(10, 3 + row.timesAsked * 1.5) / 10).toFixed(2)}
## concept_ids
[clear]
## contextual_concept_ids
[clear]
## cognitive_effort
${authored.difficulty === 'Easy' ? 'Low' : authored.difficulty === 'Moderate' ? 'Medium' : 'High'}
## reasoning_level
1
## estimated_seconds
60
## randomise_answers
yes
## owner
Claude
## source_citation
Ain Shams departmental question books, module ${module.id}. ${seen}. Manifest ${[...new Set(row.occurrences.map((where) => where.sourceId))].join(', ')}.
## author_notes
Asked ${row.timesAsked} time${row.timesAsked === 1 ? '' : 's'} across the question books.
Extraction confidence ${row.confidence}; the answer came from ${row.answerConfidence === 'keyed' ? 'a separate answer key, joined by question number' : row.answerConfidence === 'same-file' ? 'the question book itself' : 'no source and was supplied by the author'}.
${authored.answerOverrideReason ? `Answer changed from the source's: ${authored.answerOverrideReason}` : ''}
${row.variants?.length ? `${row.variants.length} materially different wording${row.variants.length === 1 ? '' : 's'} of this question exist in the books and were not collapsed into it.` : ''}`
}
