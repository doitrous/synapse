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
 */
import { mintConceptId, mintQuestionId, moduleOf, partsKey, type Paper, type Seed, type SourceRef } from './seeds/types.ts'

/** Where a concept was examined, in the `exam_signal` column's own grammar. */
const occurrence = (source: SourceRef, seed: Seed) =>
  `${source.id} | ${source.tier} | ${source.sittingYear} | p${seed.page} | ${moduleOf(source).id}`

/**
 * A concept, in all 52 columns the importer reads.
 *
 * The first version of this emitted 23, which passes `medical:batch` and fails
 * `medical:audit` on the other 29 — and `medical:batch` is not the gate. The
 * audit wants 28 fields *populated* (`conceptPopulated`) and 22 more merely
 * *present* (`conceptPresent`), which is the manual's floor of 50 of 52.
 *
 * The distinction that makes this work: a key present with nothing under it
 * parses as **absent**, not as empty, so `[clear]` is what says "deliberately
 * empty". And an empty field on the may-be-blank list needs a `field_notes`
 * line keyed by the model's **camelCase property name** — `moduleIds`, not
 * `modules`; `nanotopicId`, not `nanotopic` — because `noteMap` stores what you
 * type verbatim while the audit looks the note up by property. A note written
 * in snake_case is invisible, and you get "blank without an explicit reason"
 * for a field you carefully explained.
 */
export function conceptBlock(source: SourceRef, seed: Seed, alsoSeenOn: string[] = []): string {
  const module = moduleOf(source)
  const signals = [occurrence(source, seed), ...alsoSeenOn].join('\n')
  const sittings = 1 + alsoSeenOn.length
  const id = mintConceptId(module.id, seed.subject, seed.key, seed.system)

  // Derived from `exam_signal` rather than authored, so the weight and the
  // evidence for it cannot drift apart. An end-of-year paper outranks an
  // end-of-module one; a concept asked twice outranks one asked once.
  const tierWeight = source.tier === 'end_of_year' ? 0.6 : source.tier === 'end_of_module' ? 0.45 : 0.3
  const blueprint = Math.min(0.95, tierWeight + 0.15 * (sittings - 1)).toFixed(2)

  // A basic-science module: high in the written exam, low on the ward. The two
  // genuinely differ and the audit wants both — the Krebs cycle is the case the
  // manual gives, and this module is mostly that.
  const clinical = seed.type === 'clinical_correlation' || seed.type === 'clinical_feature'
  const notes: string[] = []
  const note = (key: string, reason: string) => { notes.push(`${key}: ${reason}`) }

  /** A list field: its values, or `[clear]` plus a stated reason for the blank. */
  const list = (key: string, property: string, values: string[] | undefined, reason: string) => {
    if (values?.length) return `## ${key}\n${values.join(' | ')}`
    note(property, reason)
    return `## ${key}\n[clear]`
  }
  /** A scalar field, same rule. */
  const scalar = (key: string, property: string, value: string | undefined, reason: string) => {
    if (value?.trim()) return `## ${key}\n${value}`
    note(property, reason)
    return `## ${key}\n[clear]`
  }

  // Assembled before `field_notes` is rendered, because each of these may add a
  // line to it. Getting that order wrong emits notes for the fields declared
  // above the notes block and silently drops the rest.
  const body = [
    list('aliases', 'aliases', seed.aliases,
      'No alternate term is in use for this concept in the module\'s own sources; the department book names it once, the way the label does.'),
    scalar('arabic_label', 'arabicLabel', seed.arabicLabel,
      'Teaching at Kasr Alainy is in English and the department book prints no Arabic term; students use the English one. Not transliterated, because a transliteration is not a reviewed term.'),
    list('arabic_aliases', 'arabicAliases', seed.arabicAliases,
      'No Arabic label exists for this concept yet, so it can have no Arabic alternates.'),
    scalar('topic', 'topicTagId', seed.topic ?? seed.section, 'unreachable — topic falls back to the paper section'),
    scalar('subtopic', 'subtopicId', seed.subtopic ?? seed.modulePath.split(' > ').slice(-1)[0],
      'unreachable — subtopic falls back to the module-subject leaf'),
    scalar('microtopic', 'microtopicId', seed.microtopic,
      'The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.'),
    scalar('nanotopic', 'nanotopicId', undefined,
      'The microtopic level is already unused here; a nanotopic beneath it would be finer than anything the department book distinguishes.'),
    list('article_ids', 'articleIds', seed.articleId ? [seed.articleId] : undefined,
      'AUTHORING ERROR: a concept with no article is an orphan and the question testing it cannot validate. Name the article.'),
    list('related_article_ids', 'relatedArticleIds', seed.relatedArticleIds,
      'No other article in this module discusses this concept without teaching it; the module has one article per subject-tree leaf.'),
    list('related_concept_ids', 'relatedConceptIds', seed.relatedConceptIds,
      'Walked the concepts under this module-subject leaf and found no untyped neighbour worth recording; anything real between them belongs in a typed relation instead.'),
    list('resource_ids', 'resourceIds', seed.resourceIds,
      'AUTHORING ERROR: the audit rejects a concept with no resource. Name the manifest src_ ID of the source it was read from.'),
    list('approved_file_resource_ids', 'approvedFileResourceIds', undefined,
      'No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.'),
    list('approved_video_resource_ids', 'approvedVideoResourceIds', undefined,
      'No video resource has been rights-cleared for this concept; the module\'s corpus holds no video at all.'),
    list('atomic_claim_ids', 'atomicClaimIds', seed.claimIds,
      'AUTHORING ERROR: the audit requires a claim. Author it in the evidence batch rather than leaving this blank.'),
    list('resource_occurrence_ids', 'resourceOccurrenceIds', undefined,
      'Read from the paper and the department book by hand rather than by the extraction pipeline, so no corpus occurrence record exists to point at.'),
    list('source_candidate_ids', 'sourceCandidateIds', undefined,
      `Searched the corpus index for "${seed.key.split('-').slice(0, 2).join(' ')}" and found no candidate record; the Kasr Y1 corpus is indexed by file, not by extracted candidate.`),
    list('merge_ids', 'mergeIds', undefined,
      'Nothing was merged into this concept; it was minted from one question on one paper.'),
    list('rejected_merge_candidate_ids', 'rejectedMergeCandidateIds', seed.rejectedMergeCandidateIds,
      'The search for this label returned no near-miss to decide against, so there is nothing to record here for the next author.'),
    list('conflicts', 'conflicts', seed.conflicts,
      'The department book and the solved paper agree on this concept; no source disagreement was found to record.'),
    scalar('uncertainty', 'uncertainty', seed.uncertainty,
      'Nothing about this concept is genuinely unsettled at undergraduate level; the department book states it without qualification.'),
    scalar('last_reviewed', 'lastReviewed', undefined,
      'New record; no reviewer has seen it yet.'),
    scalar('review_due', 'reviewDue', undefined,
      'Set when the first review completes; a due date before a first review is a date nobody agreed to.'),
    scalar('exclusion_reason', 'exclusionReason', undefined,
      'This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.'),
  ].join('\n')

  return `# Item
## label
${seed.label}
## id
${id}
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
## support_mode
direct_statement
## subject
${seed.subject}
## primary_node_id
${seed.primary}
## secondary_node_ids
${seed.secondary.length ? seed.secondary.join(' | ') : '[clear]'}
${body}
## modules
${module.id}
## module_subject
${seed.modulePath}
## universities
kau
## learner_years
1
## blueprint_weight
${blueprint}
## exam_weight_by_year
KAU_Y1=${blueprint}
## clinical_relevance
${clinical ? '0.7' : '0.2'}
## academic_relevance
0.9
## exam_signal
${signals}
## weight_confidence
${sittings > 1 ? '0.9' : '0.7'}
## confidence
0.8
## original_wording
[${seed.section} Q${seed.q}, ${seed.marks} marks] ${seed.asked}
## evidence_gaps
Evidence must be attached before publication.
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
${[...notes, `secondaryNodeIds: ${seed.secondary.length
    ? 'placed on a second view as well as its home node'
    : 'No second canonical view applies; this concept is taught only in the discipline this module runs under.'}`,
`relationships: Walked the concepts sharing this module-subject leaf. Typed edges worth writing are recorded in the module's relation batch; the rest are same-leaf proximity only.`].join('\n')}`
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
export function writtenBlock(paper: Paper, seeds: Seed[], articleFor: (conceptId: string) => string | undefined): string {
  const { source } = paper
  const [seed] = seeds
  const scheme = paper.schemes[partsKey(seed)]
  if (!scheme) throw new Error(`${source.file}: no mark scheme for ${partsKey(seed)}`)

  const module = moduleOf(source)
  const byKey = new Map(seeds.map((one) => [one.key, mintConceptId(module.id, one.subject, one.key, one.system)]))
  const conceptId = byKey.get(seed.key)!
  const total = paper.seeds.reduce((sum, other) => sum + other.marks, 0)

  // Which answer model this question carries.
  //
  // A written question is marked against expected points; a matching question
  // is marked against a mapping of prompts onto an option bank. They are not
  // interchangeable, and the importer refuses each one's column on the other —
  // "Written parts were given, but the format is matching". So the block is
  // built for the format rather than always built as written parts.
  const matching = scheme.format === 'matching'

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
  const relevance = Math.min(10, (seed.marks / total) * 10 * paper.seeds.length).toFixed(1)
  const clinical = seeds.some((one) => one.type === 'clinical_correlation')
  const articles = [...new Set([...byKey.values()].map(articleFor).filter(Boolean))]
  const askedAll = seeds.map((one) => one.asked).join(' ')

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
${matching
    ? `## matching_options\n${(scheme.matchingOptions ?? []).join('\n')}\n## matching_prompts\n${(scheme.matchingPrompts ?? []).join('\n')}`
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
## cognitive_effort
${seed.difficulty === 'Challenging' ? 'High'
    : seed.difficulty === 'Hard' ? 'High'
      : seed.difficulty === 'Easy' ? 'Low'
        : seed.marks >= 6 ? 'High' : 'Medium'}
## reasoning_level
${clinical ? '3' : '1'}
## estimated_seconds
${seed.marks * 60}
${articles.length ? `## library_ids\n${articles.join('\n')}\n` : ''}## owner
Claude
## source_citation
${source.file} — Kasr Al Ainy ${source.tier.replace(/_/g, ' ')} ${source.sittingYear}, ${seed.section} Q${seed.q}, p${seed.page}. Manifest ${source.id}.
## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “${askedAll}”
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
${scheme.parts?.length
  ? `The paper printed ${scheme.parts.length} lettered subparts and one total of ${seed.marks} marks, so the letters divide it evenly. The per-letter figure is not the examiner's.`
  : `Per-element marks are not the examiner's — the paper gave ${seed.marks} for the whole question and named the elements. The scheme apportions.`}
${byKey.size > 1 ? `This question is co-primary on ${byKey.size} concepts: its subparts test things a student can know separately.` : 'No vignette: this paper states its cases inside the question itself, so there is no separate stem.'}
No derived_from: transcribed rather than derived, so there is nothing to name.`
}

/** A batch file: a comment explaining itself, then the items. */
export const batchFile = (header: string, blocks: string[]) =>
  `<!--\n${header.trim().split('\n').map((line) => `  ${line}`.trimEnd()).join('\n')}\n-->\n\n`
  + blocks.join('\n\n---\n\n') + '\n'
