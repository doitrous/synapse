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
import { createHash } from 'node:crypto'
import { mintConceptId, mintQuestionId, partsKey, type Paper, type Seed, type SourceRef } from './seeds/types.ts'
import type { BankRow, McqAuthored, McqConcept, McqLeafSeed } from './seeds/mcq.ts'

/** Where a concept was examined, in the `exam_signal` column's own grammar. */
const occurrence = (source: SourceRef, seed: Seed) =>
  `${source.id} | ${source.tier} | ${source.sittingYear} | p${seed.page} | 101 ISK`

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
  context: { paperMarks?: number; articleId?: string } = {},
): string {
  const signals = [occurrence(source, seed), ...alsoSeenOn].join('\n')
  const weight = blueprintWeight(seed, context.paperMarks ?? 81, alsoSeenOn.length)
  const clinical = seed.type === 'clinical_correlation'
  const path = seed.modulePath.split(' > ')
  return `# Item
## label
${seed.label}
## id
${mintConceptId(seed.subject, seed.key)}
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
${seed.secondary.join(' | ')}
## modules
101 ISK
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
${(seed.aliases ?? []).join(' | ')}
${context.articleId ? `## article_ids\n${context.articleId}\n` : ''}## support_mode
direct_statement
## original_wording
[${seed.section} Q${seed.q}, ${seed.marks} marks] ${seed.asked}
## conflicts
${(seed.conflicts ?? []).join('\n')}
## uncertainty
${seed.uncertainty ?? ''}
## evidence_gaps
${(seed.gaps ?? []).join('\n') || '[clear]'}
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology has not been researched; it is filled during the evidence pass rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopic: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopic: As above — no NAN_ ids exist for this material.
atomicClaimIds: The evidence chain cannot be built until the Kasr manifest sources are in the corpus source index; they are absent from it today, so any claim would cite a source the index says does not exist.
resourceIds: No resource records have been created for the Kasr corpus yet; the manifest is the interim record.
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
export function writtenBlock(paper: Paper, seeds: Seed[], articleFor: (conceptId: string) => string | undefined): string {
  const { source } = paper
  const [seed] = seeds
  const scheme = paper.schemes[partsKey(seed)]
  if (!scheme) throw new Error(`${source.file}: no mark scheme for ${partsKey(seed)}`)

  const byKey = new Map(seeds.map((one) => [one.key, mintConceptId(one.subject, one.key)]))
  const conceptId = byKey.get(seed.key)!
  const total = paper.seeds.reduce((sum, other) => sum + other.marks, 0)

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
## written_parts
${parts}
## main_concept
${[...byKey.values()].join(' | ')}
## topic
${seed.section}
## subtopic
${seed.modulePath.split(' > ').slice(-1)[0]}
## module
101 ISK
## module_subject
${[...new Set(seeds.map((one) => one.modulePath))].join('\n')}
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
${seed.marks >= 6 ? 'Hard' : 'Moderate'}
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
${seed.marks >= 6 ? 'High' : 'Medium'}
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

/**
 * A concept an author minted while reading a leaf's multiple-choice questions.
 *
 * Its exam signal is every occurrence of every question that tests it, which is
 * what makes these worth minting at all: a question book asking the same thing
 * five times across three books is saying something about the blueprint that no
 * single paper says.
 */
export function mcqConceptBlock(concept: McqConcept, signals: string[]): string {
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
${concept.secondary.join(' | ')}
## modules
101 ISK
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
## support_mode
direct_statement
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.
originalWording: These questions come from departmental question books rather than a sat paper, so there is no single examiner's wording to preserve.`
}

/**
 * One multiple-choice question, from a bank row plus what an author added.
 *
 * `QM-101-<12 hex>` from the bank's own key, so re-running the extraction
 * cannot re-mint an item a student already has history against.
 *
 * The answer is the source's unless the author overrode it, and an override
 * without a reason throws rather than importing: an answer changed silently is
 * indistinguishable from an answer changed wrongly.
 */
export function mcqBlock(row: BankRow, authored: McqAuthored, leaf: McqLeafSeed): string {
  if (authored.answerOverride && !authored.answerOverrideReason?.trim()) {
    throw new Error(`${authored.key}: answerOverride without answerOverrideReason`)
  }
  const answer = authored.answerOverride ?? row.answer
  if (!answer) throw new Error(`${authored.key}: no answer, and none supplied — exclude it instead`)

  const letters = Object.keys(row.options).filter((letter) => row.options[letter]?.trim()).sort()
  const missing = letters.filter((letter) => !authored.explanations[letter]?.trim())
  if (missing.length) throw new Error(`${authored.key}: no explanation for option ${missing.join(', ')}`)
  if (!letters.includes(answer)) throw new Error(`${authored.key}: answer ${answer} is not a filled option`)

  const id = `QM-101-${createHash('sha256').update(`kau:101 ISK:mcq:${row.key}`).digest('hex').toUpperCase().slice(0, 12)}`
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
${mintConceptId(concept.subject, concept.key)}
## library_ids
${leaf.articleId}
## topic
${row.topic === 'unknown' ? leaf.leaf : row.topic}
## subtopic
${leaf.leaf}
## module
101 ISK
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
Kasr Al Ainy departmental question books, module 101 ISK. ${seen}. Manifest ${[...new Set(row.occurrences.map((where) => where.sourceId))].join(', ')}.
## author_notes
Asked ${row.timesAsked} time${row.timesAsked === 1 ? '' : 's'} across the question books.
Extraction confidence ${row.confidence}; the answer came from ${row.answerConfidence === 'keyed' ? 'a separate answer key, joined by question number' : row.answerConfidence === 'same-file' ? 'the question book itself' : 'no source and was supplied by the author'}.
${authored.answerOverrideReason ? `Answer changed from the source's: ${authored.answerOverrideReason}` : ''}
${row.variants?.length ? `${row.variants.length} materially different wording${row.variants.length === 1 ? '' : 's'} of this question exist in the books and were not collapsed into it.` : ''}`
}
