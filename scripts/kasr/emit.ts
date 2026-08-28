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
import { readdirSync, readFileSync } from 'node:fs'

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
 *
 * Used to be one hardcoded id, `src_b1e6dc481eaf337268d0` — 101 ISK's own
 * department book. That was correct for 101 by accident, because 101 is the
 * module this pipeline was first written against, and every other module's
 * concept silently cited 101's book instead of its own the moment a second
 * module started using this fallback (found in 104 CPS: all 19 of its
 * question-book concepts, and every reused-but-full paper concept with no
 * evidence pass, cited 101's book). Resolved from the manifest instead, so a
 * module gets its own department book(s) without this file knowing any
 * module's id or subject vocabulary in advance.
 */
const MANIFEST_SOURCES: readonly { sourceId: string; moduleId: string; subject: string; sourceCategory: string }[] =
  (() => {
    try {
      return JSON.parse(readFileSync('docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json', 'utf8')).sources ?? []
    }
    catch { return [] }
  })()

/**
 * The department book(s) a module's concept should cite by default, absent a
 * seed or leaf naming its own `resourceIds`.
 *
 * Scoped first by module, then — where the concept's own `module_subject`
 * path names one (`path[1]`, e.g. `Anatomy`) — by department, because a
 * module with several department books (104 CPS has three: anatomy,
 * histology, physiology) should not cite all of them for a concept that only
 * one actually teaches. Falls back to every department book the module has
 * when no department is named, or when the named department matches none of
 * them — which is what keeps 101 ISK unchanged: its one book is filed under
 * `subject: "Histology"` even though 101's own concepts carry `Anatomy` and
 * other department names in their path, so the department match never hits
 * and every 101 concept falls back to "every department book this module
 * has", which has always been the same one book.
 *
 * De-duplicated, because a module's manifest rows are not guaranteed unique
 * per department (108 INT's Pharmacology and Pathology books are each listed
 * twice, apparently from a re-scan) — citing the same source id twice in one
 * `resource_ids` cell is a batch a reviewer has to notice and fix by hand,
 * for no benefit over citing it once.
 */
function departmentBookIdsFor(module: string, department?: string): string[] {
  const books = MANIFEST_SOURCES.filter((s) => s.moduleId === module && s.sourceCategory === 'Department Book')
  const matching = department
    ? books.filter((b) => b.subject.trim().toLowerCase() === department.trim().toLowerCase())
    : []
  const chosen = matching.length ? matching : books
  return [...new Set(chosen.map((b) => b.sourceId))]
}

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
  departmentBookIdsFor(module.id, path[1]),
)}`
}

/**
 * A sparse update row for a concept whose canonical_key already has a pinned
 * id in this module — see `existingConceptIds` in `build-batches.ts`.
 *
 * Per the authoring manual (`00-START-HERE.md` §2, "Updating an existing
 * record"): give the record's real `## id` and only the `## field_key` blocks
 * being changed; every field left out keeps its live value exactly as it is.
 * This route changes nothing about what the concept *is* — no `## definition`,
 * `## subject`, `## pitfalls`, or any other descriptive field, because a
 * pinned id already belongs to a fully-authored live record and this pass has
 * no business redefining it.
 *
 * `## label` is the one exception to "omitted field", and it is restated
 * verbatim rather than left out — **not** a redefinition, a workaround.
 * `conceptFromRow` (`src/data/conceptImport.ts:148`) defaults `label` to
 * `''` whenever the column is blank, unlike every other optional field there,
 * which return `undefined` so `mergeConcept` can tell "not mentioned" from
 * "emptied". An update row that omits `## label` therefore does not leave the
 * live label alone — it blanks it. Confirmed with a real `medical:simulate`
 * run of a 104 CPS sparse row: the merged concept came back
 * `"label": ""`. Restating the pinned record's own label (threaded through
 * from `existingConceptIds`'s `labels` map — `parseConceptLabels` in
 * `seeds/types.ts`) writes back exactly what was already there, so the
 * record's label is unchanged in substance even though the column is
 * present. The underlying bug lives in shared importer code no KASR lane
 * owns and is not fixed here; when it is, this parameter stops mattering but
 * stays harmless (restating an unchanged value is a no-op either way).
 *
 * Everything else this row can add is the pipeline's own contribution and
 * nothing more:
 *
 * - `## exam_signal` — evidence that the concept was examined here too.
 * - `## article_ids`, `+`-prefixed — where this leaf's article is not already
 *   among the record's own, that it teaches it as well. Per the manual,
 *   "a `+` cell adds without re-typing the list, and re-importing the same
 *   row does not duplicate what it added, so a batch can be applied twice
 *   safely" — and `article_ids` genuinely parses a leading `+` this way
 *   (`optionalList` -> `listDirective`).
 * - `## modules`, `+`-prefixed, but **only when the module building this row
 *   is not already on the pinned record's own `## modules` list** (checked
 *   against `existingConceptIds`'s second map, `parseConceptModules`) — the
 *   ordinary case is that it already is, since the id was only found because
 *   `module_subject`'s first segment already named this module, and emitting
 *   `+<module already there>` would be a no-op cell for every row, not a
 *   contribution.
 *
 * Two fields the literal instruction ("`+module_subject`", "`+question_ids`")
 * asked for are deliberately never emitted here, because their shapes do not
 * support what `+` promises:
 *
 * - `## module_subject` is parsed by `parseModuleSubjectPaths`
 *   (`src/data/moduleSubjectPath.ts`), a bare newline-split with no leading-`+`
 *   convention at all — unlike `article_ids`/`modules`, which route through
 *   `optionalList` -> `listDirective`. Writing `+104 CPS > …` here would not
 *   append: `+104 CPS` fails to resolve as any known module id, and the cell
 *   still **replaces** the record's whole path list the moment it is
 *   non-blank, since `conceptImport.ts` only treats `undefined` (an
 *   omitted key) as "leave alone". The only safe way to add a path with the
 *   tools this repository has today is to leave the key out, which is what
 *   this route does.
 * - `## question_ids` is not a field `Concept` has at all
 *   (`CONCEPT_IMPORT_FIELDS` in `src/data/conceptImport.ts` has no such key) —
 *   there is nothing to add it to.
 *
 * `## exam_signal` itself has the same missing-`+` shape as `module_subject`
 * (`parseExamAppearances` does not strip a leading `+`, and `mergeConcept`
 * replaces `examSignal.appearances` wholesale whenever the column is
 * non-blank) — it is emitted anyway, unprefixed, because every hand-authored
 * record this route has ever found pinned leaves `## exam_signal` genuinely
 * blank (the field is populated by this pipeline, never by hand), so there is
 * nothing yet on the live record for a wholesale-replace to lose. A module
 * whose hand-authored files start carrying their own `exam_signal` history
 * would need this reconsidered; nothing in this corpus does today.
 */
export function conceptUpdateBlock(
  id: string, key: string, signals: string[], articleIds: string | undefined, note: string,
  /** The module building this row, passed only when it is not already on the pinned record's own `## modules`. */
  newModule?: string,
  /** The pinned record's own label, restated verbatim — see the doc comment above for why. */
  label?: string,
): string {
  const addArticles = articleIds
    ?.split('|').map((one) => one.trim()).filter(Boolean).map((one) => `+${one}`).join(' | ')
  return `# Item
## id
${id}
${label ? `## label\n${label}\n` : ''}## canonical_key
${key}
## exam_signal
${signals.join('\n')}
${addArticles ? `## article_ids\n${addArticles}\n` : ''}${newModule ? `## modules\n+${newModule}\n` : ''}## field_notes
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
  /**
   * What `resource_ids` falls back to when neither `links` (the module's
   * evidence pass) nor the seed/leaf itself names a source: the caller's own
   * `departmentBookIdsFor(module.id, department)` result, resolved from the
   * manifest rather than one id hardcoded here for every module.
   */
  fallbackResourceIds: string[] = [],
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
        : seed?.resourceIds?.length ? seed.resourceIds : fallbackResourceIds),
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
  // A leaf's own `resourceIds` wins where it names one — the rare case a
  // concept's evidence is not simply "the module's department book", e.g. a
  // question drawn from a named atlas or a cross-module source. Otherwise the
  // department book(s) this concept's own `module_subject` path names.
  const resourceIds = concept.resourceIds?.length
    ? concept.resourceIds : departmentBookIdsFor(module.id, path[1])
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
${conceptTail(relatedArticleIds, mintConceptId(module.id, concept.subject, concept.key), undefined, undefined, resourceIds)}
`
}

/**
 * One fact the department book supports, ready to append to a worked
 * explanation: its sentence, whether it has passed the evidence gate, and the
 * page a reviewer would open to check it.
 */
export interface EnrichmentClaim {
  text: string
  verified: boolean
  page: number
}

/**
 * Pull one field's value out of a `# Item` block.
 *
 * The same lookahead as `build-evidence.ts`'s own `field()`: it stops at the
 * next `## ` heading or true end of string, never at the first blank line, so
 * a multi-line value — `display_text`, `qualifiers` — survives intact.
 */
function evidenceField(block: string, label: string): string {
  return block.match(new RegExp(`^## ${label}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, 'm'))?.[1].trim() ?? ''
}

/**
 * Every claim a module's evidence files support, keyed by concept ID —
 * `evidence/<module>-claims.md`, `<module>-generated-claims.md`, and every
 * other curated `<module>*-claims.md` file, each paired with its citation in
 * the sibling `*-citations.md` file by `claim_id`.
 *
 * Built once per module and cached: `mcqBlock` runs once per question, and a
 * build emits hundreds of questions per module, so re-reading and re-parsing
 * every evidence file per question would be pure waste.
 *
 * A claim survives into the index only if some citation locates it to a page
 * — a claim nothing cites cannot be trusted as a fact about the concept, so
 * it is left out rather than asserted on nothing. Kept in the file's own
 * order (which follows the department book); `appendEnrichment` is what
 * sorts verified claims first and caps the count, so that selection policy
 * lives in one place and is unit-testable without touching disk.
 */
const CLAIMS_INDEX_CACHE = new Map<string, Map<string, EnrichmentClaim[]>>()

function claimsIndexFor(module: ModuleRef): Map<string, EnrichmentClaim[]> {
  const cached = CLAIMS_INDEX_CACHE.get(module.id)
  if (cached) return cached

  const dir = 'docs/Kasr-Source-Imports/evidence'
  const prefix = `${module.id.replace(/\s+/g, '-')}-`
  let files: string[] = []
  try { files = readdirSync(dir) } catch { files = [] }

  const claimFiles = files.filter((name) => name.startsWith(prefix) && name.endsWith('claims.md')).sort()
  const citationFiles = files.filter((name) => name.startsWith(prefix) && name.endsWith('citations.md')).sort()

  // claim_id -> page, from every citation file this module has. First
  // locator wins on a rare double-citation rather than the last, so the
  // result does not depend on directory listing order.
  const pageByClaimId = new Map<string, number>()
  for (const name of citationFiles) {
    let text: string
    try { text = readFileSync(`${dir}/${name}`, 'utf8') } catch { continue }
    for (const block of text.split(/^\s*---\s*$/m)) {
      const claimId = evidenceField(block, 'claim_id')
      const pageRaw = evidenceField(block, 'locator_page')
      if (!claimId || !pageRaw || pageByClaimId.has(claimId)) continue
      const page = Number.parseInt(pageRaw, 10)
      if (Number.isFinite(page)) pageByClaimId.set(claimId, page)
    }
  }

  const byConcept = new Map<string, EnrichmentClaim[]>()
  for (const name of claimFiles) {
    let text: string
    try { text = readFileSync(`${dir}/${name}`, 'utf8') } catch { continue }
    for (const block of text.split(/^\s*---\s*$/m)) {
      const claimId = evidenceField(block, 'id')
      const conceptId = evidenceField(block, 'concept_id')
      const displayText = evidenceField(block, 'display_text')
      if (!claimId || !conceptId || !displayText) continue
      const page = pageByClaimId.get(claimId)
      if (page === undefined) continue
      const verified = evidenceField(block, 'verification_status') === 'verified'
      const list = byConcept.get(conceptId) ?? []
      list.push({ text: displayText.replace(/\s+/g, ' ').trim(), verified, page })
      byConcept.set(conceptId, list)
    }
  }
  CLAIMS_INDEX_CACHE.set(module.id, byConcept)
  return byConcept
}

/** The fixed sub-heading a mechanical enrichment lands under — see `appendEnrichment`. */
export const ENRICHMENT_HEADING = 'Why this is right:'

/** The first sentence of a block of text — used for the definition fallback below. */
function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?=\s|$)/)
  return (match ? match[0] : text).trim()
}

/**
 * Append the tested concept's claims — or, absent any locatable claim, its
 * definition's first sentence — under a fixed sub-heading in the correct
 * answer's explanation.
 *
 * Approved design (chief of staff + Omar's standing order, see
 * `E1-enrichment.md`): up to 3 claims, verified ones first (a stable sort, so
 * ties keep the department book's own order); when the concept has no
 * locatable claim, the concept's `definition` sentence stands in; a sentence
 * already present verbatim in the explanation is skipped rather than
 * repeated. Entirely mechanical — nothing here is hand-written for this
 * question — and it never touches the text above the sub-heading or any
 * distractor's explanation.
 *
 * Student-facing text never names the department book — that citation lives
 * in `source_citation`/`author_notes` instead (see `mcqBlock`) — so only a
 * claim's `text` is emitted here, never its `page`. A claim still needs a
 * locatable page to enter `claimsIndexFor`'s index at all: that gate is about
 * trusting the claim, not about printing where it came from.
 *
 * If every candidate is a duplicate, the explanation is returned byte-for-byte
 * unchanged: a heading over nothing to add is worse than no heading. Pure —
 * takes the concept's claims already resolved by the caller (`claimsIndexFor`
 * does the disk reading) so it is unit-testable without touching disk or a
 * `ModuleRef` fixture, and calling it twice on its own output is a no-op.
 */
export function appendEnrichment(explanation: string, claims: EnrichmentClaim[], definition: string): string {
  const ordered = [...claims].sort((a, b) => Number(b.verified) - Number(a.verified))
  const candidates = ordered.length
    ? ordered.slice(0, 3).map((c) => c.text)
    : [firstSentence(definition)].filter(Boolean)

  const fresh = candidates.filter((sentence) => sentence.length > 0 && !explanation.includes(sentence))
  if (!fresh.length) return explanation

  return `${explanation}\n\n${ENRICHMENT_HEADING}\n${fresh.map((s) => `- ${s}`).join('\n')}`
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

  // Mechanical enrichment: append the tested concept's book claims (or its
  // definition, absent any) under a fixed sub-heading in the correct answer's
  // explanation only. Every distractor's explanation is untouched.
  const explanations: Record<string, string> = { ...authored.explanations }
  const claims = claimsIndexFor(module).get(conceptId) ?? []
  explanations[answer] = appendEnrichment(explanations[answer], claims, concept.definition)

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
${letters.map((letter) => `## answer_${letter.toLowerCase()}\n${row.options[letter]}\n## explanation_${letter.toLowerCase()}\n${explanations[letter]}`).join('\n')}
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
