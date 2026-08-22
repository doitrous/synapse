/**
 * Turn a paper's seeds into the batches the importer reads.
 *
 * Every paper goes through here, so the field set cannot drift between one
 * paper and the next — which is the failure that makes a content programme
 * unreviewable, because nobody can tell an authoring choice from an omission.
 *
 * Concepts deduplicate across papers and questions do not. A concept is the
 * thing being examined and two papers asking it are one concept with two
 * occurrences; a question is an occurrence, and the blueprint counts
 * occurrences. Getting this backwards splits a student's mastery across four
 * copies of the same idea.
 *
 * The module is a parameter, taken off the paper's own `SourceRef`. It used to
 * be the literal `101 ISK` in six places here; each one now reads the module,
 * and `moduleOf` defaults a source that names none to `101 ISK`, so every batch
 * already generated for that module regenerates byte for byte.
 *
 * **The field set is main's, deliberately.** A version of `conceptBlock`
 * written for 102 derives seven columns this one already emits —
 * `blueprint_weight`, `exam_weight_by_year`, `clinical_relevance`,
 * `confidence`, `topic`, `subtopic`, `evidence_gaps` — differently, and
 * `secondary_node_ids` too. Adopting it would not *add* to 101's committed,
 * already-imported concept batch, it would **rewrite** it. That is a content
 * decision and not a merge one, so this file keeps main's derivations and
 * threads the module through them. The same applies to three `writtenBlock`
 * columns: see `scripts/kasr/extract/102-INT/retrofit-port-report.md`.
 */
import { createHash } from 'node:crypto'
import {
  mintConceptId, mintQuestionId, moduleOf, partsKey,
  type ModuleRef, type Paper, type Seed, type SourceRef,
} from './seeds/types.ts'
import type { ConceptLinks } from './seeds/links.ts'
import type { BankRow, McqAuthored, McqConcept, McqLeafSeed } from './seeds/mcq.ts'
import { readFileSync } from 'node:fs'

/**
 * The claims each concept asserts, by concept ID.
 *
 * Written by `build-evidence.ts`, which reads the concept batches and splits
 * each definition into its sentences. That is a cycle — concepts, then claims,
 * then concepts again — and it converges because a claim ID is minted from the
 * concept ID and the sentence, both already fixed by the time the claim is
 * made. Run the two in order twice and the second pass changes nothing.
 *
 * Empty on a first run, before any claims exist. That is the honest state and
 * not an error: `atomic_claim_ids` then says `[clear]`, which is what a concept
 * with no evidence chain should say.
 */
const CLAIMS_FOR_CONCEPT: Record<string, string[]> = (() => {
  try { return JSON.parse(readFileSync('scripts/kasr/seeds/claim-links.json', 'utf8')) }
  catch { return {} }
})()

/**
 * The department's own textbook, which is what every definition here rests on.
 *
 * Not the exam paper the concept was found on. That paper is `is_assessment:
 * yes` — evidence of what this faculty *asks*, never evidence that anything in
 * it is *true* — and it is already recorded on `exam_signal`, which is the
 * column for curriculum signal. Putting it in `resource_ids` would make a
 * question its own justification.
 */
const DEPARTMENT_BOOK = 'src_b1e6dc481eaf337268d0'

/**
 * Where a concept was examined, in the `exam_signal` column's own grammar.
 *
 * The module comes off the source rather than being spelled in. A source with
 * no `module` is `101 ISK`, so this line is unchanged for every paper seeded
 * before the module was a parameter.
 */
export const occurrence = (source: SourceRef, seed: Seed) =>
  `${source.id} | ${source.tier} | ${source.sittingYear} | p${seed.page} | ${moduleOf(source).id}`

/**
 * How much of the paper this concept is worth, as a 0–1 weight.
 *
 * Its marks over the paper's total, lifted by each further sitting it appears
 * on. A thing asked in three years running is worth more of a student's time
 * than its marks on any one paper say, and repetition is the only evidence in
 * this corpus for that.
 */
const blueprintWeight = (seed: Seed, paperMarks: number, sittings: number) =>
  Math.min(1, (seed.marks / Math.max(paperMarks, 1)) * (1 + 0.5 * sittings)).toFixed(2)

export function conceptBlock(
  source: SourceRef, seed: Seed, alsoSeenOn: string[] = [],
  context: {
    paperMarks?: number; articleId?: string; relatedArticleIds?: string[]
    /**
     * What this concept is taught by and supported by, where the module has had
     * its evidence pass. Absent for a module that has not — which is the honest
     * state for a first pass, and is why the columns below still emit `[clear]`
     * rather than going missing.
     */
    links?: ConceptLinks
  } = {},
): string {
  const module = moduleOf(source)
  // The plan wins where a module has one; `articles.ts` is 101's hand-written
  // fallback, whose articles predate the plan files.
  const articleId = context.links?.articleId ?? context.articleId
  const signals = [occurrence(source, seed), ...alsoSeenOn].join('\n')
  const weight = blueprintWeight(seed, context.paperMarks ?? 81, alsoSeenOn.length)
  const clinical = seed.type === 'clinical_correlation'
  const path = seed.modulePath.split(' > ')
  return `# Item
## label
${seed.label}
## id
${mintConceptId(module.id, seed.subject, seed.key, seed.system)}
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
kau
## learner_years
1
## exam_signal
${signals}
## weight_confidence
${alsoSeenOn.length ? '0.9' : '0.7'}
## blueprint_weight
${weight}
## exam_weight_by_year
KAU_Y1=${weight}
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
  mintConceptId(module.id, seed.subject, seed.key, seed.system),
  context.links, seed,
)}`
}

/**
 * A sparse update row for a concept whose canonical_key already has a pinned
 * id in this module — see `existingConceptIds` in `build-batches.ts`.
 *
 * Per the authoring manual (`00-START-HERE.md` §2, "Updating an existing
 * record"): give the record's real `## id` and only the `## field_key` blocks
 * being changed; every field left out keeps its live value exactly as it is.
 * This route changes nothing about what the concept *is* — no `## label`,
 * `## definition`, `## subject`, `## pitfalls`, or any other descriptive
 * field, because a pinned id already belongs to a fully-authored live record
 * and this pass has no business redefining it. All it adds is evidence that
 * the concept was examined here too (`## exam_signal`) and, where this leaf's
 * article is not already among the record's own, that it teaches it as well
 * (`## article_ids`, `+`-prefixed — per the manual, "a `+` cell adds without
 * re-typing the list, and re-importing the same row does not duplicate what
 * it added, so a batch can be applied twice safely").
 */
export function conceptUpdateBlock(
  id: string, key: string, signals: string[], articleIds: string | undefined, note: string,
): string {
  const addArticles = articleIds
    ?.split('|').map((one) => one.trim()).filter(Boolean).map((one) => `+${one}`).join(' | ')
  return `# Item
## id
${id}
## canonical_key
${key}
## exam_signal
${signals.join('\n')}
${addArticles ? `## article_ids\n${addArticles}\n` : ''}## field_notes
${note}
`
}

/**
 * The columns every concept carries regardless of where it came from.
 *
 * Shared so a concept minted from a question book cannot end up describing
 * itself in fewer fields than one minted from a paper — a reason that exists
 * for one kind of concept and not another is an authoring accident, not a
 * decision.
 *
 * `[clear]` means "present and deliberately empty" — **on a list column only**.
 * On a text column the importer stores the literal string, so emitting it for
 * `reviewer` gave every concept a reviewer named `[clear]`, which satisfies the
 * audit by accident and tells a reader nothing. The six text columns here are a
 * real value or nothing: `materialiseNewConcept` fills `arabicLabel`,
 * `lastReviewed`, `reviewDue` and `exclusionReason` as null whether the key is
 * written or not, so presence is satisfied without writing anything.
 *
 * `reviewer` and `finalPublisher` are different again: they are on
 * `conceptPopulated`, which takes no `field_notes` excuse, so an empty one is an
 * audit error — and §10's gate is the audit at zero, so `[clear]` there is not
 * a worse metric, it is a batch that cannot ship.
 *
 * They carry the manual's documented defaults, which its own worked example
 * writes verbatim (`02-concepts.md:214-216`, `:538-544`).
 *
 * I argued at length for a sentinel saying nobody had reviewed this, on the
 * grounds that naming a team asserts a review that did not happen. The
 * objection was right and the remedy was wrong: three other fields already say
 * it, and say it where the product reads it — `status: under review`,
 * `publication_status: needs_evidence`, and an `editorial_review_status` naming
 * the gate not yet passed. **Only `published` reaches a student.** So these two
 * are ownership, not a claim about work done, and the honesty belongs in the
 * status fields rather than smuggled into a name.
 *
 * The wider point, which cost two lanes a detour: a convention agreed between
 * lanes that contradicts the manual makes a half-migrated library, and that is
 * worse than either convention, because a later reader cannot tell which
 * records followed which rule. If a documented default is wrong, the manual
 * changes first and everyone moves together.
 *
 * The rest carry `[clear]`, and that distinction is the whole point. `medical:audit` asks two questions of every field: is it populated,
 * and does the key exist at all. Writing a `field_notes` reason answers the
 * first and fails the second, because a key that was never emitted reports as
 * *absent* rather than as deliberately empty — and an empty `## key` block
 * parses as untouched, so it does not help either. `[clear]` is the only thing
 * that says "present, and empty on purpose".
 *
 * The nineteen columns below are exactly the ones `conceptPresence` was written
 * for in the 102 lane: `conceptPopulated` asks whether a field carries a value,
 * `conceptPresent` asks whether the **key exists at all** and reports `X absent
 * for <id>` when it does not. This is why a batch can validate clean at
 * `medical:batch` and still fail `medical:audit` on nineteen fields — only the
 * audit looks for the key.
 *
 * The last paragraph of this comment used to say `reviewer`, `final_publisher`
 * and `last_reviewed` were `[clear]` rather than a name. They are not, and were
 * not when it said so: the code above them writes the manual's defaults. The
 * paragraph is removed rather than left standing, because a comment that
 * contradicts the line beneath it is worse than none.
 */
function conceptTail(
  relatedArticleIds: string[] = [], conceptId?: string,
  links?: ConceptLinks, seed?: Seed,
): string {
  /**
   * A list column. `[clear]` when empty, and only ever here.
   *
   * `optionalList` reads `[clear]` and returns `[]`, which is what says
   * "present and deliberately empty". `text()` — `conceptImport.ts:89`,
   * `value?.trim() || undefined` — has never looked for it, so on a text column
   * it stores the literal four characters and then *passes* the audit, because
   * the field is non-empty. `batchFile` refuses a batch that does that.
   */
  const list = (key: string, values: string[] | undefined) =>
    `## ${key}\n${values?.length ? values.join(' | ') : '[clear]'}`

  /**
   * A text column, emitted as the key with **nothing under it** when it has no
   * value.
   *
   * Not `[clear]`, per the above, and not omitted either. `parseMarkdown`
   * captures the key with an empty value, so it counts toward `fieldsUsed`;
   * `text('')` then yields `undefined` and `materialiseNewConcept` writes the
   * null that `conceptPresent`'s `Object.hasOwn` is satisfied by. Omitting the
   * key reaches the same stored state but drops the column from the file, which
   * is how a batch that has considered a field looks identical to one that
   * forgot it.
   *
   * `reviewer` and `final_publisher` are the exceptions that must genuinely
   * carry a value — they are on `conceptPopulated`, which takes no `field_notes`
   * excuse — and they carry the manual's documented defaults.
   */
  const scalar = (key: string, value: string | undefined) =>
    `## ${key}\n${value?.trim() ?? ''}`

  // Where a module has had its evidence pass, `links` carries the real values;
  // a seed may also name them itself. Neither exists for a module on its first
  // pass, and the column is emitted `[clear]` rather than going missing.
  const presence = [
    scalar('arabic_label', seed?.arabicLabel),
    list('arabic_aliases', seed?.arabicAliases),
    // `microtopic` and `nanotopic` are neither: they are **resolvers**, looked
    // up against the catalogue's MIC_/NAN_ nodes (`conceptImport.ts:125-127`).
    // `[clear]` there is a lookup that finds nothing and leaves the key unset,
    // not a literal stored in a text field — so `batchFile`'s guard does not
    // cover them, and this is the value already committed for 101.
    `## microtopic\n${seed?.microtopic ?? '[clear]'}`,
    '## nanotopic\n[clear]',
    list('related_concept_ids', seed?.relatedConceptIds),
    list('related_article_ids',
      links?.relatedArticleIds?.length ? links.relatedArticleIds
        : relatedArticleIds.length ? relatedArticleIds : seed?.relatedArticleIds),
    // The department's own textbook is the fallback, not a default anyone chose
    // for every module: a module whose article plan names its sources supplies
    // them, and 101's plan predates the plan files.
    list('resource_ids',
      links?.resourceIds?.length ? links.resourceIds
        : seed?.resourceIds?.length ? seed.resourceIds : [DEPARTMENT_BOOK]),
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
 * Takes every seed sharing that number, because a question can test more than
 * one concept: the cases on this paper each ask four lettered things, and case
 * 1 moves from the lymphatic drainage of the breast to a nerve injured during
 * the operation. A student can know one and not the other, so the question is
 * co-primary on both and mastery is credited to whichever the subpart tested.
 */
export function writtenBlock(
  paper: Paper,
  seeds: Seed[],
  articleFor: (conceptId: string) => string | undefined,
  /**
   * The media requests a question carries, by scheme key.
   *
   * Defaults to none, so a paper that asks for no figure emits no
   * `media_recommendations` column and is byte-for-byte what it was before this
   * existed. Importing is the only way a media request comes into being — there
   * is no create form in the admin UI — so a question needing a figure has to
   * carry it here.
   */
  mediaFor: (schemeKey: string) => string[] = () => [],
): string {
  const { source } = paper
  const [seed] = seeds
  const scheme = paper.schemes[partsKey(seed)]
  if (!scheme) throw new Error(`${source.file}: no mark scheme for ${partsKey(seed)}`)

  const module = moduleOf(source)
  const byKey = new Map(seeds.map((one) => [one.key, mintConceptId(module.id, one.subject, one.key, one.system)]))
  const conceptId = byKey.get(seed.key)!
  const total = paper.seeds.reduce((sum, other) => sum + other.marks, 0)

  // A matching question has no parts to apportion — its marks sit on the
  // prompts, which the runner scores itself.
  //
  // The paper prints a total for the question and letters beneath it, so the
  // letters divide it evenly. Kept fractional rather than rounded: rounding
  // each part and totalling drifts from the mark on the page.
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

  // What this question is worth out of the paper, on the field's 0–10 scale,
  // taken from the marks the examiner gave it rather than from an opinion.
  //
  // `exam_weight_by_year` is the same figure on the 0–1 scale the blueprint
  // reads, keyed to the one year this module is sat in. Derived from the same
  // number rather than typed beside it, so the two cannot disagree.
  //
  // `concept_ids` and `contextual_concept_ids` are `[clear]` on purpose, which
  // is a claim rather than an omission. A question grouped from several seeds
  // already names every concept it tests on `main_concept`, so there is nothing
  // left for the secondary list; and nothing in this corpus records which
  // concepts a stem merely *needs* without assessing. `[clear]` says both were
  // considered — an empty column would say only that nobody looked.
  const relevance = Math.min(10, (seed.marks / total) * 10 * paper.seeds.length).toFixed(1)
  const clinical = seeds.some((one) => one.type === 'clinical_correlation')
  const articles = [...new Set([...byKey.values()].map(articleFor).filter(Boolean))]
  const askedAll = seeds.map((one) => one.asked).join(' ')
  const requests = mediaFor(partsKey(seed))

  /**
   * The two columns that restate the authored difficulty band, emitted only
   * where a seed carries one.
   *
   * `inferred_difficulty` is a facility percentage and `cognitive_effort_score`
   * a 0–1 load; both are readings of `seed.difficulty`. 101's seeds carry no
   * band — the papers were transcribed before the field existed — so writing
   * the "Moderate" fallback for them would put a statistic on seven committed
   * batches that nobody authored, and rewrite them. A question nobody banded
   * gets no band.
   */
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
kau
## years
Year 1
## question_only_for
KAU_Y1
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
KAU_Y1=${(Number(relevance) / 10).toFixed(2)}
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
${source.file} — Kasr Al Ainy ${source.tier.replace(/_/g, ' ')} ${source.sittingYear}, ${seed.section} Q${seed.q}, p${seed.page}. Manifest ${source.id}.
${requests.length ? `## media_recommendations\n${requests.join('\n')}\n` : ''}## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “${askedAll}”
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
 * `[clear]` is a **list** sentinel: `optionalList` reads it and stores `[]`,
 * while `text()` (`conceptImport.ts:89`, `value?.trim() || undefined`) has never
 * looked for it. So on a text column it stores the string — and then *passes*
 * the audit, because the field is non-empty.
 *
 * `exclusionReason` is the one that shows why this matters. A non-null
 * exclusion reason **says the concept was excluded**, and the reason given was
 * "[clear]". Records carrying that went through validation, simulation and the
 * field audit green, each one asserting it should not be used.
 *
 * Measured with a probe rather than read off the source — send a value
 * containing a `|` through `conceptFromRow` for every column and see whether it
 * comes back split. `scripts/kasr/check-column-parsers.ts` is that probe, and
 * this is the eighteen columns it classifies as text today.
 *
 * `subtopic`, `microtopic` and `nanotopic` are deliberately **not** here. The
 * probe puts them in neither set: they are catalogue resolvers
 * (`conceptImport.ts:125-127`), so `[clear]` on one is a lookup that finds
 * nothing and leaves the ID unset, not a literal stored in a text field. Listing
 * them anyway would make this guard refuse the concept batch 101 has already
 * imported, which is a different bug wearing this one's clothes.
 *
 * Listed here because a generator should not be able to emit the bug at all: a
 * fixed *batch* is not a fixed *module*, and every lane that regenerates from a
 * stale copy of this file reintroduces it.
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
 * Refuses to produce a batch that puts a list sentinel in a text column. This
 * is the one place every generated batch passes through, which is what makes it
 * the right place for the check — a rule written in a comment is followed by
 * whoever read the comment, and this is followed by everyone.
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
 *
 * Its exam signal is every occurrence of every question that tests it, which is
 * what makes these worth minting at all: a question book asking the same thing
 * five times across three books is saying something about the blueprint that no
 * single paper says.
 */
export function mcqConceptBlock(
  module: ModuleRef,
  concept: McqConcept, signals: string[], articleId?: string, asked?: string,
  relatedArticleIds: string[] = [],
): string {
  // Weight from how often the books ask it. A question book asking a thing five
  // times across three books is blueprint evidence no single paper can give.
  const weight = Math.min(1, 0.15 + 0.08 * signals.length).toFixed(2)
  const path = concept.modulePath.split(' > ')
  return `# Item
## label
${concept.label}
## id
${mintConceptId(module.id, concept.subject, concept.key)}
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
kau
## learner_years
1
## exam_signal
${signals.join('\n')}
## weight_confidence
${signals.length > 2 ? '0.8' : '0.6'}
## blueprint_weight
${weight}
## exam_weight_by_year
KAU_Y1=${weight}
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
${conceptTail(relatedArticleIds, mintConceptId(module.id, concept.subject, concept.key))}
`
}

/**
 * One multiple-choice question, from a bank row plus what an author added.
 *
 * `QM-<code>-<12 hex>` from the module and the bank's own key, so re-running the
 * extraction cannot re-mint an item a student already has history against. The
 * module sits where it sat when it was hardcoded, so 101's MCQ IDs are
 * unchanged.
 *
 * The answer is the source's unless the author overrode it, and an override
 * without a reason throws rather than importing: an answer changed silently is
 * indistinguishable from an answer changed wrongly.
 *
 * `conceptId` is resolved by the caller, not derived here from
 * `mintConceptId(module.id, concept.subject, concept.key)` — the two can
 * disagree the moment the key already has a pinned id in this module (see
 * `existingConceptIds` in `build-batches.ts`), and a question whose
 * `main_concept` disagrees with the concept record actually emitted for that
 * key references either the wrong id or nothing at all. One resolution, done
 * once by the caller for the concept block and the question block alike, is
 * the only way the two cannot drift apart.
 */
export function mcqBlock(
  row: BankRow, authored: McqAuthored, leaf: McqLeafSeed, module: ModuleRef, conceptId: string,
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

  const id = `QM-${module.code}-${createHash('sha256').update(`kau:${module.id}:mcq:${row.key}`).digest('hex').toUpperCase().slice(0, 12)}`
  const concept = leaf.concepts.find((one) => one.key === authored.conceptKey)
  if (!concept) throw new Error(`${authored.key}: conceptKey ${authored.conceptKey} is not in this leaf`)

  const seen = row.occurrences
    .map((where) => `${where.file} p${where.page} q${where.number}`)
    .join('; ')

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
${conceptId}
## library_ids
${leaf.articleId}
## topic
${/* The bank's topic where it has one, and the leaf otherwise.
     This tested `=== 'unknown'` alone, which was true of every row the
     question books produced and false of the rows that came off the sat
     papers — those carry `topic: null`, because a paper does not print
     one. `null` interpolates as the four characters `null`, so eighty-two
     questions went out with the literal string "null" as their topic and
     nothing flagged it: it is a free-text column, so it was valid, and it
     was wrong. */ ''}${row.topic && row.topic !== 'unknown' ? row.topic : leaf.leaf}
## subtopic
${leaf.leaf}
## module
${module.id}
## module_subject
${leaf.modulePath}
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
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
KAU_Y1=${(Math.min(10, 3 + row.timesAsked * 1.5) / 10).toFixed(2)}
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
Kasr Al Ainy departmental question books, module ${module.id}. ${seen}. Manifest ${[...new Set(row.occurrences.map((where) => where.sourceId))].join(', ')}.
## author_notes
Asked ${row.timesAsked} time${row.timesAsked === 1 ? '' : 's'} across the question books.
Extraction confidence ${row.confidence}; the answer came from ${row.answerConfidence === 'keyed' ? 'a separate answer key, joined by question number' : row.answerConfidence === 'same-file' ? 'the question book itself' : 'no source and was supplied by the author'}.
${authored.answerOverrideReason ? `Answer changed from the source's: ${authored.answerOverrideReason}` : ''}
${row.variants?.length ? `${row.variants.length} materially different wording${row.variants.length === 1 ? '' : 's'} of this question exist in the books and were not collapsed into it.` : ''}`
}
