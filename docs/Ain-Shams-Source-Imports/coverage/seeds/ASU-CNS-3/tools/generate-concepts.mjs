#!/usr/bin/env node
// ASU-CNS-3 cluster 3 throwaway generator — fills the "no emit tool exists for
// concept/article records" gap (LANE-CARD-Y2-3.md §4) for this cluster's own
// use. Produces byte-identical field order/shape to cluster 1/2's hand-authored
// format (verified against ASU-CNS-3-physio-mcq-concepts.md /
// ASU-CNS-3-physio-mcq-articles.md). Not committed to scripts/content/ (shared
// toolchain) — lives here for the next ASU-CNS-3 cluster to reuse.
//
// Usage: node generate-concepts.mjs <data.json> --concepts-out <path> --articles-out <path> --ids-out <path>
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const dataPath = args[0];
function optVal(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}
const conceptsOut = optVal('--concepts-out');
const articlesOut = optVal('--articles-out');
const idsOut = optVal('--ids-out');

const data = JSON.parse(readFileSync(dataPath, 'utf8'));

function hash14(s) {
  return createHash('sha1').update(s).digest('hex').slice(0, 14).toUpperCase();
}

function slugify(label, maxLen = 60) {
  let s = label
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  if (s.length > maxLen) {
    const cut = s.slice(0, maxLen);
    const lastDash = cut.lastIndexOf('-');
    s = lastDash > 20 ? cut.slice(0, lastDash) : cut;
  }
  return s;
}

const conceptBlocks = [];
const articleBlocks = [];
const idMap = {};

for (const c of data.concepts) {
  const id = 'CON-NEU-' + hash14(c.canonical_key);
  const slug = slugify(c.label);
  const artId = `ART-NEU-${data.lanePrefix}-${slug}`;
  const claimId = `CLM-NEU-${data.lanePrefix}-${slug}-01`;
  const spanId = `SPN-NEU-${data.lanePrefix}-${slug}-01`;
  const annId = `ann-neu-${data.lanePrefix.toLowerCase()}-${slug.toLowerCase()}-001`;

  idMap[c.key] = {
    id,
    article_id: artId,
    claim_id: claimId,
  };

  const aliasesBlock = (c.aliases || []).join('\n');
  const rejectedMerge = c.rejected_merge_candidate_ids ? c.rejected_merge_candidate_ids.join('\n') : '[clear]';
  const relatedConceptIds = c.related_concept_ids ? c.related_concept_ids.join('\n') : '';
  const evidenceGaps = c.evidence_gaps || 'Independent neurophysiology/neuroanatomy reference not yet attached; current support is this ASU exam-bank compilation only.';

  const concept = `# Item

## label
${c.label}

## id
${id}

## canonical_key
${c.canonical_key}

## definition
${c.definition}

## explicit_objective
${c.explicit_objective}

## concept_type
definition

## status
under review

## subject
neuro

## primary_node_id
${c.primary_node_id}

## secondary_node_ids
${c.secondary_node_ids || ''}

## modules
${data.module}

## module_subject
${c.module_subject}

## universities
${data.university}

## learner_years
${data.learner_year}

## blueprint_weight
0.3

## exam_weight_by_year
${data.year_id}=0.3

## clinical_relevance
0.3

## academic_relevance
0.75

## confidence
0.85

## topic
${c.topic}

## subtopic
${c.subtopic}

## microtopic


## nanotopic


## aliases
${aliasesBlock}

## pitfalls
${c.pitfalls}

## article_ids
${artId}

## support_mode
direct_statement

## original_wording
${c.original_wording}

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
${evidenceGaps}

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
${relatedConceptIds}

## related_article_ids


## resource_ids
${c.resource_id}

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
${claimId}

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
${rejectedMerge}

## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
asu: ${c.asu_field_note}
`;
  conceptBlocks.push(concept);

  const article = `# Item

## id
${artId}

## title
${c.article_title}

## arabic_title


## aliases
${aliasesBlock}

## subject
neuro

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## topic
${c.topic}

## subtopic
${c.subtopic}

## microtopic


## nanotopic


## primary_node_id
${c.primary_node_id}

## secondary_node_ids
${c.secondary_node_ids || ''}

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 3 CNS foundation

## reading_time
3

## high_yield
Core

## time_sensitive
stable

## universities
${data.university}

## years
${data.year_id}

## module
${data.module}

## module_subject
${c.module_subject}

## summary
This ASU Year 3 CNS slice covers: ${c.definition}

## sections
### Definition
${c.definition}

### Mechanism
${c.explicit_objective}

### Key determinants
${c.pitfalls}

### Clinical significance
${c.clinical_significance || "This batch does not extend the source's plain fact into diagnosis, treatment or management claims beyond what the compilation itself states."}

### Common misconceptions
${c.pitfalls}

## hold_these
${c.definition}

## lose_the_mark
${c.pitfalls}

## publication_gate
needs_evidence

## evidence_basis
${c.evidence_basis}

## evidence_gaps
${evidenceGaps}

## notes
ASU-CNS-3 cluster 3 batch. No OCR, web source, or outside fact was used beyond standard neuroanatomy/neurophysiology teaching needed to write plausible cited distractors; the printed key/topic was read directly from the source.

## field_notes
arabicTitle: Arabic title has not been reviewed; left empty rather than guessed.
nanotopicId: No verified nanotopic exists below this ASU slice's microtopic.
media: No rights-cleared asset exists for this batch.
lastReviewed: Draft has not completed review.
reviewDue: Set after first review.
publishedSummary: Draft has no safe student projection yet.
publishedSections: Draft has no safe student projection yet.
questionIds: Linked at import time via the question record's main_concept/library_ids.
conflicts: No conflict identified in the selected local source slice.

## related_concepts


## related_articles


## resource_ids
${c.resource_id}

## article_source_ids
${c.resource_id}

## claim_ids
${claimId}

## span_ids
${spanId}

## annotations
### definition_of · ${id}
Quote: ${c.definition}
Block: body
Id: ${annId}

## callout_evidence


## question_ids


## media


## published_summary


## published_sections


## conflicts


## university_notes
${data.university}: Authored from ${c.module_subject} source ${c.resource_id}.

## last_reviewed


## review_due


## exclusion_reason
`;
  articleBlocks.push(article);
}

const conceptHeader = data.conceptHeader || '';
const articleHeader = data.articleHeader || '';

writeFileSync(conceptsOut, conceptHeader + conceptBlocks.join('\n\n---\n\n') + '\n');
writeFileSync(articlesOut, articleHeader + articleBlocks.join('\n\n---\n\n') + '\n');
writeFileSync(idsOut, JSON.stringify(idMap, null, 2));

console.log(`Wrote ${conceptBlocks.length} concepts to ${conceptsOut}`);
console.log(`Wrote ${articleBlocks.length} articles to ${articlesOut}`);
console.log(`Wrote id map to ${idsOut}`);
