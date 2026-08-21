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
import { mintConceptId, mintQuestionId, partsKey, type Paper, type Seed, type SourceRef } from './seeds/types.ts'

/** Where a concept was examined, in the `exam_signal` column's own grammar. */
const occurrence = (source: SourceRef, seed: Seed) =>
  `${source.id} | ${source.tier} | ${source.sittingYear} | p${seed.page} | 101 ISK`

export function conceptBlock(source: SourceRef, seed: Seed, alsoSeenOn: string[] = []): string {
  const signals = [occurrence(source, seed), ...alsoSeenOn].join('\n')
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
## support_mode
direct_statement
## original_wording
[${seed.section} Q${seed.q}, ${seed.marks} marks] ${seed.asked}
## owner
Claude
## publication_status
needs_evidence
## editorial_review_status
authored_needs_independent_evidence
## field_notes
arabicLabel: Arabic terminology for this concept has not been researched yet; it is filled during the evidence pass rather than guessed.`
}

export function writtenBlock(paper: Paper, seed: Seed, articleId?: string): string {
  const { source } = paper
  const scheme = paper.schemes[partsKey(seed)]
  if (!scheme) throw new Error(`${source.file}: no mark scheme for ${partsKey(seed)}`)
  const conceptId = mintConceptId(seed.subject, seed.key)
  const total = paper.seeds.reduce((sum, other) => sum + other.marks, 0)

  // What this question is worth out of the paper, on the field's 0–10 scale,
  // taken from the marks the examiner gave it rather than from an opinion.
  const relevance = Math.min(10, (seed.marks / total) * 10 * paper.seeds.length).toFixed(1)
  const clinical = seed.type === 'clinical_correlation'

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
### (a) ${seed.marks} marks
${scheme.prompt}
${scheme.expects.map((point) => `Expects: ${point}`).join('\n')}
Concept: ${conceptId}
## main_concept
${conceptId}
## topic
${seed.section}
## subtopic
${seed.modulePath.split(' > ').slice(-1)[0]}
## module
101 ISK
## module_subject
${seed.modulePath}
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
${seed.objective}
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
${articleId ? `## library_ids\n${articleId}\n` : ''}## owner
Claude
## source_citation
${source.file} — Kasr Al Ainy ${source.tier.replace(/_/g, ' ')} ${source.sittingYear}, ${seed.section} Q${seed.q}, p${seed.page}. Manifest ${source.id}.
## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “${seed.asked}”
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
Per-element marks are not the examiner's — the paper gave ${seed.marks} for the whole question and named the elements. The scheme apportions.
No vignette: this paper states its cases inside the question itself, so there is no separate stem.
No derived_from: transcribed rather than derived, so there is nothing to name.`
}

/** A batch file: a comment explaining itself, then the items. */
export const batchFile = (header: string, blocks: string[]) =>
  `<!--\n${header.trim().split('\n').map((line) => `  ${line}`.trimEnd()).join('\n')}\n-->\n\n`
  + blocks.join('\n\n---\n\n') + '\n'
